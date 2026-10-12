import React from "react";

interface CelestialStarDividerProps {
  className?: string;
}

/**
 * CelestialStarDivider
 * Divider kosmik dengan Sirius / North Star 8-sudut di tengah,
 * garis gradasi starlight cosmic (#C8B6FF -> #F3D082), dan titik stardust.
 */
export function CelestialStarDivider({
  className = "w-full max-w-xs mx-auto",
}: CelestialStarDividerProps) {
  return (
    <svg
      viewBox="0 0 320 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_0_6px_rgba(200,182,255,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="clDivLeft" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8B6FF" stopOpacity="0" />
          <stop offset="60%" stopColor="#C8B6FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F3D082" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="clDivRight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F3D082" stopOpacity="0.85" />
          <stop offset="40%" stopColor="#C8B6FF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#C8B6FF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="clStarCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="35%" stopColor="#F3D082" />
          <stop offset="70%" stopColor="#C8B6FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Left Hairline & Stardust */}
      <line x1="20" y1="14" x2="140" y2="14" stroke="url(#clDivLeft)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="65" cy="14" r="1.5" fill="#C8B6FF" opacity="0.6" />
      <circle cx="105" cy="14" r="2" fill="#F3D082" opacity="0.8" />
      <circle cx="125" cy="14" r="1.2" fill="#FFF" opacity="0.7" />

      {/* Right Hairline & Stardust */}
      <line x1="180" y1="14" x2="300" y2="14" stroke="url(#clDivRight)" strokeWidth="1" strokeLinecap="round" />
      <circle cx="195" cy="14" r="1.2" fill="#FFF" opacity="0.7" />
      <circle cx="215" cy="14" r="2" fill="#F3D082" opacity="0.8" />
      <circle cx="255" cy="14" r="1.5" fill="#C8B6FF" opacity="0.6" />

      {/* Central Celestial Halo */}
      <circle cx="160" cy="14" r="11" fill="url(#clStarCenterGlow)" opacity="0.45" />
      <circle cx="160" cy="14" r="8.5" stroke="#C8B6FF" strokeWidth="0.75" strokeDasharray="1.5 2.5" opacity="0.65" />

      {/* 8-Point Compass / Sirius North Star */}
      {/* Primary 4-point long rays */}
      <path
        d="M 160 2 L 161.8 11.5 L 172 14 L 161.8 16.5 L 160 26 L 158.2 16.5 L 148 14 L 158.2 11.5 Z"
        fill="#F3D082"
      />
      {/* Secondary diagonal rays */}
      <path
        d="M 160 6.5 L 163.5 12 L 167.5 14 L 163.5 16 L 160 21.5 L 156.5 16 L 152.5 14 L 156.5 12 Z"
        fill="#C8B6FF"
        opacity="0.8"
      />
      {/* Brilliant Core Diamond */}
      <circle cx="160" cy="14" r="1.8" fill="#FFFFFF" />
    </svg>
  );
}
