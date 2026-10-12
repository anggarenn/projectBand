"""
Terracotta Earthy Meadow Asset Generator
RND Asset Specialist: Mas Amba
Theme: terracotta-earthy-meadow (Warm Clay #BF573F + Organic Linen #FAF4EE + Dried Pampas #D4C5B3)
Outputs:
- public/assets/terracotta-meadow/bg-cover-kraft.webp (1080x1920)
- public/assets/terracotta-meadow/bg-stage.webp (1080x1920)
- public/assets/terracotta-meadow/pampas-left.webp & .svg
- public/assets/terracotta-meadow/pampas-right.webp & .svg
- public/assets/terracotta-meadow/twine-seal.webp & .svg
"""

import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
OUTPUT_DIR = os.path.join(PROJECT_DIR, "public", "assets", "terracotta-meadow")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

os.makedirs(OUTPUT_DIR, exist_ok=True)

def render_html_via_edge(html_content, output_png_path, width=800, height=1200):
    """Renders HTML/SVG via Headless Edge for ultra-clean rendering."""
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

# ── 1. GENERATE BG-COVER-KRAFT.WEBP (1080x1920) ─────────────────────────────
def generate_bg_cover_kraft():
    print("Generating bg-cover-kraft.webp...")
    w, h = 1080, 1920
    
    # Base warm handmade organic linen/kraft paper: #FAF4EE -> #F2E8DC
    y_coords = np.linspace(0, 1, h)[:, None]
    x_coords = np.linspace(0, 1, w)[None, :]
    
    r = np.repeat((250 - y_coords * 9).astype(np.float32), w, axis=1)
    g = np.repeat((244 - y_coords * 12).astype(np.float32), w, axis=1)
    b = np.repeat((238 - y_coords * 15).astype(np.float32), w, axis=1)
    
    # Artisanal envelope triangular flap shadow at top (V-fold shadow)
    # Flap center vertex at x: 0.5, y: 0.42
    v_dist = np.abs(x_coords - 0.5) * 1.8
    flap_line = 0.42 - v_dist * 0.38
    shadow_depth = np.clip((y_coords - flap_line) / 0.08, 0.0, 1.0)
    shadow_intensity = np.clip(1.0 - np.abs(y_coords - flap_line) / 0.12, 0.0, 1.0) ** 1.5
    
    r -= shadow_intensity * 18.0
    g -= shadow_intensity * 22.0
    b -= shadow_intensity * 26.0
    
    # Warm radial vignette (softer at edges, bright handmade paper center)
    rad_dist = ((x_coords - 0.5) ** 2 * 1.5 + (y_coords - 0.45) ** 2) / (0.55 ** 2)
    vignette = np.clip(rad_dist, 0.0, 1.0) ** 1.4
    r -= vignette * 16.0
    g -= vignette * 20.0
    b -= vignette * 24.0
    
    # Organic paper fibers & flecks
    np.random.seed(77)
    noise = np.random.normal(0.0, 3.2, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise, 0, 255).astype(np.uint8)
    b = np.clip(b + noise, 0, 255).astype(np.uint8)
    
    img = Image.fromarray(np.dstack([r, g, b]), mode="RGB")
    draw = ImageDraw.Draw(img)
    
    # Draw subtle organic pulp specks / artisanal flecks
    np.random.seed(1234)
    for _ in range(450):
        px = np.random.randint(10, w - 10)
        py = np.random.randint(10, h - 10)
        length = np.random.randint(2, 6)
        angle = np.random.uniform(0, math.pi)
        dx = int(length * math.cos(angle))
        dy = int(length * math.sin(angle))
        fleck_color = (205 + np.random.randint(-15, 10), 190 + np.random.randint(-15, 10), 175 + np.random.randint(-15, 10))
        draw.line([px, py, px + dx, py + dy], fill=fleck_color, width=1)
        
    out_path = os.path.join(OUTPUT_DIR, "bg-cover-kraft.webp")
    img.save(out_path, "WEBP", quality=85, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

# ── 2. GENERATE BG-STAGE.WEBP (1080x1920) ───────────────────────────────────
def generate_bg_stage():
    print("Generating bg-stage.webp...")
    w, h = 1080, 1920
    
    y_coords = np.linspace(0, 1, h)[:, None]
    x_coords = np.linspace(0, 1, w)[None, :]
    
    # Warm Clay & Sunset Meadow Atmosphere:
    # Top: Warm apricot cream #F7EDE2
    # Mid: Terracotta sun-drenched plaster #E8A88E
    # Base: Earthy warm clay shadow #C86D51 -> #94402B
    grad_base = y_coords ** 1.3
    r = np.repeat((247 - grad_base * 75).astype(np.float32), w, axis=1)
    g = np.repeat((237 - grad_base * 125).astype(np.float32), w, axis=1)
    b = np.repeat((226 - grad_base * 145).astype(np.float32), w, axis=1)
    
    # Boho Architectural Archway (Soft rounded niche framing the couple card)
    arch_cx, arch_cy = 0.5, 0.46
    arch_w, arch_h = 0.44, 0.48
    
    # Distance to arch inner contour
    dx = np.abs(x_coords - arch_cx)
    dy = np.clip(y_coords - arch_cy, -arch_h, arch_h)
    
    # Circular top of arch
    arch_top_dist = np.sqrt(dx**2 + np.maximum(0.0, -(y_coords - (arch_cy - arch_h + arch_w)))**2)
    is_inside_arch = (dx < arch_w) & (y_coords > (arch_cy - arch_h + arch_w)) & (y_coords < (arch_cy + arch_h))
    is_inside_top = arch_top_dist < arch_w
    niche_mask = is_inside_arch | is_inside_top
    
    # Luminous cream inside the arch niche
    niche_float = niche_mask.astype(np.float32)
    # Smooth arch edges
    niche_float = Image.fromarray((niche_float * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=8.0))
    niche_arr = np.array(niche_float).astype(np.float32) / 255.0
    
    # Inside niche: warm bright alabaster cream (#FFFBF6)
    r += niche_arr * 35.0
    g += niche_arr * 45.0
    b += niche_arr * 50.0
    
    # Golden Hour Sunset Beam (Diagonal atmospheric light rays)
    sun_beam = np.sin((x_coords * 1.5 - y_coords * 0.8) * 8.0) * 0.5 + 0.5
    sun_glow = np.clip(1.0 - np.sqrt((x_coords - 0.25)**2 + (y_coords - 0.2)**2) / 0.8, 0.0, 1.0) ** 1.5
    beam_accent = sun_beam * sun_glow * 22.0
    r += beam_accent * 1.2
    g += beam_accent * 0.8
    b += beam_accent * 0.3
    
    # Earthy base pedestal shadow
    pedestal_shadow = np.clip((y_coords - 0.82) / 0.18, 0.0, 1.0) ** 1.5
    r -= pedestal_shadow * 30.0
    g -= pedestal_shadow * 40.0
    b -= pedestal_shadow * 40.0
    
    # Natural plaster mineral grain
    np.random.seed(88)
    noise = np.random.normal(0.0, 2.5, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise, 0, 255).astype(np.uint8)
    b = np.clip(b + noise, 0, 255).astype(np.uint8)
    
    img = Image.fromarray(np.dstack([r, g, b]), mode="RGB")
    out_path = os.path.join(OUTPUT_DIR, "bg-stage.webp")
    img.save(out_path, "WEBP", quality=86, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

# ── 3. GENERATE PAMPAS-LEFT & RIGHT (SVG & WEBP) ────────────────────────────
def generate_pampas_pair():
    print("Generating pampas-left & pampas-right (SVG & WebP)...")
    
    # Left Pampas SVG
    svg_left = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 950" width="650" height="950">
  <defs>
    <linearGradient id="pampasCream" x1="0%" y1="100%" x2="50%" y2="0%">
      <stop offset="0%" stop-color="#C5B19A" />
      <stop offset="40%" stop-color="#E5D9CA" />
      <stop offset="70%" stop-color="#F6F0E8" />
      <stop offset="100%" stop-color="#D9C9B6" />
    </linearGradient>
    <linearGradient id="terracottaAccent" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9C442E" />
      <stop offset="60%" stop-color="#BF573F" />
      <stop offset="100%" stop-color="#E8927C" />
    </linearGradient>
    <linearGradient id="driedEucalyptus" x1="0%" y1="100%" x2="80%" y2="0%">
      <stop offset="0%" stop-color="#7C6F5E" />
      <stop offset="60%" stop-color="#9E907E" />
      <stop offset="100%" stop-color="#BCB0A0" />
    </linearGradient>
    <filter id="softFeather" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.2" result="blur" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <g filter="url(#softFeather)">
    <!-- Main Center Pampas Stem -->
    <path d="M 50,920 C 120,720 220,500 360,180" fill="none" stroke="#B8A48F" stroke-width="4.5" stroke-linecap="round" />
    
    <!-- Large Arching Pampas Plume (Soft feathery tufts) -->
    <g fill="url(#pampasCream)" opacity="0.92">
      <!-- Tufts left branch -->
      <path d="M 280,380 C 220,320 180,240 240,160 C 270,220 300,280 320,340 Z" opacity="0.85" />
      <path d="M 310,320 C 260,250 250,160 330,100 C 340,170 350,240 345,300 Z" />
      <path d="M 340,260 C 320,180 340,90 410,40 C 400,120 380,200 365,240 Z" />
      <path d="M 360,200 C 370,120 420,50 490,20 C 460,90 420,160 380,200 Z" />
      
      <!-- Wispy side feather hairs -->
      <path d="M 320,340 C 200,320 140,250 180,210 C 230,250 280,300 320,340 Z" opacity="0.75" />
      <path d="M 345,290 C 260,230 220,150 270,120 C 300,170 330,240 345,290 Z" opacity="0.8" />
      <path d="M 370,230 C 330,150 350,70 420,50 C 400,120 380,180 370,230 Z" opacity="0.85" />
      <path d="M 380,180 C 420,110 490,60 550,60 C 500,110 440,150 380,180 Z" opacity="0.8" />
    </g>

    <!-- Secondary Dried Palm Fan Spear (Terracotta Ochre Tint) -->
    <g fill="url(#terracottaAccent)" opacity="0.88">
      <path d="M 60,930 C 180,820 280,740 460,620" fill="none" stroke="#9C442E" stroke-width="3.5" />
      <path d="M 360,690 L 460,520 L 430,640 L 520,540 L 465,660 L 550,600 L 475,700 Z" />
      <path d="M 320,720 L 410,580 L 385,690 L 470,620 L 405,730 Z" opacity="0.75" />
    </g>

    <!-- Cascading Dried Eucalyptus Sprigs (Rustic Round Pod Leaves) -->
    <g fill="url(#driedEucalyptus)" stroke="#6E6252" stroke-width="1.5">
      <path d="M 40,940 C 100,850 160,780 240,680" fill="none" stroke-width="3" />
      <!-- Round leaves -->
      <circle cx="120" cy="850" r="22" opacity="0.9" />
      <circle cx="150" cy="820" r="24" opacity="0.9" />
      <circle cx="175" cy="770" r="25" opacity="0.9" />
      <circle cx="210" cy="730" r="22" opacity="0.85" />
      <circle cx="240" cy="680" r="18" opacity="0.8" />
      
      <!-- Veins -->
      <path d="M 105,850 L 135,850 M 135,820 L 165,820 M 160,770 L 190,770" stroke="#FAF4EE" stroke-width="1" opacity="0.6" />
    </g>
  </g>
</svg>"""

    # Export Left SVG
    svg_left_path = os.path.join(OUTPUT_DIR, "pampas-left.svg")
    with open(svg_left_path, "w", encoding="utf-8") as f:
        f.write(svg_left)
    print(f"Exported SVG: {svg_left_path}")

    # Render Left WebP via Edge
    temp_png = os.path.join(OUTPUT_DIR, "_temp_pampas_l.png")
    html_doc = f"""<!DOCTYPE html>
<html><head><style>body {{ margin:0; padding:0; background:transparent; overflow:hidden; }}</style></head>
<body>{svg_left}</body></html>"""
    render_html_via_edge(html_doc, temp_png, width=650, height=950)
    
    im_l = Image.open(temp_png).convert("RGBA")
    webp_left_path = os.path.join(OUTPUT_DIR, "pampas-left.webp")
    im_l.save(webp_left_path, "WEBP", quality=90, method=6)
    if os.path.exists(temp_png):
        os.remove(temp_png)
    print(f"Exported WebP: {webp_left_path} ({os.path.getsize(webp_left_path)/1024:.1f} KB, size {im_l.size})")

    # Generate Right Pampas (Harmonious Mirrored Pair with Subtle Organic Variation)
    im_r = im_l.transpose(Image.FLIP_LEFT_RIGHT)
    webp_right_path = os.path.join(OUTPUT_DIR, "pampas-right.webp")
    im_r.save(webp_right_path, "WEBP", quality=90, method=6)
    print(f"Exported WebP: {webp_right_path} ({os.path.getsize(webp_right_path)/1024:.1f} KB, size {im_r.size})")
    
    # Save Right SVG with flipped transform
    svg_right = svg_left.replace('<g filter="url(#softFeather)">', '<g filter="url(#softFeather)" transform="translate(650, 0) scale(-1, 1)">')
    svg_right_path = os.path.join(OUTPUT_DIR, "pampas-right.svg")
    with open(svg_right_path, "w", encoding="utf-8") as f:
        f.write(svg_right)
    print(f"Exported SVG: {svg_right_path}")

# ── 4. GENERATE TWINE-SEAL (SVG & WEBP) ─────────────────────────────────────
def generate_twine_seal():
    print("Generating twine-seal (SVG & WebP)...")
    
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Organic Drop Shadow -->
    <filter id="twineShadow" x="-20%" y="-20%" width="150%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#4A2518" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#2D150D" flood-opacity="0.3" />
    </filter>
    
    <!-- Terracotta Clay Wax Radial Gradient -->
    <radialGradient id="terracottaWax" cx="44%" cy="40%" r="62%">
      <stop offset="0%" stop-color="#D96E54" />
      <stop offset="35%" stop-color="#BF573F" />
      <stop offset="75%" stop-color="#9C402B" />
      <stop offset="100%" stop-color="#6E2818" />
    </radialGradient>

    <!-- Jute Twine Cord Texture Gradient -->
    <linearGradient id="juteTwine" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D6C4AD" />
      <stop offset="30%" stop-color="#B89E7E" />
      <stop offset="70%" stop-color="#8E7353" />
      <stop offset="100%" stop-color="#6B5236" />
    </linearGradient>

    <!-- Emboss Filter for Stamped Olive Branch Motif -->
    <filter id="clayEmboss" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="1.5" dy="2" stdDeviation="1.5" flood-color="#45180C" flood-opacity="0.8" />
      <feDropShadow dx="-1" dy="-1" stdDeviation="1" flood-color="#F5A490" flood-opacity="0.6" />
    </filter>
  </defs>

  <g filter="url(#twineShadow)">
    <!-- 1. JUTE TWINE RIBBON STRANDS (Crossing behind the wax seal) -->
    <!-- Diagonal strand 1 (Top-Left to Bottom-Right) -->
    <path d="M 50,80 C 180,180 320,320 540,510" fill="none" stroke="url(#juteTwine)" stroke-width="14" stroke-linecap="round" />
    <path d="M 50,80 C 180,180 320,320 540,510" fill="none" stroke="#FAF4EE" stroke-width="2.5" stroke-dasharray="6,10" opacity="0.4" />

    <!-- Diagonal strand 2 (Top-Right to Bottom-Left) -->
    <path d="M 530,90 C 400,200 240,360 70,520" fill="none" stroke="url(#juteTwine)" stroke-width="14" stroke-linecap="round" />
    <path d="M 530,90 C 400,200 240,360 70,520" fill="none" stroke="#FAF4EE" stroke-width="2.5" stroke-dasharray="6,10" opacity="0.4" />

    <!-- Twine Bow Ribbon Loops (Tied beneath the seal) -->
    <!-- Left Loop -->
    <path d="M 300,300 C 180,240 120,320 180,390 C 230,440 280,350 300,300 Z" fill="none" stroke="url(#juteTwine)" stroke-width="12" stroke-linecap="round" />
    <path d="M 300,300 C 180,240 120,320 180,390 C 230,440 280,350 300,300 Z" fill="none" stroke="#FAF4EE" stroke-width="2" stroke-dasharray="5,8" opacity="0.4" />
    
    <!-- Right Loop -->
    <path d="M 300,300 C 420,240 480,320 420,390 C 370,440 320,350 300,300 Z" fill="none" stroke="url(#juteTwine)" stroke-width="12" stroke-linecap="round" />
    <path d="M 300,300 C 420,240 480,320 420,390 C 370,440 320,350 300,300 Z" fill="none" stroke="#FAF4EE" stroke-width="2" stroke-dasharray="5,8" opacity="0.4" />

    <!-- Trailing Ribbon Ends -->
    <path d="M 300,320 C 260,390 230,470 210,560" fill="none" stroke="url(#juteTwine)" stroke-width="10" stroke-linecap="round" />
    <path d="M 300,320 C 340,390 380,480 395,570" fill="none" stroke="url(#juteTwine)" stroke-width="10" stroke-linecap="round" />

    <!-- 2. ORGANIC MOLTEN TERRACOTTA WAX SEAL -->
    <!-- Irregular organic molten wax rim -->
    <path d="M 300,140 
             C 365,135 435,160 470,215 
             C 515,280 500,355 455,420 
             C 410,480 345,490 280,480 
             C 210,470 145,430 130,355 
             C 115,280 155,200 220,155 
             C 255,135 275,142 300,140 Z" 
          fill="url(#terracottaWax)" stroke="rgba(255,255,255,0.25)" stroke-width="3.5" />

    <!-- Wax Rim Edge Ripples -->
    <path d="M 440,195 C 490,260 480,350 425,415 C 370,470 270,460 210,410 C 160,350 160,260 215,200 C 275,150 380,145 440,195 Z" 
          fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="4" opacity="0.6" />
          
    <!-- Stamped Inner Depression Bed -->
    <circle cx="305" cy="310" r="128" fill="#9C402B" stroke="#6E2818" stroke-width="4.5" />
    <circle cx="305" cy="310" r="128" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
    <circle cx="305" cy="310" r="116" fill="none" stroke="#BF573F" stroke-width="1.8" stroke-dasharray="2,5" opacity="0.75" />

    <!-- 3. STAMPED BOTANICAL MOTIF (Rustic Wildflower & Olive Sprig) -->
    <g filter="url(#clayEmboss)" fill="#D96E54" stroke="#D96E54">
      <!-- Curved Center Stem -->
      <path d="M 305,400 C 300,350 315,290 295,225" fill="none" stroke-width="3.5" stroke-linecap="round" />
      
      <!-- Top Bud -->
      <circle cx="295" cy="225" r="4.5" />
      
      <!-- Leaf Pairs -->
      <!-- Pair 1 -->
      <path d="M 303,260 C 285,250 270,260 265,245 C 275,240 295,245 303,260 Z" />
      <path d="M 307,250 C 325,240 340,250 345,235 C 335,230 315,235 307,250 Z" />
      
      <!-- Pair 2 -->
      <path d="M 305,295 C 280,285 260,298 252,280 C 268,272 292,278 305,295 Z" />
      <path d="M 309,285 C 334,275 354,288 362,270 C 346,262 322,268 309,285 Z" />

      <!-- Pair 3 -->
      <path d="M 302,340 C 272,330 250,345 240,325 C 258,315 288,322 302,340 Z" />
      <path d="M 306,328 C 336,318 358,333 368,313 C 350,303 320,310 306,328 Z" />
    </g>

    <!-- Warm Highlight Sheen Arc on Top Left Rim -->
    <path d="M 190,200 C 220,165 260,145 310,145" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="4" stroke-linecap="round" />
  </g>
</svg>"""

    svg_path = os.path.join(OUTPUT_DIR, "twine-seal.svg")
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Exported SVG: {svg_path}")

    # Render WebP via Edge
    temp_png = os.path.join(OUTPUT_DIR, "_temp_seal.png")
    html_doc = f"""<!DOCTYPE html>
<html><head><style>body {{ margin:0; padding:0; background:transparent; overflow:hidden; }}</style></head>
<body>{svg_content}</body></html>"""
    render_html_via_edge(html_doc, temp_png, width=600, height=600)
    
    im_seal = Image.open(temp_png).convert("RGBA")
    webp_path = os.path.join(OUTPUT_DIR, "twine-seal.webp")
    im_seal.save(webp_path, "WEBP", quality=90, method=6)
    if os.path.exists(temp_png):
        os.remove(temp_png)
    print(f"Exported WebP: {webp_path} ({os.path.getsize(webp_path)/1024:.1f} KB, size {im_seal.size})")

if __name__ == "__main__":
    generate_bg_cover_kraft()
    generate_bg_stage()
    generate_pampas_pair()
    generate_twine_seal()
    print("All Terracotta Earthy Meadow assets generated successfully!")
