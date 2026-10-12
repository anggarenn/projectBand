"use client";

import React from "react";

interface AcehPintoLaceProps {
  className?: string;
  height?: number;
}

/**
 * AcehPintoLace
 * Renda atap pelmet emas (Ceiling Valance) motif Pinto Aceh & Bungong Jeumpa.
 * Mengusung filosofi Sacred Heritage Noir (Quiet Luxury):
 * - Top double hairline emas kencana dengan pantulan cahaya sutra kasab.
 * - Gerbang lengkung ramping Pinto Aceh berulang dengan kisi vertikal (teralis pintu gerbang mahkota).
 * - Kelopak mekar Bungong Jeumpa anggun dengan putik permata berkilau.
 * - Rumbai kerancang renda beruntai butiran mutiara emas gantung (hanging teardrop tassels).
 * - Pola tiling SVG presisi tinggi yang seamless di seluruh resolusi layar (mobile hingga desktop).
 */
export function AcehPintoLace({
  className = "",
  height = 56,
}: AcehPintoLaceProps) {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.92)] ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 1000 ${height}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        <defs>
          {/* Aceh Pure Royal Kencana Gold Gradient */}
          <linearGradient id="acehGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="25%" stopColor="#F5D76E" />
            <stop offset="60%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#6E4407" />
          </linearGradient>

          {/* Golden Specular Shimmer Gradient */}
          <linearGradient id="acehGoldShimmer" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.25" />
            <stop offset="25%" stopColor="#F5D76E" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFDF7" stopOpacity="1" />
            <stop offset="75%" stopColor="#F5D76E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0.25" />
          </linearGradient>

          {/* Deep Kasab Antique Shadow Gradient */}
          <linearGradient id="acehKasabBronze" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A017" />
            <stop offset="50%" stopColor="#8C5C0F" />
            <stop offset="100%" stopColor="#4A2E05" />
          </linearGradient>

          {/* 54px width repeating Pinto Aceh & Bungong Jeumpa Unit */}
          <pattern
            id="acehPintoLaceTile"
            width="54"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* 1. TOP CEILING GUIDELINES */}
            {/* Outer hairline rule */}
            <line x1="0" y1="2" x2="54" y2="2" stroke="url(#acehGoldGrad)" strokeWidth="1.2" />
            {/* Inner dashed delicate kasab line */}
            <line
              x1="0"
              y1="5.5"
              x2="54"
              y2="5.5"
              stroke="url(#acehGoldGrad)"
              strokeWidth="0.6"
              strokeDasharray="2.5 1.5"
              opacity="0.85"
            />

            {/* 2. PINTO ACEH ICONIC ARCH SILHOUETTE (Center unit x=27) */}
            {/* Outer pointed arch frame */}
            <path
              d="M 12 40 C 12 24, 21 14, 27 7 C 33 14, 42 24, 42 40"
              stroke="url(#acehGoldGrad)"
              strokeWidth="1.1"
              fill="none"
              strokeLinecap="round"
            />
            {/* Inner pointed arch contour */}
            <path
              d="M 16 40 C 16 26, 23 18, 27 12 C 31 18, 38 26, 38 40"
              stroke="url(#acehGoldGrad)"
              strokeWidth="0.6"
              strokeDasharray="2 1.5"
              fill="none"
              opacity="0.9"
            />

            {/* Pinto Gate Finial / Crown Pinnacle */}
            <path
              d="M 27 7 L 27 3 M 25.5 4.5 L 28.5 4.5"
              stroke="url(#acehGoldGrad)"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
            <circle cx="27" cy="3" r="1" fill="#FFFDF7" />

            {/* Vertical Teralis / Slender Rails (Kisi-kisi Pintu Istana Sultan) */}
            <line x1="21" y1="23" x2="21" y2="40" stroke="url(#acehGoldGrad)" strokeWidth="0.6" opacity="0.8" />
            <line x1="27" y1="16" x2="27" y2="40" stroke="url(#acehGoldGrad)" strokeWidth="0.7" opacity="0.9" />
            <line x1="33" y1="23" x2="33" y2="40" stroke="url(#acehGoldGrad)" strokeWidth="0.6" opacity="0.8" />

            {/* 3. BUNGONG JEUMPA CENTRAL ROSETTE (Center x=27, y=28) */}
            {/* Petal diamond halo */}
            <path
              d="M 27 21 L 32 28 L 27 35 L 22 28 Z"
              stroke="url(#acehGoldGrad)"
              strokeWidth="0.8"
              fill="none"
            />
            {/* Central Rosette Core Gem */}
            <circle cx="27" cy="28" r="2.2" fill="url(#acehGoldGrad)" stroke="#4A2E05" strokeWidth="0.5" />
            <circle cx="27" cy="28" r="1" fill="#FFFDF7" />

            {/* Diagonal petal beads (Pucuk bunga mekar) */}
            <circle cx="23.5" cy="24.5" r="0.8" fill="#F5D76E" />
            <circle cx="30.5" cy="24.5" r="0.8" fill="#F5D76E" />
            <circle cx="23.5" cy="31.5" r="0.8" fill="#F5D76E" />
            <circle cx="30.5" cy="31.5" r="0.8" fill="#F5D76E" />

            {/* 4. SEAM INTERLOCKING ARCHES (x=0 & x=54 - Pucok Reubong Swags) */}
            <path
              d="M 0 10 C 5 18, 9 28, 12 40"
              stroke="url(#acehGoldGrad)"
              strokeWidth="0.8"
              fill="none"
            />
            <path
              d="M 54 10 C 49 18, 45 28, 42 40"
              stroke="url(#acehGoldGrad)"
              strokeWidth="0.8"
              fill="none"
            />
            <circle cx="0" cy="26" r="1.3" fill="url(#acehGoldGrad)" />
            <circle cx="54" cy="26" r="1.3" fill="url(#acehGoldGrad)" />

            {/* 5. SCALLOPED LOWER LACE VALANCE & TASSEL DROPS */}
            {/* Center Hanging Scallop Point (Pinto Arch Apron) */}
            <path
              d="M 12 40 C 17 44, 22 49, 27 53 C 32 49, 37 44, 42 40"
              stroke="url(#acehGoldGrad)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Inner delicate scallop loop */}
            <path
              d="M 16 40 C 20 44, 23 48, 27 50.5 C 31 48, 34 44, 38 40"
              stroke="url(#acehGoldGrad)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.8"
            />

            {/* Center Hanging Golden Teardrop Pearl Tassel */}
            <line x1="27" y1="50.5" x2="27" y2="53" stroke="url(#acehGoldGrad)" strokeWidth="0.7" />
            <circle cx="27" cy="53" r="1.8" fill="url(#acehGoldGrad)" stroke="#4A2E05" strokeWidth="0.4" />
            <circle cx="27" cy="53" r="0.8" fill="#FFFDF7" />

            {/* Side Interlocking Fringe Drops at Seam (x=0 & x=54) */}
            <path
              d="M 42 40 C 46 44, 50 48, 54 50 M 12 40 C 8 44, 4 48, 0 50"
              stroke="url(#acehGoldGrad)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="0" cy="50" r="1.2" fill="#F5D76E" />
            <circle cx="54" cy="50" r="1.2" fill="#F5D76E" />
          </pattern>
        </defs>

        {/* Tiled Lace Runner Rectangle */}
        <rect
          x="0"
          y="0"
          width="100%"
          height={height}
          fill="url(#acehPintoLaceTile)"
        />

        {/* Shimmer Highlight Overlay Bar across top */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="3"
          fill="url(#acehGoldShimmer)"
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
