"use client";

import React from "react";

interface MinangNameBorderProps {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  isOpening?: boolean;
}

/**
 * MinangNameBorder
 * Bingkai Refined Luxury Emas Kencana & Beludru Arang Khas Ranah Minang.
 * Mengadopsi prinsip Quiet Luxury & Benchmark Folk Invitation:
 * - Hairline 1px metallic gold border dengan soft rounded frame
 * - Dark bento fill (radial gradient beludru arang gelap dengan ambient backdrop blur)
 * - Corner filigree Kaluak Paku hairline ultra-halus (tanpa elemen busur sirkus kaku)
 * - Ruang tipografi yang lega & elegan untuk kaligrafi mengalir mempelai
 */
export function MinangNameBorder({
  children,
  className = "",
  isOpen,
  isOpening,
}: MinangNameBorderProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  return (
    <div
      key={isRevealed ? "minang-name-border-revealed" : "minang-name-border-idle"}
      className={`relative flex flex-col items-center max-w-[340px] sm:max-w-md w-full mx-auto ${
        isRevealed ? "animate-name-border-zoom will-change-transform" : "opacity-0"
      } ${className}`}
      style={{
        transformOrigin: "center center",
      }}
    >
      {/* Refined Luxury Floating Glass Frame */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl border border-[#D4A017]/35 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_24px_rgba(212,160,23,0.12),inset_0_1px_1px_rgba(255,253,247,0.15)] backdrop-blur-md bg-[radial-gradient(ellipse_at_50%_25%,rgba(32,22,17,0.65)_0%,rgba(15,12,9,0.88)_100%)] overflow-hidden">
        {/* Inner Delicate Hairline Guide */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-[14px] sm:rounded-[20px] border border-[#F5D76E]/20" />

        {/* 4 Sudut Filigree Kaluak Paku Hairline Tipis */}
        <MinangFiligreeCorner className="top-1.5 left-1.5" />
        <MinangFiligreeCorner className="top-1.5 right-1.5 -scale-x-100" />
        <MinangFiligreeCorner className="bottom-1.5 left-1.5 -scale-y-100" />
        <MinangFiligreeCorner className="bottom-1.5 right-1.5 -scale-x-100 -scale-y-100" />

        {/* Titik Aksen Emas Hairline Atas & Bawah */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-75">
          <div className="w-4 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#F5D76E] shadow-[0_0_6px_#F5D76E]" />
          <div className="w-4 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 opacity-75">
          <div className="w-4 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#F5D76E] shadow-[0_0_6px_#F5D76E]" />
          <div className="w-4 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
        </div>
      </div>

      {/* Konten Nama Pengantin & Kaligrafi */}
      <div className="relative z-10 px-6 sm:px-8 py-7 sm:py-9 flex flex-col items-center text-center w-full">
        {children}
      </div>
    </div>
  );
}

function MinangFiligreeCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`absolute w-5 h-5 pointer-events-none opacity-80 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 2 16 V 4 C 2 2.895 2.895 2 4 2 H 16"
        stroke="#D4A017"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M 5 5 C 9 3, 11 5, 10 9 C 9.5 11, 7 11, 6.5 9"
        stroke="#F5D76E"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="3.5" cy="3.5" r="1.1" fill="#FFFDF7" />
    </svg>
  );
}

