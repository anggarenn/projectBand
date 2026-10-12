"use client";

import React from "react";

interface MoonGateProps {
  className?: string;
  isOpen?: boolean;
  isOpening?: boolean;
  children?: React.ReactNode;
}

/**
 * MoonGate (月亮门)
 * Gapura arsitektur lingkaran khas taman klasik Tiongkok / Chinoiserie Pavilion.
 * Menampilkan frame lengkung berhias ukiran kisi-kisi kayu pernis merah (vermilion lattice)
 * dan ornamen sudut emas kekaisaran.
 */
export function MoonGate({
  className = "",
  isOpen = false,
  isOpening = false,
  children,
}: MoonGateProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer Glow Halo */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#991B1B]/30 via-[#D4AF37]/20 to-transparent blur-2xl animate-pulse pointer-events-none" />

      {/* SVG Circular Moon Gate Architectural Arch */}
      <svg
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_32px_rgba(59,8,12,0.85)]"
      >
        <defs>
          <linearGradient id="gateGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="35%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          <radialGradient id="gateVermilion" cx="50%" cy="50%" r="50%">
            <stop offset="85%" stopColor="#5C131A" />
            <stop offset="95%" stopColor="#3B080C" />
            <stop offset="100%" stopColor="#1E0305" />
          </radialGradient>
        </defs>

        {/* Outer Circular Masonry Rim */}
        <circle
          cx="140"
          cy="140"
          r="134"
          stroke="url(#gateGold)"
          strokeWidth="2.5"
          strokeOpacity="0.85"
        />

        {/* Secondary Decorative Inner Ring with Fretwork Dots */}
        <circle
          cx="140"
          cy="140"
          r="126"
          stroke="url(#gateGold)"
          strokeWidth="1"
          strokeDasharray="4 3"
          strokeOpacity="0.65"
        />

        {/* Circular Lattice Spoke Rays (12 Auspicious Directions) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 140 + Math.cos(angle) * 115;
          const y1 = 140 + Math.sin(angle) * 115;
          const x2 = 140 + Math.cos(angle) * 126;
          const y2 = 140 + Math.sin(angle) * 126;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#gateGold)"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
          );
        })}

        {/* Inner Arch Boundary Ring */}
        <circle
          cx="140"
          cy="140"
          r="115"
          stroke="url(#gateGold)"
          strokeWidth="2"
          strokeOpacity="0.9"
        />

        {/* Auspicious Cloud Meander Nodes at 4 Cardinal Points */}
        {/* Top Cardinal */}
        <circle cx="140" cy="14" r="4" fill="url(#gateGold)" />
        <circle cx="140" cy="14" r="2" fill="#991B1B" />
        {/* Bottom Cardinal */}
        <circle cx="140" cy="266" r="4" fill="url(#gateGold)" />
        <circle cx="140" cy="266" r="2" fill="#991B1B" />
        {/* Left Cardinal */}
        <circle cx="14" cy="140" r="4" fill="url(#gateGold)" />
        <circle cx="14" cy="140" r="2" fill="#991B1B" />
        {/* Right Cardinal */}
        <circle cx="266" cy="140" r="4" fill="url(#gateGold)" />
        <circle cx="266" cy="140" r="2" fill="#991B1B" />
      </svg>

      {/* Center Portal Content / Children Slot (e.g., Couple photo or seal) */}
      {children && (
        <div className="absolute inset-10 rounded-full overflow-hidden flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
