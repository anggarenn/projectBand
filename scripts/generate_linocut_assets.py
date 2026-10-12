import os
import sys

# Ensure claude-drawing-skill/lib is in path
skill_lib = r"C:\Users\Ren\.gemini\config\skills\claude-drawing-skill\lib"
if skill_lib not in sys.path:
    sys.path.insert(0, skill_lib)

import numpy as np
from PIL import Image
from linocut import Linocut

def render_cover(out_path):
    print("Rendering Linocut Cover...")
    W, H = 1080, 1920
    # Obsidian black block with warm ivory paper cuts
    L = Linocut(W=W, H=H, block=(36, 36, W - 36, H - 36), seed=101, paper='#e4dbcb', ink='#0d0c0a', ss=2)
    gold = L.colour_block('#c89d3a', offset=(2, -2))

    # 1. Sky & Celestial elements
    sky = [(36, 36), (W - 36, 36), (W - 36, 950), (36, 950)]
    L.flow(sky, lambda x, y: 175 + 18 * np.sin(x / 75), n=280, length=(45, 230), width=(1.6, 3.8))
    L.moon(W // 2, 380, 135)
    L.speckle(sky, n=360, size=(1.8, 5.0))

    # 2. Distant Mountain (Merapi / Lawu)
    pts_mountain = [
        (36, 980), (180, 880), (360, 780), (W // 2, 680),
        (720, 790), (900, 890), (W - 36, 980), (W - 36, H - 36), (36, H - 36)
    ]
    poly_mountain = L.poly(pts_mountain, smooth=True)
    L.hatch(pts_mountain, angle=52, spacing=11, width=2.0, cut=False,
            bend=lambda x, y: 7 * np.sin(x / 90), density=lambda x, y: 0.55 if y < 980 else 0.2)
    L.clear(poly_mountain, chatter=0.32)
    # Gold peak line
    L.hatch(pts_mountain[:7], angle=45, spacing=15, width=2.4, cut=False, on=gold,
            density=lambda x, y: 0.45 if y < 820 else 0.05)

    # 3. Flanking Twin Candi Stupas (Left & Right)
    def draw_candi_shrine(cx, base_y, scale=1.0):
        w = 120 * scale
        h = 320 * scale
        pts_candi = [
            (cx - w * 0.5, base_y),
            (cx - w * 0.45, base_y - h * 0.35),
            (cx - w * 0.35, base_y - h * 0.65),
            (cx - w * 0.2, base_y - h * 0.85),
            (cx, base_y - h), # Stupa crown
            (cx + w * 0.2, base_y - h * 0.85),
            (cx + w * 0.35, base_y - h * 0.65),
            (cx + w * 0.45, base_y - h * 0.35),
            (cx + w * 0.5, base_y)
        ]
        poly_candi = L.poly(pts_candi, smooth=False)
        L.leave(poly_candi)
        L.hatch(pts_candi, angle=90, spacing=9, width=1.8, cut=True, density=lambda x, y: 0.4)
        # Gold crowning jewel
        L.disc(cx, base_y - h, 14 * scale)
        L.hatch([(cx - 20, base_y - h - 20), (cx + 20, base_y - h + 20)], angle=45, spacing=6, width=2.0, cut=False, on=gold)

    draw_candi_shrine(150, 1150, scale=0.9)
    draw_candi_shrine(W - 150, 1150, scale=0.9)

    # 4. Sacred Joglo Sinom Keraton Roof (Centerpiece)
    # Tier 1 (Apex Tajug)
    apex_x, apex_y = W // 2, 920
    roof_w1, roof_h1 = 340, 180
    pts_roof1 = [
        (apex_x - roof_w1 // 2, apex_y + roof_h1),
        (apex_x - 30, apex_y + 20),
        (apex_x, apex_y), # puncak mustaka
        (apex_x + 30, apex_y + 20),
        (apex_x + roof_w1 // 2, apex_y + roof_h1),
        (apex_x, apex_y + roof_h1 - 25)
    ]
    L.leave(L.poly(pts_roof1, smooth=False))
    L.hatch(pts_roof1, angle=40, spacing=10, width=2.2, cut=True, density=lambda x, y: 0.5)

    # Gold mustaka finial
    L.hatch([(apex_x - 40, apex_y - 20), (apex_x + 40, apex_y + 40)], angle=45, spacing=8, width=2.4, cut=False, on=gold)

    # Tier 2 (Middle Roof - Pananggap)
    roof_w2, roof_h2 = 560, 150
    base2_y = apex_y + roof_h1
    pts_roof2 = [
        (apex_x - roof_w2 // 2, base2_y + roof_h2),
        (apex_x - roof_w1 // 2 + 10, base2_y),
        (apex_x + roof_w1 // 2 - 10, base2_y),
        (apex_x + roof_w2 // 2, base2_y + roof_h2),
        (apex_x, base2_y + roof_h2 - 20)
    ]
    L.leave(L.poly(pts_roof2, smooth=False))
    L.hatch(pts_roof2, angle=-40, spacing=11, width=2.2, cut=True, density=lambda x, y: 0.45)

    # Tier 3 (Lower Roof Overhang - Penitih)
    roof_w3, roof_h3 = 760, 130
    base3_y = base2_y + roof_h2
    pts_roof3 = [
        (apex_x - roof_w3 // 2, base3_y + roof_h3),
        (apex_x - roof_w2 // 2 + 15, base3_y),
        (apex_x + roof_w2 // 2 - 15, base3_y),
        (apex_x + roof_w3 // 2, base3_y + roof_h3),
        (apex_x, base3_y + roof_h3 - 15)
    ]
    L.leave(L.poly(pts_roof3, smooth=False))
    L.hatch(pts_roof3, angle=40, spacing=12, width=2.2, cut=True, density=lambda x, y: 0.4)

    # Gold eaves rim
    L.hatch(pts_roof3, angle=0, spacing=14, width=2.2, cut=False, on=gold, density=lambda x, y: 0.3 if y > base3_y + roof_h3 - 25 else 0.0)

    # 5. Saka Guru Pillars (Columns holding pendopo)
    pillar_base_y = 1680
    pillar_top_y = base3_y + roof_h3
    col_xs = [apex_x - 220, apex_x - 80, apex_x + 80, apex_x + 220]
    for cx in col_xs:
        pts_col = [(cx - 16, pillar_top_y), (cx + 16, pillar_top_y), (cx + 18, pillar_base_y), (cx - 18, pillar_base_y)]
        L.leave(L.poly(pts_col))
        L.hatch(pts_col, angle=90, spacing=6, width=1.8, cut=True, density=lambda x, y: 0.4)
        # Gold carved capitols
        L.hatch([(cx - 20, pillar_top_y), (cx + 20, pillar_top_y + 45)], angle=45, spacing=6, width=2.2, cut=False, on=gold)

    # 6. Stone Courtyard & Stairs
    pts_ground = [(36, pillar_base_y), (W - 36, pillar_base_y), (W - 36, H - 36), (36, H - 36)]
    L.clear(L.poly(pts_ground), chatter=0.38)
    L.hatch(pts_ground, angle=0, spacing=18, width=2.4, cut=False,
            bend=lambda x, y: 5 * np.sin(x / 120), density=lambda x, y: 0.45)

    # Center stone balustrade lines
    for sy in range(pillar_base_y + 40, H - 60, 45):
        L.gouge([(160, sy), (W - 160, sy)], width=2.4, tool='knife', cut=False)

    # Signature in margin
    L.sign("1/1", "Kraton Nusantara Linocut", "Sikobokan 2026")

    # Save to WebP and PNG
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    temp_jpg = out_path.replace(".webp", ".jpg")
    L.save(temp_jpg)
    img = Image.open(temp_jpg)
    img.save(out_path, format="WEBP", quality=92, method=6)
    if os.path.exists(temp_jpg):
        os.remove(temp_jpg)
    print(f"Cover saved: {out_path} ({os.path.getsize(out_path) // 1024} KB)")

def render_stage(out_path):
    print("Rendering Linocut Stage...")
    W, H = 1080, 1920
    # Obsidian velvet block with spacious negative space
    L = Linocut(W=W, H=H, block=(36, 36, W - 36, H - 36), seed=202, paper='#e4dbcb', ink='#0d0c0a', ss=2)
    gold = L.colour_block('#c89d3a', offset=(2, -2))

    # 1. Framing Saka Guru Columns (Extreme Left & Right)
    # Left Grand Column
    left_col = [(36, 36), (190, 36), (190, H - 36), (36, H - 36)]
    L.leave(L.poly(left_col))
    L.hatch(left_col, angle=90, spacing=8, width=2.2, cut=True, density=lambda x, y: 0.42)
    # Carved wood relief motifs on column
    for y in range(120, H - 150, 140):
        L.hatch([(45, y), (180, y + 80)], angle=45, spacing=8, width=2.0, cut=False, on=gold)

    # Right Grand Column
    right_col = [(W - 190, 36), (W - 36, 36), (W - 36, H - 36), (W - 190, H - 36)]
    L.leave(L.poly(right_col))
    L.hatch(right_col, angle=90, spacing=8, width=2.2, cut=True, density=lambda x, y: 0.42)
    for y in range(120, H - 150, 140):
        L.hatch([(W - 180, y), (W - 45, y + 80)], angle=-45, spacing=8, width=2.0, cut=False, on=gold)

    # 2. Grand Overhead Pelmet & Valance (Ceiling Arch)
    ceiling_arch = [(190, 36), (W - 190, 36), (W - 190, 220), (W // 2, 160), (190, 220)]
    L.leave(L.poly(ceiling_arch))
    L.hatch(ceiling_arch, angle=0, spacing=10, width=2.0, cut=True, density=lambda x, y: 0.5)
    L.hatch(ceiling_arch, angle=45, spacing=12, width=2.4, cut=False, on=gold, density=lambda x, y: 0.35)

    # 3. Distant Mountain Peak through the Pendopo Opening (High up, leaving center clear)
    pts_dist_mount = [
        (190, 480), (W // 2, 340), (W - 190, 480), (W - 190, 600), (190, 600)
    ]
    L.hatch(pts_dist_mount, angle=55, spacing=14, width=1.8, cut=False,
            bend=lambda x, y: 6 * np.sin(x / 80), density=lambda x, y: 0.35)

    # 4. Subtle Distant Moon through Open Arch
    L.moon(W // 2, 280, 75, rings=(1.4, 1.8), shade=True)

    # 5. Grand Pendopo Floor at the bottom (y: 1560 to 1884)
    floor_pts = [(190, 1580), (W - 190, 1580), (W - 190, H - 36), (190, H - 36)]
    L.clear(L.poly(floor_pts), chatter=0.28)
    L.hatch(floor_pts, angle=0, spacing=20, width=2.2, cut=False,
            bend=lambda x, y: 4 * np.sin(x / 100), density=lambda x, y: 0.35)
    for fy in range(1620, H - 50, 50):
        L.gouge([(210, fy), (W - 210, fy)], width=2.0, tool='knife', cut=False)

    # Gold floor rim accent
    L.hatch(floor_pts, angle=45, spacing=16, width=2.0, cut=False, on=gold, density=lambda x, y: 0.2 if y > 1750 else 0.05)

    # Central negative space (y: 350 to 1550) is left intentionally clear obsidian for couple name / countdown contrast!

    L.sign("1/1", "Kraton Stage Linocut", "Sikobokan 2026")

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    temp_jpg = out_path.replace(".webp", ".jpg")
    L.save(temp_jpg)
    img = Image.open(temp_jpg)
    img.save(out_path, format="WEBP", quality=92, method=6)
    if os.path.exists(temp_jpg):
        os.remove(temp_jpg)
    print(f"Stage saved: {out_path} ({os.path.getsize(out_path) // 1024} KB)")

if __name__ == "__main__":
    out_dir = r"d:\Ren\Project Web\invitation-app\public\assets\motion-art-linocut"
    cover_file = os.path.join(out_dir, "bg-cover-linocut.webp")
    stage_file = os.path.join(out_dir, "bg-stage-linocut.webp")
    render_cover(cover_file)
    render_stage(stage_file)
    print("Done generating all linocut assets!")
