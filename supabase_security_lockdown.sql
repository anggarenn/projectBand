-- =====================================================
-- SILLY N VALLEY: Supabase Security Lockdown (Pure RLS Policies Only)
-- Aman 100%: TIDAK mengubah tabel, kolom, atau isi data apa pun.
-- Hanya menutup akses edit/hapus publik dari luar Admin Panel.
-- =====================================================

-- 1. Pastikan fitur Row Level Security aktif
ALTER TABLE IF EXISTS public.merch ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.band_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.fanzine_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.bookings ENABLE ROW LEVEL SECURITY;

-- 2. Hapus izin tulis publik lama (agar orang luar tidak bisa edit/hapus dari Inspect Element)
DROP POLICY IF EXISTS "Allow public all on merch" ON public.merch;
DROP POLICY IF EXISTS "Allow public all on band_profile" ON public.band_profile;
DROP POLICY IF EXISTS "Allow public all on fanzine_albums" ON public.fanzine_albums;
DROP POLICY IF EXISTS "Allow public all on gigs" ON public.gigs;
DROP POLICY IF EXISTS "Allow public all on bookings" ON public.bookings;

-- 3. Izinkan pengunjung website HANYA membaca (SELECT) katalog merch
DROP POLICY IF EXISTS "Public read merch" ON public.merch;
CREATE POLICY "Public read merch"
  ON public.merch
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 4. Kunci bucket foto 'media': pengunjung hanya bisa melihat foto, upload hanya lewat Admin Server
DROP POLICY IF EXISTS "Public Access media" ON storage.objects;
DROP POLICY IF EXISTS "Public read media" ON storage.objects;
CREATE POLICY "Public read media"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'media');
