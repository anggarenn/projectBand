import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lnbnaxokeccmfmeydjwq.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_MMmd28GEizSef6UOS9804w_xDjIU1O8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = err => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads a file to Supabase Storage bucket 'media'.
 * Falls back to Base64 DataURL if storage bucket is not configured yet,
 * ensuring zero errors during transition.
 */
export async function uploadImageToStorage(
  file: File,
  folder: string = "uploads"
): Promise<string> {
  try {
    const fileExt = file.name.split(".").pop() || "jpg";
    const cleanExt = fileExt.toLowerCase().replace(/[^a-z0-9]/g, "");
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}.${cleanExt || "jpg"}`;

    const { error } = await supabase.storage.from("media").upload(fileName, file, {
      cacheControl: "3600",
      upsert: true
    });

    if (error) {
      console.warn("Storage upload note (using fallback):", error.message);
      return await fileToDataUrl(file);
    }

    const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.warn("Upload exception (using fallback):", err);
    return await fileToDataUrl(file);
  }
}
