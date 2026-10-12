import os
import numpy as np
from PIL import Image, ImageFilter

def extract_alpha(arr, bg=np.array([244, 244, 244], dtype=float), thresh_low=4.0, thresh_high=20.0):
    """
    Studio-grade alpha matting with background un-premultiplication.
    Eliminates all grey/white halos and preserves crisp anti-aliased edge curves.
    """
    dists = np.linalg.norm(arr - bg, axis=2)
    t = np.clip((dists - thresh_low) / (thresh_high - thresh_low), 0.0, 1.0)
    alpha = t * t * (3.0 - 2.0 * t)
    
    safe_alpha = np.maximum(alpha, 1e-4)[:, :, None]
    unpre = np.clip((arr - bg * (1.0 - safe_alpha)) / safe_alpha, 0.0, 255.0)
    return unpre, alpha

def grade_sunda_parahyangan(rgb, alpha):
    """
    Transforms batik color layers into the authentic Sunda Parahyangan royal palette:
    - Deep Midnight Navy Blue (#0B132B, #070D1E)
    - Royal Cobalt / Sapphire Blue (#1E3A8A, #2854B0)
    - Shimmering Royal Gold (#D4AF37, #E5C16C, #9E782F)
    - Luminous Champagne Pearl (#FFF2D6)
    """
    r = rgb[:, :, 0]
    g = rgb[:, :, 1]
    b = rgb[:, :, 2]
    lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0
    
    # 1. Detect Cyan / Teal / Turquoise areas
    is_cyan = (b > r + 14) | ((g > r + 10) & (b > 65))
    
    # 2. Detect Gold / Ochre / Amber areas
    is_gold = (r > b + 18) & (g > b - 15) & (~is_cyan)
    
    # 3. Detect Pearl / White / Champagne highlights
    is_pearl = (r > 200) & (g > 190) & (b > 170) & (np.abs(r - g) < 40) & (~is_cyan)
    
    # 4. Detect Deep Dark lines
    is_dark = (r < 55) & (g < 60) & (b < 80)
    
    # Palette targets
    c_navy_deep  = np.array([11, 19, 43], dtype=float)    # #0B132B
    c_navy_mid   = np.array([30, 58, 138], dtype=float)   # #1E3A8A
    c_navy_light = np.array([45, 95, 195], dtype=float)   # #2D5FC3
    
    c_gold_dark  = np.array([158, 120, 47], dtype=float)  # #9E782F
    c_gold_mid   = np.array([212, 175, 55], dtype=float)  # #D4AF37
    c_gold_light = np.array([238, 205, 120], dtype=float) # #EECDA7
    
    c_pearl_base = np.array([245, 228, 195], dtype=float)
    c_pearl_pure = np.array([255, 242, 214], dtype=float) # #FFF2D6
    
    c_obsidian   = np.array([7, 13, 30], dtype=float)     # #070D1E
    
    # Map cyan into navy gradient
    cyan_t = np.clip((lum - 0.20) / 0.52, 0.0, 1.0)
    navy_mapped = np.zeros_like(rgb)
    for i in range(3):
        navy_mapped[:, :, i] = np.where(cyan_t < 0.5,
                                        c_navy_deep[i] + (cyan_t * 2.0) * (c_navy_mid[i] - c_navy_deep[i]),
                                        c_navy_mid[i] + ((cyan_t - 0.5) * 2.0) * (c_navy_light[i] - c_navy_mid[i]))
                                        
    # Map gold into Royal Gold gradient
    gold_t = np.clip((lum - 0.35) / 0.50, 0.0, 1.0)
    gold_mapped = np.zeros_like(rgb)
    for i in range(3):
        gold_mapped[:, :, i] = np.where(gold_t < 0.5,
                                        c_gold_dark[i] + (gold_t * 2.0) * (c_gold_mid[i] - c_gold_dark[i]),
                                        c_gold_mid[i] + ((gold_t - 0.5) * 2.0) * (c_gold_light[i] - c_gold_mid[i]))
                                        
    # Map pearl
    pearl_t = np.clip((lum - 0.72) / 0.28, 0.0, 1.0)
    pearl_mapped = np.zeros_like(rgb)
    for i in range(3):
        pearl_mapped[:, :, i] = c_pearl_base[i] + pearl_t * (c_pearl_pure[i] - c_pearl_base[i])
        
    out = rgb.copy()
    for i in range(3):
        out[:, :, i] = np.where(is_cyan, navy_mapped[:, :, i], out[:, :, i])
        out[:, :, i] = np.where(is_gold, gold_mapped[:, :, i], out[:, :, i])
        out[:, :, i] = np.where(is_pearl, pearl_mapped[:, :, i], out[:, :, i])
        out[:, :, i] = np.where(is_dark, c_obsidian[i], out[:, :, i])
        
    return np.clip(out, 0.0, 255.0)

def extract_and_grade(crop_arr):
    unpre, alpha = extract_alpha(crop_arr)
    graded = grade_sunda_parahyangan(unpre, alpha)
    rgba = np.dstack([graded, alpha * 255.0]).astype(np.uint8)
    return Image.fromarray(rgba)

def generate_parahyangan_mist(width=2400, height=900):
    """
    Generates an atmospheric Parahyangan golden haze / mountain mist layer.
    Guaranteed 100% horizontal seamless wrapping (for infinite smooth drifting loops).
    """
    x = np.linspace(0, 2 * np.pi, width, endpoint=False)
    y = np.linspace(0, 1, height)
    X, Y = np.meshgrid(x, y)
    
    # Stratified multi-octave mist bands
    # Periodic trigonometric formulation ensures perfect seamless looping
    w1 = np.sin(X + np.sin(2 * X) * 0.35)
    w2 = np.sin(2 * X + 1.2 + np.cos(X) * 0.4)
    w3 = np.cos(3 * X + 2.7 + np.sin(X) * 0.25)
    w4 = np.sin(5 * X - 0.8)
    w5 = np.cos(8 * X + 1.5)
    
    # Vertical altitude envelope: peak density hovering between 30% and 75% height
    # (valley between mountain base and rice terraces)
    alt_env = np.exp(-((Y - 0.52) / 0.26) ** 2)
    alt_env_low = np.exp(-((Y - 0.68) / 0.18) ** 2) * 0.4
    
    density = (0.40 * w1 + 0.28 * w2 + 0.18 * w3 + 0.10 * w4 + 0.04 * w5)
    density = (density - density.min()) / (density.max() - density.min())
    density = (density * 0.75 + 0.25) * (alt_env + alt_env_low)
    density = np.clip(density, 0.0, 1.0)
    
    # Subtle organic mist streamers
    streamer = np.sin(Y * 24.0 + np.sin(X * 4.0) * 1.5) * 0.5 + 0.5
    density = density * (0.80 + 0.20 * streamer)
    density = np.clip(density, 0.0, 1.0)
    
    # Color grading for Parahyangan Golden Mist
    # Pearl Champagne (#FFF2D6 = [255, 242, 214])
    # Sunlit Pale Gold (#E5C16C = [229, 193, 108])
    # Warm Royal Gold (#D4AF37 = [212, 175, 55])
    col_champagne = np.array([255, 246, 228], dtype=float)
    col_palegold  = np.array([235, 202, 125], dtype=float)
    col_royalgold = np.array([212, 175, 55], dtype=float)
    
    mist_rgb = np.zeros((height, width, 3), dtype=float)
    for c in range(3):
        t1 = np.clip(density / 0.6, 0.0, 1.0)
        t2 = np.clip((density - 0.5) / 0.5, 0.0, 1.0)
        col_c = col_royalgold[c] + t1 * (col_palegold[c] - col_royalgold[c])
        col_c = col_c + t2 * (col_champagne[c] - col_palegold[c])
        mist_rgb[:, :, c] = col_c
        
    # Alpha: delicate, ethereal transparency (max ~38% opacity so mountains & terraces shine through)
    alpha = density * 0.38
    
    # Soft vertical fade at top and bottom edges
    fade_top = np.clip(y / 0.12, 0.0, 1.0)
    fade_bot = np.clip((1.0 - y) / 0.15, 0.0, 1.0)
    vert_fade = (fade_top * fade_bot)[:, None]
    alpha = alpha * vert_fade
    
    rgba = np.dstack([mist_rgb, alpha * 255.0]).astype(np.uint8)
    return Image.fromarray(rgba)

def main():
    print("=== STARTING SUNDA MOTION ART ASSET GENERATION ===")
    
    source_path = "public/assets/motion-art-sunda/10255385.jpg"
    im_src = Image.open(source_path)
    arr_src = np.array(im_src, dtype=float)
    
    extracted_dir = "public/assets/motion-art-sunda/extracted"
    os.makedirs(extracted_dir, exist_ok=True)
    
    # 1. EXTRACT & COLOR-GRADE INDIVIDUAL MODULAR CLOUDS
    comps_def = {
        "cloud-grand-top": (120, 760, 250, 1720),
        "cloud-mid-left": (650, 1090, 40, 630),
        "cloud-mid-right": (680, 1060, 1240, 1950),
        "cloud-mid-center": (860, 1350, 520, 1450),
        "cloud-bottom-left": (1390, 1840, 50, 620),
        "cloud-bottom-right": (1350, 1880, 730, 1950),
    }
    
    modular_images = {}
    for name, (y0, y1, x0, x1) in comps_def.items():
        crop = arr_src[y0:y1, x0:x1]
        img_graded = extract_and_grade(crop)
        modular_images[name] = img_graded
        
        # Save as -clean.png and -gold-navy.png
        p1 = os.path.join(extracted_dir, f"{name}-clean.png")
        p2 = os.path.join(extracted_dir, f"{name}-gold-navy.png")
        img_graded.save(p1, "PNG")
        img_graded.save(p2, "PNG")
        print(f"Saved modular cloud: {name} ({img_graded.size[0]}x{img_graded.size[1]})")

    # 2. ASSEMBLE FULL THEATRICAL CURTAIN WINGS (SAYAP KIRI & SAYAP KANAN)
    # High-resolution vertical curtain canvas: 1000 x 1920
    curtain_w = 1000
    curtain_h = 1920
    
    # Helper to add drop shadow
    def add_drop_shadow(base_img, overlay_img, pos, offset=(6, 12), blur_radius=16, shadow_opacity=0.45):
        # Create shadow mask
        alpha_mask = overlay_img.split()[3]
        shadow = Image.new("RGBA", overlay_img.size, (11, 19, 43, int(255 * shadow_opacity)))
        shadow.putalpha(alpha_mask)
        shadow_blurred = shadow.filter(ImageFilter.GaussianBlur(blur_radius))
        
        # Paste shadow
        spos = (pos[0] + offset[0], pos[1] + offset[1])
        base_img.paste(shadow_blurred, spos, shadow_blurred)
        # Paste overlay
        base_img.paste(overlay_img, pos, overlay_img)

    # --- SAYAP KIRI (LEFT CURTAIN WING) ---
    left_curtain = Image.new("RGBA", (curtain_w, curtain_h), (0, 0, 0, 0))
    
    # Top arch corner lobe: left side of grand top cloud
    c_top = modular_images["cloud-grand-top"]
    c_top_left = c_top.crop((0, 0, int(c_top.size[0] * 0.58), c_top.size[1]))
    c_top_left_scaled = c_top_left.resize((int(c_top_left.size[0] * 1.15), int(c_top_left.size[1] * 1.15)), Image.Resampling.LANCZOS)
    add_drop_shadow(left_curtain, c_top_left_scaled, (-80, -40), offset=(8, 14), blur_radius=18, shadow_opacity=0.50)
    
    # Mid-upper flank lobe: cloud-mid-left
    c_mid_l = modular_images["cloud-mid-left"]
    c_mid_l_scaled = c_mid_l.resize((int(c_mid_l.size[0] * 1.25), int(c_mid_l.size[1] * 1.25)), Image.Resampling.LANCZOS)
    add_drop_shadow(left_curtain, c_mid_l_scaled, (-60, 420), offset=(10, 14), blur_radius=18, shadow_opacity=0.45)
    
    # Center swirl waist: cloud-mid-center (left half / swirl lobe)
    c_swirl = modular_images["cloud-mid-center"]
    c_swirl_l = c_swirl.crop((0, 0, int(c_swirl.size[0] * 0.65), c_swirl.size[1]))
    c_swirl_l_scaled = c_swirl_l.resize((int(c_swirl_l.size[0] * 1.10), int(c_swirl_l.size[1] * 1.10)), Image.Resampling.LANCZOS)
    add_drop_shadow(left_curtain, c_swirl_l_scaled, (-100, 850), offset=(10, 16), blur_radius=20, shadow_opacity=0.48)
    
    # Mid-lower flank lobe: second cloud-mid-left (mirrored vertically or slightly rotated)
    c_mid_l2 = c_mid_l.transpose(Image.Transpose.FLIP_TOP_BOTTOM).resize((int(c_mid_l.size[0] * 1.15), int(c_mid_l.size[1] * 1.15)), Image.Resampling.LANCZOS)
    add_drop_shadow(left_curtain, c_mid_l2, (-80, 1220), offset=(10, 14), blur_radius=18, shadow_opacity=0.45)
    
    # Bottom-left foundational base cloud: cloud-bottom-left
    c_bot_l = modular_images["cloud-bottom-left"]
    c_bot_l_scaled = c_bot_l.resize((int(c_bot_l.size[0] * 1.50), int(c_bot_l.size[1] * 1.50)), Image.Resampling.LANCZOS)
    add_drop_shadow(left_curtain, c_bot_l_scaled, (-50, 1380), offset=(8, 16), blur_radius=20, shadow_opacity=0.55)

    # Save Sayap Kiri
    p_curtain_left_png = "public/assets/motion-art-sunda/curtain-cloud-left.png"
    p_curtain_left_webp = "public/assets/motion-art-sunda/curtain-cloud-left.webp"
    p_curtain_left_ext = os.path.join(extracted_dir, "curtain-cloud-left.png")
    left_curtain.save(p_curtain_left_png, "PNG")
    left_curtain.save(p_curtain_left_webp, "WEBP", quality=95)
    left_curtain.save(p_curtain_left_ext, "PNG")
    print(f"Saved Sayap Kiri: {p_curtain_left_png} ({left_curtain.size})")

    # --- SAYAP KANAN (RIGHT CURTAIN WING) ---
    right_curtain = Image.new("RGBA", (curtain_w, curtain_h), (0, 0, 0, 0))
    
    # Top arch corner lobe: right side of grand top cloud
    c_top_right = c_top.crop((int(c_top.size[0] * 0.42), 0, c_top.size[0], c_top.size[1]))
    c_top_right_scaled = c_top_right.resize((int(c_top_right.size[0] * 1.15), int(c_top_right.size[1] * 1.15)), Image.Resampling.LANCZOS)
    rx_top = curtain_w - c_top_right_scaled.size[0] + 80
    add_drop_shadow(right_curtain, c_top_right_scaled, (rx_top, -40), offset=(-8, 14), blur_radius=18, shadow_opacity=0.50)
    
    # Mid-upper flank lobe: cloud-mid-right
    c_mid_r = modular_images["cloud-mid-right"]
    c_mid_r_scaled = c_mid_r.resize((int(c_mid_r.size[0] * 1.25), int(c_mid_r.size[1] * 1.25)), Image.Resampling.LANCZOS)
    rx_mid = curtain_w - c_mid_r_scaled.size[0] + 60
    add_drop_shadow(right_curtain, c_mid_r_scaled, (rx_mid, 420), offset=(-10, 14), blur_radius=18, shadow_opacity=0.45)
    
    # Center swirl waist: cloud-mid-center (right half)
    c_swirl_r = c_swirl.crop((int(c_swirl.size[0] * 0.35), 0, c_swirl.size[0], c_swirl.size[1]))
    c_swirl_r_scaled = c_swirl_r.resize((int(c_swirl_r.size[0] * 1.10), int(c_swirl_r.size[1] * 1.10)), Image.Resampling.LANCZOS)
    rx_swirl = curtain_w - c_swirl_r_scaled.size[0] + 100
    add_drop_shadow(right_curtain, c_swirl_r_scaled, (rx_swirl, 850), offset=(-10, 16), blur_radius=20, shadow_opacity=0.48)
    
    # Mid-lower flank lobe: cloud-mid-right vertically flipped
    c_mid_r2 = c_mid_r.transpose(Image.Transpose.FLIP_TOP_BOTTOM).resize((int(c_mid_r.size[0] * 1.15), int(c_mid_r.size[1] * 1.15)), Image.Resampling.LANCZOS)
    rx_mid2 = curtain_w - c_mid_r2.size[0] + 80
    add_drop_shadow(right_curtain, c_mid_r2, (rx_mid2, 1220), offset=(-10, 14), blur_radius=18, shadow_opacity=0.45)
    
    # Bottom-right foundational base cloud: cloud-bottom-right
    c_bot_r = modular_images["cloud-bottom-right"]
    c_bot_r_scaled = c_bot_r.resize((int(c_bot_r.size[0] * 1.15), int(c_bot_r.size[1] * 1.15)), Image.Resampling.LANCZOS)
    rx_bot = curtain_w - c_bot_r_scaled.size[0] + 60
    add_drop_shadow(right_curtain, c_bot_r_scaled, (rx_bot, 1380), offset=(-8, 16), blur_radius=20, shadow_opacity=0.55)

    # Save Sayap Kanan
    p_curtain_right_png = "public/assets/motion-art-sunda/curtain-cloud-right.png"
    p_curtain_right_webp = "public/assets/motion-art-sunda/curtain-cloud-right.webp"
    p_curtain_right_ext = os.path.join(extracted_dir, "curtain-cloud-right.png")
    right_curtain.save(p_curtain_right_png, "PNG")
    right_curtain.save(p_curtain_right_webp, "WEBP", quality=95)
    right_curtain.save(p_curtain_right_ext, "PNG")
    print(f"Saved Sayap Kanan: {p_curtain_right_png} ({right_curtain.size})")

    # 3. GENERATE PARAHYANGAN MIST / GOLDEN HAZE
    print("Generating Parahyangan Golden Mist layer...")
    mist_img = generate_parahyangan_mist(width=2400, height=900)
    
    p_mist_png = "public/assets/motion-art-sunda/parahyangan-mist-golden-haze.png"
    p_mist_webp = "public/assets/motion-art-sunda/parahyangan-mist-golden-haze.webp"
    p_mist_layer = "public/assets/motion-art-sunda/parahyangan-golden-haze-layer.webp"
    
    mist_img.save(p_mist_png, "PNG")
    mist_img.save(p_mist_webp, "WEBP", quality=92)
    mist_img.save(p_mist_layer, "WEBP", quality=92)
    print(f"Saved Parahyangan Mist: {p_mist_png} and {p_mist_webp} ({mist_img.size})")

    print("=== ALL ASSETS GENERATED SUCCESSFULLY ===")

if __name__ == "__main__":
    main()
