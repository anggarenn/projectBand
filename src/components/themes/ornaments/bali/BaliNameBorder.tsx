"use client";

import React from "react";

interface BaliNameBorderProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  isOpening?: boolean;
}

/**
 * BaliNameBorder
 * Bingkai ornamental Patra Punggel kerajaan Bali keemasan di sekeliling nama mempelai.
 * Animasi zoom-in halus (scale 1.22 → 1.0) saat panggung terbuka serasi dengan pembelahan Candi Bentar.
 */
export function BaliNameBorder({
  children,
  className = "",
  isOpen,
  isOpening,
}: BaliNameBorderProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  return (
    <div
      key={isRevealed ? "bali-name-border-revealed" : "bali-name-border-idle"}
      className={`relative flex flex-col items-center max-w-[310px] sm:max-w-xs w-full mx-auto ${
        isRevealed ? "animate-name-border-zoom will-change-transform" : "opacity-0"
      } ${className}`}
      style={{
        transformOrigin: "center center",
      }}
    >
      {/* Zoom-in Animated Border Frame */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Outer hairline border dengan ambient glow emas kencana & glass backdrop */}
        <div className="absolute inset-0 rounded bg-[#0F0C1B]/75 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_0_24px_rgba(212,175,55,0.28),inset_0_0_16px_rgba(212,175,55,0.12)]" />

        {/* Inner delicate hairline border */}
        <div className="absolute inset-1.5 rounded-sm border border-[#FDE68A]/65" />

        {/* 4 Sudut Patra Punggel Khas Ukiran Pura Bali */}
        <BaliCornerPatra className="top-0 left-0" />
        <BaliCornerPatra className="top-0 right-0 -scale-x-100" />
        <BaliCornerPatra className="bottom-0 left-0 -scale-y-100" />
        <BaliCornerPatra className="bottom-0 right-0 -scale-x-100 -scale-y-100" />

        {/* Permata Padma Kencana di Tengah Garis Atas & Bawah */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0F0C1B] border border-[#FDE68A] rotate-45 flex items-center justify-center shadow-[0_0_8px_rgba(253,230,138,0.6)]">
          <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
        </div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0F0C1B] border border-[#FDE68A] rotate-45 flex items-center justify-center shadow-[0_0_8px_rgba(253,230,138,0.6)]">
          <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
        </div>
      </div>

      {/* Konten Nama Pengantin */}
      <div className="relative z-10 px-5 py-6 flex flex-col items-center text-center">
        {children}
      </div>
    </div>
  );
}

function BaliCornerPatra({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={`absolute w-7 h-7 pointer-events-none ${className}`}
      fill="none"
    >
      <path
        d="M2 16 V4 C2 2.895 2.895 2 4 2 H16"
        stroke="#FDE68A"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6 12 C6 7 7 6 12 6"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Sulur Kuping Guling spiral */}
      <path
        d="M5 5 C8 3 11 4 11 8 C11 10 9 11 7 10"
        stroke="#FFFDF7"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="4" cy="4" r="1.5" fill="#FFFDF7" />
    </svg>
  );
}
