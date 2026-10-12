import React from "react";

interface BaliGelunganEmblemProps {
  className?: string;
}

/**
 * BaliGelunganEmblem
 * Lambang Mahkota Gelungan Agung Pawiwahan & Padma Kencana Khas Kerajaan Bali.
 * Didesain dengan estetika ukiran emas filigree antik (Royal Gold Filigree):
 * - Tajuk Tumpang Mas (Spire mahkota bertingkat) bertakhtakan Mirah Cempaka
 * - Sayap Garuda Mungkur kencana yang melengkung anggun
 * - Bunga Cempaka & Semanggi Mas semarak di kedua sayap
 * - Alas Padma Kencana (Sacred Lotus Pedestal) berhias permata suci
 * - Aura pendaran api suci Blencong keemasan
 */
export function BaliGelunganEmblem({ className = "w-16 h-auto" }: BaliGelunganEmblemProps) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_4px_24px_rgba(212,175,55,0.55)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Royal Balinese Gold Gradient */}
        <linearGradient id="baliCrownGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="20%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="85%" stopColor="#9A7B2C" />
          <stop offset="100%" stopColor="#6E5218" />
        </linearGradient>

        {/* Shimmer Highlight Gradient */}
        <linearGradient id="baliCrownShimmer" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#9A7B2C" />
          <stop offset="30%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#9A7B2C" />
        </linearGradient>

        {/* Holy Blencong Flame Radiance */}
        <radialGradient id="baliHolyFlame" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDF7" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#FDE68A" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0B0616" stopOpacity="0" />
        </radialGradient>

        {/* Obsidian Glass Fill */}
        <linearGradient id="baliObsidianBase" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A1128" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0B0616" stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* ── 1. HOLY BLENCONG RADIANCE AURA ── */}
      <circle cx="100" cy="78" r="60" fill="url(#baliHolyFlame)" />

      {/* ── 2. GARUDA MUNGKUR FILIGREE WINGS (Sayap Kebesaran Gelungan) ── */}
      {/* Sayap Kiri */}
      <path
        d="M 98 116
           C 68 110, 36 94, 16 66
           C 12 59, 18 53, 26 56
           C 38 61, 54 75, 72 94
           C 50 68, 32 44, 28 28
           C 26 22, 33 18, 39 22
           C 53 30, 71 52, 84 80
           C 68 50, 55 26, 51 10
           C 49 4, 57 0, 63 5
           C 76 16, 90 42, 98 72 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Sayap Kanan (Simetris) */}
      <path
        d="M 102 116
           C 132 110, 164 94, 184 66
           C 188 59, 182 53, 174 56
           C 162 61, 146 75, 128 94
           C 150 68, 168 44, 172 28
           C 174 22, 167 18, 161 22
           C 147 30, 129 52, 116 80
           C 132 50, 145 26, 149 10
           C 151 4, 143 0, 137 5
           C 124 16, 110 42, 102 72 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      {/* Rincian Etsa Tulang Sayap Emas */}
      <path
        d="M 32 54 C 48 64, 68 84, 86 102
           M 42 26 C 60 40, 78 68, 92 94
           M 60 12 C 74 28, 88 58, 96 86
           M 168 54 C 152 64, 132 84, 114 102
           M 158 26 C 140 40, 122 68, 108 94
           M 140 12 C 126 28, 112 58, 104 86"
        stroke="url(#baliCrownShimmer)"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        fill="none"
      />

      {/* ── 3. BUNGA CEMPAKA MAS & SEMANGGI KENCANA (Filigree Flower Clusters) ── */}
      {/* Bunga Semanggi Kiri */}
      <g transform="translate(42, 58)">
        <circle cx="0" cy="0" r="7" fill="url(#baliObsidianBase)" stroke="url(#baliCrownGold)" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
        <path d="M 0 -8 L 0 8 M -8 0 L 8 0 M -5 -5 L 5 5 M -5 5 L 5 -5" stroke="url(#baliCrownShimmer)" strokeWidth="0.9" />
      </g>
      {/* Bunga Semanggi Kanan */}
      <g transform="translate(158, 58)">
        <circle cx="0" cy="0" r="7" fill="url(#baliObsidianBase)" stroke="url(#baliCrownGold)" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="3" fill="#FFFDF7" />
        <path d="M 0 -8 L 0 8 M -8 0 L 8 0 M -5 -5 L 5 5 M -5 5 L 5 -5" stroke="url(#baliCrownShimmer)" strokeWidth="0.9" />
      </g>
      {/* Bunga Sandat Atas */}
      <g transform="translate(68, 30)">
        <circle cx="0" cy="0" r="5" fill="url(#baliCrownGold)" />
        <circle cx="0" cy="0" r="2" fill="#FFFDF7" />
      </g>
      <g transform="translate(132, 30)">
        <circle cx="0" cy="0" r="5" fill="url(#baliCrownGold)" />
        <circle cx="0" cy="0" r="2" fill="#FFFDF7" />
      </g>

      {/* ── 4. TAJUK TUMPANG LIMA KENCANA (Central Spire Cascade) ── */}
      {/* Outer Flank Spires */}
      <path
        d="M 76 46 L 82 76 C 80 86, 78 94, 76 106 C 72 94, 70 84, 70 74 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.1"
      />
      <circle cx="76" cy="46" r="3" fill="#FDE68A" stroke="#9A7B2C" strokeWidth="0.8" />

      <path
        d="M 124 46 L 118 76 C 120 86, 122 94, 124 106 C 128 94, 130 84, 130 74 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.1"
      />
      <circle cx="124" cy="46" r="3" fill="#FDE68A" stroke="#9A7B2C" strokeWidth="0.8" />

      {/* Mid Flank Spires */}
      <path
        d="M 86 28 L 92 64 C 91 76, 89 86, 88 102 C 84 88, 82 74, 82 60 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.2"
      />
      <circle cx="86" cy="28" r="3.5" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="0.8" />

      <path
        d="M 114 28 L 108 64 C 109 76, 111 86, 112 102 C 116 88, 118 74, 118 60 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.2"
      />
      <circle cx="114" cy="28" r="3.5" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="0.8" />

      {/* Main Central Spire (Tajuk Utama Puncak) */}
      <path
        d="M 100 8
           L 106 38
           C 107 58, 104 80, 100 102
           C 96 80, 93 58, 94 38 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.6"
      />

      {/* Diamond Filigree Core in Center Spire */}
      <polygon points="100,24 104,40 100,56 96,40" fill="url(#baliCrownGold)" stroke="#FFFDF7" strokeWidth="0.8" />
      <polygon points="100,60 103,74 100,88 97,74" fill="url(#baliCrownGold)" stroke="#FFFDF7" strokeWidth="0.8" />

      {/* Sacred Pinnacle Jewel (Mirah Cempaka Mas) */}
      <circle cx="100" cy="10" r="5" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="1" />
      <polygon points="100,3 103,9 100,12 97,9" fill="#FDE68A" />
      <circle cx="100" cy="10" r="2.2" fill="#D4AF37" />

      {/* ── 5. PADMA KENCANA PEDESTAL (Alas Teratai Emas Suci) ── */}
      {/* Lotus Pedestal Base Curve */}
      <path
        d="M 64 116
           C 72 106, 84 102, 100 102
           C 116 102, 128 106, 136 116
           C 126 126, 114 130, 100 130
           C 86 130, 74 126, 64 116 Z"
        fill="url(#baliObsidianBase)"
        stroke="url(#baliCrownGold)"
        strokeWidth="1.4"
      />

      {/* Lotus Petals Fan (Kelopak Teratai Emas) */}
      <path
        d="M 74 114 C 80 122, 90 126, 100 126 C 110 126, 120 122, 126 114
           M 82 110 C 88 118, 94 121, 100 121 C 106 121, 112 118, 118 110"
        stroke="url(#baliCrownShimmer)"
        strokeWidth="1"
        fill="none"
      />

      {/* Center Royal Medallion Jewel */}
      <circle cx="100" cy="116" r="4.5" fill="#FFFDF7" stroke="#D4AF37" strokeWidth="1.2" />
      <circle cx="100" cy="116" r="2" fill="#9A7B2C" />

      {/* Dangling Royal Pearls (Untaian Mutiara Puri Kencana) */}
      <g stroke="url(#baliCrownGold)" strokeWidth="0.8">
        <line x1="88" y1="126" x2="88" y2="136" />
        <circle cx="88" cy="138" r="2.2" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="0.6" />

        <line x1="100" y1="130" x2="100" y2="142" />
        <circle cx="100" cy="144" r="2.6" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="0.6" />

        <line x1="112" y1="126" x2="112" y2="136" />
        <circle cx="112" cy="138" r="2.2" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="0.6" />
      </g>
    </svg>
  );
}
