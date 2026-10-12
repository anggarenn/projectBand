import React from "react";

interface ChinoiseriePeonyCornerProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * ChinoiseriePeonyCorner (牡丹雕花角饰)
 * Hiasan sudut bunga peoni emas oriental kekaisaran (Imperial Peony & Ruyi Scrollwork).
 * Melambangkan kemakmuran, kemuliaan, dan keharmonisan rumah tangga (富贵吉祥).
 * Kompatibel untuk 4 sudut dengan rotasi alami / CSS transform.
 */
export function ChinoiseriePeonyCorner({
  className = "w-20 h-20",
  position = "top-left",
}: ChinoiseriePeonyCornerProps) {
  // Transform class helper jika pengguna memilih position secara eksplisit
  const positionClass =
    position === "top-right"
      ? "-scale-x-100"
      : position === "bottom-left"
      ? "-scale-y-100"
      : position === "bottom-right"
      ? "-scale-x-100 -scale-y-100"
      : "";

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] ${positionClass} ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Imperial Peony Gold Gradient */}
        <linearGradient id="peonyGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="25%" stopColor="#F5D77F" />
          <stop offset="60%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#A67C1E" />
          <stop offset="100%" stopColor="#5C420B" />
        </linearGradient>

        {/* Soft Petal Translucent Fill */}
        <radialGradient id="peonyPetalFill" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF8DB" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#9B111E" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* ── ORIENTAL CORNER FRAME (L-Bracket with Meander Key Step) ── */}
      {/* Outer Border with Key Fret Step */}
      <path
        d="M 6 112 L 6 18 L 18 18 L 18 6 L 112 6"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1.2"
        strokeOpacity="0.75"
        strokeLinecap="square"
      />
      {/* Inner Hairline Guide */}
      <path
        d="M 12 96 L 12 24 L 24 24 L 24 12 L 96 12"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.75"
        strokeOpacity="0.45"
      />

      {/* Auspicious Square Spiral in the vertex */}
      <path
        d="M 8 8 L 14 8 L 14 14 L 10 14 L 10 10"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1"
        fill="none"
      />

      {/* ── IMPERIAL PEONY BLOSSOM (Core Floral Center at x=44, y=44) ── */}
      {/* Outer Petal Ring */}
      <path
        d="M 38 28 C 44 20, 56 22, 60 30 C 66 38, 58 46, 50 44 C 42 42, 32 36, 38 28 Z"
        fill="url(#peonyPetalFill)"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1"
      />
      <path
        d="M 28 38 C 20 44, 22 56, 30 60 C 38 66, 46 58, 44 50 C 42 42, 36 32, 28 38 Z"
        fill="url(#peonyPetalFill)"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1"
      />
      <path
        d="M 54 36 C 64 36, 72 44, 68 54 C 64 62, 54 60, 48 52 C 46 44, 48 38, 54 36 Z"
        fill="url(#peonyPetalFill)"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1"
      />
      <path
        d="M 36 54 C 36 64, 44 72, 54 68 C 62 64, 60 54, 52 48 C 44 46, 38 48, 36 54 Z"
        fill="url(#peonyPetalFill)"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1"
      />

      {/* Layered Inner Curved Petals */}
      <path
        d="M 38 40 C 42 34, 52 36, 52 42 C 52 48, 44 50, 40 46 C 36 42, 36 42, 38 40 Z"
        fill="url(#peonyPetalFill)"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1.2"
      />
      <path
        d="M 42 44 C 46 40, 50 42, 48 48 C 46 50, 42 50, 42 44 Z"
        fill="#FFFDF0"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.8"
      />

      {/* Peony Flower Pistil / Golden Stamens */}
      <circle cx="45" cy="43" r="1.5" fill="#FFFDF0" />
      <circle cx="48" cy="46" r="1.2" fill="#FFF8DB" />
      <circle cx="42" cy="46" r="1" fill="#FFF8DB" />

      {/* ── SCROLLING PEONY VINES & RUYI CLOUD TENDRILS (延展缠枝藤蔓) ── */}
      {/* Upper Horizontal Branch extending right */}
      <path
        d="M 58 32 Q 78 26 94 30 Q 106 32 114 26"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Side Leaves (Right Branch) */}
      <path
        d="M 72 26 C 76 18, 86 20, 84 28 C 80 32, 74 30, 72 26 Z"
        fill="url(#peonyGoldGrad)"
        fillOpacity="0.15"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.8"
      />
      <path
        d="M 90 28 C 96 22, 104 25, 100 32 C 96 34, 92 32, 90 28 Z"
        fill="url(#peonyGoldGrad)"
        fillOpacity="0.15"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.75"
      />

      {/* Lower Vertical Branch extending down */}
      <path
        d="M 32 58 Q 26 78 30 94 Q 32 106 26 114"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Side Leaves (Down Branch) */}
      <path
        d="M 26 72 C 18 76, 20 86, 28 84 C 32 80, 30 74, 26 72 Z"
        fill="url(#peonyGoldGrad)"
        fillOpacity="0.15"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.8"
      />
      <path
        d="M 28 90 C 22 96, 25 104, 32 100 C 34 96, 32 92, 28 90 Z"
        fill="url(#peonyGoldGrad)"
        fillOpacity="0.15"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.75"
      />

      {/* ── AUSPICIOUS RUYI CLOUD CURLS (如意祥云卷草) ── */}
      <path
        d="M 24 24 Q 28 32 20 34 Q 14 36 18 42"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 24 24 Q 32 28 34 20 Q 36 14 42 18"
        stroke="url(#peonyGoldGrad)"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />

      {/* Little Auspicious Bud Beads */}
      <circle cx="108" cy="27" r="1.5" fill="url(#peonyGoldGrad)" />
      <circle cx="27" cy="108" r="1.5" fill="url(#peonyGoldGrad)" />
      <circle cx="18" cy="18" r="2" fill="#FFFDF0" />
    </svg>
  );
}
