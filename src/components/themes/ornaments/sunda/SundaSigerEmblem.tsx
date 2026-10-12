import React from "react";

interface SundaSigerEmblemProps {
  className?: string;
}

/**
 * Lambang Mahkota Siger Sunda beralaskan motif Awan Megamendung.
 * Menggantikan Gunungan Wayang Jawa sebagai simbol keagungan pernikahan adat Sunda.
 */
export function SundaSigerEmblem({ className = "w-24 h-auto" }: SundaSigerEmblemProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_4px_20px_rgba(229,193,108,0.5)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Gradien Emas Kemilau Mahkota Siger */}
        <linearGradient id="sigerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="25%" stopColor="#E5C16C" />
          <stop offset="65%" stopColor="#C59B3C" />
          <stop offset="100%" stopColor="#8A631B" />
        </linearGradient>

        <linearGradient id="sigerCloudGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C59B3C" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFF2D6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C59B3C" stopOpacity="0.8" />
        </linearGradient>

        <radialGradient id="sigerCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura Cahaya Halus di Belakang */}
      <circle cx="100" cy="70" r="55" fill="url(#sigerCenterGlow)" opacity="0.3" />

      {/* ALAS AWAN MEGAMENDUNG (Megamendung Cloud Pedestal) */}
      <g transform="translate(0, 10)">
        {/* Layer luar awan alas */}
        <path
          d="M 20 125 
             C 30 110, 50 105, 68 112 
             C 80 102, 120 102, 132 112 
             C 150 105, 170 110, 180 125 
             C 190 140, 170 148, 140 144 
             C 120 150, 80 150, 60 144 
             C 30 148, 10 140, 20 125 Z"
          fill="rgba(12, 24, 54, 0.85)"
          stroke="url(#sigerCloudGrad)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Kontur dalam awan alas */}
        <path
          d="M 38 126 
             C 45 116, 60 114, 72 118 
             C 84 112, 116 112, 128 118 
             C 140 114, 155 116, 162 126 
             C 168 136, 150 140, 130 138 
             C 114 142, 86 142, 70 138 
             C 50 140, 32 136, 38 126 Z"
          fill="none"
          stroke="url(#sigerGoldGrad)"
          strokeWidth="1.2"
          opacity="0.85"
        />
      </g>

      {/* MAHKOTA SIGER SUNDA (7 Lekukan / Tajuk Keagungan) */}
      <g>
        {/* Puncak Utama Tengah (Paling Tinggi - Lekukan 4) */}
        <path
          d="M 100 12 
             C 96 28, 92 48, 90 74 
             C 96 76, 104 76, 110 74 
             C 108 48, 104 28, 100 12 Z"
          fill="url(#sigerGoldGrad)"
          stroke="#FFF2D6"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="12" r="3" fill="#FFF2D6" stroke="#9E782F" strokeWidth="0.8" />

        {/* Puncak Kiri-Kanan 1 (Lekukan 3 & 5) */}
        <path
          d="M 76 26 
             C 74 42, 74 58, 78 78 
             C 83 78, 88 77, 91 74 
             C 89 54, 84 38, 76 26 Z"
          fill="url(#sigerGoldGrad)"
          stroke="#E5C16C"
          strokeWidth="1.2"
        />
        <circle cx="76" cy="26" r="2.5" fill="#FFF2D6" />

        <path
          d="M 124 26 
             C 126 42, 126 58, 122 78 
             C 117 78, 112 77, 109 74 
             C 111 54, 116 38, 124 26 Z"
          fill="url(#sigerGoldGrad)"
          stroke="#E5C16C"
          strokeWidth="1.2"
        />
        <circle cx="124" cy="26" r="2.5" fill="#FFF2D6" />

        {/* Puncak Kiri-Kanan 2 (Lekukan 2 & 6) */}
        <path
          d="M 52 42 
             C 54 56, 58 70, 66 84 
             C 72 82, 76 80, 78 78 
             C 71 66, 62 52, 52 42 Z"
          fill="url(#sigerGoldGrad)"
          stroke="#E5C16C"
          strokeWidth="1.2"
        />
        <circle cx="52" cy="42" r="2.2" fill="#FFF2D6" />

        <path
          d="M 148 42 
             C 146 56, 142 70, 134 84 
             C 128 82, 124 80, 122 78 
             C 129 66, 138 52, 148 42 Z"
          fill="url(#sigerGoldGrad)"
          stroke="#E5C16C"
          strokeWidth="1.2"
        />
        <circle cx="148" cy="42" r="2.2" fill="#FFF2D6" />

        {/* Puncak Sayap Luar Terendah (Lekukan 1 & 7 - Melengkung Dinamis) */}
        <path
          d="M 32 62 
             C 38 72, 46 84, 56 90 
             C 61 88, 64 85, 66 82 
             C 54 74, 42 66, 32 62 Z"
          fill="url(#sigerGoldGrad)"
          stroke="#C59B3C"
          strokeWidth="1.2"
        />
        <circle cx="32" cy="62" r="2" fill="#FFF2D6" />

        <path
          d="M 168 62 
             C 162 72, 154 84, 144 90 
             C 139 88, 136 85, 134 82 
             C 146 74, 158 66, 168 62 Z"
          fill="url(#sigerGoldGrad)"
          stroke="#C59B3C"
          strokeWidth="1.2"
        />
        <circle cx="168" cy="62" r="2" fill="#FFF2D6" />

        {/* BAND / SABUK DASAR SIGER (Berdamai dengan Ukiran Filigree) */}
        <path
          d="M 40 92 
             C 60 84, 100 82, 160 92 
             C 152 106, 100 110, 40 92 Z"
          fill="rgba(20, 18, 15, 0.95)"
          stroke="url(#sigerGoldGrad)"
          strokeWidth="2"
        />

        {/* Permata Tengah Sabuk Siger */}
        <polygon
          points="100,88 106,96 100,104 94,96"
          fill="#FFF2D6"
          stroke="#9E782F"
          strokeWidth="1"
        />
        <circle cx="78" cy="94" r="2.5" fill="#E5C16C" />
        <circle cx="122" cy="94" r="2.5" fill="#E5C16C" />
        <circle cx="60" cy="92" r="2" fill="#C59B3C" />
        <circle cx="140" cy="92" r="2" fill="#C59B3C" />
      </g>
    </svg>
  );
}
