"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { MinangSongketLace } from "./MinangSongketLace";
import { MinangNameBorder } from "./MinangNameBorder";
import { MinangPucukRebungDivider } from "./MinangPucukRebungDivider";

interface MinangHeroContentProps {
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
}

/**
 * MinangHeroContent
 * Layout Stage 2 Khusus Tema Minang (Rumah Gadang & Baralek Gadang).
 * Mengadopsi struktur mewah ala Folk Invitation (Aceh/Minang Black):
 * - Top Header: Songket lace border filigree emas halus
 * - Frame Nama Pengantin: Refined quiet luxury frame dengan kaligrafi mengalir (font-script)
 *   dan aksen emas murni (gold foil gradient)
 * - Pucuk Rebung Divider & Aksara Jawi sakral tanpa elemen sirkus / busur melingkar kaku
 * - Bottom Corridor: Countdown pill kaca arang-emas & prompt gulir elegan
 */
export function MinangHeroContent({
  data,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: MinangHeroContentProps) {
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const groomName =
    data.groom?.nickname ||
    data.groom?.name ||
    data.content?.groomName ||
    "Marapulai";
  const brideName =
    data.bride?.nickname ||
    data.bride?.name ||
    data.content?.brideName ||
    "Anak Daro";
  const weddingDate = data.events?.[0]?.date || data.content?.weddingDate;

  return (
    <div className="relative z-10 w-full h-full flex flex-col justify-between items-center px-4 py-4 sm:py-6 overflow-hidden">
      {/* ── TOP HEADER: Songket Lace Border & Dignified Serif Title ── */}
      <div
        className={`w-full flex flex-col items-center pt-0 transition-all duration-1000 delay-150 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        {/* Intricate Songket Lace Filigree Runner */}
        <div className="w-full -mt-4 sm:-mt-6 mb-3 max-w-lg mx-auto opacity-95">
          <MinangSongketLace height={48} />
        </div>

        {/* The Wedding Of Typography Flanked with Hairline Rules */}
        <div className="flex items-center gap-3">
          <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#D4A017]" />
          <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-serif font-medium text-[#F5D76E] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            The Wedding Of
          </h2>
          <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#D4A017]" />
        </div>

        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.38em] font-serif text-[#FFFDF7]/70 mt-1 drop-shadow">
          Baralek Gadang
        </p>
      </div>

      {/* ── CENTER CORRIDOR: Refined MinangNameBorder + Flowing Calligraphy Names ── */}
      <div className="my-auto py-2 flex flex-col items-center w-full">
        <MinangNameBorder isOpen={isOpen} isOpening={isOpening}>
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

            <span
              className="my-0.5 sm:my-1 text-2xl sm:text-3xl font-serif italic text-[#F5D76E] opacity-90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
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

          {/* Aksara Jawi Minang Otentik: بَرَلَيْقْ ݢَدَڠْ (Baralek Gadang) */}
          <div
            className="mt-2 text-sm sm:text-base font-serif tracking-[0.25em] text-[#F5D76E]/90 select-none drop-shadow-[0_2px_10px_rgba(212,160,23,0.4)]"
            aria-label="Tulisan Jawi Minang Baralek Gadang"
            dir="rtl"
          >
            بَرَلَيْقْ ݢَدَڠْ
          </div>
          <p className="text-[9px] uppercase tracking-[0.22em] text-[#FFFDF7]/70 font-serif mt-0.5 drop-shadow">
            Adat Basandi Syarak · Syarak Basandi Kitabullah
          </p>

          {/* Pembatas Geometris Sakral Pucuk Rebung */}
          <div className="w-full my-2.5 flex justify-center">
            <MinangPucukRebungDivider className="w-44 sm:w-52 h-auto opacity-90" />
          </div>

          {/* Tanggal Pernikahan */}
          <p
            className="text-xs sm:text-sm font-serif tracking-[0.22em] uppercase font-medium text-[#FFFDF7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            {weddingDate ? formatDate(weddingDate) : "Sabtu, 24 Oktober 2026"}
          </p>
        </MinangNameBorder>
      </div>

      {/* ── BOTTOM CORRIDOR: Quiet Luxury Glass Countdown Pill & Scroll Down Prompt ── */}
      <div
        className={`w-full pb-2 sm:pb-4 flex flex-col items-center transition-all duration-1000 delay-500 ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Quiet Luxury Countdown Pill (Bernuansa Arang Marawa, Emas Songket & Pendaran Kencana) */}
        <div className="backdrop-blur-md bg-[#0F0C09]/85 border border-[#D4A017]/45 rounded-full px-5 py-2 mb-3 sm:mb-4 shadow-[0_6px_28px_rgba(0,0,0,0.7),0_0_16px_rgba(212,160,23,0.15)] flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#F5D76E] shadow-[0_0_8px_#F5D76E] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.2em] uppercase text-[#FFFDF7] font-medium">
            {timeLeft.days > 0
              ? `${timeLeft.days} Hari Menuju Baralek Gadang`
              : `${timeLeft.hours} Jam · ${timeLeft.minutes} Menit · ${timeLeft.seconds} Detik Menuju Baralek Gadang`}
          </span>
        </div>

        {/* Scroll Prompt Button */}
        <button
          type="button"
          onClick={onScrollDown}
          className="inline-flex flex-col items-center transition-colors group cursor-pointer"
          style={{ color: "#D4A017" }}
        >
          <span
            className="text-[9px] uppercase tracking-[0.28em] group-hover:text-[#F5D76E] transition-colors mb-1 font-serif text-[#FFFDF7]/80 drop-shadow"
          >
            Gulir ke Bawah
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce text-[#D4A017] group-hover:text-[#F5D76E]" />
        </button>
      </div>
    </div>
  );
}

