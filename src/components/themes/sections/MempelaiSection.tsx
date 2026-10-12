"use client";

import React from "react";
import { ThemeConfig } from "@/types/theme";
import { InvitationData } from "@/types/invitation";
import { SectionOrnamentBackdrop } from "@/components/themes/ornaments/jawa/SectionOrnamentBackdrop";
import { ScrollReveal } from "@/components/themes/ScrollReveal";

interface MempelaiSectionProps {
  theme: ThemeConfig;
  data: InvitationData;
}

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function MempelaiSection({ theme, data }: MempelaiSectionProps) {
  const { Symbol, Divider } = theme.ornaments;
  const isChinoiserie = theme.id === "royal-chinoiserie-silk";
  const isCelestial = theme.id === "celestial-twilight";
  const isTerracotta = theme.id === "terracotta-earthy-meadow";
  const isEmeraldNoir = theme.id === "emerald-velvet-noir";
  const isSundaVintage = theme.id === "sunda-vintage";
  const isBrown = theme.id === "jawa-brown" || isSundaVintage;
  const isJawa = theme.id.startsWith("jawa") || theme.id === "black-gold" || theme.id === "emerald";

  const labelKedua = isSundaVintage
    ? "Panganten Sakulawarga"
    : isBrown
    ? "Penganten Kalih"
    : "Kedua Mempelai";
  const labelPutri = isSundaVintage
    ? "Panganten Istri"
    : isBrown
    ? "Mempelai Putri"
    : "Mempelai Wanita";
  const labelPria = isSundaVintage
    ? "Panganten Pameget"
    : isBrown
    ? "Mempelai Kakung"
    : "Mempelai Pria";

  return (
    <>
      {/* SALAM PEMBUKA & AYAT SUCI (Folk Arch Container) */}
      <section
        id="salam"
        className="pt-16 pb-12 px-5 sm:px-8 text-center relative overflow-hidden"
        style={{
          backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-base)",
          borderColor: "var(--theme-border)",
        }}
      >
        <SectionOrnamentBackdrop
          watermark="none"
          showCorners={isJawa && !isBrown}
          cornerOpacity="opacity-40"
        />

        {/* Arch / Dome Card Container */}
        <ScrollReveal
          direction="up"
          className={`relative z-10 max-w-sm mx-auto p-8 sm:p-10 shadow-sm border-t ${
            isChinoiserie
              ? "rounded-3xl glass-chinoiserie-bento text-[#FAF7F0]"
              : isCelestial
              ? "rounded-3xl glass-celestial-bento text-[#F8F9FA]"
              : isTerracotta
              ? "rounded-t-[80px] rounded-b-[24px] bg-[#FFFDFB] border border-[#E3D4C4] shadow-sm text-[#2D231E]"
              : isEmeraldNoir
              ? "rounded-3xl bg-[#0D2A20]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
              : isBrown
              ? "rounded-t-[180px] bg-[#FFF9F6]/85 backdrop-blur-md border-[#5C3410]/25 text-[#1A140E]"
              : "rounded-3xl bg-[var(--theme-bg-surface)] border-[var(--theme-border)] text-white"
          }`}
        >
          <Symbol className={`w-9 h-12 mx-auto mb-3 opacity-90 animate-float-slow ${isChinoiserie ? "text-[#D4AF37]" : isCelestial ? "text-[#C8B6FF]" : isTerracotta ? "text-[#BF573F]" : "text-[#8B4E17]"}`} />
          
          <h2
            className="font-serif text-2xl sm:text-3xl font-medium tracking-wide mb-2"
            style={{
              color: isChinoiserie ? "#D4AF37" : isCelestial ? "#F8F9FA" : isTerracotta ? "#BF573F" : isEmeraldNoir ? "#FFF8E1" : isBrown ? "#5C3410" : "var(--theme-accent)",
            }}
          >
            The Couple
          </h2>

          <span
            className="text-[10px] font-serif font-bold uppercase tracking-[0.25em] block mb-4"
            style={{
              color: isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isBrown ? "#8B4E17" : "var(--theme-primary)",
            }}
          >
            {data.quoteSource || "QS. Ar-Rum Ayat 21"}
          </span>

          {data.quoteArabic && (
            <p
              className="font-serif text-base sm:text-lg leading-loose dir-rtl mb-4"
              style={{ color: isCelestial ? "#F3D082" : isBrown ? "#5C3410" : "var(--theme-accent)" }}
            >
              {data.quoteArabic}
            </p>
          )}

          <p
            className="text-xs leading-relaxed italic max-w-xs mx-auto mb-5"
            style={{ color: isCelestial ? "#E2D9FC" : isBrown ? "#4A3B32" : "var(--theme-text-secondary)" }}
          >
            "{data.quoteTranslation}"
          </p>

          <div
            className="w-16 h-0.5 mx-auto mb-5"
            style={{ backgroundColor: isCelestial ? "#C8B6FF" : isBrown ? "#5C3410" : "var(--theme-primary)", opacity: 0.3 }}
          />

          <p
            className="text-xs leading-relaxed max-w-xs mx-auto"
            style={{ color: isCelestial ? "#8E9AAF" : isBrown ? "#7A6B62" : "var(--theme-text-muted)" }}
          >
            {data.openingMessage}
          </p>
        </ScrollReveal>
      </section>

      {/* PROFIL KEDUA MEMPELAI */}
      <section
        id="mempelai"
        className="py-14 px-5 sm:px-8 relative overflow-hidden"
        style={{
          backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-surface)",
          borderColor: "var(--theme-border)",
        }}
      >
        <SectionOrnamentBackdrop
          watermark={isJawa ? "gunungan" : "none"}
          showCorners={isJawa && !isBrown}
          cornerPosition="all"
          cornerOpacity="opacity-45"
          watermarkOpacity="opacity-[0.07]"
        />

        {/* Top Header with Monogram */}
        <ScrollReveal direction="up" className="relative z-10 text-center mb-10">
          <div
            className="font-serif text-4xl sm:text-5xl tracking-widest font-light mb-2"
            style={{
              color: isTerracotta ? "#BF573F" : isBrown ? "#5C3410" : "var(--theme-primary)",
            }}
          >
            {data.bride.nickname?.[0] || "C"} &amp; {data.groom.nickname?.[0] || "R"}
          </div>
          <span
            className="text-[11px] font-serif font-bold uppercase tracking-[0.25em]"
            style={{
              color: isTerracotta ? "#8F3B25" : isBrown ? "#8B4E17" : "var(--theme-primary)",
            }}
          >
            {labelKedua}
          </span>
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold mt-1"
            style={{
              color: isTerracotta ? "#2D231E" : isBrown ? "#1A140E" : "white",
            }}
          >
            Kedua Mempelai
          </h2>
        </ScrollReveal>

        <div className="relative z-10 space-y-12">
          {/* MEMPELAI WANITA */}
          <ScrollReveal direction="up" delay={100} className="relative flex flex-col items-center text-center">
            {/* Arch / Oval Photo Frame */}
            <div
              className={`relative w-48 sm:w-52 h-64 sm:h-72 p-1.5 mb-4 group z-10 transition-transform duration-500 hover:scale-105 shadow-xl ${
                isChinoiserie
                  ? "rounded-full border-2 border-[#D4AF37] bg-[#5C131A] shadow-[0_8px_32px_rgba(59,8,12,0.8)] ring-4 ring-[#D4AF37]/30"
                  : isCelestial
                  ? "rounded-full border-2 border-[#C8B6FF] bg-[#0F1527] shadow-[0_0_32px_rgba(200,182,255,0.45)] ring-4 ring-[#C8B6FF]/25"
                  : isTerracotta
                  ? "rounded-t-[100px] rounded-b-[32px] border-[2.5px] border-[#BF573F] bg-[#FAF4EE] ring-4 ring-[#BF573F]/20 shadow-md"
                  : isEmeraldNoir
                  ? "rounded-full border-2 border-[#D4AF37] bg-[#0D2A20] shadow-[0_8px_32px_rgba(0,0,0,0.6)] ring-4 ring-[#D4AF37]/20"
                  : isBrown
                  ? "rounded-[110px] border-[3px] border-[#5C3410] bg-[#FFF9F6] ring-4 ring-[#8B4E17]/25"
                  : "rounded-full border-2 border-[var(--theme-primary)] bg-[var(--theme-bg-surface)]"
              }`}
            >
              {/* Radial Chinoiserie Silk Glow behind Photo */}
              {isChinoiserie && (
                <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35)_0%,rgba(92,19,26,0.85)_60%,transparent_85%)] blur-xl -z-10 pointer-events-none" />
              )}
              {/* Radial Stardust Glow behind Photo */}
              {isCelestial && (
                <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(200,182,255,0.35)_0%,rgba(15,21,39,0.9)_60%,transparent_85%)] blur-xl -z-10 pointer-events-none" />
              )}
              {/* Radial Velvet Glow behind Photo */}
              {isEmeraldNoir && (
                <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.3)_0%,rgba(13,42,32,0.85)_60%,transparent_85%)] blur-xl -z-10 pointer-events-none" />
              )}
              <div
                className={`w-full h-full overflow-hidden ${
                  isTerracotta
                    ? "rounded-t-[94px] rounded-b-[26px]"
                    : isBrown
                    ? "rounded-[100px]"
                    : "rounded-full"
                }`}
              >
                <img
                  src={data.bride.photo}
                  alt={data.bride.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <span
              className="text-[10px] tracking-[0.25em] uppercase font-serif font-bold z-10"
              style={{
                color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#8B4E17" : "var(--theme-primary)",
              }}
            >
              {labelPutri}
            </span>

            {/* Script Calligraphy Nickname */}
            <h3
              className="font-script text-5xl sm:text-6xl my-1 z-10"
              style={{
                color: isChinoiserie ? "#E6C65C" : isCelestial ? "#F3D082" : isTerracotta ? "#BF573F" : isEmeraldNoir ? "#F3E5AB" : isBrown ? "#5C3410" : "var(--theme-accent)",
              }}
            >
              {data.bride.nickname}
            </h3>

            {/* Full Name */}
            <h4
              className="font-serif text-xl sm:text-2xl font-bold mb-2 z-10"
              style={{
                color: isChinoiserie ? "#FAF7F0" : isCelestial ? "#F8F9FA" : isTerracotta ? "#2D231E" : isEmeraldNoir ? "#FFFDF0" : isBrown ? "#1A140E" : "white",
              }}
            >
              {data.bride.name}
            </h4>

            <p
              className="text-xs max-w-xs leading-relaxed mb-4 z-10"
              style={{
                color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
              }}
            >
              {data.bride.parents}
            </p>

            {data.bride.instagram && (
              <a
                href={`https://instagram.com/${data.bride.instagram}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-medium transition-all z-10 shadow-md ${
                  isChinoiserie
                    ? "bg-[#5C131A] hover:bg-[#781B24] text-[#D4AF37] border border-[#D4AF37]/50 shadow-lg hover:border-[#D4AF37]"
                    : isTerracotta
                    ? "bg-[#BF573F] hover:bg-[#A94A34] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/40 shadow-sm"
                    : isEmeraldNoir
                    ? "bg-[#0D2A20] hover:bg-[#133C2E] text-[#F3E5AB] border border-[#D4AF37]/40 shadow-lg hover:border-[#D4AF37]"
                    : isBrown
                    ? "bg-[#5C3410] hover:bg-[#4A2808] text-[#FFF9F6] border border-[#8B4E17]/30"
                    : "border hover:brightness-125"
                }`}
                style={
                  !isBrown && !isEmeraldNoir && !isTerracotta && !isChinoiserie
                    ? {
                        backgroundColor: "var(--theme-bg-surface)",
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-text-secondary)",
                      }
                    : undefined
                }
              >
                <InstagramIcon className={`w-3.5 h-3.5 ${isTerracotta ? "text-[#FFFDFB]" : "text-[#C4823F]"}`} />
                <span>@{data.bride.instagram}</span>
              </a>
            )}
          </ScrollReveal>

          {/* Simbol & Pengikat dengan Ornamen Divider */}
          <ScrollReveal direction="zoom" delay={200} className="flex flex-col items-center justify-center gap-1">
            <Divider className="w-48 mx-auto -my-1 opacity-90" />
            <div className="flex items-center justify-center gap-3 my-2">
              <div
                className="w-12 h-px"
                style={{
                  backgroundColor: isTerracotta ? "#BF573F" : isBrown ? "#5C3410" : "var(--theme-primary)",
                  opacity: 0.3,
                }}
              />
              <div
                className="font-serif text-4xl sm:text-5xl font-light select-none"
                style={{
                  color: isTerracotta ? "#8F3B25" : isBrown ? "#1A140E" : "var(--theme-accent)",
                }}
              >
                &amp;
              </div>
              <div
                className="w-12 h-px"
                style={{
                  backgroundColor: isTerracotta ? "#BF573F" : isBrown ? "#5C3410" : "var(--theme-primary)",
                  opacity: 0.3,
                }}
              />
            </div>
          </ScrollReveal>

          {/* MEMPELAI PRIA */}
          <ScrollReveal direction="up" delay={250} className="relative flex flex-col items-center text-center">
            {/* Arch / Oval Photo Frame */}
            <div
              className={`relative w-48 sm:w-52 h-64 sm:h-72 p-1.5 mb-4 group z-10 transition-transform duration-500 hover:scale-105 shadow-xl ${
                isChinoiserie
                  ? "rounded-full border-2 border-[#D4AF37] bg-[#5C131A] shadow-[0_8px_32px_rgba(59,8,12,0.8)] ring-4 ring-[#D4AF37]/30"
                  : isCelestial
                  ? "rounded-full border-2 border-[#C8B6FF] bg-[#0F1527] shadow-[0_0_32px_rgba(200,182,255,0.45)] ring-4 ring-[#C8B6FF]/25"
                  : isTerracotta
                  ? "rounded-t-[100px] rounded-b-[32px] border-[2.5px] border-[#BF573F] bg-[#FAF4EE] ring-4 ring-[#BF573F]/20 shadow-md"
                  : isEmeraldNoir
                  ? "rounded-full border-2 border-[#D4AF37] bg-[#0D2A20] shadow-[0_8px_32px_rgba(0,0,0,0.6)] ring-4 ring-[#D4AF37]/20"
                  : isBrown
                  ? "rounded-[110px] border-[3px] border-[#5C3410] bg-[#FFF9F6] ring-4 ring-[#8B4E17]/25"
                  : "rounded-full border-2 border-[var(--theme-primary)] bg-[var(--theme-bg-surface)]"
              }`}
            >
              {/* Radial Chinoiserie Silk Glow behind Photo */}
              {isChinoiserie && (
                <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35)_0%,rgba(92,19,26,0.85)_60%,transparent_85%)] blur-xl -z-10 pointer-events-none" />
              )}
              {/* Radial Stardust Glow behind Photo */}
              {isCelestial && (
                <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(200,182,255,0.35)_0%,rgba(15,21,39,0.9)_60%,transparent_85%)] blur-xl -z-10 pointer-events-none" />
              )}
              {/* Radial Velvet Glow behind Photo */}
              {isEmeraldNoir && (
                <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.3)_0%,rgba(13,42,32,0.85)_60%,transparent_85%)] blur-xl -z-10 pointer-events-none" />
              )}
              <div
                className={`w-full h-full overflow-hidden ${
                  isTerracotta
                    ? "rounded-t-[94px] rounded-b-[26px]"
                    : isBrown
                    ? "rounded-[100px]"
                    : "rounded-full"
                }`}
              >
                <img
                  src={data.groom.photo}
                  alt={data.groom.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>

            <span
              className="text-[10px] tracking-[0.25em] uppercase font-serif font-bold z-10"
              style={{
                color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#8B4E17" : "var(--theme-primary)",
              }}
            >
              {labelPria}
            </span>

            {/* Script Calligraphy Nickname */}
            <h3
              className="font-script text-5xl sm:text-6xl my-1 z-10"
              style={{
                color: isChinoiserie ? "#E6C65C" : isCelestial ? "#F3D082" : isTerracotta ? "#BF573F" : isEmeraldNoir ? "#F3E5AB" : isBrown ? "#5C3410" : "var(--theme-accent)",
              }}
            >
              {data.groom.nickname}
            </h3>

            {/* Full Name */}
            <h4
              className="font-serif text-xl sm:text-2xl font-bold mb-2 z-10"
              style={{
                color: isChinoiserie ? "#FAF7F0" : isCelestial ? "#F8F9FA" : isTerracotta ? "#2D231E" : isEmeraldNoir ? "#FFFDF0" : isBrown ? "#1A140E" : "white",
              }}
            >
              {data.groom.name}
            </h4>

            <p
              className="text-xs max-w-xs leading-relaxed mb-4 z-10"
              style={{
                color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
              }}
            >
              {data.groom.parents}
            </p>

            {data.groom.instagram && (
              <a
                href={`https://instagram.com/${data.groom.instagram}`}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-medium transition-all z-10 shadow-md ${
                  isChinoiserie
                    ? "bg-[#5C131A] hover:bg-[#781B24] text-[#D4AF37] border border-[#D4AF37]/50 shadow-lg hover:border-[#D4AF37]"
                    : isCelestial
                    ? "bg-[#0F1527] hover:bg-[#1A223E] text-[#C8B6FF] border border-[#C8B6FF]/35 shadow-[0_0_16px_rgba(200,182,255,0.2)]"
                    : isTerracotta
                    ? "bg-[#BF573F] hover:bg-[#A94A34] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/40 shadow-sm"
                    : isEmeraldNoir
                    ? "bg-[#0D2A20] hover:bg-[#133C2E] text-[#F3E5AB] border border-[#D4AF37]/40 shadow-lg hover:border-[#D4AF37]"
                    : isBrown
                    ? "bg-[#5C3410] hover:bg-[#4A2808] text-[#FFF9F6] border border-[#8B4E17]/30"
                    : "border hover:brightness-125"
                }`}
                style={
                  !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                    ? {
                        backgroundColor: "var(--theme-bg-surface)",
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-text-secondary)",
                      }
                    : undefined
                }
              >
                <InstagramIcon className={`w-3.5 h-3.5 ${isChinoiserie ? "text-[#D4AF37]" : isCelestial ? "text-[#F3D082]" : isTerracotta ? "text-[#FFFDFB]" : "text-[#C4823F]"}`} />
                <span>@{data.groom.instagram}</span>
              </a>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

