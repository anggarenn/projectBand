import React from "react";

interface MinangPucukRebungDividerProps {
  className?: string;
}

/**
 * MinangPucukRebungDivider
 * Pembatas Judul & Section Khas Minangkabau:
 * Mengangkat geometri sakral "Pucuk Rebung" (Pucuak Rabuang) yang melambangkan
 * asas hidup berguna di setiap fase usia ("Ketek baguno, gadang tapakai"),
 * dipadu dengan belah ketupat "Saik Galamai" dan sulur keemasan songket Pandai Sikek.
 */
export function MinangPucukRebungDivider({ className = "w-48 h-auto" }: MinangPucukRebungDividerProps) {
  return (
    <svg
      viewBox="0 0 380 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Minang Royal Gold Linear Gradient */}
        <linearGradient id="pucukGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="25%" stopColor="#F5D76E" />
          <stop offset="60%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#784A0B" />
        </linearGradient>

        {/* Marawa Crimson Velvet Gradient */}
        <linearGradient id="pucukMarawaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41E3A" />
          <stop offset="50%" stopColor="#A31621" />
          <stop offset="100%" stopColor="#4A080C" />
        </linearGradient>

        {/* Baseline Horizontal Taper Gradient */}
        <linearGradient id="minangDivLine" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#D4A017" stopOpacity="0" />
          <stop offset="20%" stopColor="#D4A017" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#FFFDF7" stopOpacity="1" />
          <stop offset="80%" stopColor="#D4A017" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
        </linearGradient>

        {/* Ambient Center Glow */}
        <radialGradient id="pucukAura" cx="50%" cy="50%" r="45%">
          <stop offset="0%" stopColor="#F5D76E" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#D4A017" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#120808" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── 0. AMBIENT GLOW DI PUSAT DIVIDER ── */}
      <circle cx="190" cy="25" r="24" fill="url(#pucukAura)" />

      {/* ── 1. HORIZONTAL BASELINE WITH GRADIENT TAPER ── */}
      <line x1="16" y1="25" x2="364" y2="25" stroke="url(#minangDivLine)" strokeWidth="1.2" />
      <line x1="48" y1="28" x2="332" y2="28" stroke="url(#pucukGoldGrad)" strokeWidth="0.6" strokeDasharray="4 4" opacity="0.6" />

      {/* ── 2. SAYAP KIRI (Pucuk Rebung Berulang, Saik Galamai & Kaluak Paku) ── */}
      <g transform="translate(190, 25)">
        {/* Tier 2: Pucuk Rebung Menengah Kiri */}
        <g transform="translate(-32, 0)">
          {/* Geometri Rebung Berundak */}
          <path
            d="M -8 8 L -6 3 L -8 3 L -5 -3 L -7 -3 L 0 -15 L 7 -3 L 5 -3 L 8 3 L 6 3 L 8 8 Z"
            fill="url(#pucukGoldGrad)"
            stroke="#5C3908"
            strokeWidth="0.6"
          />
          {/* Sisipan Marawa Crimson di Dalam */}
          <path
            d="M -4 6 L -3 2 L 0 -9 L 3 2 L 4 6 Z"
            fill="url(#pucukMarawaGrad)"
          />
          <circle cx="0" cy="0" r="1.2" fill="#FFFDF7" />
        </g>

        {/* Saik Galamai (Belah Ketupat Emas Berbingkai) Kiri */}
        <polygon points="-52,0 -59,-5 -66,0 -59,5" fill="url(#pucukGoldGrad)" stroke="#5C3908" strokeWidth="0.6" />
        <polygon points="-59,-3 -54,0 -59,3 -64,0" fill="url(#pucukMarawaGrad)" />

        {/* Tier 3: Pucuk Rebung Kecil Kiri */}
        <g transform="translate(-78, 0)">
          <path
            d="M -6 6 L -4 2 L 0 -10 L 4 2 L 6 6 Z"
            fill="url(#pucukGoldGrad)"
            stroke="#5C3908"
            strokeWidth="0.5"
          />
          <polygon points="0,-6 2.5,4 -2.5,4" fill="url(#pucukMarawaGrad)" />
        </g>

        {/* Saik Galamai Mini */}
        <polygon points="-94,0 -99,-3.5 -104,0 -99,3.5" fill="url(#pucukGoldGrad)" stroke="#5C3908" strokeWidth="0.5" />
        <circle cx="-99" cy="0" r="1.2" fill="#FFFDF7" />

        {/* Sulur Spiral Kaluak Paku Kiri */}
        <path
          d="M -106 0
             C -118 -10, -134 -8, -144 0
             C -152 7, -154 18, -145 22
             C -138 25, -129 19, -132 12
             C -134 7, -140 7, -141 10"
          fill="none"
          stroke="url(#pucukGoldGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Manik-manik Itiak Pulang Patang Taper Kiri */}
        <circle cx="-144" cy="0" r="1.8" fill="#FFFDF7" />
        <circle cx="-158" cy="0" r="1.4" fill="#F5D76E" />
        <circle cx="-168" cy="0" r="1" fill="#D4A017" />
      </g>

      {/* ── 3. SAYAP KANAN (Mirrored dari Sayap Kiri secara Sempurna) ── */}
      <g transform="translate(190, 25) scale(-1, 1)">
        {/* Tier 2: Pucuk Rebung Menengah Kanan */}
        <g transform="translate(-32, 0)">
          <path
            d="M -8 8 L -6 3 L -8 3 L -5 -3 L -7 -3 L 0 -15 L 7 -3 L 5 -3 L 8 3 L 6 3 L 8 8 Z"
            fill="url(#pucukGoldGrad)"
            stroke="#5C3908"
            strokeWidth="0.6"
          />
          <path
            d="M -4 6 L -3 2 L 0 -9 L 3 2 L 4 6 Z"
            fill="url(#pucukMarawaGrad)"
          />
          <circle cx="0" cy="0" r="1.2" fill="#FFFDF7" />
        </g>

        {/* Saik Galamai Kanan */}
        <polygon points="-52,0 -59,-5 -66,0 -59,5" fill="url(#pucukGoldGrad)" stroke="#5C3908" strokeWidth="0.6" />
        <polygon points="-59,-3 -54,0 -59,3 -64,0" fill="url(#pucukMarawaGrad)" />

        {/* Tier 3: Pucuk Rebung Kecil Kanan */}
        <g transform="translate(-78, 0)">
          <path
            d="M -6 6 L -4 2 L 0 -10 L 4 2 L 6 6 Z"
            fill="url(#pucukGoldGrad)"
            stroke="#5C3908"
            strokeWidth="0.5"
          />
          <polygon points="0,-6 2.5,4 -2.5,4" fill="url(#pucukMarawaGrad)" />
        </g>

        {/* Saik Galamai Mini */}
        <polygon points="-94,0 -99,-3.5 -104,0 -99,3.5" fill="url(#pucukGoldGrad)" stroke="#5C3908" strokeWidth="0.5" />
        <circle cx="-99" cy="0" r="1.2" fill="#FFFDF7" />

        {/* Sulur Spiral Kaluak Paku Kanan */}
        <path
          d="M -106 0
             C -118 -10, -134 -8, -144 0
             C -152 7, -154 18, -145 22
             C -138 25, -129 19, -132 12
             C -134 7, -140 7, -141 10"
          fill="none"
          stroke="url(#pucukGoldGrad)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        {/* Manik-manik Itiak Pulang Patang Taper Kanan */}
        <circle cx="-144" cy="0" r="1.8" fill="#FFFDF7" />
        <circle cx="-158" cy="0" r="1.4" fill="#F5D76E" />
        <circle cx="-168" cy="0" r="1" fill="#D4A017" />
      </g>

      {/* ── 4. PUSAT DIVIDER: GRAND PUCUAK RABUANG (Rebung Raja) ── */}
      <g transform="translate(190, 25)">
        {/* Lingkaran Medalion Dasar Marawa Velvet */}
        <circle cx="0" cy="0" r="14" fill="#120808" stroke="url(#pucukGoldGrad)" strokeWidth="1.4" />
        <circle cx="0" cy="0" r="11" fill="url(#pucukMarawaGrad)" stroke="#F5D76E" strokeWidth="0.8" opacity="0.9" />

        {/* Geometri Sakral Pucuk Rebung Utama (Zig-Zag Runcing Berundak 3 Tingkat) */}
        <path
          d="M -12 10
             L -9 4 L -11 4
             L -7 -3 L -9 -3
             L -5 -11 L -7 -11
             L 0 -24
             L 7 -11 L 5 -11
             L 9 -3 L 7 -3
             L 11 4 L 9 4
             L 12 10 Z"
          fill="url(#pucukGoldGrad)"
          stroke="#5C3908"
          strokeWidth="0.8"
        />

        {/* Lapisan Chevron Marawa Crimson di Dalam Pucuk Rebung */}
        <path
          d="M -7 7
             L -5 2 L -7 2
             L -3 -5
             L 0 -17
             L 3 -5
             L 7 2 L 5 2
             L 7 7 Z"
          fill="url(#pucukMarawaGrad)"
          stroke="#FFFDF7"
          strokeWidth="0.6"
        />

        {/* Tulang Tengah Pucuk Rebung (Spine Highlight) */}
        <line x1="0" y1="-21" x2="0" y2="8" stroke="#FFFDF7" strokeWidth="1.2" strokeLinecap="round" />

        {/* Intan Berlian Permata Pusat (Center Diamond Spark) */}
        <circle cx="0" cy="0" r="4" fill="url(#pucukGoldGrad)" stroke="#5C3908" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="2.2" fill="#FFFDF7" />
        <circle cx="0" cy="0" r="1" fill="url(#pucukMarawaGrad)" />
      </g>
    </svg>
  );
}
