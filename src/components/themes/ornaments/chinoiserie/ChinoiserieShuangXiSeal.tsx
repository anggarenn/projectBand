"use client";

import React from "react";

interface ChinoiserieShuangXiSealProps {
  className?: string;
  onClick?: () => void;
  isOpening?: boolean;
  initials?: string;
  subtitle?: string;
  glow?: boolean;
}

/**
 * ChinoiserieShuangXiSeal (囍 双喜印章)
 * Segel emas Double Happiness (囍) bergaya Medali Kekaisaran (Imperial Seal / Wax Stamp)
 * Dilengkapi border motif awan keberuntungan (祥云 / Xiangyun), kilau emas metalik 3D,
 * dan animasi putar lambat yang elegan.
 */
export function ChinoiserieShuangXiSeal({
  className = "w-20 h-20 sm:w-24 sm:h-24",
  onClick,
  isOpening = false,
  subtitle,
  glow = true,
}: ChinoiserieShuangXiSealProps) {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer transition-all duration-700 select-none group ${
        isOpening
          ? "scale-125 opacity-0 rotate-12 blur-sm pointer-events-none"
          : "hover:scale-105 active:scale-95"
      } ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Buka segel Double Happiness"
    >
      {/* ── AMBIENT WARM GOLDEN HALO ── */}
      {glow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9B111E]/40 via-[#D4AF37]/35 to-[#FFF8DB]/20 blur-md group-hover:blur-lg transition-all duration-500 scale-110 pointer-events-none" />
      )}

      {/* ── ROTATING OUTER LATTICE RING (SLOW PASSIVE ROTATION) ── */}
      <div className="absolute inset-[-4px] pointer-events-none animate-spin-slow">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-60"
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="#E5C365"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
          {/* 4 Cardinal Dot Accents */}
          <circle cx="50" cy="3" r="1.5" fill="#FFF8DB" />
          <circle cx="50" cy="97" r="1.5" fill="#FFF8DB" />
          <circle cx="3" cy="50" r="1.5" fill="#FFF8DB" />
          <circle cx="97" cy="50" r="1.5" fill="#FFF8DB" />
        </svg>
      </div>

      {/* ── 3D IMPERIAL GOLD MEDALLION SVG ── */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Beveled Rim Radial Gradient */}
          <radialGradient id="shuangXiRim" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF8DB" />
            <stop offset="25%" stopColor="#F5D77F" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#9E781E" />
            <stop offset="100%" stopColor="#4A3408" />
          </radialGradient>

          {/* Deep Cinnabar / Imperial Red Inset (Piringan Segel) */}
          <radialGradient id="sealDisc" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#B31B25" />
            <stop offset="60%" stopColor="#800F17" />
            <stop offset="100%" stopColor="#4A050A" />
          </radialGradient>

          {/* 3D Gold Character Emboss Gradient */}
          <linearGradient id="embossGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FFF0B3" />
            <stop offset="50%" stopColor="#E5C365" />
            <stop offset="80%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6714" />
          </linearGradient>

          {/* Specular Glint */}
          <linearGradient id="sealGlint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <filter id="sealInnerShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ── Outer Scalloped / Petal Medallion Border (8 Auspicious Ruyi Lobes) ── */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#shuangXiRim)"
          stroke="#5C420B"
          strokeWidth="0.8"
        />

        {/* ── Inner Beveled Gold Step Ring ── */}
        <circle
          cx="50"
          cy="50"
          r="43"
          stroke="#FFFDF0"
          strokeWidth="0.75"
          opacity="0.8"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#7A5A12"
          strokeWidth="1.2"
        />

        {/* ── Imperial Red / Lacquer Medallion Disc ── */}
        <circle
          cx="50"
          cy="50"
          r="37"
          fill="url(#sealDisc)"
          filter="url(#sealInnerShadow)"
          stroke="#D4AF37"
          strokeWidth="0.7"
        />

        {/* ── Auspicious Xiangyun Cloud Filigree Ring (祥云环) ── */}
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke="#E5C365"
          strokeWidth="0.6"
          strokeDasharray="2 3"
          opacity="0.6"
        />

        {/* ── DOUBLE HAPPINESS (囍) EMBOSSED CHARACTER ── */}
        {/* Geometric Precision Calligraphy Vectors for 囍 */}
        <g id="shuangxi-character" fill="url(#embossGold)" filter="url(#sealInnerShadow)">
          {/* Left "喜" Character */}
          {/* Top 士: Horizontal 1 */}
          <rect x="23" y="27" width="12" height="2.2" rx="0.5" />
          {/* Top 士: Vertical */}
          <rect x="28" y="24" width="2.2" height="7.5" rx="0.4" />
          {/* Top 士: Horizontal 2 (shorter) */}
          <rect x="25" y="32" width="8" height="1.8" rx="0.4" />

          {/* Middle 口: Enclosed Box */}
          <rect x="24.5" y="36" width="9" height="6.5" rx="0.6" fill="none" stroke="url(#embossGold)" strokeWidth="1.8" />

          {/* Middle Crossbar linking to center */}
          <rect x="22" y="44.5" width="14" height="2" rx="0.5" />
          <rect x="28" y="44.5" width="2.2" height="6" rx="0.4" />
          <rect x="24" y="51" width="10" height="1.8" rx="0.4" />

          {/* Bottom 口: Enclosed Box */}
          <rect x="24" y="55" width="10" height="8" rx="0.8" fill="none" stroke="url(#embossGold)" strokeWidth="2" />

          {/* Right "喜" Character */}
          {/* Top 士: Horizontal 1 */}
          <rect x="65" y="27" width="12" height="2.2" rx="0.5" />
          {/* Top 士: Vertical */}
          <rect x="70" y="24" width="2.2" height="7.5" rx="0.4" />
          {/* Top 士: Horizontal 2 (shorter) */}
          <rect x="67" y="32" width="8" height="1.8" rx="0.4" />

          {/* Middle 口: Enclosed Box */}
          <rect x="66.5" y="36" width="9" height="6.5" rx="0.6" fill="none" stroke="url(#embossGold)" strokeWidth="1.8" />

          {/* Middle Crossbar linking to center */}
          <rect x="64" y="44.5" width="14" height="2" rx="0.5" />
          <rect x="70" y="44.5" width="2.2" height="6" rx="0.4" />
          <rect x="66" y="51" width="10" height="1.8" rx="0.4" />

          {/* Bottom 口: Enclosed Box */}
          <rect x="66" y="55" width="10" height="8" rx="0.8" fill="none" stroke="url(#embossGold)" strokeWidth="2" />

          {/* ── Central Connecting Bridge Bars (Symbol of Unbreakable Marriage) ── */}
          <rect x="34" y="44.5" width="32" height="2" rx="0.5" />
          <rect x="33" y="51" width="34" height="1.8" rx="0.4" />
        </g>

        {/* ── Specular Crescent Arc Highlight ── */}
        <path
          d="M 22 26 A 34 34 0 0 1 78 26"
          stroke="url(#sealGlint)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Subtle Bottom Gold Rim Glow */}
        <path
          d="M 28 78 A 34 34 0 0 0 72 78"
          stroke="#E5C365"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>

      {/* Subtitle Caption (e.g. "SANGJIT" / "DOUBLE HAPPINESS") */}
      {subtitle && (
        <span className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#E5C365] font-serif font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
          {subtitle}
        </span>
      )}
    </div>
  );
}
