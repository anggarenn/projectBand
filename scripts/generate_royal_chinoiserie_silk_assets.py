"""
Royal Chinoiserie Silk Asset Generator
RND Asset Specialist: Mas Amba (Tim Sikobokan)
Theme: royal-chinoiserie-silk (Peranakan Heritage & Imperial Peony / Sangjit Grand Luxury)
Palette:
- Crimson Vermilion (#680C14)
- Jade (#0F2E22)
- Antique Gold (#D4AF37)
- Pearl Silk (#FAF7F0)
"""

import os
import math
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
OUTPUT_DIR = os.path.join(PROJECT_DIR, 'public', 'assets', 'royal-chinoiserie-silk')
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_bg_cover():
    print("Generating bg-cover.webp (1080x1920)...")
    w, h = 1080, 1920
    y_coords = np.linspace(0, 1, h)[:, None]
    x_coords = np.linspace(0, 1, w)[None, :]

    grad_base = np.sin(y_coords * np.pi * 0.92 + 0.08)
    r = np.repeat((42 + grad_base * 62).astype(np.float32), w, axis=1)
    g = np.repeat((3 + grad_base * 10).astype(np.float32), w, axis=1)
    b = np.repeat((7 + grad_base * 14).astype(np.float32), w, axis=1)

    fold1 = np.sin(x_coords * 7.5 + y_coords * 3.2) * 0.5 + 0.5
    fold2 = np.cos(x_coords * 13.0 - y_coords * 4.2) * 0.5 + 0.5
    satin_sheen = (fold1 * 0.65 + fold2 * 0.35) ** 2.2
    r += satin_sheen * 24.0
    g += satin_sheen * 4.0
    b += satin_sheen * 6.0

    dist_sq = ((x_coords - 0.5) ** 2 * 1.5 + (y_coords - 0.44) ** 2) / (0.52 ** 2)
    center_glow = np.clip(1.0 - dist_sq, 0.0, 1.0) ** 1.7
    r += center_glow * 30.0
    g += center_glow * 9.0
    b += center_glow * 10.0

    row_id = np.floor(y_coords * 8.5)
    x_stag = x_coords * 4.8 + (row_id % 2) * 0.5
    fx = (x_stag) % 1.0 - 0.5
    fy = (y_coords * 8.5) % 1.0 - 0.5
    r_d = np.sqrt(fx ** 2 * 1.25 + fy ** 2)
    theta = np.arctan2(fy, fx * 1.1)

    petals1 = np.cos(8 * theta) * 0.12 + 0.22
    petals2 = np.cos(16 * theta) * 0.06 + 0.14
    bloom1 = np.clip(1.0 - np.abs(r_d - petals1) / 0.065, 0.0, 1.0)
    bloom2 = np.clip(1.0 - np.abs(r_d - petals2) / 0.05, 0.0, 1.0)
    bloom_core = np.clip(1.0 - r_d / 0.075, 0.0, 1.0)
    peony_damask = np.maximum(np.maximum(bloom1 * 0.65, bloom2 * 0.85), bloom_core * 0.95)

    r += peony_damask * 16.0
    g += peony_damask * 8.5
    b += peony_damask * 3.0

    twill = (np.sin((x_coords * w + y_coords * h) * 0.65) * np.cos((x_coords * w - y_coords * h) * 0.65)) * 2.2
    r += twill
    g += twill * 0.5
    b += twill * 0.5

    np.random.seed(42)
    noise = np.random.normal(0.0, 2.1, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise * 0.6, 0, 255).astype(np.uint8)
    b = np.clip(b + noise * 0.6, 0, 255).astype(np.uint8)

    img = Image.fromarray(np.dstack([r, g, b]), mode='RGB')
    draw = ImageDraw.Draw(img, 'RGBA')

    np.random.seed(888)
    for _ in range(320):
        px = np.random.randint(15, w - 15)
        py = np.random.randint(30, h - 30)
        alpha = np.random.randint(35, 175)
        gold_color = (212, 175, 55, alpha) if np.random.rand() > 0.3 else (243, 215, 130, alpha)
        draw.point((px, py), fill=gold_color)

    for _ in range(35):
        px = np.random.randint(50, w - 50)
        py = np.random.randint(80, h - 80)
        radius = np.random.uniform(4.0, 16.0)
        draw.ellipse([px - radius, py - radius, px + radius, py + radius], fill=(235, 200, 110, 12))

    bloom = img.filter(ImageFilter.GaussianBlur(radius=1.8))
    img = Image.blend(img, bloom, 0.18)

    out_path = os.path.join(OUTPUT_DIR, 'bg-cover.webp')
    img.save(out_path, 'WEBP', quality=87, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB, size {img.size})")

def generate_bg_stage():
    print("Generating bg-stage.webp (1080x1920)...")
    w, h = 1080, 1920
    y_coords = np.linspace(0, 1, h)[:, None]
    x_coords = np.linspace(0, 1, w)[None, :]

    y_fade = y_coords ** 1.05
    r = (7 + y_fade * 52).astype(np.float32)
    g = (22 + (1.0 - np.abs(y_coords - 0.32) * 2.2).clip(0, 1) * 28 - y_fade * 15).astype(np.float32)
    b = (16 + (1.0 - np.abs(y_coords - 0.28) * 2.2).clip(0, 1) * 22 - y_fade * 12).astype(np.float32)

    r = np.repeat(r, w, axis=1)
    g = np.repeat(g, w, axis=1)
    b = np.repeat(b, w, axis=1)

    moon_dist = np.sqrt((x_coords - 0.5) ** 2 * 1.5 + (y_coords - 0.28) ** 2)
    moon_glow = np.clip(1.0 - moon_dist / 0.52, 0.0, 1.0) ** 2.2
    r += moon_glow * 34.0
    g += moon_glow * 36.0
    b += moon_glow * 28.0

    lanterns = [(220, 420, 240), (860, 420, 240), (540, 290, 180)]
    for lx, ly, lrad in lanterns:
        lx_norm, ly_norm = lx / w, ly / h
        l_dist_sq = ((x_coords - lx_norm) ** 2 * (w / h) ** 2 + (y_coords - ly_norm) ** 2)
        l_glow = np.exp(-l_dist_sq / (lrad / h) ** 2)
        r += l_glow * 78.0
        g += l_glow * 40.0
        b += l_glow * 9.0

    mist_mask = np.clip((y_coords - 0.74) / 0.26, 0.0, 1.0) ** 1.8
    mist_waves = (np.sin(x_coords * 7.5 + y_coords * 5.5) * 0.5 + 0.5) * mist_mask
    r += mist_waves * 20.0
    g += mist_waves * 16.0
    b += mist_waves * 14.0

    np.random.seed(101)
    noise = np.random.normal(0.0, 2.2, (h, w))
    r = np.clip(r + noise, 0, 255).astype(np.uint8)
    g = np.clip(g + noise * 0.6, 0, 255).astype(np.uint8)
    b = np.clip(b + noise * 0.6, 0, 255).astype(np.uint8)

    img = Image.fromarray(np.dstack([r, g, b]), mode='RGB')
    draw = ImageDraw.Draw(img, 'RGBA')

    pagoda_color = (8, 24, 18, 185)
    draw.polygon([(460, 520), (540, 460), (620, 520), (600, 525), (540, 490), (480, 525)], fill=pagoda_color)
    draw.polygon([(475, 465), (540, 415), (605, 465), (590, 470), (540, 440), (490, 470)], fill=pagoda_color)
    draw.line([(540, 415), (540, 385)], fill=(212, 175, 55, 160), width=2)
    draw.ellipse([538, 383, 542, 387], fill=(212, 175, 55, 210))

    bamboo_color = (6, 19, 14, 210)
    for bx, by_start, b_len in [(70, 90, 460), (120, 50, 390), (35, 170, 330)]:
        draw.line([(bx, by_start), (bx + 20, by_start + b_len)], fill=bamboo_color, width=4)
        for ny in range(by_start, by_start + b_len, 65):
            draw.line([(bx - 5 + (ny - by_start) * 20 // b_len, ny), (bx + 25 + (ny - by_start) * 20 // b_len, ny)], fill=bamboo_color, width=2)
            draw.polygon([(bx + 15, ny), (bx + 58, ny + 16), (bx + 20, ny + 8)], fill=bamboo_color)
            draw.polygon([(bx + 10, ny), (bx + 50, ny - 10), (bx + 18, ny - 4)], fill=bamboo_color)

    for bx, by_start, b_len in [(1010, 70, 430), (960, 110, 370), (1045, 190, 310)]:
        draw.line([(bx, by_start), (bx - 20, by_start + b_len)], fill=bamboo_color, width=4)
        for ny in range(by_start, by_start + b_len, 65):
            draw.line([(bx - 25 - (ny - by_start) * 20 // b_len, ny), (bx + 5 - (ny - by_start) * 20 // b_len, ny)], fill=bamboo_color, width=2)
            draw.polygon([(bx - 15, ny), (bx - 58, ny + 16), (bx - 20, ny + 8)], fill=bamboo_color)
            draw.polygon([(bx - 10, ny), (bx - 50, ny - 10), (bx - 18, ny - 4)], fill=bamboo_color)

    for lx, ly, lrad in lanterns:
        draw.line([(lx, 0), (lx, ly - 55)], fill=(180, 140, 40, 220), width=2)
        draw.polygon([(lx - 25, ly - 55), (lx + 25, ly - 55), (lx + 15, ly - 45), (lx - 15, ly - 45)], fill=(212, 175, 55, 240))
        draw.ellipse([lx - 42, ly - 45, lx + 42, ly + 45], fill=(168, 20, 32, 235), outline=(212, 175, 55, 240), width=2)
        draw.ellipse([lx - 22, ly - 30, lx + 22, ly + 30], fill=(255, 185, 65, 245))
        draw.ellipse([lx - 10, ly - 18, lx + 10, ly + 18], fill=(255, 245, 175, 255))
        draw.arc([lx - 30, ly - 45, lx + 30, ly + 45], 0, 360, fill=(212, 175, 55, 210), width=1)
        draw.line([(lx, ly - 45), (lx, ly + 45)], fill=(212, 175, 55, 230), width=1)
        draw.polygon([(lx - 15, ly + 45), (lx + 15, ly + 45), (lx + 22, ly + 52), (lx - 22, ly + 52)], fill=(212, 175, 55, 240))
        draw.ellipse([lx - 5, ly + 54, lx + 5, ly + 62], fill=(212, 175, 55, 255))
        for tx in range(lx - 8, lx + 9, 2):
            draw.line([(tx, ly + 62), (tx + (tx - lx) // 2, ly + 115)], fill=(205, 35, 42, 225), width=1)
            draw.line([(tx, ly + 105), (tx, ly + 120)], fill=(212, 175, 55, 210), width=1)

    lattice_color = (22, 6, 9, 245)
    gold_edge = (212, 175, 55, 130)
    draw.rectangle([0, 0, 100, h], fill=lattice_color)
    draw.line([(100, 0), (100, h)], fill=gold_edge, width=2)
    draw.rectangle([980, 0, 1080, h], fill=lattice_color)
    draw.line([(980, 0), (980, h)], fill=gold_edge, width=2)

    for y_box in range(35, h - 60, 85):
        draw.rectangle([15, y_box, 85, y_box + 70], outline=gold_edge, width=1)
        draw.rectangle([25, y_box + 10, 75, y_box + 60], outline=gold_edge, width=1)
        draw.line([(15, y_box + 35), (85, y_box + 35)], fill=gold_edge, width=1)
        draw.line([(50, y_box), (50, y_box + 70)], fill=gold_edge, width=1)
        draw.rectangle([995, y_box, 1065, y_box + 70], outline=gold_edge, width=1)
        draw.rectangle([1005, y_box + 10, 1055, y_box + 60], outline=gold_edge, width=1)
        draw.line([(995, y_box + 35), (1065, y_box + 35)], fill=gold_edge, width=1)
        draw.line([(1030, y_box), (1030, y_box + 70)], fill=gold_edge, width=1)

    np.random.seed(999)
    for _ in range(130):
        px = np.random.randint(110, w - 110)
        py = np.random.randint(180, h - 140)
        rad = np.random.randint(1, 4)
        draw.ellipse([px - rad, py - rad, px + rad, py + rad], fill=(255, 218, 105, np.random.randint(70, 220)))

    bloom = img.filter(ImageFilter.GaussianBlur(radius=2.0))
    img = Image.blend(img, bloom, 0.18)

    out_path = os.path.join(OUTPUT_DIR, 'bg-stage.webp')
    img.save(out_path, 'WEBP', quality=86, method=6)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB, size {img.size})")

def generate_moon_gate():
    print("Generating moon-gate.svg (800x800)...")
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="gateGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF2" />
      <stop offset="25%" stop-color="#FCEAB3" />
      <stop offset="55%" stop-color="#D4AF37" />
      <stop offset="85%" stop-color="#A88124" />
      <stop offset="100%" stop-color="#6E500F" />
    </linearGradient>
    <linearGradient id="gateJade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1D5440" />
      <stop offset="50%" stop-color="#0F2E22" />
      <stop offset="100%" stop-color="#071912" />
    </linearGradient>
    <linearGradient id="gateCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9E1824" />
      <stop offset="50%" stop-color="#680C14" />
      <stop offset="100%" stop-color="#380408" />
    </linearGradient>
    <filter id="gateGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#D4AF37" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#FCEAB3" flood-opacity="0.2" />
    </filter>
  </defs>
  <g id="moon-gate-main" filter="url(#gateGlow)">
    <path d="M 50,110 Q 220,135 400,135 Q 580,135 750,110 Q 770,95 780,75 Q 755,100 730,118 Q 570,145 400,145 Q 230,145 70,118 Q 45,100 20,75 Q 30,95 50,110 Z" fill="url(#gateGold)" stroke="#6E500F" stroke-width="1.5" />
    <path d="M 80,128 Q 235,152 400,152 Q 565,152 720,128 L 710,148 Q 560,170 400,170 Q 240,170 90,148 Z" fill="url(#gateJade)" stroke="url(#gateGold)" stroke-width="1.2" />
    <rect x="110" y="170" width="580" height="28" rx="4" fill="url(#gateCrimson)" stroke="url(#gateGold)" stroke-width="2" />
    <rect x="330" y="174" width="140" height="20" rx="3" fill="url(#gateGold)" stroke="#6E500F" stroke-width="1" />
    <circle cx="342" cy="184" r="3.5" fill="#680C14" />
    <circle cx="458" cy="184" r="3.5" fill="#680C14" />
    <circle cx="400" cy="184" r="4.5" fill="#680C14" />
    <circle cx="400" cy="460" r="292" fill="none" stroke="url(#gateGold)" stroke-width="14" />
    <circle cx="400" cy="460" r="280" fill="none" stroke="url(#gateGold)" stroke-width="2" stroke-dasharray="3, 8" />
    <circle cx="400" cy="460" r="270" fill="none" stroke="url(#gateJade)" stroke-width="6" />
    <circle cx="400" cy="460" r="260" fill="none" stroke="url(#gateGold)" stroke-width="3.5" />
    <g stroke="url(#gateGold)" stroke-width="1.5" fill="none" opacity="0.85">
      <line x1="60" y1="198" x2="60" y2="720" />
      <line x1="60" y1="720" x2="160" y2="720" />
      <polyline points="60,240 100,240 100,280 60,280" />
      <polyline points="100,280 140,280 140,320 100,320" />
      <polyline points="60,320 100,320 100,360 60,360" />
      <polyline points="60,400 100,400 100,440 60,440" />
      <polyline points="60,480 100,480 100,520 60,520" />
      <polyline points="60,560 100,560 100,600 60,600" />
      <polyline points="60,640 100,640 100,680 60,680" />
      <line x1="60" y1="210" x2="110" y2="260" />
      <line x1="60" y1="290" x2="110" y2="340" />
      <line x1="60" y1="370" x2="110" y2="420" />
      <line x1="60" y1="450" x2="110" y2="500" />
      <line x1="60" y1="530" x2="110" y2="580" />
      <line x1="60" y1="610" x2="110" y2="660" />
    </g>
    <g stroke="url(#gateGold)" stroke-width="1.5" fill="none" opacity="0.85">
      <line x1="740" y1="198" x2="740" y2="720" />
      <line x1="640" y1="720" x2="740" y2="720" />
      <polyline points="740,240 700,240 700,280 740,280" />
      <polyline points="700,280 660,280 660,320 700,320" />
      <polyline points="740,320 700,320 700,360 740,360" />
      <polyline points="740,400 700,400 700,440 740,440" />
      <polyline points="740,480 700,480 700,520 740,520" />
      <polyline points="740,560 700,560 700,600 740,600" />
      <polyline points="740,640 700,640 700,680 740,680" />
      <line x1="740" y1="210" x2="690" y2="260" />
      <line x1="740" y1="290" x2="690" y2="340" />
      <line x1="740" y1="370" x2="690" y2="420" />
      <line x1="740" y1="450" x2="690" y2="500" />
      <line x1="740" y1="530" x2="690" y2="580" />
      <line x1="740" y1="610" x2="690" y2="660" />
    </g>
    <path d="M 230,225 C 210,210 180,215 175,235 C 170,255 195,265 210,255 C 220,270 245,270 255,255 C 265,240 250,225 230,225 Z" fill="url(#gateGold)" stroke="#6E500F" stroke-width="1.2" />
    <path d="M 230,225 C 220,235 200,240 185,238" fill="none" stroke="#6E500F" stroke-width="1" />
    <path d="M 570,225 C 590,210 620,215 625,235 C 630,255 605,265 590,255 C 580,270 555,270 545,255 C 535,240 550,225 570,225 Z" fill="url(#gateGold)" stroke="#6E500F" stroke-width="1.2" />
    <path d="M 570,225 C 580,235 600,240 615,238" fill="none" stroke="#6E500F" stroke-width="1" />
    <g stroke="url(#gateGold)" stroke-width="1.6" fill="none">
      <path d="M 280,198 Q 320,218 350,238 Q 370,252 385,278" />
      <path d="M 330,224 Q 352,212 376,218" />
    </g>
    <g fill="#FAF7F0" stroke="url(#gateGold)" stroke-width="0.8">
      <circle cx="343" cy="232" r="4" />
      <circle cx="355" cy="232" r="4" />
      <circle cx="341" cy="242" r="4" />
      <circle cx="357" cy="242" r="4" />
      <circle cx="349" cy="246" r="4" />
      <circle cx="349" cy="238" r="3" fill="url(#gateCrimson)" />
      <circle cx="374" cy="214" r="4" fill="#FAF7F0" />
      <circle cx="384" cy="276" r="3.5" fill="#FAF7F0" />
    </g>
    <rect x="90" y="720" width="620" height="30" rx="4" fill="url(#gateJade)" stroke="url(#gateGold)" stroke-width="2" />
    <rect x="60" y="750" width="680" height="18" rx="2" fill="url(#gateGold)" />
  </g>
</svg>"""
    ET.fromstring(svg)
    out_path = os.path.join(OUTPUT_DIR, "moon-gate.svg")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

def generate_shuang_xi_seal():
    print("Generating shuang-xi-seal.svg (600x600)...")
    beads_xml = []
    for i in range(36):
        ang = i * (2 * math.pi / 36)
        bx = 300 + 265 * math.cos(ang)
        by = 300 + 265 * math.sin(ang)
        beads_xml.append(f'<circle cx="{bx:.2f}" cy="{by:.2f}" r="3.5" fill="url(#sealGold)" />')
    beads_str = "\n    ".join(beads_xml)

    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="sealGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF2" />
      <stop offset="25%" stop-color="#FCEAB3" />
      <stop offset="55%" stop-color="#D4AF37" />
      <stop offset="85%" stop-color="#A88124" />
      <stop offset="100%" stop-color="#6E500F" />
    </linearGradient>
    <radialGradient id="vermilionField" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8F141E" />
      <stop offset="65%" stop-color="#680C14" />
      <stop offset="100%" stop-color="#380408" />
    </radialGradient>
    <filter id="sealGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#D4AF37" flood-opacity="0.35" />
    </filter>
  </defs>
  <g id="shuang-xi-seal-main" filter="url(#sealGlow)">
    <circle cx="300" cy="300" r="282" fill="url(#vermilionField)" stroke="url(#sealGold)" stroke-width="4" />
    <circle cx="300" cy="300" r="272" fill="none" stroke="url(#sealGold)" stroke-width="1.5" />
    <circle cx="300" cy="300" r="258" fill="none" stroke="url(#sealGold)" stroke-width="1.8" />
    {beads_str}
    <circle cx="300" cy="300" r="248" fill="none" stroke="url(#sealGold)" stroke-width="2.5" stroke-dasharray="10, 6" />
    <circle cx="300" cy="300" r="238" fill="none" stroke="url(#sealGold)" stroke-width="1.2" />
    <circle cx="300" cy="300" r="228" fill="none" stroke="url(#sealGold)" stroke-width="3.5" />
    <g transform="translate(55, 275)" fill="url(#sealGold)" opacity="0.9">
      <path d="M 35,25 C 20,10 5,20 2,35 C -2,50 15,60 30,50 C 40,65 65,65 75,50 C 85,35 70,20 50,20 C 45,10 30,10 25,20 Z" />
      <circle cx="25" cy="35" r="4" fill="#680C14" />
    </g>
    <g transform="translate(470, 275)" fill="url(#sealGold)" opacity="0.9">
      <path d="M 40,25 C 55,10 70,20 73,35 C 77,50 60,60 45,50 C 35,65 10,65 0,50 C -10,35 5,20 25,20 C 30,10 45,10 50,20 Z" />
      <circle cx="50" cy="35" r="4" fill="#680C14" />
    </g>
    <g id="shuang-xi-glyph" fill="url(#sealGold)" stroke="#6E500F" stroke-width="0.8">
      <rect x="204" y="168" width="76" height="10" rx="2.5" />
      <rect x="237" y="158" width="10" height="48" rx="2.5" />
      <rect x="210" y="206" width="64" height="10" rx="2.5" />
      <path d="M 210,228 L 274,228 L 274,268 L 210,268 Z M 219,237 L 219,259 L 265,259 L 265,237 Z" fill-rule="evenodd" />
      <rect x="237" y="302" width="10" height="36" rx="2.5" />
      <rect x="202" y="338" width="80" height="10" rx="2.5" />
      <path d="M 206,358 L 278,358 L 278,402 L 206,402 Z M 216,368 L 216,392 L 268,392 L 268,368 Z" fill-rule="evenodd" />
      <rect x="198" y="414" width="88" height="11" rx="3" />
      <rect x="320" y="168" width="76" height="10" rx="2.5" />
      <rect x="353" y="158" width="10" height="48" rx="2.5" />
      <rect x="326" y="206" width="64" height="10" rx="2.5" />
      <path d="M 326,228 L 390,228 L 390,268 L 326,268 Z M 335,237 L 335,259 L 381,259 L 381,237 Z" fill-rule="evenodd" />
      <rect x="353" y="302" width="10" height="36" rx="2.5" />
      <rect x="318" y="338" width="80" height="10" rx="2.5" />
      <path d="M 322,358 L 394,358 L 394,402 L 322,402 Z M 332,368 L 332,392 L 384,392 L 384,368 Z" fill-rule="evenodd" />
      <rect x="314" y="414" width="88" height="11" rx="3" />
      <rect x="175" y="288" width="250" height="12" rx="3" />
    </g>
    <path d="M 300,282 L 305,294 L 300,306 L 295,294 Z" fill="#FFFFFF" opacity="0.8" />
  </g>
</svg>"""
    ET.fromstring(svg)
    out_path = os.path.join(OUTPUT_DIR, "shuang-xi-seal.svg")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

def generate_peony_corner():
    print("Generating peony-corner.svg (500x500)...")
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <defs>
    <linearGradient id="peonyGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF2" />
      <stop offset="25%" stop-color="#FCEAB3" />
      <stop offset="55%" stop-color="#D4AF37" />
      <stop offset="85%" stop-color="#A88124" />
      <stop offset="100%" stop-color="#6E500F" />
    </linearGradient>
    <linearGradient id="petalFill" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FFF9E6" stop-opacity="0.9" />
      <stop offset="60%" stop-color="#EED285" stop-opacity="0.7" />
      <stop offset="100%" stop-color="#C89E30" stop-opacity="0.85" />
    </linearGradient>
    <linearGradient id="leafJade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1D5440" stop-opacity="0.85" />
      <stop offset="100%" stop-color="#0F2E22" stop-opacity="0.95" />
    </linearGradient>
    <filter id="cornerGlow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#D4AF37" flood-opacity="0.4" />
    </filter>
  </defs>
  <g id="peony-corner-main" filter="url(#cornerGlow)">
    <path d="M 16,460 L 16,16 L 460,16" fill="none" stroke="url(#peonyGold)" stroke-width="2.5" />
    <path d="M 28,430 L 28,28 L 430,28" fill="none" stroke="url(#peonyGold)" stroke-width="1.2" stroke-dasharray="4, 6" />
    <rect x="10" y="10" width="12" height="12" fill="url(#peonyGold)" />
    <circle cx="16" cy="16" r="4" fill="#680C14" />
    <path d="M 28,28 C 65,40 90,80 95,120 C 100,160 80,190 60,210 C 45,225 30,220 35,240 C 40,260 70,270 95,255" fill="none" stroke="url(#peonyGold)" stroke-width="1.8" />
    <path d="M 28,28 C 40,65 80,90 120,95 C 160,100 190,80 210,60 C 225,45 220,30 240,35 C 260,40 270,70 255,95" fill="none" stroke="url(#peonyGold)" stroke-width="1.8" />
    <path d="M 160,70 C 190,50 240,55 260,75 C 240,95 210,105 180,95 C 165,115 140,110 135,95 Z" fill="url(#leafJade)" stroke="url(#peonyGold)" stroke-width="1.5" />
    <path d="M 160,70 Q 210,80 260,75" fill="none" stroke="url(#peonyGold)" stroke-width="1" />
    <path d="M 70,160 C 50,190 55,240 75,260 C 95,240 105,210 95,180 C 115,165 110,140 95,135 Z" fill="url(#leafJade)" stroke="url(#peonyGold)" stroke-width="1.5" />
    <path d="M 70,160 Q 80,210 75,260" fill="none" stroke="url(#peonyGold)" stroke-width="1" />
    <path d="M 280,240 C 320,230 360,250 375,280 C 350,300 315,295 290,275 Z" fill="url(#leafJade)" stroke="url(#peonyGold)" stroke-width="1.5" />
    <g transform="translate(340, 110)" stroke="url(#peonyGold)" stroke-width="1.4" fill="url(#petalFill)">
      <path d="M 0,0 C 10,-35 25,-45 20,-55 C 12,-45 0,-30 0,0 Z" />
      <path d="M 0,0 C 30,-25 45,-30 48,-42 C 38,-35 20,-20 0,0 Z" />
      <path d="M 0,0 C 35,0 55,-5 60,-15 C 48,-12 30,-5 0,0 Z" />
      <path d="M 0,0 C 35,15 50,25 52,38 C 42,30 25,12 0,0 Z" />
      <path d="M 0,0 C 20,30 30,45 25,56 C 18,44 10,25 0,0 Z" />
      <path d="M 0,0 C -5,35 -5,55 -15,60 C -12,48 -5,30 0,0 Z" />
      <path d="M 0,0 C -25,25 -40,35 -45,45 C -38,32 -20,18 0,0 Z" />
      <path d="M 0,0 C -35,5 -50,5 -56,-5 C -44,-2 -25,0 0,0 Z" />
      <path d="M 0,0 C -30,-20 -40,-35 -38,-48 C -30,-35 -15,-15 0,0 Z" />
      <circle cx="0" cy="0" r="8" fill="url(#peonyGold)" />
    </g>
    <g transform="translate(110, 340)">
      <path d="M 0,0 C -25,20 -20,50 0,65 C 20,50 25,20 0,0 Z" fill="url(#petalFill)" stroke="url(#peonyGold)" stroke-width="1.6" />
      <path d="M -15,15 C -28,30 -22,52 -5,58" fill="none" stroke="url(#leafJade)" stroke-width="2.2" />
      <path d="M 15,15 C 28,30 22,52 5,58" fill="none" stroke="url(#leafJade)" stroke-width="2.2" />
      <circle cx="0" cy="35" r="5" fill="url(#peonyGold)" />
    </g>
    <g transform="translate(215, 215)">
      <g stroke="url(#peonyGold)" stroke-width="1.6" fill="url(#petalFill)">
        <path d="M 0,-30 C -45,-85 -75,-65 -85,-35 C -95,-5 -70,10 0,0 Z" />
        <path d="M 0,-30 C 45,-85 75,-65 85,-35 C 95,-5 70,10 0,0 Z" />
        <path d="M 30,0 C 85,-45 95,-10 85,35 C 75,70 40,55 0,0 Z" />
        <path d="M 20,20 C 65,65 35,95 -5,95 C -45,95 -55,65 0,0 Z" />
        <path d="M -20,20 C -65,65 -95,35 -85,-10 C -75,-45 -40,-20 0,0 Z" />
        <path d="M -15,-20 C -55,-65 -30,-90 0,-85 C 30,-80 40,-55 0,0 Z" />
        <path d="M 0,25 C 25,75 55,80 70,55 C 80,30 50,15 0,0 Z" />
        <path d="M -25,0 C -75,25 -80,55 -55,70 C -30,80 -15,50 0,0 Z" />
      </g>
      <g stroke="url(#peonyGold)" stroke-width="1.4" fill="url(#peonyGold)" opacity="0.85">
        <path d="M 0,-15 C -25,-55 -50,-35 -45,-15 C -40,5 -20,10 0,0 Z" />
        <path d="M 0,-15 C 25,-55 50,-35 45,-15 C 40,5 20,10 0,0 Z" />
        <path d="M 15,0 C 45,-25 50,10 35,35 C 20,50 10,25 0,0 Z" />
        <path d="M 0,15 C 25,45 -5,55 -25,45 C -40,35 -20,20 0,0 Z" />
        <path d="M -15,0 C -45,-20 -50,15 -35,35 C -20,45 -10,25 0,0 Z" />
      </g>
      <g stroke="#6E500F" stroke-width="1.2" fill="#FAF7F0" opacity="0.95">
        <path d="M -12,-8 C -22,-24 -5,-28 0,-18 C 5,-28 22,-24 12,-8 C 18,5 5,16 0,10 C -5,16 -18,5 -12,-8 Z" />
      </g>
      <circle cx="0" cy="0" r="6" fill="url(#peonyGold)" />
      <g fill="#FAF7F0">
        <circle cx="-8" cy="-5" r="2" />
        <circle cx="8" cy="-5" r="2" />
        <circle cx="-6" cy="6" r="2" />
        <circle cx="6" cy="6" r="2" />
        <circle cx="0" cy="-9" r="2.2" />
        <circle cx="0" cy="9" r="2.2" />
        <circle cx="-10" cy="1" r="1.8" />
        <circle cx="10" cy="1" r="1.8" />
      </g>
    </g>
  </g>
</svg>"""
    ET.fromstring(svg)
    out_path = os.path.join(OUTPUT_DIR, "peony-corner.svg")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")

def generate_lattice_divider():
    print("Generating lattice-divider.svg (800x60)...")
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 60" width="800" height="60">
  <defs>
    <linearGradient id="divGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF2" />
      <stop offset="25%" stop-color="#FCEAB3" />
      <stop offset="55%" stop-color="#D4AF37" />
      <stop offset="85%" stop-color="#A88124" />
      <stop offset="100%" stop-color="#6E500F" />
    </linearGradient>
    <radialGradient id="rubyCore" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#9E1824" />
      <stop offset="60%" stop-color="#680C14" />
      <stop offset="100%" stop-color="#300306" />
    </radialGradient>
    <filter id="divGlow" x="-10%" y="-30%" width="120%" height="160%">
      <feDropShadow dx="0" dy="1" stdDeviation="3" flood-color="#D4AF37" flood-opacity="0.4" />
    </filter>
  </defs>
  <g id="lattice-divider-main" filter="url(#divGlow)">
    <rect x="386" y="16" width="28" height="28" rx="3" transform="rotate(45, 400, 30)" fill="none" stroke="url(#divGold)" stroke-width="2.5" />
    <rect x="391" y="21" width="18" height="18" rx="2" transform="rotate(45, 400, 30)" fill="none" stroke="url(#divGold)" stroke-width="1.2" />
    <circle cx="400" cy="30" r="5.5" fill="url(#rubyCore)" stroke="url(#divGold)" stroke-width="1.2" />
    <circle cx="398" cy="28" r="1.5" fill="#FFFFFF" opacity="0.8" />
    <path d="M 380,30 C 375,22 365,22 360,27 C 355,32 362,38 370,35" fill="none" stroke="url(#divGold)" stroke-width="1.5" />
    <path d="M 420,30 C 425,22 435,22 440,27 C 445,32 438,38 430,35" fill="none" stroke="url(#divGold)" stroke-width="1.5" />
    <g stroke="url(#divGold)" stroke-width="1.6" fill="none">
      <polyline points="350,30 335,30 335,22 320,22 320,38 305,38 305,22 290,22 290,38 275,38 275,22 260,22 260,38 245,38 245,22 230,22 230,38 215,38 215,30 200,30" />
      <line x1="320" y1="30" x2="305" y2="30" />
      <line x1="290" y1="30" x2="275" y2="30" />
      <line x1="260" y1="30" x2="245" y2="30" />
      <line x1="230" y1="30" x2="215" y2="30" />
    </g>
    <g stroke="url(#divGold)" stroke-width="1.6" fill="none">
      <polyline points="450,30 465,30 465,22 480,22 480,38 495,38 495,22 510,22 510,38 525,38 525,22 540,22 540,38 555,38 555,22 570,22 570,38 585,38 585,30 600,30" />
      <line x1="480" y1="30" x2="495" y2="30" />
      <line x1="510" y1="30" x2="525" y2="30" />
      <line x1="540" y1="30" x2="555" y2="30" />
      <line x1="570" y1="30" x2="585" y2="30" />
    </g>
    <line x1="200" y1="27" x2="65" y2="27" stroke="url(#divGold)" stroke-width="1.2" />
    <line x1="200" y1="33" x2="65" y2="33" stroke="url(#divGold)" stroke-width="1.2" />
    <circle cx="100" cy="30" r="2.5" fill="url(#divGold)" />
    <circle cx="140" cy="30" r="2" fill="url(#divGold)" />
    <line x1="600" y1="27" x2="735" y2="27" stroke="url(#divGold)" stroke-width="1.2" />
    <line x1="600" y1="33" x2="735" y2="33" stroke="url(#divGold)" stroke-width="1.2" />
    <circle cx="700" cy="30" r="2.5" fill="url(#divGold)" />
    <circle cx="660" cy="30" r="2" fill="url(#divGold)" />
    <rect x="55" y="25" width="10" height="10" rx="1.5" transform="rotate(45, 60, 30)" fill="url(#divGold)" />
    <circle cx="45" cy="30" r="3" fill="url(#divGold)" />
    <circle cx="36" cy="30" r="2" fill="url(#divGold)" />
    <circle cx="29" cy="30" r="1.2" fill="url(#divGold)" />
    <rect x="735" y="25" width="10" height="10" rx="1.5" transform="rotate(45, 740, 30)" fill="url(#divGold)" />
    <circle cx="755" cy="30" r="3" fill="url(#divGold)" />
    <circle cx="764" cy="30" r="2" fill="url(#divGold)" />
    <circle cx="771" cy="30" r="1.2" fill="url(#divGold)" />
  </g>
</svg>"""
    ET.fromstring(svg)
    out_path = os.path.join(OUTPUT_DIR, "lattice-divider.svg")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Exported: {out_path} ({os.path.getsize(out_path)/1024:.1f} KB)")


def verify_all_assets():
    print("\n" + "="*80)
    print("VERIFIKASI SEMUA ASET ROYAL CHINOISERIE SILK")
    print("="*80)

    expected_assets = [
        ("bg-cover.webp", "WEBP", (1080, 1920), 25.0, 100.0),
        ("bg-stage.webp", "WEBP", (1080, 1920), 25.0, 100.0),
        ("moon-gate.svg", "SVG", None, 1.0, 50.0),
        ("shuang-xi-seal.svg", "SVG", None, 1.0, 50.0),
        ("peony-corner.svg", "SVG", None, 1.0, 50.0),
        ("lattice-divider.svg", "SVG", None, 1.0, 50.0),
    ]

    print(f"{'File Name':<22} | {'Type':<5} | {'Dimensions':<12} | {'Weight (KB)':<11} | {'Status'}")
    print("-" * 80)

    all_passed = True
    for fname, ftype, expected_dim, min_kb, max_kb in expected_assets:
        fpath = os.path.join(OUTPUT_DIR, fname)
        if not os.path.exists(fpath):
            print(f"{fname:<22} | {ftype:<5} | MISSING FILE!")
            all_passed = False
            continue

        size_kb = os.path.getsize(fpath) / 1024.0
        size_ok = min_kb <= size_kb <= max_kb

        if ftype == "WEBP":
            im = Image.open(fpath)
            dim_str = f"{im.size[0]}x{im.size[1]}"
            dim_ok = (im.size == expected_dim)
            extrema = im.getextrema()
            is_blank = all(e == (0, 0) for e in extrema)
            status = "PASSED (Non-zero extrema)" if (dim_ok and size_ok and not is_blank) else "FAILED CHECKS"
            if not (dim_ok and size_ok and not is_blank):
                all_passed = False
        else:
            dim_str = "Vector"
            try:
                ET.parse(fpath)
                xml_ok = True
            except Exception:
                xml_ok = False
            status = "PASSED (Valid XML)" if (size_ok and xml_ok) else "FAILED XML CHECKS"
            if not (size_ok and xml_ok):
                all_passed = False

        print(f"{fname:<22} | {ftype:<5} | {dim_str:<12} | {size_kb:8.1f} KB | {status}")

    print("-" * 80)
    print("RESULT:", "ALL 6 ASSETS VERIFIED & READY FOR PRODUCTION!" if all_passed else "SOME ASSETS FAILED")
    return all_passed


if __name__ == "__main__":
    generate_bg_cover()
    generate_bg_stage()
    generate_moon_gate()
    generate_shuang_xi_seal()
    generate_peony_corner()
    generate_lattice_divider()
    verify_all_assets()