import React from "react";

interface ShuangXiSealProps {
  className?: string;
  initials?: string;
  subtitle?: string;
  onClick?: () => void;
  isOpening?: boolean;
}

/**
 * ShuangXiSeal
 * Segel stempel emas / pernis merah kekaisaran berlambang Shuang Xi (囍 Double Happiness),
 * simbol kebahagiaan ganda dan kemakmuran abadi pernikahan tradisi Tionghoa / Sangjit.
 */
export function ShuangXiSeal({
  className = "w-20 h-20",
  initials,
  subtitle,
  onClick,
  isOpening = false,
}: ShuangXiSealProps) {
  return (
    <div
      onClick={onClick}
      className={`relative select-none group ${
        onClick ? "cursor-pointer" : "pointer-events-none"
      } ${
        isOpening
          ? "scale-125 opacity-0 rotate-6 blur-sm pointer-events-none"
          : "transition-transform duration-500 hover:scale-105 active:scale-95"
      } ${className}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label="Segel Shuang Xi Kebahagiaan Ganda"
    >
      {/* Outer Imperial Gold Halo */}
      <div className="absolute inset-0 rounded-full bg-[#D4AF37]/30 blur-md group-hover:bg-[#D4AF37]/50 transition-all duration-500 scale-110 pointer-events-none" />

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_24px_rgba(59,8,12,0.85)]"
      >
        <defs>
          {/* Imperial Lacquer Base Gradient */}
          <radialGradient id="shuangxiBase" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#C92A2A" />
            <stop offset="40%" stopColor="#991B1B" />
            <stop offset="75%" stopColor="#5C131A" />
            <stop offset="100%" stopColor="#3B080C" />
          </radialGradient>

          {/* Gold Ingot Specular Rim Gradient */}
          <linearGradient id="shuangxiGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="25%" stopColor="#FDE047" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#B48A20" />
            <stop offset="100%" stopColor="#785912" />
          </linearGradient>

          {/* Deep Emboss Shadow */}
          <filter id="shuangxiShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Outer Circular Seal Boundary with Fluted Flower Petals Rim */}
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="url(#shuangxiBase)"
          stroke="url(#shuangxiGold)"
          strokeWidth="1.8"
        />

        {/* Outer Concentric Beaded / Dot Ring */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#shuangxiGold)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.8"
        />

        {/* Inner Sunken Disc */}
        <circle
          cx="50"
          cy="50"
          r="37"
          fill="#5C131A"
          stroke="url(#shuangxiGold)"
          strokeWidth="1.2"
          filter="url(#shuangxiShadow)"
        />

        {/* ── CALLIGRAPHIC EMBOSSED SHUANG XI 囍 ── */}
        <g filter="url(#shuangxiShadow)" transform="translate(0, 0)">
          {/* Top Crossbar Left */}
          <rect x="25" y="27" width="22" height="3" rx="0.5" fill="url(#shuangxiGold)" />
          {/* Top Crossbar Right */}
          <rect x="53" y="27" width="22" height="3" rx="0.5" fill="url(#shuangxiGold)" />

          {/* Vertical Stems Top Left */}
          <rect x="30" y="24" width="3" height="9" rx="0.5" fill="url(#shuangxiGold)" />
          <rect x="40" y="24" width="3" height="9" rx="0.5" fill="url(#shuangxiGold)" />
          {/* Vertical Stems Top Right */}
          <rect x="58" y="24" width="3" height="9" rx="0.5" fill="url(#shuangxiGold)" />
          <rect x="68" y="24" width="3" height="9" rx="0.5" fill="url(#shuangxiGold)" />

          {/* Upper Box 'Kou' 口 Left */}
          <rect x="27" y="37" width="18" height="11" rx="0.5" fill="none" stroke="url(#shuangxiGold)" strokeWidth="2.4" />
          {/* Upper Box 'Kou' 口 Right */}
          <rect x="55" y="37" width="18" height="11" rx="0.5" fill="none" stroke="url(#shuangxiGold)" strokeWidth="2.4" />

          {/* Middle Connecting Bridge Bar */}
          <rect x="23" y="52" width="54" height="2.8" rx="0.5" fill="url(#shuangxiGold)" />

          {/* Lower Crossbar Left */}
          <rect x="25" y="59" width="22" height="2.6" rx="0.5" fill="url(#shuangxiGold)" />
          {/* Lower Crossbar Right */}
          <rect x="53" y="59" width="22" height="2.6" rx="0.5" fill="url(#shuangxiGold)" />

          {/* Lower Vertical Stems Left */}
          <rect x="30" y="56" width="3" height="8" rx="0.5" fill="url(#shuangxiGold)" />
          <rect x="40" y="56" width="3" height="8" rx="0.5" fill="url(#shuangxiGold)" />
          {/* Lower Vertical Stems Right */}
          <rect x="58" y="56" width="3" height="8" rx="0.5" fill="url(#shuangxiGold)" />
          <rect x="68" y="56" width="3" height="8" rx="0.5" fill="url(#shuangxiGold)" />

          {/* Lower Box 'Kou' 口 Left */}
          <rect x="27" y="66" width="18" height="12" rx="0.5" fill="none" stroke="url(#shuangxiGold)" strokeWidth="2.4" />
          {/* Lower Box 'Kou' 口 Right */}
          <rect x="55" y="66" width="18" height="12" rx="0.5" fill="none" stroke="url(#shuangxiGold)" strokeWidth="2.4" />
        </g>

        {/* Specular Curved Highlight */}
        <path
          d="M 24 24 A 36 36 0 0 1 76 24"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Optional Initials Subtitle if passed */}
        {initials && (
          <text
            x="50"
            y="87"
            textAnchor="middle"
            fontSize="7"
            fontFamily="serif"
            fontWeight="bold"
            fill="url(#shuangxiGold)"
            letterSpacing="1"
          >
            {initials}
          </text>
        )}
      </svg>
    </div>
  );
}
