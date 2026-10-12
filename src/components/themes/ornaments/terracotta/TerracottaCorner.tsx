import React from "react";

interface TerracottaCornerProps {
  className?: string;
}

/**
 * TerracottaCorner
 * Ornamen sudut rustic botanical: pampas grass, dried palm fronds & meadow sprigs.
 * Dirancang dengan nuansa terracotta hangat (#BF573F, #8F3B25, #D29D84).
 */
export function TerracottaCorner({ className = "w-24 h-24" }: TerracottaCornerProps) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_2px_6px_rgba(191,87,63,0.2)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tcCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D98A76" />
          <stop offset="50%" stopColor="#BF573F" />
          <stop offset="100%" stopColor="#8F3B25" />
        </linearGradient>
        <linearGradient id="tcPampasGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E3D4C4" />
          <stop offset="60%" stopColor="#C99E86" />
          <stop offset="100%" stopColor="#BF573F" />
        </linearGradient>
      </defs>

      {/* Boho Arch Corner Hairline */}
      <path
        d="M 6 130 L 6 36 A 30 30 0 0 1 36 6 L 130 6"
        stroke="url(#tcCornerGrad)"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />
      <path
        d="M 12 115 L 12 38 A 26 26 0 0 1 38 12 L 115 12"
        stroke="url(#tcPampasGrad)"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />

      {/* Bohemian Sun Dial Arc Accent at apex */}
      <circle cx="28" cy="28" r="6" stroke="url(#tcCornerGrad)" strokeWidth="1" strokeOpacity="0.5" fill="none" />
      <circle cx="28" cy="28" r="2.5" fill="url(#tcCornerGrad)" fillOpacity="0.6" />

      {/* Dried Palm Spear / Sun Burst Silhouette */}
      <g stroke="url(#tcCornerGrad)" strokeWidth="1.1" strokeLinecap="round" opacity="0.85">
        <path d="M 28 28 L 75 14" />
        <path d="M 28 28 L 68 28" />
        <path d="M 28 28 L 56 46" />
        <path d="M 28 28 L 40 65" />
        <path d="M 28 28 L 22 75" />
        <path d="M 28 28 L 14 62" />
      </g>

      {/* Pampas Grass & Wheat Feathers */}
      <path
        d="M 18 18 Q 50 40 92 35 Q 115 32 130 22"
        stroke="url(#tcPampasGrad)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Pampas Whisps */}
      <g stroke="url(#tcPampasGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75">
        <path d="M 45 32 Q 55 24 64 20" />
        <path d="M 60 36 Q 72 26 80 22" />
        <path d="M 75 35 Q 90 28 100 24" />
        <path d="M 90 34 Q 105 28 118 25" />
        <path d="M 52 35 Q 60 44 68 46" />
        <path d="M 68 37 Q 78 48 88 50" />
        <path d="M 85 36 Q 98 46 108 48" />
      </g>

      {/* Botanical Meadow Sprig Leaves */}
      <g fill="url(#tcCornerGrad)" opacity="0.65">
        <path d="M 38 10 C 44 8 48 14 44 18 C 40 18 36 14 38 10 Z" />
        <path d="M 62 8 C 68 6 72 12 68 16 C 64 16 60 12 62 8 Z" />
        <path d="M 86 6 C 92 4 96 10 92 14 C 88 14 84 10 86 6 Z" />
        <path d="M 10 38 C 8 44 14 48 18 44 C 18 40 14 36 10 38 Z" />
        <path d="M 8 62 C 6 68 12 72 16 68 C 16 64 12 60 8 62 Z" />
        <path d="M 6 86 C 4 92 10 96 14 92 C 14 88 10 84 6 86 Z" />
      </g>
    </svg>
  );
}
