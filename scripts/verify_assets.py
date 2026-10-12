import os
from PIL import Image

assets = [
    # Bali
    'invitation-app/public/assets/motion-art-bali/bg-stage-bali-candibentar.webp',
    'invitation-app/public/assets/motion-art-bali/bg-cover-bali-candibentar.webp',
    'invitation-app/public/assets/motion-art-bali/bali-floral-left.webp',
    'invitation-app/public/assets/motion-art-bali/bali-floral-right.webp',
    'invitation-app/public/assets/motion-art-bali/bali-temple-mist.webp',
    'invitation-app/public/assets/motion-art-bali/bali-canopy-top.webp',
    # Minang
    'invitation-app/public/assets/motion-art-minang/bg-stage-minang-rumahgadang.webp',
    'invitation-app/public/assets/motion-art-minang/bg-cover-minang-rumahgadang.webp',
    'invitation-app/public/assets/motion-art-minang/minang-floral-left.webp',
    'invitation-app/public/assets/motion-art-minang/minang-floral-right.webp',
    'invitation-app/public/assets/motion-art-minang/minang-highland-mist.webp',
    # Jawa
    'invitation-app/public/assets/motion-art-jawa/bg-stage-joglo-emerald.webp',
    'invitation-app/public/assets/motion-art-jawa/bg-cover-joglo-emerald.webp',
]

print(f"{'File Name':<35} | {'Dimensions':<12} | {'Mode':<5} | {'Weight (KB)':<11} | {'Size OK':<7} | {'Extrema Status'}")
print("-" * 115)

all_ok = True
for path in assets:
    fname = os.path.basename(path)
    if not os.path.exists(path):
        print(f"{fname:<35} | MISSING FILE!")
        all_ok = False
        continue
    
    im = Image.open(path)
    size_kb = os.path.getsize(path) / 1024
    extrema = im.getextrema()
    
    # Target range: 30KB - 120KB
    size_ok = 30.0 <= size_kb <= 120.0
    if not size_ok:
        all_ok = False
        
    # Check extrema
    is_blank = False
    if im.mode == "RGB":
        is_blank = all(e == (0, 0) for e in extrema)
    elif im.mode == "RGBA":
        is_blank = extrema[3][1] == 0 or all(e == (0, 0) for e in extrema[:3])
        
    status_str = "VALID (Non-zero)" if not is_blank else "BLANK/ZERO!"
    if is_blank:
        all_ok = False
        
    print(f"{fname:<35} | {str(im.size):<12} | {im.mode:<5} | {size_kb:8.1f} KB | {str(size_ok):<7} | {status_str} {extrema}")

print("-" * 115)
print("OVERALL ASSET VERIFICATION:", "ALL 12 ASSETS PASSED PERFECTLY!" if all_ok else "SOME ASSETS FAILED CHECKS!")
