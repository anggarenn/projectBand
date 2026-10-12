"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { ThemeConfig } from "@/types/theme";
import { SundaSigerEmblem } from "./SundaSigerEmblem";
import { MegamendungDivider } from "./MegamendungDivider";
import { MegamendungNameBorder } from "./MegamendungNameBorder";

interface SundaHeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
  theme?: ThemeConfig;
}

/**
 * SundaHeroContent
 * Tata letak panggung dalam (Stage 2) khusus Sunda Parahyangan:
 * - Sunda Vintage: Kaligrafi anggun (Alex Brush cursive), warna sepia #4a3525, terkalibrasi di tengah video motion.
 * - Sunda Midnight Gold: Tipografi Royal Priangan, aksara Sunda kuno, dan border filigree emas.
 */
export function SundaHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
  theme,
}: SundaHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const isVintage =
    theme?.id === "sunda-vintage" ||
    theme?.variant === "sunda-vintage" ||
    theme?.colors?.bgBase === "#EDE5DB";

  // ── BRANCH 1: SUNDA VINTAGE FOLK PARAHYANGAN (NATIVE VIDEO MOTION) ──
  if (isVintage) {
    return (
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-6 px-4">
        {/* Top Badge: Siger Sunda & Subtitle (Warm Sepia) */}
        <div
          className={`pt-10 sm:pt-12 flex flex-col items-center transition-all duration-1000 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <SundaSigerEmblem className="w-11 h-11 mx-auto mb-1.5 opacity-80 text-[#8B4E17] drop-shadow-[0_2px_8px_rgba(92,52,16,0.2)]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold text-[#6C5542] block">
            The Wedding Of
          </span>
        </div>

        {/* Center: Cursive / Calligraphy Typography di Tengah Bingkai Video */}
        <div
          className={`my-auto py-2 z-10 flex flex-col items-center w-full max-w-[340px] mx-auto text-center transition-all duration-1000 delay-200 ${
            isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Judul Pengantin: Cursive / Calligraphy Anggun Khas Undangan Vintage */}
          <h1 className="font-script text-5xl sm:text-6xl text-[#4a3525] py-1 leading-[1.15] drop-shadow-[0_2px_12px_rgba(255,249,246,0.85)] select-none">
            {data.groom.nickname}{" "}
            <span className="font-serif text-3xl sm:text-4xl text-[#8B4E17] mx-1">&amp;</span>{" "}
            {data.bride.nickname}
          </h1>

          {/* Subtitle Aksara Sunda Kuno Sepia */}
          <div className="text-[11px] sm:text-xs tracking-[0.25em] text-[#8B4E17]/85 font-serif my-1 select-none">
            ᮃᮞᮨᮕ᮪ &amp; ᮜᮤᮜᮤᮞ᮪
          </div>

          {/* Garis Aksen Vintage Halus */}
          <div className="w-32 sm:w-40 h-px bg-gradient-to-r from-transparent via-[#8B4E17]/40 to-transparent my-2" />

          {/* Tanggal Acara */}
          <p className="text-[11px] sm:text-xs font-serif tracking-[0.22em] uppercase font-semibold text-[#5C3410]">
            {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
          </p>
        </div>

        {/* Bottom Corridor: Warm Sepia Translucent Countdown Pill & Scroll Prompt */}
        <div
          className={`w-full pb-4 flex flex-col items-center transition-all duration-1000 delay-500 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="backdrop-blur-md bg-[#FFF9F6]/85 border border-[#8B4E17]/30 rounded-full px-4 py-1.5 mb-4 shadow-[0_4px_16px_rgba(92,52,16,0.12)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B4E17] animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.18em] uppercase text-[#4a3525] font-semibold">
              {timeLeft.days > 0
                ? `${timeLeft.days} Hari Menuju Akad & Resepsi`
                : `${timeLeft.hours} Jam · ${timeLeft.minutes} Menit · ${timeLeft.seconds} Detik`}
            </span>
          </div>

          <button
            type="button"
            onClick={onScrollDown}
            className="inline-flex flex-col items-center transition-colors group cursor-pointer text-[#5C3410]"
          >
            <span className="text-[9px] uppercase tracking-[0.25em] group-hover:text-[#1A140E] transition-colors mb-1 font-serif text-[#6C5542]">
              Gulir ke Bawah
            </span>
            <ChevronDown className="w-5 h-5 animate-bounce text-[#8B4E17]" />
          </button>
        </div>
      </div>
    );
  }

  // ── BRANCH 2: SUNDA MIDNIGHT NAVY GOLD (ROYAL PRIANGAN THEATRICAL) ──
  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-6 px-4">
      {/* ── TOP BADGE: Siger Sunda & Subtitle ── */}
      <div
        className={`pt-10 sm:pt-12 flex flex-col items-center transition-all duration-1000 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <SundaSigerEmblem className="w-13 h-13 mx-auto mb-1.5 opacity-95 animate-blencong drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)]" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold text-[#FFF2D6]/90 block drop-shadow-[0_2px_6px_rgba(7,13,30,0.9)]">
          The Wedding Of
        </span>
      </div>

      {/* ── CENTER: Royal Priangan Name Border & Aksara Sunda ── */}
      <div className="my-auto py-2 z-10 flex flex-col items-center w-full">
        <MegamendungNameBorder isOpen={isOpen} isOpening={isOpening}>
          {/* Judul Pengantin: Serif Display Foil Emas */}
          <h1 className="font-serif-display text-4xl sm:text-5xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#FFF2D6] to-[#D4AF37] drop-shadow-[0_4px_18px_rgba(7,13,30,0.95)] py-0.5 font-bold leading-tight">
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h1>

          {/* Subtitle Aksara Sunda Kuno Asli */}
          <div className="text-[12px] sm:text-[13px] tracking-[0.25em] text-[#E5C16C] font-serif opacity-90 my-1 select-none drop-shadow-[0_2px_4px_rgba(7,13,30,0.8)]">
            ᮃᮞᮨᮕ᮪ &amp; ᮜᮤᮜᮤᮞ᮪
          </div>

          {/* Divider Megamendung Ramping */}
          <MegamendungDivider className="w-40 sm:w-48 my-1.5 opacity-90" />

          {/* Tanggal Acara */}
          <p className="text-[11px] sm:text-xs font-serif tracking-[0.22em] uppercase font-semibold text-[#FFF2D6] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
          </p>
        </MegamendungNameBorder>
      </div>

      {/* ── BOTTOM CORRIDOR: Minimalist Glass Countdown Pill & Scroll Prompt ── */}
      <div
        className={`w-full pb-4 flex flex-col items-center transition-all duration-1000 delay-500 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Sleek Minimalist Countdown Pill (Tidak menutupi Rumah Julang Ngapak) */}
        <div className="backdrop-blur-md bg-[#070D1E]/60 border border-[#D4AF37]/35 rounded-full px-4 py-1.5 mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.18em] uppercase text-[#FFF2D6] font-medium">
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
