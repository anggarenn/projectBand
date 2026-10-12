import React from "react";

interface EmeraldGoldDividerProps {
  className?: string;
}

/**
 * EmeraldGoldDivider
 * Divider hairline emas tipis dengan aksen geometric diamond dan botanical scroll di tengah.
 * Memberikan jeda visual yang anggun dan mewah di atas deep emerald velvet.
 */
export function EmeraldGoldDivider({ className = "w-44 sm:w-56 h-auto" }: EmeraldGoldDividerProps) {
  return (
    <svg
      viewBox="0 0 320 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none mx-auto my-3 drop-shadow-[0_1px_4px_rgba(212,175,55,0.4)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="emDividerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
          <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#FFF4D0" stopOpacity="1" />
          <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="emGoldCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8E1" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9B7826" />
        </linearGradient>
      </defs>

      {/* Hairline Rule Utama */}
      <line x1="20" y1="12" x2="135" y2="12" stroke="url(#emDividerGrad)" strokeWidth="0.8" />
      <line x1="185" y1="12" x2="300" y2="12" stroke="url(#emDividerGrad)" strokeWidth="0.8" />

      {/* Titik Aksen Tapering Kiri & Kanan */}
      <circle cx="120" cy="12" r="1" fill="#D4AF37" fillOpacity="0.8" />
      <circle cx="200" cy="12" r="1" fill="#D4AF37" fillOpacity="0.8" />

      {/* Botanical Leaflet Kiri */}
      <path
        d="M 148 12 C 142 8, 136 10, 138 14 C 142 15, 146 14, 148 12 Z"
        fill="url(#emGoldCenterGrad)"
      />
      {/* Botanical Leaflet Kanan */}
      <path
        d="M 172 12 C 178 8, 184 10, 182 14 C 178 15, 174 14, 172 12 Z"
        fill="url(#emGoldCenterGrad)"
      />

      {/* Center Faceted Diamond */}
      <polygon
        points="160,4 167,12 160,20 153,12"
        fill="url(#emGoldCenterGrad)"
        stroke="#FFF4D0"
        strokeWidth="0.5"
      />
      {/* Inner Sparkle */}
      <circle cx="160" cy="12" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}
