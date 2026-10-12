import React from "react";
import { InvitationData } from "@/types/invitation";
import { ThemeConfig } from "@/types/theme";
import { TerracottaDivider } from "./TerracottaDivider";
import { ChevronDown, Calendar, Clock } from "lucide-react";

interface TerracottaHeroContentProps {
  data: any;
  theme?: ThemeConfig;
  timeLeft?: { days: number; hours: number; minutes: number; seconds: number };
  formatDate?: (dateStr?: string, dayName?: string) => string;
  isOpen?: boolean;
  isOpening?: boolean;
  onScrollDown?: () => void;
}

/**
 * TerracottaHeroContent
 * Konten panggung utama bertema Terracotta Earthy Meadow (Boho Rustic).
 * Menampilkan gerbang Archway Terracotta, tipografi serif hangat, dan dried botanical accents.
 */
export function TerracottaHeroContent({
  data,
  theme,
  timeLeft,
  formatDate,
  isOpen,
  isOpening,
  onScrollDown,
}: TerracottaHeroContentProps) {
  const groomName = data.groom?.nickname || "Reno";
  const brideName = data.bride?.nickname || "Angga";
  const dateFormatted = formatDate
    ? formatDate(data.events?.[0]?.date, data.events?.[0]?.dayName)
    : "Sabtu, 7 Maret 2026";

  return (
    <div className="relative z-20 flex flex-col items-center text-center px-4 pt-10 pb-16 w-full max-w-md mx-auto">
      {/* 1. Boho Archway Frame Line */}
      <div className="relative w-full max-w-[340px] px-6 py-10 rounded-t-[100px] rounded-b-[36px] bg-[#FAF4EE]/70 backdrop-blur-md border border-[#E3D4C4] shadow-[0_12px_36px_rgba(191,87,63,0.08)] flex flex-col items-center">
        
        {/* Subtle Arch Double Stroke */}
        <div className="absolute inset-2 rounded-t-[92px] rounded-b-[28px] border border-[#BF573F]/25 pointer-events-none" />

        {/* Small Sun Dial at Arch Peak */}
        <div className="mb-4 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border border-[#BF573F]/40 flex items-center justify-center bg-[#FFFDFB]">
            <div className="w-3 h-3 rounded-full bg-[#BF573F]/80" />
          </div>
          <span className="text-[10px] uppercase font-serif tracking-[0.3em] text-[#8F3B25] font-semibold mt-3">
            The Wedding of
          </span>
        </div>

        {/* Couple Names */}
        <div className="my-3 space-y-1">
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2D231E] tracking-tight leading-tight">
            {groomName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="w-8 h-[1px] bg-[#BF573F]/40" />
            <span className="font-serif italic text-2xl text-[#BF573F]">&</span>
            <div className="w-8 h-[1px] bg-[#BF573F]/40" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#2D231E] tracking-tight leading-tight">
            {brideName}
          </h1>
        </div>

        {/* Terracotta Botanical Divider */}
        <TerracottaDivider className="w-36 h-5 my-2" />

        {/* Date Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BF573F]/10 border border-[#BF573F]/30 text-[#8F3B25] text-xs font-serif font-medium mt-2 shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-[#BF573F]" />
          <span>{dateFormatted}</span>
        </div>

        {/* Countdown Timer in Mini Clay Cards */}
        {timeLeft && (
          <div className="grid grid-cols-4 gap-2 mt-6 w-full max-w-[280px]">
            {[
              { val: timeLeft.days, label: "Hari" },
              { val: timeLeft.hours, label: "Jam" },
              { val: timeLeft.minutes, label: "Menit" },
              { val: timeLeft.seconds, label: "Detik" },
            ].map((unit, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl bg-[#FFFDFB] border border-[#E3D4C4] shadow-sm"
              >
                <span className="font-serif text-lg font-bold text-[#BF573F] leading-none">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-sans uppercase tracking-wider text-[#857468] mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll Down Indicator */}
      {onScrollDown && (
        <button
          onClick={onScrollDown}
          className="mt-8 flex flex-col items-center gap-1.5 text-[#857468] hover:text-[#BF573F] transition-colors cursor-pointer group"
          aria-label="Gulir ke Bawah"
        >
          <span className="text-[10px] uppercase font-serif tracking-[0.25em] font-medium">
            Scroll ke Bawah
          </span>
          <div className="w-8 h-8 rounded-full border border-[#E3D4C4] bg-[#FFFDFB] flex items-center justify-center shadow-sm group-hover:translate-y-1 transition-transform">
            <ChevronDown className="w-4 h-4 text-[#BF573F]" />
          </div>
        </button>
      )}
    </div>
  );
}
