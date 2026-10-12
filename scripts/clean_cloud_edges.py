import os
import glob
import numpy as np
from PIL import Image

def clean_edges(img_path):
    img = Image.open(img_path).convert("RGBA")
    arr = np.array(img)
    h, w, _ = arr.shape
    
    alpha = arr[:, :, 3].astype(float)
    
    # Create smooth edge fade mask for outer 14 pixels
    fade_px = 14
    y = np.arange(h)
    x = np.arange(w)
    
    # Distance from 4 borders
    dist_top = y[:, None]
    dist_bot = (h - 1 - y)[:, None]
    dist_left = x[None, :]
    dist_right = (w - 1 - x)[None, :]
    
    dist_edge = np.minimum(np.minimum(dist_top, dist_bot), np.minimum(dist_left, dist_right))
    edge_mask = np.clip(dist_edge / float(fade_px), 0.0, 1.0)
    
    # Apply cubic smoothing to fade
    edge_mask = edge_mask * edge_mask * (3.0 - 2.0 * edge_mask)
    
    # Also clear any small stray artifacts in corners
    new_alpha = np.clip(alpha * edge_mask, 0, 255).astype(np.uint8)
    
    arr[:, :, 3] = new_alpha
    out = Image.fromarray(arr)
    out.save(img_path, "PNG")
    print(f"Cleaned edge alpha for: {os.path.basename(img_path)}")

for p in glob.glob("public/assets/motion-art-sunda/extracted/*.png"):
    clean_edges(p)
