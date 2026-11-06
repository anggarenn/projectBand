import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SEC,
  checkLoginRateLimit,
  clearFailedLogins,
  createAdminSessionToken,
  getAuthenticatedAdminSession,
  getClientIp,
  recordFailedLogin,
  verifyAdminPassword,
  verifySameOrigin,
} from "@/lib/adminAuth";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
};

export async function GET() {
  const session = await getAuthenticatedAdminSession();
  if (!session.valid) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json(
    { authenticated: true, expiresAt: session.expiresAt },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json(
      { error: "Permintaan tidak valid." },
      { status: 403, headers: NO_STORE_HEADERS }
    );
  }

  const ip = getClientIp(req);
  const rate = checkLoginRateLimit(ip);
  if (!rate.allowed) {
    const mins = Math.max(1, Math.ceil(rate.retryAfterSec / 60));
    return NextResponse.json(
      {
        error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${mins} menit.`,
      },
      {
        status: 429,
        headers: {
          ...NO_STORE_HEADERS,
          "Retry-After": String(rate.retryAfterSec),
        },
      }
    );
  }

  let password = "";
  try {
    const body = (await req.json()) as { password?: unknown };
    if (typeof body?.password === "string") {
      password = body.password;
    }
  } catch {
    return NextResponse.json(
      { error: "Format data tidak valid." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  if (!verifyAdminPassword(password)) {
    recordFailedLogin(ip);
    // Constant delay slows down automated password guessing
    await new Promise((resolve) => setTimeout(resolve, 350));
    return NextResponse.json(
      { error: "Password salah. Coba lagi." },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  clearFailedLogins(ip);
  const { token, expiresAt } = createAdminSessionToken();

  const res = NextResponse.json(
    { authenticated: true, expiresAt },
    { status: 200, headers: NO_STORE_HEADERS }
  );

  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SEC,
  });

  return res;
}

export async function DELETE(req: NextRequest) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json(
      { error: "Permintaan tidak valid." },
      { status: 403, headers: NO_STORE_HEADERS }
    );
  }

  const res = NextResponse.json(
    { ok: true },
    { status: 200, headers: NO_STORE_HEADERS }
  );

  res.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return res;
}
