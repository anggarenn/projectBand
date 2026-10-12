import numpy as np
from PIL import Image

def convert_sepia_to_royal_gold_navy(sepia_path, out_gold_path):
    img = Image.open(sepia_path).convert("RGB")
    arr = np.array(img, dtype=float)
    h, w, _ = arr.shape
    
    # In sepia image:
    # Sky is light beige (~230, 215, 195)
    # Engraving lines are dark brown (~120, 80, 50)
    # Convert to grayscale luminance
    lum = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    
    # Invert lineart so lines are bright (high value) and background is dark
    # In original: lines are darker than paper.
    # paper ~ 220, lines ~ 90-140.
    # normalized line intensity:
    line_intensity = np.clip((225.0 - lum) / 130.0, 0.0, 1.0)
    
    # Vertical gradient for background navy depth
    y = np.linspace(0, 1, h)[:, None]
    
    # Top sky: #070D1E -> Mid sky: #0A1329 -> Horizon/Base: #070D1E
    navy_top = np.array([7, 13, 30], dtype=float)
    navy_mid = np.array([13, 25, 52], dtype=float)
    navy_bot = np.array([7, 13, 30], dtype=float)
    
    bg_rgb = np.zeros((h, w, 3), dtype=float)
    for c in range(3):
        # Sky transition
        sky_part = navy_top[c] + (y / 0.45) * (navy_mid[c] - navy_top[c])
        # Ground transition
        ground_part = navy_mid[c] + ((y - 0.45) / 0.55) * (navy_bot[c] - navy_mid[c])
        bg_rgb[:, :, c] = np.where(y < 0.45, sky_part, ground_part)
        
    # Gold palette for lineart:
    # Highlight gold: #FFF2D6 (255, 242, 214)
    # Royal gold: #D4AF37 (212, 175, 55)
    # Deep antique gold: #997825 (153, 120, 37)
    gold_hi = np.array([255, 244, 220], dtype=float)
    gold_main = np.array([218, 180, 68], dtype=float)
    gold_deep = np.array([160, 125, 42], dtype=float)
    
    # Mountain vs House altitude:
    # House is at y > 0.65, Mountains at 0.40 < y < 0.65
    is_mountain = np.clip(1.0 - np.abs(y - 0.55) / 0.15, 0.0, 1.0)
    
    # Lines in mountain are slightly softer/more atmospheric
    mountain_dim = 1.0 - (is_mountain * 0.28)
    
    line_rgb = np.zeros((h, w, 3), dtype=float)
    for c in range(3):
        col_c = gold_deep[c] + line_intensity * (gold_main[c] - gold_deep[c])
        # Add brilliant sparkle to highest contrast lines (house roof, ridges)
        top_sparkle = np.clip((line_intensity - 0.70) / 0.30, 0.0, 1.0)
        col_c = col_c + top_sparkle * (gold_hi[c] - gold_main[c])
        line_rgb[:, :, c] = col_c * mountain_dim
        
    # Blend lineart over background
    alpha_line = np.clip(line_intensity * 1.25, 0.0, 1.0)[:, :, None]
    final_rgb = bg_rgb * (1.0 - alpha_line) + line_rgb * alpha_line
    final_rgb = np.clip(final_rgb, 0, 255).astype(np.uint8)
    
    out_img = Image.fromarray(final_rgb)
    out_img.save(out_gold_path, "WEBP", quality=95)
    print(f"Generated clean Royal Gold & Navy backdrop: {out_gold_path} ({out_img.size})")

convert_sepia_to_royal_gold_navy(
    "public/assets/motion-art-sunda/bg-stage-sunda-julangngapak-sepia.webp",
    "public/assets/motion-art-sunda/bg-stage-sunda-julangngapak-gold.webp"
)
convert_sepia_to_royal_gold_navy(
    "public/assets/motion-art-sunda/bg-stage-sunda-julangngapak-sepia.webp",
    "public/assets/motion-art-sunda/bg-cover-sunda-julangngapak-gold.webp"
)
