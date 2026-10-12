"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { BaliGelunganEmblem } from "./BaliGelunganEmblem";
import { BaliPatraDivider } from "./BaliPatraDivider";
import { BaliNameBorder } from "./BaliNameBorder";

interface BaliHeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
}

/**
 * BaliHeroContent
 * Tata letak panggung pementasan Stage 2 khusus Kerajaan Bali (Bali Royal Candi Bentar).
 * Proporsi harmonis terkalibrasi dengan Royal Canopy Top dan Candi Bentar:
 * - Top: Mahkota Gelungan bertengger anggun tepat di bawah kubah kanopi emas atas.
 * - Center: Bingkai ukiran Patra Punggel keemasan membingkai nama mempelai,
 *   aksara Bali otentik (ᬯᬬᬦ᭄ & ᬧᬸᬢᬸ), dan Padma Kencana divider.
 * - Bottom: Sleek Glass Countdown Pill minimalis tembus pandang berhias pendar api suci blencong.
 */
export function BaliHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: BaliHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const groomName = data?.groom?.nickname || "Wayan";
  const brideName = data?.bride?.nickname || "Putu";

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-6 px-4">
      {/* ── TOP BADGE: Terkalibrasi turun harmonis di bawah lengkungan Royal Canopy Top ── */}
      <div
        className={`pt-12 sm:pt-16 flex flex-col items-center transition-all duration-1000 delay-150 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <BaliGelunganEmblem className="w-14 sm:w-16 h-auto mx-auto mb-1.5 opacity-95 animate-blencong drop-shadow-[0_4px_20px_rgba(212,175,55,0.5)]" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold text-[#FFFDF7]/90 block drop-shadow-[0_2px_8px_rgba(15,12,27,0.95)]">
          The Wedding Of
        </span>
        <span className="text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.28em] font-serif text-[#FDE68A]/85 block drop-shadow-[0_2px_4px_rgba(15,12,27,0.9)] mt-0.5">
          Pawiwahan Ageng
        </span>
      </div>

      {/* ── CENTER: Balinese Patra Name Border & Aksara Bali ── */}
      <div className="my-auto py-3 z-10 flex flex-col items-center w-full">
        <BaliNameBorder isOpen={isOpen} isOpening={isOpening}>
          {/* Judul Nama Pengantin: Serif Display Foil Kencana */}
          <h1 className="font-serif-display text-4xl sm:text-5xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#FDE68A] to-[#D4AF37] drop-shadow-[0_4px_20px_rgba(15,12,27,0.95)] py-0.5 font-bold leading-tight">
            {groomName} &amp; {brideName}
          </h1>

          {/* Subtitle Aksara Bali Asli */}
          <div className="text-[13px] sm:text-[14px] tracking-[0.25em] text-[#FDE68A] font-serif opacity-95 my-1 select-none drop-shadow-[0_2px_6px_rgba(15,12,27,0.9)] font-medium">
            {groomName === "Faizal" && brideName === "Sarah" ? "ᬧᬳᬶᬚᬮ᭄ & ᬲᬭᬄ" : "ᬯᬬᬦ᭄ & ᬧᬸᬢᬸ"}
          </div>

          {/* Divider Patra Punggel Kencana */}
          <BaliPatraDivider className="w-40 sm:w-48 my-1.5 opacity-90" />

          {/* Tanggal Pawiwahan */}
          <p className="text-[11px] sm:text-xs font-serif tracking-[0.22em] uppercase font-semibold text-[#FFFDF7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            {formatDate(data?.events?.[0]?.date, data?.events?.[0]?.dayName)}
          </p>
        </BaliNameBorder>
      </div>

      {/* ── BOTTOM CORRIDOR: Sleek Minimalist Glass Countdown Pill & Scroll Down Prompt ── */}
      <div
        className={`w-full pb-6 sm:pb-8 flex flex-col items-center transition-all duration-1000 delay-500 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Sleek Minimalist Countdown Pill (Bening tembus pandang menjaga koridor gapura) */}
        <div className="backdrop-blur-md bg-[#0F0C1B]/75 border border-[#D4AF37]/45 rounded-full px-5 py-2 mb-3.5 shadow-[0_4px_22px_rgba(0,0,0,0.6)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FDE68A] animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.18em] uppercase text-[#FFFDF7] font-medium">
            {timeLeft.days > 0
              ? `${timeLeft.days} Hari Menuju Pawiwahan Ageng`
              : `${timeLeft.hours} Jam · ${timeLeft.minutes} Menit · ${timeLeft.seconds} Detik Menuju Pawiwahan`}
          </span>
        </div>

        {/* Scroll Prompt Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="inline-flex flex-col items-center transition-colors group cursor-pointer"
          style={{ color: "var(--theme-primary, #D4AF37)" }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.25em] group-hover:text-white transition-colors mb-1 font-serif text-[#FFFDF7]/70"
          >
            Gulir ke Bawah
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}
