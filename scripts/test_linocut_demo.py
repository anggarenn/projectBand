import os
import sys

# Add claude-drawing-skill/lib to sys.path
skill_lib = r"C:\Users\Ren\.gemini\config\skills\claude-drawing-skill\lib"
if skill_lib not in sys.path:
    sys.path.insert(0, skill_lib)

import numpy as np
from linocut import Linocut

def generate_sample():
    out_dir = r"C:\Users\Ren\.gemini\antigravity\brain\e8ac61ab-ef63-4a6d-83cf-6e1e6dfa1c64"
    out_path = os.path.join(out_dir, "test_linocut_sample.png")

    W, H = 1080, 1920
    # Archival ivory paper revealed under carved obsidian linoleum block
    L = Linocut(W=W, H=H, block=(40, 40, W - 40, H - 40), seed=42, paper='#e4dbcb', ink='#100f0e', ss=2)

    # Spot colour gold block
    gold = L.colour_block('#c89d3a', offset=(2, -2))

    # Sky area with wind flow lines
    sky = [(40, 40), (W - 40, 40), (W - 40, 900), (40, 900)]
    L.flow(sky, lambda x, y: 180 + 15 * np.sin(x / 80), n=250, length=(40, 220), width=(1.5, 4.0))

    # Glowing celestial moon with halo
    L.moon(W // 2, 420, 140)

    # Mountain ridge / Merapi silhouette
    peak_y = 650
    pts_mountain = [
        (40, 950), (200, 850), (400, 750), (W // 2, peak_y),
        (700, 760), (900, 860), (W - 40, 950), (W - 40, H - 40), (40, H - 40)
    ]
    poly_mountain = L.poly(pts_mountain, smooth=True)
    
    # Hatching along mountain contours
    L.hatch(pts_mountain, angle=55, spacing=12, width=2.2, cut=False,
            bend=lambda x, y: 8 * np.sin(x / 100), density=lambda x, y: 0.6)

    # Clear foreground with authentic linocut chatter
    L.clear(poly_mountain, chatter=0.35)

    # Gold spot highlights on mountain crest
    L.hatch(pts_mountain[:7], angle=45, spacing=16, width=2.5, cut=False, on=gold,
            density=lambda x, y: 0.4 if y < 800 else 0.1)

    # Subtle falling starlight / embers
    L.speckle(sky, n=400)

    # Sign print
    L.sign("1/1", "Mahakarya Nusantara", "Sikobokan 2026")

    L.save(out_path)
    print(f"Successfully generated: {out_path}")

if __name__ == "__main__":
    generate_sample()
