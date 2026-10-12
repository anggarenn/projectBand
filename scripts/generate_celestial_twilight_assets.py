"""
Celestial Twilight Asset Generator
RND Asset Specialist: Mas Amba
Theme: celestial-twilight (Cosmic Midnight #080B14 + Stardust Lavender #C8B6FF + Celestial Gold #F3D082)
Outputs:
- public/assets/celestial-twilight/bg-cover.webp (1080x1920)
- public/assets/celestial-twilight/bg-stage.webp (1080x1920)
- public/assets/celestial-twilight/moon-phase.webp & .svg (600x600)
- public/assets/celestial-twilight/constellation-map.webp & .svg (800x800)
"""

import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "celestial-twilight")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def render_html_via_edge(html_content, output_png_path, width=800, height=800):
    """Renders HTML/SVG via Headless Edge for ultra-sharp vectors and glowing filters."""
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
    
    # Deep Cosmic Midnight Base: #050812 (top) -> #090E1F (mid) -> #060914 (bottom)
    grad_base = np.sin(y_coords * np.pi * 0.9 + 0.1)
    r = np.repeat((5 + grad_base * 6).astype(np.float32), w, axis=1)
    g = np.repeat((8 + grad_base * 9).astype(np.float32), w, axis=1)
    b = np.repeat((18 + grad_base * 24).astype(np.float32), w, axis=1)
    
    # Ethereal Violet-Indigo Nebula Clouds (Diagonal cosmic streams)
    nebula_wave1 = np.sin(x_coords * 5.0 + y_coords * 3.5) * 0.5 + 0.5
    nebula_wave2 = np.cos(x_coords * 8.0 - y_coords * 4.5) * 0.5 + 0.5
    nebula_mask = (nebula_wave1 * 0.6 + nebula_wave2 * 0.4) ** 2.2
    
    # Deep violet/plum infusion: #2A153E
    r += nebula_mask * 18.0
    g += nebula_mask * 10.0
    b += nebula_mask * 32.0
    
    # Central Cosmic Glow (focus area for hero invitation)
    dist_sq = ((x_coords - 0.5) ** 2 * 1.6 + (y_coords - 0.42) ** 2) / (0.50 ** 2)
    center_glow = np.clip(1.0 - dist_sq, 0.0, 1.0) ** 1.8
    r += center_glow * 14.0
    g += center_glow * 16.0
    b += center_glow * 36.0
    
    # Cosmic micro noise (space dust)
    np.random.seed(42)
    noise = np.random.normal(0.0, 2.2, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise, 0, 255).astype(np.uint8)
    b = np.clip(b + noise, 0, 255).astype(np.uint8)
    
    img = Image.fromarray(np.dstack([r, g, b]), mode="RGB")
    draw = ImageDraw.Draw(img, "RGBA")
    
    # Faint Astrological Orbit Rings (centered at x: 540, y: 810)
    cx, cy = 540, 810
    ring_radii = [280, 420, 560, 720]
    for rad in ring_radii:
        # Subtle gold/lavender wireframe
        bbox = [cx - rad, cy - rad, cx + rad, cy + rad]
        draw.ellipse(bbox, outline=(243, 208, 130, 22), width=1)
        
    # Diagonal Astrolabe Coordinate Line
    draw.line([(cx - 650, cy - 500), (cx + 650, cy + 500)], fill=(200, 182, 255, 18), width=1)
    draw.line([(cx - 500, cy + 650), (cx + 500, cy - 650)], fill=(200, 182, 255, 18), width=1)
    
    # Sparkling Micro Stardust & Stars
    np.random.seed(1337)
    # 1. Distant dim stars
    for _ in range(450):
        px = np.random.randint(20, w - 20)
        py = np.random.randint(40, h - 40)
        lum = np.random.randint(140, 240)
        alpha = np.random.randint(40, 180)
        color = (lum, lum, int(min(255, lum * 1.15)), alpha)
        draw.point((px, py), fill=color)
        
    # 2. Glowing focal stars (4-point cross bursts)
    for _ in range(45):
        px = np.random.randint(40, w - 40)
        py = np.random.randint(60, h - 60)
        size = np.random.randint(3, 7)
        # Gold or lavender tint
        if np.random.rand() > 0.4:
            star_color = (243, 208, 130, 220) # Celestial gold
        else:
            star_color = (200, 182, 255, 220) # Stardust lavender
            
        # Draw 4-point diamond cross
        draw.line([(px - size, py), (px + size, py)], fill=star_color, width=1)
        draw.line([(px, py - size), (px, py + size)], fill=star_color, width=1)
        draw.ellipse([px - 1, py - 1, px + 1, py + 1], fill=(255, 255, 255, 240))
        
    # Soft stardust bloom
    bloom = img.filter(ImageFilter.GaussianBlur(radius=2.2))
    img = Image.blend(img, bloom, 0.25)
    
    out_path = os.path.join(OUTPUT_DIR, "bg-cover.webp")
    img.save(out_path, "WEBP", quality=86, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

# ── 2. GENERATE BG-STAGE.WEBP (1080x1920) ───────────────────────────────────
def generate_bg_stage():
    print("Generating bg-stage.webp...")
    w, h = 1080, 1920
    
    y_coords = np.linspace(0, 1, h)[:, None]
    x_coords = np.linspace(0, 1, w)[None, :]
    
    # Cinematic Night Sky & Galactic Vista
    # Deep midnight noir: #04060E (top) -> #0D1329 (upper-mid) -> #140E24 (mid) -> #050711 (bottom)
    grad_sky = y_coords ** 0.95
    r = np.repeat((4 + grad_sky * 10).astype(np.float32), w, axis=1)
    g = np.repeat((6 + grad_sky * 12).astype(np.float32), w, axis=1)
    b = np.repeat((14 + grad_sky * 28).astype(np.float32), w, axis=1)
    
    # Radiant Lunar Halo (Center top: x=0.5, y=0.32)
    # Soft celestial moonlight casting a serene halo over the stage
    lunar_dist = np.sqrt((x_coords - 0.5)**2 * 1.5 + (y_coords - 0.32)**2)
    lunar_halo = np.clip(1.0 - lunar_dist / 0.55, 0.0, 1.0) ** 1.9
    r += lunar_halo * 32.0 # Lavender-gold moonbeams
    g += lunar_halo * 36.0
    b += lunar_halo * 58.0
    
    # Diagonal Milky Way Galactic Dust Lane
    mw_lane = np.exp(-((x_coords - 0.5 - (y_coords - 0.5) * 0.45) ** 2) / 0.04)
    mw_clouds = np.sin(y_coords * 12.0 + x_coords * 6.0) * 0.3 + 0.7
    galaxy_dust = mw_lane * mw_clouds
    r += galaxy_dust * 16.0
    g += galaxy_dust * 14.0
    b += galaxy_dust * 28.0
    
    # Atmospheric stage ground glow at bottom
    bottom_glow = np.clip((y_coords - 0.85) / 0.15, 0.0, 1.0) ** 1.5
    r += bottom_glow * 10.0
    g += bottom_glow * 14.0
    b += bottom_glow * 25.0
    
    # Micro space grain
    np.random.seed(99)
    noise = np.random.normal(0.0, 2.4, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise, 0, 255).astype(np.uint8)
    b = np.clip(b + noise, 0, 255).astype(np.uint8)
    
    img = Image.fromarray(np.dstack([r, g, b]), mode="RGB")
    draw = ImageDraw.Draw(img, "RGBA")
    
    # Starfield across the stage
    np.random.seed(2026)
    for _ in range(550):
        px = np.random.randint(15, w - 15)
        py = np.random.randint(25, h - 25)
        bright = np.random.randint(150, 255)
        draw.point((px, py), fill=(bright, bright, int(min(255, bright * 1.15)), np.random.randint(50, 200)))
        
    # Major constellation stars in background
    for _ in range(35):
        px = np.random.randint(40, w - 40)
        py = np.random.randint(60, h - 80)
        size = np.random.randint(2, 5)
        draw.ellipse([px - size, py - size, px + size, py + size], fill=(245, 230, 180, 200))
        
    soft_glow = img.filter(ImageFilter.GaussianBlur(radius=1.8))
    img = Image.blend(img, soft_glow, 0.20)
    
    out_path = os.path.join(OUTPUT_DIR, "bg-stage.webp")
    img.save(out_path, "WEBP", quality=86, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

# ── 3. GENERATE MOON-PHASE (SVG & WEBP) ─────────────────────────────────────
def generate_moon_phase():
    print("Generating moon-phase (SVG & WebP)...")
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Radiant Lunar Aura Bloom -->
    <filter id="lunarAura" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur1" />
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Metallic Celestial Gold Shimmer Gradient -->
    <linearGradient id="moonGold" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF0" />
      <stop offset="25%" stop-color="#FCEAB3" />
      <stop offset="55%" stop-color="#F3D082" />
      <stop offset="85%" stop-color="#CFA34A" />
      <stop offset="100%" stop-color="#8C6618" />
    </linearGradient>

    <!-- Silver Starlight Rim Gradient -->
    <linearGradient id="silverRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="50%" stop-color="#E2DCFF" />
      <stop offset="100%" stop-color="#A595E2" />
    </linearGradient>

    <!-- Starlight Glow Drop Shadow -->
    <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#F3D082" flood-opacity="0.7" />
      <feDropShadow dx="0" dy="0" stdDeviation="18" flood-color="#C8B6FF" flood-opacity="0.4" />
    </filter>
  </defs>

  <g filter="url(#lunarAura)">
    <!-- Outer Orbital Halo Ring -->
    <circle cx="300" cy="300" r="235" fill="none" stroke="url(#silverRim)" stroke-width="1.2" stroke-dasharray="4, 10" opacity="0.45" />
    <circle cx="300" cy="300" r="222" fill="none" stroke="url(#moonGold)" stroke-width="0.8" opacity="0.3" />

    <!-- Radiant Starlight Rays emanating from Moon -->
    <g stroke="url(#moonGold)" stroke-width="1.5" opacity="0.6">
      <line x1="300" y1="30" x2="300" y2="70" />
      <line x1="300" y1="530" x2="300" y2="570" />
      <line x1="30" y1="300" x2="70" y2="300" />
      <line x1="530" y1="300" x2="570" y2="300" />
      <line x1="110" y1="110" x2="140" y2="140" />
      <line x1="460" y1="460" x2="490" y2="490" />
      <line x1="110" y1="490" x2="140" y2="460" />
      <line x1="460" y1="140" x2="490" y2="110" />
    </g>

    <!-- Glowing Crescent Moon (Pure Mathematical Bézier Silhouette) -->
    <!-- Outer arc from top to bottom, Inner arc sweeping back to create graceful crescent -->
    <path d="M 300,75 
             C 424,75 525,176 525,300 
             C 525,424 424,525 300,525 
             C 385,455 435,380 435,300 
             C 435,220 385,145 300,75 Z" 
          fill="url(#moonGold)" filter="url(#starGlow)" />

    <!-- Silver Inner Edge Highlight Arc -->
    <path d="M 300,75 C 385,145 435,220 435,300 C 435,380 385,455 300,525" 
          fill="none" stroke="url(#silverRim)" stroke-width="3" opacity="0.75" />

    <!-- Delicate Lunar Craters / Maria Texturing on Crescent Body -->
    <g fill="#A87A1E" opacity="0.22">
      <circle cx="445" cy="240" r="14" />
      <circle cx="468" cy="285" r="18" />
      <circle cx="452" cy="340" r="15" />
      <circle cx="420" cy="390" r="12" />
      <circle cx="425" cy="190" r="10" />
    </g>

    <!-- Starbursts & Constellation Orbs Orbiting the Moon -->
    <!-- Primary North Star Burst (Top Left) -->
    <g transform="translate(190, 190)" filter="url(#starGlow)">
      <path d="M 0,-32 L 3,-6 L 30,0 L 3,6 L 0,32 L -3,6 L -30,0 L -3,-6 Z" fill="url(#silverRim)" />
      <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
    </g>

    <!-- Secondary Star Burst (Bottom Left) -->
    <g transform="translate(230, 420)" filter="url(#starGlow)">
      <path d="M 0,-22 L 2,-4 L 20,0 L 2,4 L 0,22 L -2,4 L -20,0 L -2,-4 Z" fill="url(#moonGold)" />
      <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
    </g>

    <!-- Floating Starlight Orbs -->
    <circle cx="160" cy="300" r="3.5" fill="#FFF2C2" opacity="0.85" />
    <circle cx="210" cy="260" r="2.5" fill="#E2DCFF" opacity="0.75" />
    <circle cx="200" cy="350" r="2.8" fill="#FFF2C2" opacity="0.8" />
    <circle cx="270" cy="300" r="2.2" fill="#E2DCFF" opacity="0.7" />
  </g>
</svg>"""

    svg_path = os.path.join(OUTPUT_DIR, "moon-phase.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Exported SVG: {svg_path}")

    # Render via Edge to high-res PNG then WebP
    temp_png = os.path.join(OUTPUT_DIR, "_temp_moon.png")
    html_doc = f"""<!DOCTYPE html>
<html><head><style>body {{ margin:0; padding:0; background:transparent; overflow:hidden; display:flex; justify-content:center; align-items:center; width:600px; height:600px; }}</style></head>
<body>{svg_content}</body></html>"""
    render_html_via_edge(html_doc, temp_png, width=600, height=600)
    
    im_moon = Image.open(temp_png).convert("RGBA")
    webp_path = os.path.join(OUTPUT_DIR, "moon-phase.webp")
    im_moon.save(webp_path, "WEBP", quality=90, method=6)
    if os.path.exists(temp_png):
        os.remove(temp_png)
    print(f"Exported WebP: {webp_path} ({os.path.getsize(webp_path)/1024:.1f} KB, size {im_moon.size})")

# ── 4. GENERATE CONSTELLATION-MAP (SVG & WEBP) ─────────────────────────────
def generate_constellation_map():
    print("Generating constellation-map (SVG & WebP)...")
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <!-- Starlight Glow Filter -->
    <filter id="starGlowMap" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Celestial Gold Metallic Gradient -->
    <linearGradient id="mapGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF2" />
      <stop offset="35%" stop-color="#F5DB8F" />
      <stop offset="70%" stop-color="#E5BE64" />
      <stop offset="100%" stop-color="#A88226" />
    </linearGradient>

    <!-- Stardust Lavender Gradient -->
    <linearGradient id="mapLavender" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#DDD3FF" />
      <stop offset="80%" stop-color="#C8B6FF" />
      <stop offset="100%" stop-color="#8F78D4" />
    </linearGradient>
  </defs>

  <g filter="url(#starGlowMap)">
    <!-- 1. ASTROLABE COORDINATE RINGS (Concentric Rings with Degree Ticks) -->
    <circle cx="400" cy="400" r="370" fill="none" stroke="url(#mapGold)" stroke-width="2.5" opacity="0.65" />
    <circle cx="400" cy="400" r="352" fill="none" stroke="url(#mapLavender)" stroke-width="1.2" stroke-dasharray="3, 7" opacity="0.5" />
    <circle cx="400" cy="400" r="275" fill="none" stroke="url(#mapGold)" stroke-width="1.0" opacity="0.4" />
    <circle cx="400" cy="400" r="180" fill="none" stroke="url(#mapLavender)" stroke-width="1.0" stroke-dasharray="2, 6" opacity="0.35" />
    <circle cx="400" cy="400" r="85" fill="none" stroke="url(#mapGold)" stroke-width="0.8" opacity="0.3" />

    <!-- Cardinal Coordinate Axes -->
    <line x1="400" y1="30" x2="400" y2="770" stroke="url(#mapLavender)" stroke-width="1" stroke-dasharray="6, 8" opacity="0.35" />
    <line x1="30" y1="400" x2="770" y2="400" stroke="url(#mapLavender)" stroke-width="1" stroke-dasharray="6, 8" opacity="0.35" />
    
    <!-- Diagonal Ecliptic Ring (Tilted Orbit) -->
    <ellipse cx="400" cy="400" rx="360" ry="190" transform="rotate(-28, 400, 400)" 
             fill="none" stroke="url(#mapGold)" stroke-width="1.4" opacity="0.4" />

    <!-- Cardinal Compass Markers: N, S, E, W -->
    <g fill="url(#mapGold)" font-family="'Cinzel', 'Playfair Display', serif" font-size="16" font-weight="700" text-anchor="middle">
      <text x="400" y="24">N</text>
      <text x="400" y="792">S</text>
      <text x="788" y="405">E</text>
      <text x="14" y="405">W</text>
    </g>

    <!-- 2. CONSTELLATION 1: URSA MAJOR (The Great Bear / Big Dipper - Top Left) -->
    <g stroke="url(#mapLavender)" stroke-width="1.6" fill="url(#mapGold)">
      <!-- Line connections -->
      <polyline points="140,160 210,180 265,225 320,220 375,275 325,310 270,280 265,225" fill="none" opacity="0.8" />
      <!-- Star vertices -->
      <circle cx="140" cy="160" r="4.5" />
      <circle cx="210" cy="180" r="4" />
      <circle cx="265" cy="225" r="5" />
      <circle cx="320" cy="220" r="4" />
      <circle cx="375" cy="275" r="5.5" />
      <circle cx="325" cy="310" r="4" />
      <circle cx="270" cy="280" r="4.5" />
    </g>

    <!-- 3. CONSTELLATION 2: CASSIOPEIA (The Celestial Crown 'W' - Top Right) -->
    <g stroke="url(#mapGold)" stroke-width="1.6" fill="url(#mapLavender)">
      <polyline points="480,120 540,165 590,130 650,185 710,140" fill="none" opacity="0.8" />
      <circle cx="480" cy="120" r="4.5" />
      <circle cx="540" cy="165" r="5" />
      <circle cx="590" cy="130" r="4.2" />
      <circle cx="650" cy="185" r="5.5" />
      <circle cx="710" cy="140" r="4" />
    </g>

    <!-- 4. CONSTELLATION 3: CYGNUS (The Northern Swan Cross - Center Right) -->
    <g stroke="url(#mapLavender)" stroke-width="1.5" fill="url(#mapGold)">
      <!-- Spine -->
      <line x1="560" y1="290" x2="560" y2="470" opacity="0.8" />
      <!-- Wings -->
      <line x1="475" y1="360" x2="645" y2="360" opacity="0.8" />
      <!-- Stars (Deneb, Albireo, Sadr) -->
      <circle cx="560" cy="290" r="6" /> <!-- Deneb Alpha Star -->
      <circle cx="560" cy="360" r="5.5" /> <!-- Sadr -->
      <circle cx="560" cy="470" r="4.5" /> <!-- Albireo -->
      <circle cx="475" cy="360" r="4.8" />
      <circle cx="645" cy="360" r="4.8" />
    </g>

    <!-- 5. CONSTELLATION 4: ORION (The Celestial Hunter - Bottom Left) -->
    <g stroke="url(#mapGold)" stroke-width="1.6" fill="url(#mapGold)">
      <!-- Shoulders & Feet -->
      <line x1="160" y1="460" x2="280" y2="480" opacity="0.8" />
      <line x1="150" y1="660" x2="270" y2="640" opacity="0.8" />
      <!-- Torso to Belt -->
      <line x1="160" y1="460" x2="200" y2="560" opacity="0.75" />
      <line x1="280" y1="480" x2="240" y2="560" opacity="0.75" />
      <line x1="200" y1="560" x2="150" y2="660" opacity="0.75" />
      <line x1="240" y1="560" x2="270" y2="640" opacity="0.75" />
      <!-- Orion's Belt (3 Iconic Stars) -->
      <line x1="200" y1="565" x2="240" y2="555" opacity="0.9" />
      <circle cx="200" cy="565" r="4.5" />
      <circle cx="220" cy="560" r="4.5" />
      <circle cx="240" cy="555" r="4.5" />
      <!-- Betelgeuse & Rigel Alpha Stars -->
      <circle cx="160" cy="460" r="6.5" fill="#FFE5A3" /> <!-- Betelgeuse (Red Supergiant Tint) -->
      <circle cx="280" cy="480" r="5.2" fill="#E2DCFF" /> <!-- Bellatrix -->
      <circle cx="270" cy="640" r="6.5" fill="#FFFFFF" /> <!-- Rigel (Blue-White Alpha) -->
      <circle cx="150" cy="660" r="5.0" fill="#E2DCFF" /> <!-- Saiph -->
    </g>

    <!-- 6. CONSTELLATION 5: PEGASUS & ROMANCE STARS (Bottom Right) -->
    <g stroke="url(#mapLavender)" stroke-width="1.5" fill="url(#mapLavender)">
      <polygon points="460,540 580,520 630,640 510,660" fill="none" opacity="0.75" />
      <line x1="580" y1="520" x2="680" y2="480" opacity="0.75" />
      <circle cx="460" cy="540" r="5" />
      <circle cx="580" cy="520" r="5.2" />
      <circle cx="630" cy="640" r="4.8" />
      <circle cx="510" cy="660" r="4.5" />
      <circle cx="680" cy="480" r="4.2" />
    </g>

    <!-- Radiant 4-Point Starlight Bursts at Major Intersections -->
    <g transform="translate(400, 400)">
      <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
      <path d="M 0,-18 L 2,-4 L 18,0 L 2,4 L 0,18 L -2,4 L -18,0 L -2,-4 Z" fill="url(#mapGold)" opacity="0.85" />
    </g>
  </g>
</svg>"""

    svg_path = os.path.join(OUTPUT_DIR, "constellation-map.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Exported SVG: {svg_path}")

    # Render via Edge to high-res PNG then WebP
    temp_png = os.path.join(OUTPUT_DIR, "_temp_map.png")
    html_doc = f"""<!DOCTYPE html>
<html><head><style>body {{ margin:0; padding:0; background:transparent; overflow:hidden; display:flex; justify-content:center; align-items:center; width:800px; height:800px; }}</style></head>
<body>{svg_content}</body></html>"""
    render_html_via_edge(html_doc, temp_png, width=800, height=800)
    
    im_map = Image.open(temp_png).convert("RGBA")
    webp_path = os.path.join(OUTPUT_DIR, "constellation-map.webp")
    im_map.save(webp_path, "WEBP", quality=92, method=6)
    if os.path.exists(temp_png):
        os.remove(temp_png)
    print(f"Exported WebP: {webp_path} ({os.path.getsize(webp_path)/1024:.1f} KB, size {im_map.size})")

if __name__ == "__main__":
    generate_bg_cover()
    generate_bg_stage()
    generate_moon_phase()
    generate_constellation_map()
    print("All Celestial Twilight assets generated successfully!")
