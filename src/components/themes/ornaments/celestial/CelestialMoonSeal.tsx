import React from "react";

interface CelestialMoonSealProps {
  initials?: string;
  subtitle?: string;
  className?: string;
}

/**
 * CelestialMoonSeal
 * Emblem Stargate orbital ring dengan cincin rotasi lambat halus (animate-spin-slow)
 * membingkai siluet bulan sabit kosmik emas (#F3D082) dan monogram inisial mempelai.
 */
export function CelestialMoonSeal({
  initials = "C & T",
  subtitle,
  className = "w-24 h-24 sm:w-28 sm:h-28",
}: CelestialMoonSealProps) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* ── 1. Rotating Astrolabe / Stargate Orbital Ring (Memutar Halus 30s) ── */}
        <svg
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none drop-shadow-[0_0_12px_rgba(200,182,255,0.4)]"
          aria-hidden="true"
        >
          {/* Outer Dashed Orbit Ring */}
          <circle
            cx="70"
            cy="70"
            r="66"
            stroke="#C8B6FF"
            strokeWidth="0.8"
            strokeDasharray="4 5"
            strokeOpacity="0.4"
          />

          {/* Astrolabe Degree Ticks */}
          <circle
            cx="70"
            cy="70"
            r="61"
            stroke="#F3D082"
            strokeWidth="0.6"
            strokeDasharray="1 8"
            strokeOpacity="0.6"
          />

          {/* 4 Cardinal Constellation Points on Orbit */}
          <circle cx="70" cy="4" r="2" fill="#F3D082" />
          <circle cx="136" cy="70" r="2" fill="#C8B6FF" />
          <circle cx="70" cy="136" r="2" fill="#F3D082" />
          <circle cx="4" cy="70" r="2" fill="#C8B6FF" />

          {/* Diagonal Micro Starlight Diamonds on Orbit */}
          <g transform="translate(116, 24)">
            <path d="M 0 -3 L 0.8 -0.8 L 3 0 L 0.8 0.8 L 0 3 L -0.8 0.8 L -3 0 L -0.8 -0.8 Z" fill="#F3D082" />
          </g>
          <g transform="translate(24, 116)">
            <path d="M 0 -3 L 0.8 -0.8 L 3 0 L 0.8 0.8 L 0 3 L -0.8 0.8 L -3 0 L -0.8 -0.8 Z" fill="#F3D082" />
          </g>
        </svg>

        {/* ── 2. Static Moon Crescent & Monogram Emblem (Tetap di Tengah) ── */}
        <svg
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_0_16px_rgba(243,208,130,0.35)]"
          aria-hidden="true"
        >
          <defs>
            {/* Celestial Moon Gradient */}
            <linearGradient id="moonGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="50%" stopColor="#F3D082" />
              <stop offset="100%" stopColor="#C79F48" />
            </linearGradient>

            {/* Inner Dark Cosmic Void */}
            <radialGradient id="voidCosmicGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1B223C" />
              <stop offset="70%" stopColor="#0F1527" />
              <stop offset="100%" stopColor="#080B14" />
            </radialGradient>

            {/* Monogram Text Gradient */}
            <linearGradient id="celestialTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F3D082" />
              <stop offset="100%" stopColor="#C8B6FF" />
            </linearGradient>
          </defs>

          {/* Central Void Disc */}
          <circle cx="70" cy="70" r="50" fill="url(#voidCosmicGrad)" stroke="#C8B6FF" strokeWidth="0.75" strokeOpacity="0.4" />

          {/* ── 3. Elegant Crescent Moon (Bulan Sabit Emas) ── */}
          <path
            d="M 70 24 
               C 95.4 24, 116 44.6, 116 70 
               C 116 95.4, 95.4 116, 70 116 
               C 85 106, 94 89, 94 70 
               C 94 51, 85 34, 70 24 Z"
            fill="url(#moonGoldGrad)"
            opacity="0.9"
          />

          {/* Delicate Moon Rim Highlight */}
          <path
            d="M 70 26 C 94 26, 114 46, 114 70 C 114 94, 94 114, 70 114"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Sparkling Little Star Beside Moon */}
          <g transform="translate(108, 48)">
            <path d="M 0 -4 L 0.8 -0.8 L 4 0 L 0.8 0.8 L 0 4 L -0.8 0.8 L -4 0 L -0.8 -0.8 Z" fill="#FFF" />
          </g>

          {/* ── 4. Initials Monogram ── */}
          {/* Drop shadow text */}
          <text
            x="64.5"
            y="76.5"
            textAnchor="middle"
            fontSize="18"
            fontFamily="'Cinzel', Georgia, serif"
            fontWeight="bold"
            letterSpacing="1"
            fill="#050810"
            opacity="0.95"
          >
            {initials}
          </text>
          {/* Main radiant text */}
          <text
            x="64"
            y="75.5"
            textAnchor="middle"
            fontSize="18"
            fontFamily="'Cinzel', Georgia, serif"
            fontWeight="bold"
            letterSpacing="1"
            fill="url(#celestialTextGrad)"
          >
            {initials}
          </text>
        </svg>
      </div>

      {subtitle && (
        <span className="mt-2 text-[9px] uppercase tracking-[0.25em] font-serif text-[#C8B6FF] opacity-90 drop-shadow-[0_0_8px_rgba(200,182,255,0.4)]">
          {subtitle}
        </span>
      )}
    </div>
  );
}
