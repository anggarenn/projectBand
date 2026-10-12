"use client";

import React from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { ChinoiserieMoonGate } from "./ChinoiserieMoonGate";
import { ChinoiserieShuangXiSeal } from "./ChinoiserieShuangXiSeal";
import { ChinoiserieLatticeDivider } from "./ChinoiserieLatticeDivider";

interface ChinoiserieHeroContentProps {
  data: any;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
  theme?: any;
}

/**
 * ChinoiserieHeroContent
 * Tata letak panggung Stage 2 untuk tema Oriental Chinoiserie & Sangjit (Quiet Luxury Imperial).
 * Fitur:
 * - Backing Gerbang Bulan (Moon Gate) dengan pendaran lentera hangat
 * - Segel Medali Emas Double Happiness (囍)
 * - Tipografi nama pasangan kaligrafi elegan & aksen hanzi "百年好合 · 永结同心"
 * - Kapsul tanggal Giok Imperial (Imperial Jade & Gold Tablet)
 * - 4 Kartu countdown kapsul giok emas berfiligri
 * - Tombol gulir ke bawah dengan indikator oriental
 */
export function ChinoiserieHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: ChinoiserieHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const groomName = data.groom?.nickname || data.groom?.name || "Groom";
  const brideName = data.bride?.nickname || data.bride?.name || "Bride";
  const eventDate = data.events?.[0]?.date;
  const eventDay = data.events?.[0]?.dayName;
  const fullDate = formatDate(eventDate, eventDay);

  // Hanzi nama pengantin jika tersedia di data kustom, atau idiom keberuntungan pernikahan
  const chineseSubtitle = data.ceremonyTitle || "百年好合 · 永结同心";

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between items-center py-6 px-4 pointer-events-auto">
      {/* ── BACKDROP MOON GATE ATMOSPHERE ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-40 sm:opacity-50">
        <ChinoiserieMoonGate className="w-[340px] sm:w-[480px] h-[340px] sm:h-[480px]" glow={true} />
      </div>

      {/* ── TOP HEADER: Shuang Xi Seal & Imperial Header ── */}
      <div
        className={`pt-2 sm:pt-4 flex flex-col items-center transition-all duration-1000 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <ChinoiserieShuangXiSeal className="w-20 h-20 sm:w-24 sm:h-24 mb-2" />

        {/* Ceremony Eyebrow */}
        <div className="flex items-center gap-2 mt-1">
          <span className="w-6 h-[0.5px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-serif font-medium text-[#F5D77F] block drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
            Sangjit &amp; Wedding
          </span>
          <span className="w-6 h-[0.5px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Classical Hanzi Couplet / Idiom */}
        <p className="text-[11px] sm:text-xs font-serif tracking-[0.25em] text-[#E5C365]/90 mt-1">
          {chineseSubtitle}
        </p>

        <ChinoiserieLatticeDivider className="w-44 sm:w-56 my-1.5" />
      </div>

      {/* ── CENTER: Elegant Calligraphy Couple Names & Jade Date Badge ── */}
      <div
        className={`my-auto py-2 z-10 flex flex-col items-center text-center w-full max-w-[340px] sm:max-w-md transition-all duration-1000 delay-200 ${
          isRevealed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h1 className="flex flex-col items-center text-center">
          {/* Groom Name */}
          <span className="font-script text-5xl sm:text-6xl text-[#FFF8DB] tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(212,175,55,0.55)] py-1">
            {groomName}
          </span>

          {/* Oriental Gold Ampersand with Knot Aura */}
          <span className="font-serif font-light text-2xl sm:text-3xl text-[#F5D77F] my-0.5 inline-block drop-shadow-[0_0_12px_rgba(245,215,127,0.6)]">
            &amp;
          </span>

          {/* Bride Name */}
          <span className="font-script text-5xl sm:text-6xl text-[#FFF8DB] tracking-wide leading-tight drop-shadow-[0_0_20px_rgba(212,175,55,0.55)] py-1">
            {brideName}
          </span>
        </h1>

        {/* Imperial Jade & Gold Capsule Date Pill Badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D281E]/85 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)]">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D77F]" />
          <p className="font-serif text-xs sm:text-sm tracking-[0.18em] uppercase text-[#FFF8DB] font-medium">
            吉日良辰 · {fullDate}
          </p>
        </div>
      </div>

      {/* ── BOTTOM: Jade & Gold Countdown Bento & Scroll Prompt ── */}
      <div
        className={`w-full pb-3 sm:pb-5 flex flex-col items-center transition-all duration-1000 delay-500 z-10 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* 4 Carved Jade & Gold Filigree Countdown Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4 w-full max-w-[300px]">
          {[
            { val: timeLeft.days, label: "Hari", hanzi: "天" },
            { val: timeLeft.hours, label: "Jam", hanzi: "时" },
            { val: timeLeft.minutes, label: "Menit", hanzi: "分" },
            { val: timeLeft.seconds, label: "Detik", hanzi: "秒" },
          ].map((unit, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-[#0D281E]/80 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_4px_16px_rgba(0,0,0,0.5)] group hover:border-[#D4AF37]/60 transition-colors"
            >
              {/* Corner Gold Filigree Accents (Mini Dots) */}
              <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#D4AF37]/60" />
              <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#D4AF37]/60" />

              <span className="font-serif text-base sm:text-lg font-bold text-[#FFF8DB] drop-shadow-[0_0_8px_rgba(245,215,127,0.5)] leading-none">
                {String(unit.val).padStart(2, "0")}
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-[#E5C365]/80 mt-1 font-sans">
                {unit.label} <span className="opacity-60 text-[7px]">({unit.hanzi})</span>
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
          <span className="text-[9px] uppercase tracking-[0.28em] text-[#E5C365]/80 group-hover:text-[#FFF8DB] transition-colors mb-1 font-serif">
            Gulir ke Bawah
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#F5D77F] drop-shadow-[0_0_8px_rgba(245,215,127,0.7)] group-hover:text-[#FFFFFF]" />
        </button>
      </div>
    </div>
  );
}
