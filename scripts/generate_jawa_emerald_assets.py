import os
from PIL import Image, ImageFilter
import numpy as np

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, ".."))
JAWA_DIR = os.path.join(PROJECT_DIR, "public", "assets", "motion-art-jawa")

def grade_keraton_emerald(src_path, output_path, is_cover=False, quality=78):
    """
    Renders high-fidelity Keraton Emerald & Royal Gold artwork at 1080x1920,
    optimizing file size to fall strictly within the 30KB - 120KB target range.
    """
    src = Image.open(src_path).convert('RGB')
    
    # Standard mobile 9:16 portrait viewport
    target_w, target_h = 1080, 1920
    resized = src.resize((target_w, target_h), Image.Resampling.LANCZOS)
    arr = np.array(resized).astype(np.float32) / 255.0
    
    # Perceptual luminance calculation
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    
    # 4-Tier Keraton Emerald & Royal Gold Tonal Curve:
    # 1. Shadow: Deep Obsidian Emerald (#09140F -> 0.035, 0.078, 0.059)
    # 2. Midtone: Royal Keraton Emerald (#144A32 -> 0.078, 0.290, 0.196)
    # 3. High Midtone: Antique Gold (#D4AF37 -> 0.831, 0.686, 0.216)
    # 4. Highlight: Brilliant Imperial Gold (#FFF1C2 -> 1.0, 0.945, 0.761)
    
    shadow_w = np.maximum(0.0, 1.0 - lum * 2.2) ** 1.5
    mid_w = np.maximum(0.0, np.sin(np.clip(lum, 0.0, 1.0) * np.pi)) ** 1.3
    hi_w = np.maximum(0.0, (lum - 0.32) / 0.68) ** 1.25
    
    out = np.zeros_like(arr)
    # Red: deep shadow emerald, warm mid, brilliant antique gold in highlights
    out[:, :, 0] = 0.035 * shadow_w + 0.085 * mid_w + 0.910 * hi_w
    # Green: dominant in shadow & midtones, rich in gold highlights
    out[:, :, 1] = 0.078 * shadow_w + 0.365 * mid_w + 0.775 * hi_w
    # Blue: deep in shadow, subdued in midtone, warm in highlights
    out[:, :, 2] = 0.059 * shadow_w + 0.220 * mid_w + 0.270 * hi_w
    
    # High-pass micro-texture blend for authentic wood and carved stone grain
    detail = arr - np.mean(arr, axis=2, keepdims=True)
    out = np.clip(out + detail * 0.40, 0.0, 1.0)
    
    # Atmosphere lighting & Radial Vignette
    y, x = np.ogrid[:target_h, :target_w]
    cx = target_w / 2.0
    cy = target_h * 0.44 if is_cover else target_h * 0.50
    dist = np.sqrt(((x - cx) / cx) ** 2 + ((y - cy) / cy) ** 2)
    
    if is_cover:
        # Central royal aura for CoverScreen monogram and seal
        aura = np.exp(-((dist / 0.62) ** 2)) * 0.22
        out[:, :, 0] += aura * 0.85
        out[:, :, 1] += aura * 1.00
        out[:, :, 2] += aura * 0.45
        vignette = np.clip(1.06 - 0.44 * (dist ** 2), 0.42, 1.0)
    else:
        # Subtle ambient fill for stage content legibility
        aura = np.exp(-((dist / 0.72) ** 2)) * 0.12
        out[:, :, 0] += aura * 0.75
        out[:, :, 1] += aura * 0.95
        out[:, :, 2] += aura * 0.48
        vignette = np.clip(1.03 - 0.36 * (dist ** 2), 0.48, 1.0)
        
    for c in range(3):
        out[:, :, c] = np.clip(out[:, :, c] * vignette, 0.0, 1.0)
        
    out_img = Image.fromarray((out * 255.0).astype(np.uint8))
    
    # Median filter smoothing of speckle noise for optimal WebP entropy encoding
    out_img = out_img.filter(ImageFilter.MedianFilter(size=3))
    
    out_img.save(output_path, "WEBP", quality=quality, method=6)
    size_kb = os.path.getsize(output_path) / 1024
    print(f"Generated: {output_path} | Size: {out_img.size} | Mode: {out_img.mode} | Weight: {size_kb:.1f} KB | Extrema: {out_img.getextrema()}")

def main():
    print("=== Generating Jawa Keraton Emerald & Gold Visual Assets ===")
    cover_src = os.path.join(JAWA_DIR, "bg-cover-joglo.webp")
    stage_src = os.path.join(JAWA_DIR, "bg-stage-joglo-clean.webp")
    
    cover_dst = os.path.join(JAWA_DIR, "bg-cover-joglo-emerald.webp")
    stage_dst = os.path.join(JAWA_DIR, "bg-stage-joglo-emerald.webp")
    
    # Generate cover (quality 82 yields ~63 KB)
    grade_keraton_emerald(cover_src, cover_dst, is_cover=True, quality=82)
    
    # Generate stage (quality 74 yields ~60 KB)
    grade_keraton_emerald(stage_src, stage_dst, is_cover=False, quality=74)
    print("=== Jawa Emerald Assets Generation Completed! ===")

if __name__ == "__main__":
    main()
