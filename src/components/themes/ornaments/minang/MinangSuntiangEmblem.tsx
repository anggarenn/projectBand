import React from "react";

interface MinangSuntiangEmblemProps {
  className?: string;
}

/**
 * MinangSuntiangEmblem
 * Mahkota Suntiang Gadang Kebesaran Pengantin Wanita Minangkabau (Anak Daro).
 * Disusun 9 tingkat (Tingkek Sambilan) kembang goyang emas, bungo sarunai,
 * kote-kote menjuntai di kiri-kanan, bermahkotakan permata marun marawa berkilau.
 */
export function MinangSuntiangEmblem({ className = "w-20 h-auto" }: MinangSuntiangEmblemProps) {
  return (
    <svg
      viewBox="0 0 210 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_4px_24px_rgba(212,160,23,0.38)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Minang Songket Royal Gold Gradient */}
        <linearGradient id="suntiangGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="22%" stopColor="#F5D76E" />
          <stop offset="55%" stopColor="#D4A017" />
          <stop offset="85%" stopColor="#9A6A15" />
          <stop offset="100%" stopColor="#5C3908" />
        </linearGradient>

        {/* Marawa Crimson Velvet Gradient */}
        <linearGradient id="suntiangMarawaRuby" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C41E3A" />
          <stop offset="45%" stopColor="#A31621" />
          <stop offset="100%" stopColor="#4A080C" />
        </linearGradient>

        {/* Luminous Specular Shimmer */}
        <linearGradient id="suntiangShimmer" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#D4A017" />
          <stop offset="35%" stopColor="#F5D76E" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F5D76E" />
          <stop offset="100%" stopColor="#D4A017" />
        </linearGradient>

        {/* Ambient Radial Golden Aura */}
        <radialGradient id="suntiangAura" cx="50%" cy="58%" r="52%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.45" />
          <stop offset="30%" stopColor="#F5D76E" stopOpacity="0.28" />
          <stop offset="65%" stopColor="#D4A017" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#120808" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── 0. AMBIENT WARM CROWN RADIANCE ── */}
      <circle cx="105" cy="95" r="70" fill="url(#suntiangAura)" />

      {/* ── 1. TIER 8 & 9: RADIATING KEMBANG GOYANG LUAR (Outer Fanning Sprigs) ── */}
      <g>
        {[-72, -60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60, 72].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const originX = 105;
          const originY = 126;
          // Outer tip
          const pinLen = idx === 6 ? 94 : 82 + Math.cos(rad) * 6;
          const x2 = originX + Math.sin(rad) * pinLen;
          const y2 = originY - Math.cos(rad) * pinLen;
          const midX = originX + Math.sin(rad) * (pinLen * 0.55);
          const midY = originY - Math.cos(rad) * (pinLen * 0.55);

          return (
            <g key={`pin-outer-${idx}`}>
              {/* Slender golden needle stem */}
              <line
                x1={originX + Math.sin(rad) * 44}
                y1={originY - Math.cos(rad) * 44}
                x2={x2}
                y2={y2}
                stroke="url(#suntiangGoldGrad)"
                strokeWidth={idx === 6 ? 1.6 : 1.1}
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Mid-stem small pearl bead */}
              <circle cx={midX} cy={midY} r="1.4" fill="#FFFDF7" opacity="0.9" />

              {/* Blooming 3-Petal Kembang Goyang Floret at tip */}
              <circle cx={x2} cy={y2} r={idx === 6 ? 4.2 : 3} fill="url(#suntiangGoldGrad)" stroke="#5C3908" strokeWidth="0.5" />
              {/* Left & Right Petal Wings */}
              <ellipse
                cx={x2 - Math.cos(rad) * 2.5}
                cy={y2 - Math.sin(rad) * 2.5}
                rx="2"
                ry="1.2"
                transform={`rotate(${angle}, ${x2 - Math.cos(rad) * 2.5}, ${y2 - Math.sin(rad) * 2.5})`}
                fill="#FFFDF7"
                opacity="0.9"
              />
              <ellipse
                cx={x2 + Math.cos(rad) * 2.5}
                cy={y2 + Math.sin(rad) * 2.5}
                rx="2"
                ry="1.2"
                transform={`rotate(${angle}, ${x2 + Math.cos(rad) * 2.5}, ${y2 + Math.sin(rad) * 2.5})`}
                fill="#FFFDF7"
                opacity="0.9"
              />
              {/* Center Diamond Glimmer */}
              <circle cx={x2} cy={y2} r={idx === 6 ? 1.8 : 1.2} fill="#FFFDF7" />
            </g>
          );
        })}
      </g>

      {/* ── 2. TIER 6 & 7: MANSIANG & BUNGO ROSEK (Mid Crescent Tier) ── */}
      <g>
        {[-58, -44, -30, -15, 0, 15, 30, 44, 58].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const originX = 105;
          const originY = 126;
          const radius = idx === 4 ? 68 : 62;
          const cx = originX + Math.sin(rad) * radius;
          const cy = originY - Math.cos(rad) * radius;

          return (
            <g key={`mid-floret-${idx}`}>
              {/* Golden Teardrop Petal Leaf */}
              <path
                d={`M ${cx} ${cy - 4.5} C ${cx + 3.2} ${cy} ${cx} ${cy + 4.5} ${cx} ${cy + 4.5} C ${cx - 3.2} ${cy} ${cx} ${cy - 4.5} Z`}
                transform={`rotate(${angle}, ${cx}, ${cy})`}
                fill="url(#suntiangGoldGrad)"
                stroke="#5C3908"
                strokeWidth="0.6"
              />
              {/* Center Diamond Pearl */}
              <circle cx={cx} cy={cy} r="1.6" fill="#FFFDF7" />
              {/* Ruby Marawa accent on key positions */}
              {(idx === 1 || idx === 4 || idx === 7) && (
                <circle cx={cx} cy={cy} r="0.9" fill="url(#suntiangMarawaRuby)" />
              )}
            </g>
          );
        })}
      </g>

      {/* ── 3. TIER 4 & 5: INNER ARC OF BUNGO SARUNAI (Roset Bunga Emas) ── */}
      <g>
        {[-48, -32, -16, 0, 16, 32, 48].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const originX = 105;
          const originY = 126;
          const radius = 48;
          const cx = originX + Math.sin(rad) * radius;
          const cy = originY - Math.cos(rad) * radius;

          return (
            <g key={`inner-rosette-${idx}`}>
              {/* 4-Petal Rosette Flower */}
              <circle cx={cx} cy={cy - 2} r="1.8" fill="#FFFDF7" opacity="0.9" />
              <circle cx={cx} cy={cy + 2} r="1.8" fill="#FFFDF7" opacity="0.9" />
              <circle cx={cx - 2} cy={cy} r="1.8" fill="#FFFDF7" opacity="0.9" />
              <circle cx={cx + 2} cy={cy} r="1.8" fill="#FFFDF7" opacity="0.9" />
              <circle cx={cx} cy={cy} r="2.4" fill="url(#suntiangGoldGrad)" stroke="#784A0B" strokeWidth="0.5" />
              <circle cx={cx} cy={cy} r="1" fill="#FFFDF7" />
            </g>
          );
        })}
      </g>

      {/* ── 4. TIER 2 & 3: ARCHING CRESCENT BASE PLATES (Pelat Emas & Marawa) ── */}
      {/* Pelat Dasar Merah Marawa (Kontras Sakral Beludru) */}
      <path
        d="M 44 128
           C 60 84, 150 84, 166 128
           C 150 96, 60 96, 44 128 Z"
        fill="url(#suntiangMarawaRuby)"
        stroke="#D4A017"
        strokeWidth="1"
      />

      {/* Pelat Utama Songket Emas Bertakik Filigree */}
      <path
        d="M 48 126
           C 64 78, 146 78, 162 126
           C 146 92, 64 92, 48 126 Z"
        fill="url(#suntiangGoldGrad)"
        stroke="#FFFDF7"
        strokeWidth="1.2"
      />

      {/* Rantai Manik-Manik Filigree di Lengkungan Pelat */}
      <path
        d="M 54 124 C 68 88, 142 88, 156 124"
        stroke="#FFFDF7"
        strokeWidth="1"
        strokeDasharray="2 3.5"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* ── 5. TIER 9 (ZENITH): PUNCAK GONJONG & CARANO STAR JEWEL ── */}
      {/* Gonjong Spire Menjulang Anggun ke Angkasa */}
      <path
        d="M 105 16
           C 107 36, 110 58, 111 84
           C 108 85, 102 85, 99 84
           C 100 58, 103 36, 105 16 Z"
        fill="url(#suntiangGoldGrad)"
        stroke="#FFFDF7"
        strokeWidth="1.2"
      />

      {/* Tanduk Parabolik Kecil di Pucuk Spire Suntiang */}
      <path
        d="M 105 18
           C 102 12, 97 8, 93 7
           C 98 10, 102 14, 105 18 Z"
        fill="url(#suntiangGoldGrad)"
      />
      <path
        d="M 105 18
           C 108 12, 113 8, 117 7
           C 112 10, 108 14, 105 18 Z"
        fill="url(#suntiangGoldGrad)"
      />

      {/* Puncak Carano Bintang 8 Kelopak (Simbol Keagungan Minang) */}
      <g transform="translate(105, 16)">
        {/* Radiating 8-Point Star Diamond */}
        <polygon points="0,-9 2.5,-3 8.5,-3 3.5,1 5.5,7 0,3.5 -5.5,7 -3.5,1 -8.5,-3 -2.5,-3" fill="url(#suntiangShimmer)" stroke="#784A0B" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="3" fill="url(#suntiangMarawaRuby)" stroke="#FFFDF7" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="1.2" fill="#FFFDF7" />
      </g>

      {/* ── 6. JURAI KOTE-KOTE (Cascading Tassels di Kiri & Kanan Pelipis) ── */}
      {/* Sisi Kiri Pelipis (Cascading Tassels 2 Jalur) */}
      <g stroke="url(#suntiangGoldGrad)" fill="url(#suntiangGoldGrad)">
        {/* Untaian Luar */}
        <path d="M 42 128 C 34 142, 30 156, 32 172" strokeWidth="1" strokeLinecap="round" fill="none" />
        <circle cx="38" cy="138" r="2.2" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.6" />
        <circle cx="34" cy="150" r="2.6" fill="url(#suntiangGoldGrad)" stroke="#5C3908" strokeWidth="0.6" />
        <circle cx="31" cy="162" r="2.2" fill="url(#suntiangMarawaRuby)" stroke="#FFFDF7" strokeWidth="0.6" />
        {/* Bandul Liontin Kote-kote Ujung */}
        <polygon points="32,168 35,175 29,175" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.6" />

        {/* Untaian Dalam */}
        <path d="M 50 130 C 44 144, 42 158, 44 170" strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <circle cx="47" cy="142" r="1.8" fill="#F5D76E" />
        <circle cx="43" cy="154" r="2.2" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.5" />
        <polygon points="44,166 46.5,172 41.5,172" fill="url(#suntiangGoldGrad)" stroke="#5C3908" strokeWidth="0.5" />
      </g>

      {/* Sisi Kanan Pelipis (Cascading Tassels 2 Jalur) */}
      <g stroke="url(#suntiangGoldGrad)" fill="url(#suntiangGoldGrad)">
        {/* Untaian Luar */}
        <path d="M 168 128 C 176 142, 180 156, 178 172" strokeWidth="1" strokeLinecap="round" fill="none" />
        <circle cx="172" cy="138" r="2.2" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.6" />
        <circle cx="176" cy="150" r="2.6" fill="url(#suntiangGoldGrad)" stroke="#5C3908" strokeWidth="0.6" />
        <circle cx="179" cy="162" r="2.2" fill="url(#suntiangMarawaRuby)" stroke="#FFFDF7" strokeWidth="0.6" />
        {/* Bandul Liontin Kote-kote Ujung */}
        <polygon points="178,168 181,175 175,175" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.6" />

        {/* Untaian Dalam */}
        <path d="M 160 130 C 166 144, 168 158, 166 170" strokeWidth="0.9" strokeLinecap="round" fill="none" />
        <circle cx="163" cy="142" r="1.8" fill="#F5D76E" />
        <circle cx="167" cy="154" r="2.2" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.5" />
        <polygon points="166,166 168.5,172 163.5,172" fill="url(#suntiangGoldGrad)" stroke="#5C3908" strokeWidth="0.5" />
      </g>

      {/* ── 7. TIER 1: LILIK DANDANG DAHI (Ikat Kepala Emas Mahkota) ── */}
      <path
        d="M 54 132
           C 74 123, 136 123, 156 132
           C 160 140, 152 145, 134 146
           C 116 147, 94 147, 76 146
           C 58 145, 50 140, 54 132 Z"
        fill="url(#suntiangGoldGrad)"
        stroke="#FFFDF7"
        strokeWidth="1.4"
      />

      {/* Kaluak Paku Ukiran Halus pada Ikat Dahi */}
      <path
        d="M 68 139 C 80 134, 105 134, 142 139"
        stroke="#5C3908"
        strokeWidth="1"
        strokeDasharray="3 3"
        fill="none"
        opacity="0.75"
      />

      {/* Permata Dahi Marawa Ruby Oval Cabochon */}
      <ellipse cx="105" cy="135" rx="9" ry="6" fill="url(#suntiangMarawaRuby)" stroke="#FFFDF7" strokeWidth="1.2" />
      {/* Lapisan Bezel Emas di Keliling Ruby */}
      <ellipse cx="105" cy="135" rx="5.5" ry="3.5" fill="none" stroke="#F5D76E" strokeWidth="0.8" />
      {/* Kilau Pantulan Cahaya (Specular Spark) */}
      <circle cx="103" cy="133.5" r="1.5" fill="#FFFDF7" />

      {/* Barisan Mutiara Pendamping (Flanking Pearls) */}
      <circle cx="86" cy="135" r="3" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.7" />
      <circle cx="124" cy="135" r="3" fill="#FFFDF7" stroke="#784A0B" strokeWidth="0.7" />
      <circle cx="72" cy="136" r="2.4" fill="url(#suntiangGoldGrad)" stroke="#5C3908" strokeWidth="0.5" />
      <circle cx="138" cy="136" r="2.4" fill="url(#suntiangGoldGrad)" stroke="#5C3908" strokeWidth="0.5" />
      <circle cx="60" cy="137" r="1.8" fill="#FFFDF7" />
      <circle cx="150" cy="137" r="1.8" fill="#FFFDF7" />
    </svg>
  );
}
