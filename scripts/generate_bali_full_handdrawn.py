"""
Bali Motion Art Assets Generator - 100% Hand-Drawn Vintage Gold Etching
Author: Mas Amba, RND Asset Specialist
Target files:
- bali-canopy-top.webp (1080x480 RGBA, 30KB - 120KB)
- bg-stage-bali-candibentar.webp (1080x1920 RGB, 30KB - 120KB)
- bg-cover-bali-candibentar.webp (1080x1920 RGB, 30KB - 120KB)
"""

import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

SOURCE_DIR = 'invitation-app/public/assets/motion-art-bali'
TARGET_DIR = SOURCE_DIR

def extract_line_mask(img_crop, green_thresh_high=160.0, green_thresh_low=40.0, cutoff=0.22, gamma=1.3):
    arr = np.array(img_crop).astype(np.float32)
    green = arr[:, :, 1]
    line = np.clip((green_thresh_high - green) / (green_thresh_high - green_thresh_low), 0.0, 1.0)
    line = np.clip((line - cutoff) / (1.0 - cutoff), 0.0, 1.0) ** gamma
    return line

def colorize_mask(mask, gold_rgb=(242, 208, 98), alpha_mult=1.0):
    h, w = mask.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[:, :, 0] = gold_rgb[0]
    rgba[:, :, 1] = gold_rgb[1]
    rgba[:, :, 2] = gold_rgb[2]
    rgba[:, :, 3] = np.clip(mask * 255.0 * alpha_mult, 0, 255).astype(np.uint8)
    return Image.fromarray(rgba, mode='RGBA')

def tint_existing_rgba(im_rgba, gold_rgb=(242, 208, 98)):
    arr = np.array(im_rgba).copy()
    alpha = arr[:, :, 3].astype(np.float32) / 255.0
    arr[:, :, 0] = gold_rgb[0]
    arr[:, :, 1] = gold_rgb[1]
    arr[:, :, 2] = gold_rgb[2]
    arr[:, :, 3] = (alpha * 255.0).astype(np.uint8)
    return Image.fromarray(arr, mode='RGBA')

def build_bali_canopy_top(im_source):
    print("Building bali-canopy-top...")
    # 1. Main bouquet
    crop1 = im_source.crop((120, 180, 1320, 1150))
    line1 = extract_line_mask(crop1)
    line1[-80:, -80:] = 0
    line1[:20, :] = 0
    f1 = colorize_mask(line1, (244, 210, 102))

    # 2. Secondary bouquet
    crop2 = im_source.crop((3480, 4000, 4350, 4450))
    line2 = extract_line_mask(crop2)
    line2[:40, :] = 0
    f2 = colorize_mask(line2, (244, 210, 102))

    canopy = Image.new('RGBA', (1080, 480), (0, 0, 0, 0))

    # Left main sweeping branch
    b_left = f1.resize((680, int(680 * f1.height / f1.width)), Image.Resampling.LANCZOS)
    b_left_rot = b_left.rotate(14, resample=Image.Resampling.BICUBIC, expand=True)
    canopy.alpha_composite(b_left_rot, (-20, -220))

    # Left corner drooping flowers
    b_drop_l = f1.resize((480, int(480 * f1.height / f1.width)), Image.Resampling.LANCZOS)
    b_drop_l = b_drop_l.rotate(-40, resample=Image.Resampling.BICUBIC, expand=True)
    canopy.alpha_composite(b_drop_l, (-120, -30))

    # Right main sweeping branch (Mirrored)
    b_right = b_left.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    canopy.alpha_composite(b_right, (1080 - b_right.width + 20, -220))

    # Right corner drooping flowers
    b_drop_r = b_drop_l.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    canopy.alpha_composite(b_drop_r, (1080 - b_drop_r.width + 120, -30))

    # Center hanging accent
    f2_c = f2.resize((320, int(320 * f2.height / f2.width)), Image.Resampling.LANCZOS)
    f2_c_rot = f2_c.rotate(180, resample=Image.Resampling.BICUBIC, expand=True)
    canopy.alpha_composite(f2_c_rot, (540 - f2_c_rot.width // 2, -135))

    return canopy

def create_sky_background(width=1080, height=1920):
    bg = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(bg)

    stops = [
        (0, (7, 5, 14)),
        (500, (14, 9, 26)),
        (1000, (25, 15, 45)),
        (1350, (40, 20, 62)),
        (1380, (20, 12, 34)),
        (1600, (14, 9, 24)),
        (1920, (8, 5, 16))
    ]

    for y in range(height):
        for i in range(len(stops) - 1):
            y0, c0 = stops[i]
            y1, c1 = stops[i+1]
            if y0 <= y <= y1:
                t = (y - y0) / (y1 - y0)
                r = int(c0[0] + (c1[0] - c0[0]) * t)
                g = int(c0[1] + (c1[1] - c0[1]) * t)
                b = int(c0[2] + (c1[2] - c0[2]) * t)
                draw.line([(0, y), (width, y)], fill=(r, g, b))
                break

    # Add subtle celestial stardust & constellations
    np.random.seed(42)
    star_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    star_draw = ImageDraw.Draw(star_img)

    for _ in range(140):
        sx = int(np.random.uniform(20, width - 20))
        sy = int(np.random.uniform(80, 1150))
        size = np.random.choice([1, 1, 2], p=[0.7, 0.2, 0.1])
        alpha = int(np.random.uniform(90, 220))
        star_draw.ellipse([sx, sy, sx + size, sy + size], fill=(255, 244, 210, alpha))

    bg.paste(star_img, (0, 0), star_img)
    return bg

def draw_mount_agung(canvas):
    w, h = canvas.size
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Distant ridge of Mount Batur
    batur_poly = [
        (0, 1050),
        (200, 960),
        (450, 920),
        (700, 950),
        (950, 1020),
        (1080, 1060),
        (1080, 1360),
        (0, 1360)
    ]
    draw.polygon(batur_poly, fill=(24, 15, 38, 140))

    # Sacred Mount Agung conical peak
    peak_poly = [
        (80, 1360),
        (320, 1120),
        (460, 890),
        (525, 765),
        (540, 755),
        (555, 765),
        (620, 890),
        (760, 1120),
        (1000, 1360)
    ]
    draw.polygon(peak_poly, fill=(32, 18, 50, 195))

    # Ridge line highlights
    draw.line([(540, 755), (510, 880), (450, 1040), (370, 1220)], fill=(225, 185, 75, 55), width=2)
    draw.line([(540, 755), (565, 890), (630, 1060), (710, 1240)], fill=(225, 185, 75, 45), width=2)

    canvas.alpha_composite(overlay)

def draw_golden_blencong_glow(canvas):
    w, h = canvas.size
    glow_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow_layer)

    cx, cy = 540, 1240
    for r in range(460, 20, -20):
        t = 1.0 - (r / 460.0)
        alpha = int(65 * (t ** 1.8))
        draw.ellipse([cx - r, cy - int(r * 1.3), cx + r, cy + int(r * 0.9)], fill=(225, 165, 50, alpha))

    for r in range(160, 10, -15):
        t = 1.0 - (r / 160.0)
        alpha = int(110 * (t ** 1.5))
        draw.ellipse([cx - r, cy - int(r * 1.2), cx + r, cy + int(r * 0.8)], fill=(255, 215, 110, alpha))

    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(12))
    canvas.alpha_composite(glow_layer)

def draw_lake_beratan_ripples(canvas):
    w, h = canvas.size
    lake_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(lake_layer)

    for y_offset in range(0, 420, 10):
        y = 1360 + y_offset
        t = y_offset / 420.0
        width_spread = 220 + int(240 * t)
        alpha = int(60 * (1.0 - t * 0.7))
        draw.line([
            (540 - width_spread // 2, y),
            (540 + width_spread // 2, y)
        ], fill=(245, 205, 90, alpha), width=1)

    for rx, ry, rlen in [
        (320, 1400, 160), (660, 1420, 180),
        (260, 1460, 240), (740, 1480, 220),
        (380, 1530, 280), (620, 1550, 300),
        (220, 1600, 200), (800, 1610, 220),
        (340, 1670, 260), (680, 1690, 280),
        (420, 1740, 220), (580, 1750, 240)
    ]:
        draw.line([(rx - rlen // 2, ry), (rx + rlen // 2, ry)], fill=(235, 195, 80, 45), width=1)

    canvas.alpha_composite(lake_layer)

def add_floating_embers(canvas, count=45, seed=777):
    np.random.seed(seed)
    w, h = canvas.size
    ember_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(ember_layer)

    for _ in range(count):
        ex = int(np.random.uniform(80, w - 80))
        ey = int(np.random.uniform(220, 1750))
        er = np.random.choice([1, 2], p=[0.7, 0.3])
        alpha = int(np.random.uniform(90, 210))
        draw.ellipse([ex, ey, ex + er, ey + er], fill=(255, 225, 130, alpha))

    canvas.alpha_composite(ember_layer)

def generate_all_bali_assets():
    print("Loading source image 40107.jpg...")
    src_path = os.path.join(SOURCE_DIR, '40107.jpg')
    im_source = Image.open(src_path)

    # 1. Build and export bali-canopy-top.webp
    canopy_raw = build_bali_canopy_top(im_source)
    
    # Optimize alpha for WebP compression (keep within 30KB - 120KB)
    arr_c = np.array(canopy_raw)
    arr_c[arr_c[:, :, 3] < 20, 3] = 0
    arr_c[arr_c[:, :, 3] == 0, :3] = 0
    alpha_q = (np.round(arr_c[:, :, 3] / 24.0) * 24.0).clip(0, 255).astype(np.uint8)
    arr_c[:, :, 3] = alpha_q
    canopy_rgba = Image.fromarray(arr_c)

    canopy_out = os.path.join(TARGET_DIR, 'bali-canopy-top.webp')
    canopy_rgba.save(canopy_out, 'WEBP', quality=18, method=6)
    size_kb = os.path.getsize(canopy_out) / 1024
    print(f"Exported: {canopy_out} ({canopy_rgba.size}, {size_kb:.1f} KB)")

    # 2. Load symmetric Pagoda and Palms
    pagoda_path = os.path.join(SOURCE_DIR, 'clean_pagoda_sym.png')
    palms_path = os.path.join(SOURCE_DIR, 'clean_palms.png')

    im_pagoda_raw = Image.open(pagoda_path)
    im_palms_raw = Image.open(palms_path)

    pagoda_gold = tint_existing_rgba(im_pagoda_raw, (244, 212, 102))
    palms_gold = tint_existing_rgba(im_palms_raw, (238, 198, 88))

    # 3. Build bg-stage-bali-candibentar.webp
    print("Composing bg-stage-bali-candibentar...")
    stage = create_sky_background(1080, 1920).convert('RGBA')
    draw_mount_agung(stage)
    draw_golden_blencong_glow(stage)
    draw_lake_beratan_ripples(stage)

    # Palms Flanks
    scale_p = 0.55
    wp = int(palms_gold.width * scale_p)
    hp = int(palms_gold.height * scale_p)
    palm_scaled = palms_gold.resize((wp, hp), Image.Resampling.LANCZOS)

    stage.alpha_composite(palm_scaled, (-380, 680))
    palm_flipped = palm_scaled.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    stage.alpha_composite(palm_flipped, (1080 - wp + 380, 680))

    # Centered 11-Tier Pagoda
    target_h = 1180
    target_w = int(pagoda_gold.width * (target_h / pagoda_gold.height))
    pagoda_scaled = pagoda_gold.resize((target_w, target_h), Image.Resampling.LANCZOS)
    stage.alpha_composite(pagoda_scaled, (540 - target_w // 2, 570))

    # Top Canopy
    stage.alpha_composite(canopy_rgba, (0, 0))

    # Floating sparks
    add_floating_embers(stage, count=45, seed=123)

    # Optimize & export stage WebP
    stage_rgb = stage.convert('RGB')
    stage_med = stage_rgb.filter(ImageFilter.MedianFilter(size=3))
    stage_out = os.path.join(TARGET_DIR, 'bg-stage-bali-candibentar.webp')
    stage_med.save(stage_out, 'WEBP', quality=25, method=6)
    size_kb = os.path.getsize(stage_out) / 1024
    print(f"Exported: {stage_out} ({stage_med.size}, {size_kb:.1f} KB)")

    # 4. Build bg-cover-bali-candibentar.webp
    print("Composing bg-cover-bali-candibentar...")
    cover = stage.copy()
    add_floating_embers(cover, count=75, seed=999)

    w, h = cover.size
    vignette = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    vignette_draw = ImageDraw.Draw(vignette)
    vignette_draw.rectangle([0, 0, w, 120], fill=(5, 3, 10, 50))
    vignette_draw.rectangle([0, h - 160, w, h], fill=(5, 3, 10, 70))
    cover.alpha_composite(vignette)

    cover_rgb = cover.convert('RGB')
    cover_med = cover_rgb.filter(ImageFilter.MedianFilter(size=3))
    cover_out = os.path.join(TARGET_DIR, 'bg-cover-bali-candibentar.webp')
    cover_med.save(cover_out, 'WEBP', quality=24, method=6)
    size_kb = os.path.getsize(cover_out) / 1024
    print(f"Exported: {cover_out} ({cover_med.size}, {size_kb:.1f} KB)")

    print("All Bali assets generated successfully!")

if __name__ == '__main__':
    generate_all_bali_assets()
