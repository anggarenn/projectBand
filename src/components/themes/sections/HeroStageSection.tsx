"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { ThemeConfig } from "@/types/theme";
import { InvitationData } from "@/types/invitation";
import { MotionVideoBackdrop } from "@/components/themes/ornaments/jawa/MotionVideoBackdrop";

interface HeroStageSectionProps {
  theme: ThemeConfig;
  data: InvitationData;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
  formatDate: (dateStr?: string, dayName?: string) => string;
  onScrollDown: () => void;
  isOpen?: boolean;
  isOpening?: boolean;
}

export function HeroStageSection({
  theme,
  data,
  timeLeft,
  formatDate,
  onScrollDown,
  isOpen,
  isOpening,
}: HeroStageSectionProps) {
  const { Corner, Divider, Symbol, MonogramSeal, CanvasEffect, StageBackdrop, NameBorder, HeroContent } = theme.ornaments;

  const videoUrl = data.motionVideoUrl || theme.backgrounds.videoUrl;
  const isTerracotta = theme.id === "terracotta-earthy-meadow";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center text-center p-6 sm:p-8 overflow-hidden"
      style={{ backgroundColor: "var(--theme-bg-base)" }}
    >
      {/* MOTION ART BACKDROP (Custom theme backdrop atau video fallback) */}
      {isTerracotta ? null : StageBackdrop ? (
        <StageBackdrop
          stageFallback={theme.backgrounds.stage}
          isOpen={isOpen}
          isOpening={isOpening}
          videoUrl={videoUrl}
          variant={theme.variant}
        />
      ) : (
        <MotionVideoBackdrop
          src={videoUrl}
          stageFallback={theme.backgrounds.stage}
          filterClass={theme.colors.filterClass}
          overlayGradient={theme.colors.overlayGradient}
        />
      )}

      {/* MOTION ART PARTICLES EFFECT */}
      {CanvasEffect && <CanvasEffect />}

      {/* TRADITIONAL CORNER FLOURISHES */}
      <Corner className="absolute top-2 left-2 w-16 h-16 z-10" />
      <Corner className="absolute top-2 right-2 w-16 h-16 -scale-x-100 z-10" />

      {/* CUSTOM THEME HERO CONTENT (Sunda Parahyangan / Distinctive layouts) */}
      {HeroContent ? (
        <HeroContent
          data={data}
          timeLeft={timeLeft}
          formatDate={formatDate}
          isOpen={isOpen}
          isOpening={isOpening}
          onScrollDown={onScrollDown}
          theme={theme}
        />
      ) : (
        <>
          {/* Top Badge: Gunungan & Subtitle */}
          <div className="pt-6 z-10 animate-fade-in">
            <Symbol className="w-12 h-16 mx-auto mb-2 opacity-95 animate-blencong" />
            <span
              className="text-xs uppercase tracking-[0.3em] font-semibold block"
              style={{ color: "var(--theme-accent)" }}
            >
              The Wedding Of
            </span>
          </div>

          {/* Center Graphic: Monogram Seal + Nama Pengantin + Divider */}
          {(() => {
            const content = (
              <>
                <MonogramSeal
                  initials={`${data.groom.nickname?.[0] || "F"} & ${data.bride.nickname?.[0] || "S"}`}
                  className="mb-4 transform hover:scale-105 transition-transform"
                />
                <h1 className="font-script text-5xl sm:text-6xl text-white tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] py-1">
                  {data.groom.nickname} &amp; {data.bride.nickname}
                </h1>
                <Divider className="w-48 sm:w-56 my-2 opacity-95" />
                <p
                  className="text-xs sm:text-sm font-serif tracking-widest uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  style={{ color: "var(--theme-accent)" }}
                >
                  {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
                </p>
              </>
            );
            return NameBorder ? (
              <div className="my-auto z-10 flex flex-col items-center">
                <NameBorder isOpen={isOpen} isOpening={isOpening}>{content}</NameBorder>
              </div>
            ) : (
              <div className="my-auto py-6 z-10 flex flex-col items-center">{content}</div>
            );
          })()}

          {/* Countdown Timer & Scroll Prompt */}
          <div className="w-full z-10 pb-6 flex flex-col items-center">
            <div className="grid grid-cols-4 gap-2 max-w-xs w-full mb-5">
              {[
                { val: timeLeft.days, unit: "Hari" },
                { val: timeLeft.hours, unit: "Jam" },
                { val: timeLeft.minutes, unit: "Menit" },
                { val: timeLeft.seconds, unit: "Detik" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="backdrop-blur-md border rounded-xl p-2 shadow-lg text-center"
                  style={{
                    backgroundColor: "var(--theme-bg-card)",
                    borderColor: "var(--theme-border)",
                  }}
                >
                  <span
                    className="text-base sm:text-lg font-bold font-serif-display block"
                    style={{ color: "var(--theme-accent)" }}
                  >
                    {item.val}
                  </span>
                  <span
                    className="text-[8px] uppercase tracking-wider block"
                    style={{ color: "var(--theme-text-muted)" }}
                  >
                    {item.unit}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onScrollDown}
              className="inline-flex flex-col items-center transition-colors group cursor-pointer"
              style={{ color: "var(--theme-primary)" }}
            >
              <span
                className="text-[9px] uppercase tracking-[0.25em] group-hover:text-white transition-colors mb-1"
                style={{ color: "var(--theme-text-secondary)" }}
              >
                Gulir ke Bawah
              </span>
              <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "var(--theme-primary)" }} />
            </button>
          </div>
        </>
      )}
    </section>
  );
}
