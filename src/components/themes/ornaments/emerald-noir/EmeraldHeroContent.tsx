"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { EmeraldGoldDivider } from "./EmeraldGoldDivider";

interface EmeraldHeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
}

/**
 * EmeraldHeroContent
 * Layout Stage 2 Hero Section untuk Preset Emerald Velvet Noir (Quiet Luxury).
 * Menampilkan tipografi romantis dengan aksen emas metallic di atas latar deep emerald velvet:
 * - "THE WEDDING OF" dengan tracking lebar serif elegan
 * - Nama mempelai dalam font-script kaligrafi romantis bergradien emas
 * - Tanggal pernikahan dalam format serif klasik
 * - Countdown timer box minimalis berbingkai emas hairline
 * - Scroll down indicator emas halus
 */
export function EmeraldHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: EmeraldHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const fullDate = formatDate(data.events?.[0]?.date, data.events?.[0]?.dayName);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-10 px-4 pointer-events-auto">
      {/* ── TOP BADGE ── */}
      <div
        className={`pt-6 transition-all duration-1000 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.35em] text-[#D4AF37] font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            The Wedding Of
          </span>
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
        <h1 className="font-script text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight">
          {data.bride.nickname}
        </h1>

        {/* Ampersand Monogram */}
        <div className="my-1 flex items-center justify-center">
          <span className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            &amp;
          </span>
        </div>

        {/* Groom Nickname */}
        <h1 className="font-script text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight">
          {data.groom.nickname}
        </h1>

        {/* Emerald Gold Botanical Divider */}
        <EmeraldGoldDivider className="w-48 sm:w-56 my-3 opacity-90" />

        {/* Wedding Date */}
        <p className="font-serif text-xs sm:text-sm text-[#F4F6F0] tracking-widest uppercase font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {fullDate}
        </p>

        {/* ── COUNTDOWN TIMER (Minimalist Luxury) ── */}
        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3">
          {[
            { label: "Hari", val: timeLeft.days },
            { label: "Jam", val: timeLeft.hours },
            { label: "Menit", val: timeLeft.minutes },
            { label: "Detik", val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-14 sm:w-16 h-14 sm:h-16 rounded-xl bg-[#0D2A20]/80 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_4px_16px_rgba(0,0,0,0.6)] group transition-all duration-300 hover:border-[#D4AF37]/70"
            >
              <span className="font-serif text-lg sm:text-xl font-bold text-[#FFF8E1] tracking-wider leading-none">
                {String(item.val).padStart(2, "0")}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#8BA398] mt-1 font-sans">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM: SCROLL DOWN INDICATOR ── */}
      <div
        className={`pb-4 transition-all duration-1000 delay-300 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-1.5 cursor-pointer text-[#D4AF37] transition-all hover:text-[#FFF8E1]"
          aria-label="Scroll ke konten undangan"
        >
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] opacity-80 group-hover:opacity-100">
            Gulir Kebawah
          </span>
          <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#0D2A20]/60 backdrop-blur-sm group-hover:border-[#D4AF37] transition-colors shadow-md">
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
}
