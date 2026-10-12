"""
Generator Aceh Lithograph Studio-Grade Engine
Style: 19th-Century Archival Woodcut Lithograph & Botanical Copperplate Engraving
Theme: Rumoh Aceh Krong Bade, Gunongan Taman Sari Putri Phang, Gunung Seulawah & Air Terjun Suhom
Author: Mas Amba, Lead RND Tim Sikobokan
"""

import os
import subprocess
import math
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "motion-art-aceh")
os.makedirs(OUTPUT_DIR, exist_ok=True)

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"


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
# 1. GENERATOR MASTER LITHOGRAPH (RUMOH ACEH, GUNONGAN, SEULAWAH, SUHOM)
# ─────────────────────────────────────────────────────────────────────────────
def generate_aceh_lithograph_svg(is_stage: bool = False) -> str:
    # 1. Langit & Gravure Hatching Horisontal Abad 19
    sky_hatching = []
    for y in range(40, 680, 15):
        opacity = 0.16 + 0.14 * math.sin(y / 65.0)
        dash = "10 6 18 6" if (y // 15) % 2 == 0 else "14 8 6 8"
        sky_hatching.append(f'<line x1="60" y1="{y}" x2="1020" y2="{y}" stroke="#D4AF37" stroke-width="0.85" stroke-dasharray="{dash}" opacity="{opacity:.2f}" />')

    # 2. Siluet Megah Gunung Seulawah Agam di Horizon Tengah (420 - 820)
    # Puncak di (540, 470) dengan lereng melebar simetris anggun
    mountain_hatching = []
    for my in range(520, 840, 11):
        span = (my - 470) * 1.05
        x_start = max(260, int(540 - span))
        x_end = min(820, int(540 + span))
        op = 0.22 + 0.15 * math.cos(my / 45.0)
        dash = "8 4 12 5" if (my // 11) % 2 == 0 else "5 3"
        mountain_hatching.append(f'<line x1="{x_start}" y1="{my}" x2="{x_end}" y2="{my}" stroke="#D4AF37" stroke-width="0.95" stroke-dasharray="{dash}" opacity="{op:.2f}" />')

    # 3. Tebing Curam & Air Terjun Suhom di Kanan Belakang (X: 790 - 1050, Y: 480 - 1380)
    suhom_cliff = []
    for x in range(800, 1060, 11):
        top_y = 480 + int(45 * math.sin(x / 30.0))
        op = 0.32 + 0.22 * math.cos(x / 40.0)
        suhom_cliff.append(f'<path d="M {x} {top_y} L {x - 10} 1420" stroke="#E6DDC8" stroke-width="1.1" stroke-dasharray="16 5 24 6" opacity="{op:.2f}" />')

    # Aliran Air Terjun Suhom deras berundak meluncur dari celah tebing
    waterfall_lines = []
    for fx in range(880, 915, 5):
        waterfall_lines.append(f'<path d="M {fx} 520 Q {fx - 8} 740 {fx + 6} 980 L {fx - 2} 1240" stroke="#FFFDF7" stroke-width="1.6" stroke-dasharray="20 5 35 6" opacity="0.9" />')
        # Buih mist semprotan di dasar air terjun
        waterfall_lines.append(f'<circle cx="{fx - 4}" cy="1245" r="3.5" fill="#D4AF37" opacity="0.6" />')
        waterfall_lines.append(f'<circle cx="{fx + 6}" cy="1260" r="4.2" fill="#FFFDF7" opacity="0.5" />')

    # 4. Kompleks Gunongan Taman Sari Putri Phang di Kiri Menengah (X: 70 - 350, Y: 1040 - 1460)
    # Stupa kelopak teratai berundak 3 tingkat karya Sultan Iskandar Muda
    gunongan_elements = f'''
      <!-- Gunongan Taman Sari Putri Phang -->
      <g id="gunongan-putri-phang" opacity="0.95">
        <!-- Bayangan Bukit Pondasi Kapur Putih Gading -->
        <path d="M 60 1440 Q 110 1320 150 1280 Q 200 1200 210 1140 Q 210 1100 230 1080 Q 250 1100 250 1140 Q 260 1200 310 1280 Q 350 1320 400 1440 Z" fill="#1C1814" stroke="#D4AF37" stroke-width="2.2" />
        
        <!-- Arsiran Tekstur Dinding Kapur Gunongan -->
        <path d="M 100 1410 Q 150 1310 180 1270 Q 220 1200 220 1150" fill="none" stroke="#E6DDC8" stroke-width="1.2" stroke-dasharray="8 4" opacity="0.6" />
        <path d="M 360 1410 Q 310 1310 280 1270 Q 240 1200 240 1150" fill="none" stroke="#E6DDC8" stroke-width="1.2" stroke-dasharray="8 4" opacity="0.6" />
        
        <!-- Kelopak Teratai Tingkat 1 (Dasar) -->
        <path d="M 120 1360 Q 230 1310 340 1360" fill="none" stroke="#D4AF37" stroke-width="1.8" />
        <path d="M 150 1380 C 180 1350 210 1350 230 1380 C 250 1350 280 1350 310 1380" fill="none" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="6 3" />

        <!-- Kelopak Teratai Tingkat 2 (Tengah) -->
        <path d="M 160 1270 Q 230 1230 300 1270" fill="none" stroke="#D4AF37" stroke-width="1.8" />
        <path d="M 180 1285 C 200 1265 215 1265 230 1285 C 245 1265 260 1265 280 1285" fill="none" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="5 3" />

        <!-- Puncak Mahkota Stupa Gunongan Tingkat 3 -->
        <path d="M 195 1170 Q 230 1130 265 1170" fill="none" stroke="#D4AF37" stroke-width="1.8" />
        <!-- Finial Kubah Kuncup Bunga Teratai Emas -->
        <path d="M 230 1060 C 220 1075 220 1090 230 1105 C 240 1090 240 1075 230 1060 Z" fill="#F8E5A7" stroke="#D4AF37" stroke-width="1.4" />
        <circle cx="230" cy="1055" r="3.5" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1" />

        <!-- Pintu Masuk Lengkung Rendah Gunongan -->
        <path d="M 215 1440 L 215 1395 A 15 15 0 0 1 245 1395 L 245 1440 Z" fill="#0E0C0A" stroke="#D4AF37" stroke-width="1.5" />
        <line x1="230" y1="1395" x2="230" y2="1440" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
      </g>
    '''

    # 5. RUMOH ACEH KRONG BADE MASTER ARCHITECTURE
    # Terletak megah di tengah-bawah (X: 180 - 900, Y: 940 - 1720)
    # Bubungan Atap Pelana Curam Membujur (Y: 960 s.d. 1360)
    roof_ridge_left_x, roof_ridge_right_x = 280, 800
    roof_ridge_y = 970
    roof_eaves_left_x, roof_eaves_right_x = 180, 900
    roof_eaves_y = 1350

    # Seulimeng & Tolak Angin (Ornamen Segitiga Tebar Layar & Ujung Bubungan)
    seulimeng_left = f'''
      <!-- Seulimeng Ujung Kiri Atap -->
      <path d="M {roof_ridge_left_x} {roof_ridge_y} Q {roof_ridge_left_x - 45} {roof_ridge_y - 35} {roof_ridge_left_x - 65} {roof_ridge_y - 60}" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />
      <circle cx="{roof_ridge_left_x - 65}" cy="{roof_ridge_y - 60}" r="4.5" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1.5" />
      <path d="M {roof_ridge_left_x - 20} {roof_ridge_y} L {roof_ridge_left_x - 55} {roof_ridge_y - 45}" stroke="#F5E5B8" stroke-width="1.4" />
      <!-- Tolak Angin Filigri Floral -->
      <circle cx="{roof_ridge_left_x - 30}" cy="{roof_ridge_y - 25}" r="8" fill="#1C1814" stroke="#D4AF37" stroke-width="1.2" />
    '''

    seulimeng_right = f'''
      <!-- Seulimeng Ujung Kanan Atap -->
      <path d="M {roof_ridge_right_x} {roof_ridge_y} Q {roof_ridge_right_x + 45} {roof_ridge_y - 35} {roof_ridge_right_x + 65} {roof_ridge_y - 60}" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />
      <circle cx="{roof_ridge_right_x + 65}" cy="{roof_ridge_y - 60}" r="4.5" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1.5" />
      <path d="M {roof_ridge_right_x + 20} {roof_ridge_y} L {roof_ridge_right_x + 55} {roof_ridge_y - 45}" stroke="#F5E5B8" stroke-width="1.4" />
      <!-- Tolak Angin Filigri Floral -->
      <circle cx="{roof_ridge_right_x + 30}" cy="{roof_ridge_y - 25}" r="8" fill="#1C1814" stroke="#D4AF37" stroke-width="1.2" />
    '''

    # Arsiran Atap Daun Rumbia / Sirap Curam
    roof_thatch_lines = []
    for ry in range(roof_ridge_y + 25, roof_eaves_y, 22):
        t = (ry - roof_ridge_y) / (roof_eaves_y - roof_ridge_y)
        lx = int(roof_ridge_left_x - t * (roof_ridge_left_x - roof_eaves_left_x))
        rx = int(roof_ridge_right_x + t * (roof_eaves_right_x - roof_ridge_right_x))
        dash = "16 6 8 6" if (ry // 22) % 2 == 0 else "10 5"
        op = 0.45 + 0.25 * math.sin(t * math.pi)
        roof_thatch_lines.append(f'<line x1="{lx + 15}" y1="{ry}" x2="{rx - 15}" y2="{ry}" stroke="#D4AF37" stroke-width="1.3" stroke-dasharray="{dash}" opacity="{op:.2f}" />')
        # Garis rusuk sirap vertikal
        roof_thatch_lines.append(f'<line x1="{lx + 30}" y1="{ry}" x2="{lx + 45}" y2="{ry + 22}" stroke="#FFFDF7" stroke-width="0.8" opacity="0.3" />')
        roof_thatch_lines.append(f'<line x1="{rx - 30}" y1="{ry}" x2="{rx - 45}" y2="{ry + 22}" stroke="#FFFDF7" stroke-width="0.8" opacity="0.3" />')

    # Dinding Papan Ukir Rumoh Aceh (Y: 1350 s.d. 1490)
    wall_left, wall_right = 230, 850
    wall_top_y, wall_bot_y = 1350, 1490

    # Jendela Berterali Ukir Bungong Jeumpa dengan Pendar Lampu Damar Hangat
    rumoh_windows = []
    for wx in (340, 440, 640, 740):
        rumoh_windows.append(f'''
          <!-- Tingkap Jendela Rumoh Aceh -->
          <rect x="{wx - 26}" y="{wall_top_y + 25}" width="52" height="78" fill="#201711" stroke="#D4AF37" stroke-width="2" rx="3" />
          <rect x="{wx - 18}" y="{wall_top_y + 32}" width="36" height="64" fill="#FFB545" fill-opacity="0.25" stroke="#FFFDF7" stroke-width="1" />
          <!-- Terali Ukiran Flora Silang -->
          <line x1="{wx}" y1="{wall_top_y + 32}" x2="{wx}" y2="{wall_top_y + 96}" stroke="#D4AF37" stroke-width="1.3" />
          <line x1="{wx - 18}" y1="{wall_top_y + 64}" x2="{wx + 18}" y2="{wall_top_y + 64}" stroke="#D4AF37" stroke-width="1.3" />
          <!-- Cahaya Damar Hangat -->
          <circle cx="{wx}" cy="{wall_top_y + 64}" r="38" fill="#FFB545" fill-opacity="0.09" />
        ''')

    # Tangga Masuk Utama (Rinyeun) di Tengah dengan 7 Anak Tangga & Atap Selasar Kanopi
    rinyeun_stairs = f'''
      <!-- Selasar Kanopi Tangga Rinyeun -->
      <polygon points="500,{wall_top_y - 20} 580,{wall_top_y - 20} 605,{wall_top_y + 35} 475,{wall_top_y + 35}" fill="#19130F" stroke="#D4AF37" stroke-width="2" />
      <!-- Pintu Masuk Ambang Rendah (Pinto Rendah Menunduk Hormat) -->
      <rect x="510" y="{wall_top_y + 35}" width="60" height="75" fill="#100C09" stroke="#D4AF37" stroke-width="1.8" />
      <path d="M 515 {wall_top_y + 50} Q 540 {wall_top_y + 36} 565 {wall_top_y + 50}" fill="none" stroke="#FFFDF7" stroke-width="1.2" />

      <!-- Tangga Kayu Rinyeun 7 Anak Tangga Menjulur ke Tanah -->
      <polygon points="505,{wall_bot_y} 575,{wall_bot_y} 595,{wall_bot_y + 190} 485,{wall_bot_y + 190}" fill="#18130E" stroke="#D4AF37" stroke-width="2.2" />
      <!-- 7 Anak Tangga Presisi -->
      <line x1="503" y1="{wall_bot_y + 25}" x2="577" y2="{wall_bot_y + 25}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="500" y1="{wall_bot_y + 52}" x2="580" y2="{wall_bot_y + 52}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="497" y1="{wall_bot_y + 79}" x2="583" y2="{wall_bot_y + 79}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="494" y1="{wall_bot_y + 106}" x2="586" y2="{wall_bot_y + 106}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="491" y1="{wall_bot_y + 133}" x2="589" y2="{wall_bot_y + 133}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="488" y1="{wall_bot_y + 160}" x2="592" y2="{wall_bot_y + 160}" stroke="#FFFDF7" stroke-width="2" />
      <line x1="485" y1="{wall_bot_y + 187}" x2="595" y2="{wall_bot_y + 187}" stroke="#FFFDF7" stroke-width="2.2" />
      <!-- Pegangan Tangga (Handrail) Ukir -->
      <line x1="505" y1="{wall_bot_y}" x2="485" y2="{wall_bot_y + 190}" stroke="#D4AF37" stroke-width="2.5" />
      <line x1="575" y1="{wall_bot_y}" x2="595" y2="{wall_bot_y + 190}" stroke="#D4AF37" stroke-width="2.5" />
    '''

    # Tiang Kolong Panggung (Yup Moh): 16 Tiang Kayu Bulat di Atas Umpak Batu Sandi
    rumoh_stilts = []
    stilt_x_positions = [250, 310, 370, 430, 650, 710, 770, 830]
    for sx in stilt_x_positions:
        # Tiang Baris Depan
        rumoh_stilts.append(f'''
          <!-- Tiang Panggung Kayu Tebal di ({sx}) -->
          <rect x="{sx - 8}" y="{wall_bot_y}" width="16" height="190" fill="#130E0B" stroke="#D4AF37" stroke-width="1.6" />
          <!-- Cincin Pengikat Balok & Pasak Kayu -->
          <line x1="{sx - 10}" y1="{wall_bot_y + 60}" x2="{sx + 10}" y2="{wall_bot_y + 60}" stroke="#FFFDF7" stroke-width="1.4" />
          <line x1="{sx - 10}" y1="{wall_bot_y + 120}" x2="{sx + 10}" y2="{wall_bot_y + 120}" stroke="#FFFDF7" stroke-width="1.4" />
          <!-- Umpak Batu Sandi Bulat/Persegi (Batu Alas Tiang) -->
          <polygon points="{sx - 16},{wall_bot_y + 190} {sx + 16},{wall_bot_y + 190} {sx + 11},{wall_bot_y + 175} {sx - 11},{wall_bot_y + 175}" fill="#28201A" stroke="#E6DDC8" stroke-width="1.2" />
        ''')

    # Krong Bade (Lumbung Padi Anyaman Khas Aceh di Kolong Rumah Yup Moh)
    krong_bade_left = f'''
      <!-- Krong Bade (Lumbung Padi Bambu) di Sisi Kiri Kolong -->
      <g transform="translate(265, {wall_bot_y + 40})">
        <!-- Tutup Kerucut Lumbung -->
        <polygon points="45,0 0,25 90,25" fill="#201710" stroke="#D4AF37" stroke-width="1.8" />
        <!-- Tabung Anyaman Bambu Krong -->
        <polygon points="5,25 85,25 78,140 12,140" fill="#1B140E" stroke="#D4AF37" stroke-width="2" />
        <!-- Anyaman Belah Ketupat Litografi -->
        <line x1="5" y1="55" x2="85" y2="55" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
        <line x1="8" y1="85" x2="82" y2="85" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
        <line x1="10" y1="115" x2="80" y2="115" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
        <!-- Kaki Dudukan Penyangga Kayu -->
        <rect x="18" y="140" width="10" height="12" fill="#130E0B" stroke="#D4AF37" stroke-width="1" />
        <rect x="62" y="140" width="10" height="12" fill="#130E0B" stroke="#D4AF37" stroke-width="1" />
      </g>
    '''

    krong_bade_right = f'''
      <!-- Krong Bade di Sisi Kanan Kolong -->
      <g transform="translate(730, {wall_bot_y + 40})">
        <polygon points="45,0 0,25 90,25" fill="#201710" stroke="#D4AF37" stroke-width="1.8" />
        <polygon points="5,25 85,25 78,140 12,140" fill="#1B140E" stroke="#D4AF37" stroke-width="2" />
        <line x1="5" y1="55" x2="85" y2="55" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
        <line x1="8" y1="85" x2="82" y2="85" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
        <line x1="10" y1="115" x2="80" y2="115" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
        <rect x="18" y="140" width="10" height="12" fill="#130E0B" stroke="#D4AF37" stroke-width="1" />
        <rect x="62" y="140" width="10" height="12" fill="#130E0B" stroke="#D4AF37" stroke-width="1" />
      </g>
    '''

    # Ornamen Bungong Jeumpa & Ukiran Tolak Angin pada Dinding Utama
    wall_ornaments = f'''
      <!-- Dinding Papan Kayu Ulin Rumoh Aceh -->
      <polygon points="{wall_left},{wall_top_y} {wall_right},{wall_top_y} {wall_right - 30},{wall_bot_y} {wall_left + 30},{wall_bot_y}" fill="#16110D" stroke="#D4AF37" stroke-width="3" />
      <!-- Jalur Ukiran Balok Tali Pusou Horizontal -->
      <line x1="{wall_left + 10}" y1="{wall_top_y + 15}" x2="{wall_right - 10}" y2="{wall_top_y + 15}" stroke="#D4AF37" stroke-width="1.8" stroke-dasharray="14 4 6 4" />
      <line x1="{wall_left + 25}" y1="{wall_bot_y - 15}" x2="{wall_right - 25}" y2="{wall_bot_y - 15}" stroke="#D4AF37" stroke-width="1.8" stroke-dasharray="14 4 6 4" />
    '''

    # Pohon Bungong Jeumpa / Pinang di Sisi Tepi Latar Depan (Botanical Engraving)
    botanical_left = f'''
      <!-- Pohon Pinang & Bungong Jeumpa Kiri -->
      <g id="flora-kiri" opacity="0.85">
        <path d="M 50 1780 Q 80 1480 65 1180 Q 55 980 90 850" fill="none" stroke="#D4AF37" stroke-width="4.5" stroke-linecap="round" />
        <path d="M 50 1780 Q 75 1480 60 1180" fill="none" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="8 6" />
        <!-- Daun Pelepah Melengkung -->
        <path d="M 90 850 Q 150 820 220 860" fill="none" stroke="#D4AF37" stroke-width="2.5" />
        <path d="M 90 850 Q 40 790 0 830" fill="none" stroke="#D4AF37" stroke-width="2.5" />
        <path d="M 90 850 Q 120 760 180 770" fill="none" stroke="#D4AF37" stroke-width="2.2" />
        <!-- Kuntum Bungong Jeumpa Mekar -->
        <circle cx="160" cy="840" r="6" fill="#F8E5A7" stroke="#D4AF37" stroke-width="1.2" />
        <circle cx="130" cy="765" r="5" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1" />
      </g>
    '''

    botanical_right = f'''
      <!-- Pohon Pinang & Flora Kanan -->
      <g id="flora-kanan" opacity="0.85">
        <path d="M 1030 1780 Q 1000 1480 1015 1180 Q 1025 980 990 850" fill="none" stroke="#D4AF37" stroke-width="4.5" stroke-linecap="round" />
        <path d="M 1030 1780 Q 1005 1480 1020 1180" fill="none" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="8 6" />
        <!-- Daun Pelepah Melengkung -->
        <path d="M 990 850 Q 930 820 860 860" fill="none" stroke="#D4AF37" stroke-width="2.5" />
        <path d="M 990 850 Q 1040 790 1080 830" fill="none" stroke="#D4AF37" stroke-width="2.5" />
        <path d="M 990 850 Q 960 760 900 770" fill="none" stroke="#D4AF37" stroke-width="2.2" />
        <!-- Kuntum Bunga -->
        <circle cx="920" cy="840" r="6" fill="#F8E5A7" stroke="#D4AF37" stroke-width="1.2" />
      </g>
    '''

    # Perlakuan Khusus Stage: Central Darkening Vignette (Proteksi Keterbacaan Teks UI)
    stage_overlay = ""
    if is_stage:
        stage_overlay = f'''
          <!-- Stage Center Negative Space Darkening: Area Teks Y: 360 s.d. 1480 Sangat Bersih & Kontras -->
          <rect x="0" y="0" width="1080" height="1920" fill="url(#stageVignetteCenter)" />
          <rect x="0" y="320" width="1080" height="1180" fill="url(#stageCenterSoftDark)" />
        '''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Deep Obsidian Charcoal Archival Canvas (Monokrom Arang Obsidian) -->
    <radialGradient id="charcoalPaperAceh" cx="50%" cy="46%" r="68%">
      <stop offset="0%" stop-color="#181410" />
      <stop offset="55%" stop-color="#110E0B" />
      <stop offset="100%" stop-color="#070605" />
    </radialGradient>

    <!-- Golden Mist Shimmer (Kabut Lembah Seulawah & Krueng Aceh) -->
    <linearGradient id="acehValleyMist" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0" />
      <stop offset="50%" stop-color="#D4AF37" stop-opacity="0.14" />
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0" />
    </linearGradient>

    <!-- Stage Center Vignette Radial: Melindungi area teks 20% - 80% Y -->
    <radialGradient id="stageVignetteCenter" cx="50%" cy="46%" r="52%">
      <stop offset="0%" stop-color="#080706" stop-opacity="0.82" />
      <stop offset="60%" stop-color="#080706" stop-opacity="0.55" />
      <stop offset="100%" stop-color="#080706" stop-opacity="0.12" />
    </radialGradient>

    <!-- Stage Center Linear Veil Tambahan -->
    <linearGradient id="stageCenterSoftDark" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090706" stop-opacity="0.2" />
      <stop offset="30%" stop-color="#090706" stop-opacity="0.65" />
      <stop offset="70%" stop-color="#090706" stop-opacity="0.65" />
      <stop offset="100%" stop-color="#090706" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- Latar Belakang Kanvas Kertas Arsip Kuno Abad 19 -->
  <rect width="1080" height="1920" fill="url(#charcoalPaperAceh)" />

  <!-- 1. Arsiran Gravure Langit & Bulan Sabit (Buleuen Sabit Aceh) -->
  <g id="sky-engraving">
    {' '.join(sky_hatching)}
    <!-- Bulan Sabit Emas Temaram (Buleuen Sabit Kesultanan) -->
    <path d="M 850 170 A 40 40 0 1 0 850 238 A 32 32 0 1 1 850 170 Z" fill="#F8E5A7" opacity="0.88" />
    <circle cx="850" cy="204" r="65" fill="#D4AF37" fill-opacity="0.09" />
    <!-- Bintang Fajar Keumala Emas -->
    <polygon points="805,175 808,185 818,185 810,192 813,202 805,195 797,202 800,192 792,185 802,185" fill="#FFFDF7" opacity="0.8" />
  </g>

  <!-- 2. Siluet Gunung Seulawah Agam di Cakrawala -->
  <g id="gunung-seulawah">
    <polygon points="240,840 540,470 840,840" fill="#130F0C" stroke="#D4AF37" stroke-width="1.3" opacity="0.65" />
    {' '.join(mountain_hatching)}
  </g>

  <!-- 3. Tebing Granit Suhom & Air Terjun Mengalir Deras (Kanan) -->
  <g id="suhom-cliff-waterfall">
    <polygon points="780,480 1080,430 1080,1480 770,1480" fill="#120E0B" />
    {' '.join(suhom_cliff)}
    {' '.join(waterfall_lines)}
  </g>

  <!-- 4. Kabut Atmosferik Lembah Krueng Aceh -->
  <rect x="0" y="780" width="1080" height="260" fill="url(#acehValleyMist)" />

  <!-- 5. Kompleks Gunongan Taman Sari Putri Phang (Kiri) -->
  {gunongan_elements}

  <!-- 6. Flora Botani Pelepah Pinang & Bungong Jeumpa di Tepi Luar -->
  {botanical_left}
  {botanical_right}

  <!-- 7. Rumoh Aceh Krong Bade Master Complex -->
  <g id="rumoh-aceh-complex">
    <!-- Atap Pelana Curam Rumbia -->
    <polygon points="{roof_ridge_left_x},{roof_ridge_y} {roof_ridge_right_x},{roof_ridge_y} {roof_eaves_right_x},{roof_eaves_y} {roof_eaves_left_x},{roof_eaves_y}" fill="#140F0C" stroke="#D4AF37" stroke-width="3.2" />
    <!-- Garis Bubungan Atap -->
    <line x1="{roof_ridge_left_x}" y1="{roof_ridge_y}" x2="{roof_ridge_right_x}" y2="{roof_ridge_y}" stroke="#FFFDF7" stroke-width="3.5" />
    <!-- Ornamen Seulimeng Kiri & Kanan -->
    {seulimeng_left}
    {seulimeng_right}
    <!-- Arsiran Sirap Atap -->
    {' '.join(roof_thatch_lines)}

    <!-- Dinding Kayu Ukir Rumoh Aceh -->
    {wall_ornaments}
    {' '.join(rumoh_windows)}

    <!-- Kolong Panggung Yup Moh & Krong Bade -->
    {krong_bade_left}
    {krong_bade_right}
    {' '.join(rumoh_stilts)}

    <!-- Tangga Masuk Rinyeun 7 Anak Tangga -->
    {rinyeun_stairs}
  </g>

  <!-- 8. Lapisan Khusus Stage Backdrop (Bila is_stage=True) -->
  {stage_overlay}

  <!-- 9. Border Lis Filigri Emas Archival (Double Hairline Frame) -->
  <rect x="24" y="24" width="1032" height="1872" fill="none" stroke="#D4AF37" stroke-width="1.2" opacity="0.45" />
  <rect x="32" y="32" width="1016" height="1856" fill="none" stroke="#D4AF37" stroke-width="0.75" stroke-dasharray="6 4" opacity="0.32" />
  
  <!-- Corner Medallion Ornaments Kecil di 4 Sudut -->
  <g transform="translate(32, 32)">
    <circle cx="0" cy="0" r="8" fill="#14100D" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
  <g transform="translate(1048, 32)">
    <circle cx="0" cy="0" r="8" fill="#14100D" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
  <g transform="translate(32, 1888)">
    <circle cx="0" cy="0" r="8" fill="#14100D" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
  <g transform="translate(1048, 1888)">
    <circle cx="0" cy="0" r="8" fill="#14100D" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 2. GENERATOR RENDA ATAP PELMET PINTO ACEH (aceh-pinto-lace.webp - 1080x320 RGBA)
# ─────────────────────────────────────────────────────────────────────────────
def generate_pinto_lace_svg() -> str:
    """
    Renda atap pelmet motif Pinto Aceh & Bungong Jeumpa berulang seamless transparan alpha (1080x320 RGBA).
    Terinspirasi dari Kasab Bordir Beludru Emas Tirai Pelaminan Aceh.
    """
    w_lace = 1080
    num_modules = 12  # 12 modul pinto berulang = 90px per modul
    step = w_lace / num_modules

    pinto_modules = []
    for i in range(num_modules):
        x0 = i * step
        x_mid = x0 + step / 2.0
        x1 = x0 + step

        # Tiap modul: Gerbang Pinto Khop Mini & Sulur Sayap Bungong Jeumpa
        pinto_modules.append(f'''
          <!-- Modul Pinto Aceh #{i+1} di ({x_mid:.1f}) -->
          <!-- Sayap Sulur Kiri & Kanan -->
          <path d="M {x_mid} 60 Q {x0 + 10} 95 {x0 + 14} 150 Q {x0 + 35} 140 {x_mid - 12} 180" fill="#18120D" stroke="#D4AF37" stroke-width="2" />
          <path d="M {x_mid} 60 Q {x1 - 10} 95 {x1 - 14} 150 Q {x1 - 35} 140 {x_mid + 12} 180" fill="#18120D" stroke="#D4AF37" stroke-width="2" />
          
          <!-- Lengkung Kubah Gerbang Pinto Khop -->
          <path d="M {x_mid - 24} 190 Q {x_mid} 115 {x_mid + 24} 190" fill="#221810" stroke="#FFFDF7" stroke-width="1.8" />
          <path d="M {x_mid - 18} 190 Q {x_mid} 130 {x_mid + 18} 190" fill="#100C09" stroke="#D4AF37" stroke-width="1.2" />
          
          <!-- Stupa Mahkota Kuncup Bunga Teratai di Puncak Modul -->
          <circle cx="{x_mid}" cy="54" r="5" fill="#F8E5A7" stroke="#D4AF37" stroke-width="1.4" />
          <line x1="{x_mid}" y1="42" x2="{x_mid}" y2="50" stroke="#FFFDF7" stroke-width="1.6" />

          <!-- Kisi Filigri Intaglio dalam Kubah -->
          <line x1="{x_mid}" y1="130" x2="{x_mid}" y2="190" stroke="#D4AF37" stroke-width="1.2" />
          <line x1="{x_mid - 9}" y1="145" x2="{x_mid - 9}" y2="190" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 2" />
          <line x1="{x_mid + 9}" y1="145" x2="{x_mid + 9}" y2="190" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 2" />

          <!-- Kelopak Segitiga Gantung di Bawah Kubah -->
          <polygon points="{x_mid - 24},190 {x_mid + 24},190 {x_mid},245" fill="#1A130E" stroke="#D4AF37" stroke-width="2" />
          <polygon points="{x_mid - 16},190 {x_mid + 16},190 {x_mid},230" fill="#291E14" stroke="#F5E5B8" stroke-width="1" />
          
          <!-- Untaian Manik Emas & Jumbai Gantung (Tassel Fringe) -->
          <line x1="{x_mid}" y1="245" x2="{x_mid}" y2="282" stroke="#D4AF37" stroke-width="1.8" stroke-dasharray="4 3" />
          <circle cx="{x_mid}" cy="286" r="4.5" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1.4" />
          <circle cx="{x_mid}" cy="302" r="3" fill="#F5D76E" />

          <!-- Manik Gantung Samping Kiri & Kanan -->
          <line x1="{x0 + 20}" y1="165" x2="{x0 + 20}" y2="215" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 3" />
          <circle cx="{x0 + 20}" cy="218" r="3.2" fill="#D4AF37" />
          <line x1="{x1 - 20}" y1="165" x2="{x1 - 20}" y2="215" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 3" />
          <circle cx="{x1 - 20}" cy="218" r="3.2" fill="#D4AF37" />
        ''')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 320" width="1080" height="320">
  <defs>
    <linearGradient id="acehGoldGradLace" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="25%" stop-color="#FFFDF7" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="75%" stop-color="#FFFDF7" />
      <stop offset="100%" stop-color="#D4AF37" />
    </linearGradient>
  </defs>

  <!-- Sabuk Pita Emas Paling Atas (Balok Bordir Kasab Beludru) -->
  <rect x="0" y="0" width="1080" height="24" fill="#130D08" stroke="url(#acehGoldGradLace)" stroke-width="2.2" />
  <rect x="0" y="24" width="1080" height="26" fill="#1F1610" stroke="#D4AF37" stroke-width="1.5" />

  <!-- Motif Belah Ketupat Kasab Meukutop di Sabuk Atas -->
  {' '.join([f'<polygon points="{x},37 {x+12},27 {x+24},37 {x+12},47" fill="#D4AF37" stroke="#FFFDF7" stroke-width="0.8" />' for x in range(12, 1070, 36)])}

  <!-- Deretan Renda Pinto Aceh & Bungong Jeumpa Menggantung -->
  {' '.join(pinto_modules)}
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 3. GENERATOR MEDALLION SEGEL PINTO ACEH (aceh-pinto-seal.svg)
# ─────────────────────────────────────────────────────────────────────────────
def generate_pinto_seal_svg() -> str:
    """
    Medallion segel lambang Pinto Aceh emas murni 1px hairline SVG (600x600).
    Gerbang Pinto Khop / Pinto Aceh legendaris dengan kubah stupa lengkung,
    ruji-ruji filigri, sayap motif Bungong Jeumpa, dan border lingkaran ukiran floral Aceh.
    """
    # 48 butir manik emas (beaded circle) di lingkaran luar
    beads = []
    for deg in range(0, 360, 8):
        rad = math.radians(deg)
        cx = 300 + 265 * math.cos(rad)
        cy = 300 + 265 * math.sin(rad)
        beads.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="2.8" fill="#D4AF37" />')

    # 16 ornamen kelopak melati Bungong Kupula di lingkaran cincin kedua
    kupula_petals = []
    for deg in range(0, 360, 24):
        rad = math.radians(deg)
        cx1 = 300 + 242 * math.cos(rad)
        cy1 = 300 + 242 * math.sin(rad)
        kupula_petals.append(f'<circle cx="{cx1:.2f}" cy="{cy1:.2f}" r="4.2" fill="#18130E" stroke="#D4AF37" stroke-width="1" />')
        kupula_petals.append(f'<circle cx="{cx1:.2f}" cy="{cy1:.2f}" r="1.8" fill="#FFFDF7" />')

    # Ruji-ruji filigri 1px vertikal di dalam kubah mahkota Pinto Khop
    dome_filigree = []
    for dx in range(255, 350, 8):
        dome_filigree.append(f'<line x1="{dx}" y1="180" x2="{dx}" y2="245" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 2" />')

    # 7 untai rumbai gantung (tassels) di dasar gerbang
    tassels = []
    for tx in range(255, 350, 15):
        tassels.append(f'''
          <line x1="{tx}" y1="410" x2="{tx}" y2="455" stroke="#D4AF37" stroke-width="1" stroke-dasharray="3 2" />
          <circle cx="{tx}" cy="458" r="3.2" fill="#FFFDF7" stroke="#D4AF37" stroke-width="0.8" />
          <circle cx="{tx}" cy="470" r="2.2" fill="#F5D76E" />
        ''')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Gradien Emas Kuno Hairline -->
    <linearGradient id="pintoGoldHairline" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="35%" stop-color="#F5D76E" />
      <stop offset="70%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#997A15" />
    </linearGradient>

    <radialGradient id="sealBackdropDark" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1A140F" stop-opacity="0.95" />
      <stop offset="75%" stop-color="#120E0A" stop-opacity="0.98" />
      <stop offset="100%" stop-color="#0A0806" stop-opacity="1" />
    </radialGradient>
  </defs>

  <!-- Latar Belakang Medallion Arang Obsidian Gelap -->
  <circle cx="300" cy="300" r="285" fill="url(#sealBackdropDark)" stroke="url(#pintoGoldHairline)" stroke-width="1.8" />

  <!-- Lingkaran Luar Berbutir Emas (Beaded Outer Ring) -->
  <circle cx="300" cy="300" r="265" fill="none" stroke="#D4AF37" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.6" />
  {' '.join(beads)}

  <!-- Cincin Konsentris Ganda 1px Hairline -->
  <circle cx="300" cy="300" r="252" fill="none" stroke="#FFFDF7" stroke-width="1" />
  <circle cx="300" cy="300" r="232" fill="none" stroke="#D4AF37" stroke-width="1" />
  {' '.join(kupula_petals)}
  <circle cx="300" cy="300" r="218" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="6 3" />

  <!-- ═══════════════════════════════════════════════════════════════════════ -->
  <!-- INTI LAMBANG PINTO ACEH (PINTO KHOP KESULTANAN ACEH) -->
  <!-- ═══════════════════════════════════════════════════════════════════════ -->
  <g id="lambang-pinto-aceh" transform="translate(0, 0)">
    <!-- 1. Puncak Mahkota Stupa / Kuncup Teratai Emas -->
    <path d="M 300 95 C 285 115 285 135 300 155 C 315 135 315 115 300 95 Z" fill="#241B13" stroke="url(#pintoGoldHairline)" stroke-width="1.4" />
    <circle cx="300" cy="90" r="5" fill="#FFFDF7" stroke="#D4AF37" stroke-width="1" />
    <line x1="300" y1="70" x2="300" y2="85" stroke="#FFFDF7" stroke-width="1.5" />

    <!-- Mahkota Kelopak Atas -->
    <path d="M 280 155 Q 300 135 320 155" fill="none" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="280" cy="155" r="3.2" fill="#D4AF37" />
    <circle cx="320" cy="155" r="3.2" fill="#D4AF37" />

    <!-- 2. Kubah Atas Pinto Khop dengan Garis Ruji-Ruji Filigri 1px -->
    <path d="M 245 245 Q 300 165 355 245" fill="#1C150F" stroke="url(#pintoGoldHairline)" stroke-width="2" />
    <path d="M 255 245 Q 300 180 345 245" fill="none" stroke="#FFFDF7" stroke-width="1" />
    {' '.join(dome_filigree)}

    <!-- 3. Dua Sayap Melengkung Sulur Pinto Aceh (Sayap Kiri & Kanan) -->
    <!-- Sayap Kiri -->
    <path d="M 245 245 C 190 200 130 250 145 320 C 155 370 215 390 245 410" fill="none" stroke="url(#pintoGoldHairline)" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 240 255 C 198 218 148 260 160 318 C 170 358 220 375 242 398" fill="none" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="5 3" />
    <!-- Gulungan Sulur Dalam Kiri -->
    <path d="M 145 320 Q 170 300 185 330 Q 195 350 180 360 Q 165 365 160 345" fill="none" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="172" cy="342" r="3" fill="#FFFDF7" />

    <!-- Sayap Kanan -->
    <path d="M 355 245 C 410 200 470 250 455 320 C 445 370 385 390 355 410" fill="none" stroke="url(#pintoGoldHairline)" stroke-width="2.2" stroke-linecap="round" />
    <path d="M 360 255 C 402 218 452 260 440 318 C 430 358 380 375 358 398" fill="none" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="5 3" />
    <!-- Gulungan Sulur Dalam Kanan -->
    <path d="M 455 320 Q 430 300 415 330 Q 405 350 420 360 Q 435 365 440 345" fill="none" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="428" cy="342" r="3" fill="#FFFDF7" />

    <!-- 4. Gerbang Lengkung Utama Pinto Khop di Tengah -->
    <!-- Kusen Luar -->
    <path d="M 245 410 L 245 270 Q 300 230 355 270 L 355 410 Z" fill="#150F0B" stroke="url(#pintoGoldHairline)" stroke-width="2" />
    <!-- Kusen Dalam -->
    <path d="M 260 410 L 260 290 Q 300 255 340 290 L 340 410 Z" fill="#0E0A07" stroke="#FFFDF7" stroke-width="1.2" />
    
    <!-- Terali Filigri Pintu Emas Silang Intaglio -->
    <line x1="260" y1="310" x2="340" y2="390" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
    <line x1="340" y1="310" x2="260" y2="390" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 3" />
    <circle cx="300" cy="350" r="14" fill="#241B13" stroke="#D4AF37" stroke-width="1.2" />
    <circle cx="300" cy="350" r="4.5" fill="#FFFDF7" />

    <!-- 5. Palang Balok Dasar & 7 Untai Rumbai Manik Emas Gantung -->
    <rect x="235" y="405" width="130" height="10" fill="#2A1E14" stroke="#D4AF37" stroke-width="1.4" rx="2" />
    {' '.join(tassels)}
  </g>

  <!-- Tulisan Mikro Monogram Archival Hairline di Busur Bawah -->
  <path id="archivalArcText" d="M 120 440 A 240 240 0 0 0 480 440" fill="none" />
  <text font-family="'Times New Roman', Georgia, serif" font-size="11" fill="#D4AF37" letter-spacing="4" opacity="0.75">
    <textPath href="#archivalArcText" startOffset="50%" text-anchor="middle">
      K E S U L T A N A N   A C E H   D A R U S S A L A M
    </textPath>
  </text>
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 4. RUNNER & VALIDATOR
# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("=" * 68)
    print("  STUDIO ACEH LITHOGRAPH & ARCHIVAL ENGRAVING GENERATOR")
    print("=" * 68)

    # 1. Stage Backdrop
    print("\n[1/4] Merender bg-stage-aceh-krongbade.webp (1080x1920)...")
    stage_svg = generate_aceh_lithograph_svg(is_stage=True)
    out_stage = os.path.join(OUTPUT_DIR, "bg-stage-aceh-krongbade.webp")
    render_svg_to_webp(stage_svg, out_stage, 1080, 1920, quality=88)

    # 2. Cover Backdrop
    print("\n[2/4] Merender bg-cover-aceh-krongbade.webp (1080x1920)...")
    cover_svg = generate_aceh_lithograph_svg(is_stage=False)
    out_cover = os.path.join(OUTPUT_DIR, "bg-cover-aceh-krongbade.webp")
    render_svg_to_webp(cover_svg, out_cover, 1080, 1920, quality=90)

    # 3. Header Pinto Lace Pelmet
    print("\n[3/4] Merender aceh-pinto-lace.webp (1080x320 RGBA)...")
    lace_svg = generate_pinto_lace_svg()
    out_lace = os.path.join(OUTPUT_DIR, "aceh-pinto-lace.webp")
    render_svg_to_webp(lace_svg, out_lace, 1080, 320, quality=92)

    # 4. Medallion Segel Lambang Pinto Aceh (SVG Vektor 1px Hairline)
    print("\n[4/4] Menulis aceh-pinto-seal.svg (600x600 SVG Hairline Medallion)...")
    seal_svg = generate_pinto_seal_svg()
    out_seal = os.path.join(OUTPUT_DIR, "aceh-pinto-seal.svg")
    with open(out_seal, "w", encoding="utf-8") as f:
        f.write(seal_svg)
    size_seal_kb = os.path.getsize(out_seal) / 1024
    print(f" [OK] {os.path.basename(out_seal)} (600x600 SVG, {size_seal_kb:.1f} KB)")

    print("\n" + "=" * 68)
    print("  VERIFIKASI KUALITAS ASET (DIMENSI, UKURAN & PIXEL EXTREMA)")
    print("=" * 68)

    # Verifikasi WebP dan SVG
    expected_files = [
        ("bg-cover-aceh-krongbade.webp", (1080, 1920)),
        ("bg-stage-aceh-krongbade.webp", (1080, 1920)),
        ("aceh-pinto-lace.webp", (1080, 320)),
        ("aceh-pinto-seal.svg", None)
    ]

    all_passed = True
    for fname, exp_dims in expected_files:
        fpath = os.path.join(OUTPUT_DIR, fname)
        if not os.path.exists(fpath):
            print(f" [FAIL] File tidak ditemukan: {fname}")
            all_passed = False
            continue

        size_kb = os.path.getsize(fpath) / 1024
        if exp_dims:
            img = Image.open(fpath)
            dims = img.size
            extrema = img.getextrema()
            dim_match = (dims == exp_dims)
            # Check not all black: extrema max must be > 50
            if img.mode == 'RGBA':
                r_ext, g_ext, b_ext, a_ext = extrema
                not_black = r_ext[1] > 50 or g_ext[1] > 50 or b_ext[1] > 50
            else:
                r_ext, g_ext, b_ext = extrema
                not_black = r_ext[1] > 50 or g_ext[1] > 50 or b_ext[1] > 50

            status = "PASS" if (dim_match and not_black and size_kb >= 20) else "WARN"
            print(f" [{status}] {fname}: {dims[0]}x{dims[1]} px, {size_kb:.1f} KB, Extrema: {extrema}")
            if status != "PASS":
                all_passed = False
        else:
            status = "PASS" if size_kb > 2 else "WARN"
            print(f" [{status}] {fname}: SVG Vector, {size_seal_kb:.1f} KB")

    print("\n" + "=" * 68)
    if all_passed:
        print("  STATUS: SELURUH ASET LITHOGRAPH ACEH LOLOS VERIFIKASI!")
    else:
        print("  STATUS: ADA PERINGATAN PADA VERIFIKASI ASET")
    print("=" * 68)


if __name__ == "__main__":
    main()
