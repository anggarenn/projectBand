-- =====================================================
-- SILLY N VALLEY - Merch Table Non-Destructive Upgrade
-- Run this in: Supabase Dashboard > SQL Editor (Optional)
-- =====================================================

-- 1. Add is_active and sizes columns to existing public.merch table
ALTER TABLE public.merch
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;

ALTER TABLE public.merch
  ADD COLUMN IF NOT EXISTS sizes TEXT[];

-- 2. Backfill sizes based on existing category where sizes is still NULL
UPDATE public.merch
SET sizes = CASE
  WHEN category IN ('cassette', 'accessories') THEN ARRAY[]::TEXT[]
  ELSE ARRAY['S', 'M', 'L', 'XL', 'XXL']
END
WHERE sizes IS NULL;
