import React from "react";

interface ChinoiserieLatticeDividerProps {
  className?: string;
}

/**
 * ChinoiserieLatticeDivider (窗棂格纹隔断)
 * Pembatas section bermotif kisi-kisi oriental klasik (Imperial Octagonal Lattice & Ruyi Knots).
 * Memberikan jeda visual bernuansa kemewahan oriental tenang (Quiet Luxury Imperial).
 */
export function ChinoiserieLatticeDivider({
  className = "w-48 sm:w-64 h-auto",
}: ChinoiserieLatticeDividerProps) {
  return (
    <svg
      viewBox="0 0 320 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none mx-auto my-3 drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Tapering Gold Line Gradient */}
        <linearGradient id="cnDividerLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FFF8DB" stopOpacity="0.9" />
          <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>

        {/* Center Lattice Gold Gradient */}
        <linearGradient id="cnLatticeGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="30%" stopColor="#F5D77F" />
          <stop offset="65%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6714" />
        </linearGradient>

        {/* Inset Shadow Filter */}
        <filter id="latticeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* ── HAIRLINE RULES (Tapering from edges to center) ── */}
      <line x1="16" y1="14" x2="120" y2="14" stroke="url(#cnDividerLineGrad)" strokeWidth="0.8" />
      <line x1="200" y1="14" x2="304" y2="14" stroke="url(#cnDividerLineGrad)" strokeWidth="0.8" />

      {/* Secondary Parallel Hairline (Double Layered Imperial Trim) */}
      <line x1="36" y1="16.5" x2="114" y2="16.5" stroke="url(#cnDividerLineGrad)" strokeWidth="0.4" strokeOpacity="0.6" />
      <line x1="206" y1="16.5" x2="284" y2="16.5" stroke="url(#cnDividerLineGrad)" strokeWidth="0.4" strokeOpacity="0.6" />

      {/* ── ACCENT BEADS & DOTS ── */}
      <circle cx="98" cy="14" r="1.2" fill="#D4AF37" />
      <circle cx="222" cy="14" r="1.2" fill="#D4AF37" />
      <circle cx="114" cy="14" r="1.8" fill="#FFF8DB" />
      <circle cx="206" cy="14" r="1.8" fill="#FFF8DB" />

      {/* ── LEFT RUYI CLOUD SCROLL (如意卷纹) ── */}
      <path
        d="M 132 14 C 126 9, 120 10, 122 15 C 124 18, 130 18, 134 14"
        stroke="url(#cnLatticeGold)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="123" cy="12" r="1" fill="#FFF8DB" />

      {/* ── RIGHT RUYI CLOUD SCROLL (如意卷纹) ── */}
      <path
        d="M 188 14 C 194 9, 200 10, 198 15 C 196 18, 190 18, 186 14"
        stroke="url(#cnLatticeGold)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="197" cy="12" r="1" fill="#FFF8DB" />

      {/* ── CENTER IMPERIAL OCTAGONAL LATTICE MEDALLION (八角窗格) ── */}
      <g filter="url(#latticeShadow)">
        {/* Outer Octagon Frame */}
        <polygon
          points="152,4 168,4 176,10 176,18 168,24 152,24 144,18 144,10"
          stroke="url(#cnLatticeGold)"
          strokeWidth="1.2"
          fill="#1A0406"
          fillOpacity="0.45"
        />

        {/* Inner Octagon Step */}
        <polygon
          points="154,6.5 166,6.5 173,11.5 173,16.5 166,21.5 154,21.5 147,16.5 147,11.5"
          stroke="url(#cnLatticeGold)"
          strokeWidth="0.6"
          strokeDasharray="1.5 1.5"
          fill="none"
        />

        {/* Center Fretwork Crossbars (Window Grid / 窗棂格) */}
        <line x1="148" y1="14" x2="172" y2="14" stroke="url(#cnLatticeGold)" strokeWidth="0.9" />
        <line x1="160" y1="6" x2="160" y2="22" stroke="url(#cnLatticeGold)" strokeWidth="0.9" />

        {/* Inner Auspicious Diamond Core */}
        <polygon
          points="160,10 164,14 160,18 156,14"
          fill="url(#cnLatticeGold)"
          stroke="#FFFDF0"
          strokeWidth="0.4"
        />

        {/* Core Diamond Sparkle */}
        <circle cx="160" cy="14" r="1.2" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
