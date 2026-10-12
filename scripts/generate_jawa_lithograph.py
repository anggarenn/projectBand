"""
Generator Jawa Lithograph Studio-Grade Engine
Style: 19th-Century Archival Woodcut Lithograph & Botanical Copperplate Engraving
Theme: Bangsal Kencana Pendopo Ageng Joglo Sinom Keraton, Gunung Merapi, Candi Prambanan & Borobudur, Waringin Kurung
Author: Mas Amba, Lead RND Tim Sikobokan
"""

import os
import subprocess
import math
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "motion-art-jawa")
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
# 1. GENERATOR MASTER LITHOGRAPH JAWA KERATON (COVER & STAGE)
# ─────────────────────────────────────────────────────────────────────────────
def generate_jawa_lithograph_svg(is_stage: bool = False) -> str:
    """
    Menghasilkan master visual Bangsal Kencana Pendopo Ageng Joglo Sinom Keraton
    berlatar siluet Gunung Merapi, Candi Prambanan/Borobudur, dan Beringin Kurung.
    Gaya: 19th-Century Archival Woodcut Lithograph & Botanical Copperplate Engraving.
    """
    # 1. Langit & Gravure Hatching Horisontal Abad 19 (Y: 40 - 680)
    sky_hatching = []
    for y in range(40, 680, 15):
        opacity = 0.15 + 0.13 * math.sin(y / 60.0)
        dash = "12 6 18 6" if (y // 15) % 2 == 0 else "14 8 6 8"
        sky_hatching.append(f'<line x1="60" y1="{y}" x2="1020" y2="{y}" stroke="#C59B3C" stroke-width="0.85" stroke-dasharray="{dash}" opacity="{opacity:.2f}" />')

    # 2. Siluet Megah Gunung Merapi di Horizon Tengah-Kiri (Puncak di 500, 440)
    mountain_hatching = []
    for my in range(490, 840, 11):
        span_l = (my - 440) * 0.95
        span_r = (my - 440) * 1.15
        x_start = max(160, int(500 - span_l))
        x_end = min(860, int(500 + span_r))
        op = 0.22 + 0.16 * math.cos(my / 42.0)
        dash = "8 4 14 5" if (my // 11) % 2 == 0 else "6 3"
        mountain_hatching.append(f'<line x1="{x_start}" y1="{my}" x2="{x_end}" y2="{my}" stroke="#C59B3C" stroke-width="0.95" stroke-dasharray="{dash}" opacity="{op:.2f}" />')

    # Hembusan asap solfatara kawah Merapi halus mistis
    crater_smoke = [
        '<path d="M 495 440 Q 485 390 470 340 Q 455 300 480 260" fill="none" stroke="#E5C16C" stroke-width="1.2" stroke-dasharray="6 4" opacity="0.35" />',
        '<path d="M 505 440 Q 515 385 500 335 Q 485 295 510 255" fill="none" stroke="#FFFDF7" stroke-width="0.9" stroke-dasharray="8 5" opacity="0.3" />',
        '<path d="M 500 360 Q 520 320 535 280" fill="none" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.25" />'
    ]

    # 3. Siluet Candi Siwa Prambanan di Horizon Kanan (X: 740 - 980, Y: 560 - 850)
    prambanan_elements = f'''
      <!-- Kompleks Candi Prambanan (Candi Siwa, Brahma, Wisnu) -->
      <g id="candi-prambanan-horizon" opacity="0.85">
        <!-- Candi Pengapit Kiri (Brahma) -->
        <polygon points="760,840 785,650 810,840" fill="#13100D" stroke="#C59B3C" stroke-width="1.2" />
        <line x1="770" y1="710" x2="800" y2="710" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="3 2" />
        <line x1="765" y1="760" x2="805" y2="760" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="3 2" />
        <circle cx="785" cy="646" r="3" fill="#FFFDF7" stroke="#C59B3C" stroke-width="0.8" />

        <!-- Candi Siwa Utama (Menjulang Megah di Tengah) -->
        <polygon points="810,840 855,570 900,840" fill="#15120E" stroke="#C59B3C" stroke-width="1.6" />
        <!-- Puncak Ratna Stupika Candi Siwa -->
        <path d="M 855 540 L 852 570 L 858 570 Z" fill="#E5C16C" stroke="#FFFDF7" stroke-width="1" />
        <circle cx="855" cy="537" r="3.5" fill="#FFFDF7" stroke="#C59B3C" stroke-width="0.8" />
        <!-- Trap Undakan Andesit & Relung Arca Candi Siwa -->
        <line x1="828" y1="630" x2="882" y2="630" stroke="#E5C16C" stroke-width="1" stroke-dasharray="4 2" />
        <line x1="822" y1="690" x2="888" y2="690" stroke="#E5C16C" stroke-width="1" stroke-dasharray="5 3" />
        <line x1="816" y1="750" x2="894" y2="750" stroke="#E5C16C" stroke-width="1.1" stroke-dasharray="6 3" />
        <line x1="812" y1="800" x2="898" y2="800" stroke="#E5C16C" stroke-width="1.2" stroke-dasharray="6 3" />
        <!-- Relung Pintu Candi -->
        <rect x="850" y="760" width="10" height="25" fill="#0A0807" stroke="#C59B3C" stroke-width="0.8" rx="2" />

        <!-- Candi Pengapit Kanan (Wisnu) -->
        <polygon points="900,840 925,650 950,840" fill="#13100D" stroke="#C59B3C" stroke-width="1.2" />
        <line x1="910" y1="710" x2="940" y2="710" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="3 2" />
        <line x1="905" y1="760" x2="945" y2="760" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="3 2" />
        <circle cx="925" cy="646" r="3" fill="#FFFDF7" stroke="#C59B3C" stroke-width="0.8" />
      </g>
    '''

    # 4. Siluet Candi Stupa Borobudur di Horizon Kiri (X: 110 - 320, Y: 660 - 850)
    borobudur_elements = f'''
      <!-- Siluet Candi Borobudur (Stupa Utama & Teras Berundak) -->
      <g id="candi-borobudur-horizon" opacity="0.82">
        <!-- Teras Undakan Piramida Andesit -->
        <polygon points="110,840 135,770 295,770 320,840" fill="#120F0C" stroke="#C59B3C" stroke-width="1.1" />
        <line x1="125" y1="805" x2="305" y2="805" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="5 3" />
        
        <!-- Teras Lingkar Arupadhatu -->
        <polygon points="145,770 165,720 265,720 285,770" fill="#15120E" stroke="#C59B3C" stroke-width="1.2" />
        <line x1="155" y1="745" x2="275" y2="745" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="4 2" />

        <!-- Deretan Stupa Terawang Kecil -->
        <path d="M 175 720 Q 185 700 195 720 Z" fill="#1B1612" stroke="#C59B3C" stroke-width="0.8" />
        <path d="M 235 720 Q 245 700 255 720 Z" fill="#1B1612" stroke="#C59B3C" stroke-width="0.8" />

        <!-- Stupa Induk Agung Borobudur di Tengah -->
        <path d="M 195 720 C 195 675 235 675 235 720 Z" fill="#1E1914" stroke="#C59B3C" stroke-width="1.4" />
        <!-- Chattra / Pinakel Puncak Stupa -->
        <line x1="215" y1="650" x2="215" y2="675" stroke="#FFFDF7" stroke-width="1.4" />
        <circle cx="215" cy="648" r="3.2" fill="#E5C16C" stroke="#FFFDF7" stroke-width="0.8" />
        <circle cx="215" cy="656" r="4.5" fill="none" stroke="#C59B3C" stroke-width="0.9" />
      </g>
    '''

    # 5. Beringin Kurung Kembar Alun-alun Keraton (Kyai Dewadaru & Kyai Janadaru)
    # Kiri: X: 40 - 240, Y: 1060 - 1580
    # Kanan: X: 840 - 1040, Y: 1060 - 1580
    def build_beringin_kurung(center_x: int, name: str, is_left: bool = True) -> str:
        # Pagar Sasak Kurung di Bawah
        fence_w = 140
        fx0 = center_x - fence_w // 2
        fx1 = center_x + fence_w // 2
        fy0 = 1460
        fy1 = 1530

        # Ranting dan akar sulur gantung (aerial roots)
        roots = []
        for rx in range(center_x - 55, center_x + 60, 18):
            curve = -8 if rx < center_x else 8
            roots.append(f'<path d="M {rx} 1290 Q {rx + curve} 1380 {rx} 1470" fill="none" stroke="#C59B3C" stroke-width="1.2" stroke-dasharray="6 3" opacity="0.65" />')

        # Dedaunan tajuk kanopi berundak (Woodcut Botanical Engraving)
        canopy_clusters = []
        cluster_positions = [
            (center_x, 1140, 68),
            (center_x - 45, 1180, 56),
            (center_x + 45, 1180, 56),
            (center_x - 70, 1230, 48),
            (center_x + 70, 1230, 48),
            (center_x, 1220, 62),
            (center_x - 30, 1260, 45),
            (center_x + 30, 1260, 45),
        ]
        for cx, cy, r in cluster_positions:
            canopy_clusters.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#110E0B" stroke="#C59B3C" stroke-width="1.3" opacity="0.9" />')
            # Arsiran kelopak daun etsa
            canopy_clusters.append(f'<path d="M {cx - r + 10} {cy} Q {cx} {cy - r + 15} {cx + r - 10} {cy}" fill="none" stroke="#E5C16C" stroke-width="0.8" stroke-dasharray="4 2" opacity="0.55" />')
            canopy_clusters.append(f'<path d="M {cx - r + 15} {cy + 15} Q {cx} {cy + 5} {cx + r - 15} {cy + 15}" fill="none" stroke="#FFFDF7" stroke-width="0.7" stroke-dasharray="3 2" opacity="0.4" />')

        return f'''
          <!-- Waringin Kurung: {name} -->
          <g id="beringin-{name}" opacity="0.9">
            <!-- Tajuk Kanopi Rimbun -->
            {' '.join(canopy_clusters)}

            <!-- Batang Kokoh Kayu Beringin Kuno -->
            <path d="M {center_x - 22} 1470 Q {center_x - 18} 1360 {center_x - 12} 1280 L {center_x + 12} 1280 Q {center_x + 18} 1360 {center_x + 22} 1470 Z" fill="#18130E" stroke="#C59B3C" stroke-width="1.8" />
            <!-- Tekstur Kulit Pohon Bergalur -->
            <line x1="{center_x - 6}" y1="1300" x2="{center_x - 8}" y2="1465" stroke="#E5C16C" stroke-width="0.9" stroke-dasharray="8 4" opacity="0.6" />
            <line x1="{center_x + 6}" y1="1300" x2="{center_x + 8}" y2="1465" stroke="#E5C16C" stroke-width="0.9" stroke-dasharray="8 4" opacity="0.6" />
            {' '.join(roots)}

            <!-- Pagar Sasak Kurung (Pagar Bata Keraton Bersegi Empat) -->
            <polygon points="{fx0 - 10},{fy1} {fx0},{fy0} {fx1},{fy0} {fx1 + 10},{fy1}" fill="#1D1711" stroke="#C59B3C" stroke-width="2" />
            <!-- Lis Pagar & Ornamen Tumpal Bata Putih Gading -->
            <line x1="{fx0 + 5}" y1="{fy0 + 15}" x2="{fx1 - 5}" y2="{fy0 + 15}" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="8 4" />
            <line x1="{fx0 + 8}" y1="{fy0 + 35}" x2="{fx1 - 8}" y2="{fy0 + 35}" stroke="#E5C16C" stroke-width="1" stroke-dasharray="5 3" />
            <line x1="{fx0 + 10}" y1="{fy0 + 55}" x2="{fx1 - 10}" y2="{fy0 + 55}" stroke="#C59B3C" stroke-width="1.2" />
            <!-- Tiang Pintu Gapura Sasak -->
            <rect x="{center_x - 14}" y="{fy0 - 8}" width="28" height="78" fill="#140F0B" stroke="#E5C16C" stroke-width="1.2" />
            <circle cx="{center_x}" cy="{fy0 - 12}" r="3.5" fill="#FFFDF7" stroke="#C59B3C" stroke-width="0.9" />
          </g>
        '''

    beringin_left = build_beringin_kurung(140, "kyai-dewadaru", is_left=True)
    beringin_right = build_beringin_kurung(940, "kyai-janadaru", is_left=False)

    # 6. BANGSAL KENCANA PENDOPO AGENG JOGLO SINOM KERATON (CENTER MASTERPIECE)
    # Koordinat Pusat X: 540
    # A. Mustaka / Molo Puncak Joglo Tajug Sinom (Y: 915 - 945)
    # B. Atap Brunjung Tajug Tingkat 1 (Y: 945 - 1140)
    # C. Atap Penanggap Tingkat 2 (Y: 1140 - 1290)
    # D. Atap Penitih / Emper Tingkat 3 (Y: 1290 - 1410)
    # E. Trap Tumpangsari Balok Kayu Berukir Prada Emas (Y: 1180 - 1300)
    # F. 4 Saka Guru Berukir Prada Emas (Y: 1280 - 1640)
    # G. Lampu Robyong Keraton Berpendar Hangat (Y: 1270 - 1390)
    # H. Gebyok Ukir Jepara Keraton di Latar Belakang (Y: 1420 - 1620)
    # I. Pelataran Marmer & Undakan Trap 3 Tingkat (Y: 1620 - 1750)

    # A & B: Atap Brunjung Tajug Sinom (Puncak Curam Tajug)
    tajug_peak_x = 540
    tajug_molo_y = 915
    tajug_ridge_y = 945
    tajug_ridge_w = 80  # Bubungan atas pendek khas joglo sinom
    tajug_base_y = 1140
    tajug_base_w = 420  # Lebar atap tajug di batas penanggap

    brunjung_thatch_lines = []
    for ry in range(tajug_ridge_y + 18, tajug_base_y, 16):
        t = (ry - tajug_ridge_y) / (tajug_base_y - tajug_ridge_y)
        w = tajug_ridge_w + t * (tajug_base_w - tajug_ridge_w)
        lx = int(tajug_peak_x - w / 2)
        rx = int(tajug_peak_x + w / 2)
        dash = "14 5 8 5" if (ry // 16) % 2 == 0 else "10 4"
        op = 0.45 + 0.28 * math.sin(t * math.pi)
        brunjung_thatch_lines.append(f'<line x1="{lx + 8}" y1="{ry}" x2="{rx - 8}" y2="{ry}" stroke="#C59B3C" stroke-width="1.2" stroke-dasharray="{dash}" opacity="{op:.2f}" />')
        # Garis rusuk sirap vertikal
        brunjung_thatch_lines.append(f'<line x1="{lx + 25}" y1="{ry}" x2="{lx + 32}" y2="{ry + 16}" stroke="#FFFDF7" stroke-width="0.75" opacity="0.32" />')
        brunjung_thatch_lines.append(f'<line x1="{rx - 25}" y1="{ry}" x2="{rx - 32}" y2="{ry + 16}" stroke="#FFFDF7" stroke-width="0.75" opacity="0.32" />')

    # C: Atap Penanggap (Tingkat 2 Melebar)
    penanggap_top_y = 1140
    penanggap_top_w = 420
    penanggap_bot_y = 1290
    penanggap_bot_w = 640

    penanggap_thatch_lines = []
    for ry in range(penanggap_top_y + 14, penanggap_bot_y, 16):
        t = (ry - penanggap_top_y) / (penanggap_bot_y - penanggap_top_y)
        w = penanggap_top_w + t * (penanggap_bot_w - penanggap_top_w)
        lx = int(tajug_peak_x - w / 2)
        rx = int(tajug_peak_x + w / 2)
        dash = "16 6 10 5" if (ry // 16) % 2 == 0 else "12 5"
        op = 0.42 + 0.25 * math.sin(t * math.pi)
        penanggap_thatch_lines.append(f'<line x1="{lx + 10}" y1="{ry}" x2="{rx - 10}" y2="{ry}" stroke="#C59B3C" stroke-width="1.25" stroke-dasharray="{dash}" opacity="{op:.2f}" />')

    # D: Atap Penitih / Emper (Tingkat 3 Landai Memanjang)
    penitih_top_y = 1290
    penitih_top_w = 640
    penitih_bot_y = 1410
    penitih_bot_w = 880

    penitih_thatch_lines = []
    for ry in range(penitih_top_y + 14, penitih_bot_y, 15):
        t = (ry - penitih_top_y) / (penitih_bot_y - penitih_top_y)
        w = penitih_top_w + t * (penitih_bot_w - penitih_top_w)
        lx = int(tajug_peak_x - w / 2)
        rx = int(tajug_peak_x + w / 2)
        dash = "18 6 12 6" if (ry // 15) % 2 == 0 else "14 5"
        op = 0.40 + 0.22 * math.sin(t * math.pi)
        penitih_thatch_lines.append(f'<line x1="{lx + 12}" y1="{ry}" x2="{rx - 12}" y2="{ry}" stroke="#C59B3C" stroke-width="1.3" stroke-dasharray="{dash}" opacity="{op:.2f}" />')

    # Mustaka Molo Emas & Hiasan Jurai Atap Modang Keraton
    roof_mustaka = f'''
      <!-- Mustaka / Molo Sepuh Prada Emas di Puncak Tajug Joglo Sinom -->
      <g id="molo-mustaka">
        <path d="M 540 890 L 535 918 L 545 918 Z" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1.2" />
        <circle cx="540" cy="886" r="4.5" fill="#E5C16C" stroke="#FFFDF7" stroke-width="1" />
        <!-- Mahkota Padma Mustaka -->
        <path d="M 522 935 Q 540 918 558 935 L 565 945 L 515 945 Z" fill="#241B12" stroke="#E5C16C" stroke-width="1.8" />
        <circle cx="540" cy="928" r="3.2" fill="#FFFDF7" />
        <!-- Bubungan Molo Horisontal -->
        <rect x="495" y="940" width="90" height="10" fill="#1C150E" stroke="#E5C16C" stroke-width="1.6" rx="2" />
        <!-- Ornamen Ujung Bubungan Kiri & Kanan (Modang Makara) -->
        <path d="M 495 945 Q 475 935 465 918" fill="none" stroke="#E5C16C" stroke-width="2.4" stroke-linecap="round" />
        <circle cx="465" cy="918" r="3.5" fill="#FFFDF7" stroke="#C59B3C" stroke-width="1" />
        <path d="M 585 945 Q 605 935 615 918" fill="none" stroke="#E5C16C" stroke-width="2.4" stroke-linecap="round" />
        <circle cx="615" cy="918" r="3.5" fill="#FFFDF7" stroke="#C59B3C" stroke-width="1" />
      </g>
    '''

    # Ornamen Lisplang & Modang di Tiap Tingkat Atap
    eaves_ornaments = f'''
      <!-- Lisplang Ukir Penanggap (Tingkat 2) -->
      <line x1="{tajug_peak_x - penanggap_top_w//2 - 12}" y1="{penanggap_top_y}" x2="{tajug_peak_x + penanggap_top_w//2 + 12}" y2="{penanggap_top_y}" stroke="#FFFDF7" stroke-width="2.4" />
      <path d="M {tajug_peak_x - penanggap_top_w//2 - 12} {penanggap_top_y} Q {tajug_peak_x - penanggap_top_w//2 - 25} {penanggap_top_y - 12} {tajug_peak_x - penanggap_top_w//2 - 32} {penanggap_top_y - 25}" fill="none" stroke="#E5C16C" stroke-width="2" stroke-linecap="round" />
      <path d="M {tajug_peak_x + penanggap_top_w//2 + 12} {penanggap_top_y} Q {tajug_peak_x + penanggap_top_w//2 + 25} {penanggap_top_y - 12} {tajug_peak_x + penanggap_top_w//2 + 32} {penanggap_top_y - 25}" fill="none" stroke="#E5C16C" stroke-width="2" stroke-linecap="round" />

      <!-- Lisplang Ukir Penitih (Tingkat 3) -->
      <line x1="{tajug_peak_x - penanggap_bot_w//2 - 14}" y1="{penanggap_bot_y}" x2="{tajug_peak_x + penanggap_bot_w//2 + 14}" y2="{penanggap_bot_y}" stroke="#FFFDF7" stroke-width="2.4" />
      <path d="M {tajug_peak_x - penanggap_bot_w//2 - 14} {penanggap_bot_y} Q {tajug_peak_x - penanggap_bot_w//2 - 30} {penanggap_bot_y - 15} {tajug_peak_x - penanggap_bot_w//2 - 38} {penanggap_bot_y - 30}" fill="none" stroke="#E5C16C" stroke-width="2.2" stroke-linecap="round" />
      <path d="M {tajug_peak_x + penanggap_bot_w//2 + 14} {penanggap_bot_y} Q {tajug_peak_x + penanggap_bot_w//2 + 30} {penanggap_bot_y - 15} {tajug_peak_x + penanggap_bot_w//2 + 38} {penanggap_bot_y - 30}" fill="none" stroke="#E5C16C" stroke-width="2.2" stroke-linecap="round" />

      <!-- Lisplang Teritisan Utama Bangsal Kencana (Bawah) -->
      <line x1="{tajug_peak_x - penitih_bot_w//2 - 18}" y1="{penitih_bot_y}" x2="{tajug_peak_x + penitih_bot_w//2 + 18}" y2="{penitih_bot_y}" stroke="#E5C16C" stroke-width="3.2" />
      <line x1="{tajug_peak_x - penitih_bot_w//2 - 10}" y1="{penitih_bot_y + 4}" x2="{tajug_peak_x + penitih_bot_w//2 + 10}" y2="{penitih_bot_y + 4}" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="10 4" />
      <!-- Ornamen Makara Ujung Teritisan -->
      <path d="M {tajug_peak_x - penitih_bot_w//2 - 18} {penitih_bot_y} Q {tajug_peak_x - penitih_bot_w//2 - 40} {penitih_bot_y - 20} {tajug_peak_x - penitih_bot_w//2 - 50} {penitih_bot_y - 40}" fill="none" stroke="#E5C16C" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="{tajug_peak_x - penitih_bot_w//2 - 50}" cy="{penitih_bot_y - 40}" r="4" fill="#FFFDF7" stroke="#C59B3C" stroke-width="1.2" />
      <path d="M {tajug_peak_x + penitih_bot_w//2 + 18} {penitih_bot_y} Q {tajug_peak_x + penitih_bot_w//2 + 40} {penitih_bot_y - 20} {tajug_peak_x + penitih_bot_w//2 + 50} {penitih_bot_y - 40}" fill="none" stroke="#E5C16C" stroke-width="2.6" stroke-linecap="round" />
      <circle cx="{tajug_peak_x + penitih_bot_w//2 + 50}" cy="{penitih_bot_y - 40}" r="4" fill="#FFFDF7" stroke="#C59B3C" stroke-width="1.2" />
    '''

    # E: TRAP TUMPANGSARI BALOK KAYU BERUKIR PRADA EMAS (5 Trap Bersusun)
    # Bertempat di bawah rangka tajug (Y: 1190 - 1285, X: 370 - 710)
    tumpangsari_traps = []
    tumpang_layers = [
        (1195, 200, 10),
        (1210, 230, 10),
        (1225, 260, 11),
        (1240, 290, 11),
        (1255, 320, 12),
        (1270, 350, 12),
    ]
    for ty, tw, th in tumpang_layers:
        tx = 540 - tw // 2
        tumpangsari_traps.append(f'''
          <rect x="{tx}" y="{ty}" width="{tw}" height="{th}" fill="#1F1710" stroke="#E5C16C" stroke-width="1.5" />
          <!-- Ukiran Etsa Motif Lung-lungan Prada Emas di Balok -->
          <line x1="{tx + 8}" y1="{ty + th//2}" x2="{tx + tw - 8}" y2="{ty + th//2}" stroke="#FFFDF7" stroke-width="0.9" stroke-dasharray="6 3 10 3" />
          <circle cx="{540 - tw//4}" cy="{ty + th//2}" r="1.8" fill="#E5C16C" />
          <circle cx="{540 + tw//4}" cy="{ty + th//2}" r="1.8" fill="#E5C16C" />
        ''')

    # F: 4 SAKA GURU UTAMA BERUKIR PRADA EMAS & UMPAK BATU ANDESIT PADMA
    # 4 Tiang Saka Guru: X = 385, 465, 615, 695. Dari Y = 1270 sampai 1630.
    saka_guru_pillars = []
    saka_x_coords = [385, 465, 615, 695]
    for sx in saka_x_coords:
        # Tiang Saka Guru Kayu Jati Tua Berukir Emas
        saka_guru_pillars.append(f'''
          <!-- Saka Guru di X: {sx} -->
          <rect x="{sx - 9}" y="1275" width="18" height="355" fill="#17120C" stroke="#E5C16C" stroke-width="1.8" />
          <!-- Ukiran Satria Pinayungan & Lung-lungan Vertikal Etsa Emas -->
          <line x1="{sx}" y1="1285" x2="{sx}" y2="1620" stroke="#E5C16C" stroke-width="1.2" stroke-dasharray="14 4 6 4" />
          <line x1="{sx - 4}" y1="1295" x2="{sx - 4}" y2="1615" stroke="#FFFDF7" stroke-width="0.75" opacity="0.45" />
          <line x1="{sx + 4}" y1="1295" x2="{sx + 4}" y2="1615" stroke="#FFFDF7" stroke-width="0.75" opacity="0.45" />
          <!-- Gelang Pasak & Cincin Emas Tiang -->
          <line x1="{sx - 11}" y1="1340" x2="{sx + 11}" y2="1340" stroke="#FFFDF7" stroke-width="1.5" />
          <line x1="{sx - 11}" y1="1440" x2="{sx + 11}" y2="1440" stroke="#FFFDF7" stroke-width="1.5" />
          <line x1="{sx - 11}" y1="1540" x2="{sx + 11}" y2="1540" stroke="#FFFDF7" stroke-width="1.5" />
          <!-- Umpak Batu Andesit Bertingkat Padma di Dasar Tiang -->
          <polygon points="{sx - 18},1630 {sx + 18},1630 {sx + 13},1618 {sx - 13},1618" fill="#2A221A" stroke="#E5C16C" stroke-width="1.3" />
          <rect x="{sx - 22}" y="1630" width="44" height="12" fill="#1C1610" stroke="#C59B3C" stroke-width="1.4" rx="2" />
        ''')

    # Balok Sunduk Kili & Pengeret Horisontal Penghubung Saka Guru
    sunduk_beams = f'''
      <!-- Balok Sunduk Kili Bawah -->
      <rect x="365" y="1335" width="350" height="10" fill="#1A140E" stroke="#E5C16C" stroke-width="1.4" />
      <line x1="375" y1="1340" x2="705" y2="1340" stroke="#FFFDF7" stroke-width="0.9" stroke-dasharray="12 4" />
      <!-- Balok Pengeret Atas -->
      <rect x="360" y="1275" width="360" height="12" fill="#201811" stroke="#E5C16C" stroke-width="1.6" />
      <line x1="370" y1="1281" x2="710" y2="1281" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="14 4" />
    '''

    # Tiang-Tiang Penanggap Keliling di Sayap Kiri dan Kanan
    side_pillars = []
    side_x_coords = [160, 230, 305, 775, 850, 920]
    for px in side_x_coords:
        side_pillars.append(f'''
          <!-- Tiang Penanggap di {px} -->
          <rect x="{px - 6}" y="1410" width="12" height="230" fill="#140F0A" stroke="#C59B3C" stroke-width="1.4" />
          <line x1="{px}" y1="1415" x2="{px}" y2="1635" stroke="#E5C16C" stroke-width="0.8" stroke-dasharray="8 4" opacity="0.6" />
          <!-- Umpak Batu Samping -->
          <rect x="{px - 12}" y="1640" width="24" height="8" fill="#1E1712" stroke="#C59B3C" stroke-width="1" />
        ''')

    # G: LAMPU ROBYONG KERATON BERPENDAR HANGAT (ANTIQUE CHANDELIER)
    # Tergantung di tengah: (540, 1270 s.d. 1380)
    robyong_lamp = f'''
      <!-- Lampu Robyong Keraton Berpendar Hangat -->
      <g id="lampu-robyong">
        <!-- Rantai Kuningan Penggantung -->
        <line x1="540" y1="1220" x2="540" y2="1285" stroke="#E5C16C" stroke-width="1.8" stroke-dasharray="6 3" />
        <!-- Pendar Cahaya Damar Emas Keraton (Warm Glow Radial) -->
        <circle cx="540" cy="1320" r="110" fill="url(#robyongGlowRadial)" />

        <!-- Mahkota Kuningan Atas Robyong -->
        <path d="M 525 1285 Q 540 1275 555 1285 L 550 1295 L 530 1295 Z" fill="#241B12" stroke="#E5C16C" stroke-width="1.4" />
        <!-- Badan Utama Vas Kuningan Emas -->
        <path d="M 530 1295 Q 540 1315 550 1295 Q 560 1325 540 1335 Q 520 1325 530 1295 Z" fill="#2A1F14" stroke="#E5C16C" stroke-width="1.6" />
        <circle cx="540" cy="1312" r="4.5" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1" />

        <!-- 6 Cabang Lengan Lampu Lengkung Kiri & Kanan -->
        <!-- Cabang Kiri 1 & 2 -->
        <path d="M 532 1310 Q 500 1300 480 1325" fill="none" stroke="#E5C16C" stroke-width="1.8" />
        <path d="M 535 1322 Q 490 1320 460 1340" fill="none" stroke="#E5C16C" stroke-width="1.8" />
        <!-- Cabang Kanan 1 & 2 -->
        <path d="M 548 1310 Q 580 1300 600 1325" fill="none" stroke="#E5C16C" stroke-width="1.8" />
        <path d="M 545 1322 Q 590 1320 620 1340" fill="none" stroke="#E5C16C" stroke-width="1.8" />

        <!-- Kap Lampu Kaca Kristal & Titik Api Damar -->
        <!-- Lampu Kiri -->
        <circle cx="480" cy="1325" r="7" fill="#FFA834" fill-opacity="0.75" stroke="#FFFDF7" stroke-width="1" />
        <circle cx="480" cy="1325" r="2.5" fill="#FFFDF7" />
        <circle cx="460" cy="1340" r="7" fill="#FFA834" fill-opacity="0.75" stroke="#FFFDF7" stroke-width="1" />
        <circle cx="460" cy="1340" r="2.5" fill="#FFFDF7" />

        <!-- Lampu Kanan -->
        <circle cx="600" cy="1325" r="7" fill="#FFA834" fill-opacity="0.75" stroke="#FFFDF7" stroke-width="1" />
        <circle cx="600" cy="1325" r="2.5" fill="#FFFDF7" />
        <circle cx="620" cy="1340" r="7" fill="#FFA834" fill-opacity="0.75" stroke="#FFFDF7" stroke-width="1" />
        <circle cx="620" cy="1340" r="2.5" fill="#FFFDF7" />

        <!-- Lampu Tengah Bawah -->
        <circle cx="540" cy="1345" r="9" fill="#FFA834" fill-opacity="0.85" stroke="#FFFDF7" stroke-width="1.2" />
        <circle cx="540" cy="1345" r="3.2" fill="#FFFDF7" />

        <!-- Untaian Bandul Rumbai Kristal Gantung Bawah -->
        <line x1="540" y1="1354" x2="540" y2="1378" stroke="#E5C16C" stroke-width="1.2" stroke-dasharray="3 2" />
        <circle cx="540" cy="1382" r="3.2" fill="#FFFDF7" stroke="#E5C16C" stroke-width="0.8" />
      </g>
    '''

    # H: GEBYOK UKIR KERATON DI LATAR BELAKANG PENDOPO (X: 320 - 760, Y: 1450 - 1620)
    gebyok_panel = f'''
      <!-- Gebyok Ukir Jepara Keraton di Belakang Saka Guru -->
      <g id="gebyok-keraton" opacity="0.85">
        <rect x="330" y="1450" width="420" height="175" fill="#140F0A" stroke="#C59B3C" stroke-width="1.8" />
        <!-- Pintu Kembar Gebyok di Tengah -->
        <rect x="490" y="1465" width="100" height="160" fill="#0F0B08" stroke="#E5C16C" stroke-width="1.6" />
        <line x1="540" y1="1465" x2="540" y2="1625" stroke="#E5C16C" stroke-width="1.4" />
        <!-- Terali Krawangan Ukir Flora Intaglio -->
        <line x1="495" y1="1505" x2="585" y2="1505" stroke="#C59B3C" stroke-width="1" stroke-dasharray="5 3" />
        <line x1="495" y1="1545" x2="585" y2="1545" stroke="#C59B3C" stroke-width="1" stroke-dasharray="5 3" />
        <line x1="495" y1="1585" x2="585" y2="1585" stroke="#C59B3C" stroke-width="1" stroke-dasharray="5 3" />
        <!-- Ventilasi Krawangan Ukir di Atas Pintu -->
        <rect x="350" y="1460" width="125" height="40" fill="#0E0A07" stroke="#C59B3C" stroke-width="1.1" />
        <rect x="605" y="1460" width="125" height="40" fill="#0E0A07" stroke="#C59B3C" stroke-width="1.1" />
        <line x1="355" y1="1480" x2="470" y2="1480" stroke="#FFFDF7" stroke-width="0.8" stroke-dasharray="4 2" />
        <line x1="610" y1="1480" x2="725" y2="1480" stroke="#FFFDF7" stroke-width="0.8" stroke-dasharray="4 2" />
      </g>
    '''

    # I: PELATARAN MARMER & UNDAKAN TRAP 3 TINGKAT (Y: 1640 - 1760)
    marble_steps = f'''
      <!-- Undakan Trap 3 Tingkat Bangsal Kencana -->
      <g id="undakan-marmer">
        <!-- Trap 1 (Teratas) -->
        <polygon points="120,1645 960,1645 980,1675 100,1675" fill="#1C1610" stroke="#E5C16C" stroke-width="1.8" />
        <line x1="115" y1="1650" x2="965" y2="1650" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="16 6" />

        <!-- Trap 2 (Tengah) -->
        <polygon points="90,1675 990,1675 1010,1710 70,1710" fill="#16110B" stroke="#E5C16C" stroke-width="1.8" />
        <line x1="85" y1="1680" x2="995" y2="1680" stroke="#FFFDF7" stroke-width="1.2" stroke-dasharray="16 6" />

        <!-- Trap 3 (Dasar Pelataran Alun-alun) -->
        <polygon points="60,1710 1020,1710 1045,1750 35,1750" fill="#120E09" stroke="#E5C16C" stroke-width="2" />
        <line x1="55" y1="1715" x2="1025" y2="1715" stroke="#FFFDF7" stroke-width="1.4" stroke-dasharray="20 6" />

        <!-- Arsiran Tekstur Lantai Marmer Obsidian Etsa -->
        <line x1="80" y1="1730" x2="1000" y2="1730" stroke="#C59B3C" stroke-width="1" stroke-dasharray="8 4 14 4" opacity="0.6" />
      </g>
    '''

    # 7. FLORA BOTANI TEPI & ORNAMEN BATIK PARANG/LUNG-LUNGAN (Y: 1720 - 1920)
    flora_left = f'''
      <!-- Rumpun Flora Palem Kipas & Melati Keraton Sisi Kiri -->
      <g id="flora-keraton-kiri" opacity="0.88">
        <path d="M 40 1860 Q 65 1740 45 1620 Q 25 1520 70 1440" fill="none" stroke="#E5C16C" stroke-width="3.6" stroke-linecap="round" />
        <path d="M 40 1860 Q 60 1740 40 1620" fill="none" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="6 4" />
        <!-- Pelepah Daun Palem Melengkung -->
        <path d="M 70 1440 Q 130 1410 190 1450" fill="none" stroke="#E5C16C" stroke-width="2.2" />
        <path d="M 70 1440 Q 20 1390 0 1430" fill="none" stroke="#E5C16C" stroke-width="2.2" />
        <path d="M 70 1440 Q 100 1360 160 1370" fill="none" stroke="#E5C16C" stroke-width="1.8" />
        <!-- Kuntum Melati Keraton -->
        <circle cx="140" cy="1435" r="5" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1.1" />
        <circle cx="115" cy="1365" r="4.2" fill="#E5C16C" stroke="#FFFDF7" stroke-width="0.9" />
      </g>
    '''

    flora_right = f'''
      <!-- Rumpun Flora Sisi Kanan -->
      <g id="flora-keraton-kanan" opacity="0.88">
        <path d="M 1040 1860 Q 1015 1740 1035 1620 Q 1055 1520 1010 1440" fill="none" stroke="#E5C16C" stroke-width="3.6" stroke-linecap="round" />
        <path d="M 1040 1860 Q 1020 1740 1040 1620" fill="none" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="6 4" />
        <!-- Pelepah Daun Melengkung -->
        <path d="M 1010 1440 Q 950 1410 890 1450" fill="none" stroke="#E5C16C" stroke-width="2.2" />
        <path d="M 1010 1440 Q 1060 1390 1080 1430" fill="none" stroke="#E5C16C" stroke-width="2.2" />
        <path d="M 1010 1440 Q 980 1360 920 1370" fill="none" stroke="#E5C16C" stroke-width="1.8" />
        <!-- Kuntum Melati Keraton -->
        <circle cx="940" cy="1435" r="5" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1.1" />
        <circle cx="965" cy="1365" r="4.2" fill="#E5C16C" stroke="#FFFDF7" stroke-width="0.9" />
      </g>
    '''

    # Ornamen Pelataran Pasir Alun-alun Bawah (Y: 1750 - 1920)
    ground_hatching = []
    for gy in range(1755, 1890, 12):
        dash = "10 5 18 6" if (gy // 12) % 2 == 0 else "14 6 8 5"
        op = 0.28 + 0.18 * math.sin(gy / 35.0)
        ground_hatching.append(f'<line x1="45" y1="{gy}" x2="1035" y2="{gy}" stroke="#C59B3C" stroke-width="0.9" stroke-dasharray="{dash}" opacity="{op:.2f}" />')

    # Border Bawah Bermotif Batik Parang Keraton Emas
    parang_bottom = []
    for px in range(50, 1030, 36):
        parang_bottom.append(f'''
          <path d="M {px} 1870 L {px + 20} 1845 L {px + 28} 1855 L {px + 8} 1880 Z" fill="#221A12" stroke="#E5C16C" stroke-width="1" />
          <circle cx="{px + 14}" cy="{px % 2 == 0 and 1860 or 1865}" r="1.6" fill="#FFFDF7" />
        ''')

    # 8. PERLAKUAN KHUSUS STAGE BACKDROP: CENTRAL DARKENING VIGNETTE
    # Melindungi keterbacaan teks dan kartu UI dari Y: 320 s.d. 1520
    stage_overlay = ""
    if is_stage:
        stage_overlay = f'''
          <!-- Stage Center Negative Space Darkening: Area Teks Y: 320 s.d. 1520 Sangat Bersih & Kontras -->
          <rect x="0" y="0" width="1080" height="1920" fill="url(#stageVignetteCenterJawa)" />
          <rect x="0" y="300" width="1080" height="1220" fill="url(#stageCenterSoftDarkJawa)" />
        '''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Deep Obsidian Charcoal Archival Canvas (Monokrom Arang Obsidian Keraton) -->
    <radialGradient id="charcoalPaperJawa" cx="50%" cy="46%" r="68%">
      <stop offset="0%" stop-color="#1A1510" />
      <stop offset="55%" stop-color="#120E0A" />
      <stop offset="100%" stop-color="#070605" />
    </radialGradient>

    <!-- Golden Mist Shimmer (Kabut Mistis Lembah Merapi & Kedu) -->
    <linearGradient id="merapiValleyMist" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#C59B3C" stop-opacity="0" />
      <stop offset="50%" stop-color="#C59B3C" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#C59B3C" stop-opacity="0" />
    </linearGradient>

    <!-- Warm Robyong Chandelier Glow Radial -->
    <radialGradient id="robyongGlowRadial" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFA834" stop-opacity="0.28" />
      <stop offset="45%" stop-color="#FFA834" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#FFA834" stop-opacity="0" />
    </radialGradient>

    <!-- Stage Center Vignette Radial: Melindungi area teks 20% - 80% Y -->
    <radialGradient id="stageVignetteCenterJawa" cx="50%" cy="46%" r="52%">
      <stop offset="0%" stop-color="#080705" stop-opacity="0.84" />
      <stop offset="60%" stop-color="#080705" stop-opacity="0.58" />
      <stop offset="100%" stop-color="#080705" stop-opacity="0.12" />
    </radialGradient>

    <!-- Stage Center Linear Veil Tambahan -->
    <linearGradient id="stageCenterSoftDarkJawa" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090705" stop-opacity="0.2" />
      <stop offset="30%" stop-color="#090705" stop-opacity="0.68" />
      <stop offset="70%" stop-color="#090705" stop-opacity="0.68" />
      <stop offset="100%" stop-color="#090705" stop-opacity="0.2" />
    </linearGradient>
  </defs>

  <!-- Latar Belakang Kanvas Kertas Arsip Kuno Abad 19 -->
  <rect width="1080" height="1920" fill="url(#charcoalPaperJawa)" />

  <!-- 1. Arsiran Gravure Langit & Candra Purnama Keraton -->
  <g id="sky-engraving">
    {' '.join(sky_hatching)}
    <!-- Bulan Purnama Keraton (Candra Full Moon) Emas Temaram -->
    <circle cx="860" cy="220" r="48" fill="#FDF7EA" opacity="0.88" />
    <circle cx="860" cy="220" r="75" fill="#E5C16C" fill-opacity="0.1" />
    <path d="M 845 200 Q 860 215 880 205 Q 865 235 845 230" fill="none" stroke="#C59B3C" stroke-width="0.9" opacity="0.45" />
    <!-- Bintang Panjer Rina Emas -->
    <polygon points="780,185 783,195 793,195 785,202 788,212 780,205 772,212 775,202 767,195 777,195" fill="#FFFDF7" opacity="0.85" />
  </g>

  <!-- 2. Siluet Megah Gunung Merapi di Horizon -->
  <g id="gunung-merapi">
    <polygon points="160,840 500,440 860,840" fill="#13100D" stroke="#C59B3C" stroke-width="1.4" opacity="0.7" />
    {' '.join(mountain_hatching)}
    {' '.join(crater_smoke)}
  </g>

  <!-- 3. Siluet Candi Siwa Prambanan di Kanan Cakrawala -->
  {prambanan_elements}

  <!-- 4. Siluet Candi Borobudur di Kiri Cakrawala -->
  {borobudur_elements}

  <!-- 5. Kabut Atmosferik Mistis Lembah Kedu & Merapi -->
  <rect x="0" y="760" width="1080" height="260" fill="url(#merapiValleyMist)" />

  <!-- 6. Beringin Kurung Kembar Alun-alun Keraton (Kiri & Kanan) -->
  {beringin_left}
  {beringin_right}

  <!-- 7. BANGSAL KENCANA PENDOPO AGENG JOGLO SINOM KERATON -->
  <g id="bangsal-kencana-complex">
    <!-- A. Atap Brunjung Tajug Sinom Paling Atas (Tingkat 1) -->
    <polygon points="{tajug_peak_x - tajug_ridge_w//2},{tajug_ridge_y} {tajug_peak_x + tajug_ridge_w//2},{tajug_ridge_y} {tajug_peak_x + tajug_base_w//2},{tajug_base_y} {tajug_peak_x - tajug_base_w//2},{tajug_base_y}" fill="#140F0A" stroke="#E5C16C" stroke-width="2.8" />
    {' '.join(brunjung_thatch_lines)}
    {roof_mustaka}

    <!-- B. Atap Penanggap (Tingkat 2 Melebar) -->
    <polygon points="{tajug_peak_x - penanggap_top_w//2},{penanggap_top_y} {tajug_peak_x + penanggap_top_w//2},{penanggap_top_y} {tajug_peak_x + penanggap_bot_w//2},{penanggap_bot_y} {tajug_peak_x - penanggap_bot_w//2},{penanggap_bot_y}" fill="#15100B" stroke="#E5C16C" stroke-width="2.8" />
    {' '.join(penanggap_thatch_lines)}

    <!-- C. Atap Penitih / Emper (Tingkat 3 Landai Memayungi Pendopo) -->
    <polygon points="{tajug_peak_x - penitih_top_w//2},{penitih_top_y} {tajug_peak_x + penitih_top_w//2},{penitih_top_y} {tajug_peak_x + penitih_bot_w//2},{penitih_bot_y} {tajug_peak_x - penitih_bot_w//2},{penitih_bot_y}" fill="#16110B" stroke="#E5C16C" stroke-width="3.2" />
    {' '.join(penitih_thatch_lines)}

    <!-- Ornamen Lisplang & Modang Makara di Semua Tingkat -->
    {eaves_ornaments}

    <!-- D. Gebyok Ukir Jepara Keraton di Latar Belakang -->
    {gebyok_panel}

    <!-- E. Trap Tumpangsari Balok Kayu Jati Berukir Prada Emas (5 Trap) -->
    {' '.join(tumpangsari_traps)}

    <!-- F. Balok Sunduk Kili & Pengeret Horisontal -->
    {sunduk_beams}

    <!-- G. Lampu Robyong Keraton Berpendar Hangat -->
    {robyong_lamp}

    <!-- H. 4 Tiang Saka Guru Utama Berukir Prada Emas -->
    {' '.join(saka_guru_pillars)}

    <!-- I. Tiang-Tiang Penanggap Keliling Sayap Kiri & Kanan -->
    {' '.join(side_pillars)}

    <!-- J. Undakan Marmer Trap 3 Tingkat Bangsal Kencana -->
    {marble_steps}
  </g>

  <!-- 8. Pelataran Alun-alun Bawah & Ornamen Batik Parang -->
  <g id="pelataran-alun-alun">
    {' '.join(ground_hatching)}
    {' '.join(parang_bottom)}
  </g>

  <!-- 9. Flora Botani Palem Kipas & Melati di Sisi Tepi -->
  {flora_left}
  {flora_right}

  <!-- 10. Lapisan Khusus Stage Backdrop (Bila is_stage=True) -->
  {stage_overlay}

  <!-- 11. Border Lis Filigri Emas Archival (Double Hairline Frame) -->
  <rect x="24" y="24" width="1032" height="1872" fill="none" stroke="#C59B3C" stroke-width="1.2" opacity="0.48" />
  <rect x="32" y="32" width="1016" height="1856" fill="none" stroke="#E5C16C" stroke-width="0.75" stroke-dasharray="6 4" opacity="0.35" />
  
  <!-- Corner Medallion Ornaments Kecil di 4 Sudut (Motif Padma Keraton) -->
  <g transform="translate(32, 32)">
    <circle cx="0" cy="0" r="8" fill="#140F0A" stroke="#E5C16C" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
  <g transform="translate(1048, 32)">
    <circle cx="0" cy="0" r="8" fill="#140F0A" stroke="#E5C16C" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
  <g transform="translate(32, 1888)">
    <circle cx="0" cy="0" r="8" fill="#140F0A" stroke="#E5C16C" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
  <g transform="translate(1048, 1888)">
    <circle cx="0" cy="0" r="8" fill="#140F0A" stroke="#E5C16C" stroke-width="1.2" />
    <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
  </g>
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 2. GENERATOR RENDA ATAP PELMET KAWUNG (jawa-kawung-lace.webp - 1080x320 RGBA)
# ─────────────────────────────────────────────────────────────────────────────
def generate_kawung_lace_svg() -> str:
    """
    Renda atap pelmet motif Lung-lungan Batik Kawung Keraton seamless repeating
    alpha transparan (1080x320 RGBA). Terinspirasi dari Tirai Renda Beludru Emas
    Kanjeng Gusti Pangeran & Bangsal Kencana.
    """
    w_lace = 1080
    num_modules = 12  # 12 modul kawung berulang = 90px per modul
    step = w_lace / num_modules

    kawung_modules = []
    for i in range(num_modules):
        x0 = i * step
        x_mid = x0 + step / 2.0
        x1 = x0 + step

        # Tiap modul: Bulatan 4 Kelopak Kawung Keraton + Sulur Lung-lungan Daun Emas
        # Pusat Kawung di (x_mid, 140)
        cy_kawung = 140
        rx_k = 24
        ry_k = 36

        kawung_modules.append(f'''
          <!-- Modul Batik Kawung Keraton #{i+1} di ({x_mid:.1f}) -->
          <!-- 1. Sulur Lengkung Daun Lung-lungan Atas Kiri & Kanan -->
          <path d="M {x_mid} 56 Q {x0 + 10} 85 {x0 + 12} 135 Q {x0 + 32} 125 {x_mid - 14} 160" fill="#18130D" stroke="#E5C16C" stroke-width="1.8" />
          <path d="M {x_mid} 56 Q {x1 - 10} 85 {x1 - 14} 135 Q {x1 - 32} 125 {x_mid + 14} 160" fill="#18130D" stroke="#E5C16C" stroke-width="1.8" />

          <!-- 2. Empat Kelopak Elips Kawung (Papat Kiblat Lima Pancer) -->
          <!-- Kelopak Vertikal Atas & Bawah -->
          <ellipse cx="{x_mid}" cy="{cy_kawung - 20}" rx="14" ry="22" fill="#201810" stroke="#E5C16C" stroke-width="1.8" />
          <ellipse cx="{x_mid}" cy="{cy_kawung + 20}" rx="14" ry="22" fill="#201810" stroke="#E5C16C" stroke-width="1.8" />
          <!-- Kelopak Horisontal Kiri & Kanan -->
          <ellipse cx="{x_mid - 20}" cy="{cy_kawung}" rx="22" ry="14" fill="#201810" stroke="#E5C16C" stroke-width="1.8" />
          <ellipse cx="{x_mid + 20}" cy="{cy_kawung}" rx="22" ry="14" fill="#201810" stroke="#E5C16C" stroke-width="1.8" />

          <!-- Isen-isen Kelopak Kawung (Garis & Titik Mutiara Etsa Tembaga) -->
          <ellipse cx="{x_mid}" cy="{cy_kawung - 20}" rx="7" ry="13" fill="#130D08" stroke="#FFFDF7" stroke-width="0.8" />
          <ellipse cx="{x_mid}" cy="{cy_kawung + 20}" rx="7" ry="13" fill="#130D08" stroke="#FFFDF7" stroke-width="0.8" />
          <ellipse cx="{x_mid - 20}" cy="{cy_kawung}" rx="13" ry="7" fill="#130D08" stroke="#FFFDF7" stroke-width="0.8" />
          <ellipse cx="{x_mid + 20}" cy="{cy_kawung}" rx="13" ry="7" fill="#130D08" stroke="#FFFDF7" stroke-width="0.8" />

          <!-- Titik Pusat Pancer Inti Kawung -->
          <circle cx="{x_mid}" cy="{cy_kawung}" r="6.5" fill="#E5C16C" stroke="#FFFDF7" stroke-width="1.2" />
          <circle cx="{x_mid}" cy="{cy_kawung}" r="2.5" fill="#18130D" />

          <!-- 3. Mahkota Kuncup Bunga Padma di Puncak Modul -->
          <circle cx="{x_mid}" cy="52" r="5" fill="#E5C16C" stroke="#FFFDF7" stroke-width="1.2" />
          <line x1="{x_mid}" y1="40" x2="{x_mid}" y2="48" stroke="#FFFDF7" stroke-width="1.5" />

          <!-- 4. Kelopak Segitiga Renda Gantung Bawah (Scalloped Pelmet) -->
          <polygon points="{x_mid - 28},195 {x_mid + 28},195 {x_mid},245" fill="#1B140E" stroke="#E5C16C" stroke-width="2" />
          <polygon points="{x_mid - 18},195 {x_mid + 18},195 {x_mid},230" fill="#2A1E14" stroke="#FFFDF7" stroke-width="1" />
          <circle cx="{x_mid}" cy="210" r="3" fill="#E5C16C" />

          <!-- 5. Untaian Manik Emas & Jumbai Gantung (Tassel Fringe) -->
          <line x1="{x_mid}" y1="245" x2="{x_mid}" y2="285" stroke="#E5C16C" stroke-width="1.8" stroke-dasharray="4 3" />
          <circle cx="{x_mid}" cy="288" r="4.5" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1.4" />
          <circle cx="{x_mid}" cy="304" r="3" fill="#E5C16C" />

          <!-- Manik Gantung Samping Kiri & Kanan Modul -->
          <line x1="{x0 + 18}" y1="170" x2="{x0 + 18}" y2="220" stroke="#C59B3C" stroke-width="1" stroke-dasharray="3 3" />
          <circle cx="{x0 + 18}" cy="223" r="3" fill="#E5C16C" />
          <line x1="{x1 - 18}" y1="170" x2="{x1 - 18}" y2="220" stroke="#C59B3C" stroke-width="1" stroke-dasharray="3 3" />
          <circle cx="{x1 - 18}" cy="223" r="3" fill="#E5C16C" />
        ''')

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 320" width="1080" height="320">
  <defs>
    <linearGradient id="jawaGoldGradLace" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C59B3C" />
      <stop offset="25%" stop-color="#FFFDF7" />
      <stop offset="50%" stop-color="#E5C16C" />
      <stop offset="75%" stop-color="#FFFDF7" />
      <stop offset="100%" stop-color="#C59B3C" />
    </linearGradient>
  </defs>

  <!-- Sabuk Pita Emas Paling Atas (Balok Bordir Beludru Parang Keraton) -->
  <rect x="0" y="0" width="1080" height="24" fill="#130D08" stroke="url(#jawaGoldGradLace)" stroke-width="2.2" />
  <rect x="0" y="24" width="1080" height="26" fill="#1E1610" stroke="#E5C16C" stroke-width="1.5" />

  <!-- Motif Belah Ketupat & Parang Barong di Sabuk Atas -->
  {' '.join([f'<polygon points="{x},37 {x+12},27 {x+24},37 {x+12},47" fill="#E5C16C" stroke="#FFFDF7" stroke-width="0.8" />' for x in range(12, 1070, 36)])}

  <!-- Deretan Modul Renda Kawung & Lung-lungan Menggantung -->
  {' '.join(kawung_modules)}
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 3. GENERATOR MEDALLION SEGEL GUNUNGAN KAYON (jawa-gunungan-seal.svg)
# ─────────────────────────────────────────────────────────────────────────────
def generate_gunungan_seal_svg() -> str:
    """
    Medallion segel lambang Gunungan Kayon Blencong emas murni 1px hairline SVG (600x600).
    Gunungan Wayang Kulit Keraton legendaris dengan Pohon Hayat (Kalpataru),
    gapura Banaspati / Kala, lidah api blencong prada emas, dan border konsentris
    1px hairline dengan tipografi archival Keraton Ngayogyakarta Hadiningrat.
    """
    # 48 butir manik emas (beaded circle) di lingkaran luar
    beads = []
    for deg in range(0, 360, 8):
        rad = math.radians(deg)
        cx = 300 + 265 * math.cos(rad)
        cy = 300 + 265 * math.sin(rad)
        beads.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="2.8" fill="#E5C16C" />')

    # 16 ornamen kelopak melati Padma di lingkaran cincin kedua
    padma_petals = []
    for deg in range(0, 360, 24):
        rad = math.radians(deg)
        cx1 = 300 + 242 * math.cos(rad)
        cy1 = 300 + 242 * math.sin(rad)
        padma_petals.append(f'<circle cx="{cx1:.2f}" cy="{cy1:.2f}" r="4.2" fill="#18130E" stroke="#E5C16C" stroke-width="1" />')
        padma_petals.append(f'<circle cx="{cx1:.2f}" cy="{cy1:.2f}" r="1.8" fill="#FFFDF7" />')

    # Lidah Api Blencong Emas di Sayap Kiri dan Kanan Gunungan
    flames = []
    # Lidah api kiri
    for fy in range(160, 360, 32):
        t = (fy - 160) / 200.0
        fx = int(245 - 28 * math.sin(t * math.pi))
        flames.append(f'<path d="M {fx} {fy} Q {fx - 22} {fy - 12} {fx - 14} {fy + 14} Z" fill="#E5C16C" stroke="#FFFDF7" stroke-width="0.8" opacity="0.85" />')
    # Lidah api kanan
    for fy in range(160, 360, 32):
        t = (fy - 160) / 200.0
        fx = int(355 + 28 * math.sin(t * math.pi))
        flames.append(f'<path d="M {fx} {fy} Q {fx + 22} {fy - 12} {fx + 14} {fy + 14} Z" fill="#E5C16C" stroke="#FFFDF7" stroke-width="0.8" opacity="0.85" />')

    # Dahan & Dedaunan Pohon Hayat (Kalpataru) di Dalam Gunungan
    tree_branches = []
    for by in (160, 195, 230):
        span = (by - 120) * 0.95
        tree_branches.append(f'''
          <!-- Dahan Kiri & Kanan di Y: {by} -->
          <path d="M 300 {by} Q {300 - span//2} {by - 18} {300 - span} {by - 8}" fill="none" stroke="#E5C16C" stroke-width="1.4" />
          <circle cx="{300 - span}" cy="{by - 8}" r="3.2" fill="#FFFDF7" stroke="#E5C16C" stroke-width="0.8" />
          <path d="M 300 {by} Q {300 + span//2} {by - 18} {300 + span} {by - 8}" fill="none" stroke="#E5C16C" stroke-width="1.4" />
          <circle cx="{300 + span}" cy="{by - 8}" r="3.2" fill="#FFFDF7" stroke="#E5C16C" stroke-width="0.8" />
        ''')

    # Burung Merak Kembar Bertengger di Dahan Pohon Hayat (Kiri & Kanan)
    twin_peacocks = f'''
      <!-- Burung Merak Kiri -->
      <g id="merak-kiri">
        <path d="M 235 220 Q 220 205 210 215 Q 225 225 240 225" fill="#241B12" stroke="#E5C16C" stroke-width="1.1" />
        <circle cx="212" cy="214" r="2.5" fill="#FFFDF7" />
        <!-- Ekor Merak Megah Melengkung -->
        <path d="M 240 225 Q 260 210 255 190" fill="none" stroke="#E5C16C" stroke-width="1.2" stroke-dasharray="3 2" />
      </g>
      <!-- Burung Merak Kanan -->
      <g id="merak-kanan">
        <path d="M 365 220 Q 380 205 390 215 Q 375 225 360 225" fill="#241B12" stroke="#E5C16C" stroke-width="1.1" />
        <circle cx="388" cy="214" r="2.5" fill="#FFFDF7" />
        <!-- Ekor Merak Megah Melengkung -->
        <path d="M 360 225 Q 340 210 345 190" fill="none" stroke="#E5C16C" stroke-width="1.2" stroke-dasharray="3 2" />
      </g>
    '''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Gradien Emas Kuno Hairline -->
    <linearGradient id="gununganGoldHairline" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="35%" stop-color="#F4DA90" />
      <stop offset="70%" stop-color="#E5C16C" />
      <stop offset="100%" stop-color="#9E7D32" />
    </linearGradient>

    <radialGradient id="sealBackdropDarkJawa" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1A1510" stop-opacity="0.95" />
      <stop offset="75%" stop-color="#120E0A" stop-opacity="0.98" />
      <stop offset="100%" stop-color="#080705" stop-opacity="1" />
    </radialGradient>
  </defs>

  <!-- Latar Belakang Medallion Arang Obsidian Gelap -->
  <circle cx="300" cy="300" r="285" fill="url(#sealBackdropDarkJawa)" stroke="url(#gununganGoldHairline)" stroke-width="1.8" />

  <!-- Lingkaran Luar Berbutir Emas (Beaded Outer Ring) -->
  <circle cx="300" cy="300" r="265" fill="none" stroke="#C59B3C" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.65" />
  {' '.join(beads)}

  <!-- Cincin Konsentris Ganda 1px Hairline -->
  <circle cx="300" cy="300" r="252" fill="none" stroke="#FFFDF7" stroke-width="1" />
  <circle cx="300" cy="300" r="232" fill="none" stroke="#E5C16C" stroke-width="1" />
  {' '.join(padma_petals)}
  <circle cx="300" cy="300" r="218" fill="none" stroke="#E5C16C" stroke-width="1" stroke-dasharray="6 3" />

  <!-- ═══════════════════════════════════════════════════════════════════════ -->
  <!-- INTI LAMBANG GUNUNGAN KAYON KERATON (WAYANG KULIT BLENCONG) -->
  <!-- ═══════════════════════════════════════════════════════════════════════ -->
  <g id="lambang-gunungan-kayon" transform="translate(0, 0)">
    <!-- 1. Siluet Daun Utama Gunungan Kayon (Lancip Menjulang Simetris) -->
    <!-- Kontur Utama Daun Gunungan -->
    <path d="M 300 75 C 335 140 375 220 375 320 C 375 390 350 425 300 435 C 250 425 225 390 225 320 C 225 220 265 140 300 75 Z" fill="#18130E" stroke="url(#gununganGoldHairline)" stroke-width="2.2" />
    <path d="M 300 88 C 330 148 365 222 365 318 C 365 382 342 415 300 424 C 258 415 235 382 235 318 C 235 222 270 148 300 88 Z" fill="none" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="5 3" />

    <!-- 2. Puncak Mustaka / Meru Tajuk Gunungan -->
    <path d="M 300 50 L 295 75 L 305 75 Z" fill="#E5C16C" stroke="#FFFDF7" stroke-width="1" />
    <circle cx="300" cy="46" r="4.5" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1.2" />
    <circle cx="300" cy="72" r="3.2" fill="#E5C16C" />

    <!-- 3. Lidah Api Blencong Emas di Sayap Kiri & Kanan -->
    {' '.join(flames)}

    <!-- 4. Pohon Hayat (Kalpataru): Batang Utama di Tengah -->
    <line x1="300" y1="110" x2="300" y2="290" stroke="#E5C16C" stroke-width="2.5" />
    <line x1="300" y1="120" x2="300" y2="280" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="6 3" />
    {' '.join(tree_branches)}
    {twin_peacocks}

    <!-- 5. Relief Banaspati / Kala (Penjaga Gapura Ageng) -->
    <!-- Wajah Kala di Atas Pintu Gerbang (Y: 280 - 315) -->
    <g id="banaspati-kala">
      <path d="M 275 310 Q 300 282 325 310 Z" fill="#241B12" stroke="#E5C16C" stroke-width="1.6" />
      <!-- Mata Melotot Bulat Banaspati -->
      <circle cx="288" cy="300" r="4.2" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1" />
      <circle cx="312" cy="300" r="4.2" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1" />
      <circle cx="288" cy="300" r="1.8" fill="#140F0A" />
      <circle cx="312" cy="300" r="1.8" fill="#140F0A" />
      <!-- Hidung & Taring Emas Kala -->
      <polygon points="300,302 296,310 304,310" fill="#E5C16C" />
      <path d="M 285 310 L 283 318 L 290 312" fill="#FFFDF7" />
      <path d="M 315 310 L 317 318 L 310 312" fill="#FFFDF7" />
    </g>

    <!-- 6. Gapura Rumah Gerbang (Candi Bentar / Regol Keraton) -->
    <!-- Kusen Luar Gapura (Y: 315 - 425, X: 260 - 340) -->
    <polygon points="260,425 260,325 340,325 340,425" fill="#140F0A" stroke="url(#gununganGoldHairline)" stroke-width="2" />
    <!-- Kusen Dalam & Pintu Kayu Berukir -->
    <rect x="272" y="335" width="56" height="90" fill="#0C0906" stroke="#FFFDF7" stroke-width="1.2" />
    <line x1="300" y1="335" x2="300" y2="425" stroke="#E5C16C" stroke-width="1.5" />
    <!-- Terali Filigri Pintu Emas Intaglio Silang -->
    <line x1="272" y1="355" x2="328" y2="405" stroke="#E5C16C" stroke-width="0.9" stroke-dasharray="4 2" />
    <line x1="328" y1="355" x2="272" y2="405" stroke="#E5C16C" stroke-width="0.9" stroke-dasharray="4 2" />
    <circle cx="300" cy="380" r="8" fill="#201810" stroke="#E5C16C" stroke-width="1.2" />
    <circle cx="300" cy="380" r="2.8" fill="#FFFDF7" />

    <!-- 7. Balok Dudukan Bawah & Tangkai Gapit Cempurit Emas -->
    <rect x="250" y="423" width="100" height="12" fill="#261C13" stroke="#E5C16C" stroke-width="1.6" rx="2" />
    <line x1="255" y1="429" x2="345" y2="429" stroke="#FFFDF7" stroke-width="1" stroke-dasharray="6 3" />
    <!-- Tangkai Gapit Tanduk Kerbau / Emas Menjulur ke Bawah -->
    <polygon points="296,435 304,435 302,485 298,485" fill="#201710" stroke="#E5C16C" stroke-width="1.4" />
    <circle cx="300" cy="488" r="3.5" fill="#FFFDF7" stroke="#E5C16C" stroke-width="1" />
  </g>

  <!-- Tulisan Mikro Monogram Archival Hairline di Busur Bawah -->
  <path id="archivalArcTextJawa" d="M 100 440 A 240 240 0 0 0 500 440" fill="none" />
  <text font-family="'Times New Roman', Georgia, serif" font-size="11" fill="#E5C16C" letter-spacing="4" opacity="0.8">
    <textPath href="#archivalArcTextJawa" startOffset="50%" text-anchor="middle">
      K E R A T O N   N G A Y O G Y A K A R T A   H A D I N I N G R A T
    </textPath>
  </text>
</svg>'''
    return svg


# ─────────────────────────────────────────────────────────────────────────────
# 4. RUNNER & VALIDATOR
# ─────────────────────────────────────────────────────────────────────────────
def main():
    print("=" * 68)
    print("  STUDIO JAWA KERATON LITHOGRAPH & ARCHIVAL ENGRAVING GENERATOR")
    print("=" * 68)

    # 1. Stage Backdrop
    print("\n[1/4] Merender bg-stage-jawa-keraton.webp (1080x1920)...")
    stage_svg = generate_jawa_lithograph_svg(is_stage=True)
    out_stage = os.path.join(OUTPUT_DIR, "bg-stage-jawa-keraton.webp")
    render_svg_to_webp(stage_svg, out_stage, 1080, 1920, quality=88)

    # 2. Cover Backdrop
    print("\n[2/4] Merender bg-cover-jawa-keraton.webp (1080x1920)...")
    cover_svg = generate_jawa_lithograph_svg(is_stage=False)
    out_cover = os.path.join(OUTPUT_DIR, "bg-cover-jawa-keraton.webp")
    render_svg_to_webp(cover_svg, out_cover, 1080, 1920, quality=90)

    # 3. Header Kawung Lace Pelmet
    print("\n[3/4] Merender jawa-kawung-lace.webp (1080x320 RGBA)...")
    lace_svg = generate_kawung_lace_svg()
    out_lace = os.path.join(OUTPUT_DIR, "jawa-kawung-lace.webp")
    render_svg_to_webp(lace_svg, out_lace, 1080, 320, quality=92)

    # 4. Medallion Segel Lambang Gunungan Kayon (SVG Vektor 1px Hairline)
    print("\n[4/4] Menulis jawa-gunungan-seal.svg (600x600 SVG Hairline Medallion)...")
    seal_svg = generate_gunungan_seal_svg()
    out_seal = os.path.join(OUTPUT_DIR, "jawa-gunungan-seal.svg")
    with open(out_seal, "w", encoding="utf-8") as f:
        f.write(seal_svg)
    size_seal_kb = os.path.getsize(out_seal) / 1024
    print(f" [OK] {os.path.basename(out_seal)} (600x600 SVG, {size_seal_kb:.1f} KB)")

    print("\n" + "=" * 68)
    print("  VERIFIKASI KUALITAS ASET (DIMENSI, UKURAN & PIXEL EXTREMA)")
    print("=" * 68)

    # Verifikasi WebP dan SVG
    expected_files = [
        ("bg-cover-jawa-keraton.webp", (1080, 1920)),
        ("bg-stage-jawa-keraton.webp", (1080, 1920)),
        ("jawa-kawung-lace.webp", (1080, 320)),
        ("jawa-gunungan-seal.svg", None)
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

            # Target optimal 30KB - 180KB
            size_optimal = (25.0 <= size_kb <= 220.0)
            status = "PASS" if (dim_match and not_black and size_optimal) else "WARN"
            print(f" [{status}] {fname}: {dims[0]}x{dims[1]} px, {size_kb:.1f} KB, Extrema: {extrema}")
            if status != "PASS":
                all_passed = False
        else:
            status = "PASS" if size_kb > 2 else "WARN"
            print(f" [{status}] {fname}: SVG Vector, {size_seal_kb:.1f} KB")

    print("\n" + "=" * 68)
    if all_passed:
        print("  STATUS: SELURUH ASET LITHOGRAPH JAWA KERATON LOLOS VERIFIKASI!")
    else:
        print("  STATUS: ADA PERINGATAN PADA VERIFIKASI ASET")
    print("=" * 68)


if __name__ == "__main__":
    main()
