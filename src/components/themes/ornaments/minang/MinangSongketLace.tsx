"use client";

import React from "react";

interface MinangSongketLaceProps {
  className?: string;
  height?: number;
}

/**
 * MinangSongketLace
 * Header Lace Border Emas Songket Halus (Filigree Pandai Sikek & Pucuk Rebung).
 * Diadaptasi dari anatomi luxury Folk Invitation Aceh/Minang:
 * - Top double hairline emas dengan pantulan cahaya kencana
 * - Kisi filigree belah ketupat Saik Galamai & bunga Bungo Cengkeh
 * - Kerancang renda Pucuk Rebung berulang dengan untaian rumbai mutiara gantung
 * - Seamless tiling SVG pattern yang responsif di segala resolusi layar
 */
export function MinangSongketLace({
  className = "",
  height = 56,
}: MinangSongketLaceProps) {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)] ${className}`}
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
          {/* Minang Songket Pure Royal Gold Gradient */}
          <linearGradient id="songketGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="25%" stopColor="#F5D76E" />
            <stop offset="60%" stopColor="#D4A017" />
            <stop offset="100%" stopColor="#784A0B" />
          </linearGradient>

          {/* Golden Ambient Shimmer Gradient */}
          <linearGradient id="songketShine" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0.2" />
            <stop offset="25%" stopColor="#F5D76E" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFDF7" stopOpacity="1" />
            <stop offset="75%" stopColor="#F5D76E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0.2" />
          </linearGradient>

          {/* Marawa Ruby Subtle Accent */}
          <linearGradient id="songketRuby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C41E3A" />
            <stop offset="50%" stopColor="#A31621" />
            <stop offset="100%" stopColor="#4A080C" />
          </linearGradient>

          {/* 48px width repeating Songket Filigree Lace Unit */}
          <pattern
            id="songketFiligreeTile"
            width="48"
            height={height}
            patternUnits="userSpaceOnUse"
          >
            {/* 1. Top Horizon Lines */}
            <line x1="0" y1="2" x2="48" y2="2" stroke="url(#songketGold)" strokeWidth="1.2" />
            <line x1="0" y1="5" x2="48" y2="5" stroke="url(#songketGold)" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.85" />

            {/* 2. Interlocking Diamond Filigree (Saik Galamai Mesh) */}
            {/* Center Diamond Outer */}
            <path
              d="M 24 6 L 46 23 L 24 40 L 2 23 Z"
              stroke="url(#songketGold)"
              strokeWidth="1.1"
              fill="none"
            />
            {/* Center Diamond Inner */}
            <path
              d="M 24 10 L 41 23 L 24 36 L 7 23 Z"
              stroke="url(#songketGold)"
              strokeWidth="0.6"
              strokeDasharray="2 1.5"
              fill="none"
              opacity="0.9"
            />

            {/* 3. Central Floret (Bungo Cengkeh / Saik Galamai Rosette) */}
            <circle cx="24" cy="23" r="2.2" fill="url(#songketGold)" stroke="#5C3908" strokeWidth="0.5" />
            <circle cx="24" cy="23" r="1" fill="#FFFDF7" />

            {/* Cross Petal Spoke Lines */}
            <line x1="24" y1="13" x2="24" y2="33" stroke="url(#songketGold)" strokeWidth="0.7" opacity="0.85" />
            <line x1="14" y1="23" x2="34" y2="23" stroke="url(#songketGold)" strokeWidth="0.7" opacity="0.85" />
            {/* Diagonal Petal Dots */}
            <circle cx="19" cy="18" r="0.9" fill="#F5D76E" />
            <circle cx="29" cy="18" r="0.9" fill="#F5D76E" />
            <circle cx="19" cy="28" r="0.9" fill="#F5D76E" />
            <circle cx="29" cy="28" r="0.9" fill="#F5D76E" />

            {/* Half-Diamonds on Left & Right Seams (Seamless Interlocking) */}
            <path
              d="M 0 6 L 12 15.5 L 0 25 M 48 6 L 36 15.5 L 48 25"
              stroke="url(#songketGold)"
              strokeWidth="0.9"
              fill="none"
            />
            <path
              d="M 0 25 L 12 34.5 L 0 44 M 48 25 L 36 34.5 L 48 44"
              stroke="url(#songketGold)"
              strokeWidth="0.9"
              fill="none"
            />
            <circle cx="0" cy="23" r="1.4" fill="url(#songketGold)" />
            <circle cx="48" cy="23" r="1.4" fill="url(#songketGold)" />

            {/* 4. Scalloped Lace Fringe & Pucuk Rebung Chevron Drops */}
            {/* Center Hanging Chevron Point */}
            <path
              d="M 12 40 C 16 43, 20 48, 24 53 C 28 48, 32 43, 36 40"
              stroke="url(#songketGold)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Inner chevron loop */}
            <path
              d="M 17 40 C 20 43, 22 47, 24 50 C 26 47, 28 43, 31 40"
              stroke="url(#songketGold)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.8"
            />
            {/* Center Hanging Pearl Tassel Droplet */}
            <circle cx="24" cy="53" r="1.8" fill="url(#songketGold)" stroke="#5C3908" strokeWidth="0.5" />
            <circle cx="24" cy="53" r="0.9" fill="#FFFDF7" />

            {/* Side Secondary Scallop Drop on Seams */}
            <path
              d="M 36 40 C 40 43, 44 47, 48 49 M 12 40 C 8 43, 4 47, 0 49"
              stroke="url(#songketGold)"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="0" cy="49" r="1.2" fill="#F5D76E" />
            <circle cx="48" cy="49" r="1.2" fill="#F5D76E" />
          </pattern>
        </defs>

        {/* Seamless Repeating Songket Filigree Mesh */}
        <rect width="100%" height={height} fill="url(#songketFiligreeTile)" />

        {/* Top Rim Shimmer Line */}
        <line x1="0" y1="1" x2="100%" y2="1" stroke="url(#songketShine)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
