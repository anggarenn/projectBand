import React from "react";

interface MegamendungDividerProps {
  className?: string;
}

/**
 * Pembatas Judul / Header Simetris Berbasis Awan Megamendung.
 * Menggantikan divider ukiran daun floral Jawa pada pemisah judul section.
 */
export function MegamendungDivider({ className = "w-48 h-auto" }: MegamendungDividerProps) {
  return (
    <svg
      viewBox="0 0 360 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="megaDivGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#C59B3C" stopOpacity="0" />
          <stop offset="20%" stopColor="#C59B3C" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#FFF2D6" stopOpacity="1" />
          <stop offset="80%" stopColor="#C59B3C" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C59B3C" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="cloudGoldLeft" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="60%" stopColor="#E5C16C" />
          <stop offset="100%" stopColor="#9E782F" />
        </linearGradient>

        <linearGradient id="cloudGoldRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="60%" stopColor="#E5C16C" />
          <stop offset="100%" stopColor="#9E782F" />
        </linearGradient>
      </defs>

      {/* Garis Horizontal Aksen Mengalir */}
      <line x1="20" y1="25" x2="340" y2="25" stroke="url(#megaDivGrad)" strokeWidth="1" />

      {/* AWAN MEGAMENDUNG KIRI (Menghadap Keluar ke Kiri) */}
      <g transform="translate(150, 25) scale(0.55, 0.45) translate(-130, -50)">
        {/* Layer luar */}
        <path
          d="M 12 55 C 16 32, 40 18, 68 24 C 84 12, 114 10, 138 20 C 158 14, 184 24, 192 42 C 200 60, 184 76, 156 74 C 134 82, 104 80, 78 72 C 54 78, 28 74, 18 62 Z"
          fill="rgba(15, 23, 42, 0.6)"
          stroke="url(#cloudGoldLeft)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Layer dalam */}
        <path
          d="M 32 54 C 36 38, 54 28, 74 32 C 88 24, 110 22, 128 30 C 144 24, 162 32, 168 46 C 174 58, 160 68, 140 66 C 122 72, 100 70, 82 64 C 64 68, 44 64, 38 56 Z"
          fill="none"
          stroke="url(#cloudGoldLeft)"
          strokeWidth="1.8"
          opacity="0.8"
        />
        <circle cx="12" cy="55" r="2.5" fill="#FFF2D6" />
      </g>

      {/* AWAN MEGAMENDUNG KANAN (Menghadap Keluar ke Kanan - Mirror) */}
      <g transform="translate(210, 25) scale(-0.55, 0.45) translate(-130, -50)">
        {/* Layer luar */}
        <path
          d="M 12 55 C 16 32, 40 18, 68 24 C 84 12, 114 10, 138 20 C 158 14, 184 24, 192 42 C 200 60, 184 76, 156 74 C 134 82, 104 80, 78 72 C 54 78, 28 74, 18 62 Z"
          fill="rgba(15, 23, 42, 0.6)"
          stroke="url(#cloudGoldRight)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Layer dalam */}
        <path
          d="M 32 54 C 36 38, 54 28, 74 32 C 88 24, 110 22, 128 30 C 144 24, 162 32, 168 46 C 174 58, 160 68, 140 66 C 122 72, 100 70, 82 64 C 64 68, 44 64, 38 56 Z"
          fill="none"
          stroke="url(#cloudGoldRight)"
          strokeWidth="1.8"
          opacity="0.8"
        />
        <circle cx="12" cy="55" r="2.5" fill="#FFF2D6" />
      </g>

      {/* PUSAT INTAN KEMILAU (Center Sundanese Emblem) */}
      <g transform="translate(180, 25)">
        {/* Diamond Outer */}
        <polygon
          points="0,-12 12,0 0,12 -12,0"
          fill="rgba(20, 18, 15, 0.85)"
          stroke="#E5C16C"
          strokeWidth="1.8"
        />
        {/* Diamond Inner */}
        <polygon
          points="0,-6 6,0 0,6 -6,0"
          fill="#FFF2D6"
        />
        {/* Radiating Accent Dots */}
        <circle cx="-18" cy="0" r="1.6" fill="#E5C16C" />
        <circle cx="18" cy="0" r="1.6" fill="#E5C16C" />
      </g>
    </svg>
  );
}
