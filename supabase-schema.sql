-- =========================================================================
-- SILLY N VALLEY: SUPABASE DATABASE INITIALIZATION SCHEMA
-- =========================================================================

-- 1. Band Profile Table (Profile & About Us)
CREATE TABLE IF NOT EXISTS public.band_profile (
  id TEXT PRIMARY KEY DEFAULT 'main',
  band_name TEXT NOT NULL DEFAULT 'Silly N Valley',
  tagline TEXT NOT NULL DEFAULT 'Band Punk Tapi Kok Ngonten!?',
  headline_quote TEXT NOT NULL DEFAULT 'Highly Motivated Punk Rock asal Kota Tangerang.',
  bio_paragraph_1 TEXT NOT NULL,
  bio_paragraph_2 TEXT NOT NULL,
  bio_paragraph_3 TEXT NOT NULL,
  stage_image TEXT NOT NULL,
  whatsapp_hotline TEXT NOT NULL DEFAULT '+62 812-9909-5137',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/silly.n.valley',
  spotify_url TEXT NOT NULL DEFAULT 'https://open.spotify.com/search/Silly%20N%20Valley',
  core_values JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Fanzine Albums Table (Dokumentasi Gigs)
CREATE TABLE IF NOT EXISTS public.fanzine_albums (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  venue TEXT NOT NULL,
  photographer TEXT NOT NULL DEFAULT '@silly.n.valley',
  cover_image TEXT NOT NULL,
  photos JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Gigs & Flyer Table
CREATE TABLE IF NOT EXISTS public.gigs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL DEFAULT '19:00 WIB',
  venue TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Kota Tangerang',
  htm TEXT NOT NULL DEFAULT 'Donasi',
  instagram_url TEXT NOT NULL DEFAULT 'https://instagram.com/silly.n.valley',
  flyer_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Merch Table
CREATE TABLE IF NOT EXISTS public.merch (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'apparel',
  image TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'available',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Bookings Inbox Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  sender_name TEXT NOT NULL,
  collective TEXT NOT NULL DEFAULT '',
  event_name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS and public policies
ALTER TABLE public.band_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fanzine_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merch ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public all on band_profile" ON public.band_profile;
CREATE POLICY "Allow public all on band_profile" ON public.band_profile FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on fanzine_albums" ON public.fanzine_albums;
CREATE POLICY "Allow public all on fanzine_albums" ON public.fanzine_albums FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on gigs" ON public.gigs;
CREATE POLICY "Allow public all on gigs" ON public.gigs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on merch" ON public.merch;
CREATE POLICY "Allow public all on merch" ON public.merch FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public all on bookings" ON public.bookings;
CREATE POLICY "Allow public all on bookings" ON public.bookings FOR ALL USING (true) WITH CHECK (true);

-- Insert Default Canonical Data
INSERT INTO public.band_profile (
  id, band_name, tagline, headline_quote,
  bio_paragraph_1, bio_paragraph_2, bio_paragraph_3,
  stage_image, whatsapp_hotline, instagram_url, spotify_url, core_values
) VALUES (
  'main',
  'Silly N Valley',
  'Band Punk Tapi Kok Ngonten!?',
  'Highly Motivated Punk Rock asal Kota Tangerang.',
  'Silly N Valley adalah band punk rock asal Kota Tangerang yang dibentuk pada tahun 2022 dan aktif dalam scene underground disana. Memiliki beberapa single dan album penuh.',
  'Mereka lebih dikenal melalui konten ''memes'' harian yang mereka buat untuk dimanfaatkan sebagai platform untuk memperkenalkan aktivitas dan musik yang mereka buat serta mainkan.',
  'Pada akhirnya hal tersebut tetap menjaga semangat independent mereka dalam melakukan setiap dan segala keinginan, upaya dan improvement dalam menjalani eksplorasi musik dan performance didalam dan lintas scene.',
  '/assets/silly-n-valley/about_us.png',
  '+62 812-9909-5137',
  'https://instagram.com/silly.n.valley',
  'https://open.spotify.com/search/Silly%20N%20Valley',
  '[
    {"title": "Ruang Aman (Safe Space)", "badge": "Moshpit Etiquette", "description": "Zero tolerance terhadap pelecehan seksual, kekerasan fisik, dan maskulinitas beracun di moshpit. Semua orang berhak pogo tanpa rasa takut."},
    {"title": "DIY Culture & Swadaya", "badge": "Mandiri", "description": "Mulai dari produksi fisik kaset pita, desain merch, hingga showcase mandiri ''Latihan Di Lihatin'', kami mengorganisirnya secara swadaya."},
    {"title": "Highly Motivated", "badge": "Anti Burnout", "description": "Punk yang tidak cuma mengeluh, tapi memicu tindakan nyata. Melawan burnout dan apatisme harian dengan riff cepat dan optimisme keras kepala."},
    {"title": "Tangerang Underground", "badge": "Est. 2022", "description": "Menghidupkan ekosistem dan venue kota sendiri. Kami percaya pergerakan tidak harus selalu berpusat di Jakarta untuk bisa berdampak luas."}
  ]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Initial Albums
INSERT INTO public.fanzine_albums (id, title, date, venue, photographer, cover_image, photos)
VALUES
('alb-1', 'Showcase HALA Koffie: Rantai Reaksi', '14 Oktober 2024', 'HALA Koffie, Kota Tangerang', '@mqrifisnqini', '/assets/silly-n-valley/gallery/photo-1.jpg', '["/assets/silly-n-valley/gallery/photo-1.jpg", "/assets/silly-n-valley/gallery/photo-2.jpg", "/assets/silly-n-valley/gallery/photo-3.jpg", "/assets/silly-n-valley/gallery/photo-4.jpg"]'::jsonb),
('alb-2', 'Moshpit Chaos di Gigsgoks Fest', '28 September 2024', 'Tangerang Creative Space', '@silly.n.valley', '/assets/silly-n-valley/gallery/photo-5.jpg', '["/assets/silly-n-valley/gallery/photo-5.jpg", "/assets/silly-n-valley/gallery/photo-6.jpg", "/assets/silly-n-valley/gallery/photo-7.jpg", "/assets/silly-n-valley/gallery/photo-8.jpg"]'::jsonb),
('alb-3', 'Tape Cassette C-30 Production & Gear', 'Agustus 2024', 'Silly DIY Workshop', '@silly.n.valley', '/assets/silly-n-valley/gallery/photo-9.jpg', '["/assets/silly-n-valley/gallery/photo-9.jpg", "/assets/silly-n-valley/gallery/photo-10.jpg", "/assets/silly-n-valley/gallery/photo-11.jpg", "/assets/silly-n-valley/gallery/photo-12.jpg"]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Initial Gigs
INSERT INTO public.gigs (id, title, date, time, venue, city, htm, instagram_url, flyer_images, status)
VALUES
('gig-1', 'Latihan Di Lihatin Vol. 3', '25 Oktober 2026', '19:00 WIB', 'HALA Koffie, Tangerang', 'Kota Tangerang', 'Bayar Seikhlasnya', 'https://instagram.com/silly.n.valley', '["/assets/silly-n-valley/gigs/flyer-latihan.png", "/assets/silly-n-valley/gallery/photo-1.jpg"]'::jsonb, 'upcoming'),
('gig-2', 'Tangerang Underground Movement', '10 November 2026', '16:00 WIB', 'Pasar Lama Warehouse', 'Kota Tangerang', 'Rp 35.000', 'https://instagram.com/silly.n.valley', '["/assets/silly-n-valley/gallery/photo-5.jpg"]'::jsonb, 'upcoming')
ON CONFLICT (id) DO NOTHING;

-- Initial Merch
INSERT INTO public.merch (id, name, price, category, image, status, description)
VALUES
('merch-1', 'Kaset Pita C-30 ''Rantai Reaksi: Abu Tanpa Api''', 'Rp 65.000', 'cassette', '/assets/silly-n-valley/cover.jpg', 'available', 'Kaset tape C-30 analog transparan dengan cover lipat 4 panel & booklet lirik DIY.'),
('merch-2', 'T-Shirt ''Band Punk Tapi Kok Ngonten!?'' (Heavyweight 24s)', 'Rp 150.000', 'apparel', '/assets/silly-n-valley/logo.png', 'preorder', 'Sablon plastisol raster di atas katun combad 24s hitam pekat vintage wash.'),
('merch-3', 'Enamel Pin & Sticker Pack Zine Edisi 01', 'Rp 30.000', 'accessories', '/assets/silly-n-valley/gallery/photo-9.jpg', 'available', '5 lembar stiker vinyl tahan air + pin stempel ''100% DIY Tangerang Hardcore''.')
ON CONFLICT (id) DO NOTHING;

-- Create Storage Bucket 'media' for direct photo uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "Public Access media" ON storage.objects;
CREATE POLICY "Public Access media" ON storage.objects FOR ALL USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');
