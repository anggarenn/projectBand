"use client";

import React from "react";

interface MegamendungNameBorderProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  isOpening?: boolean;
}

/**
 * MegamendungNameBorder
 * Bingkai ornamental Sunda bangsawan emas di sekeliling area nama pengantin.
 * Animasi zoom-in: Meluncur masuk dengan scale 1.22 → 1.0 bersamaan dengan reveal panggung
 * saat tirai awan Megamendung tersibak.
 */
export function MegamendungNameBorder({
  children,
  className = "",
  isOpen,
  isOpening,
}: MegamendungNameBorderProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  return (
    <div
      key={isRevealed ? "name-border-revealed" : "name-border-idle"}
      className={`relative flex flex-col items-center max-w-[310px] sm:max-w-xs w-full mx-auto ${
        isRevealed ? "animate-name-border-zoom will-change-transform" : "opacity-0"
      } ${className}`}
      style={{
        transformOrigin: "center center",
      }}
    >
      {/* Zoom-in Animated Border Frame */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Outer hairline border dengan ambient glow emas */}
        <div className="absolute inset-0 rounded border border-[#D4AF37]/50 shadow-[0_0_16px_rgba(212,175,55,0.22),inset_0_0_12px_rgba(212,175,55,0.1)]" />

        {/* Inner delicate hairline border */}
        <div className="absolute inset-1.5 rounded-sm border border-[#F5D061]/70" />

        {/* 4 Sudut Filigree Ornamen Sunda */}
        <CornerFiligree className="top-0 left-0" />
        <CornerFiligree className="top-0 right-0 -scale-x-100" />
        <CornerFiligree className="bottom-0 left-0 -scale-y-100" />
        <CornerFiligree className="bottom-0 right-0 -scale-x-100 -scale-y-100" />

        {/* Diamond Aksesori di Tengah Garis Atas & Bawah */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#070D1E] border border-[#F5D061] rotate-45 flex items-center justify-center">
          <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#070D1E] border border-[#F5D061] rotate-45 flex items-center justify-center">
          <div className="w-1 h-1 bg-[#D4AF37] rounded-full" />
        </div>
      </div>

      {/* Konten Nama Pengantin */}
      <div className="relative z-10 px-5 py-6 flex flex-col items-center text-center">
        {children}
      </div>
    </div>
  );
}

function CornerFiligree({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute w-6 h-6 pointer-events-none ${className}`}
      fill="none"
    >
      <path
        d="M2 14 V4 C2 2.895 2.895 2 4 2 H14"
        stroke="#F5D061"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M5 10 V5 H10"
        stroke="#D4AF37"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="4" cy="4" r="1.5" fill="#FFE89E" />
    </svg>
  );
}
