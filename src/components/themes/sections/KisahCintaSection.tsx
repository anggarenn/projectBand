"use client";

import React from "react";
import { ThemeConfig } from "@/types/theme";
import { LoveStoryItem, InvitationData } from "@/types/invitation";
import { SectionOrnamentBackdrop } from "@/components/themes/ornaments/jawa/SectionOrnamentBackdrop";
import { ScrollReveal } from "@/components/themes/ScrollReveal";

interface KisahCintaSectionProps {
  theme: ThemeConfig;
  data?: InvitationData;
  loveStories?: LoveStoryItem[];
}

export function KisahCintaSection({ theme, data, loveStories }: KisahCintaSectionProps) {
  const stories = loveStories || data?.loveStories;
  const isChinoiserie = theme.id === "royal-chinoiserie-silk";
  const isCelestial = theme.id === "celestial-twilight";
  const isTerracotta = theme.id === "terracotta-earthy-meadow";
  const isEmeraldNoir = theme.id === "emerald-velvet-noir";
  const isSundaVintage = theme.id === "sunda-vintage";
  const isBrown = theme.id === "jawa-brown" || isSundaVintage;
  if (!stories || stories.length === 0) return null;

  const subtitleCerita = isChinoiserie
    ? "Untaian Kasih & Takdir"
    : isSundaVintage
    ? "Lalampahan Asih"
    : isBrown
    ? "Lelampahan Katresnan"
    : isCelestial
    ? "Garis Bintang"
    : "Kisah Kasih";

  return (
    <section
      id="cerita"
      className="py-10 px-5 sm:px-8 relative overflow-hidden"
      style={{
        backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-surface)",
        borderColor: "var(--theme-border)",
      }}
    >
      <ScrollReveal direction="up" className="relative z-10 max-w-sm mx-auto">
        <div
          className={`p-7 sm:p-8 shadow-2xl relative overflow-hidden ${
            isChinoiserie
              ? "glass-chinoiserie-bento rounded-3xl text-[#FAF7F0] shadow-[0_8px_32px_rgba(59,8,12,0.85)] border border-[#D4AF37]/35"
              : isCelestial
              ? "glass-celestial-bento rounded-3xl text-[#F8F9FA] shadow-[0_8px_32px_rgba(8,11,20,0.85)] border border-[#C8B6FF]/30"
              : isTerracotta
              ? "rounded-t-[60px] rounded-b-[24px] bg-[#FFFDFB] border border-[#E3D4C4] shadow-sm text-[#2D231E]"
              : isEmeraldNoir
              ? "rounded-3xl bg-[#0D2A20]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
              : isBrown
              ? "rounded-[28px] bg-[#4A2808] text-white border-2 border-[#C4823F]/30"
              : "border rounded-3xl bg-[var(--theme-bg-surface)] text-white"
          }`}
          style={!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie ? { borderColor: "var(--theme-border)" } : undefined}
        >
          <div className="text-center mb-8">
            <span
              className="text-[11px] font-serif font-bold uppercase tracking-[0.25em] block"
              style={{
                color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#D4A373" : "var(--theme-primary)",
              }}
            >
              {subtitleCerita}
            </span>
            <h2
              className={`mt-1 ${
                isChinoiserie
                  ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F0] via-[#FDE047] to-[#D4AF37]"
                  : isCelestial
                  ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8F9FA] via-[#C8B6FF] to-[#F3D082]"
                  : isTerracotta
                  ? "font-serif text-2xl sm:text-3xl font-bold text-[#BF573F]"
                  : isEmeraldNoir
                  ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37]"
                  : isBrown
                  ? "font-script text-4xl sm:text-5xl text-[#FFF9F6]"
                  : "font-serif-display text-2xl sm:text-3xl font-bold text-white"
              }`}
            >
              Love Story
            </h2>
          </div>

          <div
            className="border-l border-dashed ml-3 space-y-8 pl-5 relative"
            style={{
              borderColor: isChinoiserie
                ? "rgba(212, 175, 55, 0.35)"
                : isCelestial
                ? "rgba(200, 182, 255, 0.35)"
                : isTerracotta
                ? "#E3D4C4"
                : isEmeraldNoir
                ? "rgba(212, 175, 55, 0.35)"
                : isBrown
                ? "rgba(212, 163, 115, 0.35)"
                : "var(--theme-border)",
            }}
          >
            {stories.map((story, idx) => (
              <div key={story.id} className="relative group">
                <div
                  className="absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-2 shadow-sm transition-transform duration-300 group-hover:scale-125"
                  style={{
                    backgroundColor: isChinoiserie ? "#D4AF37" : isCelestial ? "#F3D082" : isTerracotta ? "#BF573F" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#EDE5DB" : "var(--theme-primary)",
                    borderColor: isChinoiserie ? "#3B080C" : isCelestial ? "#080B14" : isTerracotta ? "#FAF4EE" : isEmeraldNoir ? "#061A14" : isBrown ? "#4A2E14" : "var(--theme-bg-surface)",
                  }}
                />
                <span
                  className="text-[10px] font-serif font-semibold uppercase tracking-wider block mb-1"
                  style={{
                    color: isChinoiserie ? "#E6C65C" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#EAD7C5" : "var(--theme-primary)",
                  }}
                >
                  {story.period}
                </span>
                <h3
                  className={`font-serif text-base sm:text-lg font-bold mb-1 ${
                    isChinoiserie ? "text-[#FAF7F0]" : isCelestial ? "text-[#F8F9FA]" : isTerracotta ? "text-[#2D231E]" : "text-white"
                  }`}
                >
                  {story.title}
                </h3>
                {story.photo && (
                  <div
                    className="w-full h-44 rounded-2xl overflow-hidden my-3 border shadow-lg"
                    style={{
                      borderColor: isChinoiserie
                        ? "rgba(212, 175, 55, 0.3)"
                        : isCelestial
                        ? "rgba(200, 182, 255, 0.3)"
                        : isTerracotta
                        ? "#E3D4C4"
                        : isEmeraldNoir
                        ? "rgba(212, 175, 55, 0.3)"
                        : isBrown
                        ? "#EAD7C5/30"
                        : "var(--theme-border)",
                    }}
                  >
                    <img
                      src={story.photo}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#EAD7C5/90" : "var(--theme-text-muted)",
                  }}
                >
                  {story.story}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
