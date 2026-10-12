import os
import subprocess
import random
from PIL import Image

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUTPUT_DIR = os.path.abspath("public/assets/motion-art-minang")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def render_html_with_edge(html_content: str, out_webp: str, width: int, height: int, quality: int = 92):
    temp_html = os.path.abspath("temp_render.html")
    temp_png = os.path.abspath("temp_render.png")
    
    full_html = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ box-sizing: border-box; }}
  html, body {{
    margin: 0;
    padding: 0;
    width: {width}px;
    height: {height}px;
    overflow: hidden;
    background: transparent;
  }}
  svg {{
    display: block;
    width: {width}px;
    height: {height}px;
  }}
</style>
</head>
<body>
{html_content}
</body>
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

    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("Edge error:", res.stderr)

    if os.path.exists(temp_png):
        img = Image.open(temp_png)
        if img.size != (width, height):
            img = img.crop((0, 0, width, height))
        img.save(out_webp, "WEBP", quality=quality, method=6)
        size_kb = os.path.getsize(out_webp) / 1024
        print(f"Generated {out_webp} ({width}x{height}, {size_kb:.1f} KB)")
        try:
            os.remove(temp_png)
            os.remove(temp_html)
        except Exception:
            pass
    else:
        print(f"Failed to generate {temp_png}")

# ─────────────────────────────────────────────────────────────────────────────
# 1. RUMAH GADANG 9 RUANG + MOUNT MARAPI & SINGGALANG + RANGKIANG
# ─────────────────────────────────────────────────────────────────────────────
def create_rumah_gadang_svg(is_cover: bool = False) -> str:
    random.seed(42)
    stars = []
    for _ in range(95):
        cx = random.randint(15, 1065)
        cy = random.randint(20, 720)
        r = random.uniform(0.8, 2.4)
        op = random.uniform(0.35, 0.95)
        stars.append(f'<circle cx="{cx}" cy="{cy}" r="{r:.1f}" fill="#FFFDF0" opacity="{op:.2f}"/>')
        if r > 1.9:
            stars.append(f'<path d="M {cx-5} {cy} L {cx+5} {cy} M {cx} {cy-5} L {cx} {cy+5}" stroke="#FFE59E" stroke-width="0.9" opacity="{op*0.75:.2f}"/>')

    vignette_opacity = "0.78" if is_cover else "0.52"

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Deep Marawa Sky Gradient: Obsidian to Crimson-Maroon to Antique Gold Ambient -->
    <linearGradient id="marawaSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#080204" />
      <stop offset="18%" stop-color="#140408" />
      <stop offset="38%" stop-color="#240810" />
      <stop offset="55%" stop-color="#380C18" />
      <stop offset="72%" stop-color="#521223" />
      <stop offset="86%" stop-color="#3A0D18" />
      <stop offset="100%" stop-color="#150608" />
    </linearGradient>

    <!-- Mountain Gradients -->
    <linearGradient id="singgalangGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3E111E" />
      <stop offset="45%" stop-color="#260A13" />
      <stop offset="100%" stop-color="#120307" />
    </linearGradient>
    <linearGradient id="marapiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4D1525" />
      <stop offset="55%" stop-color="#2D0B16" />
      <stop offset="100%" stop-color="#110306" />
    </linearGradient>

    <!-- Antique Gold Shading for Gonjong Roofs -->
    <linearGradient id="goldRoofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E0" />
      <stop offset="22%" stop-color="#FCD34D" />
      <stop offset="55%" stop-color="#DFB247" />
      <stop offset="85%" stop-color="#996D14" />
      <stop offset="100%" stop-color="#5E4008" />
    </linearGradient>

    <linearGradient id="roofRidgeGrad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#DFB247" />
      <stop offset="20%" stop-color="#FFF7DB" />
      <stop offset="50%" stop-color="#FBBF24" />
      <stop offset="80%" stop-color="#FFF7DB" />
      <stop offset="100%" stop-color="#DFB247" />
    </linearGradient>

    <!-- Timber Wall Gradient -->
    <linearGradient id="darkTimberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2D0E16" />
      <stop offset="40%" stop-color="#1E090F" />
      <stop offset="100%" stop-color="#0E0205" />
    </linearGradient>

    <!-- Moon Glow -->
    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF0BA" stop-opacity="0.95" />
      <stop offset="30%" stop-color="#FBBF24" stop-opacity="0.4" />
      <stop offset="65%" stop-color="#DFB247" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#240B10" stop-opacity="0" />
    </radialGradient>

    <!-- Window Interior Glow -->
    <radialGradient id="interiorWarmth" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF9D6" stop-opacity="0.98" />
      <stop offset="38%" stop-color="#FBBF24" stop-opacity="0.8" />
      <stop offset="80%" stop-color="#D97706" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>

    <!-- Stone Courtyard -->
    <linearGradient id="terraceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#260B12" />
      <stop offset="45%" stop-color="#17050A" />
      <stop offset="100%" stop-color="#090204" />
    </linearGradient>

    <!-- Soft Filter for Aura -->
    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- ── 1. SKY & STARFIELD ── -->
  <rect width="1080" height="1920" fill="url(#marawaSky)" />
  <g>{ "".join(stars) }</g>

  <!-- Radiant Full Moon (Bulan Purnama Ranah Minang) -->
  <circle cx="800" cy="340" r="160" fill="url(#moonGlow)" />
  <circle cx="800" cy="340" r="48" fill="#FFFDF5" />
  <circle cx="794" cy="334" r="45" fill="#FFF4D0" opacity="0.9" />
  <circle cx="780" cy="320" r="18" fill="#EDE0B8" opacity="0.4" />
  <circle cx="815" cy="355" r="14" fill="#E2D0A0" opacity="0.3" />

  <!-- Highland Atmosphere Clouds -->
  <path d="M 0 460 Q 300 400 580 440 T 1080 410 L 1080 640 L 0 640 Z" fill="#6E172B" opacity="0.25" />
  <path d="M 0 530 Q 340 480 720 510 T 1080 490 L 1080 720 L 0 720 Z" fill="#992B3E" opacity="0.18" />

  <!-- ── 2. MOUNT SINGGALANG & MOUNT MARAPI ── -->
  <!-- Mount Singgalang (Left Majestic Conical Volcano) -->
  <path d="M -80 760 L 120 490 Q 230 430 320 460 L 540 760 Z" fill="url(#singgalangGrad)" />
  <path d="M 230 430 Q 260 550 330 670 L 340 760" stroke="#7A2234" stroke-width="2.5" opacity="0.45" fill="none" />

  <!-- Mount Marapi (Right Active Volcano with subtle steam) -->
  <path d="M 370 760 L 590 510 Q 690 460 800 485 L 880 530 L 1150 760 Z" fill="url(#marapiGrad)" />
  <!-- Marapi volcanic crater crest line -->
  <path d="M 690 460 Q 745 480 800 485" stroke="#DFB247" stroke-width="2" opacity="0.55" fill="none" />
  <path d="M 690 465 Q 730 540 790 650 L 820 760" stroke="#8E263B" stroke-width="2.5" opacity="0.4" fill="none" />
  <!-- Gentle volcanic plume in moonlight -->
  <path d="M 730 460 Q 755 390 725 320 Q 770 270 735 210" stroke="#FFE9AE" stroke-width="8" stroke-linecap="round" opacity="0.1" fill="none" />

  <!-- Foothill ridges (Bukit Barisan) -->
  <path d="M -40 820 Q 260 700 560 780 T 1120 740 L 1120 980 L -40 980 Z" fill="#1C060C" opacity="0.95" />
  <path d="M -40 890 Q 380 810 760 860 T 1120 830 L 1120 1100 L -40 1100 Z" fill="#150408" />

  <!-- Drifting Highland Golden Valley Mist -->
  <ellipse cx="540" cy="830" rx="600" ry="38" fill="#FFE59E" opacity="0.12" />
  <ellipse cx="360" cy="880" rx="420" ry="30" fill="#DFB247" opacity="0.09" />

  <!-- Tropical Pinang & Coconut Palms -->
  <g opacity="0.8" transform="translate(35, 750) scale(0.95)">
    <path d="M 50 260 Q 40 140 15 0" stroke="#0E0305" stroke-width="11" stroke-linecap="round" fill="none" />
    <path d="M 15 0 Q -50 -50 -120 -20" stroke="#120407" stroke-width="5" fill="none" />
    <path d="M 15 0 Q -20 -80 -80 -110" stroke="#180509" stroke-width="5" fill="none" />
    <path d="M 15 0 Q 30 -90 20 -130" stroke="#180509" stroke-width="5" fill="none" />
    <path d="M 15 0 Q 70 -70 110 -80" stroke="#120407" stroke-width="5" fill="none" />
    <path d="M 15 0 Q 90 -30 140 -20" stroke="#100306" stroke-width="5" fill="none" />
  </g>
  <g opacity="0.8" transform="translate(985, 770) scale(-0.9, 0.9)">
    <path d="M 50 260 Q 40 140 15 0" stroke="#0E0305" stroke-width="11" stroke-linecap="round" fill="none" />
    <path d="M 15 0 Q -50 -50 -120 -20" stroke="#120407" stroke-width="5" fill="none" />
    <path d="M 15 0 Q -20 -80 -80 -110" stroke="#180509" stroke-width="5" fill="none" />
    <path d="M 15 0 Q 30 -90 20 -130" stroke="#180509" stroke-width="5" fill="none" />
    <path d="M 15 0 Q 70 -70 110 -80" stroke="#120407" stroke-width="5" fill="none" />
    <path d="M 15 0 Q 90 -30 140 -20" stroke="#100306" stroke-width="5" fill="none" />
  </g>

  <!-- ── 3. RANGKIANG (Traditional Rice Granary) ── -->
  <g id="rangkiang" transform="translate(820, 1140)">
    <ellipse cx="80" cy="330" rx="90" ry="18" fill="#090204" opacity="0.9" />
    <!-- 4 High Pillars -->
    <rect x="20" y="190" width="10" height="135" fill="#140508" stroke="#3A101A" stroke-width="1" />
    <rect x="52" y="195" width="9" height="130" fill="#1A070B" stroke="#481522" stroke-width="1" />
    <rect x="98" y="195" width="9" height="130" fill="#1A070B" stroke="#481522" stroke-width="1" />
    <rect x="130" y="190" width="10" height="135" fill="#140508" stroke="#3A101A" stroke-width="1" />
    <!-- Batu Sandi -->
    <ellipse cx="25" cy="324" rx="14" ry="7" fill="#2A0B12" stroke="#DFB247" stroke-width="1" />
    <ellipse cx="56" cy="324" rx="13" ry="6" fill="#2A0B12" stroke="#DFB247" stroke-width="1" />
    <ellipse cx="102" cy="324" rx="13" ry="6" fill="#2A0B12" stroke="#DFB247" stroke-width="1" />
    <ellipse cx="135" cy="324" rx="14" ry="7" fill="#2A0B12" stroke="#DFB247" stroke-width="1" />
    <!-- Rat Guards -->
    <ellipse cx="25" cy="235" rx="16" ry="5" fill="#3D121D" stroke="#DFB247" stroke-width="1" />
    <ellipse cx="56" cy="238" rx="15" ry="4.5" fill="#3D121D" stroke="#DFB247" stroke-width="1" />
    <ellipse cx="102" cy="238" rx="15" ry="4.5" fill="#3D121D" stroke="#DFB247" stroke-width="1" />
    <ellipse cx="135" cy="235" rx="16" ry="5" fill="#3D121D" stroke="#DFB247" stroke-width="1" />
    <!-- Body with outward flare -->
    <polygon points="10,105 150,105 138,195 22,195" fill="url(#darkTimberGrad)" stroke="#DFB247" stroke-width="2" />
    <line x1="16" y1="130" x2="144" y2="130" stroke="#DFB247" stroke-width="1.2" stroke-dasharray="4 2" />
    <line x1="20" y1="160" x2="140" y2="160" stroke="#DFB247" stroke-width="1.2" stroke-dasharray="3 3" />
    <!-- Glowing Attic Window -->
    <rect x="68" y="132" width="24" height="32" rx="3" fill="#FFEAA7" opacity="0.9" stroke="#DFB247" stroke-width="1.5" />
    <line x1="80" y1="132" x2="80" y2="164" stroke="#8F6A18" stroke-width="1" />
    <!-- Rangkiang Roof Horns -->
    <path d="M -12 75 Q 35 70 80 82 Q 125 70 172 75 L 152 105 L 8 105 Z" fill="#240A10" stroke="#DFB247" stroke-width="1.5" />
    <path d="M -18 45 C 5 65, 45 78, 80 78 C 115 78, 155 65, 178 45 C 160 85, 120 95, 80 95 C 40 95, 0 85, -18 45 Z" fill="url(#goldRoofGrad)" stroke="#FFE79A" stroke-width="1.8" />
    <path d="M -22 18 Q -10 40 15 58 Q 50 68 80 68 Q 110 68 145 58 Q 170 40 182 18 Q 165 48 135 62 Q 80 70 25 62 Q -5 48 -22 18 Z" fill="url(#goldRoofGrad)" stroke="#FFF2CE" stroke-width="2" />
    <path d="M -22 18 L -28 -8 L -18 12" stroke="#FFF2CE" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="-28" cy="-8" r="3" fill="#FFEBB3" />
    <path d="M 182 18 L 188 -8 L 178 12" stroke="#FFF2CE" stroke-width="2.5" stroke-linecap="round" fill="none" />
    <circle cx="188" cy="-8" r="3" fill="#FFEBB3" />
  </g>

  <!-- ── 4. RUMAH GADANG 9 RUANG ── -->
  <g id="rumah-gadang">
    <!-- Ground Footprint Shadow -->
    <ellipse cx="540" cy="1510" rx="470" ry="42" fill="#060103" opacity="0.95" />

    <!-- Stilts Rows -->
    <g id="stilts">
      <!-- Back row -->
      {' '.join([f'<rect x="{120 + i*58}" y="1360" width="10" height="120" fill="#100306" stroke="#280C14" stroke-width="1"/>' for i in range(15)])}
      <!-- Front row with Sandi stones -->
      {' '.join([f'''<rect x="{112 + i*58}" y="1375" width="13" height="125" fill="#1C060C" stroke="#481522" stroke-width="1.2"/>
      <line x1="{115 + i*58}" y1="1375" x2="{115 + i*58}" y2="1500" stroke="#DFB247" stroke-width="0.9" opacity="0.4"/>
      <ellipse cx="{118 + i*58}" cy="1498" rx="14" ry="7" fill="#280B12" stroke="#DFB247" stroke-width="1"/>''' for i in range(15)])}
    </g>

    <!-- Grand Entrance Balai Stairs in Center -->
    <g id="stairs" transform="translate(485, 1375)">
      <polygon points="0,130 110,130 95,50 15,50" fill="#140408" stroke="#DFB247" stroke-width="1.8" />
      <line x1="8" y1="115" x2="102" y2="115" stroke="#FBBF24" stroke-width="2.5" />
      <line x1="14" y1="98" x2="96" y2="98" stroke="#FBBF24" stroke-width="2.5" />
      <line x1="20" y1="82" x2="90" y2="82" stroke="#FBBF24" stroke-width="2.5" />
      <line x1="26" y1="66" x2="84" y2="66" stroke="#FBBF24" stroke-width="2.5" />
      <path d="M 0 130 L 15 50" stroke="#DFB247" stroke-width="3" stroke-linecap="round" />
      <path d="M 110 130 L 95 50" stroke="#DFB247" stroke-width="3" stroke-linecap="round" />
      <!-- Entrance Portal Glow -->
      <rect x="30" y="8" width="50" height="42" rx="4" fill="url(#interiorWarmth)" />
      <path d="M 30 8 Q 55 -6 80 8 L 80 50 L 30 50 Z" fill="#24080F" stroke="#FBBF24" stroke-width="2" />
      <path d="M 36 20 Q 55 5 74 20" stroke="#FFF2CE" stroke-width="1.8" fill="none" />
    </g>

    <!-- Outward-sloping Facade Walls -->
    <polygon points="60,1240 1020,1240 980,1375 100,1375" fill="url(#darkTimberGrad)" stroke="#DFB247" stroke-width="2.5" />
    <line x1="85" y1="1265" x2="995" y2="1265" stroke="#DFB247" stroke-width="2" />
    <line x1="92" y1="1285" x2="988" y2="1285" stroke="#FBBF24" stroke-width="1.5" stroke-dasharray="6 3" />
    <line x1="96" y1="1340" x2="984" y2="1340" stroke="#DFB247" stroke-width="1.8" />
    <line x1="100" y1="1360" x2="980" y2="1360" stroke="#8F6A18" stroke-width="1.5" />

    <!-- 12 Illuminated Carved Windows -->
    {' '.join([f'''
    <g transform="translate({125 + i*52}, 1288)">
      <rect x="0" y="0" width="30" height="42" rx="3" fill="url(#interiorWarmth)" stroke="#DFB247" stroke-width="1.5" />
      <line x1="15" y1="0" x2="15" y2="42" stroke="#8F6A18" stroke-width="1" />
      <line x1="0" y1="14" x2="30" y2="14" stroke="#8F6A18" stroke-width="0.8" />
      <line x1="0" y1="28" x2="30" y2="28" stroke="#8F6A18" stroke-width="0.8" />
      <path d="M -2 0 Q 15 -8 32 0" stroke="#FFF2CE" stroke-width="1.5" fill="none" />
    </g>''' for i in range(6)])}

    {' '.join([f'''
    <g transform="translate({595 + i*52}, 1288)">
      <rect x="0" y="0" width="30" height="42" rx="3" fill="url(#interiorWarmth)" stroke="#DFB247" stroke-width="1.5" />
      <line x1="15" y1="0" x2="15" y2="42" stroke="#8F6A18" stroke-width="1" />
      <line x1="0" y1="14" x2="30" y2="14" stroke="#8F6A18" stroke-width="0.8" />
      <line x1="0" y1="28" x2="30" y2="28" stroke="#8F6A18" stroke-width="0.8" />
      <path d="M -2 0 Q 15 -8 32 0" stroke="#FFF2CE" stroke-width="1.5" fill="none" />
    </g>''' for i in range(6)])}

    <!-- Anjung Stepped Gables -->
    <polygon points="50,1240 90,1180 120,1240" fill="#240910" stroke="#DFB247" stroke-width="1.5" />
    <path d="M 50 1240 Q 85 1195 120 1240" stroke="#FBBF24" stroke-width="1.5" fill="none" />
    <polygon points="960,1240 990,1180 1030,1240" fill="#240910" stroke="#DFB247" stroke-width="1.5" />
    <path d="M 960 1240 Q 995 1195 1030 1240" stroke="#FBBF24" stroke-width="1.5" fill="none" />

    <!-- ── GONJONG ROOFS TIERS ── -->
    <!-- Lower Eave Valance -->
    <path d="M 30 1240 C 200 1248, 400 1252, 540 1252 C 680 1252, 880 1248, 1050 1240 L 1040 1225 C 870 1235, 680 1238, 540 1238 C 400 1238, 210 1235, 40 1225 Z" fill="#FBBF24" stroke="#FFE79A" stroke-width="1.5" />

    <!-- Lower Shingle Deck -->
    <path d="M 40 1225 C 240 1215, 380 1190, 540 1190 C 700 1190, 840 1215, 1040 1225 L 1010 1150 C 830 1120, 700 1090, 540 1090 C 380 1090, 250 1120, 70 1150 Z" fill="#280B13" stroke="#8F6A18" stroke-width="2" />

    <!-- Mid Tier Ridge Flare -->
    <path d="M 70 1150 C 250 1110, 390 1060, 540 1060 C 690 1060, 830 1110, 1010 1150 L 980 1080 C 810 1020, 690 985, 540 985 C 390 985, 270 1020, 100 1080 Z" fill="#1C060C" stroke="#DFB247" stroke-width="1.8" />

    <!-- Shingle striations -->
    {' '.join([f'''<path d="M {120 + i*42} {1150 - abs(i-10)*5} Q {140 + i*42} {1200 - abs(i-10)*4} {150 + i*42} 1230" stroke="#DFB247" stroke-width="0.9" opacity="0.4" fill="none"/>''' for i in range(21)])}

    <!-- ── SOARING GONJONG HORNS (6 Majestic Horns) ── -->
    <!-- Gonjong 1: Left Anjung -->
    <g id="gonjong-anjung-left">
      <path d="M 45 840 C 68 890, 95 970, 130 1050 C 95 1030, 60 970, 45 840 Z" fill="url(#goldRoofGrad)" stroke="#FFF3D1" stroke-width="2.2" />
      <path d="M 45 840 L 40 805 L 48 830" stroke="#FFF8E7" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <circle cx="40" cy="805" r="4" fill="#FFF2CE" filter="url(#softGlow)" />
    </g>

    <!-- Gonjong 2: Left Outer -->
    <g id="gonjong-left-outer">
      <path d="M 180 810 C 205 870, 245 960, 290 1020 C 240 1000, 195 930, 180 810 Z" fill="url(#goldRoofGrad)" stroke="#FFF3D1" stroke-width="2.5" />
      <path d="M 180 810 L 174 770 L 184 800" stroke="#FFF8E7" stroke-width="2.8" stroke-linecap="round" fill="none" />
      <circle cx="174" cy="770" r="4.5" fill="#FFF2CE" filter="url(#softGlow)" />
    </g>

    <!-- Gonjong 3: Left Inner Tallest -->
    <g id="gonjong-left-inner">
      <path d="M 350 790 C 370 860, 405 950, 450 995 C 400 975, 360 905, 350 790 Z" fill="url(#goldRoofGrad)" stroke="#FFF3D1" stroke-width="2.8" />
      <path d="M 350 790 L 344 745 L 354 780" stroke="#FFF8E7" stroke-width="3" stroke-linecap="round" fill="none" />
      <circle cx="344" cy="745" r="5" fill="#FFF2CE" filter="url(#softGlow)" />
    </g>

    <!-- Gonjong 4: Right Inner Tallest -->
    <g id="gonjong-right-inner">
      <path d="M 730 790 C 710 860, 675 950, 630 995 C 680 975, 720 905, 730 790 Z" fill="url(#goldRoofGrad)" stroke="#FFF3D1" stroke-width="2.8" />
      <path d="M 730 790 L 736 745 L 726 780" stroke="#FFF8E7" stroke-width="3" stroke-linecap="round" fill="none" />
      <circle cx="736" cy="745" r="5" fill="#FFF2CE" filter="url(#softGlow)" />
    </g>

    <!-- Gonjong 5: Right Outer -->
    <g id="gonjong-right-outer">
      <path d="M 900 810 C 875 870, 835 960, 790 1020 C 840 1000, 885 930, 900 810 Z" fill="url(#goldRoofGrad)" stroke="#FFF3D1" stroke-width="2.5" />
      <path d="M 900 810 L 906 770 L 896 800" stroke="#FFF8E7" stroke-width="2.8" stroke-linecap="round" fill="none" />
      <circle cx="906" cy="770" r="4.5" fill="#FFF2CE" filter="url(#softGlow)" />
    </g>

    <!-- Gonjong 6: Right Anjung -->
    <g id="gonjong-anjung-right">
      <path d="M 1035 840 C 1012 890, 985 970, 950 1050 C 985 1030, 1020 970, 1035 840 Z" fill="url(#goldRoofGrad)" stroke="#FFF3D1" stroke-width="2.2" />
      <path d="M 1035 840 L 1040 805 L 1032 830" stroke="#FFF8E7" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <circle cx="1040" cy="805" r="4" fill="#FFF2CE" filter="url(#softGlow)" />
    </g>

    <!-- Soaring Ridge Crest Line -->
    <path d="M 45 840 Q 130 960 180 810 Q 280 940 350 790 Q 540 920 730 790 Q 800 940 900 810 Q 950 960 1035 840" stroke="url(#roofRidgeGrad)" stroke-width="5" stroke-linecap="round" fill="none" filter="url(#softGlow)" />
    <path d="M 45 840 Q 130 960 180 810 Q 280 940 350 790 Q 540 920 730 790 Q 800 940 900 810 Q 950 960 1035 840" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" fill="none" />

    <!-- Triangular Selembayung Gable Carvings -->
    <polygon points="350,790 320,890 380,890" fill="#240B12" stroke="#DFB247" stroke-width="1.8" />
    <polygon points="730,790 700,890 760,890" fill="#240B12" stroke="#DFB247" stroke-width="1.8" />
    <circle cx="350" cy="860" r="9" fill="#DFB247" stroke="#FFF2CE" stroke-width="1.2" />
    <circle cx="730" cy="860" r="9" fill="#DFB247" stroke="#FFF2CE" stroke-width="1.2" />
  </g>

  <!-- ── 5. COURTYARD & MARAWA STANDARDS ── -->
  <path d="M 0 1520 L 1080 1520 L 1080 1920 L 0 1920 Z" fill="url(#terraceGrad)" />
  <line x1="0" y1="1520" x2="1080" y2="1520" stroke="#DFB247" stroke-width="3" />
  <line x1="0" y1="1538" x2="1080" y2="1538" stroke="#8F6A18" stroke-width="1.8" />

  {' '.join([f'''<line x1="0" y1="{1560 + i*48}" x2="1080" y2="{1560 + i*48}" stroke="#DFB247" stroke-width="0.9" opacity="0.25"/>''' for i in range(8)])}
  {' '.join([f'''<line x1="{i*120}" y1="1520" x2="{i*120 + 30}" y2="1920" stroke="#DFB247" stroke-width="0.9" opacity="0.15"/>''' for i in range(10)])}

  <!-- Left Marawa Standard -->
  <g transform="translate(45, 1460)">
    <rect x="0" y="0" width="9" height="240" fill="#0C0305" stroke="#DFB247" stroke-width="1" />
    <rect x="9" y="0" width="9" height="240" fill="#A11D2B" stroke="#DFB247" stroke-width="1" />
    <rect x="18" y="0" width="9" height="240" fill="#FBBF24" stroke="#FFE79A" stroke-width="1" />
    <polygon points="13,-28 27,0 0,0" fill="#DFB247" stroke="#FFF2CE" stroke-width="1.2" />
  </g>
  <!-- Right Marawa Standard -->
  <g transform="translate(1005, 1460)">
    <rect x="0" y="0" width="9" height="240" fill="#0C0305" stroke="#DFB247" stroke-width="1" />
    <rect x="9" y="0" width="9" height="240" fill="#A11D2B" stroke="#DFB247" stroke-width="1" />
    <rect x="18" y="0" width="9" height="240" fill="#FBBF24" stroke="#FFE79A" stroke-width="1" />
    <polygon points="13,-28 27,0 0,0" fill="#DFB247" stroke="#FFF2CE" stroke-width="1.2" />
  </g>

  <!-- Rolling Courtyard Golden Mist -->
  <ellipse cx="540" cy="1540" rx="650" ry="70" fill="#FFE59E" opacity="0.15" />
  <ellipse cx="540" cy="1680" rx="550" ry="60" fill="#DFB247" opacity="0.12" />

  <!-- ── 6. CONTRAST / TEXT READABILITY SHADING ── -->
  <linearGradient id="readabilityOverlay" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#080204" stop-opacity="0.8" />
    <stop offset="25%" stop-color="#150608" stop-opacity="0.4" />
    <stop offset="68%" stop-color="#150608" stop-opacity="0.4" />
    <stop offset="88%" stop-color="#080204" stop-opacity="0.82" />
    <stop offset="100%" stop-color="#050102" stop-opacity="0.95" />
  </linearGradient>
  <rect width="1080" height="1920" fill="url(#readabilityOverlay)" opacity="{vignette_opacity}" />
</svg>'''
    return svg

# ─────────────────────────────────────────────────────────────────────────────
# 2. BOTANICAL MINANG FLORAL CORNERS (Sirih & Pucuk Rebung)
# ─────────────────────────────────────────────────────────────────────────────
def create_minang_floral_corner_svg(is_right: bool = False) -> str:
    transform = 'transform="translate(480, 0) scale(-1, 1)"' if is_right else ''

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 600" width="480" height="600">
  <defs>
    <linearGradient id="goldPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF7" />
      <stop offset="20%" stop-color="#FFF0BA" />
      <stop offset="48%" stop-color="#FBBF24" />
      <stop offset="78%" stop-color="#DFB247" />
      <stop offset="100%" stop-color="#8F6A18" />
    </linearGradient>
    <linearGradient id="goldStemGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#6E4D09" />
      <stop offset="50%" stop-color="#DFB247" />
      <stop offset="100%" stop-color="#FFF3CE" />
    </linearGradient>
    <radialGradient id="flowerCoreGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF5D6" />
      <stop offset="60%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#8A5B0B" />
    </radialGradient>
    <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g {transform}>
    <!-- Base Kaluak Paku Spiral Vines -->
    <path d="M -10 610 C 60 560, 110 490, 130 380 C 145 300, 120 220, 70 180 C 35 150, -5 160, -2 210 C 0 240, 30 255, 55 240 C 70 230, 75 210, 65 195" fill="none" stroke="url(#goldStemGrad)" stroke-width="8" stroke-linecap="round" />
    <path d="M -10 610 C 60 560, 110 490, 130 380 C 145 300, 120 220, 70 180" fill="none" stroke="#FFF7E2" stroke-width="2.5" opacity="0.85" />

    <path d="M 85 460 C 180 430, 260 350, 290 240 C 310 160, 270 90, 200 70 C 150 55, 115 85, 125 135 C 132 170, 168 185, 195 170 C 215 155, 218 130, 205 115" fill="none" stroke="url(#goldStemGrad)" stroke-width="6" stroke-linecap="round" />

    <path d="M 40 590 C 160 580, 280 540, 370 460 C 430 400, 440 330, 400 280 C 370 245, 325 260, 320 300 C 315 330, 340 350, 365 340" fill="none" stroke="url(#goldStemGrad)" stroke-width="5" stroke-linecap="round" />

    <!-- ── 1. PUCUK REBUNG (Sprouting Bamboo Shoot of Honor) ── -->
    <g transform="translate(180, 100) rotate(16)">
      <!-- Tier 1 -->
      <polygon points="50,140 0,220 100,220" fill="url(#goldPetalGrad)" stroke="#FFF2CE" stroke-width="2.5" />
      <polygon points="50,155 18,212 82,212" fill="#240B10" stroke="#DFB247" stroke-width="1.5" />
      <circle cx="50" cy="185" r="5.5" fill="#FFEAA7" />

      <!-- Tier 2 -->
      <polygon points="50,75 10,145 90,145" fill="url(#goldPetalGrad)" stroke="#FFF2CE" stroke-width="2.5" />
      <polygon points="50,90 25,138 75,138" fill="#240B10" stroke="#DFB247" stroke-width="1.5" />
      <circle cx="50" cy="115" r="4.5" fill="#FFEAA7" />

      <!-- Tier 3 -->
      <polygon points="50,10 22,80 78,80" fill="url(#goldPetalGrad)" stroke="#FFF8E7" stroke-width="2.8" />
      <line x1="50" y1="10" x2="50" y2="78" stroke="#FFFFFF" stroke-width="2.5" />
      <circle cx="50" cy="10" r="6" fill="#FFFFFF" filter="url(#goldShine)" />
      <circle cx="50" cy="10" r="3.5" fill="#FBBF24" />
    </g>

    <!-- ── 2. DAUN SIRIH (Cordate Betel Leaves) ── -->
    <!-- Large Sirih Leaf #1 -->
    <g transform="translate(100, 310) rotate(-18)">
      <path d="M 0 0 C -45 -55, -95 -30, -90 40 C -85 110, -20 160, 0 190 C 20 160, 85 110, 90 40 C 95 -30, 45 -55, 0 0 Z" fill="url(#goldPetalGrad)" stroke="#FFF3D1" stroke-width="2.5" />
      <path d="M 0 0 L 0 185" stroke="#7A540F" stroke-width="2.5" />
      <path d="M 0 35 C -35 45, -65 75, -70 115" stroke="#8A6318" stroke-width="1.6" fill="none" />
      <path d="M 0 35 C 35 45, 65 75, 70 115" stroke="#8A6318" stroke-width="1.6" fill="none" />
      <path d="M 0 75 C -30 90, -50 120, -45 150" stroke="#8A6318" stroke-width="1.4" fill="none" />
      <path d="M 0 75 C 30 90, 50 120, 45 150" stroke="#8A6318" stroke-width="1.4" fill="none" />
    </g>

    <!-- Sirih Leaf #2 -->
    <g transform="translate(240, 420) rotate(42)">
      <path d="M 0 0 C -35 -40, -75 -20, -70 30 C -65 85, -15 125, 0 150 C 15 125, 65 85, 70 30 C 75 -20, 35 -40, 0 0 Z" fill="url(#goldPetalGrad)" stroke="#FFF3D1" stroke-width="2" />
      <path d="M 0 0 L 0 145" stroke="#7A540F" stroke-width="2" />
      <path d="M 0 25 C -25 35, -50 60, -55 90" stroke="#8A6318" stroke-width="1.3" fill="none" />
      <path d="M 0 25 C 25 35, 50 60, 55 90" stroke="#8A6318" stroke-width="1.3" fill="none" />
    </g>

    <!-- Sirih Leaf #3 -->
    <g transform="translate(45, 230) rotate(-48) scale(0.75)">
      <path d="M 0 0 C -35 -40, -75 -20, -70 30 C -65 85, -15 125, 0 150 C 15 125, 65 85, 70 30 C 75 -20, 35 -40, 0 0 Z" fill="url(#goldPetalGrad)" stroke="#FFF3D1" stroke-width="2" />
      <path d="M 0 0 L 0 145" stroke="#7A540F" stroke-width="2" />
    </g>

    <!-- ── 3. BUNGA CEMPAKA & MELATI MINANG ── -->
    <g transform="translate(130, 470)">
      {' '.join([f'''<path d="M 0 0 C -15 -35, -25 -65, 0 -85 C 25 -65, 15 -35, 0 0 Z" fill="url(#goldPetalGrad)" stroke="#FFF8E7" stroke-width="1.8" transform="rotate({i * 45})" />''' for i in range(8)])}
      <circle cx="0" cy="0" r="18" fill="url(#flowerCoreGlow)" stroke="#FFF5D6" stroke-width="2.2" />
      <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
    </g>

    <g transform="translate(290, 350) scale(0.78)">
      {' '.join([f'''<path d="M 0 0 C -15 -35, -25 -65, 0 -85 C 25 -65, 15 -35, 0 0 Z" fill="url(#goldPetalGrad)" stroke="#FFF8E7" stroke-width="1.8" transform="rotate({i * 45})" />''' for i in range(8)])}
      <circle cx="0" cy="0" r="15" fill="url(#flowerCoreGlow)" stroke="#FFF5D6" stroke-width="2" />
      <circle cx="0" cy="0" r="7" fill="#FFFFFF" />
    </g>

    <!-- ── 4. SUNTIANG PEARL DROPS ── -->
    <g id="pearl-drops">
      <path d="M 130 500 Q 150 540 160 580" stroke="#DFB247" stroke-width="1.5" stroke-dasharray="2 3" fill="none" />
      <circle cx="138" cy="520" r="3.2" fill="#FFF2CE" />
      <circle cx="148" cy="548" r="3.8" fill="#FBBF24" />
      <circle cx="160" cy="580" r="5.5" fill="#FFF8E7" stroke="#DFB247" stroke-width="1.2" />

      <path d="M 290 380 Q 320 430 330 480" stroke="#DFB247" stroke-width="1.5" stroke-dasharray="2 3" fill="none" />
      <circle cx="305" cy="405" r="3" fill="#FFF2CE" />
      <circle cx="318" cy="442" r="3.5" fill="#FBBF24" />
      <circle cx="330" cy="480" r="5" fill="#FFF8E7" stroke="#DFB247" stroke-width="1.2" />
    </g>
  </g>
</svg>'''
    return svg

# ─────────────────────────────────────────────────────────────────────────────
# 3. HIGHLAND MIST LAYER (Golden Haze)
# ─────────────────────────────────────────────────────────────────────────────
def generate_highland_mist(output_path: str):
    import numpy as np
    from PIL import Image
    w_m, h_m = 2400, 800
    x = np.linspace(0, 2 * np.pi, w_m, endpoint=False)
    y = np.linspace(0, 1, h_m)
    X, Y = np.meshgrid(x, y)

    # Multi-octave seamless rolling mountain mist (Bukit Barisan)
    m1 = np.sin(X * 1.0) * np.cos(X * 2.0 + 0.6)
    m2 = np.sin(X * 3.0 - 1.1) * np.cos(X * 1.5)
    m3 = np.sin(X * 5.0 + 0.3) * 0.5
    m4 = np.cos(X * 7.0 - 0.5) * 0.25

    # Vertical profile: gently rising highland mist with soft feathering top and bottom
    v_profile = (np.sin(Y * np.pi) ** 1.6) * (1.0 - 0.3 * Y)

    mist_intensity = np.clip(0.48 + 0.26 * m1 + 0.18 * m2 + 0.10 * m3 + 0.05 * m4, 0.0, 1.0) * v_profile

    # Minang Highland Palette: Antique Gold (#DFB247) & Warm Sunrise Ambient (#F59E0B / #D97706)
    mist_rgb = np.zeros((h_m, w_m, 3), dtype=np.uint8)
    mist_rgb[:, :, 0] = np.clip(245 * mist_intensity + 20 * Y, 0, 255).astype(np.uint8)
    mist_rgb[:, :, 1] = np.clip(195 * mist_intensity * 0.90 + 10 * Y, 0, 255).astype(np.uint8)
    mist_rgb[:, :, 2] = np.clip(100 * mist_intensity * 0.60, 0, 255).astype(np.uint8)

    # Alpha channel (transparency)
    mist_alpha = np.clip(mist_intensity * 155, 0, 255).astype(np.uint8)

    mist_rgba = np.dstack([mist_rgb, mist_alpha])
    img = Image.fromarray(mist_rgba, mode='RGBA')
    img.save(output_path, 'WEBP', quality=88, method=6)
    print(f"Highland mist generated: {output_path} ({img.size})")

def main():
    print("Rendering Minangkabau Royal Motion Art assets using Microsoft Edge...")

    # 1. Stage 2 Backdrop
    stage_svg = create_rumah_gadang_svg(is_cover=False)
    render_html_with_edge(stage_svg, os.path.join(OUTPUT_DIR, "bg-stage-minang-rumahgadang.webp"), width=1080, height=1920, quality=92)

    # 2. Cover Backdrop
    cover_svg = create_rumah_gadang_svg(is_cover=True)
    render_html_with_edge(cover_svg, os.path.join(OUTPUT_DIR, "bg-cover-minang-rumahgadang.webp"), width=1080, height=1920, quality=92)

    # 3. Minang Floral Corner Left & Right
    floral_left_svg = create_minang_floral_corner_svg(is_right=False)
    render_html_with_edge(floral_left_svg, os.path.join(OUTPUT_DIR, "minang-floral-left.webp"), width=480, height=600, quality=95)

    floral_right_svg = create_minang_floral_corner_svg(is_right=True)
    render_html_with_edge(floral_right_svg, os.path.join(OUTPUT_DIR, "minang-floral-right.webp"), width=480, height=600, quality=95)

    # 4. Highland Mist Layer (Seamless Harmonic Bukit Barisan Mountain Mist)
    generate_highland_mist(os.path.join(OUTPUT_DIR, "minang-highland-mist.webp"))

    print("All assets rendered successfully!")

if __name__ == "__main__":
    main()
