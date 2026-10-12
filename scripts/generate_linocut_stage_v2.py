import os
import sys

skill_lib = r"C:\Users\Ren\.gemini\config\skills\claude-drawing-skill\lib"
if skill_lib not in sys.path:
    sys.path.insert(0, skill_lib)

import numpy as np
from PIL import Image
from linocut import Linocut

def render_stage_v2(out_path):
    print("Rendering Master Linocut Stage v2...")
    W, H = 1080, 1920
    # Obsidian velvet linoleum block with warm ivory paper cuts
    L = Linocut(W=W, H=H, block=(36, 36, W - 36, H - 36), seed=404, paper='#e8decb', ink='#0c0b09', ss=2)
    gold = L.colour_block('#c89d3a', offset=(2, -2))

    # 1. Framing Saka Guru Columns (Left & Right Wings)
    # Left Grand Column
    left_col = [(36, 36), (180, 36), (180, H - 36), (36, H - 36)]
    L.leave(L.poly(left_col))
    L.hatch(left_col, angle=90, spacing=7, width=1.8, cut=True, density=lambda x, y: 0.45)
    # Carved wood relief motifs on column
    for y in range(80, H - 100, 120):
        L.hatch([(42, y), (174, y + 60)], angle=45, spacing=7, width=1.8, cut=False, on=gold)

    # Right Grand Column
    right_col = [(W - 180, 36), (W - 36, 36), (W - 36, H - 36), (W - 180, H - 36)]
    L.leave(L.poly(right_col))
    L.hatch(right_col, angle=90, spacing=7, width=1.8, cut=True, density=lambda x, y: 0.45)
    for y in range(80, H - 100, 120):
        L.hatch([(W - 174, y), (W - 42, y + 60)], angle=-45, spacing=7, width=1.8, cut=False, on=gold)

    # 2. Grand Pelmet Cornice (Ceiling Arch)
    ceiling_pts = [(180, 36), (W - 180, 36), (W - 180, 200), (W // 2, 140), (180, 200)]
    L.leave(L.poly(ceiling_pts))
    L.hatch(ceiling_pts, angle=0, spacing=9, width=2.0, cut=True, density=lambda x, y: 0.5)
    L.hatch(ceiling_pts, angle=45, spacing=10, width=2.2, cut=False, on=gold, density=lambda x, y: 0.35)

    # 3. Celestial Crescent Moon in Top Archway
    L.moon(W // 2, 280, 70, rings=(1.4, 1.8), shade=True)

    # 4. Subtle Distant Mountain Contours (Subtle in the Upper Sky)
    pts_bg_mount = [
        (180, 520), (W // 2, 410), (W - 180, 520), (W - 180, 680), (180, 680)
    ]
    L.hatch(pts_bg_mount, angle=55, spacing=14, width=1.8, cut=False,
            bend=lambda x, y: 6 * np.sin(x / 80), density=lambda x, y: 0.28)

    # 5. Grand Courtyard Floor at the Bottom (y: 1620 to 1884)
    floor_pts = [(180, 1640), (W - 180, 1640), (W - 180, H - 36), (180, H - 36)]
    L.clear(L.poly(floor_pts), chatter=0.25)
    L.hatch(floor_pts, angle=0, spacing=18, width=2.0, cut=False,
            bend=lambda x, y: 4 * np.sin(x / 90), density=lambda x, y: 0.32)
    for fy in range(1680, H - 40, 45):
        L.gouge([(190, fy), (W - 190, fy)], width=2.0, tool='knife', cut=False)

    # Gold floor rim accent
    L.hatch(floor_pts, angle=45, spacing=14, width=2.0, cut=False, on=gold, density=lambda x, y: 0.2 if y > 1760 else 0.05)

    # Central negative space (y: 350 to 1640) stays deep obsidian velvet for optimal contrast!

    # Signature in bottom margin
    L.sign("1/1", "Kraton Stage Proscenium", "Sikobokan 2026")
    L.chop(W - 80, H - 42)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    temp_jpg = out_path.replace(".webp", ".jpg")
    L.save(temp_jpg)
    img = Image.open(temp_jpg)
    img.save(out_path, format="WEBP", quality=92, method=6)
    if os.path.exists(temp_jpg):
        os.remove(temp_jpg)
    print(f"Stage v2 saved: {out_path} ({os.path.getsize(out_path) // 1024} KB)")

if __name__ == "__main__":
    out_dir = r"d:\Ren\Project Web\invitation-app\public\assets\motion-art-linocut"
    stage_file = os.path.join(out_dir, "bg-stage-linocut.webp")
    render_stage_v2(stage_file)
