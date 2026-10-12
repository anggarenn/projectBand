import cv2
import numpy as np
import json
from PIL import Image

def analyze_symmetry(image_path):
    img = cv2.imread(image_path)
    h, w, _ = img.shape
    scale = 2.0 # DPR (780px width represents 390px CSS viewport)
    center_x_phys = w / 2.0 # 390.0
    center_x_css = center_x_phys / scale # 195.0

    print(f"\n=======================================================")
    print(f"DETAIL SYMMETRY AUDIT: {image_path}")
    print(f"Viewport CSS: {w/scale} x {h/scale} px (Image: {w} x {h} px)")
    print(f"Sumbu Tengah Horizontal (Center X): {center_x_css:.1f} px CSS (Phys: {center_x_phys:.1f} px)")
    print(f"=======================================================")

    results = {}

    # ------------------------------------------------------------------
    # 1. POSISI PUNCAK MAHKOTA SIGER SUNDA
    # ------------------------------------------------------------------
    # Search around y: 120..260, x: 300..480
    crop_siger = img[120:250, 300:480]
    gray_siger = cv2.cvtColor(crop_siger, cv2.COLOR_BGR2GRAY)
    # The gold tip of central spire has highest intensity in the uppermost rows
    # Find all pixels with gold brightness > 140
    y_sig, x_sig = np.where(gray_siger > 140)
    min_y_sig = np.min(y_sig)
    # The peak spire tip
    peak_xs = x_sig[y_sig == min_y_sig]
    siger_peak_phys_x = 300 + float(np.mean(peak_xs))
    siger_peak_phys_y = 120 + float(min_y_sig)
    siger_peak_css_x = siger_peak_phys_x / scale
    siger_peak_css_y = siger_peak_phys_y / scale
    dev_siger_css = siger_peak_css_x - center_x_css

    results["siger"] = {
        "phys_x": siger_peak_phys_x,
        "phys_y": siger_peak_phys_y,
        "css_x": siger_peak_css_x,
        "css_y": siger_peak_css_y,
        "dev_css": dev_siger_css
    }

    # ------------------------------------------------------------------
    # 2. POSISI KARTU NAMA PENGANTIN
    # ------------------------------------------------------------------
    # MegamendungNameBorder card bounding box
    # Crop around y: 680..1060 (CSS: 340..530)
    # Border is gold colored: high red, high green, lower blue
    crop_card = img[690:1060, 40:740]
    # In HSV:
    hsv_card = cv2.cvtColor(crop_card, cv2.COLOR_BGR2HSV)
    lower_gold = np.array([12, 50, 80])
    upper_gold = np.array([38, 255, 255])
    gold_mask = cv2.inRange(hsv_card, lower_gold, upper_gold)

    # Find the top and bottom diamond anchors at the center:
    # Top diamond around y: 690..740, x: 360..420
    crop_dt = img[690:740, 360:420]
    gray_dt = cv2.cvtColor(crop_dt, cv2.COLOR_BGR2GRAY)
    dt_y, dt_x = np.where(gray_dt > 150)
    diamond_top_css_x = (360 + float(np.mean(dt_x))) / scale

    # Find left and right vertical borders of the card
    # Vertical borders run along full height of the card (~300px)
    col_density = np.sum(gold_mask, axis=0) # length 700 (corresponding to x: 40..740)
    # Left border peak in x: 40..140 (rel to crop: 0..100)
    left_peak_rel = np.argmax(col_density[20:100]) + 20
    card_left_phys = 40 + left_peak_rel
    # Right border peak in x: 640..740 (rel to crop: 600..700)
    right_peak_rel = np.argmax(col_density[580:680]) + 580
    card_right_phys = 40 + right_peak_rel

    card_left_css = card_left_phys / scale
    card_right_css = card_right_phys / scale
    card_width_css = card_right_css - card_left_css
    card_center_css = (card_left_css + card_right_css) / 2.0
    dev_card_css = card_center_css - center_x_css

    results["card"] = {
        "left_css": card_left_css,
        "right_css": card_right_css,
        "width_css": card_width_css,
        "center_css": card_center_css,
        "diamond_top_css_x": diamond_top_css_x,
        "dev_css": dev_card_css
    }

    # ------------------------------------------------------------------
    # 3. POSISI TITIK PUNCAK ATAP JULANG NGAPAK
    # ------------------------------------------------------------------
    # In the stage backdrop, Rumah Julang Ngapak is located in y: 1100..1550 (CSS 550..775)
    # The roof ridge apex is around y: 1220..1360 (CSS: 610..680)
    # Let's inspect the apex of the roof
    # Let's crop y: 1220..1360, x: 250..550
    crop_roof = img[1240:1360, 250:550]
    # Julang Ngapak has an iconic ridge with two projecting horn-like gables (cagak gunting / suhunan)
    # The central peak ridge is clearly visible in the architectural sketch
    # Let's find the apex of the central ridge
    # Convert to grayscale and find the apex coordinates
    gray_roof = cv2.cvtColor(crop_roof, cv2.COLOR_BGR2GRAY)
    # The roof forms an inverted V pointing up. The highest point of the dark/gold roof edge
    # Let's also check the raw background asset directly to confirm exact position in source asset!

    # ------------------------------------------------------------------
    # 4. POSISI KANOPI AWAN ATAS KIRI VS KANAN
    # ------------------------------------------------------------------
    # In the top area y: 0..200 (CSS 0..100)
    # Left side has the heavy dark blue / gold megamendung cloud
    # Right side is cut off / empty
    # Let's measure the bounding box and pixel mass of clouds in the top band:
    crop_top = img[0:220, 0:780]
    # Blue / dark-navy cloud body in top area
    hsv_top = cv2.cvtColor(crop_top, cv2.COLOR_BGR2HSV)
    # Dark blue/navy hues (H: 100..130, S: 50..255, V: 20..200)
    navy_mask_top = cv2.inRange(hsv_top, np.array([100, 40, 20]), np.array([135, 255, 220]))
    # Gold border of top cloud
    gold_mask_top = cv2.inRange(hsv_top, np.array([15, 50, 100]), np.array([35, 255, 255]))
    top_cloud_mask = cv2.bitwise_or(navy_mask_top, gold_mask_top)
    
    # Exclude audio button area at top right: y: 0..160, x: 620..780
    top_cloud_mask[0:160, 620:780] = 0
    # Exclude Siger in center bottom of this crop: y: 120..220, x: 300..480
    top_cloud_mask[120:220, 300:480] = 0

    # Analyze left half vs right half of top cloud
    left_top_mask = top_cloud_mask[:, 0:390]
    right_top_mask = top_cloud_mask[:, 390:780]
    left_top_pixels = int(np.sum(left_top_mask > 0))
    right_top_pixels = int(np.sum(right_top_mask > 0))

    # Bounding box of cloud on left side
    y_lt, x_lt = np.where(left_top_mask > 0)
    if len(x_lt) > 0:
        top_left_x_min = float(np.min(x_lt)) / scale
        top_left_x_max = float(np.max(x_lt)) / scale
        top_left_y_max = float(np.max(y_lt)) / scale # lowest point of cloud tail
    else:
        top_left_x_min, top_left_x_max, top_left_y_max = 0, 0, 0

    # Bounding box of cloud on right side
    y_rt, x_rt = np.where(right_top_mask > 0)
    if len(x_rt) > 0:
        top_right_x_min = (390 + float(np.min(x_rt))) / scale
        top_right_x_max = (390 + float(np.max(x_rt))) / scale
        top_right_y_max = float(np.max(y_rt)) / scale # lowest point of cloud tail
    else:
        top_right_x_min, top_right_x_max, top_right_y_max = 195, 195, 0

    results["top_cloud"] = {
        "left_pixels": left_top_pixels,
        "right_pixels": right_top_pixels,
        "ratio_left_right": left_top_pixels / max(right_top_pixels, 1),
        "left_tail_bottom_css_y": top_left_y_max,
        "right_tail_bottom_css_y": top_right_y_max,
        "left_span_css": (top_left_x_min, top_left_x_max),
        "right_span_css": (top_right_x_min, top_right_x_max)
    }

    # ------------------------------------------------------------------
    # 5. POSISI AWAN SAMPING KIRI VS KANAN
    # ------------------------------------------------------------------
    # Flank clouds: Left cloud around y: 58% (y ~ 980), Right cloud around y: 56% (y ~ 945)
    # In pixels: y: 900..1200
    # Left flank cloud: x: 0..160 (CSS 0..80)
    # Right flank cloud: x: 620..780 (CSS 310..390)
    crop_flank_left = img[900:1200, 0:180]
    crop_flank_right = img[880:1180, 600:780]

    hsv_fl = cv2.cvtColor(crop_flank_left, cv2.COLOR_BGR2HSV)
    hsv_fr = cv2.cvtColor(crop_flank_right, cv2.COLOR_BGR2HSV)
    # Detect navy / blue cloud
    mask_fl = cv2.bitwise_or(
        cv2.inRange(hsv_fl, np.array([100, 30, 20]), np.array([135, 255, 220])),
        cv2.inRange(hsv_fl, np.array([15, 50, 100]), np.array([35, 255, 255]))
    )
    mask_fr = cv2.bitwise_or(
        cv2.inRange(hsv_fr, np.array([100, 30, 20]), np.array([135, 255, 220])),
        cv2.inRange(hsv_fr, np.array([15, 50, 100]), np.array([35, 255, 255]))
    )

    y_fl, x_fl = np.where(mask_fl > 0)
    y_fr, x_fr = np.where(mask_fr > 0)

    fl_top_css = (900 + np.min(y_fl)) / scale if len(y_fl) > 0 else 0
    fl_bottom_css = (900 + np.max(y_fl)) / scale if len(y_fl) > 0 else 0
    fl_height_css = fl_bottom_css - fl_top_css
    fl_width_css = (np.max(x_fl) - np.min(x_fl)) / scale if len(x_fl) > 0 else 0
    fl_right_edge_css = np.max(x_fl) / scale if len(x_fl) > 0 else 0

    fr_top_css = (880 + np.min(y_fr)) / scale if len(y_fr) > 0 else 0
    fr_bottom_css = (880 + np.max(y_fr)) / scale if len(y_fr) > 0 else 0
    fr_height_css = fr_bottom_css - fr_top_css
    fr_width_css = (np.max(x_fr) - np.min(x_fr)) / scale if len(x_fr) > 0 else 0
    fr_left_edge_css = (600 + np.min(x_fr)) / scale if len(x_fr) > 0 else 0

    results["flank_clouds"] = {
        "left": {
            "top_css_y": fl_top_css,
            "bottom_css_y": fl_bottom_css,
            "height_css": fl_height_css,
            "width_css": fl_width_css,
            "inner_edge_css_x": fl_right_edge_css
        },
        "right": {
            "top_css_y": fr_top_css,
            "bottom_css_y": fr_bottom_css,
            "height_css": fr_height_css,
            "width_css": fr_width_css,
            "inner_edge_css_x": fr_left_edge_css
        }
    }

    # ------------------------------------------------------------------
    # 6. POSISI BUNGA SUDUT BAWAH KIRI VS KANAN
    # ------------------------------------------------------------------
    # Bottom floral clusters:
    # Left flower: -bottom-2 -left-2, w-[32%]
    # Right flower: -bottom-2 -right-2, w-[32%]
    # Located at y: 1400..1688
    # Left: x: 0..260 (CSS 0..130)
    # Right: x: 520..780 (CSS 260..390)
    crop_flower_left = img[1420:1688, 0:260]
    crop_flower_right = img[1420:1688, 520:780]

    hsv_fll = cv2.cvtColor(crop_flower_left, cv2.COLOR_BGR2HSV)
    hsv_flr = cv2.cvtColor(crop_flower_right, cv2.COLOR_BGR2HSV)
    # Flower gold / cream petal tones
    mask_fll = cv2.inRange(hsv_fll, np.array([12, 30, 80]), np.array([40, 255, 255]))
    mask_flr = cv2.inRange(hsv_flr, np.array([12, 30, 80]), np.array([40, 255, 255]))

    y_fll, x_fll = np.where(mask_fll > 0)
    y_flr, x_flr = np.where(mask_flr > 0)

    fll_width_css = (np.max(x_fll) - np.min(x_fll)) / scale if len(x_fll) > 0 else 0
    fll_height_css = (np.max(y_fll) - np.min(y_fll)) / scale if len(y_fll) > 0 else 0
    fll_inner_edge_css_x = np.max(x_fll) / scale if len(x_fll) > 0 else 0

    flr_width_css = (np.max(x_flr) - np.min(x_flr)) / scale if len(x_flr) > 0 else 0
    flr_height_css = (np.max(y_flr) - np.min(y_flr)) / scale if len(y_flr) > 0 else 0
    flr_inner_edge_css_x = (520 + np.min(x_flr)) / scale if len(x_flr) > 0 else 0

    results["bottom_flowers"] = {
        "left": {
            "width_css": fll_width_css,
            "height_css": fll_height_css,
            "inner_edge_css_x": fll_inner_edge_css_x
        },
        "right": {
            "width_css": flr_width_css,
            "height_css": flr_height_css,
            "inner_edge_css_x": flr_inner_edge_css_x
        }
    }

    return results

if __name__ == "__main__":
    r1 = analyze_symmetry("qa-artifacts/stage2-sunda-current.png")
    print(json.dumps(r1, indent=2))
    r2 = analyze_symmetry("qa-artifacts/stage2-sunda-vintage-current.png")
    print(json.dumps(r2, indent=2))
