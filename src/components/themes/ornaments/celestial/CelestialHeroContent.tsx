"use client";

import React from "react";
import { ChevronDown, Moon } from "lucide-react";
import { CelestialStarDivider } from "./CelestialStarDivider";
import { CelestialMoonSeal } from "./CelestialMoonSeal";

interface CelestialHeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
  theme?: any;
}

/**
 * CelestialHeroContent
 * Tata letak panggung Stage 2 untuk tema Celestial Twilight (Starlight & Cosmic Romance).
 * Fitur:
 * - Backing peta rasi bintang halus (constellation chart)
 * - Emblem Stargate Moon Seal berotasi anggun
 * - Tipografi "THE WEDDING OF" berjarak lebar kosmik
 * - Nama mempelai script bercahaya stardust lavender
 * - Pill tanggal beraksen fase bulan
 * - 4 Glassmorphism countdown timer cards
 */
export function CelestialHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: CelestialHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const groomName = data.groom?.nickname || data.groom?.name || "Groom";
  const brideName = data.bride?.nickname || data.bride?.name || "Bride";
  const initials = `${groomName[0] || "G"} & ${brideName[0] || "B"}`;

  const eventDate = data.events?.[0]?.date;
  const eventDay = data.events?.[0]?.dayName;
  const fullDate = formatDate(eventDate, eventDay);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-6 px-4 pointer-events-auto">
      {/* ── CONSTELLATION CHART BACKDROP GLOW & RINGS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Soft Cosmic Nebula Glow */}
        <div className="absolute w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-[#C8B6FF]/10 via-[#F3D082]/5 to-transparent blur-3xl" />
        {/* Delicate Astrolabe Concentric Rings */}
        <div className="w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border border-[#C8B6FF]/10" />
        <div className="absolute w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] rounded-full border border-dashed border-[#F3D082]/10" />
      </div>

      {/* ── TOP HEADER: Stargate Moon Seal & Star Divider ── */}
      <div
        className={`pt-2 sm:pt-4 flex flex-col items-center transition-all duration-1000 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <CelestialMoonSeal
          initials={initials}
          className="w-20 h-20 sm:w-24 sm:h-24 mb-1"
        />

        <span className="text-[10px] sm:text-xs uppercase tracking-[0.32em] font-serif font-medium text-[#C8B6FF] block drop-shadow-[0_0_8px_rgba(200,182,255,0.4)] mt-1">
          The Wedding Of
        </span>

        <CelestialStarDivider className="w-40 sm:w-52 my-1" />
      </div>

      {/* ── CENTER: Cosmic Glowing Couple Names ── */}
      <div
        className={`my-auto py-2 z-10 flex flex-col items-center text-center w-full max-w-[340px] sm:max-w-md transition-all duration-1000 delay-200 ${
          isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h1 className="flex flex-col items-center text-center">
          {/* Groom Name */}
          <span className="font-script text-5xl sm:text-6xl text-[#F8F9FA] tracking-wide leading-tight drop-shadow-[0_0_18px_rgba(200,182,255,0.55)] py-1">
            {groomName}
          </span>

          {/* Starlight Ampersand */}
          <span className="font-serif font-light text-2xl sm:text-3xl text-[#F3D082] my-0.5 inline-block drop-shadow-[0_0_10px_rgba(243,208,130,0.5)]">
            &amp;
          </span>

          {/* Bride Name */}
          <span className="font-script text-5xl sm:text-6xl text-[#F8F9FA] tracking-wide leading-tight drop-shadow-[0_0_18px_rgba(200,182,255,0.55)] py-1">
            {brideName}
          </span>
        </h1>

        {/* Moon Phase Date Pill Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F1527]/80 backdrop-blur-md border border-[#C8B6FF]/25 shadow-[0_0_16px_rgba(200,182,255,0.15)]">
          <Moon className="w-3.5 h-3.5 text-[#F3D082] fill-[#F3D082]/20" />
          <p className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase text-[#E2D9FC] font-medium">
            {fullDate}
          </p>
        </div>
      </div>

      {/* ── BOTTOM: Glassmorphism Countdown Bento & Scroll Prompt ── */}
      <div
        className={`w-full pb-3 sm:pb-5 flex flex-col items-center transition-all duration-1000 delay-500 z-10 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* 4 Glassmorphism Countdown Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4 w-full max-w-[290px]">
          {[
            { val: timeLeft.days, label: "Hari" },
            { val: timeLeft.hours, label: "Jam" },
            { val: timeLeft.minutes, label: "Menit" },
            { val: timeLeft.seconds, label: "Detik" },
          ].map((unit, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-2xl bg-[#0F1527]/75 backdrop-blur-md border border-[#C8B6FF]/25 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            >
              <span className="font-serif text-base sm:text-lg font-bold text-[#F3D082] drop-shadow-[0_0_8px_rgba(243,208,130,0.5)] leading-none">
                {String(unit.val).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#8E9AAF] mt-1 font-sans">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Prompt Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="inline-flex flex-col items-center transition-colors group cursor-pointer"
        >
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#8E9AAF] group-hover:text-[#C8B6FF] transition-colors mb-1 font-serif">
            Gulir ke Bawah
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#F3D082] drop-shadow-[0_0_8px_rgba(243,208,130,0.6)] group-hover:text-[#FFF]" />
        </button>
      </div>
    </div>
  );
}
