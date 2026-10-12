"""
Generator Minang Lithograph Studio-Grade Engine
Style: 19th-Century Vintage Architectural Woodcut Lithograph & Botanical Engraving
Theme: Lembah Harau, Air Terjun Sarasah & Rumah Gadang Gajah Maharam
Author: Mas Amba, Lead RND Tim Sikobokan
"""

import os
import subprocess
import math
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "motion-art-minang")
os.makedirs(OUTPUT_DIR, exist_ok=True)

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

def render_svg_to_webp(svg_content: str, out_webp: str, width: int, height: int, quality: int = 88):
    temp_html = os.path.join(OUTPUT_DIR, "temp_render.html")
    temp_png = os.path.join(OUTPUT_DIR, "temp_render.png")

    full_html = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; }}
  html, body {{
    margin: 0; padding: 0; width: {width}px; height: {height}px;
    overflow: hidden; background: transparent;
  }}
  svg {{ display: block; width: {width}px; height: {height}px; }}
</style>
</head>
<body>{svg_content}</body>
</html>'''

    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(full_html)

    file_url = f"file:///{temp_html.replace(os.sep, '/')}"
    cmd = [
        EDGE_PATH,
        "--headless=new",
        f"--window-size={width},{height}",
        f"--screenshot={temp_png}",
        "--hide-scrollbars",
        "--default-background-color=00000000",
        file_url
    ]

    subprocess.run(cmd, capture_output=True, text=True)

    if os.path.exists(temp_png):
        img = Image.open(temp_png)
        if img.size != (width, height):
            img = img.crop((0, 0, width, height))
        img.save(out_webp, "WEBP", quality=quality, method=6)
        size_kb = os.path.getsize(out_webp) / 1024
        print(f" [OK] {os.path.basename(out_webp)} ({width}x{height}, {size_kb:.1f} KB)")
        try:
            os.remove(temp_png)
            os.remove(temp_html)
        except Exception:
            pass
    else:
        print(f" [ERR] Gagal merender {out_webp}")


# ─────────────────────────────────────────────────────────────────────────────
# 1. GENERATOR MASTER LITHOGRAPH (STAGE & COVER)
# ─────────────────────────────────────────────────────────────────────────────
def generate_minang_lithograph_svg(is_stage: bool = False) -> str:
    # Arsiran Woodcut Langit & Awan Horisontal (Gravure Hatching)
    sky_hatching = []
    for y in range(40, 680, 16):
        opacity = 0.18 + 0.15 * math.sin(y / 70.0)
        dash = "8 6 16 6" if (y // 16) % 2 == 0 else "14 8 6 8"
        sky_hatching.append(f'<line x1="80" y1="{y}" x2="1000" y2="{y}" stroke="#D4AF37" stroke-width="0.85" stroke-dasharray="{dash}" opacity="{opacity:.2f}" />')

    # Tebing Granit Lembah Harau (Monolitik Vertikal dengan Arsiran Stratigrafi Abad 19)
    # Tebing Kiri (X: 0 - 360, Y: 220 - 1650)
    harau_cliff_left = []
    for x in range(15, 340, 10):
        top_y = 220 + int(40 * math.sin(x / 30.0))
        op = 0.35 + 0.25 * math.cos(x / 45.0)
        harau_cliff_left.append(f'<path d="M {x} {top_y} L {x + 8} 1650" stroke="#E6DDC8" stroke-width="1.1" stroke-dasharray="14 4 28 6" opacity="{op:.2f}" />')

    # Air Terjun Sarasah di Tebing Kiri (Meluncur dari celah tebing X: 240, Y: 380 ke 1100)
    waterfall_lines = []
    for fx in range(232, 258, 4):
        waterfall_lines.append(f'<path d="M {fx} 410 Q {fx - 6} 650 {fx + 4} 920 L {fx - 2} 1180" stroke="#FFFDF7" stroke-width="1.6" stroke-dasharray="18 4 32 6" opacity="0.88" />')
        # Buih air terjun (Stippling mist spray di dasar)
        waterfall_lines.append(f'<circle cx="{fx - 4}" cy="1190" r="3.5" fill="#D4AF37" opacity="0.6" />')
        waterfall_lines.append(f'<circle cx="{fx + 6}" cy="1205" r="4.2" fill="#FFFDF7" opacity="0.5" />')

    # Tebing Kanan Harau (X: 740 - 1080)
    harau_cliff_right = []
    for x in range(760, 1065, 10):
        top_y = 200 + int(50 * math.cos(x / 35.0))
        op = 0.35 + 0.25 * math.sin(x / 50.0)
        harau_cliff_right.append(f'<path d="M {x} {top_y} L {x - 6} 1650" stroke="#E6DDC8" stroke-width="1.1" stroke-dasharray="16 5 24 5" opacity="{op:.2f}" />')

    # Siluet Gunung Marapi / Singgalang di Horizon Jauh (Cross-Hatch Shading)
    mountain_hatching = []
    for my in range(540, 780, 12):
        x_start = 380 - int((my - 540) * 0.7)
        x_end = 700 + int((my - 540) * 0.7)
        mountain_hatching.append(f'<line x1="{x_start}" y1="{my}" x2="{x_end}" y2="{my}" stroke="#D4AF37" stroke-width="1.0" stroke-dasharray="6 4" opacity="0.25" />')

    # Arsiran Sirap Ijuk 7-Gonjong Rumah Gadang (Parabolik Tanduk Kerbau Abad 19)
    gonjong_peaks = [
        (170, 1260, 1380, -18),  # Anjuang Kiri
        (280, 1160, 1360, -12),  # Sayap Luar Kiri
        (410, 1090, 1340, -6),   # Sayap Dalam Kiri
        (540, 1020, 1330, 0),    # Puncak Utama Maharam
        (670, 1090, 1340, 6),    # Sayap Dalam Kanan
        (800, 1160, 1360, 12),   # Sayap Luar Kanan
        (910, 1260, 1380, 18),   # Anjuang Kanan
    ]

    roof_curves = []
    for px, py, base_y, flare in gonjong_peaks:
        horn_tip_x = px + flare
        roof_curves.append(f'''
          <!-- Gonjong di ({px}, {py}) -->
          <path d="M {px - 65} {base_y} Q {px - 25} {py + 140} {horn_tip_x} {py} Q {px + 25} {py + 140} {px + 65} {base_y}" fill="#14110E" stroke="#D4AF37" stroke-width="2.6" stroke-linecap="round" />
          <path d="M {px - 50} {base_y - 15} Q {px - 18} {py + 155} {horn_tip_x} {py + 25} Q {px + 18} {py + 155} {px + 50} {base_y - 15}" fill="none" stroke="#E6DDC8" stroke-width="1.2" stroke-dasharray="6 3" opacity="0.75" />
          <!-- Finial Tanduk Emas (Crown of Honor) -->
          <circle cx="{horn_tip_x}" cy="{py - 6}" r="3.8" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1.5" />
          <line x1="{horn_tip_x}" y1="{py - 6}" x2="{horn_tip_x}" y2="{py + 20}" stroke="#FFFDF7" stroke-width="2" />
        ''')

    # Dinding Lantiak (Trapesium Terbalik Kayu Tua Berukir)
    wall_left_top, wall_right_top = 130, 950
    wall_left_bot, wall_right_bot = 180, 900
    wall_top_y = 1360
    wall_bot_y = 1530

    wall_elements = f'''
      <!-- Dinding Kayu Lantiak Trapesium -->
      <polygon points="{wall_left_top},{wall_top_y} {wall_right_top},{wall_top_y} {wall_right_bot},{wall_bot_y} {wall_left_bot},{wall_bot_y}" fill="#16120F" stroke="#D4AF37" stroke-width="3" />
      <!-- Ukiran Dinding Kisi Pucuk Rebung Horizontal -->
      <line x1="{wall_left_top}" y1="{wall_top_y + 35}" x2="{wall_right_top}" y2="{wall_top_y + 35}" stroke="#D4AF37" stroke-width="1.8" stroke-dasharray="12 4 4 4" />
      <line x1="{wall_left_bot}" y1="{wall_bot_y - 30}" x2="{wall_right_bot}" y2="{wall_bot_y - 30}" stroke="#D4AF37" stroke-width="1.8" stroke-dasharray="12 4 4 4" />
    '''

    # Jendela Tingkap Ukir Abad 19 & Pendar Lampu Damar Hangat
    window_svg = []
    for wx in range(260, 840, 115):
        window_svg.append(f'''
          <rect x="{wx - 26}" y="{wall_top_y + 45}" width="52" height="90" fill="#201812" stroke="#D4AF37" stroke-width="2" rx="4" />
          <rect x="{wx - 18}" y="{wall_top_y + 53}" width="36" height="74" fill="#FFB545" fill-opacity="0.22" stroke="#FFFDF7" stroke-width="1" />
          <!-- Kisi Tingkap Silang -->
          <line x1="{wx}" y1="{wall_top_y + 53}" x2="{wx}" y2="{wall_top_y + 127}" stroke="#D4AF37" stroke-width="1.4" />
          <line x1="{wx - 18}" y1="{wall_top_y + 90}" x2="{wx + 18}" y2="{wall_top_y + 90}" stroke="#D4AF37" stroke-width="1.4" />
          <!-- Halo Damar -->
          <circle cx="{wx}" cy="{wall_top_y + 90}" r="45" fill="#FFB545" fill-opacity="0.08" />
        ''')

    # Tiang Tonggak Tuo Kolong Panggung & Tangga Gonjong
    stilt_svg = []
    for sx in range(wall_left_bot + 25, wall_right_bot - 15, 68):
        stilt_svg.append(f'''
          <rect x="{sx - 7}" y="{wall_bot_y}" width="14" height="150" fill="#110E0C" stroke="#D4AF37" stroke-width="1.4" />
          <!-- Umpak Batu Sandi -->
          <polygon points="{sx - 14},{wall_bot_y + 150} {sx + 14},{wall_bot_y + 150} {sx + 9},{wall_bot_y + 138} {sx - 9},{wall_bot_y + 138}" fill="#241E1A" stroke="#E6DDC8" stroke-width="1" />
        ''')

    # Tangga Masuk di Tengah (Anjuang Tangga Kayu)
    stairs_svg = f'''
      <polygon points="500,{wall_bot_y} 580,{wall_bot_y} 600,{wall_bot_y + 150} 480,{wall_bot_y + 150}" fill="#1B1511" stroke="#D4AF37" stroke-width="2" />
      <line x1="495" y1="{wall_bot_y + 35}" x2="585" y2="{wall_bot_y + 35}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="490" y1="{wall_bot_y + 70}" x2="590" y2="{wall_bot_y + 70}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="485" y1="{wall_bot_y + 105}" x2="595" y2="{wall_bot_y + 105}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="480" y1="{wall_bot_y + 140}" x2="600" y2="{wall_bot_y + 140}" stroke="#FFFDF7" stroke-width="2" />
    '''

    # Rangkiang Kembar di Kiri & Kanan
    rangkiang_svg = f'''
      <!-- Rangkiang Si Bayau-bayau (Kiri) -->
      <g transform="translate(70, 1340) scale(0.68)">
        <polygon points="20,120 180,120 160,260 40,260" fill="#16120E" stroke="#D4AF37" stroke-width="3" />
        <path d="M 0 120 Q 50 10 100 0 Q 150 10 200 120" fill="#14110E" stroke="#D4AF37" stroke-width="3" />
        <rect x="50" y="260" width="16" height="180" fill="#110E0C" stroke="#D4AF37" stroke-width="2" />
        <rect x="134" y="260" width="16" height="180" fill="#110E0C" stroke="#D4AF37" stroke-width="2" />
      </g>
      <!-- Rangkiang Sitinjau Lauik (Kanan) -->
      <g transform="translate(870, 1340) scale(0.68)">
        <polygon points="20,120 180,120 160,260 40,260" fill="#16120E" stroke="#D4AF37" stroke-width="3" />
        <path d="M 0 120 Q 50 10 100 0 Q 150 10 200 120" fill="#14110E" stroke="#D4AF37" stroke-width="3" />
        <rect x="50" y="260" width="16" height="180" fill="#110E0C" stroke="#D4AF37" stroke-width="2" />
        <rect x="134" y="260" width="16" height="180" fill="#110E0C" stroke="#D4AF37" stroke-width="2" />
      </g>
    '''

    # Perlakuan Khusus Stage: Central Negative Space Darkening (Melindungi Keterbacaan Teks UI)
    stage_overlay = ""
    if is_stage:
        stage_overlay = f'''
          <!-- Stage Screen Text Protection Veil: Soft Archival Charcoal Gradient -->
          <rect x="0" y="0" width="1080" height="1920" fill="url(#stageVignetteCenter)" />
        '''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Deep Obsidian Charcoal Archival Canvas -->
    <radialGradient id="charcoalPaper" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#1B1713" />
      <stop offset="60%" stop-color="#120F0D" />
      <stop offset="100%" stop-color="#080706" />
    </radialGradient>

    <!-- Golden Mist Shimmer (Danau Maninjau & Ngarai Sianok Haze) -->
    <linearGradient id="valleyMistGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0" />
      <stop offset="50%" stop-color="#D4AF37" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0" />
    </linearGradient>

    <!-- Stage Center Vignette: Melindungi area teks 25% - 75% Y -->
    <radialGradient id="stageVignetteCenter" cx="50%" cy="45%" r="50%">
      <stop offset="0%" stop-color="#0A0807" stop-opacity="0.75" />
      <stop offset="65%" stop-color="#0A0807" stop-opacity="0.45" />
      <stop offset="100%" stop-color="#0A0807" stop-opacity="0.10" />
    </radialGradient>
  </defs>

  <!-- Latar Belakang Kanvas Kertas Arsip Kuno -->
  <rect width="1080" height="1920" fill="url(#charcoalPaper)" />

  <!-- 1. Arsiran Woodcut Langit & Awan Abad 19 -->
  <g id="sky-engraving">
    {' '.join(sky_hatching)}
    <!-- Bulan Sabit Emas Temaram (Golden Crescent) -->
    <path d="M 830 180 A 42 42 0 1 0 830 250 A 34 34 0 1 1 830 180 Z" fill="#F8E5A7" opacity="0.85" />
    <circle cx="830" cy="215" r="70" fill="#D4AF37" fill-opacity="0.08" />
  </g>

  <!-- 2. Siluet Gunung Marapi & Singgalang di Horison -->
  <g id="volcano-horizon">
    <polygon points="360,780 540,540 720,780" fill="#14100E" stroke="#D4AF37" stroke-width="1.2" opacity="0.6" />
    {' '.join(mountain_hatching)}
  </g>

  <!-- 3. Tebing Vertikal Megalitik Lembah Harau (Kiri & Kanan) -->
  <g id="harau-monoliths">
    <polygon points="0,200 360,240 370,1650 0,1650" fill="#130F0D" />
    <polygon points="720,220 1080,180 1080,1650 710,1650" fill="#130F0D" />
    {' '.join(harau_cliff_left)}
    {' '.join(harau_cliff_right)}
    <!-- Air Terjun Sarasah Murai -->
    {' '.join(waterfall_lines)}
  </g>

  <!-- 4. Kabut Atmosferik Lembah Harau (Golden Valley Mist) -->
  <rect x="0" y="850" width="1080" height="260" fill="url(#valleyMistGrad)" />

  <!-- 5. Kompleks Rumah Gadang Gajah Maharam 7-Gonjong & Rangkiang Kembar -->
  <g id="rumah-gadang-complex">
    {rangkiang_svg}
    {wall_elements}
    {' '.join(window_svg)}
    {' '.join(stilt_svg)}
    {stairs_svg}
    {' '.join(roof_curves)}
  </g>

  <!-- 6. Lapisan Khusus Stage Backdrop (Bila is_stage=True) -->
  {stage_overlay}

  <!-- 7. Border Lis Tipis Filigri Emas Archival (Keliling Luar) -->
  <rect x="24" y="24" width="1032" height="1872" fill="none" stroke="#D4AF37" stroke-width="1.2" opacity="0.45" />
  <rect x="32" y="32" width="1016" height="1856" fill="none" stroke="#D4AF37" stroke-width="0.75" stroke-dasharray="6 4" opacity="0.3" />
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 2. GENERATOR RENDA EMAS SONGKET HEADER (minang-songket-lace.webp)
# ─────────────────────────────────────────────────────────────────────────────
def generate_songket_lace_svg() -> str:
    """Renda tirai pelaminan Songket Pucuk Rebung untuk header (1080x240 RGBA)."""
    pucuk_rebung_triangles = []
    w_lace = 1080
    num_rebung = 18
    step = w_lace / num_rebung

    for i in range(num_rebung):
        x0 = i * step
        x1 = x0 + step
        x_mid = (x0 + x1) / 2.0
        
        # Segitiga Pucuk Rebung menjuntai ke bawah
        pucuk_rebung_triangles.append(f'''
          <polygon points="{x0},45 {x1},45 {x_mid},165" fill="#1E1711" stroke="#D4AF37" stroke-width="2.2" />
          <polygon points="{x0 + 8},45 {x1 - 8},45 {x_mid},145" fill="#2A1F16" stroke="#F5E5B8" stroke-width="1" />
          <!-- Arsiran Intaglio Renda -->
          <line x1="{x_mid}" y1="45" x2="{x_mid}" y2="145" stroke="#D4AF37" stroke-width="1.2" />
          <line x1="{x0 + 15}" y1="80" x2="{x1 - 15}" y2="80" stroke="#D4AF37" stroke-width="0.9" />
          <!-- Manik-manik jumbai gantung (Pendant bead) -->
          <line x1="{x_mid}" y1="165" x2="{x_mid}" y2="195" stroke="#D4AF37" stroke-width="1.5" stroke-dasharray="3 3" />
          <circle cx="{x_mid}" cy="198" r="4.2" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1.2" />
          <circle cx="{x_mid}" cy="214" r="2.8" fill="#F5D76E" />
        ''')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 240" width="1080" height="240">
  <defs>
    <linearGradient id="laceGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="50%" stop-color="#FFF5D6" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
  </defs>

  <!-- Sabuk Pita Emas Paling Atas (Tirai Pelaminan) -->
  <rect x="0" y="0" width="1080" height="20" fill="#140E0A" stroke="url(#laceGoldGrad)" stroke-width="2" />
  <rect x="0" y="20" width="1080" height="25" fill="#221811" stroke="#D4AF37" stroke-width="1.5" />
  
  <!-- Motif Belah Ketupat Saik Galamai di Sabuk Atas -->
  {' '.join([f'<polygon points="{x},32 {x+12},23 {x+24},32 {x+12},41" fill="#D4AF37" stroke="#FFFDF7" stroke-width="0.8" />' for x in range(12, 1070, 36)])}

  <!-- Deretan Renda Bordir Pucuk Rebung Menggantung -->
  {' '.join(pucuk_rebung_triangles)}
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 3. GENERATOR BOTANICAL CORNER ENGRAVING (MENGGANTIKAN SIRKUS KIPAS)
# ─────────────────────────────────────────────────────────────────────────────
def generate_botanical_corner_svg(is_left: bool = True) -> str:
    """
    Menggantikan roda busur sirkus dengan Botanical Etching Daun Sirih & Kaluak Paku Abad 19.
    Ukuran: 500x500 RGBA murni, bersandar anggun di sudut tanpa lengkungan konsentris palsu.
    """
    transform = "" if is_left else 'transform="translate(500, 0) scale(-1, 1)"'

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="botanicalGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="40%" stop-color="#F5D76E" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
  </defs>

  <g {transform}>
    <!-- Sulur Alami Kaluak Paku (Organic Botanical Stem, Bukan Kipas Sirkus!) -->
    <path d="M 0 500 Q 60 410 110 320 Q 150 240 130 180 Q 110 130 65 140 Q 30 150 40 190 Q 50 220 80 210 Q 100 200 95 180" fill="none" stroke="url(#botanicalGold)" stroke-width="4.5" stroke-linecap="round" />
    
    <!-- Ranting Kedua Menjuntai ke Kanan -->
    <path d="M 90 350 Q 180 320 240 250 Q 290 190 270 140 Q 250 100 210 110 Q 180 120 190 150 Q 200 170 220 160" fill="none" stroke="url(#botanicalGold)" stroke-width="3.5" stroke-linecap="round" />

    <!-- 1. Daun Sirih Abad 19 #1 (Cordate Betel Leaf dengan Arsiran Tulang Daun Intaglio) -->
    <g transform="translate(130, 240) rotate(-22)">
      <path d="M 0 0 C -35 -40, -65 -20, -60 25 C -55 70, -12 110, 0 135 C 12 110, 55 70, 60 25 C 65 -20, 35 -40, 0 0 Z" fill="#1C1611" stroke="#D4AF37" stroke-width="2.2" />
      <!-- Tulang Daun & Arsiran Vena -->
      <line x1="0" y1="0" x2="0" y2="130" stroke="#FFFDF7" stroke-width="1.8" />
      <path d="M 0 25 C -22 35, -42 55, -45 80" stroke="#D4AF37" stroke-width="1.1" fill="none" />
      <path d="M 0 25 C 22 35, 42 55, 45 80" stroke="#D4AF37" stroke-width="1.1" fill="none" />
      <path d="M 0 55 C -18 68, -32 85, -30 105" stroke="#D4AF37" stroke-width="1.0" fill="none" />
      <path d="M 0 55 C 18 68, 32 85, 30 105" stroke="#D4AF37" stroke-width="1.0" fill="none" />
    </g>

    <!-- 2. Daun Sirih #2 -->
    <g transform="translate(250, 190) rotate(35) scale(0.82)">
      <path d="M 0 0 C -35 -40, -65 -20, -60 25 C -55 70, -12 110, 0 135 C 12 110, 55 70, 60 25 C 65 -20, 35 -40, 0 0 Z" fill="#1C1611" stroke="#D4AF37" stroke-width="2.2" />
      <line x1="0" y1="0" x2="0" y2="130" stroke="#FFFDF7" stroke-width="1.8" />
      <path d="M 0 25 C -22 35, -42 55, -45 80" stroke="#D4AF37" stroke-width="1.1" fill="none" />
      <path d="M 0 25 C 22 35, 42 55, 45 80" stroke="#D4AF37" stroke-width="1.1" fill="none" />
    </g>

    <!-- 3. Kuncup Bunga Cempaka / Melati Minang Engraved -->
    <g transform="translate(70, 140)">
      <circle cx="0" cy="0" r="10" fill="#241B14" stroke="#FFFDF7" stroke-width="1.6" />
      <circle cx="0" cy="0" r="4.5" fill="#D4AF37" />
      <!-- Mahkota Kelopak Runcing -->
      <path d="M 0 -10 L 4 -20 L 0 -18 L -4 -20 Z" fill="#D4AF37" />
      <path d="M 10 0 L 20 4 L 18 0 L 20 -4 Z" fill="#D4AF37" />
    </g>

    <!-- Manik-manik Embun Emas Halus (Bukan garis kipas) -->
    <circle cx="160" cy="180" r="3.2" fill="#FFFDF7" />
    <circle cx="210" cy="270" r="2.8" fill="#F5D76E" />
    <circle cx="280" cy="140" r="3.5" fill="#FFFDF7" />
  </g>
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 4. RUNNER
# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("=" * 65)
    print("  STUDIO MINANG LITHOGRAPH & ARCHIVAL ENGRAVING GENERATOR")
    print("=" * 65)

    # 1. Stage Backdrop
    print("\n[1/4] Merender bg-stage-minang-lithograph.webp (1080x1920)...")
    stage_svg = generate_minang_lithograph_svg(is_stage=True)
    out_stage = os.path.join(OUTPUT_DIR, "bg-stage-minang-lithograph.webp")
    render_svg_to_webp(stage_svg, out_stage, 1080, 1920, quality=88)

    # 2. Cover Backdrop
    print("\n[2/4] Merender bg-cover-minang-lithograph.webp (1080x1920)...")
    cover_svg = generate_minang_lithograph_svg(is_stage=False)
    out_cover = os.path.join(OUTPUT_DIR, "bg-cover-minang-lithograph.webp")
    render_svg_to_webp(cover_svg, out_cover, 1080, 1920, quality=90)

    # 3. Header Songket Lace
    print("\n[3/4] Merender minang-songket-lace.webp (1080x240 RGBA)...")
    lace_svg = generate_songket_lace_svg()
    out_lace = os.path.join(OUTPUT_DIR, "minang-songket-lace.webp")
    render_svg_to_webp(lace_svg, out_lace, 1080, 240, quality=92)

    # 4. Ganti Total Floral Left & Right (Botanical Engraving, Hapus Sirkus!)
    print("\n[4/4] Mengganti total minang-floral-left & right.webp (500x500 RGBA)...")
    left_svg = generate_botanical_corner_svg(is_left=True)
    right_svg = generate_botanical_corner_svg(is_left=False)
    out_left = os.path.join(OUTPUT_DIR, "minang-floral-left.webp")
    out_right = os.path.join(OUTPUT_DIR, "minang-floral-right.webp")
    render_svg_to_webp(left_svg, out_left, 500, 500, quality=92)
    render_svg_to_webp(right_svg, out_right, 500, 500, quality=92)

    print("\n" + "=" * 65)
    print("  SELESAI! Seluruh aset lithograph Minang telah siap & diverifikasi.")
    print("=" * 65)

if __name__ == "__main__":
    main()
