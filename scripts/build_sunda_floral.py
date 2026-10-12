import numpy as np
from PIL import Image

def process_flower(src_path, out_left_path, out_right_path):
    img = Image.open(src_path).convert("RGBA")
    arr = np.array(img, dtype=float)
    
    rgb = arr[:, :, :3]
    alpha = arr[:, :, 3] / 255.0
    
    # Grayscale intensity of the engraving:
    # 0 = black lines, 255 = white highlight
    lum = 0.299 * rgb[:, :, 0] + 0.587 * rgb[:, :, 1] + 0.114 * rgb[:, :, 2]
    
    # Invert / map so lines are royal gold and petals are warm champagne pearl
    # lum: ~30 (shadow lines) to ~240 (petal highlight)
    norm = np.clip((lum - 20) / 220.0, 0.0, 1.0)
    
    # Color palette:
    # Shadow/line: Deep antique gold #7A5B18 (122, 91, 24)
    # Midtone: Royal Gold #D4AF37 (212, 175, 55)
    # Highlight: Luminous Champagne #FFF6E5 (255, 246, 229)
    col_dark = np.array([122, 91, 24], dtype=float)
    col_mid  = np.array([218, 180, 68], dtype=float)
    col_hi   = np.array([255, 246, 230], dtype=float)
    
    out_rgb = np.zeros_like(rgb)
    for c in range(3):
        t1 = np.clip(norm / 0.5, 0.0, 1.0)
        t2 = np.clip((norm - 0.5) / 0.5, 0.0, 1.0)
        c_val = col_dark[c] + t1 * (col_mid[c] - col_dark[c])
        c_val = c_val + t2 * (col_hi[c] - col_mid[c])
        out_rgb[:, :, c] = c_val
        
    out_rgba = np.dstack([out_rgb, alpha * 255.0]).astype(np.uint8)
    img_left = Image.fromarray(out_rgba)
    img_left.save(out_left_path, "WEBP", quality=95)
    print(f"Saved left floral: {out_left_path} ({img_left.size})")
    
    # Right floral: mirrored and slightly angled
    img_right = img_left.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    img_right.save(out_right_path, "WEBP", quality=95)
    print(f"Saved right floral: {out_right_path} ({img_right.size})")

    # Vintage Sepia variant:
    col_sepia_dark = np.array([85, 48, 14], dtype=float)
    col_sepia_mid  = np.array([175, 115, 55], dtype=float)
    col_sepia_hi   = np.array([250, 240, 225], dtype=float)
    out_sepia = np.zeros_like(rgb)
    for c in range(3):
        t1 = np.clip(norm / 0.5, 0.0, 1.0)
        t2 = np.clip((norm - 0.5) / 0.5, 0.0, 1.0)
        c_val = col_sepia_dark[c] + t1 * (col_sepia_mid[c] - col_sepia_dark[c])
        c_val = c_val + t2 * (col_sepia_hi[c] - col_sepia_mid[c])
        out_sepia[:, :, c] = c_val
    sepia_rgba = np.dstack([out_sepia, alpha * 255.0]).astype(np.uint8)
    img_sepia_l = Image.fromarray(sepia_rgba)
    img_sepia_l.save("public/assets/motion-art-sunda/sunda-floral-left-sepia.webp", "WEBP", quality=95)
    img_sepia_r = img_sepia_l.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    img_sepia_r.save("public/assets/motion-art-sunda/sunda-floral-right-sepia.webp", "WEBP", quality=95)
    print("Saved sepia florals.")

process_flower(
    "public/assets/motion-art-jawa/fssfrrrrrr.webp",
    "public/assets/motion-art-sunda/sunda-floral-left.webp",
    "public/assets/motion-art-sunda/sunda-floral-right.webp"
)
