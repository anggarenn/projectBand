"use client";

import React from "react";

interface AcehFiligreeCornerProps {
  className?: string;
}

/**
 * AcehFiligreeCorner
 * Ornamen sudut kerancang emas (Corner Filigree Bracket) khas Aceh.
 * Mengusung perpaduan motif Bungong Jeumpa melengkung & sulur Pinto Aceh.
 */
export function AcehFiligreeCorner({ className = "w-16 h-16" }: AcehFiligreeCornerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="acehCornerGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="30%" stopColor="#F5D76E" />
          <stop offset="70%" stopColor="#D4A017" />
          <stop offset="100%" stopColor="#7A4D0A" />
        </linearGradient>
      </defs>

      {/* Outer Border Hairline */}
      <path
        d="M2 98V6C2 3.79086 3.79086 2 6 2H98"
        stroke="url(#acehCornerGold)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Secondary Inset Hairline with corner notch */}
      <path
        d="M8 92V14C8 10.6863 10.6863 8 14 8H92"
        stroke="url(#acehCornerGold)"
        strokeWidth="0.7"
        strokeOpacity="0.6"
        strokeDasharray="4 2"
      />

      {/* Main Stylized Pinto Aceh / Bungong Jeumpa Sulur Spiral */}
      <path
        d="M14 14C22 14 28 20 28 28C28 36 22 42 14 42"
        stroke="url(#acehCornerGold)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M14 14C14 22 20 28 28 28C36 28 42 22 42 14"
        stroke="url(#acehCornerGold)"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* Diagonal Spire toward center */}
      <path
        d="M14 14L46 46M28 28L54 54"
        stroke="url(#acehCornerGold)"
        strokeWidth="0.75"
        strokeLinecap="round"
      />

      {/* Micro Bungong Petal Florette */}
      <circle cx="56" cy="56" r="3" fill="url(#acehCornerGold)" />
      <circle cx="56" cy="56" r="5" stroke="url(#acehCornerGold)" strokeWidth="0.5" strokeOpacity="0.7" />

      {/* Corner Pearl Pin */}
      <circle cx="4" cy="4" r="2" fill="url(#acehCornerGold)" />
    </svg>
  );
}
