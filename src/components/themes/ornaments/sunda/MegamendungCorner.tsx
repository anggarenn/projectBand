import React from "react";

interface MegamendungCornerProps {
  className?: string;
}

/**
 * Ornamen Sudut Berbasis Awan Megamendung Khas Pasundan.
 * Menggantikan sudut sulur daun floral untuk membingkai sudut cover dan card.
 */
export function MegamendungCorner({ className = "w-20 h-20" }: MegamendungCornerProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none transition-transform duration-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="megaCornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#E5C16C" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#C59B3C" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#8A631B" stopOpacity="0.65" />
        </linearGradient>

        <linearGradient id="cornerLineGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5C16C" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#C59B3C" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C59B3C" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Frame Border Corner Lines */}
      <path
        d="M 6 110 L 6 6 L 110 6"
        stroke="url(#cornerLineGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 14 85 L 14 14 L 85 14"
        stroke="url(#cornerLineGold)"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        opacity="0.6"
      />

      {/* Titik Intan Pojok */}
      <circle cx="6" cy="6" r="3" fill="#FFF2D6" stroke="#C59B3C" strokeWidth="1" />
      <circle cx="14" cy="14" r="1.5" fill="#E5C16C" />

      {/* Kontur Awan Megamendung Sudut 1 (Utama Melengkung ke Arah Tengah) */}
      <path
        d="M 10 18 
           C 18 10, 32 10, 42 16 
           C 54 12, 68 18, 76 28 
           C 86 24, 98 34, 102 46 
           C 106 60, 94 74, 78 72 
           C 66 84, 48 86, 36 78 
           C 24 84, 14 74, 16 62 
           C 10 52, 10 32, 10 18 Z"
        fill="rgba(15, 23, 42, 0.75)"
        stroke="url(#megaCornerGold)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Kontur Lapisan Tengah (Gradasi Awan) */}
      <path
        d="M 18 24 
           C 26 18, 38 18, 46 24 
           C 56 20, 66 26, 70 34 
           C 78 32, 86 40, 88 50 
           C 90 60, 80 68, 68 66 
           C 58 74, 44 74, 34 68 
           C 24 72, 18 64, 20 54 Z"
        fill="none"
        stroke="url(#megaCornerGold)"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Aksen Inti Pusaran Sudut */}
      <path
        d="M 28 32 
           C 34 28, 44 28, 50 34 
           C 56 32, 62 38, 62 46 
           C 62 52, 54 56, 46 54 
           C 38 58, 30 54, 28 46 Z"
        fill="rgba(229, 193, 108, 0.15)"
        stroke="#FFF2D6"
        strokeWidth="1"
        opacity="0.9"
      />

      {/* Tetesan Embun Emas Megamendung */}
      <circle cx="102" cy="46" r="2" fill="#FFF2D6" />
      <circle cx="78" cy="72" r="1.6" fill="#E5C16C" />
      <circle cx="36" cy="78" r="1.4" fill="#E5C16C" />
      <circle cx="76" cy="28" r="1.5" fill="#FFF2D6" />
    </svg>
  );
}
