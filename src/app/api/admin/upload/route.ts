import { NextRequest, NextResponse } from "next/server";
import {
  getAuthenticatedAdminSession,
  getServerSupabase,
  verifySameOrigin,
} from "@/lib/adminAuth";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, private",
};

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

function detectImageFormat(
  bytes: Uint8Array
): { mime: string; ext: string } | null {
  if (bytes.length < 12) return null;

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }

  // WebP: RIFF....WEBP
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { mime: "image/webp", ext: "webp" };
  }

  return null;
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

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Format upload tidak valid." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "File gambar tidak ditemukan." },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  }

  if (file.size <= 0 || file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: "Ukuran gambar maksimal 5 MB." },
      { status: 413, headers: NO_STORE_HEADERS }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detected = detectImageFormat(buffer);
  if (!detected) {
    return NextResponse.json(
      { error: "Format file harus PNG, JPG, atau WebP asli." },
      { status: 415, headers: NO_STORE_HEADERS }
    );
  }

  const fileName = `merch/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${detected.ext}`;

  const supabase = getServerSupabase();
  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, buffer, {
      contentType: detected.mime,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    // Fallback to base64 data URL only if storage bucket is unavailable
    const dataUrl = `data:${detected.mime};base64,${buffer.toString("base64")}`;
    return NextResponse.json(
      { url: dataUrl },
      { status: 200, headers: NO_STORE_HEADERS }
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  return NextResponse.json(
    { url: publicUrlData.publicUrl },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}
