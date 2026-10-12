import React from "react";

interface TerracottaEnvelopeSealProps {
  className?: string;
  size?: number;
  monogram?: string;
  isOpening?: boolean;
  onClick?: () => void;
}

/**
 * TerracottaEnvelopeSeal
 * Wax Seal terakota organik (#BF573F / #8F3B25) dengan efek stempel botanical dan simpul tali rami (twine ribbon).
 * Digunakan sebagai pengunci amplop kraft gate di CoverScreen.
 */
export function TerracottaEnvelopeSeal({
  className = "",
  size = 80,
  monogram = "R & A",
  isOpening = false,
  onClick,
}: TerracottaEnvelopeSealProps) {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-all duration-700 ${
        isOpening ? "scale-110 opacity-0 -translate-y-4" : "scale-100 opacity-100 hover:scale-105 active:scale-95"
      } ${className}`}
      style={{ width: size, height: size }}
      role="button"
      tabIndex={0}
      aria-label="Buka Segel Amplop Terracotta"
    >
      {/* 1. TWINE RIBBON (Tali Rami) di belakang seal */}
      <div
        className={`absolute inset-0 pointer-events-none -z-10 flex items-center justify-center transition-opacity duration-500 ${
          isOpening ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Horizontal Twine Band */}
        <div className="absolute w-[240px] h-[3px] bg-[#C4A482] shadow-[0_1px_2px_rgba(0,0,0,0.2)] rounded-full -rotate-1" />
        <div className="absolute w-[240px] h-[2px] bg-[#B08968] shadow-[0_1px_1px_rgba(0,0,0,0.15)] rounded-full rotate-2" />
        
        {/* Twine Bow Loop (Simpul Pita Rami) */}
        <svg
          viewBox="0 0 100 60"
          className="w-24 h-16 absolute -top-4 pointer-events-none drop-shadow-[0_2px_4px_rgba(70,40,20,0.3)]"
          fill="none"
          stroke="#C4A482"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          {/* Left loop */}
          <path d="M 50 35 C 30 10 15 20 30 38 C 40 46 48 38 50 35 Z" stroke="#B08968" />
          {/* Right loop */}
          <path d="M 50 35 C 70 10 85 20 70 38 C 60 46 52 38 50 35 Z" stroke="#C4A482" />
          {/* Dangling tails */}
          <path d="M 48 36 Q 38 50 32 58" stroke="#A67C52" strokeWidth="2" />
          <path d="M 52 36 Q 62 52 68 56" stroke="#C4A482" strokeWidth="2" />
        </svg>
      </div>

      {/* 2. ORGANIC TERRACOTTA WAX SEAL */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_8px_20px_rgba(143,59,37,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="tcWaxGrad" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#D97A60" />
            <stop offset="45%" stopColor="#BF573F" />
            <stop offset="85%" stopColor="#8F3B25" />
            <stop offset="100%" stopColor="#5E2213" />
          </radialGradient>
          <filter id="tcInnerShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feComponentTransfer in="SourceAlpha">
              <feFuncA type="linear" slope="0.7" />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feOffset dx="2" dy="2" />
            <feComposite operator="out" in2="SourceGraphic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.12  0 0 0 0 0.08  0 0 0 0.8 0" />
            <feBlend mode="multiply" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Outer Melted Clay Blob (Natural irregular edges) */}
        <path
          d="M 50 4 
             C 64 3, 76 8, 85 17 
             C 94 26, 97 38, 96 50 
             C 95 65, 89 77, 79 87 
             C 68 96, 54 97, 42 96 
             C 27 94, 14 86, 7 73 
             C 1 60, 3 44, 10 32 
             C 18 18, 33 5, 50 4 Z"
          fill="url(#tcWaxGrad)"
        />

        {/* Embossed Inner Bezel Rim */}
        <circle
          cx="50"
          cy="50"
          r="34"
          stroke="#5E2213"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          fill="none"
        />
        <circle
          cx="49.5"
          cy="49.5"
          r="34"
          stroke="#F3A792"
          strokeWidth="1"
          strokeOpacity="0.5"
          fill="none"
        />

        {/* Botanical Meadow Sprig Wreath in Center */}
        <g stroke="#F3A792" strokeWidth="1" strokeLinecap="round" opacity="0.6">
          <path d="M 32 50 C 32 40 40 32 50 32" />
          <path d="M 68 50 C 68 60 60 68 50 68" />
          {/* Leaves */}
          <circle cx="34" cy="42" r="1.5" fill="#F3A792" />
          <circle cx="42" cy="34" r="1.5" fill="#F3A792" />
          <circle cx="66" cy="58" r="1.5" fill="#F3A792" />
          <circle cx="58" cy="66" r="1.5" fill="#F3A792" />
        </g>

        {/* Embossed Center Monogram Text */}
        <text
          x="50"
          y="54"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="serif"
          fontSize="12"
          fontWeight="bold"
          letterSpacing="1"
          fill="#3F140A"
          opacity="0.85"
        >
          {monogram}
        </text>
        {/* Highlight Offset */}
        <text
          x="49.5"
          y="53.5"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="serif"
          fontSize="12"
          fontWeight="bold"
          letterSpacing="1"
          fill="#FFC4B4"
          opacity="0.6"
        >
          {monogram}
        </text>
      </svg>
    </div>
  );
}
