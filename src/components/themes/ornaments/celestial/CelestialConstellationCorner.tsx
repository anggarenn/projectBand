import React from "react";

interface CelestialConstellationCornerProps {
  className?: string;
}

/**
 * CelestialConstellationCorner
 * Ornamen sudut rasi bintang kosmik: Garis rasi bintang, starlight nodes, dan lengkungan nebula.
 * Aksen Lavender (#C8B6FF) & Golden Starlight (#F3D082).
 */
export function CelestialConstellationCorner({
  className = "w-24 h-24",
}: CelestialConstellationCornerProps) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_0_8px_rgba(200,182,255,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="clConstGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C8B6FF" />
          <stop offset="50%" stopColor="#A088E8" />
          <stop offset="100%" stopColor="#F3D082" />
        </linearGradient>
        <linearGradient id="clStarGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="100%" stopColor="#F3D082" />
        </linearGradient>
        <radialGradient id="clNodePulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#C8B6FF" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Orbit arcs & celestial hair-lines */}
      <path
        d="M 6 130 A 124 124 0 0 0 130 6"
        stroke="url(#clConstGrad)"
        strokeWidth="0.8"
        strokeDasharray="2 4"
        strokeOpacity="0.4"
      />
      <path
        d="M 12 110 A 98 98 0 0 0 110 12"
        stroke="url(#clConstGrad)"
        strokeWidth="1.2"
        strokeOpacity="0.3"
      />
      <path
        d="M 22 80 A 58 58 0 0 0 80 22"
        stroke="url(#clStarGlow)"
        strokeWidth="0.75"
        strokeOpacity="0.5"
      />

      {/* Constellation Lines (Geometric Star Matrix) */}
      <g stroke="url(#clConstGrad)" strokeWidth="1" strokeOpacity="0.65" strokeLinecap="round">
        <line x1="16" y1="20" x2="38" y2="38" />
        <line x1="38" y1="38" x2="72" y2="28" />
        <line x1="72" y1="28" x2="105" y2="18" />
        <line x1="38" y1="38" x2="28" y2="72" />
        <line x1="28" y1="72" x2="18" y2="105" />
        <line x1="38" y1="38" x2="58" y2="58" />
        <line x1="58" y1="58" x2="88" y2="68" />
        <line x1="58" y1="58" x2="68" y2="88" />
      </g>

      {/* Primary Constellation Star Nodes */}
      <g>
        {/* Node 1: Top Right Major Star */}
        <circle cx="105" cy="18" r="3.5" fill="url(#clStarGlow)" />
        <circle cx="105" cy="18" r="6" fill="url(#clNodePulse)" opacity="0.6" />
        {/* Sparkle 4-point */}
        <path d="M 105 13 L 105 23 M 100 18 L 110 18" stroke="#FFF" strokeWidth="0.8" opacity="0.9" />

        {/* Node 2: Center Major Star */}
        <circle cx="38" cy="38" r="4" fill="url(#clStarGlow)" />
        <circle cx="38" cy="38" r="7.5" fill="url(#clNodePulse)" opacity="0.7" />
        <path d="M 38 31 L 38 45 M 31 38 L 45 38" stroke="#FFF" strokeWidth="1" opacity="0.9" />

        {/* Node 3: Bottom Major Star */}
        <circle cx="18" cy="105" r="3.5" fill="url(#clStarGlow)" />
        <circle cx="18" cy="105" r="6" fill="url(#clNodePulse)" opacity="0.6" />
        <path d="M 18 100 L 18 110 M 13 105 L 23 105" stroke="#FFF" strokeWidth="0.8" opacity="0.9" />

        {/* Minor Node Stars */}
        <circle cx="16" cy="20" r="2" fill="#C8B6FF" opacity="0.85" />
        <circle cx="72" cy="28" r="2.2" fill="#C8B6FF" opacity="0.9" />
        <circle cx="28" cy="72" r="2.2" fill="#C8B6FF" opacity="0.9" />
        <circle cx="58" cy="58" r="2.5" fill="#F3D082" opacity="0.85" />
        <circle cx="88" cy="68" r="2" fill="#C8B6FF" opacity="0.75" />
        <circle cx="68" cy="88" r="2" fill="#C8B6FF" opacity="0.75" />
      </g>

      {/* Tiny Scattered Stardust Particles */}
      <circle cx="48" cy="16" r="1" fill="#FFF" opacity="0.6" />
      <circle cx="85" cy="12" r="1.2" fill="#F3D082" opacity="0.7" />
      <circle cx="16" cy="48" r="1" fill="#FFF" opacity="0.6" />
      <circle cx="12" cy="85" r="1.2" fill="#F3D082" opacity="0.7" />
      <circle cx="42" cy="95" r="1" fill="#C8B6FF" opacity="0.5" />
      <circle cx="95" cy="42" r="1" fill="#C8B6FF" opacity="0.5" />
    </svg>
  );
}
