"use client";

import React from "react";
import { Calendar, Clock, MapPin, ExternalLink, Shirt, Video } from "lucide-react";
import { ThemeConfig } from "@/types/theme";
import { InvitationData } from "@/types/invitation";
import { SectionOrnamentBackdrop } from "@/components/themes/ornaments/jawa/SectionOrnamentBackdrop";
import { TraditionalGoldCorner } from "@/components/themes/ornaments/jawa/TraditionalGoldCorner";
import { ScrollReveal } from "@/components/themes/ScrollReveal";

interface AcaraSectionProps {
  theme: ThemeConfig;
  data: InvitationData;
}

export function AcaraSection({ theme, data }: AcaraSectionProps) {
  const { Symbol } = theme.ornaments;
  const isChinoiserie = theme.id === "royal-chinoiserie-silk";
  const isCelestial = theme.id === "celestial-twilight";
  const isTerracotta = theme.id === "terracotta-earthy-meadow";
  const isEmeraldNoir = theme.id === "emerald-velvet-noir";
  const isSundaVintage = theme.id === "sunda-vintage";
  const isBrown = theme.id === "jawa-brown" || isSundaVintage;
  const isJawa = theme.id.startsWith("jawa") || theme.id === "black-gold" || theme.id === "emerald";

  const subtitleAcara = isSundaVintage
    ? "Wartos Bingah"
    : isBrown
    ? "Pawartos Wigatos"
    : "Rangkaian Acara";

  return (
    <>
      {/* RANGKAIAN ACARA */}
      <section
        id="acara"
        className="py-14 px-5 sm:px-8 space-y-8 relative overflow-hidden"
        style={{
          backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-base)",
          borderColor: "var(--theme-border)",
        }}
      >
        <SectionOrnamentBackdrop
          watermark={isJawa ? "wayang" : "none"}
          showCorners={isJawa && !isBrown}
          cornerOpacity="opacity-40"
          watermarkOpacity="opacity-[0.08]"
        />

        <ScrollReveal direction="up" className="relative z-10 text-center">
          <span
            className="text-[11px] font-serif font-bold uppercase tracking-[0.25em]"
            style={{
              color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#8B4E17" : "var(--theme-primary)",
            }}
          >
            {subtitleAcara}
          </span>
          <h2
            className="font-serif text-2xl sm:text-3xl font-bold mt-1"
            style={{
              color: isChinoiserie ? "#FAF7F0" : isCelestial ? "#F8F9FA" : isTerracotta ? "#2D231E" : isEmeraldNoir ? "#FFFDF0" : isBrown ? "#1A140E" : "white",
            }}
          >
            Rangkaian Acara
          </h2>
          <p
            className="text-xs mt-2 max-w-xs mx-auto"
            style={{
              color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
            }}
          >
            Dengan penuh rasa syukur, kami mengundang kehadiran Bapak/Ibu/Saudara/i pada:
          </p>
        </ScrollReveal>

        <div className="relative z-10 space-y-6">
          {data.events.map((ev, index) => (
            <ScrollReveal
              key={ev.id || index}
              direction="up"
              delay={index * 120}
            >
              {/* Folk / Velvet / Silk Framed Card */}
              <div
                className={`p-6 sm:p-7 shadow-lg relative overflow-hidden text-center transition-all duration-300 hover:-translate-y-1 ${
                  isChinoiserie
                    ? "glass-chinoiserie-bento rounded-3xl text-[#FAF7F0] shadow-[0_8px_32px_rgba(59,8,12,0.85)]"
                    : isCelestial
                    ? "glass-celestial-bento rounded-3xl text-[#F8F9FA] shadow-[0_8px_32px_rgba(8,11,20,0.85)]"
                    : isTerracotta
                    ? "border border-[#E3D4C4] rounded-t-[60px] sm:rounded-t-[80px] rounded-b-[24px] bg-[#FFFDFB] shadow-sm text-[#2D231E]"
                    : isEmeraldNoir
                    ? "border border-[#D4AF37]/35 rounded-3xl bg-[#0D2A20]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
                    : isBrown
                    ? "border-[3px] border-[#5C3410] rounded-[24px] bg-[#FFF9F6]/90 backdrop-blur-md text-[#1A140E]"
                    : "border rounded-3xl bg-[var(--theme-bg-surface)] text-white"
                }`}
                style={
                  !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                    ? {
                        borderColor: "var(--theme-border)",
                      }
                    : undefined
                }
              >
                {!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie && (
                  <>
                    <TraditionalGoldCorner className="absolute top-1 left-1 w-8 h-8 opacity-25 pointer-events-none" />
                    <TraditionalGoldCorner className="absolute top-1 right-1 w-8 h-8 -scale-x-100 opacity-25 pointer-events-none" />
                  </>
                )}

                {/* Script Event Title */}
                <h3
                  className={`mb-2 ${
                    isChinoiserie
                      ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F0] via-[#FDE047] to-[#D4AF37]"
                      : isCelestial
                      ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8F9FA] via-[#C8B6FF] to-[#F3D082]"
                      : isTerracotta
                      ? "font-serif text-2xl sm:text-3xl font-bold text-[#BF573F]"
                      : isEmeraldNoir
                      ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37]"
                      : isBrown
                      ? "font-script text-4xl sm:text-5xl text-[#5C3410]"
                      : "font-serif-display text-xl sm:text-2xl font-bold text-white"
                  }`}
                >
                  {ev.title}
                </h3>

                {/* Date and Time */}
                <div className="my-3 space-y-1">
                  <p
                    className="font-serif uppercase tracking-wider text-sm font-bold"
                    style={{
                      color: isChinoiserie ? "#E6C65C" : isTerracotta ? "#2D231E" : isEmeraldNoir ? "#F3E5AB" : isBrown ? "#1A140E" : "var(--theme-accent)",
                    }}
                  >
                    {ev.dayName}, {ev.date}
                  </p>
                  <p
                    className="text-xs"
                    style={{
                      color: isChinoiserie ? "#FAF7F0" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#4A3B32" : "var(--theme-text-secondary)",
                    }}
                  >
                    Pukul : {ev.startTime} - {ev.endTime} {ev.timezone}
                  </p>
                </div>

                {/* Venue Details */}
                <div
                  className="my-4 pt-3 border-t space-y-1"
                  style={{
                    borderColor: isChinoiserie
                      ? "rgba(212, 175, 55, 0.25)"
                      : isTerracotta
                      ? "#E3D4C4"
                      : isEmeraldNoir
                      ? "rgba(212, 175, 55, 0.2)"
                      : isBrown
                      ? "rgba(92, 52, 16, 0.15)"
                      : "var(--theme-border)",
                  }}
                >
                  <p
                    className="font-serif font-bold text-xs uppercase tracking-wider"
                    style={{
                      color: isChinoiserie ? "#FAF7F0" : isTerracotta ? "#2D231E" : isEmeraldNoir ? "#FFFDF0" : isBrown ? "#1A140E" : "white",
                    }}
                  >
                    {ev.venueName}
                  </p>
                  <p
                    className="text-xs leading-relaxed max-w-xs mx-auto"
                    style={{
                      color: isChinoiserie ? "#D1A7A0" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
                    }}
                  >
                    {ev.venueAddress}
                  </p>
                </div>

                {ev.googleMapsUrl && (
                  <a
                    href={ev.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium shadow-md transition-all cursor-pointer mt-2 relative overflow-hidden group ${
                      isChinoiserie
                        ? "btn-imperial-gold text-[#3B080C] font-semibold border border-[#FFE9AD]/70 shadow-[0_4px_20px_rgba(212,175,55,0.4)] active:scale-95"
                        : isCelestial
                        ? "btn-cosmic-shimmer text-[#080B14] font-semibold border border-[#FFF3B3]/60 shadow-[0_4px_20px_rgba(200,182,255,0.4)] active:scale-95"
                        : isTerracotta
                        ? "bg-[#BF573F] hover:bg-[#A94A34] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/50 shadow-[0_4px_14px_rgba(191,87,63,0.25)] active:scale-95"
                        : isEmeraldNoir
                        ? "bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#D4AF37] text-[#061A14] font-semibold border border-[#FFF4D0]/60 shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:brightness-105 active:scale-95"
                        : isBrown
                        ? "bg-[#5C3410] hover:bg-[#4A2808] text-[#FFF9F6] border border-[#8B4E17]/30 shadow-[0_4px_16px_rgba(92,52,16,0.25)]"
                        : "text-black hover:brightness-110"
                    }`}
                    style={
                      !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                        ? {
                            background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`,
                          }
                        : undefined
                    }
                  >
                    {/* Golden Sheen Shimmer Ray on CTA */}
                    {(isEmeraldNoir || isChinoiserie) && (
                      <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-golden-sheen pointer-events-none" />
                    )}
                    <MapPin className={`w-3.5 h-3.5 ${isChinoiserie ? "text-[#3B080C]" : isCelestial ? "text-[#080B14]" : isTerracotta ? "text-[#FFFDFB]" : isEmeraldNoir ? "text-[#061A14]" : "text-[#C4823F]"}`} />
                    <span>Petunjuk Lokasi (Google Maps)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* DRESS CODE TAMU (Folk Dark Contrast Card / Boho Warm Card / Celestial Glass Card) */}
      {data.dressCode && (
        <section
          id="dresscode"
          className="px-5 sm:px-8 py-4 relative overflow-hidden"
          style={{
            backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-surface)",
          }}
        >
          <ScrollReveal direction="up" className="relative z-10 max-w-sm mx-auto">
            <div
              className={`p-7 shadow-xl text-center relative overflow-hidden ${
                isChinoiserie
                  ? "glass-chinoiserie-bento rounded-3xl text-[#FAF7F0] shadow-[0_8px_32px_rgba(59,8,12,0.85)] border border-[#D4AF37]/35"
                  : isCelestial
                  ? "glass-celestial-bento rounded-3xl text-[#F8F9FA] shadow-[0_8px_32px_rgba(8,11,20,0.85)] border border-[#C8B6FF]/30"
                  : isTerracotta
                  ? "rounded-t-[60px] rounded-b-[24px] bg-[#FFFDFB] border border-[#E3D4C4] shadow-sm text-[#2D231E]"
                  : isEmeraldNoir
                  ? "rounded-3xl bg-[#0D2A20]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
                  : isBrown
                  ? "rounded-[24px] bg-[#533418] text-white border-2 border-[#EAD7C5]/25"
                  : "border rounded-3xl bg-[var(--theme-bg-surface)] text-white"
              }`}
              style={
                !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                  ? {
                      borderColor: "var(--theme-border)",
                    }
                  : undefined
              }
            >
              <Shirt
                className="w-8 h-8 mx-auto mb-2 opacity-90 animate-float-slow"
                style={{
                  color: isChinoiserie ? "#D4AF37" : isTerracotta ? "#BF573F" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#EAD7C5" : "var(--theme-primary)",
                }}
              />

              {/* Title in script */}
              <h2
                className={`mb-2 ${
                  isChinoiserie
                    ? "font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F0] via-[#FDE047] to-[#D4AF37]"
                    : isTerracotta
                    ? "font-serif text-2xl font-bold text-[#BF573F]"
                    : isEmeraldNoir
                    ? "font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37]"
                    : isBrown
                    ? "font-script text-4xl text-[#FDFBF7]"
                    : "font-serif-display text-xl sm:text-2xl font-bold text-white"
                }`}
              >
                Dress Code
              </h2>

              <p
                className="text-xs max-w-xs mx-auto mb-6 leading-relaxed"
                style={{
                  color: isChinoiserie ? "#D1A7A0" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#EAD7C5" : "var(--theme-text-muted)",
                }}
              >
                {data.dressCode.description}
              </p>

              {/* Swatch Palet Warna */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {data.dressCode.colors.map((color, idx) => (
                  <div key={idx} className="flex flex-col items-center group cursor-pointer">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md mb-1.5 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span
                      className="text-[11px] font-semibold"
                      style={{
                        color: isTerracotta ? "#2D231E" : isChinoiserie ? "#FAF7F0" : "white",
                      }}
                    >
                      {color.name}
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-wider opacity-75"
                      style={{
                        color: isChinoiserie ? "#D1A7A0" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#EAD7C5" : "var(--theme-text-muted)",
                      }}
                    >
                      {color.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* SIARAN LANGSUNG VIRTUAL */}
      {data.liveStreamingUrl && (
        <section
          className="px-5 sm:px-8 py-6 relative overflow-hidden"
          style={{
            backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-base)",
          }}
        >
          <ScrollReveal direction="up" className="relative z-10 max-w-sm mx-auto">
            <div
              className={`p-7 text-center shadow-lg relative overflow-hidden ${
                isChinoiserie
                  ? "glass-chinoiserie-bento rounded-3xl text-[#FAF7F0] shadow-[0_8px_32px_rgba(59,8,12,0.85)] border border-[#D4AF37]/35"
                  : isCelestial
                  ? "glass-celestial-bento rounded-3xl text-[#F8F9FA] shadow-[0_8px_32px_rgba(8,11,20,0.85)] border border-[#C8B6FF]/30"
                  : isTerracotta
                  ? "border border-[#E3D4C4] rounded-t-[60px] rounded-b-[24px] bg-[#FFFDFB] shadow-sm text-[#2D231E]"
                  : isEmeraldNoir
                  ? "border border-[#D4AF37]/35 rounded-3xl bg-[#0D2A20]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
                  : isBrown
                  ? "border-[3px] border-[#5C3410] rounded-[24px] bg-[#FFF9F6]/90 backdrop-blur-md text-[#1A140E]"
                  : "border rounded-3xl bg-[var(--theme-bg-base)] text-white"
              }`}
              style={
                !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                  ? {
                      borderColor: "var(--theme-border)",
                    }
                  : undefined
              }
            >
              <div className="relative inline-block mb-2">
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <Video className="w-8 h-8 text-red-500" />
              </div>
              <span
                className="text-[10px] font-serif font-bold uppercase tracking-[0.25em] block mb-1"
                style={{
                  color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#8B4E17" : "var(--theme-primary)",
                }}
              >
                Virtual Wedding
              </span>
              <h2
                className={`mb-2 ${
                  isChinoiserie
                    ? "font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F0] via-[#FDE047] to-[#D4AF37]"
                    : isCelestial
                    ? "font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8F9FA] via-[#C8B6FF] to-[#F3D082]"
                    : isTerracotta
                    ? "font-serif text-2xl font-bold text-[#BF573F]"
                    : isEmeraldNoir
                    ? "font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37]"
                    : isBrown
                    ? "font-script text-4xl text-[#5C3410]"
                    : "font-serif-display text-xl font-bold text-white"
                }`}
              >
                Live Streaming
              </h2>
              <p
                className="text-xs max-w-xs mx-auto mb-5"
                style={{
                  color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
                }}
              >
                Bagi sanak kerabat yang berhalangan hadir secara langsung, silakan ikuti prosesi pernikahan kami secara virtual:
              </p>
              <a
                href={data.liveStreamingUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 py-2.5 px-6 rounded-full text-xs font-semibold shadow-md transition-all relative overflow-hidden group hover:brightness-105 active:scale-95 ${
                  isChinoiserie
                    ? "btn-imperial-gold text-[#3B080C] font-semibold border border-[#FFE9AD]/70 shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                    : isCelestial
                    ? "btn-cosmic-shimmer text-[#080B14] font-semibold border border-[#FFF3B3]/60 shadow-[0_4px_20px_rgba(200,182,255,0.4)]"
                    : isTerracotta
                    ? "bg-[#BF573F] hover:bg-[#A94A34] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/50 shadow-[0_4px_14px_rgba(191,87,63,0.25)]"
                    : isEmeraldNoir
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#D4AF37] text-[#061A14] border border-[#FFF4D0]/60 shadow-[0_4px_16px_rgba(212,175,55,0.35)]"
                    : "bg-gradient-to-r from-[#5C3410] to-[#8B4E17] text-white border border-white/80"
                }`}
              >
                {(isEmeraldNoir || isChinoiserie) && (
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-golden-sheen pointer-events-none" />
                )}
                <span>Tonton Siaran Langsung</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </ScrollReveal>
        </section>
      )}
    </>
  );
}



