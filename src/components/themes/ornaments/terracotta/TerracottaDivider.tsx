import React from "react";

interface TerracottaDividerProps {
  className?: string;
  width?: number;
}

/**
 * TerracottaDivider
 * Divider pembatas seksi bernuansa bohemian: lengkungan arch terakota, titik meadow, dan garis clay halus.
 */
export function TerracottaDivider({
  className = "w-44 h-6",
  width = 180,
}: TerracottaDividerProps) {
  return (
    <svg
      viewBox={`0 0 ${width} 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none my-2 drop-shadow-[0_1px_4px_rgba(191,87,63,0.15)] ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tcDivGradL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BF573F" stopOpacity="0" />
          <stop offset="70%" stopColor="#BF573F" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#BF573F" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="tcDivGradR" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#BF573F" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#BF573F" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#BF573F" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Center Boho Arch Accent */}
      <g transform={`translate(${width / 2}, 12)`}>
        {/* Outer Mini Arch */}
        <path
          d="M -16 6 A 16 16 0 0 1 16 6"
          stroke="#BF573F"
          strokeWidth="1.2"
          strokeOpacity="0.75"
          fill="none"
        />
        {/* Inner Mini Arch */}
        <path
          d="M -10 6 A 10 10 0 0 1 10 6"
          stroke="#8F3B25"
          strokeWidth="0.8"
          strokeOpacity="0.5"
          fill="none"
        />
        {/* Center terracotta seed / dot */}
        <circle cx="0" cy="3" r="2.2" fill="#BF573F" />
        <circle cx="0" cy="-3" r="1.4" fill="#8F3B25" />

        {/* Small flanking botanical leaves */}
        <path
          d="M -5 6 C -8 8 -11 5 -9 3 C -7 3 -6 5 -5 6 Z"
          fill="#BF573F"
          fillOpacity="0.7"
        />
        <path
          d="M 5 6 C 8 8 11 5 9 3 C 7 3 6 5 5 6 Z"
          fill="#BF573F"
          fillOpacity="0.7"
        />
      </g>

      {/* Left Hairline & Dot */}
      <line
        x1="10"
        y1="12"
        x2={width / 2 - 20}
        y2="12"
        stroke="url(#tcDivGradL)"
        strokeWidth="1"
      />
      <circle cx={width / 2 - 24} cy="12" r="1.5" fill="#BF573F" fillOpacity="0.6" />

      {/* Right Hairline & Dot */}
      <line
        x1={width / 2 + 20}
        y1="12"
        x2={width - 10}
        y2="12"
        stroke="url(#tcDivGradR)"
        strokeWidth="1"
      />
      <circle cx={width / 2 + 24} cy="12" r="1.5" fill="#BF573F" fillOpacity="0.6" />
    </svg>
  );
}
