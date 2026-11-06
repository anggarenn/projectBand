import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const ADMIN_COOKIE_NAME = "snv_session";
export const ADMIN_SESSION_TTL_MS = 15 * 60 * 1000; // 15 minutes
export const ADMIN_SESSION_MAX_AGE_SEC = 15 * 60;

const PASSWORD_SALT = "snv-auth-v1:";
const DEFAULT_PASSWORD_DIGESTS = [
  "f03d0c5e7ccf06e9b4e63ff65919c209fde3b7bcaef40ca79d07429f611a528c",
  "11f185eb99c03401788a900d0e374121f11e0b0f9d0263ffa4e1df0aa983cded",
  "1ad63d591a922d2c3bff7e27f6badeb7fc32121dbdad92f5d244737e276ba305",
];

// Fallback ephemeral secret if no server secret env var is configured
const PROCESS_EPHEMERAL_SECRET = crypto.randomBytes(32).toString("hex");

function getSigningKey(): Buffer {
  const rawSecret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    PROCESS_EPHEMERAL_SECRET;

  return crypto
    .createHmac("sha256", "snv-admin-hmac-v1")
    .update(rawSecret)
    .digest();
}

function hashPassword(input: string): Buffer {
  return crypto
    .createHash("sha256")
    .update(`${PASSWORD_SALT}${input}`, "utf8")
    .digest();
}

export function verifyAdminPassword(candidate: string): boolean {
  if (!candidate || candidate.length > 256) return false;
  const candidateHash = hashPassword(candidate);

  const envPassword = process.env.ADMIN_PASSWORD?.trim();
  if (envPassword) {
    const expectedHash = hashPassword(envPassword);
    return crypto.timingSafeEqual(candidateHash, expectedHash);
  }

  let matched = false;
  for (const hex of DEFAULT_PASSWORD_DIGESTS) {
    const expected = Buffer.from(hex, "hex");
    if (
      expected.length === candidateHash.length &&
      crypto.timingSafeEqual(candidateHash, expected)
    ) {
      matched = true;
    }
  }
  return matched;
}

// ---------------------------------------------------------------------------
// Brute-force IP rate limiter (5 failed attempts per 15 minutes)
// ---------------------------------------------------------------------------
interface AttemptRecord {
  count: number;
  resetAt: number;
}

const RATE_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const failedAttempts = new Map<string, AttemptRecord>();

function pruneExpiredAttempts(now: number) {
  if (failedAttempts.size < 200) return;
  for (const [ip, rec] of failedAttempts.entries()) {
    if (rec.resetAt <= now) failedAttempts.delete(ip);
  }
}

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "local";
}

export function checkLoginRateLimit(ip: string): {
  allowed: boolean;
  retryAfterSec: number;
} {
  const now = Date.now();
  pruneExpiredAttempts(now);
  const rec = failedAttempts.get(ip);
  if (!rec || rec.resetAt <= now) {
    return { allowed: true, retryAfterSec: 0 };
  }
  if (rec.count >= MAX_FAILED_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.max(1, Math.ceil((rec.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSec: 0 };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const rec = failedAttempts.get(ip);
  if (!rec || rec.resetAt <= now) {
    failedAttempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  } else {
    rec.count += 1;
  }
}

export function clearFailedLogins(ip: string): void {
  failedAttempts.delete(ip);
}

// ---------------------------------------------------------------------------
// Same-Origin CSRF check for state-changing requests
// ---------------------------------------------------------------------------
export function verifySameOrigin(req: NextRequest): boolean {
  const expectedHost =
    req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!expectedHost) return false;

  const origin = req.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === expectedHost;
    } catch {
      return false;
    }
  }

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === expectedHost;
    } catch {
      return false;
    }
  }

  return false;
}

// ---------------------------------------------------------------------------
// Signed HttpOnly session token (15 minutes)
// ---------------------------------------------------------------------------
export function createAdminSessionToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + ADMIN_SESSION_TTL_MS;
  const payload = Buffer.from(
    JSON.stringify({
      exp: expiresAt,
      jti: crypto.randomBytes(12).toString("base64url"),
    }),
    "utf8"
  ).toString("base64url");

  const sig = crypto
    .createHmac("sha256", getSigningKey())
    .update(payload)
    .digest("base64url");

  return { token: `${payload}.${sig}`, expiresAt };
}

export function verifyAdminSessionToken(
  token: string | undefined
): { valid: true; expiresAt: number } | { valid: false } {
  if (!token || typeof token !== "string") return { valid: false };
  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false };

  const [payload, sig] = parts;
  if (!payload || !sig) return { valid: false };

  const expectedSig = crypto
    .createHmac("sha256", getSigningKey())
    .update(payload)
    .digest();

  let actualSig: Buffer;
  try {
    actualSig = Buffer.from(sig, "base64url");
  } catch {
    return { valid: false };
  }

  if (
    actualSig.length !== expectedSig.length ||
    !crypto.timingSafeEqual(actualSig, expectedSig)
  ) {
    return { valid: false };
  }

  try {
    const parsed = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp?: unknown };
    const expiresAt = Number(parsed?.exp ?? 0);
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      return { valid: false };
    }
    return { valid: true, expiresAt };
  } catch {
    return { valid: false };
  }
}

export async function getAuthenticatedAdminSession(): Promise<
  { valid: true; expiresAt: number } | { valid: false }
> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(raw);
}

// ---------------------------------------------------------------------------
// Server-only Supabase client (uses SUPABASE_SECRET_KEY when available)
// ---------------------------------------------------------------------------
export function getServerSupabase(): SupabaseClient {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://lnbnaxokeccmfmeydjwq.supabase.co";
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
