"""
Emerald Velvet Noir Asset Generator
RND Asset Specialist: Mas Amba
Theme: emerald-velvet-noir (Deep Pine Noir #061A14 / #0D2A20 + Imperial Gold #D4AF37)
Outputs:
- public/assets/emerald-noir/bg-cover.webp (1080x1920)
- public/assets/emerald-noir/bg-stage.webp (1080x1920)
- public/assets/emerald-noir/botanical-gold-leaf.webp & .svg
- public/assets/emerald-noir/wax-seal-emerald.webp & .svg
"""

import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "emerald-noir")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def render_html_via_edge(html_content, output_png_path, width=1080, height=1920):
    """Renders HTML via Headless Edge for ultra-crisp SVG / CSS filters and gradients."""
    temp_html = os.path.join(OUTPUT_DIR, "_temp_render.html")
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    cmd = [
        EDGE_PATH,
        "--headless=new",
        f"--window-size={width},{height}",
        f"--screenshot={output_png_path}",
        "--hide-scrollbars",
        "--default-background-color=00000000",
        temp_html
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if os.path.exists(temp_html):
        os.remove(temp_html)

# ── 1. GENERATE BG-COVER.WEBP (1080x1920) ───────────────────────────────────
def generate_bg_cover():
    print("Generating bg-cover.webp...")
    w, h = 1080, 1920
    
    y_coords = np.linspace(0, 1, h)[:, None]
    x_coords = np.linspace(0, 1, w)[None, :]
    
    # Base deep pine noir gradient: #04130E to #0C2E22
    grad_base = np.sin(y_coords * np.pi * 0.85 + 0.15)
    r = np.repeat((5 + grad_base * 9).astype(np.float32), w, axis=1)
    g = np.repeat((20 + grad_base * 32).astype(np.float32), w, axis=1)
    b = np.repeat((15 + grad_base * 24).astype(np.float32), w, axis=1)
    
    # Elegant cascading velvet drapery folds
    fold_wave1 = np.sin(x_coords * 9.0 + y_coords * 3.0) * 0.5 + 0.5
    fold_wave2 = np.cos(x_coords * 15.0 - y_coords * 4.0) * 0.5 + 0.5
    velvet_sheen = (fold_wave1 * 0.6 + fold_wave2 * 0.4) ** 2.0
    
    r += velvet_sheen * 14.0
    g += velvet_sheen * 36.0
    b += velvet_sheen * 26.0
    
    # Radial ambient spotlight in center (monogram & card focus area)
    dist_sq = ((x_coords - 0.5) ** 2 * 1.6 + (y_coords - 0.42) ** 2) / (0.50 ** 2)
    spotlight = np.clip(1.0 - dist_sq, 0.0, 1.0) ** 1.6
    r += spotlight * 22.0
    g += spotlight * 55.0
    b += spotlight * 38.0
    
    # Micro velvet weave texture (interlaced diagonal weave pattern)
    weave = (np.sin((x_coords * w + y_coords * h) * 0.75) * np.cos((x_coords * w - y_coords * h) * 0.75)) * 3.5
    r += weave
    g += weave * 1.5
    b += weave * 1.2
    
    # Velvet pile noise
    np.random.seed(42)
    noise = np.random.normal(0.0, 3.2, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise, 0, 255).astype(np.uint8)
    b = np.clip(b + noise, 0, 255).astype(np.uint8)
    
    img = Image.fromarray(np.dstack([r, g, b]), mode="RGB")
    
    # Overlay Golden Stardust & Bokeh Orbs (Multi-layer depth)
    draw = ImageDraw.Draw(img)
    np.random.seed(1337)
    
    # Ambient faint large bokeh
    for _ in range(45):
        px = np.random.randint(60, w - 60)
        py = np.random.randint(100, h - 120)
        radius = np.random.uniform(12.0, 36.0)
        draw.ellipse([px - radius, py - radius, px + radius, py + radius], fill=(240, 215, 120))
        
    img = Image.blend(img, img.filter(ImageFilter.GaussianBlur(radius=18.0)), 0.08)
    draw = ImageDraw.Draw(img)
    
    # Sharp sparkling micro-particles
    for _ in range(320):
        px = np.random.randint(30, w - 30)
        py = np.random.randint(50, h - 60)
        p_radius = np.random.uniform(1.2, 4.2)
        
        # Golden tint palette: #FFF8E0, #F2D888, #D4AF37, #AA7A1E
        gold_palette = [
            (255, 248, 224),
            (242, 216, 136),
            (212, 175, 55),
            (248, 235, 185)
        ]
        color = gold_palette[np.random.randint(0, len(gold_palette))]
        bbox = [px - p_radius, py - p_radius, px + p_radius, py + p_radius]
        draw.ellipse(bbox, fill=color)
        
    # Soft particle bloom
    glow_layer = img.filter(ImageFilter.GaussianBlur(radius=2.5))
    img = Image.blend(img, glow_layer, 0.28)
    
    out_path = os.path.join(OUTPUT_DIR, "bg-cover.webp")
    img.save(out_path, "WEBP", quality=90, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

# ── 2. GENERATE BG-STAGE.WEBP (1080x1920) ───────────────────────────────────
def generate_bg_stage():
    print("Generating bg-stage.webp...")
    w, h = 1080, 1920
    
    y_coords = np.linspace(0, 1, h)[:, None]
    x_coords = np.linspace(0, 1, w)[None, :]
    
    # Deep Ballroom Noir Backdrop with royal emerald curtains and warm amber core
    # Base: #051610 -> #0F3827 -> #061A12
    grad_y = np.sin(y_coords * np.pi * 0.9 + 0.1)
    r = np.repeat((6 + grad_y * 12).astype(np.float32), w, axis=1)
    g = np.repeat((22 + grad_y * 42).astype(np.float32), w, axis=1)
    b = np.repeat((16 + grad_y * 30).astype(np.float32), w, axis=1)
    
    # Symmetrical Ballroom Velvet Drapery Flanks
    dist_from_center = np.abs(x_coords - 0.5) * 2.0 # 0 at center, 1 at edge
    curtain_folds = (np.sin(dist_from_center * 14.0 + y_coords * 1.8) * 0.5 + 0.5) ** 1.8
    curtain_flank_mask = np.clip((dist_from_center - 0.28) / 0.72, 0.0, 1.0) ** 1.4
    
    fold_accent = curtain_folds * curtain_flank_mask
    r += fold_accent * 18.0
    g += fold_accent * 52.0
    b += fold_accent * 36.0
    
    # Royal Arch Proscenium at Top (framing ceiling)
    top_arch = np.clip(1.0 - (y_coords / 0.25) - ((x_coords - 0.5) ** 2 * 1.8), 0.0, 1.0) ** 1.6
    r += top_arch * 12.0
    g += top_arch * 35.0
    b += top_arch * 25.0
    
    # Theatrical Stage Spotlight (ambient warm gold/emerald halo behind the wedding cards)
    spot_dist = ((x_coords - 0.5) ** 2 * 2.2 + (y_coords - 0.44) ** 2 * 1.1) / (0.46 ** 2)
    stage_spotlight = np.clip(1.0 - spot_dist, 0.0, 1.0) ** 1.8
    r += stage_spotlight * 32.0 # Subtle warm golden tint in center
    g += stage_spotlight * 68.0 # Rich emerald
    b += stage_spotlight * 45.0
    
    # Ground Ballroom Parquet / Velvet stage base
    floor_mask = np.clip((y_coords - 0.80) / 0.20, 0.0, 1.0) ** 1.7
    r += floor_mask * 20.0
    g += floor_mask * 18.0
    b += floor_mask * 12.0
    
    # Micro velvet texture weave
    weave = (np.sin((x_coords * w + y_coords * h) * 0.75) * np.cos((x_coords * w - y_coords * h) * 0.75)) * 3.0
    r += weave
    g += weave * 1.4
    b += weave * 1.1
    
    np.random.seed(99)
    noise = np.random.normal(0.0, 2.8, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise, 0, 255).astype(np.uint8)
    b = np.clip(b + noise, 0, 255).astype(np.uint8)
    
    img = Image.fromarray(np.dstack([r, g, b]), mode="RGB")
    
    # Soft ambient blur to harmonize stage backdrop
    subtle_smooth = img.filter(ImageFilter.GaussianBlur(radius=1.2))
    img = Image.blend(img, subtle_smooth, 0.22)
    
    out_path = os.path.join(OUTPUT_DIR, "bg-stage.webp")
    img.save(out_path, "WEBP", quality=90, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

# ── 3. GENERATE BOTANICAL-GOLD-LEAF (SVG & WEBP) ─────────────────────────────
def generate_botanical_leaf():
    print("Generating botanical-gold-leaf (SVG & WebP)...")
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="800" height="1200">
  <defs>
    <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5D6" />
      <stop offset="25%" stop-color="#E7C875" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="75%" stop-color="#AA7A1E" />
      <stop offset="100%" stop-color="#FDF1CE" />
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feColorMatrix type="matrix" values="
        1 0 0 0 0.83
        0 1 0 0 0.68
        0 0 1 0 0.21
        0 0 0 0.6 0" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <g filter="url(#goldGlow)" fill="none" stroke="url(#goldMetallic)" stroke-linecap="round" stroke-linejoin="round">
    <!-- Main Arching Stem -->
    <path d="M 400,1150 C 400,850 430,600 370,120" stroke-width="5.5" />
    
    <!-- Central Monstera / Palm Leaf (Top) -->
    <g transform="translate(370,120) scale(0.9)">
      <path d="M 0,0 C -40,-80 -120,-120 -80,-200 C -40,-180 -10,-140 0,-100 C 10,-140 40,-180 80,-200 C 120,-120 40,-80 0,0 Z" 
            stroke-width="3.5" fill="rgba(212,175,55,0.08)" />
      <path d="M 0,0 L 0,-190" stroke-width="2.5" />
      <path d="M 0,-50 C -30,-60 -50,-80 -60,-110" stroke-width="2" />
      <path d="M 0,-50 C 30,-60 50,-80 60,-110" stroke-width="2" />
      <path d="M 0,-100 C -25,-110 -40,-130 -50,-150" stroke-width="2" />
      <path d="M 0,-100 C 25,-110 40,-130 50,-150" stroke-width="2" />
    </g>

    <!-- Leaf Pair 1 (Upper Branch) -->
    <!-- Left Leaf -->
    <path d="M 385,320 C 310,290 220,310 160,250 C 210,230 290,240 385,320 Z" stroke-width="3" fill="rgba(212,175,55,0.06)" />
    <path d="M 385,320 C 300,285 220,270 160,250" stroke-width="2" />
    <path d="M 320,295 C 290,265 270,245 250,235" stroke-width="1.5" />
    <path d="M 270,280 C 240,260 215,245 200,240" stroke-width="1.5" />
    
    <!-- Right Leaf -->
    <path d="M 395,280 C 470,240 560,250 630,200 C 580,180 500,200 395,280 Z" stroke-width="3" fill="rgba(212,175,55,0.06)" />
    <path d="M 395,280 C 480,245 560,225 630,200" stroke-width="2" />
    <path d="M 460,255 C 500,225 530,210 550,200" stroke-width="1.5" />
    <path d="M 520,235 C 555,215 580,205 600,200" stroke-width="1.5" />

    <!-- Leaf Pair 2 (Mid-High Branch - Cascading Eucalyptus) -->
    <!-- Left Eucalyptus -->
    <path d="M 405,480 C 280,450 180,500 120,440 C 180,410 290,420 405,480 Z" stroke-width="3.2" fill="rgba(212,175,55,0.07)" />
    <path d="M 405,480 C 300,450 200,440 120,440" stroke-width="2" />
    <path d="M 330,455 C 290,425 250,415 220,410" stroke-width="1.6" />
    <path d="M 260,445 C 220,425 180,420 150,420" stroke-width="1.6" />

    <!-- Right Eucalyptus -->
    <path d="M 410,440 C 530,400 640,430 710,370 C 650,340 540,360 410,440 Z" stroke-width="3.2" fill="rgba(212,175,55,0.07)" />
    <path d="M 410,440 C 520,405 620,385 710,370" stroke-width="2" />
    <path d="M 490,415 C 540,385 590,375 620,370" stroke-width="1.6" />
    <path d="M 570,395 C 615,375 650,370 680,370" stroke-width="1.6" />

    <!-- Leaf Pair 3 (Grand Monstera/Fan Leaves Mid-Low) -->
    <!-- Left Grand Leaf -->
    <path d="M 410,680 C 250,660 130,750 60,680 C 140,630 270,630 410,680 Z" stroke-width="3.5" fill="rgba(212,175,55,0.08)" />
    <path d="M 410,680 C 280,665 170,670 60,680" stroke-width="2.2" />
    <path d="M 310,670 C 250,635 190,620 140,615" stroke-width="1.8" />
    <path d="M 230,670 C 180,640 130,635 90,635" stroke-width="1.8" />

    <!-- Right Grand Leaf -->
    <path d="M 415,640 C 570,610 690,680 750,620 C 680,575 550,580 415,640 Z" stroke-width="3.5" fill="rgba(212,175,55,0.08)" />
    <path d="M 415,640 C 550,625 660,615 750,620" stroke-width="2.2" />
    <path d="M 520,625 C 585,595 640,585 680,580" stroke-width="1.8" />
    <path d="M 610,620 C 660,595 700,590 730,590" stroke-width="1.8" />

    <!-- Leaf Pair 4 (Lower Foundation Leaves) -->
    <path d="M 405,880 C 290,880 180,970 120,930 C 180,875 280,860 405,880 Z" stroke-width="3" fill="rgba(212,175,55,0.06)" />
    <path d="M 405,880 C 300,890 200,915 120,930" stroke-width="2" />

    <path d="M 405,850 C 520,845 620,920 670,880 C 620,830 520,825 405,850 Z" stroke-width="3" fill="rgba(212,175,55,0.06)" />
    <path d="M 405,850 C 500,855 590,870 670,880" stroke-width="2" />
  </g>
</svg>"""

    svg_path = os.path.join(OUTPUT_DIR, "botanical-gold-leaf.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Exported SVG: {svg_path}")

    # Render via Edge to high-res PNG then WebP
    temp_png = os.path.join(OUTPUT_DIR, "_temp_botanical.png")
    html_doc = f"""<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ margin: 0; padding: 0; background: transparent; overflow: hidden; display: flex; justify-content: center; align-items: center; width: 800px; height: 1200px; }}
  </style>
</head>
<body>
  {svg_content}
</body>
</html>"""
    render_html_via_edge(html_doc, temp_png, width=800, height=1200)
    
    # Save as WebP
    im = Image.open(temp_png).convert("RGBA")
    webp_path = os.path.join(OUTPUT_DIR, "botanical-gold-leaf.webp")
    im.save(webp_path, "WEBP", quality=90, method=6)
    if os.path.exists(temp_png):
        os.remove(temp_png)
    print(f"Exported WebP: {webp_path} ({os.path.getsize(webp_path)/1024:.1f} KB, size {im.size})")

# ── 4. GENERATE WAX-SEAL-EMERALD (SVG & WEBP) ───────────────────────────────
def generate_wax_seal():
    print("Generating wax-seal-emerald (SVG & WebP)...")
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Wax Drop Shadow -->
    <filter id="sealShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#020805" flood-opacity="0.8" />
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#05180F" flood-opacity="0.6" />
    </filter>
    
    <!-- Metallic Foil Gradient for Crest & Monogram -->
    <linearGradient id="crestGold" x1="15%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stop-color="#FFF8E0" />
      <stop offset="25%" stop-color="#F2D888" />
      <stop offset="50%" stop-color="#D4AF37" />
      <stop offset="75%" stop-color="#9C721A" />
      <stop offset="100%" stop-color="#FFEBB0" />
    </linearGradient>

    <!-- Deep Emerald Lacquer Surface Gradient -->
    <radialGradient id="emeraldWax" cx="42%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#165B43" />
      <stop offset="35%" stop-color="#0E3D2D" />
      <stop offset="70%" stop-color="#09291E" />
      <stop offset="100%" stop-color="#04150F" />
    </radialGradient>

    <!-- Emboss Inner Rim Highlight -->
    <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.4)" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.05)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.6)" />
    </linearGradient>

    <filter id="embossFilter" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#020906" flood-opacity="0.9" />
      <feDropShadow dx="-1" dy="-1" stdDeviation="1" flood-color="#FFE8A3" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Outer Molten Organic Wax Rim -->
  <g filter="url(#sealShadow)">
    <path d="M 300,50 
             C 360,45 420,65 470,110 
             C 525,160 555,225 550,295 
             C 545,370 515,440 460,490 
             C 405,540 335,555 265,545 
             C 190,535 125,495 80,440 
             C 40,385 45,315 60,245 
             C 75,175 120,115 180,75 
             C 230,45 260,52 300,50 Z" 
          fill="url(#emeraldWax)" stroke="url(#rimHighlight)" stroke-width="4" />

    <!-- Secondary Molten Drips & Organic Ripples -->
    <path d="M 450,130 C 500,180 520,250 510,320 C 500,390 450,460 380,490 C 310,520 220,500 170,440 C 120,380 120,300 150,230 C 180,160 250,110 330,110 C 380,110 420,115 450,130 Z" 
          fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="6" opacity="0.65" />
          
    <path d="M 430,480 C 470,520 480,560 450,575 C 420,585 390,550 370,520 Z" fill="#09291E" opacity="0.8" />
  </g>

  <!-- Inner Stamped Depression Bed -->
  <circle cx="300" cy="300" r="175" fill="#072218" stroke="#04120D" stroke-width="5" />
  <circle cx="300" cy="300" r="175" fill="none" stroke="url(#rimHighlight)" stroke-width="3" opacity="0.7" />

  <!-- Inner Beaded Ring (Royal Pearl Beads) -->
  <circle cx="300" cy="300" r="158" fill="none" stroke="url(#crestGold)" stroke-width="1.8" stroke-dasharray="3, 7" filter="url(#embossFilter)" opacity="0.85" />
  <circle cx="300" cy="300" r="150" fill="none" stroke="url(#crestGold)" stroke-width="1" opacity="0.6" />

  <!-- Royal Laurel Wreath Framing -->
  <g filter="url(#embossFilter)" fill="url(#crestGold)" stroke="url(#crestGold)">
    <!-- Left Wreath Leaf Clusters -->
    <path d="M 195,300 C 190,260 205,220 230,190 C 235,200 235,215 228,230 C 218,250 215,275 220,300 C 215,315 205,310 195,300 Z" />
    <path d="M 200,240 C 175,220 180,195 200,185 C 205,195 205,210 200,240 Z" />
    <path d="M 215,340 C 200,370 215,405 240,425 C 242,410 238,395 230,380 C 220,360 218,345 215,340 Z" />
    <path d="M 210,380 C 185,395 190,420 215,425 C 218,410 215,395 210,380 Z" />

    <!-- Right Wreath Leaf Clusters (Mirrored) -->
    <path d="M 405,300 C 410,260 395,220 370,190 C 365,200 365,215 372,230 C 382,250 385,275 380,300 C 385,315 395,310 405,300 Z" />
    <path d="M 400,240 C 425,220 420,195 400,185 C 395,195 395,210 400,240 Z" />
    <path d="M 385,340 C 400,370 385,405 360,425 C 358,410 362,395 370,380 C 380,360 382,345 385,340 Z" />
    <path d="M 390,380 C 415,395 410,420 385,425 C 382,410 385,395 390,380 Z" />
    
    <!-- Bottom Ribbon Tie -->
    <circle cx="300" cy="435" r="5" fill="url(#crestGold)" />
    <path d="M 295,438 C 280,450 265,470 255,480" stroke-width="2.5" fill="none" />
    <path d="M 305,438 C 320,450 335,470 345,480" stroke-width="2.5" fill="none" />
  </g>

  <!-- Imperial Coronet / Crown (Above Monogram) -->
  <g transform="translate(300, 205)" filter="url(#embossFilter)" fill="url(#crestGold)">
    <path d="M -35,15 L -45,-10 L -20,-2 L 0,-18 L 20,-2 L 45,-10 L 35,15 Z" />
    <circle cx="-45" cy="-12" r="3" />
    <circle cx="-20" cy="-4" r="3" />
    <circle cx="0" cy="-21" r="4" />
    <circle cx="20" cy="-4" r="3" />
    <circle cx="45" cy="-12" r="3" />
    <rect x="-35" y="17" width="70" height="4" rx="2" />
  </g>

  <!-- Central Royal Intertwined Monogram: 'E & V' (Emerald & Velvet) -->
  <g transform="translate(300, 315)" filter="url(#embossFilter)">
    <text text-anchor="middle" y="22" 
          font-family="'Playfair Display', 'Cinzel', 'Baskerville', 'Times New Roman', serif" 
          font-size="82" font-weight="700" letter-spacing="4"
          fill="url(#crestGold)">
      E&amp;V
    </text>
  </g>

  <!-- Subtle Polish Sheen Arc on Top Left Rim -->
  <path d="M 120,200 C 150,130 220,80 300,70" 
        fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="4.5" stroke-linecap="round" />
</svg>"""

    svg_path = os.path.join(OUTPUT_DIR, "wax-seal-emerald.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Exported SVG: {svg_path}")

    # Render via Edge to high-res PNG then WebP
    temp_png = os.path.join(OUTPUT_DIR, "_temp_seal.png")
    html_doc = f"""<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ margin: 0; padding: 0; background: transparent; overflow: hidden; display: flex; justify-content: center; align-items: center; width: 600px; height: 600px; }}
  </style>
</head>
<body>
  {svg_content}
</body>
</html>"""
    render_html_via_edge(html_doc, temp_png, width=600, height=600)
    
    # Save as WebP
    im = Image.open(temp_png).convert("RGBA")
    webp_path = os.path.join(OUTPUT_DIR, "wax-seal-emerald.webp")
    im.save(webp_path, "WEBP", quality=92, method=6)
    if os.path.exists(temp_png):
        os.remove(temp_png)
    print(f"Exported WebP: {webp_path} ({os.path.getsize(webp_path)/1024:.1f} KB, size {im.size})")

if __name__ == "__main__":
    generate_bg_cover()
    generate_bg_stage()
    generate_botanical_leaf()
    generate_wax_seal()
    print("All Emerald Velvet Noir assets generated successfully!")
