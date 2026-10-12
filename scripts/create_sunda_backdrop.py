import os
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import numpy as np

W, H = 1080, 2340
out = Image.new("RGBA", (W, H), (7, 13, 30, 255)) # Dark navy base #070D1E

# Load texture pattern
pattern_path = "public/assets/motion-art-sunda/bg-sunda-dark-gold.jpg"
if os.path.exists(pattern_path):
    pat = Image.open(pattern_path).convert("RGBA")
    # Resize pattern to cover lower stage
    pat_w, pat_h = pat.size
    scale = W / pat_w
    pat_resized = pat.resize((W, int(pat_h * scale)), Image.Resampling.LANCZOS)
    
    # Create mask gradient (subtle watermark texture)
    mask = Image.new("L", pat_resized.size, 0)
    draw_mask = ImageDraw.Draw(mask)
    for y in range(pat_resized.height):
        # Fade in towards bottom
        alpha = int(45 * (y / pat_resized.height)**1.2)
        draw_mask.line([(0, y), (W, y)], fill=alpha)
    
    pat_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    pat_layer.paste(pat_resized, (0, H - pat_resized.height), mask)
    out = Image.alpha_composite(out, pat_layer)

print("Composite base done, shape:", out.size)
