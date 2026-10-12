import React from "react";

interface EmeraldGoldCornerProps {
  className?: string;
}

/**
 * EmeraldGoldCorner
 * Ornamen sudut botanical line-art emas metallic halus (eucalyptus & monstera curves).
 * Dirancang khusus untuk tema quiet luxury Emerald Velvet Noir.
 */
export function EmeraldGoldCorner({ className = "w-20 h-20" }: EmeraldGoldCornerProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="emGoldCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="35%" stopColor="#E5C365" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9B7826" />
        </linearGradient>
      </defs>

      {/* Frame Border Hairline L-Corner */}
      <path
        d="M 6 110 L 6 6 L 110 6"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path
        d="M 12 95 L 12 12 L 95 12"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="0.75"
        strokeOpacity="0.3"
      />

      {/* Corner Geometric Diamond Accent */}
      <rect
        x="5"
        y="5"
        width="4"
        height="4"
        transform="rotate(45 7 7)"
        fill="url(#emGoldCornerGrad)"
      />

      {/* Eucalyptus & Botanical Line-Art Foliage */}
      {/* Batang Utama Melengkung dari sudut */}
      <path
        d="M 10 10 Q 45 25 85 18 Q 105 14 115 8"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M 10 10 Q 25 45 18 85 Q 14 105 8 115"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Daun Eucalyptus Horizontal */}
      <path
        d="M 32 17 C 35 7, 50 8, 48 20 C 42 22, 34 22, 32 17 Z"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="0.9"
        fill="url(#emGoldCornerGrad)"
        fillOpacity="0.08"
      />
      <path
        d="M 52 19 C 58 10, 72 12, 68 23 C 60 25, 54 24, 52 19 Z"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="0.9"
        fill="url(#emGoldCornerGrad)"
        fillOpacity="0.08"
      />
      <path
        d="M 72 18 C 78 8, 92 11, 88 21 C 82 23, 75 22, 72 18 Z"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="0.8"
        fill="url(#emGoldCornerGrad)"
        fillOpacity="0.06"
      />

      {/* Daun Eucalyptus Vertikal */}
      <path
        d="M 17 32 C 7 35, 8 50, 20 48 C 22 42, 22 34, 17 32 Z"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="0.9"
        fill="url(#emGoldCornerGrad)"
        fillOpacity="0.08"
      />
      <path
        d="M 19 52 C 10 58, 12 72, 23 68 C 25 60, 24 54, 19 52 Z"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="0.9"
        fill="url(#emGoldCornerGrad)"
        fillOpacity="0.08"
      />
      <path
        d="M 18 72 C 8 78, 11 92, 21 88 C 23 82, 22 75, 18 72 Z"
        stroke="url(#emGoldCornerGrad)"
        strokeWidth="0.8"
        fill="url(#emGoldCornerGrad)"
        fillOpacity="0.06"
      />

      {/* Kuncup Bunga / Berries kecil */}
      <circle cx="40" cy="24" r="1.5" fill="url(#emGoldCornerGrad)" />
      <circle cx="62" cy="25" r="1.5" fill="url(#emGoldCornerGrad)" />
      <circle cx="24" cy="40" r="1.5" fill="url(#emGoldCornerGrad)" />
      <circle cx="25" cy="62" r="1.5" fill="url(#emGoldCornerGrad)" />
    </svg>
  );
}
