"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { AuthenticGununganKayon } from "./AuthenticGununganKayon";
import { TraditionalGoldHeader } from "./TraditionalGoldHeader";

interface JawaHeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
}

/**
 * JawaHeroContent
 * Tata letak panggung dalam (Stage 2) khusus Jawa Keraton:
 * - Menghilangkan monogram lingkaran generik & font tegak bersambung pasaran
 * - Menggunakan tipografi Royal Keraton + aksen Aksara Jawa kuno
 * - Bingkai ukir emas beranimasi zoom-in saat panggung terbuka
 * - Mengganti 4 kotak countdown yang menutupi rumah joglo dengan glass pill minimalis
 * - Memberi ruang pandang lega agar arsitektur Pendopo Joglo terlihat megah
 */
export function JawaHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: JawaHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-6 px-4">
      {/* ── TOP BADGE: Gunungan Kayon & Subtitle ── */}
      <div
        className={`pt-2 flex flex-col items-center transition-all duration-1000 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <AuthenticGununganKayon className="w-12 h-16 mx-auto mb-1.5 opacity-95 animate-blencong drop-shadow-[0_4px_16px_rgba(197,155,60,0.45)]" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold text-[#E5C16C] block drop-shadow-[0_2px_6px_rgba(18,16,14,0.9)]">
          The Wedding Of
        </span>
      </div>

      {/* ── CENTER: Royal Keraton Frame & Aksara Jawa ── */}
      <div className="my-auto py-2 z-10 flex flex-col items-center w-full">
        <div
          className={`relative flex flex-col items-center max-w-[310px] sm:max-w-xs w-full mx-auto ${
            isRevealed ? "animate-name-border-zoom will-change-transform" : "opacity-0"
          }`}
        >
          {/* Outer hairline border dengan ambient glow emas */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 rounded border border-[#C59B3C]/50 shadow-[0_0_16px_rgba(197,155,60,0.22),inset_0_0_12px_rgba(197,155,60,0.1)]" />
            <div className="absolute inset-1.5 rounded-sm border border-[#E5C16C]/60" />

            {/* Corner diamond ornaments */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#12100E] border border-[#E5C16C] rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#C59B3C] rounded-full" />
            </div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#12100E] border border-[#E5C16C] rotate-45 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#C59B3C] rounded-full" />
            </div>
          </div>

          <div className="relative z-10 px-5 py-6 flex flex-col items-center text-center">
            {/* Judul Pengantin: Serif Display Foil Emas Keraton */}
            <h1 className="font-serif-display text-4xl sm:text-5xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#FFF2D6] to-[#C59B3C] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)] py-0.5 font-bold leading-tight">
              {data.groom.nickname} &amp; {data.bride.nickname}
            </h1>

            {/* Subtitle Aksara Jawa Kuno */}
            <div className="text-[12px] sm:text-[13px] tracking-[0.25em] text-[#E5C16C] font-serif opacity-90 my-1 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              ꦲꦤꦕꦫꦏ
            </div>

            {/* Header/Divider Jawa Tradisional */}
            <TraditionalGoldHeader className="w-40 sm:w-48 my-1.5 opacity-90" />

            {/* Tanggal Acara */}
            <p className="text-[11px] sm:text-xs font-serif tracking-[0.22em] uppercase font-semibold text-[#E5C16C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CORRIDOR: Minimalist Glass Countdown Pill & Scroll Prompt ── */}
      <div
        className={`w-full pb-4 flex flex-col items-center transition-all duration-1000 delay-500 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Sleek Minimalist Countdown Pill (Tidak menutupi Pendopo Joglo) */}
        <div className="backdrop-blur-md bg-[#12100E]/70 border border-[#C59B3C]/35 rounded-full px-4 py-1.5 mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B3C] animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.18em] uppercase text-[#E5C16C] font-medium">
            {timeLeft.days > 0
              ? `${timeLeft.days} Hari Menuju Akad & Resepsi`
              : `${timeLeft.hours} Jam · ${timeLeft.minutes} Menit · ${timeLeft.seconds} Detik`}
          </span>
        </div>

        {/* Scroll Prompt Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="inline-flex flex-col items-center transition-colors group cursor-pointer"
          style={{ color: "var(--theme-primary)" }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.25em] group-hover:text-white transition-colors mb-1 font-serif"
            style={{ color: "var(--theme-text-secondary)" }}
          >
            Gulir ke Bawah
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "var(--theme-primary)" }} />
        </button>
      </div>
    </div>
  );
}
