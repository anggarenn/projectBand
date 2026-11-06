import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedAdminSession,
  getServerSupabase,
  verifySameOrigin,
} from "@/lib/adminAuth";
import { normalizeMerchRow } from "@/lib/supabase";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
};

const ALLOWED_SIZES = new Set(["S", "M", "L", "XL", "XXL"]);

function sanitizeSizes(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const unique: string[] = [];
  for (const item of raw) {
    const val = String(item ?? "").trim().toUpperCase();
    if (ALLOWED_SIZES.has(val) && !unique.includes(val)) {
      unique.push(val);
    }
  }
  return unique;
}

function isSafeImageUrl(url: string): boolean {
  if (!url) return true;
  if (url.length > 2_000_000) return false;
  if (url.startsWith("/")) return !url.startsWith("//");
  if (url.startsWith("data:image/")) {
    return /^data:image\/(png|jpeg|jpg|webp);base64,[a-zA-Z0-9+/=]+$/.test(url);
  }
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function GET() {
  const session = await getAuthenticatedAdminSession();
  if (!session.valid) {
    return NextResponse.json(
      { error: "Sesi berakhir. Silakan login kembali." },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const supabase = getServerSupabase();
  const { data, error } = await supabase
    .from("merch")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data) {
    return NextResponse.json(
      { error: "Gagal memuat daftar merch." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }

  const items = data.map((row) =>
    normalizeMerchRow(row as Record<string, unknown>)
  );

  return NextResponse.json(
    { items },
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

  const session = await getAuthenticatedAdminSession();
  if (!session.valid) {
    return NextResponse.json(
      { error: "Sesi berakhir. Silakan login kembali." },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Format data tidak valid." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const title = String(body.title ?? "").trim().slice(0, 160);
  const price = String(body.price ?? "").trim().slice(0, 60);
  const imageUrl = String(body.image_url ?? "").trim();
  const sizes = sanitizeSizes(body.sizes);
  const isActive = body.is_active !== false;

  if (!title || !price) {
    return NextResponse.json(
      { error: "Judul dan harga produk wajib diisi." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  if (!isSafeImageUrl(imageUrl)) {
    return NextResponse.json(
      { error: "URL gambar tidak valid." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const id = `merch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const category = sizes.length > 0 ? "apparel" : "cassette";
  const status = isActive ? "available" : "hidden";

  const fullRow: Record<string, unknown> = {
    id,
    name: title,
    price,
    image: imageUrl,
    category,
    status,
    description: "",
    is_active: isActive,
    sizes,
  };

  const supabase = getServerSupabase();
  let { data, error } = await supabase
    .from("merch")
    .insert([fullRow])
    .select()
    .single();

  if (error) {
    const fallbackRow: Record<string, unknown> = {
      id,
      name: title,
      price,
      image: imageUrl,
      category,
      status,
      description: "",
    };
    if (!error.message.includes("is_active")) {
      fallbackRow.is_active = isActive;
    }
    const retry = await supabase
      .from("merch")
      .insert([fallbackRow])
      .select()
      .single();
    data = retry.data;
    error = retry.error;
  }

  if (error || !data) {
    return NextResponse.json(
      { error: "Gagal menyimpan merch ke database." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json(
    { item: normalizeMerchRow(data as Record<string, unknown>) },
    { status: 201, headers: NO_STORE_HEADERS }
  );
}

export async function PATCH(req: NextRequest) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json(
      { error: "Permintaan tidak valid." },
      { status: 403, headers: NO_STORE_HEADERS }
    );
  }

  const session = await getAuthenticatedAdminSession();
  if (!session.valid) {
    return NextResponse.json(
      { error: "Sesi berakhir. Silakan login kembali." },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Format data tidak valid." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const id = String(body.id ?? "").trim();
  if (!id || id.length > 100 || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return NextResponse.json(
      { error: "ID produk tidak valid." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const fullUpdate: Record<string, unknown> = {};
  const fallbackUpdate: Record<string, unknown> = {};

  if (body.title !== undefined) {
    const title = String(body.title).trim().slice(0, 160);
    if (!title) {
      return NextResponse.json(
        { error: "Judul produk tidak boleh kosong." },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }
    fullUpdate.name = title;
    fallbackUpdate.name = title;
  }

  if (body.price !== undefined) {
    const price = String(body.price).trim().slice(0, 60);
    if (!price) {
      return NextResponse.json(
        { error: "Harga produk tidak boleh kosong." },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }
    fullUpdate.price = price;
    fallbackUpdate.price = price;
  }

  if (body.image_url !== undefined) {
    const imageUrl = String(body.image_url).trim();
    if (!isSafeImageUrl(imageUrl)) {
      return NextResponse.json(
        { error: "URL gambar tidak valid." },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }
    fullUpdate.image = imageUrl;
    fallbackUpdate.image = imageUrl;
  }

  if (body.sizes !== undefined) {
    const sizes = sanitizeSizes(body.sizes);
    const category = sizes.length > 0 ? "apparel" : "cassette";
    fullUpdate.category = category;
    fallbackUpdate.category = category;
    fullUpdate.sizes = sizes;
  }

  if (body.is_active !== undefined) {
    const isActive = Boolean(body.is_active);
    const status = isActive ? "available" : "hidden";
    fullUpdate.status = status;
    fallbackUpdate.status = status;
    fullUpdate.is_active = isActive;
    fallbackUpdate.is_active = isActive;
  }

  const supabase = getServerSupabase();
  let { error } = await supabase.from("merch").update(fullUpdate).eq("id", id);

  if (error) {
    if (error.message.includes("is_active")) {
      delete fallbackUpdate.is_active;
    }
    const retry = await supabase
      .from("merch")
      .update(fallbackUpdate)
      .eq("id", id);
    error = retry.error;
  }

  if (error) {
    return NextResponse.json(
      { error: "Gagal memperbarui merch." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}

export async function DELETE(req: NextRequest) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json(
      { error: "Permintaan tidak valid." },
      { status: 403, headers: NO_STORE_HEADERS }
    );
  }

  const session = await getAuthenticatedAdminSession();
  if (!session.valid) {
    return NextResponse.json(
      { error: "Sesi berakhir. Silakan login kembali." },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const id = req.nextUrl.searchParams.get("id")?.trim() ?? "";
  if (!id || id.length > 100 || !/^[a-zA-Z0-9_-]+$/.test(id)) {
    return NextResponse.json(
      { error: "ID produk tidak valid." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const supabase = getServerSupabase();
  const { error } = await supabase.from("merch").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: "Gagal menghapus merch." },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}
