import React from "react";

interface MinangGonjongCornerProps {
  className?: string;
}

/**
 * MinangGonjongCorner
 * Ornamen Sudut Ukiran Khas Minangkabau:
 * Perpaduan motif "Itiak Pulang Patang" (keselarasan & keteraturan),
 * motif "Kaluk Paku" (lengkungan spiral pucuk pakis),
 * serta siluet meruncing lengkung Gonjong Rumah Gadang.
 */
export function MinangGonjongCorner({ className = "w-20 h-20" }: MinangGonjongCornerProps) {
  return (
    <svg
      viewBox="0 0 130 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none transition-transform duration-300 drop-shadow-[0_2px_14px_rgba(0,0,0,0.7)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Minang Songket Gold Metallic Gradient */}
        <linearGradient id="minangCornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.98" />
          <stop offset="28%" stopColor="#F5D76E" stopOpacity="0.95" />
          <stop offset="62%" stopColor="#D4A017" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#784A0B" stopOpacity="0.75" />
        </linearGradient>

        {/* Marawa Crimson Accent Gradient (Deep Ruby to Velvet Maroon) */}
        <linearGradient id="minangMarawaRuby" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41E3A" />
          <stop offset="45%" stopColor="#A31621" />
          <stop offset="100%" stopColor="#500A10" />
        </linearGradient>

        {/* Frame Border Line Gradient */}
        <linearGradient id="minangCornerLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5D76E" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#D4A017" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="minangCornerLineV" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5D76E" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#D4A017" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
        </linearGradient>

        {/* Subtle Ambient Radial Glow */}
        <radialGradient id="minangCornerGlow" cx="20%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#F5D76E" stopOpacity="0.25" />
          <stop offset="40%" stopColor="#D4A017" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0F0C09" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── 0. AMBIENT WARM CORNER GLOW ── */}
      <circle cx="28" cy="28" r="26" fill="url(#minangCornerGlow)" />

      {/* ── 1. FRAME AXIS BORDER (L-Shape Hairlines with Taper) ── */}
      <path
        d="M 6 122 L 6 6 L 122 6"
        stroke="url(#minangCornerLine)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 14 96 L 14 14 L 96 14"
        stroke="url(#minangCornerLine)"
        strokeWidth="0.8"
        strokeDasharray="4 3"
        opacity="0.6"
      />

      {/* ── 2. AUTENTIK GONJONG CURVE: PARABOLIK TANDUK KERBAU ── */}
      {/* Dasar Gonjong Sirap Ijuk (Fill Lembut Hitam-Arang Bertekstur) */}
      <path
        d="M 12 108
           C 14 74, 24 44, 46 26
           C 56 18, 74 14, 108 12
           C 80 22, 62 34, 48 50
           C 32 68, 22 88, 18 108 Z"
        fill="#0F0C09"
        fillOpacity="0.6"
      />

      {/* Layer 1 Sirap Ijuk (Stroke Kurva Luar Parabolik Menjulang) */}
      <path
        d="M 10 114
           C 12 76, 24 42, 48 24
           C 58 16, 78 12, 114 10"
        stroke="url(#minangCornerGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* Layer 2 Sirap Ijuk (Garis Tengah Berlapis Emas) */}
      <path
        d="M 16 102
           C 18 70, 28 42, 50 28
           C 62 20, 80 16, 102 16"
        stroke="url(#minangCornerGold)"
        strokeWidth="1.2"
        strokeDasharray="8 2.5"
        opacity="0.85"
      />

      {/* Layer 3 Sirap Ijuk (Garis Dalam Sirap dengan Highlight) */}
      <path
        d="M 22 90
           C 24 64, 34 44, 52 32
           C 64 24, 80 22, 90 22"
        stroke="#FFFDF7"
        strokeWidth="0.8"
        opacity="0.75"
        strokeLinecap="round"
      />

      {/* ── 3. PUNCAK GONJONG (Lengkung Keluar Tanduk Kerbau di Sudut) ── */}
      {/* Tanduk Meruncing & Mengayun Anggun di Pucuk Sudut */}
      <path
        d="M 14 14
           C 8 10, 5 5, 4 3
           C 8 6, 11 8, 14 14 Z"
        fill="url(#minangCornerGold)"
      />
      {/* Permata Ruby Marawa di Puncak Gonjong Sudut */}
      <circle cx="6" cy="6" r="3.2" fill="url(#minangMarawaRuby)" stroke="#FFFDF7" strokeWidth="0.9" />
      <circle cx="5" cy="5" r="1" fill="#FFFDF7" opacity="0.9" />
      <circle cx="14" cy="14" r="1.8" fill="#F5D76E" stroke="#784A0B" strokeWidth="0.6" />

      {/* ── 4. MOTIF KALUAK PAKU (Sulur Spiral Pucuk Pakis Melingkar) ── */}
      <path
        d="M 22 42
           C 34 26, 62 24, 76 36
           C 88 46, 90 62, 80 74
           C 70 86, 52 86, 44 76
           C 36 66, 42 54, 54 52
           C 64 50, 70 58, 64 66
           C 60 70, 54 68, 54 64"
        fill="none"
        stroke="url(#minangCornerGold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Intan Pusat Kaluak Paku (Ruby Marawa & Emas Murni) */}
      <circle cx="58" cy="62" r="3" fill="url(#minangMarawaRuby)" stroke="#FFFDF7" strokeWidth="0.8" />
      <circle cx="58" cy="62" r="1.2" fill="#F5D76E" />

      {/* ── 5. MOTIF ITIAK PULANG PATANG (Gelombang Beriring Harmonis) ── */}
      {/* Seri Gelombang Horizontal (Sisi Atas) */}
      <path
        d="M 46 14
           C 56 8, 70 8, 80 14
           C 88 19, 94 13, 102 10
           C 110 8, 114 12, 112 18"
        fill="none"
        stroke="url(#minangCornerGold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="80" cy="14" r="2" fill="#F5D76E" />
      <circle cx="102" cy="10" r="1.8" fill="#FFFDF7" />

      {/* Seri Gelombang Vertikal (Sisi Kiri) */}
      <path
        d="M 14 46
           C 8 56, 8 70, 14 80
           C 19 88, 13 94, 10 102
           C 8 110, 12 114, 18 112"
        fill="none"
        stroke="url(#minangCornerGold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="14" cy="80" r="2" fill="#F5D76E" />
      <circle cx="10" cy="102" r="1.8" fill="#FFFDF7" />

      {/* ── 6. SAIK GALAMAI (Belah Ketupat Emas Berbingkai Ruby) ── */}
      {/* Finial Diamond Ujung Sumbu Horizontal */}
      <polygon points="122,6 127,3 132,6 127,9" fill="url(#minangCornerGold)" stroke="#784A0B" strokeWidth="0.5" />
      <polygon points="127,4.5 129,6 127,7.5 125,6" fill="url(#minangMarawaRuby)" />

      {/* Finial Diamond Ujung Sumbu Vertikal */}
      <polygon points="6,122 3,127 6,132 9,127" fill="url(#minangCornerGold)" stroke="#784A0B" strokeWidth="0.5" />
      <polygon points="4.5,127 6,129 7.5,127 6,125" fill="url(#minangMarawaRuby)" />
    </svg>
  );
}
