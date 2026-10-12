"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

interface SundaVintageHeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
}

/**
 * SundaVintageHeroContent
 * Layout Stage 2 untuk Preset Sunda Vintage Folk Parahyangan.
 * Mengharmonisasikan native video motion etsa & 6 kupu-kupu yang mekar:
 * - Tipografi Romantic Script Cursive (Alex Brush / font-script) untuk nama mempelai
 * - Small serif vintage "THE WEDDING OF" dengan tracking lebar
 * - Tanggal dalam format dot spacing "31 . 12 . 25"
 * - Bersih tanpa tabrakan kanopi awan teater (kanopi awan hanya untuk Sunda Navy Gold)
 */
export function SundaVintageHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: SundaVintageHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  // Helper konversi format tanggal ke dot-spacing: "31 . 12 . 25"
  const formatDotDate = (dateStr?: string) => {
    if (!dateStr) return "31 . 12 . 25";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const day = parts[2].padStart(2, "0");
        const month = parts[1].padStart(2, "0");
        const year = parts[0].slice(-2);
        return `${day} . ${month} . ${year}`;
      }
    } catch {}
    return "31 . 12 . 25";
  };

  const dotDate = formatDotDate(data.events?.[0]?.date);
  const fullDate = formatDate(data.events?.[0]?.date, data.events?.[0]?.dayName);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-8 px-4 pointer-events-auto">
      {/* ── TOP SPACER ── */}
      <div className="pt-4" />

      {/* ── CENTER: Authentic Flow matching Folkinvitation ── */}
      <div
        className={`my-auto py-2 z-10 flex flex-col items-center text-center w-full max-w-[340px] sm:max-w-md transition-all duration-1000 delay-200 ${
          isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* THE WEDDING OF */}
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-inria font-semibold text-[#4A3525] block drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)] mb-3">
          The Wedding Of
        </span>

        {/* Nama Pengantin: Groom di atas, & di tengah diapit kupu-kupu, Bride di bawah */}
        <h1 className="flex flex-col items-center text-center">
          <span className="font-script text-5xl sm:text-6xl text-[#3D2617] drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] leading-tight">
            {data.groom.nickname}
          </span>
          <span className="font-inria font-normal text-3xl sm:text-4xl text-[#8B5A2B] my-1 inline-block drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            &amp;
          </span>
          <span className="font-script text-5xl sm:text-6xl text-[#3D2617] drop-shadow-[0_2px_12px_rgba(255,255,255,0.9)] leading-tight">
            {data.bride.nickname}
          </span>
        </h1>

        {/* Tanggal Format Dot Spacing "31 . 12 . 25" */}
        <div className="mt-4 flex items-center justify-center">
          <p className="font-inria text-sm sm:text-base tracking-[0.35em] text-[#5C3D2E] font-medium drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]">
            {dotDate}
          </p>
        </div>
      </div>

      {/* ── BOTTOM CORRIDOR: Sepia Glass Countdown Pill & Scroll ── */}
      <div
        className={`w-full pb-6 sm:pb-8 flex flex-col items-center transition-all duration-1000 delay-500 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Warm Sepia Countdown Pill */}
        <div className="backdrop-blur-md bg-[#FAF4ED]/85 border border-[#8B5A2B]/30 rounded-full px-4 py-1.5 mb-4 shadow-[0_4px_16px_rgba(74,53,37,0.12)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B] animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.18em] uppercase text-[#4A3525] font-medium">
            {timeLeft.days > 0
              ? `${timeLeft.days} Hari Menuju Hari Bahagia`
              : `${timeLeft.hours} Jam · ${timeLeft.minutes} Menit · ${timeLeft.seconds} Detik`}
          </span>
        </div>

        {/* Scroll Prompt Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="inline-flex flex-col items-center transition-colors group cursor-pointer"
          style={{ color: "#5C3410" }}
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#6E4F32] group-hover:text-[#3D2617] transition-colors mb-1 font-serif">
            Gulir ke Bawah
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#5C3410]" />
        </button>
      </div>
    </div>
  );
}
