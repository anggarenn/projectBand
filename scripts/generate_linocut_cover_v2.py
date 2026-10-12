import os
import sys

skill_lib = r"C:\Users\Ren\.gemini\config\skills\claude-drawing-skill\lib"
if skill_lib not in sys.path:
    sys.path.insert(0, skill_lib)

import numpy as np
from PIL import Image
from linocut import Linocut

def render_cover_v2(out_path):
    print("Rendering Master Linocut Cover v2...")
    W, H = 1080, 1920
    # Obsidian velvet linoleum block with warm ivory paper cuts
    L = Linocut(W=W, H=H, block=(36, 36, W - 36, H - 36), seed=303, paper='#e8decb', ink='#0c0b09', ss=2)
    gold = L.colour_block('#c89d3a', offset=(2, -2))

    # 1. Sky & Celestial Moon
    sky = [(36, 36), (W - 36, 36), (W - 36, 850), (36, 850)]
    L.flow(sky, lambda x, y: 180 + 16 * np.sin(x / 70), n=260, length=(40, 200), width=(1.6, 3.6))
    L.moon(W // 2, 330, 125, rings=(1.4, 1.8, 2.3), shade=True)
    L.speckle(sky, n=300, size=(1.8, 4.5))

    # 2. Distant Majestic Mountain Ridge (Merapi)
    pts_mountain = [
        (36, 920), (160, 830), (340, 740), (W // 2, 620),
        (740, 750), (920, 840), (W - 36, 920), (W - 36, H - 36), (36, H - 36)
    ]
    poly_mount = L.poly(pts_mountain, smooth=True)
    L.hatch(pts_mountain, angle=54, spacing=11, width=2.0, cut=False,
            bend=lambda x, y: 7 * np.sin(x / 85), density=lambda x, y: 0.55 if y < 920 else 0.15)
    L.clear(poly_mount, chatter=0.32)
    # Gold peak contour
    L.hatch(pts_mountain[:7], angle=45, spacing=14, width=2.2, cut=False, on=gold,
            density=lambda x, y: 0.4 if y < 780 else 0.05)

    # 3. Flanking Ancient Banyan Trees (Left & Right)
    L.bare_tree(130, 1520, 520, lean=0.08, spread=1.2, width=32, depth=5, halo=2.5, snow=False)
    L.bare_tree(W - 130, 1520, 520, lean=-0.08, spread=1.2, width=32, depth=5, halo=2.5, snow=False)

    # 4. Sacred Gunungan Kayon Gate (Tree of Life Portal in the Center)
    cx = W // 2
    # Parametric leaf/gunungan curve
    n_pts = 40
    t_vals = np.linspace(0, np.pi, n_pts)
    apex_y = 720
    base_y = 1580
    gunungan_pts = []
    # Left side (bottom to top)
    for t in np.linspace(0, 1, 30):
        y = base_y - t * (base_y - apex_y)
        # Leaf width profile
        w = 340 * np.sin(np.pi * t ** 0.85) * (1.0 - 0.25 * t)
        gunungan_pts.append((cx - w, y))
    gunungan_pts.append((cx, apex_y))
    # Right side (top to bottom)
    for t in np.linspace(1, 0, 30):
        y = base_y - t * (base_y - apex_y)
        w = 340 * np.sin(np.pi * t ** 0.85) * (1.0 - 0.25 * t)
        gunungan_pts.append((cx + w, y))
    
    poly_gunungan = L.poly(gunungan_pts, smooth=True)
    
    # Outer Gunungan Halo & Rim
    L.outline(poly_gunungan, width=5.0)
    L.hatch(gunungan_pts, angle=45, spacing=8, width=2.0, cut=False, on=gold, density=lambda x, y: 0.35 if y > apex_y + 40 else 0.1)

    # Carve inside the Gunungan
    L.clear(poly_gunungan, chatter=0.25)

    # Sacred Kalpataru Tree inside Gunungan
    L.bare_tree(cx, base_y - 20, 580, lean=0.0, spread=1.1, width=28, depth=5, halo=0.0, snow=False)
    
    # Gold Tree Highlights
    tree_gold_pts = [(cx - 18, base_y - 20), (cx + 18, base_y - 20), (cx + 10, base_y - 400), (cx - 10, base_y - 400)]
    L.hatch(tree_gold_pts, angle=90, spacing=6, width=2.2, cut=False, on=gold)

    # 5. Grand Temple Stone Plinth & Courtyard Steps
    pts_stairs = [(120, base_y), (W - 120, base_y), (W - 80, H - 60), (80, H - 60)]
    L.leave(L.poly(pts_stairs))
    L.hatch(pts_stairs, angle=0, spacing=14, width=2.2, cut=True, density=lambda x, y: 0.5)
    
    # Horizontal stone terraces
    for sy in range(base_y + 40, H - 80, 50):
        L.gouge([(100, sy), (W - 100, sy)], width=2.4, tool='knife', cut=False)
        # Gold stone highlights
        L.hatch([(120, sy - 15), (W - 120, sy + 15)], angle=45, spacing=14, width=2.0, cut=False, on=gold, density=lambda x, y: 0.25)

    # Print Edition Sign in Bottom Margin
    L.sign("1/1", "Mahakarya Gunungan Nusantara", "Sikobokan 2026")
    L.chop(W - 80, H - 42)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    temp_jpg = out_path.replace(".webp", ".jpg")
    L.save(temp_jpg)
    img = Image.open(temp_jpg)
    img.save(out_path, format="WEBP", quality=92, method=6)
    if os.path.exists(temp_jpg):
        os.remove(temp_jpg)
    print(f"Cover v2 saved: {out_path} ({os.path.getsize(out_path) // 1024} KB)")

if __name__ == "__main__":
    out_dir = r"d:\Ren\Project Web\invitation-app\public\assets\motion-art-linocut"
    cover_file = os.path.join(out_dir, "bg-cover-linocut.webp")
    render_cover_v2(cover_file)
