"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { AcehPintoLace } from "./AcehPintoLace";
import { AcehNameBorder } from "./AcehNameBorder";

interface AcehHeroContentProps {
  data: any;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  formatDate: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown: () => void;
  theme?: any;
}

/**
 * AcehHeroContent
 * Layout Stage 2 Hero Khusus Tema Aceh (Rumoh Aceh Krong Bade & Serambi Mekkah).
 * Menerapkan standar Sacred Heritage Noir (Quiet Luxury):
 * - Top Header: Ornamen renda atap pelmet emas Pinto Aceh & Bungong Jeumpa.
 * - Title: "Walimatul 'Ursy" diapit hairline emas kencana & subtitle kehormatan "Baro & Dara Baro".
 * - Center Bento: Frame nama pengantin dark glass bento bergaris emas 1px (AcehNameBorder).
 * - Typography: Font script mengalir bergradasi emas murni (gold foil sheen).
 * - Sacred Blessing: Doa sakral Arab 'Barakallahu Lakuma' beraksen emas bercahaya.
 * - Bottom Corridor: Countdown capsule pill kaca arang obsidian & scroll button bernuansa kencana.
 */
export function AcehHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: AcehHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const groomName =
    data.groom?.nickname ||
    data.groom?.name ||
    data.content?.groomName ||
    "Linto Baro";
  const brideName =
    data.bride?.nickname ||
    data.bride?.name ||
    data.content?.brideName ||
    "Dara Baro";
  const weddingDate = data.events?.[0]?.date || data.content?.weddingDate;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-4 py-4 sm:py-6 overflow-hidden">
      {/* ── TOP HEADER: PINTO LACE BORDER & SACRED TITLE ── */}
      <div
        className={`w-full flex flex-col items-center pt-0 transition-all duration-1000 delay-150 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {/* Intricate Aceh Pinto Lace Pelmet Runner */}
        <div className="w-full -mt-4 sm:-mt-6 mb-3 max-w-lg mx-auto opacity-95">
          <AcehPintoLace height={48} />
        </div>

        {/* Walimatul 'Ursy Typography Flanked with Golden Hairline Rules */}
        <div className="flex items-center gap-3">
          <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.36em] font-serif font-medium text-[#F5D76E] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Walimatul &apos;Ursy
          </h2>
          <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
        </div>

        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.38em] font-serif text-[#FFFDF7]/70 mt-1 drop-shadow">
          Baro &amp; Dara Baro
        </p>
      </div>

      {/* ── CENTER CORRIDOR: BENTO GLASS FRAME & BRIDE/GROOM CALLIGRAPHY ── */}
      <div className="my-auto py-2 flex flex-col items-center w-full">
        <AcehNameBorder isOpen={isOpen} isOpening={isOpening}>
          {/* Nama Mempelai Kaligrafi Mengalir Warna Foil Emas Kencana */}
          <div className="flex flex-col items-center w-full">
            <h1
              className="font-script text-5xl sm:text-6xl md:text-7xl leading-[1.15] py-0.5 select-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
              style={{
                background: "linear-gradient(180deg, #FFFDF7 0%, #F5D76E 40%, #D4A017 80%, #A87510 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {groomName}
            </h1>

            <span className="my-0.5 sm:my-1 text-2xl sm:text-3xl font-serif italic text-[#F5D76E] opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              &amp;
            </span>

            <h1
              className="font-script text-5xl sm:text-6xl md:text-7xl leading-[1.15] py-0.5 select-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
              style={{
                background: "linear-gradient(180deg, #FFFDF7 0%, #F5D76E 40%, #D4A017 80%, #A87510 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {brideName}
            </h1>
          </div>

          {/* Ornamen Pemisah Pinto Arch & Hairline Flank */}
          <div className="w-full my-2.5 flex items-center justify-center gap-2">
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]/80" />
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" className="opacity-90">
              <path
                d="M 2 16 C 2 8, 8 3, 11 1 C 14 3, 20 8, 20 16"
                stroke="#D4A017"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="11" cy="9" r="2" fill="#F5D76E" />
              <circle cx="11" cy="9" r="0.9" fill="#FFFDF7" />
            </svg>
            <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]/80" />
          </div>

          {/* Kaligrafi Sakral Doa Pernikahan Arab */}
          <div
            className="text-sm sm:text-base md:text-lg font-serif text-[#F5D76E] tracking-wider leading-relaxed select-none drop-shadow-[0_2px_12px_rgba(212,160,23,0.35)] px-2"
            dir="rtl"
            lang="ar"
            aria-label="Doa Barakallahu Lakuma"
          >
            بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </div>

          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-serif text-[#FFFDF7]/70 mt-1 max-w-[280px] text-center drop-shadow">
            Adat Meukuta Alam · Syariat Serambi Mekkah
          </p>

          {/* Tanggal Pernikahan */}
          <div className="mt-3 pt-2 border-t border-[#D4A017]/25 w-full max-w-[220px]">
            <p className="text-xs sm:text-sm font-serif tracking-[0.22em] uppercase font-medium text-[#FFFDF7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {weddingDate ? formatDate(weddingDate) : "Sabtu, 24 Oktober 2026"}
            </p>
          </div>
        </AcehNameBorder>
      </div>

      {/* ── BOTTOM CORRIDOR: COUNTDOWN CAPSULE PILL & SCROLL PROMPT ── */}
      <div
        className={`w-full pb-2 sm:pb-4 flex flex-col items-center transition-all duration-1000 delay-500 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Quiet Luxury Countdown Pill (Obsidian Glass & Emas Kasab) */}
        <div className="backdrop-blur-md bg-[#0D0B08]/85 border border-[#D4A017]/45 rounded-full px-5 py-2 mb-3 sm:mb-4 shadow-[0_6px_28px_rgba(0,0,0,0.7),0_0_16px_rgba(212,160,23,0.15)] flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#F5D76E] shadow-[0_0_8px_#F5D76E] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#FFFDF7] font-medium">
            {timeLeft.days > 0
              ? `${timeLeft.days} Hari Menuju Walimatul 'Ursy`
              : `${timeLeft.hours} Jam · ${timeLeft.minutes} Menit · ${timeLeft.seconds} Detik Menuju Walimatul 'Ursy`}
          </span>
        </div>

        {/* Scroll Prompt Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="inline-flex flex-col items-center transition-colors group cursor-pointer"
          style={{ color: "#D4A017" }}
          aria-label="Gulir ke Bawah"
        >
          <span className="text-[9px] uppercase tracking-[0.28em] group-hover:text-[#F5D76E] transition-colors mb-1 font-serif text-[#FFFDF7]/80 drop-shadow">
            Gulir ke Bawah
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#D4A017] group-hover:text-[#F5D76E]" />
        </button>
      </div>
    </div>
  );
}
