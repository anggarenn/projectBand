"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { LatticeDivider } from "./LatticeDivider";
import { ShuangXiSeal } from "./ShuangXiSeal";

interface HeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
}

/**
 * HeroContent
 * Layout Stage 2 Hero Section untuk Preset Royal Chinoiserie Silk (Sangjit & Peranakan Luxury).
 * Menampilkan tipografi mewah, lambang kebahagiaan ganda 囍 (Shuang Xi), dan kotak countdown sutra merah emas.
 */
export function HeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: HeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const fullDate = formatDate(data.events?.[0]?.date, data.events?.[0]?.dayName);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-10 px-4 pointer-events-auto">
      {/* ── TOP BADGE WITH SHUANG XI ── */}
      <div
        className={`pt-6 transition-all duration-1000 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <div className="flex items-center gap-1.5">
            <span className="text-[#D4AF37] text-sm select-none">囍</span>
            <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.35em] text-[#D4AF37] font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              The Wedding Of
            </span>
            <span className="text-[#D4AF37] text-sm select-none">囍</span>
          </div>
          <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>
      </div>

      {/* ── CENTER: COUPLE NAMES & TYPOGRAPHY ── */}
      <div
        className={`my-auto py-4 z-10 flex flex-col items-center text-center w-full max-w-[340px] sm:max-w-md transition-all duration-1000 delay-200 ${
          isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Bride Nickname */}
        <h1 className="font-serif text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FDE047] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(59,8,12,0.9)] leading-tight tracking-wide">
          {data.bride.nickname}
        </h1>

        {/* Auspicious Center Knot */}
        <div className="my-2 flex items-center justify-center gap-3">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
          <span className="font-serif italic text-2xl sm:text-3xl text-[#E6C65C] opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            &amp;
          </span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
        </div>

        {/* Groom Nickname */}
        <h1 className="font-serif text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FDE047] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(59,8,12,0.9)] leading-tight tracking-wide">
          {data.groom.nickname}
        </h1>

        {/* Chinoiserie Lattice Divider */}
        <LatticeDivider className="w-48 sm:w-56 my-3 opacity-95" />

        {/* Wedding Date */}
        <p className="font-serif text-xs sm:text-sm text-[#FAF7F0] tracking-widest uppercase font-medium drop-shadow-[0_2px_8px_rgba(59,8,12,0.9)]">
          {fullDate}
        </p>

        {/* ── COUNTDOWN TIMER (Red Silk Bento Boxes) ── */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3">
          {[
            { label: "Hari", val: timeLeft.days },
            { label: "Jam", val: timeLeft.hours },
            { label: "Menit", val: timeLeft.minutes },
            { label: "Detik", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-[#5C131A]/85 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_4px_16px_rgba(59,8,12,0.8)] group transition-all duration-300 hover:border-[#D4AF37]/70"
            >
              <span className="font-serif text-lg sm:text-xl font-bold text-[#FFFDF0] tracking-wider leading-none">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#E6C65C] mt-1 font-sans">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: SCROLL DOWN INDICATOR ── */}
      <div
        className={`pb-4 z-10 transition-all duration-1000 delay-500 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={onScrollDown}
          className="flex flex-col items-center gap-1 text-[#E6C65C] opacity-80 hover:opacity-100 transition-opacity cursor-pointer group"
          aria-label="Scroll ke konten undangan"
        >
          <span className="text-[9px] sm:text-[10px] uppercase font-serif tracking-[0.25em]">
            Gulir Ke Bawah
          </span>
          <div className="w-7 h-7 rounded-full border border-[#D4AF37]/40 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
            <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
          </div>
        </button>
      </div>
    </div>
  );
}
