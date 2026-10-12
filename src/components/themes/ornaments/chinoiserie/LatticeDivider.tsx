import React from "react";

interface LatticeDividerProps {
  className?: string;
}

/**
 * LatticeDivider
 * Divider geometris emas bergaya Chinoiserie Fretwork / Wanzi meander
 * dengan simpul keberuntungan (Pan Chang / Auspicious Knot) di tengah.
 */
export function LatticeDivider({ className = "w-44 sm:w-56 h-auto" }: LatticeDividerProps) {
  return (
    <svg
      viewBox="0 0 320 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none mx-auto my-3 drop-shadow-[0_1px_6px_rgba(212,175,55,0.45)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chinDivGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="20%" stopColor="#D4AF37" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FFF8E1" stopOpacity="1" />
          <stop offset="80%" stopColor="#D4AF37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="chinGoldMedallion" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="40%" stopColor="#E6C65C" />
          <stop offset="80%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>

      {/* Hairline Rule Sayap Kiri */}
      <line x1="16" y1="14" x2="120" y2="14" stroke="url(#chinDivGrad)" strokeWidth="0.8" />
      {/* Hairline Rule Sayap Kanan */}
      <line x1="200" y1="14" x2="304" y2="14" stroke="url(#chinDivGrad)" strokeWidth="0.8" />

      {/* Cloud Meander Steps Kiri */}
      <path
        d="M 120 14 L 128 14 L 128 10 L 134 10 L 134 18 L 140 18 L 140 14 L 146 14"
        stroke="url(#chinDivGrad)"
        strokeWidth="0.85"
        strokeLinecap="square"
      />

      {/* Cloud Meander Steps Kanan */}
      <path
        d="M 200 14 L 192 14 L 192 10 L 186 10 L 186 18 L 180 18 L 180 14 L 174 14"
        stroke="url(#chinDivGrad)"
        strokeWidth="0.85"
        strokeLinecap="square"
      />

      {/* Pusat Medallion: Chinese Auspicious Knot / Medallion (Pan Chang) */}
      {/* Outer Diamond Ribbon */}
      <polygon
        points="160,2 172,14 160,26 148,14"
        fill="none"
        stroke="url(#chinGoldMedallion)"
        strokeWidth="1.2"
      />
      {/* Inner Interlocking Diamond */}
      <polygon
        points="160,6 168,14 160,22 152,14"
        fill="url(#chinGoldMedallion)"
        fillOpacity="0.2"
        stroke="url(#chinGoldMedallion)"
        strokeWidth="0.75"
      />

      {/* Center Golden Pearl / Ruby Core */}
      <circle cx="160" cy="14" r="2.5" fill="#FFFDF0" />
      <circle cx="160" cy="14" r="1.5" fill="#991B1B" />

      {/* Auspicious Flanking Circles */}
      <circle cx="110" cy="14" r="1.5" fill="#D4AF37" fillOpacity="0.7" />
      <circle cx="210" cy="14" r="1.5" fill="#D4AF37" fillOpacity="0.7" />
    </svg>
  );
}
