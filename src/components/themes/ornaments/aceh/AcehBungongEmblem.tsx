"use client";

import React from "react";

interface AcehBungongEmblemProps {
  className?: string;
  initials?: string;
  subtitle?: string;
}

/**
 * AcehBungongEmblem
 * Medallion segel kebesaran motif Pinto Aceh & Bungong Jeumpa emas 1px dengan pendar lembut.
 * Mengadopsi prinsip Sacred Heritage Noir:
 * - Outer ring konsentris 1px dengan 24 butiran mutiara emas (filigree beading).
 * - Geometri sakral 8 penjuru (Octagram Islamic-Acehnese Star).
 * - Mahkota gerbang Pinto Aceh dengan kisi-kisi teralis keraton Sultan Iskandar Muda.
 * - Pusat medallion bermahkotakan kelopak Bungong Jeumpa mekar & permata kencana.
 * - Mendukung mode monogram seal inisial mempelai bila disematkan.
 */
export function AcehBungongEmblem({
  className = "w-20 h-auto",
  initials,
  subtitle,
}: AcehBungongEmblemProps) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block drop-shadow-[0_6px_28px_rgba(212,160,23,0.38)]"
        aria-hidden="true"
      >
        <defs>
          {/* Aceh Pure Royal Gold Gradient */}
          <linearGradient id="emblemGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="22%" stopColor="#F5D76E" />
            <stop offset="55%" stopColor="#D4A017" />
            <stop offset="85%" stopColor="#9A6A15" />
            <stop offset="100%" stopColor="#5C3908" />
          </linearGradient>

          {/* Golden Specular Shimmer */}
          <linearGradient id="emblemShimmer" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#D4A017" />
            <stop offset="35%" stopColor="#F5D76E" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#F5D76E" />
            <stop offset="100%" stopColor="#D4A017" />
          </linearGradient>

          {/* Deep Velvet Charcoal Core */}
          <radialGradient id="emblemDarkCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E1914" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#120F0C" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0A0807" stopOpacity="1" />
          </radialGradient>

          {/* Soft Golden Bloom / Luminous Halo */}
          <radialGradient id="emblemHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5D76E" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#D4A017" stopOpacity="0.16" />
            <stop offset="75%" stopColor="#9A6A15" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── 0. LUMINOUS AMBIENT GOLDEN HALO ── */}
        <circle cx="90" cy="90" r="88" fill="url(#emblemHalo)" />

        {/* ── 1. DARK BENTO GLASS MEDALLION BASE ── */}
        <circle
          cx="90"
          cy="90"
          r="74"
          fill="url(#emblemDarkCore)"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="1.2"
        />

        {/* ── 2. OUTER CONCENTRIC BEADED RING (24 TASBIH / PEARL FILIGREE DOTS) ── */}
        <circle
          cx="90"
          cy="90"
          r="68"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          opacity="0.8"
        />

        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const cx = 90 + 71 * Math.sin(rad);
          const cy = 90 - 71 * Math.cos(rad);
          return (
            <circle
              key={`pearl-${i}`}
              cx={cx}
              cy={cy}
              r={i % 6 === 0 ? 1.8 : 1.1}
              fill={i % 6 === 0 ? "url(#emblemGoldGrad)" : "#F5D76E"}
              opacity={i % 6 === 0 ? 1 : 0.75}
            />
          );
        })}

        {/* ── 3. SACRED OCTAGRAM (8-POINTED STAR FRAME) ── */}
        <rect
          x="34"
          y="34"
          width="112"
          height="112"
          rx="6"
          fill="none"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <rect
          x="34"
          y="34"
          width="112"
          height="112"
          rx="6"
          transform="rotate(45 90 90)"
          fill="none"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Inner Guide Circle */}
        <circle
          cx="90"
          cy="90"
          r="54"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="0.9"
        />
        <circle
          cx="90"
          cy="90"
          r="50"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="0.5"
          strokeDasharray="3 1.5"
          opacity="0.85"
        />

        {/* ── 4. PINTO ACEH GATEWAY OUTLINE (Pintu Istana Sultan) ── */}
        {/* Pointed Arch Contour */}
        <path
          d="M 62 124 C 62 90, 78 72, 90 60 C 102 72, 118 90, 118 124"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Inner Arch Hairline */}
        <path
          d="M 68 124 C 68 94, 81 78, 90 69 C 99 78, 112 94, 112 124"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="0.6"
          strokeDasharray="2 1.5"
          fill="none"
          opacity="0.8"
        />

        {/* Top Pinnacle Finial (Mahkota Pinto Aceh) */}
        <path
          d="M 90 60 L 90 48 M 86 54 L 94 54"
          stroke="url(#emblemGoldGrad)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="90" cy="47" r="2.2" fill="url(#emblemGoldGrad)" stroke="#4A2E05" strokeWidth="0.5" />
        <circle cx="90" cy="47" r="0.9" fill="#FFFDF7" />

        {/* Vertical Teralis / Gateway Rails */}
        <line x1="78" y1="88" x2="78" y2="124" stroke="url(#emblemGoldGrad)" strokeWidth="0.7" opacity="0.65" />
        <line x1="84" y1="75" x2="84" y2="124" stroke="url(#emblemGoldGrad)" strokeWidth="0.7" opacity="0.75" />
        <line x1="90" y1="69" x2="90" y2="124" stroke="url(#emblemGoldGrad)" strokeWidth="0.9" opacity="0.9" />
        <line x1="96" y1="75" x2="96" y2="124" stroke="url(#emblemGoldGrad)" strokeWidth="0.7" opacity="0.75" />
        <line x1="102" y1="88" x2="102" y2="124" stroke="url(#emblemGoldGrad)" strokeWidth="0.7" opacity="0.65" />

        {/* ── 5. BUNGONG JEUMPA BLOSSOM CORE (Center cx=90, cy=96) ── */}
        {!initials ? (
          <g>
            {/* 8 Radiant Petals of Bungong Jeumpa */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 360) / 8;
              const rad = (angle * Math.PI) / 180;
              const px = 90 + Math.sin(rad) * 14;
              const py = 96 - Math.cos(rad) * 14;
              return (
                <g key={`petal-${i}`}>
                  <path
                    d={`M 90 96 Q ${90 + Math.sin(rad + 0.3) * 12} ${96 - Math.cos(rad + 0.3) * 12} ${px} ${py} Q ${90 + Math.sin(rad - 0.3) * 12} ${96 - Math.cos(rad - 0.3) * 12} 90 96`}
                    fill="url(#emblemGoldGrad)"
                    stroke="#4A2E05"
                    strokeWidth="0.4"
                    opacity="0.88"
                  />
                  <circle cx={px} cy={py} r="1.1" fill="#FFFDF7" />
                </g>
              );
            })}

            {/* Central Diamond Boss / Gem of Cempaka Flower */}
            <circle cx="90" cy="96" r="6" fill="#1A1510" stroke="url(#emblemGoldGrad)" strokeWidth="1" />
            <circle cx="90" cy="96" r="3.2" fill="url(#emblemGoldGrad)" stroke="#4A2E05" strokeWidth="0.5" />
            <circle cx="90" cy="96" r="1.3" fill="#FFFDF7" />
          </g>
        ) : (
          /* Mode Monogram Seal Inisial Mempelai */
          <g>
            <circle cx="90" cy="96" r="20" fill="#14100C" stroke="url(#emblemGoldGrad)" strokeWidth="1" />
            <text
              x="90"
              y="102"
              textAnchor="middle"
              className="font-serif font-semibold text-lg"
              fill="url(#emblemGoldGrad)"
              style={{ letterSpacing: "0.08em" }}
            >
              {initials}
            </text>
          </g>
        )}

        {/* Base Diamond Accent & Droplet */}
        <path
          d="M 90 128 L 94 133 L 90 138 L 86 133 Z"
          fill="url(#emblemGoldGrad)"
          stroke="#4A2E05"
          strokeWidth="0.4"
        />
        <circle cx="90" cy="142" r="1.5" fill="#FFFDF7" />
      </svg>

      {/* Subtitle jika ada */}
      {subtitle && (
        <span className="absolute -bottom-5 text-[9px] uppercase tracking-[0.25em] font-serif text-[#F5D76E]/80 whitespace-nowrap">
          {subtitle}
        </span>
      )}
    </div>
  );
}
