import React from "react";

interface BaliPatraCornerProps {
  className?: string;
}

/**
 * BaliPatraCorner
 * Ornamen Sudut Patra Punggel Khas Ukiran Bali.
 * Motif sulur ukiran emas khas pura dan puri Bali, membingkai sudut kartu dan panggung
 * dengan lengkungan spiral dinamis (kuping guling) dan dedaunan kencana bertatah permata.
 */
export function BaliPatraCorner({ className = "w-20 h-20" }: BaliPatraCornerProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none transition-transform duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="patraCornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#FDE68A" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8C6B1C" stopOpacity="0.65" />
        </linearGradient>

        <linearGradient id="patraCornerLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.9" />
          <stop offset="65%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Frame Border Corner Lines (L-Shape) */}
      <path
        d="M 6 110 L 6 6 L 110 6"
        stroke="url(#patraCornerLine)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M 14 85 L 14 14 L 85 14"
        stroke="url(#patraCornerLine)"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        opacity="0.65"
      />

      {/* Corner Diamond Jewels */}
      <circle cx="6" cy="6" r="3" fill="#FFFDF7" stroke="#D4AF37" strokeWidth="1" />
      <circle cx="14" cy="14" r="1.8" fill="#FDE68A" />

      {/* Patra Punggel Main Tendril 1 (Spiraling inward into corner) */}
      <path
        d="M 12 28
           C 25 18, 48 18, 62 26
           C 74 33, 80 48, 75 60
           C 70 72, 54 75, 45 68
           C 36 60, 40 44, 52 42
           C 62 40, 68 50, 62 58"
        fill="none"
        stroke="url(#patraCornerGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Center Spiral Bud / Bunga Sari */}
      <circle cx="56" cy="50" r="3.5" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="1" />

      {/* Sub-Tendril 2 (Branching outward along top edge) */}
      <path
        d="M 38 18
           C 52 10, 72 10, 88 18
           C 98 23, 102 32, 98 40
           C 94 48, 82 50, 76 44
           C 70 38, 76 28, 84 28"
        fill="none"
        stroke="url(#patraCornerGold)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Sub-Tendril 3 (Branching outward along left vertical edge) */}
      <path
        d="M 18 38
           C 10 52, 10 72, 18 88
           C 23 98, 32 102, 40 98
           C 48 94, 50 82, 44 76
           C 38 70, 28 76, 28 84"
        fill="none"
        stroke="url(#patraCornerGold)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Decorative Leaf Serifs (Kuping Celeng Punggel) */}
      <path d="M 28 20 C 35 15, 42 16, 46 22" stroke="#FFFDF7" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 20 28 C 15 35, 16 42, 22 46" stroke="#FFFDF7" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 68 22 C 76 18, 82 22, 85 28" stroke="#FFFDF7" strokeWidth="1" strokeLinecap="round" />
      <path d="M 22 68 C 18 76, 22 82, 28 85" stroke="#FFFDF7" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
