import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://lnbnaxokeccmfmeydjwq.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_MMmd28GEizSef6UOS9804w_xDjIU1O8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface MerchProduct {
  id: string;
  title: string;
  price: string;
  image_url: string;
  sizes: string[];
  is_active: boolean;
  created_at: string;
}

const DEFAULT_APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];

export function normalizeMerchRow(row: Record<string, unknown>): MerchProduct {
  const category =
    typeof row.category === "string" ? row.category : "apparel";

  let sizes: string[];
  if (Array.isArray(row.sizes)) {
    sizes = row.sizes.map(String).filter(Boolean);
  } else if (category === "cassette" || category === "accessories") {
    sizes = [];
  } else {
    sizes = [...DEFAULT_APPAREL_SIZES];
  }

  const isActive =
    typeof row.is_active === "boolean"
      ? row.is_active
      : row.status !== "inactive" && row.status !== "hidden";

  return {
    id: String(row.id ?? ""),
    title: String(row.title ?? row.name ?? ""),
    price: String(row.price ?? ""),
    image_url: String(row.image_url ?? row.image ?? ""),
    sizes,
    is_active: isActive,
    created_at: String(row.created_at ?? ""),
  };
}

export async function fetchActiveMerch(): Promise<MerchProduct[]> {
  const { data, error } = await supabase
    .from("merch")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data
    .map((row) => normalizeMerchRow(row as Record<string, unknown>))
    .filter((item) => item.is_active);
}
