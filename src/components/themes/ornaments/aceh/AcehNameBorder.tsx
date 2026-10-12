"use client";

import React from "react";

interface AcehNameBorderProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  isOpening?: boolean;
}

/**
 * AcehNameBorder
 * Bingkai Dark Glass Bento 1px Gold Hairline Khas Adat Serambi Mekkah.
 * Mengadopsi prinsip Sacred Heritage Noir (Quiet Luxury):
 * - Hairline 1px metallic royal gold border dengan sudut rounded halus.
 * - Latar dark bento glass (radial gradient arang obsidian pekat dengan backdrop blur).
 * - 4 Sudut Filigree Pinto Aceh & Bungong Jeumpa (kisi ramping 1px).
 * - Aksen puncak mahkota gerbang Pinto Aceh di sisi atas & bawah frame.
 * - Ruang tipografi lapang & agung untuk kaligrafi nama pengantin dan doa sakral.
 */
export function AcehNameBorder({
  children,
  className = "",
  isOpen,
  isOpening,
}: AcehNameBorderProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  return (
    <div
      key={isRevealed ? "aceh-name-border-revealed" : "aceh-name-border-idle"}
      className={`relative flex flex-col items-center max-w-[340px] sm:max-w-md w-full mx-auto ${
        isRevealed ? "animate-name-border-zoom will-change-transform" : "opacity-0"
      } ${className}`}
      style={{
        transformOrigin: "center center",
      }}
    >
      {/* ── BENTO GLASS CASING & 1PX GOLD HAIRLINE FRAME ── */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border border-[#D4A017]/35 shadow-[0_12px_44px_rgba(0,0,0,0.88),0_0_24px_rgba(212,160,23,0.14),inset_0_1px_1px_rgba(255,253,247,0.16)] backdrop-blur-md bg-[radial-gradient(ellipse_at_50%_25%,rgba(28,23,18,0.72)_0%,rgba(13,11,8,0.92)_100%)] overflow-hidden">
        {/* Inner Delicate Hairline Guide */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-[14px] sm:rounded-[20px] border border-[#F5D76E]/20" />

        {/* 4 Sudut Filigree Ornamen Pinto Aceh & Bungong Jeumpa */}
        <AcehFiligreeCorner className="top-1.5 left-1.5" />
        <AcehFiligreeCorner className="top-1.5 right-1.5 -scale-x-100" />
        <AcehFiligreeCorner className="bottom-1.5 left-1.5 -scale-y-100" />
        <AcehFiligreeCorner className="bottom-1.5 right-1.5 -scale-x-100 -scale-y-100" />

        {/* Top Pinto Crest Finial Center Accent */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-80">
          <div className="w-5 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M 5 1 L 9 5 L 5 9 L 1 5 Z" stroke="#F5D76E" strokeWidth="0.8" fill="#14100C" />
            <circle cx="5" cy="5" r="1.2" fill="#FFFDF7" />
          </svg>
          <div className="w-5 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
        </div>

        {/* Bottom Pinto Crest Finial Center Accent */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-80">
          <div className="w-5 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M 5 1 L 9 5 L 5 9 L 1 5 Z" stroke="#F5D76E" strokeWidth="0.8" fill="#14100C" />
            <circle cx="5" cy="5" r="1.2" fill="#FFFDF7" />
          </svg>
          <div className="w-5 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
        </div>
      </div>

      {/* ── KONTEN DI DALAM FRAME BENTO ── */}
      <div className="relative z-10 px-5 sm:px-8 py-6 sm:py-8 flex flex-col items-center text-center w-full">
        {children}
      </div>
    </div>
  );
}

/**
 * AcehFiligreeCorner
 * Ornamen sudut gerbang Pinto Aceh hairline tipis 1px.
 */
function AcehFiligreeCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute w-5 h-5 pointer-events-none opacity-85 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer corner hairline */}
      <path
        d="M 2 16 V 4 C 2 2.895 2.895 2 4 2 H 16"
        stroke="#D4A017"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* Pinto arch curve in corner */}
      <path
        d="M 5 5 C 9 4, 11 6, 11 10 M 5 5 C 4 9, 6 11, 10 11"
        stroke="#F5D76E"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      {/* Pearl bead at the corner bend */}
      <circle cx="3.5" cy="3.5" r="1.2" fill="#FFFDF7" />
      <circle cx="8" cy="8" r="0.9" fill="#F5D76E" />
    </svg>
  );
}
