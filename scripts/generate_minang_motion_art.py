"""
Generator Motion Art Minang Rumah Gadang Studio-Grade
Renderer: Python PIL & NumPy (Supersampled 2x + Lanczos Downsampling)
Author: Mas Amba, Lead RND & Asset Specialist Tim Sikobokan

Aset yang dihasilkan:
1. bg-cover-minang-rumahgadang.webp (1080x1920) - Rumah Gadang 5-gonjong megah, siluet Marapi & Singgalang, rangkiang kembar, langit malam Bukit Barisan.
2. bg-stage-minang-rumahgadang.webp (1080x1920) - Panggung Stage 2 megah membingkai area teks dengan kontras tinggi.
3. minang-floral-left.webp (500x500 RGBA) - Ukiran Kaluak Paku & Pucuk Rebung emas filigri sudut kiri bawah.
4. minang-floral-right.webp (500x500 RGBA) - Ukiran Kaluak Paku & Pucuk Rebung emas filigri sudut kanan bawah (mirrored).
5. minang-highland-mist.webp (1080x400 RGBA) - Kabut lembah Bukit Barisan / Danau Singkarak seamless horizontal.
"""

import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "motion-art-minang")

# Palet Otentik Marawa & Minangkabau
COLOR_ARANG_DARK = (13, 10, 8)       # #0D0A08 Hitam arang ijuk dasar
COLOR_ARANG_MID = (24, 18, 14)       # #18120E Hitam arang kayu tua
COLOR_CRIMSON_MARAWA = (155, 22, 33) # #9B1621 Merah Marawa crimson
COLOR_GOLD_DEEP = (180, 130, 20)     # #B48214 Emas tua / tembaga ukiran
COLOR_GOLD_PRIMARY = (220, 168, 35)  # #DCA823 Emas songket Minang murni
COLOR_GOLD_BRIGHT = (248, 220, 115)  # #F8DC73 Highlight emas berkilau
COLOR_AMBER_GLOW = (255, 185, 75)    # #FFB94B Pendar lampu damar hangat

def bezier_curve(p0, p1, p2, p3, n=80):
    """Menghitung titik-titik kurva Bézier kubik."""
    p0 = np.array(p0, dtype=np.float64)
    p1 = np.array(p1, dtype=np.float64)
    p2 = np.array(p2, dtype=np.float64)
    p3 = np.array(p3, dtype=np.float64)
    t = np.linspace(0.0, 1.0, n)[:, None]
    curve = (1.0 - t)**3 * p0 + 3.0 * (1.0 - t)**2 * t * p1 + 3.0 * (1.0 - t) * t**2 * p2 + t**3 * p3
    return [tuple(pt) for pt in curve]

def draw_marawa_sky(w, h):
    """
    Langit malam Bukit Barisan:
    Gradien obsidian-indigo (#070B16) -> deep royal midnight (#101A32) -> deep burgundy mist (#180A12).
    Taburan bintang lembut dan rembulan temaram keemasan.
    """
    img = Image.new("RGB", (w, h))
    draw = ImageDraw.Draw(img)

    stops = [
        (0.00, (7, 11, 22)),     # Zenit obsidian indigo
        (0.30, (14, 22, 44)),    # Deep midnight navy
        (0.60, (20, 28, 52)),    # Lembah Bukit Barisan twilight
        (0.80, (26, 16, 28)),    # Deep marawa burgundy glow
        (1.00, (14, 9, 12))      # Kaki bumi gelap
    ]

    for y in range(h):
        pos = y / float(h)
        for i in range(len(stops) - 1):
            p0, c0 = stops[i]
            p1, c1 = stops[i + 1]
            if p0 <= pos <= p1:
                t = (pos - p0) / (p1 - p0)
                # Tonal curve cubic halus
                t_smooth = t * t * (3.0 - 2.0 * t)
                r = int(c0[0] + (c1[0] - c0[0]) * t_smooth)
                g = int(c0[1] + (c1[1] - c0[1]) * t_smooth)
                b = int(c0[2] + (c1[2] - c0[2]) * t_smooth)
                draw.line([(0, y), (w, y)], fill=(r, g, b))
                break

    # Taburan bintang lembut Bukit Barisan
    np.random.seed(1337)
    star_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    star_draw = ImageDraw.Draw(star_img)
    num_stars = 240
    for _ in range(num_stars):
        sx = int(np.random.uniform(40, w - 40))
        sy = int(np.random.uniform(40, h * 0.65))
        rad = np.random.choice([1, 1, 2, 3], p=[0.75, 0.18, 0.05, 0.02])
        alpha = int(np.random.uniform(70, 230))
        # Sedikit variasi warna: keemasan hangat vs kristal kebiruan
        is_warm = np.random.rand() > 0.4
        color = (255, 235, 175, alpha) if is_warm else (210, 230, 255, alpha)
        star_draw.ellipse([sx - rad, sy - rad, sx + rad, sy + rad], fill=color)

    img.paste(star_img, (0, 0), star_img)

    # Rembulan temaram keemasan (Golden Crescent Moon & Hazy Aura)
    moon_cx = int(w * 0.78)
    moon_cy = int(h * 0.18)
    moon_radius = 48

    moon_aura = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    aura_draw = ImageDraw.Draw(moon_aura)
    for r in range(160, 20, -10):
        t = 1.0 - (r / 160.0)
        a = int(35 * (t ** 2.2))
        aura_draw.ellipse([moon_cx - r, moon_cy - r, moon_cx + r, moon_cy + r], fill=(245, 210, 120, a))
    moon_aura = moon_aura.filter(ImageFilter.GaussianBlur(16))
    img.paste(moon_aura, (0, 0), moon_aura)

    # Bulan sabit elegan
    moon_shape = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    m_draw = ImageDraw.Draw(moon_shape)
    # Lingkaran bulan utama
    m_draw.ellipse(
        [moon_cx - moon_radius, moon_cy - moon_radius, moon_cx + moon_radius, moon_cy + moon_radius],
        fill=(255, 238, 180, 235)
    )
    # Mask bayangan bulan untuk membentuk sabit anggun
    shadow_offset_x = 18
    shadow_offset_y = -8
    shadow_rad = moon_radius - 2
    m_draw.ellipse(
        [moon_cx - shadow_rad + shadow_offset_x, moon_cy - shadow_rad + shadow_offset_y,
         moon_cx + shadow_rad + shadow_offset_x, moon_cy + shadow_rad + shadow_offset_y],
        fill=(14, 22, 44, 255)
    )
    img.paste(moon_shape, (0, 0), moon_shape)

    return img

def draw_marapi_singgalang_silhouette(canvas):
    """
    Siluet megah Gunung Marapi (kiri, kerucut stratovolcano)
    dan Gunung Singgalang (kanan, lereng kaldera hijau tua-navy).
    """
    w, h = canvas.size
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # 1. Pegunungan Bukit Barisan Latar Jauh (Horizon Ridge)
    far_ridge = [
        (0, int(h * 0.58)),
        (int(w * 0.15), int(h * 0.54)),
        (int(w * 0.35), int(h * 0.51)),
        (int(w * 0.55), int(h * 0.53)),
        (int(w * 0.75), int(h * 0.49)),
        (int(w * 0.90), int(h * 0.52)),
        (w, int(h * 0.55)),
        (w, h),
        (0, h)
    ]
    draw.polygon(far_ridge, fill=(16, 24, 42, 160))

    # 2. Gunung Marapi di Kiri (Kerucut Gagah dengan puncak kawah vulkanik)
    # Puncak Marapi di x ≈ 0.28 * w, y ≈ 0.38 * h
    marapi_peak_x = int(w * 0.28)
    marapi_peak_y = int(h * 0.38)
    marapi_poly = [
        (0, int(h * 0.65)),
        (int(w * 0.08), int(h * 0.54)),
        (int(w * 0.18), int(h * 0.44)),
        (marapi_peak_x - 30, marapi_peak_y + 8),
        (marapi_peak_x, marapi_peak_y),
        (marapi_peak_x + 35, marapi_peak_y + 12),
        (int(w * 0.40), int(h * 0.46)),
        (int(w * 0.52), int(h * 0.58)),
        (int(w * 0.55), h),
        (0, h)
    ]
    draw.polygon(marapi_poly, fill=(12, 18, 32, 220))

    # Garis punggung kawah Marapi highlight bulan tipis
    draw.line([
        (marapi_peak_x - 30, marapi_peak_y + 8),
        (marapi_peak_x, marapi_peak_y),
        (marapi_peak_x + 35, marapi_peak_y + 12),
        (int(w * 0.40), int(h * 0.46))
    ], fill=(220, 180, 80, 50), width=3)

    # 3. Gunung Singgalang di Kanan (Gagah & Kokoh)
    # Puncak Singgalang di x ≈ 0.72 * w, y ≈ 0.39 * h
    singgalang_peak_x = int(w * 0.74)
    singgalang_peak_y = int(h * 0.39)
    singgalang_poly = [
        (int(w * 0.46), int(h * 0.62)),
        (int(w * 0.58), int(h * 0.49)),
        (singgalang_peak_x - 45, singgalang_peak_y + 10),
        (singgalang_peak_x, singgalang_peak_y),
        (singgalang_peak_x + 40, singgalang_peak_y + 8),
        (int(w * 0.88), int(h * 0.47)),
        (w, int(h * 0.56)),
        (w, h),
        (int(w * 0.46), h)
    ]
    draw.polygon(singgalang_poly, fill=(15, 20, 36, 215))

    # Highlight bulan pada lereng Singgalang
    draw.line([
        (singgalang_peak_x - 45, singgalang_peak_y + 10),
        (singgalang_peak_x, singgalang_peak_y),
        (singgalang_peak_x + 40, singgalang_peak_y + 8),
        (int(w * 0.88), int(h * 0.47))
    ], fill=(235, 195, 95, 65), width=3)

    # 4. Kabut Bukit Barisan di Lembah (Lembah Anai / Ngarai Sianok mist)
    mist_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    mist_draw = ImageDraw.Draw(mist_layer)
    for band_y in [int(h * 0.54), int(h * 0.59), int(h * 0.63)]:
        mist_draw.ellipse(
            [-int(w * 0.1), band_y - 70, int(w * 1.1), band_y + 70],
            fill=(180, 205, 235, 24)
        )
    mist_layer = mist_layer.filter(ImageFilter.GaussianBlur(32))
    overlay.alpha_composite(mist_layer)

    canvas.alpha_composite(overlay)

def render_authentic_gonjong_roof(draw, cx, tip_y, base_y, span_w, flare_dir=0, layers=5):
    """
    Merender gonjong otentik Minang berbasis formula Bézier kuadratik & kubik:
    - Kurva parabolik runcing yang melengkung keluar seperti tanduk kerbau (outward flare).
    - Lapisan sirap ijuk hitam pekat (#0D0A08) berlapis dengan highlight emas (#D4A017).
    - flare_dir: -1 (melengkung ke kiri), 0 (simetris/tengah), 1 (melengkung ke kanan).
    """
    half_span = span_w / 2.0
    left_eave = (cx - half_span, base_y)
    right_eave = (cx + half_span, base_y)

    # Ujung tanduk gonjong melengkung ke luar
    tip_flare_x = cx + flare_dir * 32.0
    tip = (tip_flare_x, tip_y)

    # Render dari layer ijuk terbawah ke teratas untuk efek sirap tumpang tindih
    for l in range(layers):
        offset_y = (layers - 1 - l) * 28.0
        scale = 1.0 - (layers - 1 - l) * 0.045

        cur_left_eave = (cx - half_span * scale, base_y + offset_y)
        cur_right_eave = (cx + half_span * scale, base_y + offset_y)
        cur_tip = (tip_flare_x, tip_y + offset_y * 0.4)

        # Kontrol poin sisi kiri (menjulang parabolik, ditarik 75% ke arah puncak)
        cp1_l = (cur_left_eave[0] + half_span * 0.25, cur_left_eave[1] - 40)
        cp2_l = (cur_tip[0] - half_span * 0.18 - (15 if flare_dir < 0 else 0), cur_tip[1] + (cur_left_eave[1] - cur_tip[1]) * 0.35)
        curve_left = bezier_curve(cur_left_eave, cp1_l, cp2_l, cur_tip, n=50)

        # Kontrol poin sisi kanan
        cp1_r = (cur_tip[0] + half_span * 0.18 + (15 if flare_dir > 0 else 0), cur_tip[1] + (cur_right_eave[1] - cur_tip[1]) * 0.35)
        cp2_r = (cur_right_eave[0] - half_span * 0.25, cur_right_eave[1] - 40)
        curve_right = bezier_curve(cur_tip, cp1_r, cp2_r, cur_right_eave, n=50)

        poly = curve_left + curve_right[1:] + [(cx, base_y + offset_y + 35)]
        
        # Shading sirap ijuk: gradien alami ijuk hitam pekat (#0A0806 -> #16120D)
        shade_val = 10 + l * 4
        ijuk_fill = (shade_val, int(shade_val * 0.85), int(shade_val * 0.70), 255)
        draw.polygon(poly, fill=ijuk_fill)

        # Garis lis sirap ijuk dengan highlight emas halus (#D4A017)
        gold_alpha = 110 if l == (layers - 1) else 65
        gold_color = (COLOR_GOLD_PRIMARY[0], COLOR_GOLD_PRIMARY[1], COLOR_GOLD_PRIMARY[2], gold_alpha)
        for i in range(len(curve_left) - 1):
            draw.line([curve_left[i], curve_left[i + 1]], fill=gold_color, width=3 if l == layers-1 else 2)
        for i in range(len(curve_right) - 1):
            draw.line([curve_right[i], curve_right[i + 1]], fill=gold_color, width=3 if l == layers-1 else 2)

    # Mahkota Tanduk Kerbau Emas (Ujung Puncak Gonjong)
    crown_w = 12
    crown_h = 32
    crown_poly = [
        (tip_flare_x, tip_y - crown_h),
        (tip_flare_x - crown_w, tip_y - crown_h * 0.4),
        (tip_flare_x - 3, tip_y),
        (tip_flare_x + 3, tip_y),
        (tip_flare_x + crown_w, tip_y - crown_h * 0.4)
    ]
    draw.polygon(crown_poly, fill=COLOR_GOLD_BRIGHT)
    draw.line([(tip_flare_x, tip_y - crown_h), (tip_flare_x, tip_y)], fill=(255, 250, 200), width=2)

def draw_pucuk_rebung_strip(draw, x0, y0, x1, y1, triangle_w=32, fill_gold=True):
    """Menggambar motif border horizontal Pucuk Rebung (segitiga runcing berulang khas Minang)."""
    cur_x = x0
    h = y1 - y0
    triangles = []
    while cur_x < x1:
        next_x = min(cur_x + triangle_w, x1)
        mid_x = (cur_x + next_x) / 2.0
        tri = [(cur_x, y1), (mid_x, y0), (next_x, y1)]
        color = COLOR_GOLD_PRIMARY if fill_gold else COLOR_CRIMSON_MARAWA
        draw.polygon(tri, fill=color)
        draw.line(tri + [tri[0]], fill=COLOR_GOLD_BRIGHT, width=2)
        cur_x += triangle_w

def draw_kaluak_paku_scroll(draw, cx, cy, rad=24):
    """Menggambar motif sulur pakis Kaluak Paku melingkar."""
    for r in range(rad, 4, -5):
        box = [cx - r, cy - r, cx + r, cy + r]
        draw.arc(box, start=30, end=300, fill=COLOR_GOLD_PRIMARY, width=3)
    # Inti spiral paku
    draw.ellipse([cx - 4, cy - 4, cx + 4, cy + 4], fill=COLOR_GOLD_BRIGHT)

def draw_carano_ornament(draw, cx, cy, size=36):
    """Motif bunga Carano 8 kelopak simetris."""
    for angle_deg in range(0, 360, 45):
        rad = math.radians(angle_deg)
        px = cx + math.cos(rad) * size * 0.7
        py = cy + math.sin(rad) * size * 0.7
        draw.ellipse([px - 8, py - 8, px + 8, py + 8], fill=COLOR_GOLD_PRIMARY)
        draw.ellipse([px - 4, py - 4, px + 4, py + 4], fill=COLOR_GOLD_BRIGHT)
    # Lingkaran pusat carano
    draw.ellipse([cx - 10, cy - 10, cx + 10, cy + 10], fill=COLOR_CRIMSON_MARAWA)
    draw.ellipse([cx - 6, cy - 6, cx + 6, cy + 6], fill=COLOR_GOLD_BRIGHT)

def render_majestic_rumah_gadang(canvas, is_stage=False):
    """
    Merender Rumah Gadang Gajah Maharam 5-Gonjong megah:
    - 5 gonjong runcing parabolik tanduk kerbau (tengah tertinggi, samping mengapit anggun).
    - Sirap ijuk hitam pekat berlapis dengan highlight emas.
    - Dinding lantiak trapesium terbalik (melebar ke atas).
    - Ukiran Pucuk Rebung, Kaluak Paku, dan Carano dalam palet Marawa.
    - Jendela tingkap berukir emas dengan pencahayaan damar/teplok berkilau.
    - Kolong panggung dengan tiang tonggak tuo dan tangga gonjong.
    """
    w, h = canvas.size
    rg_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(rg_layer)

    center_x = w // 2

    # Geometri Arsitektur (Canvas 2160 x 3840)
    # Posisi Rumah Gadang:
    # Jika stage: gonjong membingkai bagian atas dan tiang di bawah, area tengah tetap lapang.
    # Jika cover: komposisi megah di tengah-bawah.
    base_roof_y = int(h * 0.58) if not is_stage else int(h * 0.52)
    floor_y = base_roof_y + int(h * 0.17)
    ground_y = floor_y + int(h * 0.12)

    # ─────────────────────────────────────────────────────────────────────────
    # 1. DINDING LANTIAK (Trapesium Terbalik Melebar ke Atas)
    # ─────────────────────────────────────────────────────────────────────────
    top_half_w = int(w * 0.40)
    bot_half_w = int(w * 0.33)
    
    wall_poly = [
        (center_x - top_half_w, base_roof_y),
        (center_x + top_half_w, base_roof_y),
        (center_x + bot_half_w, floor_y),
        (center_x - bot_half_w, floor_y)
    ]
    
    # Warna kayu lantiak tua (#140E0A)
    draw.polygon(wall_poly, fill=(20, 14, 10, 255))

    # Panel Marawa Crimson di latar dinding (≤ 20% area sesuai kaidah Muse)
    panel_margin_y = 40
    panel_poly = [
        (center_x - top_half_w + 35, base_roof_y + panel_margin_y),
        (center_x + top_half_w - 35, base_roof_y + panel_margin_y),
        (center_x + bot_half_w - 35, floor_y - panel_margin_y),
        (center_x - bot_half_w + 35, floor_y - panel_margin_y)
    ]
    draw.polygon(panel_poly, fill=(55, 12, 16, 255))

    # Border Pucuk Rebung atas & bawah dinding lantiak
    draw_pucuk_rebung_strip(draw, center_x - top_half_w, base_roof_y - 2, center_x + top_half_w, base_roof_y + 36, triangle_w=40)
    draw_pucuk_rebung_strip(draw, center_x - bot_half_w, floor_y - 36, center_x + bot_half_w, floor_y + 2, triangle_w=36)

    # Garis tepi emas dinding lantiak
    draw.line([wall_poly[0], wall_poly[1], wall_poly[2], wall_poly[3], wall_poly[0]], fill=COLOR_GOLD_PRIMARY, width=4)

    # ─────────────────────────────────────────────────────────────────────────
    # 2. JENDELA TINGKAP DENGAN CAHAYA DAMAR HANGAT BERKILAU
    # ─────────────────────────────────────────────────────────────────────────
    # 5 Jendela tingkap berukir emas tersebar simetris di dinding
    num_windows = 5
    window_w = 64
    window_h = 130
    window_y = base_roof_y + int((floor_y - base_roof_y) * 0.36)

    # Radial glow untuk lampu damar di setiap jendela
    glow_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)

    window_spacing = (top_half_w * 2 - 200) / (num_windows - 1)
    for i in range(num_windows):
        wx = int((center_x - top_half_w + 100) + i * window_spacing)
        
        # Pendar radial damar (#FFB545)
        for gr in range(120, 10, -12):
            t = 1.0 - (gr / 120.0)
            ga = int(85 * (t ** 1.8))
            glow_draw.ellipse([wx - gr, window_y - gr + window_h // 2, wx + gr, window_y + gr + window_h // 2], fill=(255, 185, 70, ga))

        # Bingkai tingkap ukir kayu hitam & emas
        w_box = [wx - window_w // 2, window_y, wx + window_w // 2, window_y + window_h]
        draw.rectangle(w_box, fill=(18, 12, 8, 255), outline=COLOR_GOLD_PRIMARY, width=3)
        
        # Kisi-kisi tingkap vertikal & horizontal
        inner_box = [wx - window_w // 2 + 6, window_y + 6, wx + window_w // 2 - 6, window_y + window_h - 6]
        draw.rectangle(inner_box, fill=(255, 210, 110, 240)) # Cahaya dalam terang
        draw.line([(wx, window_y + 6), (wx, window_y + window_h - 6)], fill=(120, 75, 15), width=3)
        draw.line([(wx - window_w // 2 + 6, window_y + window_h // 2), (wx + window_w // 2 - 6, window_y + window_h // 2)], fill=(120, 75, 15), width=3)

        # Ornamen Kaluak Paku di atas tingkap
        draw_kaluak_paku_scroll(draw, wx, window_y - 18, rad=16)

    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(18))
    rg_layer.alpha_composite(glow_layer)

    # ─────────────────────────────────────────────────────────────────────────
    # 3. ORNAMEN UKIRAN DINDING (CARANO & KALUAK PAKU)
    # ─────────────────────────────────────────────────────────────────────────
    # Carano di antara jendela-jendela
    for i in range(num_windows - 1):
        mid_wx = int((center_x - top_half_w + 100) + (i + 0.5) * window_spacing)
        draw_carano_ornament(draw, mid_wx, window_y + window_h // 2, size=32)

    # ─────────────────────────────────────────────────────────────────────────
    # 4. KOLONG PANGGUNG & TIANG TONGGAK TUO BERUKIR
    # ─────────────────────────────────────────────────────────────────────────
    # Area kolong gelap
    under_poly = [
        (center_x - bot_half_w, floor_y),
        (center_x + bot_half_w, floor_y),
        (center_x + bot_half_w + 30, ground_y),
        (center_x - bot_half_w - 30, ground_y)
    ]
    draw.polygon(under_poly, fill=(8, 6, 5, 255))

    # Tiang-tiang tonggak tuo bulat kayu jati berukir
    num_pillars = 10
    pillar_spacing = (bot_half_w * 2 - 60) / (num_pillars - 1)
    for p in range(num_pillars):
        px = int((center_x - bot_half_w + 30) + p * pillar_spacing)
        pw = 28
        p_box = [px - pw // 2, floor_y, px + pw // 2, ground_y]
        draw.rectangle(p_box, fill=(28, 20, 15), outline=(10, 8, 6), width=2)
        # Cincin ukiran emas di atas dan bawah tiang
        draw.rectangle([px - pw // 2, floor_y + 10, px + pw // 2, floor_y + 22], fill=COLOR_GOLD_PRIMARY)
        draw.rectangle([px - pw // 2, ground_y - 25, px + pw // 2, ground_y - 13], fill=COLOR_GOLD_PRIMARY)
        # Serat kayu vertikal
        draw.line([(px, floor_y), (px, ground_y)], fill=(45, 32, 22), width=2)

    # Tangga Masuk Gonjong (Anjuang Tangga Kayu di Tengah)
    stair_w = 160
    stair_steps = 7
    step_h = (ground_y - floor_y) / stair_steps
    for s in range(stair_steps):
        sy = int(floor_y + s * step_h)
        sw = int(stair_w + s * 14)
        draw.rectangle([center_x - sw // 2, sy, center_x + sw // 2, int(sy + step_h)], fill=(38, 26, 18), outline=COLOR_GOLD_PRIMARY, width=2)
        # Ukiran step
        draw.line([(center_x - sw // 2 + 10, sy + int(step_h // 2)), (center_x + sw // 2 - 10, sy + int(step_h // 2))], fill=COLOR_GOLD_BRIGHT, width=2)

    # ─────────────────────────────────────────────────────────────────────────
    # 5. ATAP GAJAH MAHARAM 5-GONJONG (Bézier Otentik Tanduk Kerbau)
    # ─────────────────────────────────────────────────────────────────────────
    # Puncak gonjong:
    # 1. Gonjong Tengah (Tertinggi, menjulang gagah): center_x, tip_y
    # 2. Gonjong Sayap Kiri: center_x - 360, tip_y + 110, flare melengkung ke kiri
    # 3. Gonjong Sayap Kanan: center_x + 360, tip_y + 110, flare melengkung ke kanan
    # 4. Gonjong Luar Kiri: center_x - 720, tip_y + 240, flare melengkung keluar dramatis
    # 5. Gonjong Luar Kanan: center_x + 720, tip_y + 240, flare melengkung keluar dramatis

    center_tip_y = int(base_roof_y - h * 0.26)
    
    # 5a. Gonjong Luar Kiri & Kanan (Render lebih dulu agar tertumpuk manis)
    outer_span = int(w * 0.38)
    render_authentic_gonjong_roof(draw, center_x - 720, center_tip_y + 240, base_roof_y, outer_span, flare_dir=-1, layers=5)
    render_authentic_gonjong_roof(draw, center_x + 720, center_tip_y + 240, base_roof_y, outer_span, flare_dir=1, layers=5)

    # 5b. Gonjong Sayap Tengah Kiri & Kanan
    mid_span = int(w * 0.44)
    render_authentic_gonjong_roof(draw, center_x - 360, center_tip_y + 110, base_roof_y, mid_span, flare_dir=-1, layers=5)
    render_authentic_gonjong_roof(draw, center_x + 360, center_tip_y + 110, base_roof_y, mid_span, flare_dir=1, layers=5)

    # 5c. Gonjong Puncak Utama (Tengah Paling Gagah)
    main_span = int(w * 0.50)
    render_authentic_gonjong_roof(draw, center_x, center_tip_y, base_roof_y, main_span, flare_dir=0, layers=6)

    # ─────────────────────────────────────────────────────────────────────────
    # 6. RIM LIGHT EMAS TIPIS DI KONTUR ATAP & AMBIENT AURA
    # ─────────────────────────────────────────────────────────────────────────
    # Rim light emas 2-3px pada cucuran atap bawah
    eave_curve_left = [
        (center_x - top_half_w - 40, base_roof_y - 10),
        (center_x - top_half_w * 0.5, base_roof_y + 15),
        (center_x, base_roof_y + 10)
    ]
    eave_curve_right = [
        (center_x, base_roof_y + 10),
        (center_x + top_half_w * 0.5, base_roof_y + 15),
        (center_x + top_half_w + 40, base_roof_y - 10)
    ]
    draw.line(eave_curve_left, fill=COLOR_GOLD_BRIGHT, width=3)
    draw.line(eave_curve_right, fill=COLOR_GOLD_BRIGHT, width=3)

    canvas.alpha_composite(rg_layer)

def draw_rangkiang_twin(canvas, x_pos, base_y, scale=0.45, is_left=True):
    """
    Merender Rangkiang Si Bayau-bayau (lumbung padi bertiang tinggi khas Minangkabau).
    Sebagai pembingkai tradisi di sisi kiri & kanan Rumah Gadang.
    """
    w, h = canvas.size
    rk_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(rk_layer)

    rk_w = int(380 * scale)
    rk_h = int(600 * scale)
    roof_base_y = base_y - int(rk_h * 0.45)
    floor_y = base_y
    ground_y = base_y + int(rk_h * 0.35)

    # Dinding Lantiak Rangkiang
    top_w = rk_w
    bot_w = int(rk_w * 0.75)
    wall_poly = [
        (x_pos - top_w // 2, roof_base_y),
        (x_pos + top_w // 2, roof_base_y),
        (x_pos + bot_w // 2, floor_y),
        (x_pos - bot_w // 2, floor_y)
    ]
    draw.polygon(wall_poly, fill=(22, 16, 12, 245), outline=COLOR_GOLD_PRIMARY, width=2)
    # Aksen Crimson Marawa
    draw.rectangle([x_pos - bot_w // 4, roof_base_y + 15, x_pos + bot_w // 4, floor_y - 15], fill=(70, 15, 20), outline=COLOR_GOLD_DEEP, width=1)

    # Tiang Rangkiang (4 Tiang Tinggi Bulat)
    pillars = [x_pos - bot_w // 2 + 10, x_pos - bot_w // 6, x_pos + bot_w // 6, x_pos + bot_w // 2 - 10]
    for px in pillars:
        draw.rectangle([px - 5, floor_y, px + 5, ground_y], fill=(30, 22, 16), outline=COLOR_GOLD_DEEP, width=1)

    # Tangga Rangkiang
    draw.line([(x_pos + bot_w // 3, floor_y + 10), (x_pos + bot_w // 3 + 25, ground_y)], fill=COLOR_GOLD_PRIMARY, width=2)

    # Atap Gonjong Rangkiang (2 Gonjong Runcing Elegan)
    g_tip_y = roof_base_y - int(240 * scale)
    flare = -1 if is_left else 1
    render_authentic_gonjong_roof(draw, x_pos - int(30 * scale), g_tip_y, roof_base_y, int(rk_w * 1.3), flare_dir=flare, layers=4)
    render_authentic_gonjong_roof(draw, x_pos + int(30 * scale), g_tip_y, roof_base_y, int(rk_w * 1.3), flare_dir=-flare, layers=4)

    canvas.alpha_composite(rk_layer)

def draw_ambient_lantern_glow_and_vignette(canvas, is_stage=False):
    """
    Pencahayaan atmosferik, refleksi panggung, dan radial vignette:
    Jika Stage: area tengah dilindungi dengan vignette lembut agar teks nama pengantin & jadwal terbaca jernih.
    Jika Cover: aura keemasan megah di tengah.
    """
    w, h = canvas.size
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(glow)

    cx, cy = w // 2, int(h * 0.52)

    if not is_stage:
        # Cover Screen: Central Royal Minang Songket Aura
        for r in range(int(w * 0.65), 50, -40):
            t = 1.0 - (r / float(w * 0.65))
            alpha = int(45 * (t ** 2.0))
            g_draw.ellipse([cx - r, cy - int(r * 1.2), cx + r, cy + int(r * 1.2)], fill=(235, 175, 55, alpha))
    else:
        # Stage Screen: Golden framing di tepi atas & bawah, dengan pusat teks bersih dan berbobot
        # Halo hangat lembut di area panggung bawah
        for r in range(int(w * 0.55), 40, -35):
            t = 1.0 - (r / float(w * 0.55))
            alpha = int(38 * (t ** 1.8))
            g_draw.ellipse([cx - r, int(h * 0.65) - r, cx + r, int(h * 0.65) + r], fill=(225, 160, 45, alpha))

        # Dark overlay khusus di area teks panggung tengah (Y: 25% - 70%) untuk kontras teks tinggi
        center_dark = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        cd_draw = ImageDraw.Draw(center_dark)
        for y in range(int(h * 0.20), int(h * 0.72)):
            rel_y = (y - h * 0.46) / (h * 0.26)
            fade = max(0.0, 1.0 - rel_y ** 2)
            alpha_line = int(85 * fade)
            cd_draw.line([(0, y), (w, y)], fill=(12, 8, 10, alpha_line))
        glow.alpha_composite(center_dark)

    glow = glow.filter(ImageFilter.GaussianBlur(24))
    canvas.alpha_composite(glow)

    # Vignette sudut luar frame
    arr = np.array(canvas).astype(np.float32)
    y, x = np.ogrid[:h, :w]
    nx = (x - cx) / float(cx)
    ny = (y - cy) / float(cy)
    dist = np.sqrt(nx**2 + ny**2)
    vignette = np.clip(1.05 - 0.42 * (dist ** 2), 0.35, 1.0)
    for c in range(3):
        arr[:, :, c] = np.clip(arr[:, :, c] * vignette, 0, 255)
    
    return Image.fromarray(arr.astype(np.uint8))

def build_minang_floral_ornament():
    """
    Menghasilkan ornamen sudut ukiran Minang mewah (minang-floral-left & right):
    - Sulur Kaluak Paku emas melingkar berpadu Pucuk Rebung runcing filigri emas (#D4A017, #F5D76E).
    - Aksen Crimson Marawa halus (#9B1621) di pangkal motif.
    - Shading timbul 3D berkelas studio.
    - Canvas supersampled 1000x1000 lalu downsampled ke 500x500 RGBA Lanczos.
    """
    sw, sh = 1000, 1000
    img = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Sulur Kaluak Paku Tunggal (Songket filigree halus, tanpa roda busur sirkus)
    spiral_pts = []
    for deg in range(0, 140, 2):
        rad = math.radians(deg)
        dist = 40 + (deg / 140.0) * 460
        px = int(dist * math.cos(rad * 0.85))
        py = int(1000 - dist * math.sin(rad * 0.85))
        spiral_pts.append((px, py))
    if len(spiral_pts) > 1:
        draw.line(spiral_pts, fill=COLOR_GOLD_PRIMARY, width=7)
        draw.line(spiral_pts, fill=COLOR_GOLD_BRIGHT, width=3)

    # 2. Rangkaian Pucuk Rebung Runcing (Filigri menjulang diagonal ke arah tengah atas)
    rebung_origins = [
        (120, 880, 160, 45),
        (220, 780, 220, 52),
        (340, 660, 260, 58),
        (480, 520, 280, 65),
        (620, 360, 240, 72),
        (760, 200, 180, 80)
    ]
    for rx, ry, rlen, angle_deg in rebung_origins:
        rad = math.radians(angle_deg)
        tip_x = rx + math.cos(rad) * rlen
        tip_y = ry - math.sin(rad) * rlen
        
        # Sayap kiri dan kanan segitiga rebung
        perp_rad = rad + math.pi / 2.0
        w_rebung = rlen * 0.28
        p1 = (rx + math.cos(perp_rad) * w_rebung, ry - math.sin(perp_rad) * w_rebung)
        p2 = (rx - math.cos(perp_rad) * w_rebung, ry + math.sin(perp_rad) * w_rebung)
        
        # Poligon Pucuk Rebung emas dengan aksen Crimson Marawa
        draw.polygon([(tip_x, tip_y), p1, (rx, ry), p2], fill=COLOR_GOLD_PRIMARY)
        draw.polygon([(tip_x, tip_y), p1, (rx, ry)], fill=COLOR_GOLD_BRIGHT) # Highlight satu sisi
        draw.polygon([(rx, ry), p1, p2], fill=COLOR_CRIMSON_MARAWA)          # Aksen merah di pangkal
        draw.line([(tip_x, tip_y), (rx, ry)], fill=(255, 245, 200), width=3) # Tulang tengah mengkilap

    # 3. Kembang Goyang / Bunga Carano di persimpangan sulur
    for cx, cy, sz in [(240, 760, 48), (420, 580, 56), (620, 380, 42)]:
        draw_carano_ornament(draw, cx, cy, size=sz)

    # 4. Manik-manik keemasan bertebaran (stardust filigri)
    np.random.seed(999)
    for _ in range(70):
        bx = int(np.random.uniform(60, 820))
        by = int(np.random.uniform(180, 940))
        # Hanya letakkan manik di dekat diagonal bawah
        if bx + by < 1300 and bx + by > 700:
            rad = np.random.choice([3, 4, 6])
            draw.ellipse([bx - rad, by - rad, bx + rad, by + rad], fill=COLOR_GOLD_BRIGHT)

    # Downsampling Lanczos ke 500x500 RGBA
    floral_left = img.resize((500, 500), Image.Resampling.LANCZOS)
    floral_right = floral_left.transpose(Image.Transpose.FLIP_LEFT_RIGHT)

    return floral_left, floral_right

def build_highland_mist():
    """
    Menghasilkan kabut lembut Danau Singkarak / Lembah Anai (minang-highland-mist.webp):
    - Ukuran 1080x400 RGBA.
    - Seamless horizontal looping sempurna (nilai pixel di x=0 menyambung mulus dengan x=1080).
    - Lapisan kabut atmosferik berarak lembut, ideal untuk animasi looping drift.
    """
    sw, sh = 2160, 800
    arr = np.zeros((sh, sw, 4), dtype=np.float32)

    y_idx, x_idx = np.ogrid[:sh, :sw]
    
    # Frekuensi seamless horizontal: k * (2 * pi / sw)
    t_x = x_idx * (2.0 * np.pi / sw)
    
    # Oktaf gelombang kabut lembut & gumpalan awan lembah
    wave1 = np.sin(t_x * 1.0 + 0.3) * np.cos(y_idx / 110.0)
    wave2 = np.sin(t_x * 2.0 - 0.7) * np.sin(y_idx / 80.0)
    wave3 = np.cos(t_x * 3.0 + 1.2) * np.sin(y_idx / 55.0)
    wave4 = np.sin(t_x * 4.0 + 2.1) * np.cos(y_idx / 40.0)
    wave5 = np.cos(t_x * 6.0 - 0.5) * np.sin(y_idx / 28.0) * 0.35

    density = (wave1 * 0.40 + wave2 * 0.28 + wave3 * 0.16 + wave4 * 0.10 + wave5 * 0.06)
    density = np.clip((density + 1.0) * 0.5, 0.0, 1.0)

    # Micro-wisps texture (kabut berserat alami Bukittinggi)
    np.random.seed(42)
    noise = np.random.normal(0.0, 0.04, (sh, sw))
    # Filter noise agar seamless
    noise[:, :60] = noise[:, :60] * (x_idx[:, :60] / 60.0) + noise[:, -60:] * (1.0 - x_idx[:, :60] / 60.0)
    density = np.clip(density + noise, 0.0, 1.0)

    # Fade out vertikal di atas & bawah agar kabut menyatu lembut
    vertical_fade = np.sin((y_idx / float(sh)) * np.pi) ** 1.5

    alpha = density * vertical_fade * 145.0 # Max alpha ~ 145 (semi-transparan elegan)

    # Warna kabut: kabut pegunungan sejuk berpadu pantulan bulan keemasan lembut
    arr[:, :, 0] = 218.0 # R
    arr[:, :, 1] = 228.0 # G
    arr[:, :, 2] = 242.0 # B (cool misty sky tint)
    arr[:, :, 3] = alpha

    mist_img = Image.fromarray(arr.astype(np.uint8), mode="RGBA")
    mist_img = mist_img.filter(ImageFilter.GaussianBlur(8))

    # Downsample ke 1080x400
    mist_final = mist_img.resize((1080, 400), Image.Resampling.LANCZOS)
    return mist_final

def generate_all_minang_assets():
    """Eksekusi pipeline rendering lengkap seluruh visual motion art Minang."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print("=================================================================")
    print("  STUDIO RENDERER: MOTION ART MINANG RUMAH GADANG (MAS AMBA RND)")
    print("=================================================================")

    # ─────────────────────────────────────────────────────────────────────────
    # 1. GENERATE COVER BACKDROP (bg-cover-minang-rumahgadang.webp)
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[1/5] Merender Cover Screen (2160x3840 supersampled -> 1080x1920 Lanczos)...")
    sw, sh = 2160, 3840
    cover_canvas = draw_marawa_sky(sw, sh)
    cover_rgba = cover_canvas.convert("RGBA")

    # Siluet Gunung Marapi & Singgalang
    draw_marapi_singgalang_silhouette(cover_rgba)

    # Rangkiang Kembar di Kiri & Kanan
    draw_rangkiang_twin(cover_rgba, int(sw * 0.10), int(sh * 0.64), scale=0.85, is_left=True)
    draw_rangkiang_twin(cover_rgba, int(sw * 0.90), int(sh * 0.64), scale=0.85, is_left=False)

    # Rumah Gadang Gajah Maharam 5-Gonjong Megah
    render_majestic_rumah_gadang(cover_rgba, is_stage=False)

    # Ambient Lantern Glow & Vignette
    cover_final_hires = draw_ambient_lantern_glow_and_vignette(cover_rgba, is_stage=False)

    # Downsample ke 1080x1920
    cover_1080 = cover_final_hires.resize((1080, 1920), Image.Resampling.LANCZOS)
    cover_path = os.path.join(OUTPUT_DIR, "bg-cover-minang-rumahgadang.webp")
    # Simpan WebP dengan optimasi tinggi (target: 60KB - 120KB)
    cover_1080.convert("RGB").save(cover_path, "WEBP", quality=80, method=6)
    size_cover_kb = os.path.getsize(cover_path) / 1024.0
    print(f" -> Berhasil: {cover_path} ({cover_1080.size}, {size_cover_kb:.1f} KB)")

    # ─────────────────────────────────────────────────────────────────────────
    # 2. GENERATE STAGE BACKDROP (bg-stage-minang-rumahgadang.webp)
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[2/5] Merender Stage Screen (2160x3840 supersampled -> 1080x1920 Lanczos)...")
    stage_canvas = draw_marawa_sky(sw, sh)
    stage_rgba = stage_canvas.convert("RGBA")

    # Siluet Gunung Marapi & Singgalang
    draw_marapi_singgalang_silhouette(stage_rgba)

    # Rangkiang Kembar
    draw_rangkiang_twin(stage_rgba, int(sw * 0.09), int(sh * 0.62), scale=0.80, is_left=True)
    draw_rangkiang_twin(stage_rgba, int(sw * 0.91), int(sh * 0.62), scale=0.80, is_left=False)

    # Rumah Gadang Gajah Maharam Komposisi Stage (Membingkai harmonis, tengah kontras tinggi)
    render_majestic_rumah_gadang(stage_rgba, is_stage=True)

    # Lighting & Center Content Vignette khusus Stage
    stage_final_hires = draw_ambient_lantern_glow_and_vignette(stage_rgba, is_stage=True)

    stage_1080 = stage_final_hires.resize((1080, 1920), Image.Resampling.LANCZOS)
    stage_path = os.path.join(OUTPUT_DIR, "bg-stage-minang-rumahgadang.webp")
    stage_1080.convert("RGB").save(stage_path, "WEBP", quality=78, method=6)
    size_stage_kb = os.path.getsize(stage_path) / 1024.0
    print(f" -> Berhasil: {stage_path} ({stage_1080.size}, {size_stage_kb:.1f} KB)")

    # ─────────────────────────────────────────────────────────────────────────
    # 3. GENERATE CORNER FLORAL ORNAMENTS (minang-floral-left & right.webp)
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[3/5 & 4/5] Merender Ukiran Sudut Kaluak Paku & Pucuk Rebung (500x500 RGBA)...")
    floral_l, floral_r = build_minang_floral_ornament()

    left_path = os.path.join(OUTPUT_DIR, "minang-floral-left.webp")
    right_path = os.path.join(OUTPUT_DIR, "minang-floral-right.webp")

    floral_l.save(left_path, "WEBP", quality=85, method=6)
    floral_r.save(right_path, "WEBP", quality=85, method=6)

    size_l_kb = os.path.getsize(left_path) / 1024.0
    size_r_kb = os.path.getsize(right_path) / 1024.0
    print(f" -> Berhasil: {left_path} ({floral_l.size}, {size_l_kb:.1f} KB)")
    print(f" -> Berhasil: {right_path} ({floral_r.size}, {size_r_kb:.1f} KB)")

    # ─────────────────────────────────────────────────────────────────────────
    # 4. GENERATE HIGHLAND MIST (minang-highland-mist.webp)
    # ─────────────────────────────────────────────────────────────────────────
    print("\n[5/5] Merender Highland Mist Bukittinggi Seamless Loop (1080x400 RGBA)...")
    mist = build_highland_mist()
    mist_path = os.path.join(OUTPUT_DIR, "minang-highland-mist.webp")
    mist.save(mist_path, "WEBP", quality=75, method=6)
    size_mist_kb = os.path.getsize(mist_path) / 1024.0
    print(f" -> Berhasil: {mist_path} ({mist.size}, {size_mist_kb:.1f} KB)")

    print("\n=================================================================")
    print("  VERIFIKASI & STATISTIK PIXEL ASSET MINANG:")
    print("=================================================================")
    for p in [cover_path, stage_path, left_path, right_path, mist_path]:
        im = Image.open(p)
        kb = os.path.getsize(p) / 1024.0
        extrema = im.getextrema()
        print(f"* {os.path.basename(p):<35} | {im.size[0]}x{im.size[1]} {im.mode} | {kb:6.1f} KB | Extrema: {extrema}")

    print("\n>>> SELURUH ASSET MOTION ART MINANG BERHASIL DIBUAT DENGAN SEMPURNA! <<<")

if __name__ == "__main__":
    generate_all_minang_assets()
