"use client";

import React from "react";

interface ChinoiserieMoonGateProps {
  children?: React.ReactNode;
  className?: string;
  size?: number | string;
  glow?: boolean;
}

/**
 * ChinoiserieMoonGate (月亮门)
 * Gerbang Bulan arsitektur oriental klasik dengan bingkai melingkar,
 * border kisi-kisi oriental emas (imperial lattice fretwork), dan pendaran hangat lentera.
 */
export function ChinoiserieMoonGate({
  children,
  className = "",
  glow = true,
}: ChinoiserieMoonGateProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* ── LANTERN & AMBER RADIANCE GLOW ── */}
      {glow && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Deep Imperial Crimson & Amber Glow */}
          <div className="w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#9B111E]/15 via-[#D4AF37]/12 to-[#F5A623]/8 blur-3xl transform scale-110" />
          {/* Core Golden Flare */}
          <div className="absolute w-[200px] sm:w-[280px] h-[200px] sm:h-[280px] rounded-full bg-[#E5C365]/10 blur-2xl" />
        </div>
      )}

      {/* ── VECTOR MOON GATE ARCHWAY FRAME ── */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[420px] max-h-[420px] drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)]"
      >
        <defs>
          {/* Imperial Gold Gradient */}
          <linearGradient id="imperialGoldGate" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DB" />
            <stop offset="25%" stopColor="#E5C365" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#A67C1E" />
            <stop offset="100%" stopColor="#5A420C" />
          </linearGradient>

          {/* Deep Lacquer Inset Gradient */}
          <radialGradient id="gateAura" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="92%" stopColor="#D4AF37" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#9B111E" stopOpacity="0.25" />
          </radialGradient>

          {/* Golden Sheen Highlight */}
          <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFFDF0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer Circular Aura Fill */}
        <circle cx="200" cy="200" r="192" fill="url(#gateAura)" />

        {/* ── TIER 1: Outermost Hairline Trim with Cloud Nods ── */}
        <circle
          cx="200"
          cy="200"
          r="192"
          stroke="url(#imperialGoldGate)"
          strokeWidth="1.2"
          strokeOpacity="0.65"
        />

        {/* ── TIER 2: Meander / Leiwen Key Fret Outer Ring (回纹) ── */}
        <circle
          cx="200"
          cy="200"
          r="184"
          stroke="url(#imperialGoldGate)"
          strokeWidth="3.5"
          strokeDasharray="6 4 2 4"
          strokeOpacity="0.85"
        />

        {/* ── TIER 3: Heavy Imperial Wood/Gold Gate Rim ── */}
        <circle
          cx="200"
          cy="200"
          r="174"
          stroke="url(#imperialGoldGate)"
          strokeWidth="1.8"
        />

        {/* ── TIER 4: Interlocking Geometric Octagonal Lattice (八角窗棂) ── */}
        {/* Cardinal Crossbars */}
        <path
          d="M 200 26 L 200 46 M 200 354 L 200 374 M 26 200 L 46 200 M 354 200 L 374 200"
          stroke="url(#imperialGoldGate)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* 45-degree Diagonal Lattice Spindles */}
        <path
          d="M 77 77 L 91 91 M 309 309 L 323 323 M 323 77 L 309 91 M 77 323 L 91 309"
          stroke="url(#imperialGoldGate)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* ── 8 Auspicious Diamond Studs around the gate rim ── */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 200 + 179 * Math.cos(rad);
          const cy = 200 + 179 * Math.sin(rad);
          return (
            <rect
              key={deg}
              x={cx - 3}
              y={cy - 3}
              width="6"
              height="6"
              transform={`rotate(45 ${cx} ${cy})`}
              fill="url(#imperialGoldGate)"
            />
          );
        })}

        {/* ── TIER 5: Inner Circular Portal Threshold ── */}
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="url(#imperialGoldGate)"
          strokeWidth="2.5"
        />
        <circle
          cx="200"
          cy="200"
          r="154"
          stroke="url(#imperialGoldGate)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          strokeOpacity="0.7"
        />

        {/* ── TOP CREST: Auspicious Clouds & Lantern Pendant Crest (祥云拱顶) ── */}
        <g transform="translate(200, 26)">
          {/* Central Ruyi Cloud Knot */}
          <path
            d="M -18 4 C -18 -4, -6 -10, 0 -6 C 6 -10, 18 -4, 18 4 C 14 10, -14 10, -18 4 Z"
            fill="url(#imperialGoldGate)"
          />
          <circle cx="0" cy="0" r="2.5" fill="#FFF8DB" />
          {/* Flanking scrolling tendrils */}
          <path
            d="M -18 4 C -28 6, -34 0, -32 -6 C -30 -10, -22 -8, -24 -2"
            stroke="url(#imperialGoldGate)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 18 4 C 28 6, 34 0, 32 -6 C 30 -10, 22 -8, 24 -2"
            stroke="url(#imperialGoldGate)"
            strokeWidth="1.2"
            fill="none"
          />
        </g>

        {/* ── BOTTOM CREST: Pedestal Cloud Plinth (须弥祥云底座) ── */}
        <g transform="translate(200, 374)">
          <path
            d="M -22 -4 C -22 4, -8 10, 0 6 C 8 10, 22 4, 22 -4 C 16 -10, -16 -10, -22 -4 Z"
            fill="url(#imperialGoldGate)"
          />
          <circle cx="0" cy="0" r="2.5" fill="#FFF8DB" />
          <path
            d="M -22 -4 C -32 -6, -38 0, -36 6 C -34 10, -26 8, -28 2"
            stroke="url(#imperialGoldGate)"
            strokeWidth="1.2"
            fill="none"
          />
          <path
            d="M 22 -4 C 32 -6, 38 0, 36 6 C 34 10, 26 8, 28 2"
            stroke="url(#imperialGoldGate)"
            strokeWidth="1.2"
            fill="none"
          />
        </g>
      </svg>

      {/* ── OPTIONAL EMBEDDED CONTENT (Photo, Monogram, or Stage Frame) ── */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12 z-10 pointer-events-auto">
          {children}
        </div>
      )}
    </div>
  );
}
