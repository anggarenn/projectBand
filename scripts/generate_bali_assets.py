import os
import subprocess
import time
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "motion-art-bali")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def render_svg_to_webp(html_content, output_webp_path, width=1080, height=1920, quality=94):
    tmp_html = os.path.join(SCRIPT_DIR, "_tmp_render.html")
    tmp_png = os.path.join(SCRIPT_DIR, "_tmp_render.png")
    
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    file_url = "file:///" + tmp_html.replace("\\", "/")
    cmd = [
        EDGE_PATH,
        "--headless=new",
        f"--window-size={width},{height}",
        f"--screenshot={tmp_png}",
        "--hide-scrollbars",
        "--default-background-color=00000000",
        "--force-device-scale-factor=1",
        file_url
    ]
    
    subprocess.run(cmd, check=True)
    time.sleep(1)
    
    if os.path.exists(tmp_png):
        im = Image.open(tmp_png)
        # Ensure exact dimensions
        im = im.crop((0, 0, width, height))
        im.save(output_webp_path, "WEBP", quality=quality, method=6)
        print(f"Successfully generated: {output_webp_path} ({im.size})")
        os.remove(tmp_png)
    if os.path.exists(tmp_html):
        os.remove(tmp_html)

# -------------------------------------------------------------
# 1. BALINESE CANDI BENTAR STAGE BACKDROP (bg-stage-bali-candibentar.webp)
# -------------------------------------------------------------
def get_stage_html():
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; background: #0F0C1B; }
</style>
</head>
<body>
<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Sky & Horizon Gradients -->
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#080512"/>
      <stop offset="35%" stop-color="#0F0C1B"/>
      <stop offset="55%" stop-color="#1A122E"/>
      <stop offset="70%" stop-color="#2D1945"/>
      <stop offset="82%" stop-color="#54234C"/>
      <stop offset="92%" stop-color="#8C443B"/>
      <stop offset="97%" stop-color="#D48B3C"/>
      <stop offset="100%" stop-color="#FDE68A"/>
    </linearGradient>

    <!-- Lake Water Gradient -->
    <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#421C38"/>
      <stop offset="15%" stop-color="#241434"/>
      <stop offset="40%" stop-color="#150D24"/>
      <stop offset="75%" stop-color="#0E0918"/>
      <stop offset="100%" stop-color="#07040D"/>
    </linearGradient>

    <!-- Royal Gold Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF2D6"/>
      <stop offset="30%" stop-color="#F5D061"/>
      <stop offset="60%" stop-color="#D4AF37"/>
      <stop offset="85%" stop-color="#9A7B2C"/>
      <stop offset="100%" stop-color="#6E5218"/>
    </linearGradient>

    <!-- Stone Relief Gradient -->
    <linearGradient id="stoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2C233E"/>
      <stop offset="50%" stop-color="#1C162A"/>
      <stop offset="100%" stop-color="#120D1D"/>
    </linearGradient>

    <linearGradient id="stoneHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.8"/>
      <stop offset="10%" stop-color="#9A7B2C" stop-opacity="0.4"/>
      <stop offset="90%" stop-color="#1C162A" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0.6"/>
    </linearGradient>

    <!-- Mountain Gradient -->
    <linearGradient id="mountAgungGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2E1C4A"/>
      <stop offset="40%" stop-color="#211438"/>
      <stop offset="80%" stop-color="#190E2C"/>
      <stop offset="100%" stop-color="#4A2542"/>
    </linearGradient>

    <!-- Meru Roof Gradient -->
    <linearGradient id="meruRoof" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A1420"/>
      <stop offset="70%" stop-color="#120E17"/>
      <stop offset="100%" stop-color="#D4AF37"/>
    </linearGradient>

    <!-- Radial Glows -->
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF2D6" stop-opacity="0.45"/>
      <stop offset="30%" stop-color="#F5D061" stop-opacity="0.25"/>
      <stop offset="60%" stop-color="#D4AF37" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0F0C1B" stop-opacity="0"/>
    </radialGradient>

    <radialGradient id="templeGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FDE68A" stop-opacity="0.6"/>
      <stop offset="40%" stop-color="#D4AF37" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </radialGradient>

    <filter id="goldDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.8"/>
    </filter>

    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <!-- Reusable Left Candi Bentar Half -->
    <g id="candiBentarHalf">
      <!-- Outer Base Plinth / Kaki Candi (y: 1200 to 1800) -->
      <polygon points="20,1800 370,1800 370,1480 320,1480 320,1360 270,1360 270,1260 220,1260 220,1180 180,1180 180,1100 140,1100 140,1020 110,1020 110,940 85,940 85,860 65,860 65,780 45,780 45,700 30,700 30,620 20,620 20,540 10,540 10,460 0,460 0,1800" fill="url(#stoneGrad)" stroke="url(#goldGrad)" stroke-width="2.5"/>

      <!-- Inner Pillar Structure (Vertical cut at x=370) -->
      <rect x="290" y="520" width="80" height="960" fill="url(#stoneGrad)" stroke="url(#goldGrad)" stroke-width="2"/>
      <line x1="370" y1="460" x2="370" y2="1800" stroke="#FFF2D6" stroke-width="3" filter="url(#goldDrop)"/>

      <!-- Stepped Terraces (Pepalih Tumpangs) with carved relief panels -->
      <!-- Tier 1 (y: 1360 - 1480) -->
      <path d="M 60,1480 L 370,1480 L 370,1380 L 100,1380 Z" fill="#1E172C" stroke="#D4AF37" stroke-width="1.5"/>
      <rect x="120" y="1395" width="230" height="70" rx="4" fill="#150F22" stroke="#9A7B2C" stroke-width="1.2"/>
      <!-- Balinese relief pattern lines in panel -->
      <path d="M 130,1430 Q 150,1410 170,1430 T 210,1430 T 250,1430 T 290,1430 T 330,1430" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.85"/>
      <circle cx="170" cy="1430" r="5" fill="#FDE68A"/>
      <circle cx="210" cy="1430" r="5" fill="#FDE68A"/>
      <circle cx="250" cy="1430" r="5" fill="#FDE68A"/>
      <circle cx="290" cy="1430" r="5" fill="#FDE68A"/>

      <!-- Tier 2 (y: 1240 - 1360) -->
      <path d="M 90,1360 L 370,1360 L 370,1260 L 130,1260 Z" fill="#241B34" stroke="#D4AF37" stroke-width="1.5"/>
      <rect x="150" y="1275" width="200" height="70" rx="4" fill="#181126" stroke="#9A7B2C" stroke-width="1.2"/>
      <path d="M 160,1310 Q 185,1290 210,1310 T 260,1310 T 310,1310" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.85"/>
      <circle cx="210" cy="1310" r="5" fill="#FDE68A"/>
      <circle cx="260" cy="1310" r="5" fill="#FDE68A"/>
      <circle cx="310" cy="1310" r="5" fill="#FDE68A"/>

      <!-- Tier 3 (y: 1120 - 1240) -->
      <path d="M 120,1240 L 370,1240 L 370,1140 L 160,1140 Z" fill="#201730" stroke="#D4AF37" stroke-width="1.5"/>
      <rect x="180" y="1155" width="170" height="70" rx="4" fill="#150E22" stroke="#9A7B2C" stroke-width="1.2"/>
      <path d="M 190,1190 Q 220,1170 250,1190 T 310,1190" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.85"/>
      <circle cx="250" cy="1190" r="5" fill="#FDE68A"/>
      <circle cx="310" cy="1190" r="5" fill="#FDE68A"/>

      <!-- Tier 4 (y: 1000 - 1120) -->
      <path d="M 150,1120 L 370,1120 L 370,1020 L 190,1020 Z" fill="#251B36" stroke="#D4AF37" stroke-width="1.5"/>
      <rect x="210" y="1035" width="140" height="70" rx="4" fill="#181126" stroke="#9A7B2C" stroke-width="1.2"/>
      <circle cx="280" cy="1070" r="8" fill="#FDE68A" stroke="#9A7B2C"/>

      <!-- Tier 5 (y: 880 - 1000) -->
      <path d="M 180,1000 L 370,1000 L 370,900 L 220,900 Z" fill="#2A1E3C" stroke="#D4AF37" stroke-width="1.5"/>
      <rect x="240" y="915" width="110" height="70" rx="4" fill="#1C142E" stroke="#9A7B2C" stroke-width="1.2"/>
      <circle cx="295" cy="950" r="6" fill="#FDE68A"/>

      <!-- Upper Spire Tiers (Tumpang 6 to 9, y: 520 to 880) -->
      <path d="M 210,880 L 370,880 L 370,780 L 250,780 Z" fill="#2F2144" stroke="#D4AF37" stroke-width="1.5"/>
      <path d="M 240,780 L 370,780 L 370,680 L 280,680 Z" fill="#35254D" stroke="#D4AF37" stroke-width="1.5"/>
      <path d="M 270,680 L 370,680 L 370,580 L 310,580 Z" fill="#3B2A57" stroke="#D4AF37" stroke-width="1.5"/>
      <path d="M 300,580 L 370,580 L 370,500 L 330,500 Z" fill="#422F61" stroke="#D4AF37" stroke-width="1.5"/>

      <!-- Murda Pinnacle Finial (Peak Spire, y: 440 to 500) -->
      <path d="M 330,500 C 330,470 345,450 355,440 L 370,440 L 370,500 Z" fill="url(#goldGrad)" stroke="#FFF2D6" stroke-width="2"/>
      <polygon points="360,440 370,410 370,440" fill="#FFF2D6"/>

      <!-- Outward Wing Antefixes (Kemuncak / Patra Punggel corbels) -->
      <!-- Antefix on each step curving outward -->
      <path d="M 60,1480 C 30,1470 20,1450 10,1430 C 35,1435 55,1450 80,1480 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>
      <path d="M 90,1360 C 60,1350 50,1330 40,1310 C 65,1315 85,1330 110,1360 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>
      <path d="M 120,1240 C 90,1230 80,1210 70,1190 C 95,1195 115,1210 140,1240 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>
      <path d="M 150,1120 C 120,1110 110,1090 100,1070 C 125,1075 145,1090 170,1120 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>
      <path d="M 180,1000 C 150,990 140,970 130,950 C 155,955 175,970 200,1000 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>
      <path d="M 210,880 C 180,870 170,850 160,830 C 185,835 205,850 230,880 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>
      <path d="M 240,780 C 210,770 200,750 190,730 C 215,735 235,750 260,780 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>
      <path d="M 270,680 C 240,670 230,650 220,630 C 245,635 265,650 290,680 Z" fill="url(#goldGrad)" stroke="#8C6B1C" stroke-width="1.2"/>

      <!-- Sacred Royal Yellow Tedung (Balinese Ceremonial Parasol on Left Gate) -->
      <g transform="translate(180, 820)">
        <!-- Pole -->
        <line x1="0" y1="0" x2="-20" y2="450" stroke="#7A5216" stroke-width="5"/>
        <!-- Parasol Tier 1 -->
        <path d="M -70,-30 Q -20,-70 30,-30 L 15,-10 L -55,-10 Z" fill="url(#goldGrad)" stroke="#9A7B2C" stroke-width="2"/>
        <!-- Hanging tassels -->
        <line x1="-60" y1="-10" x2="-60" y2="15" stroke="#FDE68A" stroke-width="2.5"/>
        <line x1="-35" y1="-10" x2="-35" y2="18" stroke="#FDE68A" stroke-width="2.5"/>
        <line x1="-10" y1="-10" x2="-10" y2="20" stroke="#FDE68A" stroke-width="2.5"/>
        <line x1="15" y1="-10" x2="15" y2="15" stroke="#FDE68A" stroke-width="2.5"/>
        <!-- Parasol Finial Crown -->
        <polygon points="-20,-70 -16,-95 -24,-95" fill="#FFF2D6"/>
      </g>
    </g>

    <!-- Star definition -->
    <g id="star">
      <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" opacity="0.9"/>
      <line x1="-4" y1="0" x2="4" y2="0" stroke="#FFF2D6" stroke-width="0.8" opacity="0.7"/>
      <line x1="0" y1="-4" x2="0" y2="4" stroke="#FFF2D6" stroke-width="0.8" opacity="0.7"/>
    </g>
  </defs>

  <!-- ── 1. SKY & CELESTIAL BACKGROUND ── -->
  <rect x="0" y="0" width="1080" height="1200" fill="url(#skyGrad)"/>

  <!-- Stars in High Twilight Sky -->
  <use href="#star" x="140" y="120"/>
  <use href="#star" x="280" y="80"/>
  <use href="#star" x="420" y="160"/>
  <use href="#star" x="540" y="90"/>
  <use href="#star" x="670" y="140"/>
  <use href="#star" x="820" y="70"/>
  <use href="#star" x="950" y="130"/>
  <use href="#star" x="200" y="240"/>
  <use href="#star" x="350" y="290"/>
  <use href="#star" x="730" y="260"/>
  <use href="#star" x="880" y="220"/>
  <use href="#star" x="510" y="310"/>

  <!-- Sacred Twilight Solar/Lunar Corona Glow behind Mount Agung -->
  <circle cx="540" cy="780" r="380" fill="url(#sunGlow)"/>

  <!-- ── 2. SACRED BALI MOUNTAINS (Gunung Agung & Gunung Batur) ── -->
  <!-- Distant Mount Batur Ridge -->
  <path d="M 0,920 Q 240,780 440,720 Q 640,760 1080,940 L 1080,1180 L 0,1180 Z" fill="#1B112D" opacity="0.7"/>
  
  <!-- Majestic Mount Agung Pyramid Silhouette -->
  <!-- Peak at x=540, y=560, cascading gracefully down both flanks -->
  <path d="M 120,1080 L 380,820 L 490,660 L 530,590 L 540,580 L 550,590 L 590,660 L 700,820 L 960,1080 Z" fill="url(#mountAgungGrad)" stroke="#4A2542" stroke-width="2"/>
  
  <!-- Volcanic Ridge Highlights (Soft Golden Twilight Glint) -->
  <path d="M 540,580 L 525,680 L 480,800 L 410,950 L 340,1080" fill="none" stroke="#D4AF37" stroke-width="1.8" opacity="0.35"/>
  <path d="M 540,580 L 560,700 L 610,830 L 690,970 L 760,1080" fill="none" stroke="#FDE68A" stroke-width="1.2" opacity="0.25"/>

  <!-- Atmospheric Mountain Haze / Low Horizon Mist -->
  <rect x="0" y="980" width="1080" height="180" fill="url(#sunGlow)" opacity="0.45"/>

  <!-- ── 3. SACRED LAKE BERATAN / WATER MIRROR ── -->
  <rect x="0" y="1120" width="1080" height="800" fill="url(#lakeGrad)"/>

  <!-- Mountain & Sunset Reflection in Water -->
  <ellipse cx="540" cy="1220" rx="320" ry="80" fill="#6A2E4B" opacity="0.35" filter="url(#softGlow)"/>
  <ellipse cx="540" cy="1290" rx="220" ry="40" fill="#D4AF37" opacity="0.18" filter="url(#softGlow)"/>

  <!-- Water Ripples (Golden Filigree Accents) -->
  <g stroke="#FDE68A" stroke-width="1" opacity="0.35" stroke-linecap="round">
    <line x1="420" y1="1160" x2="660" y2="1160"/>
    <line x1="360" y1="1185" x2="720" y2="1185"/>
    <line x1="440" y1="1215" x2="640" y2="1215"/>
    <line x1="400" y1="1250" x2="680" y2="1250"/>
    <line x1="470" y1="1290" x2="610" y2="1290"/>
    <line x1="390" y1="1340" x2="690" y2="1340"/>
    <line x1="430" y1="1400" x2="650" y2="1400"/>
    <line x1="480" y1="1480" x2="600" y2="1480"/>
  </g>

  <!-- ── 4. FLOATING WATER TEMPLE (Pura Ulun Danu Meru Pagoda - 7 Tiers) ── -->
  <!-- Positioned in center-right lake opening (x: 580 to 700, y: 880 to 1180) -->
  <g id="meruTemple" transform="translate(610, 860)">
    <!-- Temple Stone Base in Water -->
    <polygon points="-50,280 50,280 40,260 -40,260" fill="#1C1428" stroke="#D4AF37" stroke-width="1.5"/>
    <!-- Water ripples around base -->
    <ellipse cx="0" cy="285" rx="70" ry="10" fill="none" stroke="#FDE68A" stroke-width="1" opacity="0.5"/>
    
    <!-- Wooden Pavilion Pillars -->
    <line x1="-30" y1="260" x2="-30" y2="230" stroke="#9A7B2C" stroke-width="3"/>
    <line x1="0" y1="260" x2="0" y2="230" stroke="#9A7B2C" stroke-width="3"/>
    <line x1="30" y1="260" x2="30" y2="230" stroke="#9A7B2C" stroke-width="3"/>
    <!-- Golden Temple Lantern glow inside pavilion -->
    <circle cx="0" cy="245" r="14" fill="url(#templeGlow)"/>
    <circle cx="0" cy="245" r="4" fill="#FFF2D6"/>

    <!-- 7 Stepped Thatched Roofs (Ijuk) -->
    <!-- Tier 1 -->
    <path d="M -60,230 Q 0,215 60,230 L 45,210 Q 0,200 -45,210 Z" fill="url(#meruRoof)" stroke="#D4AF37" stroke-width="1"/>
    <!-- Tier 2 -->
    <path d="M -50,210 Q 0,198 50,210 L 38,190 Q 0,180 -38,190 Z" fill="url(#meruRoof)" stroke="#D4AF37" stroke-width="1"/>
    <!-- Tier 3 -->
    <path d="M -42,190 Q 0,180 42,190 L 32,170 Q 0,162 -32,170 Z" fill="url(#meruRoof)" stroke="#D4AF37" stroke-width="1"/>
    <!-- Tier 4 -->
    <path d="M -35,170 Q 0,162 35,170 L 26,152 Q 0,145 -26,152 Z" fill="url(#meruRoof)" stroke="#D4AF37" stroke-width="1"/>
    <!-- Tier 5 -->
    <path d="M -28,152 Q 0,145 28,152 L 20,135 Q 0,128 -20,135 Z" fill="url(#meruRoof)" stroke="#D4AF37" stroke-width="1"/>
    <!-- Tier 6 -->
    <path d="M -22,135 Q 0,128 22,135 L 15,120 Q 0,114 -15,120 Z" fill="url(#meruRoof)" stroke="#D4AF37" stroke-width="1"/>
    <!-- Tier 7 -->
    <path d="M -16,120 Q 0,114 16,120 L 10,105 Q 0,100 -10,105 Z" fill="url(#meruRoof)" stroke="#D4AF37" stroke-width="1"/>
    <!-- Meru Spire / Murda -->
    <polygon points="0,85 4,105 -4,105" fill="#FFF2D6" stroke="#D4AF37" stroke-width="1"/>
  </g>

  <!-- ── 5. SACRED PENJOR (Balinese Curved Ceremonial Bamboo Pole) ── -->
  <!-- Elegant bamboo curve towering on left side in distance -->
  <g opacity="0.75">
    <path d="M 280,1150 Q 270,850 310,650 Q 330,520 370,480 Q 400,470 410,500" fill="none" stroke="#D4AF37" stroke-width="3"/>
    <!-- Hanging Penjor Sampi / Lamak Offering -->
    <line x1="410" y1="500" x2="410" y2="580" stroke="#FDE68A" stroke-width="2"/>
    <polygon points="405,580 415,580 410,610" fill="#D4AF37"/>
  </g>

  <!-- ── 6. MAJESTIC BALINESE CANDI BENTAR SPLIT GATE (Stage Flanks) ── -->
  <!-- LEFT WING of Candi Bentar (x=0 to 370) -->
  <use href="#candiBentarHalf" x="0" y="0"/>

  <!-- RIGHT WING of Candi Bentar (Mirrored, x=710 to 1080) -->
  <use href="#candiBentarHalf" transform="translate(1080, 0) scale(-1, 1)"/>

  <!-- ── 7. FOREGROUND TEMPLE PLINTH & STONE STEPS ── -->
  <!-- Balinese Temple Terrace in Lower Foreground (y: 1720 to 1920) -->
  <polygon points="0,1920 1080,1920 1080,1750 710,1750 670,1790 410,1790 370,1750 0,1750" fill="#130D1F" stroke="#D4AF37" stroke-width="2.5"/>
  <!-- Terrace steps leading down into sacred waters -->
  <rect x="420" y="1790" width="240" height="25" fill="#181126" stroke="#9A7B2C" stroke-width="1.5"/>
  <rect x="440" y="1815" width="200" height="25" fill="#1D142E" stroke="#9A7B2C" stroke-width="1.5"/>
  <rect x="460" y="1840" width="160" height="25" fill="#221736" stroke="#9A7B2C" stroke-width="1.5"/>
  <rect x="480" y="1865" width="120" height="25" fill="#281B3E" stroke="#9A7B2C" stroke-width="1.5"/>

  <!-- Golden Temple Guardians / Blencong Oil Lanterns on Base Corners -->
  <g transform="translate(370, 1720)">
    <rect x="-18" y="-45" width="36" height="45" rx="4" fill="#221736" stroke="#D4AF37" stroke-width="2"/>
    <circle cx="0" cy="-60" r="28" fill="url(#templeGlow)"/>
    <ellipse cx="0" cy="-55" rx="8" ry="12" fill="#FFF2D6"/>
    <polygon points="0,-75 6,-55 -6,-55" fill="#FDE68A"/>
  </g>
  <g transform="translate(710, 1720)">
    <rect x="-18" y="-45" width="36" height="45" rx="4" fill="#221736" stroke="#D4AF37" stroke-width="2"/>
    <circle cx="0" cy="-60" r="28" fill="url(#templeGlow)"/>
    <ellipse cx="0" cy="-55" rx="8" ry="12" fill="#FFF2D6"/>
    <polygon points="0,-75 6,-55 -6,-55" fill="#FDE68A"/>
  </g>

  <!-- Subtle Vignette / Edge Shadow -->
  <rect x="0" y="0" width="1080" height="1920" fill="none" stroke="#080511" stroke-width="20" opacity="0.6"/>
</svg>
</body>
</html>"""

# -------------------------------------------------------------
# 2. BALINESE CANDI BENTAR COVER BACKDROP (bg-cover-bali-candibentar.webp)
# -------------------------------------------------------------
def get_cover_html():
    # Matching majestic backdrop with richer twilight sunset contrast and deeper ceremonial glow
    stage_html = get_stage_html()
    # Add subtle celebratory gold flecks / warm ambiance overlay
    cover_html = stage_html.replace(
        '</svg>',
        '''
        <!-- Celestial Golden Sparkles for Cover Screen -->
        <g fill="#FFF2D6" opacity="0.65" filter="url(#goldDrop)">
          <circle cx="250" cy="400" r="2.5"/>
          <circle cx="830" cy="420" r="2.5"/>
          <circle cx="340" cy="620" r="2"/>
          <circle cx="740" cy="640" r="2"/>
          <circle cx="490" cy="480" r="3"/>
          <circle cx="590" cy="490" r="3"/>
          <circle cx="540" cy="430" r="3.5"/>
          <circle cx="480" cy="980" r="2"/>
          <circle cx="600" cy="990" r="2"/>
          <circle cx="520" cy="1120" r="2.5"/>
          <circle cx="560" cy="1130" r="2.5"/>
        </g>
        <!-- Warm Sunset Aura -->
        <circle cx="540" cy="720" r="480" fill="url(#sunGlow)" opacity="0.6"/>
        </svg>
        '''
    )
    return cover_html

# -------------------------------------------------------------
# 3. BALINESE FRANGIPANI / BUNGA KAMBOJA CORNER BLOOMS
# (bali-floral-left.webp & bali-floral-right.webp)
# -------------------------------------------------------------
def get_frangipani_floral_html():
    return """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 700px; height: 700px; overflow: hidden; background: transparent; }
</style>
</head>
<body>
<svg width="700" height="700" viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Petal Ivory-to-White Gradient -->
    <linearGradient id="petalIvory" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#FCE588"/>
      <stop offset="25%" stop-color="#FFFDF7"/>
      <stop offset="70%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F7EFE4"/>
    </linearGradient>

    <!-- Deep Golden Throat Gradient -->
    <radialGradient id="kambojaCenter" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#E27D16"/>
      <stop offset="28%" stop-color="#F59E0B"/>
      <stop offset="65%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>

    <!-- Tropical Leaf Gradient -->
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2D5A38"/>
      <stop offset="45%" stop-color="#1B3D23"/>
      <stop offset="85%" stop-color="#0E2414"/>
      <stop offset="100%" stop-color="#07130A"/>
    </linearGradient>

    <!-- Leaf Vein Gold Gradient -->
    <linearGradient id="leafVein" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="50%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#8C6B1C"/>
    </linearGradient>

    <!-- Gold Ornament Trim -->
    <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5DC"/>
      <stop offset="40%" stop-color="#F6D365"/>
      <stop offset="75%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#9A7B2C"/>
    </linearGradient>

    <filter id="bloomDrop" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="8" stdDeviation="12" flood-color="#0A0614" flood-opacity="0.85"/>
    </filter>

    <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="5" stdDeviation="6" flood-color="#05030A" flood-opacity="0.9"/>
    </filter>

    <!-- Single Frangipani / Bunga Kamboja Petal -->
    <path id="frangipaniPetal" d="M 0,0 C 25,-45 75,-95 70,-150 C 65,-185 30,-210 0,-215 C -30,-210 -65,-185 -70,-150 C -75,-95 -25,-45 0,0 Z" fill="url(#petalIvory)" stroke="#F0E3D0" stroke-width="1.2"/>

    <!-- Complete 5-Petal Balinese Frangipani Blossom -->
    <g id="frangipaniBlossom" filter="url(#bloomDrop)">
      <!-- Petal 1 (0 deg) -->
      <g transform="rotate(0)">
        <use href="#frangipaniPetal"/>
      </g>
      <!-- Petal 2 (72 deg) -->
      <g transform="rotate(72)">
        <use href="#frangipaniPetal"/>
      </g>
      <!-- Petal 3 (144 deg) -->
      <g transform="rotate(144)">
        <use href="#frangipaniPetal"/>
      </g>
      <!-- Petal 4 (216 deg) -->
      <g transform="rotate(216)">
        <use href="#frangipaniPetal"/>
      </g>
      <!-- Petal 5 (288 deg) -->
      <g transform="rotate(288)">
        <use href="#frangipaniPetal"/>
      </g>
      <!-- Saffron-Gold Radiant Throat -->
      <circle cx="0" cy="0" r="65" fill="url(#kambojaCenter)"/>
      <circle cx="0" cy="0" r="16" fill="#D97706"/>
      <circle cx="0" cy="0" r="6" fill="#78350F"/>
    </g>

    <!-- Tropical Plumeria Leaf with Gold Veins -->
    <g id="plumeriaLeaf" filter="url(#leafShadow)">
      <!-- Leaf Blade -->
      <path d="M 0,0 C 45,-80 85,-180 75,-280 C 65,-340 0,-390 0,-400 C 0,-390 -65,-340 -75,-280 C -85,-180 -45,-80 0,0 Z" fill="url(#leafGrad)" stroke="url(#goldFiligree)" stroke-width="2"/>
      <!-- Main Central Gold Vein -->
      <line x1="0" y1="0" x2="0" y2="-390" stroke="url(#leafVein)" stroke-width="3" stroke-linecap="round"/>
      <!-- Secondary Lateral Veins -->
      <g stroke="url(#leafVein)" stroke-width="1.5" opacity="0.85">
        <line x1="0" y1="-80" x2="38" y2="-120"/>
        <line x1="0" y1="-80" x2="-38" y2="-120"/>
        <line x1="0" y1="-140" x2="52" y2="-190"/>
        <line x1="0" y1="-140" x2="-52" y2="-190"/>
        <line x1="0" y1="-200" x2="58" y2="-255"/>
        <line x1="0" y1="-200" x2="-58" y2="-255"/>
        <line x1="0" y1="-260" x2="52" y2="-315"/>
        <line x1="0" y1="-260" x2="-52" y2="-315"/>
        <line x1="0" y1="-320" x2="35" y2="-365"/>
        <line x1="0" y1="-320" x2="-35" y2="-365"/>
      </g>
    </g>

    <!-- Balinese Patra Punggel Gold Floral Flourish -->
    <g id="patraSprout">
      <path d="M 0,0 C 40,-40 80,-30 90,-70 C 95,-90 85,-110 65,-110 C 40,-110 30,-80 50,-65 C 65,-55 80,-70 70,-85" fill="none" stroke="url(#goldFiligree)" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="70" cy="-85" r="4" fill="#FDE68A"/>
    </g>
  </defs>

  <!-- ── CORNER FLORAL CLUSTER (Bottom-Left Origin) ── -->
  <g transform="translate(140, 560)">
    <!-- 1. Background Leaves Fan Outward -->
    <!-- Far Left Leaf -->
    <g transform="rotate(-65) scale(0.95)">
      <use href="#plumeriaLeaf"/>
    </g>
    <!-- Upward Slanted Leaf -->
    <g transform="rotate(-30) scale(1.15)">
      <use href="#plumeriaLeaf"/>
    </g>
    <!-- Center Upward Leaf -->
    <g transform="rotate(5) scale(1.05)">
      <use href="#plumeriaLeaf"/>
    </g>
    <!-- Right Slanted Leaf -->
    <g transform="rotate(40) scale(1.1)">
      <use href="#plumeriaLeaf"/>
    </g>
    <!-- Far Right Leaf -->
    <g transform="rotate(75) scale(0.9)">
      <use href="#plumeriaLeaf"/>
    </g>

    <!-- 2. Balinese Patra Gold Flourish Accents -->
    <g transform="translate(-40, -180) rotate(-45) scale(1.2)">
      <use href="#patraSprout"/>
    </g>
    <g transform="translate(120, -160) rotate(35) scale(1.1)">
      <use href="#patraSprout"/>
    </g>

    <!-- 3. Frangipani Buds -->
    <!-- Small Bud Left -->
    <g transform="translate(-110, -220) rotate(-35) scale(0.35)">
      <use href="#frangipaniBlossom"/>
    </g>
    <!-- Small Bud Right -->
    <g transform="translate(180, -200) rotate(45) scale(0.38)">
      <use href="#frangipaniBlossom"/>
    </g>

    <!-- 4. Medium Blooming Flowers -->
    <!-- Upper Flower (scale 0.58) -->
    <g transform="translate(30, -260) rotate(15) scale(0.58)">
      <use href="#frangipaniBlossom"/>
    </g>
    <!-- Left Flank Flower (scale 0.65) -->
    <g transform="translate(-80, -110) rotate(-22) scale(0.65)">
      <use href="#frangipaniBlossom"/>
    </g>
    <!-- Right Flank Flower (scale 0.72) -->
    <g transform="translate(140, -90) rotate(28) scale(0.72)">
      <use href="#frangipaniBlossom"/>
    </g>

    <!-- 5. Grand Foreground Frangipani Blossom (Queen Flower - scale 0.95) -->
    <g transform="translate(20, -60) rotate(4) scale(0.95)">
      <use href="#frangipaniBlossom"/>
    </g>

    <!-- 6. Foreground Corner Bud (scale 0.45) -->
    <g transform="translate(-50, 40) rotate(-15) scale(0.45)">
      <use href="#frangipaniBlossom"/>
    </g>
  </g>
</svg>
</body>
</html>"""

def generate_all():
    print("=== Generating Bali Royal Motion Art Assets ===")
    
    # 1. Stage Backdrop
    stage_path = os.path.join(OUTPUT_DIR, "bg-stage-bali-candibentar.webp")
    render_svg_to_webp(get_stage_html(), stage_path, width=1080, height=1920, quality=94)
    
    # 2. Cover Backdrop
    cover_path = os.path.join(OUTPUT_DIR, "bg-cover-bali-candibentar.webp")
    render_svg_to_webp(get_cover_html(), cover_path, width=1080, height=1920, quality=94)
    
    # 3. Frangipani Floral Left
    floral_left_path = os.path.join(OUTPUT_DIR, "bali-floral-left.webp")
    render_svg_to_webp(get_frangipani_floral_html(), floral_left_path, width=700, height=700, quality=95)
    
    # 4. Frangipani Floral Right (Mirrored horizontally)
    floral_right_path = os.path.join(OUTPUT_DIR, "bali-floral-right.webp")
    if os.path.exists(floral_left_path):
        im_l = Image.open(floral_left_path)
        im_r = im_l.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
        im_r.save(floral_right_path, "WEBP", quality=95)
        print(f"Successfully generated: {floral_right_path} ({im_r.size})")

    # 5. Temple Mist Layer for BaliStageBackdrop (Horizontal seamless wrap)
    mist_path = os.path.join(OUTPUT_DIR, "bali-temple-mist.webp")
    # Also check if existing parahyangan mist exists to create a custom golden twilight mist
    import numpy as np
    w_m, h_m = 2400, 800
    x = np.linspace(0, 2 * np.pi, w_m, endpoint=False)
    y = np.linspace(0, 1, h_m)
    X, Y = np.meshgrid(x, y)
    
    # Seamless sinusoidal harmonic mist
    m1 = np.sin(X * 2.0) * np.cos(X * 3.0 + 0.4)
    m2 = np.sin(X * 4.0 - 0.8) * np.sin(X * 1.0)
    m3 = np.cos(X * 6.0)
    
    v_profile = np.sin(Y * np.pi) ** 1.8
    mist_intensity = np.clip((0.5 + 0.28 * m1 + 0.16 * m2 + 0.08 * m3), 0.0, 1.0) * v_profile
    
    # Bali Royal Palette: Warm twilight gold / violet mist (#D4AF37 & #8C443B)
    mist_rgb = np.zeros((h_m, w_m, 3), dtype=np.uint8)
    mist_rgb[:, :, 0] = (212 * mist_intensity).astype(np.uint8)
    mist_rgb[:, :, 1] = (175 * mist_intensity * 0.85).astype(np.uint8)
    mist_rgb[:, :, 2] = (100 * mist_intensity * 0.65).astype(np.uint8)
    mist_alpha = (mist_intensity * 140).astype(np.uint8)
    
    mist_rgba = np.dstack([mist_rgb, mist_alpha])
    mist_img = Image.fromarray(mist_rgba)
    mist_img.save(mist_path, "WEBP", quality=90)
    print(f"Successfully generated: {mist_path} ({mist_img.size})")

    print("=== All Bali Assets Generated Successfully! ===")

if __name__ == "__main__":
    generate_all()
