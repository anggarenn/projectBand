import React from "react";

interface EmeraldWaxSealProps {
  className?: string;
  onClick?: () => void;
  isOpening?: boolean;
}

/**
 * EmeraldWaxSeal
 * Segel lilin emas antik 3D (Gold Metallic Wax Seal) dengan tepi organik berlekuk,
 * emboss monogram inisial & daun laurel, serta specular highlights.
 */
export function EmeraldWaxSeal({
  className = "w-20 h-20",
  onClick,
  isOpening = false,
}: EmeraldWaxSealProps) {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-700 select-none group ${
        isOpening ? "scale-125 opacity-0 rotate-12 blur-sm pointer-events-none" : "hover:scale-105 active:scale-95"
      } ${className}`}
      role="button"
      tabIndex={0}
      aria-label="Buka segel undangan"
    >
      {/* Outer Glow on hover */}
      <div className="absolute inset-0 rounded-full bg-[#D4AF37]/30 blur-md group-hover:bg-[#D4AF37]/50 transition-all duration-500 scale-110" />

      {/* Wax Seal SVG */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Gradients for 3D Wax Effect */}
          <radialGradient id="waxBase" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="25%" stopColor="#E5C365" />
            <stop offset="60%" stopColor="#C49A2C" />
            <stop offset="85%" stopColor="#8A6714" />
            <stop offset="100%" stopColor="#543C08" />
          </radialGradient>

          <radialGradient id="waxInner" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFECA0" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="80%" stopColor="#9E781E" />
            <stop offset="100%" stopColor="#684D0E" />
          </radialGradient>

          <linearGradient id="laurelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBE6" />
            <stop offset="50%" stopColor="#E5C365" />
            <stop offset="100%" stopColor="#9B7826" />
          </linearGradient>

          <filter id="waxShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Organic Melting Wax Outer Border */}
        <path
          d="M 50 4 
             C 62 3, 69 9, 78 14 
             C 86 19, 93 25, 96 35 
             C 98 46, 95 56, 93 67 
             C 90 77, 83 85, 74 91 
             C 64 96, 54 97, 44 96 
             C 32 95, 23 90, 15 82 
             C 7 74, 4 64, 4 52 
             C 3 40, 8 30, 15 21 
             C 23 12, 36 5, 50 4 Z"
          fill="url(#waxBase)"
          stroke="#422E06"
          strokeWidth="0.8"
        />

        {/* Inner Depressed Circle (Embossed Ridge) */}
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="url(#waxInner)"
          stroke="#7A5A12"
          strokeWidth="1.2"
          filter="url(#waxShadow)"
        />

        {/* Inner Stippled Ring */}
        <circle
          cx="50"
          cy="50"
          r="30"
          stroke="url(#laurelGrad)"
          strokeWidth="0.75"
          strokeDasharray="2 2"
          opacity="0.75"
        />

        {/* Laurel Wreath Botanical Emblems */}
        {/* Left Laurel */}
        <path
          d="M 32 60 C 30 52, 32 42, 38 34 C 36 39, 36 47, 39 52"
          stroke="url(#laurelGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="34" cy="40" r="1.5" fill="url(#laurelGrad)" />
        <circle cx="33" cy="48" r="1.5" fill="url(#laurelGrad)" />
        <circle cx="36" cy="56" r="1.5" fill="url(#laurelGrad)" />

        {/* Right Laurel */}
        <path
          d="M 68 60 C 70 52, 68 42, 62 34 C 64 39, 64 47, 61 52"
          stroke="url(#laurelGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="66" cy="40" r="1.5" fill="url(#laurelGrad)" />
        <circle cx="67" cy="48" r="1.5" fill="url(#laurelGrad)" />
        <circle cx="64" cy="56" r="1.5" fill="url(#laurelGrad)" />

        {/* Center Monogram Crown / Knot */}
        {/* Crown base */}
        <path
          d="M 44 40 L 50 34 L 56 40 L 54 45 L 46 45 Z"
          fill="url(#laurelGrad)"
          stroke="#5C420B"
          strokeWidth="0.5"
        />
        <circle cx="50" cy="32" r="1.2" fill="#FFFBE6" />
        <circle cx="43" cy="38" r="1" fill="#FFFBE6" />
        <circle cx="57" cy="38" r="1" fill="#FFFBE6" />

        {/* Center Ampersand / Monogram Initial */}
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontSize="17"
          fontFamily="serif"
          fontWeight="bold"
          fill="url(#laurelGrad)"
          stroke="#4A3408"
          strokeWidth="0.5"
          className="select-none"
        >
          &amp;
        </text>

        {/* Gloss Specular Highlight Crescent */}
        <path
          d="M 28 28 A 30 30 0 0 1 65 20"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
