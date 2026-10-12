import React from "react";

interface PeonyCornerProps {
  className?: string;
}

/**
 * PeonyCorner
 * Ornamen sudut Chinoiserie Imperial Silk berupa mekarnya bunga Peony (牡丹 Mu-Dan)
 * berpadu dengan sulur emas halus dan geometris lattice sudut Dinasti Tang/Qing.
 */
export function PeonyCorner({ className = "w-20 h-20" }: PeonyCornerProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chinGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E1" />
          <stop offset="30%" stopColor="#E6C65C" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>

        <linearGradient id="chinCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E63946" />
          <stop offset="50%" stopColor="#991B1B" />
          <stop offset="100%" stopColor="#5C131A" />
        </linearGradient>

        <radialGradient id="chinPeonyGlow" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Frame Border Hairline L-Corner dengan Aksen Wanzi / Cloud Meander */}
      <path
        d="M 6 112 L 6 6 L 112 6"
        stroke="url(#chinGoldGrad)"
        strokeWidth="1.2"
        strokeOpacity="0.6"
      />
      <path
        d="M 12 100 L 12 12 L 100 12"
        stroke="url(#chinGoldGrad)"
        strokeWidth="0.75"
        strokeOpacity="0.35"
      />

      {/* Traditional Corner Meander Fretwork (Key Fret Step) */}
      <path
        d="M 6 22 L 22 22 L 22 6 M 6 36 L 16 36 L 16 16 L 36 16 L 36 6"
        stroke="url(#chinGoldGrad)"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />

      {/* Sulur Emas & Batang Peony melengkung dari sudut */}
      <path
        d="M 18 18 Q 48 32 82 24 Q 102 18 114 10"
        stroke="url(#chinGoldGrad)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 18 18 Q 32 48 24 82 Q 18 102 10 114"
        stroke="url(#chinGoldGrad)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Kelopak Bunga Peony Utama di Pusat Sudut (x: 28, y: 28) */}
      {/* Kelopak Luar Crimson */}
      <path
        d="M 28 14 C 20 18, 16 26, 20 34 C 22 38, 30 42, 38 40 C 44 38, 48 30, 44 22 C 40 16, 34 12, 28 14 Z"
        fill="url(#chinCrimsonGrad)"
        fillOpacity="0.75"
        stroke="url(#chinGoldGrad)"
        strokeWidth="0.8"
      />
      {/* Kelopak Samping 1 */}
      <path
        d="M 16 24 C 8 28, 10 40, 18 44 C 24 46, 30 42, 30 36 C 26 30, 22 26, 16 24 Z"
        fill="url(#chinCrimsonGrad)"
        fillOpacity="0.65"
        stroke="url(#chinGoldGrad)"
        strokeWidth="0.7"
      />
      {/* Kelopak Samping 2 */}
      <path
        d="M 24 16 C 28 8, 40 10, 44 18 C 46 24, 42 30, 36 30 C 30 26, 26 22, 24 16 Z"
        fill="url(#chinCrimsonGrad)"
        fillOpacity="0.65"
        stroke="url(#chinGoldGrad)"
        strokeWidth="0.7"
      />
      {/* Putik Tengah Emas Bersinar */}
      <circle cx="28" cy="28" r="5" fill="url(#chinGoldGrad)" />
      <circle cx="28" cy="28" r="8" fill="url(#chinPeonyGlow)" />

      {/* Kuncup Bunga Tambahan di Percabangan Horizontal */}
      <path
        d="M 64 22 C 60 16, 68 12, 74 16 C 78 20, 74 26, 68 25 Z"
        fill="url(#chinCrimsonGrad)"
        fillOpacity="0.7"
        stroke="url(#chinGoldGrad)"
        strokeWidth="0.7"
      />
      {/* Daun Bambu / Sutra Halus Kanan */}
      <path
        d="M 82 24 C 92 20, 104 22, 108 16 C 98 22, 90 26, 82 24 Z"
        fill="url(#chinGoldGrad)"
        fillOpacity="0.5"
      />

      {/* Kuncup Bunga Tambahan di Percabangan Vertikal */}
      <path
        d="M 22 64 C 16 60, 12 68, 16 74 C 20 78, 26 74, 25 68 Z"
        fill="url(#chinCrimsonGrad)"
        fillOpacity="0.7"
        stroke="url(#chinGoldGrad)"
        strokeWidth="0.7"
      />
      {/* Daun Bambu / Sutra Halus Bawah */}
      <path
        d="M 24 82 C 20 92, 22 104, 16 108 C 22 98, 26 90, 24 82 Z"
        fill="url(#chinGoldGrad)"
        fillOpacity="0.5"
      />
    </svg>
  );
}
