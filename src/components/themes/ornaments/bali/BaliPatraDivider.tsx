import React from "react";

interface BaliPatraDividerProps {
  className?: string;
}

/**
 * BaliPatraDivider
 * Pembatas Judul & Section Bermotif Relief Ukiran Patra Punggel Bali.
 * Menghadirkan keseimbangan simetris khas arsitektur pura/puri agung,
 * dengan pusat bunga teratai kencana (Padma Kencana) dan sulur patra keemasan.
 */
export function BaliPatraDivider({ className = "w-48 h-auto" }: BaliPatraDividerProps) {
  return (
    <svg
      viewBox="0 0 360 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="patraDivLine" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#FFFDF7" stopOpacity="1" />
          <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="patraScrollGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="35%" stopColor="#FDE68A" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8C6B1C" />
        </linearGradient>
      </defs>

      {/* Horizontal Center Line with Gradient Taper */}
      <line x1="24" y1="24" x2="336" y2="24" stroke="url(#patraDivLine)" strokeWidth="1.2" />

      {/* SULUR PATRA PUNGGEL KIRI (Left Scroll) */}
      <g transform="translate(180, 24) scale(1, 1)">
        {/* Outer Hook Tendril Left */}
        <path
          d="M -22 -2
             C -45 -18, -80 -18, -105 -4
             C -120 4, -135 -4, -145 -12
             C -138 -2, -125 10, -108 8
             C -85 6, -55 -4, -28 6"
          fill="none"
          stroke="url(#patraScrollGold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Secondary Curl Left */}
        <path
          d="M -48 -2
             C -62 14, -85 16, -98 8
             C -108 2, -105 -10, -94 -12
             C -84 -14, -76 -4, -82 6"
          fill="none"
          stroke="url(#patraScrollGold)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="-88" cy="-4" r="2.5" fill="#FFFDF7" />

        {/* Taper Accent Beads Left */}
        <circle cx="-120" cy="24" r="1.5" fill="#FDE68A" />
        <circle cx="-136" cy="24" r="1.2" fill="#D4AF37" />
        <circle cx="-150" cy="24" r="1" fill="#8C6B1C" />
      </g>

      {/* SULUR PATRA PUNGGEL KANAN (Right Scroll - Mirrored) */}
      <g transform="translate(180, 24) scale(-1, 1)">
        {/* Outer Hook Tendril Right */}
        <path
          d="M -22 -2
             C -45 -18, -80 -18, -105 -4
             C -120 4, -135 -4, -145 -12
             C -138 -2, -125 10, -108 8
             C -85 6, -55 -4, -28 6"
          fill="none"
          stroke="url(#patraScrollGold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Secondary Curl Right */}
        <path
          d="M -48 -2
             C -62 14, -85 16, -98 8
             C -108 2, -105 -10, -94 -12
             C -84 -14, -76 -4, -82 6"
          fill="none"
          stroke="url(#patraScrollGold)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="-88" cy="-4" r="2.5" fill="#FFFDF7" />

        {/* Taper Accent Beads Right */}
        <circle cx="-120" cy="24" r="1.5" fill="#FDE68A" />
        <circle cx="-136" cy="24" r="1.2" fill="#D4AF37" />
        <circle cx="-150" cy="24" r="1" fill="#8C6B1C" />
      </g>

      {/* PUSAT DIVIDER: BUNGA TERATAI KENCANA (Padma Sari Rosette) */}
      <g transform="translate(180, 24)">
        {/* Outer Petals / Sinar Padma */}
        <circle cx="0" cy="0" r="14" fill="#1C122C" stroke="url(#patraScrollGold)" strokeWidth="1.5" />
        
        {/* 4-Point Diamond Lotus Star */}
        <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="url(#patraScrollGold)" stroke="#FFFDF7" strokeWidth="0.8" />
        
        {/* Center Jewel */}
        <circle cx="0" cy="0" r="4.5" fill="#FFFDF7" stroke="#9A7B2C" strokeWidth="1" />
        <circle cx="0" cy="0" r="2" fill="#FDE68A" />
      </g>
    </svg>
  );
}
