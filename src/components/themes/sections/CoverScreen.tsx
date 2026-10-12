"use client";

import React from "react";
import { Mail } from "lucide-react";
import { ThemeConfig } from "@/types/theme";
import { InvitationData } from "@/types/invitation";
import { EmeraldWaxSeal } from "@/components/themes/ornaments/emerald-noir";
import { TerracottaEnvelopeSeal } from "@/components/themes/ornaments/terracotta";
import { MoonGate, ShuangXiSeal } from "@/components/themes/ornaments/chinoiserie";
import { MinangSongketLace } from "@/components/themes/ornaments/minang/MinangSongketLace";
import { MinangPucukRebungDivider } from "@/components/themes/ornaments/minang/MinangPucukRebungDivider";
import { AcehPintoLace } from "@/components/themes/ornaments/aceh/AcehPintoLace";
import { AcehBungongEmblem } from "@/components/themes/ornaments/aceh/AcehBungongEmblem";

interface CoverScreenProps {
  theme: ThemeConfig;
  data: InvitationData;
  guestName: string;
  isOpen: boolean;
  isOpening: boolean;
  isEmbedded?: boolean;
  onOpen: () => void;
  formatDate: (dateStr?: string, dayName?: string) => string;
  videoUrl?: string;
}

export function CoverScreen({
  theme,
  data,
  guestName,
  isOpen,
  isOpening,
  isEmbedded = false,
  onOpen,
  formatDate,
  videoUrl,
}: CoverScreenProps) {
  if (isOpen && !isOpening) return null;

  const { Corner, Symbol, Divider } = theme.ornaments;
  const isChinoiserie = theme.id === "royal-chinoiserie-silk";
  const isCelestial = theme.id === "celestial-twilight";
  const isTerracotta = theme.id === "terracotta-earthy-meadow";
  const isEmeraldNoir = theme.id === "emerald-velvet-noir";
  const isSundaVintage = theme.id === "sunda-vintage";
  const isSundaNavy = theme.id === "sunda" || theme.id === "sunda-megamendung";
  const isBrown = theme.id === "jawa-brown" || isSundaVintage;
  const isMinang = theme.id === "minang-rumah-gadang";
  const isAceh = theme.id === "aceh-black-heritage" || theme.id === "aceh";

  const isVideoCover = Boolean(
    videoUrl ||
    (data as any).coverVideoUrl ||
    theme.backgrounds.coverVideoUrl ||
    (theme.backgrounds.cover?.match(/\.(mp4|webm)$/i))
  );
  const videoCoverSrc =
    videoUrl ||
    (data as any).coverVideoUrl ||
    theme.backgrounds.coverVideoUrl ||
    (theme.backgrounds.cover?.match(/\.(mp4|webm)$/i) ? theme.backgrounds.cover : undefined);
  const webpCoverFallback =
    theme.backgrounds.cover && !theme.backgrounds.cover.match(/\.(mp4|webm)$/i)
      ? theme.backgrounds.cover
      : undefined;

  return (
    <div
      className={`${
        isEmbedded ? "absolute" : "fixed"
      } inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-8 text-center overflow-hidden ${
        isOpening
          ? isCelestial
            ? "animate-cosmic-portal-warp pointer-events-none"
            : "animate-cinematic-zoom-through pointer-events-none"
          : "translate-y-0 opacity-100"
      }`}
      style={{
        backgroundColor: "var(--theme-bg-base)",
        transformOrigin: "50% 42%",
      }}
    >
      {/* Background Layer: Authentic Silhouette & Architectural Flora */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {(isCelestial || isChinoiserie) && theme.ornaments.CanvasEffect && (
          <theme.ornaments.CanvasEffect className="absolute inset-0 pointer-events-none z-10" />
        )}
        {isVideoCover && videoCoverSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={webpCoverFallback}
            className={`absolute inset-0 w-full h-full object-cover filter ${
              theme.colors.filterClass !== undefined
                ? theme.colors.filterClass
                : isSundaVintage
                ? "brightness-[0.88] contrast-[1.05]"
                : "brightness-[0.78] contrast-[1.18] sepia-[0.24] hue-rotate-[-10deg]"
            }`}
          >
            <source
              src={videoCoverSrc}
              type={videoCoverSrc.endsWith(".webm") ? "video/webm" : "video/mp4"}
            />
            {webpCoverFallback && (
              <img
                src={webpCoverFallback}
                alt=""
                className={`w-full h-full object-cover object-center filter ${
                  theme.colors.filterClass !== undefined
                    ? theme.colors.filterClass
                    : isSundaVintage
                    ? "brightness-[0.88] contrast-[1.05]"
                    : "brightness-[0.78] contrast-[1.18] sepia-[0.24] hue-rotate-[-10deg]"
                }`}
              />
            )}
          </video>
        ) : theme.backgrounds.cover && !isTerracotta && !isCelestial ? (
          <img
            src={theme.backgrounds.cover}
            alt=""
            className={`w-full h-full object-cover object-center filter ${
              theme.colors.filterClass !== undefined
                ? theme.colors.filterClass
                : isSundaVintage
                ? "brightness-[0.88] contrast-[1.05]"
                : "brightness-[0.78] contrast-[1.18] sepia-[0.24] hue-rotate-[-10deg]"
            }`}
          />
        ) : null}
        {/* Gradient Overlay */}
        {!isTerracotta && (
          <div
            className="absolute inset-0 mix-blend-multiply opacity-85"
            style={{
              background: isSundaVintage
                ? "linear-gradient(to bottom, rgba(20,14,10,0.4), rgba(33,21,13,0.3), rgba(20,14,10,0.75))"
                : `linear-gradient(to bottom, ${theme.colors.bgBase}cc, ${theme.colors.bgSurface}99, ${theme.colors.bgBase}ee)`,
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${theme.colors.glow} 0%, transparent 75%)`,
          }}
        />
        {/* Ambient Floating Megamendung Clouds - HANYA untuk Sunda Midnight Navy */}
        {isSundaNavy && (
          <>
            <div className="absolute -top-8 -right-8 w-64 opacity-40 animate-cloud-drift-right pointer-events-none">
              <img
                src="/assets/motion-art-sunda/extracted/cloud-grand-top-clean.png"
                alt=""
                className="w-full h-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              />
            </div>
            <div className="absolute bottom-16 -left-10 w-56 opacity-35 animate-cloud-drift-left pointer-events-none">
              <img
                src="/assets/motion-art-sunda/extracted/cloud-bottom-right-clean.png"
                alt=""
                className="w-full h-auto -scale-x-100 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              />
            </div>
          </>
        )}
      </div>

      {/* Imperial Red Silk Parting Curtain Gate (Royal Chinoiserie Silk Exclusive) */}
      {isChinoiserie && (
        <>
          {/* Left Red Silk Curtain Wing */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full z-20 pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpening ? "-translate-x-full" : "translate-x-0"
            }`}
            style={{
              background:
                "repeating-linear-gradient(90deg, #2A0508 0px, #3B080C 18px, #5C131A 36px, #3B080C 54px, #2A0508 72px)",
              boxShadow: "inset -8px 0 20px rgba(0,0,0,0.85), 4px 0 15px rgba(0,0,0,0.7)",
              borderRight: "1.5px solid rgba(212, 175, 55, 0.65)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
            {/* Golden Fretwork Trim & Tassel Shimmer */}
            <div className="absolute top-0 right-0 bottom-0 w-2.5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:6px_6px] opacity-40" />
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-[#D4AF37]/35 to-transparent border-t border-[#D4AF37]/30" />
          </div>

          {/* Right Red Silk Curtain Wing */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full z-20 pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpening ? "translate-x-full" : "translate-x-0"
            }`}
            style={{
              background:
                "repeating-linear-gradient(90deg, #2A0508 0px, #3B080C 18px, #5C131A 36px, #3B080C 54px, #2A0508 72px)",
              boxShadow: "inset 8px 0 20px rgba(0,0,0,0.85), -4px 0 15px rgba(0,0,0,0.7)",
              borderLeft: "1.5px solid rgba(212, 175, 55, 0.65)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute top-0 left-0 bottom-0 w-2.5 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:6px_6px] opacity-40" />
            <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-[#D4AF37]/35 to-transparent border-t border-[#D4AF37]/30" />
          </div>
        </>
      )}

      {/* Velvet Parting Curtain Gate (Emerald Velvet Noir Exclusive) */}
      {isEmeraldNoir && (
        <>
          {/* Left Velvet Curtain Wing */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full z-20 pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpening ? "-translate-x-full" : "translate-x-0"
            }`}
            style={{
              background:
                "repeating-linear-gradient(90deg, #03120D 0px, #07241A 18px, #0D3628 36px, #07241A 54px, #03120D 72px)",
              boxShadow: "inset -8px 0 20px rgba(0,0,0,0.85), 4px 0 15px rgba(0,0,0,0.7)",
              borderRight: "1.5px solid rgba(212, 175, 55, 0.55)",
            }}
          >
            {/* Deep Velvet Shadow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
            {/* Bottom Gold Drapery Fringe */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#D4AF37]/30 to-transparent border-t border-[#D4AF37]/25" />
          </div>

          {/* Right Velvet Curtain Wing */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full z-20 pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
              isOpening ? "translate-x-full" : "translate-x-0"
            }`}
            style={{
              background:
                "repeating-linear-gradient(90deg, #03120D 0px, #07241A 18px, #0D3628 36px, #07241A 54px, #03120D 72px)",
              boxShadow: "inset 8px 0 20px rgba(0,0,0,0.85), -4px 0 15px rgba(0,0,0,0.7)",
              borderLeft: "1.5px solid rgba(212, 175, 55, 0.55)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#D4AF37]/30 to-transparent border-t border-[#D4AF37]/25" />
          </div>
        </>
      )}

      {/* Ornamen Sudut di 4 Sudut & Songket Lace Header */}
      {isMinang && (
        <div className="absolute top-0 inset-x-0 w-full z-25 pointer-events-none">
          <MinangSongketLace height={48} className="opacity-95" />
        </div>
      )}
      {isAceh && (
        <div className="absolute top-0 inset-x-0 w-full z-25 pointer-events-none">
          <AcehPintoLace height={52} className="opacity-95" />
        </div>
      )}
      {isTerracotta ? (
        <>
          <Corner className="absolute top-0 left-0 w-24 h-24 z-25 animate-wind-sway" />
          <Corner className="absolute top-0 right-0 w-24 h-24 -scale-x-100 z-25 animate-wind-sway-reverse" />
          <Corner className="absolute bottom-0 left-0 w-20 h-20 -scale-y-100 z-25 opacity-60" />
          <Corner className="absolute bottom-0 right-0 w-20 h-20 -scale-x-100 -scale-y-100 z-25 opacity-60" />
        </>
      ) : (
        <>
          <Corner className="absolute top-2 left-2 w-16 h-16 z-25" />
          <Corner className="absolute top-2 right-2 w-16 h-16 -scale-x-100 z-25" />
          <Corner className="absolute bottom-2 left-2 w-16 h-16 -scale-y-100 z-25" />
          <Corner className="absolute bottom-2 right-2 w-16 h-16 -scale-x-100 -scale-y-100 z-25" />
        </>
      )}

      {/* Sinar Flash Lembut saat Membuka */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-700 ${
          isOpening ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at center, ${theme.colors.accent}66 0%, ${theme.colors.primary}1a 50%, transparent 80%)`,
          }}
        />
      </div>

      {/* Center Graphic: Chinoiserie Moon Gate vs Celestial Stargate vs Terracotta Kraft Envelope vs Emerald Velvet vs Traditional */}
      {isChinoiserie ? (
        <div
          className={`relative w-full max-w-[340px] my-auto z-30 flex flex-col items-center transition-all duration-1000 ${
            isOpening ? "scale-125 opacity-0 filter blur-sm pointer-events-none" : ""
          }`}
        >
          {/* Moon Gate Architectural Circular Reveal with Golden Lantern Shimmer */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-3">
            {/* Imperial Ruby & Gold Ambient Halo */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#991B1B]/40 via-[#D4AF37]/25 to-transparent blur-2xl animate-pulse pointer-events-none" />

            {/* Hanging Golden Lantern Shimmer on Left & Right */}
            <div className="absolute -left-2 top-8 w-6 h-12 flex flex-col items-center pointer-events-none animate-wind-sway z-30">
              <div className="w-0.5 h-4 bg-[#D4AF37]" />
              <div className="w-5 h-7 rounded-full bg-gradient-to-b from-[#E63946] to-[#991B1B] border border-[#D4AF37]/60 shadow-[0_0_12px_#D4AF37]" />
              <div className="w-1.5 h-3 bg-[#D4AF37]/80 rounded-b" />
            </div>
            <div className="absolute -right-2 top-8 w-6 h-12 flex flex-col items-center pointer-events-none animate-wind-sway-reverse z-30">
              <div className="w-0.5 h-4 bg-[#D4AF37]" />
              <div className="w-5 h-7 rounded-full bg-gradient-to-b from-[#E63946] to-[#991B1B] border border-[#D4AF37]/60 shadow-[0_0_12px_#D4AF37]" />
              <div className="w-1.5 h-3 bg-[#D4AF37]/80 rounded-b" />
            </div>

            {/* Moon Gate Circular Architectural Frame */}
            <MoonGate className="w-full h-full">
              {/* Center Portal Core with Cover Photo / Bride Photo or Rich Silk Disc */}
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37]/50 via-[#3B080C] to-[#991B1B]/60 shadow-[0_0_30px_rgba(212,175,55,0.4)] backdrop-blur-md flex items-center justify-center overflow-hidden border border-[#D4AF37]/40">
                {data.coverPhoto || data.bride.photo ? (
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img
                      src={data.coverPhoto || data.bride.photo}
                      alt={data.coverTitle}
                      className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B080C]/85 via-transparent to-[#5C131A]/40" />
                    {/* ShuangXi Center Seal Overlay inside portal */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ShuangXiSeal
                        className="w-16 h-16 sm:w-20 sm:h-20"
                        onClick={onOpen}
                        isOpening={isOpening}
                      />
                    </div>
                  </div>
                ) : (
                  <ShuangXiSeal
                    className="w-20 h-20 sm:w-24 sm:h-24"
                    onClick={onOpen}
                    isOpening={isOpening}
                  />
                )}
              </div>
            </MoonGate>
          </div>

          {/* Auspicious Badge with ShuangXi 囍 */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#D4AF37] text-xs">囍</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold text-[#D4AF37] block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              The Wedding Of
            </span>
            <span className="text-[#D4AF37] text-xs">囍</span>
          </div>

          {/* Couple Title in Rich Imperial Gold */}
          <h1 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#FDE047] to-[#D4AF37] tracking-wide py-1 drop-shadow-[0_4px_16px_rgba(59,8,12,0.95)]">
            {data.coverTitle || `${data.groom.nickname} & ${data.bride.nickname}`}
          </h1>

          <div className="w-28 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent my-2" />

          <p className="text-[10.5px] tracking-[0.25em] uppercase font-serif font-medium text-[#FAF7F0] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
            {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
          </p>
        </div>
      ) : isCelestial ? (
        <div
          className={`relative w-full max-w-[340px] my-auto z-30 flex flex-col items-center transition-all duration-1000 ${
            isOpening ? "scale-125 opacity-0 filter blur-sm pointer-events-none" : ""
          }`}
        >
          {/* Zodiac Stargate Orbiting Ring Portal */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center mb-3">
            {/* Cosmic Glow Halo Background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C8B6FF]/20 via-[#F3D082]/15 to-transparent blur-2xl animate-pulse pointer-events-none" />

            {/* Outer Zodiac Orbit Ring (Slow Spin Clockwise) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[#C8B6FF]/35 animate-cosmic-orbit-spin pointer-events-none">
              {/* Satellite Stars on Orbit */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FFFDF0] shadow-[0_0_10px_#FFF] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F3D082]" />
              </div>
              <div className="absolute bottom-4 right-10 w-2 h-2 rounded-full bg-[#C8B6FF] shadow-[0_0_8px_#C8B6FF]" />
              <div className="absolute top-12 left-6 w-2.5 h-2.5 rounded-full bg-[#F3D082] shadow-[0_0_8px_#F3D082]" />
            </div>

            {/* Inner Counter-Rotating Constellation Ring */}
            <div className="absolute inset-6 rounded-full border border-[#C8B6FF]/20 animate-cosmic-orbit-reverse pointer-events-none">
              <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C8B6FF] shadow-[0_0_6px_#C8B6FF]" />
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2 h-2 rounded-full bg-[#F3D082] shadow-[0_0_6px_#F3D082]" />
            </div>

            {/* Center Lunar / Portal Core with Photo or Seal */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#C8B6FF]/40 via-[#0F1527] to-[#F3D082]/40 shadow-[0_0_35px_rgba(200,182,255,0.35)] backdrop-blur-md flex items-center justify-center overflow-hidden border border-[#C8B6FF]/30">
              {data.coverPhoto || data.bride.photo ? (
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <img
                    src={data.coverPhoto || data.bride.photo}
                    alt={data.coverTitle}
                    className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B14]/80 via-transparent to-[#1B173B]/40" />
                  {/* Crescent Moon Seal Glow Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <Symbol className="w-24 h-24 text-[#FFFDF0]" />
                  </div>
                </div>
              ) : (
                <Symbol className="w-24 h-24" />
              )}
            </div>
          </div>

          {/* Romantic Couple Title & Wedding Badge */}
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold text-[#C8B6FF] block mb-1 drop-shadow-[0_0_10px_rgba(200,182,255,0.5)]">
            The Wedding Of
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] tracking-wide py-1 drop-shadow-[0_2px_14px_rgba(200,182,255,0.4)]">
            {data.coverTitle || `${data.groom.nickname} & ${data.bride.nickname}`}
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#F3D082]/70 to-transparent my-2" />
          <p className="text-[10.5px] tracking-[0.25em] uppercase font-serif font-medium text-[#D7D2EE] drop-shadow-[0_0_8px_rgba(243,208,130,0.3)]">
            {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
          </p>
        </div>
      ) : isTerracotta ? (
        <div
          className={`relative w-full max-w-[340px] my-auto z-30 transition-all duration-700 ${
            isOpening ? "animate-envelope-exit pointer-events-none" : ""
          }`}
        >
          {/* Kraft Envelope Outer Card Body */}
          <div className="relative rounded-2xl bg-[#FAF4EE] border border-[#E3D4C4] shadow-[0_16px_48px_rgba(143,59,37,0.18)] overflow-hidden p-6 pt-14 flex flex-col items-center">
            {/* Subtle Kraft Paper Texture Overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#8F3B25_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Boho Arch Outline on Letter Inside */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold text-[#8F3B25] block mb-1">
                The Wedding Of
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D231E] leading-tight my-1">
                {data.coverTitle || `${data.groom.nickname} & ${data.bride.nickname}`}
              </h1>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#BF573F]/50 to-transparent my-2" />
              <p className="text-[10.5px] tracking-[0.2em] uppercase font-serif font-medium text-[#857468]">
                {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
              </p>
            </div>

            {/* 3D Folding Kraft Flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 origin-top ${
                isOpening ? "animate-envelope-flap" : ""
              }`}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Triangular Kraft Flap SVG */}
              <svg
                viewBox="0 0 340 110"
                className="w-full h-full drop-shadow-[0_4px_12px_rgba(70,40,20,0.16)]"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 0 L 340 0 L 170 100 Z"
                  fill="#EDE2D5"
                  stroke="#D9C4B0"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Terracotta Wax Seal with Twine Ribbon at Flap Apex */}
            <div className="absolute top-14 z-30 flex items-center justify-center">
              <TerracottaEnvelopeSeal
                size={74}
                monogram={
                  data.groom?.nickname && data.bride?.nickname
                    ? `${data.groom.nickname[0]} & ${data.bride.nickname[0]}`
                    : "R & A"
                }
                isOpening={isOpening}
                onClick={onOpen}
              />
            </div>
          </div>
        </div>
      ) : isEmeraldNoir ? (
        <div className="flex flex-col items-center my-auto py-2 z-30 max-w-sm px-4">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] font-serif font-semibold block mb-2 text-[#D4AF37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            The Wedding Of
          </span>
          <h1 className="font-script text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37] drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] py-1 leading-[1.15]">
            {data.coverTitle || `${data.groom.nickname} & ${data.bride.nickname}`}
          </h1>

          {/* Centered Wax Seal on Velvet Gate */}
          <div className="my-3 relative flex items-center justify-center">
            <EmeraldWaxSeal
              className="w-20 h-20"
              onClick={onOpen}
              isOpening={isOpening}
            />
            {isOpening && (
              <div className="absolute inset-0 rounded-full animate-ping bg-[#D4AF37]/60 pointer-events-none" />
            )}
          </div>

          <p className="text-xs tracking-[0.25em] uppercase font-serif font-medium text-[#F4F6F0]/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
          </p>
        </div>
      ) : isSundaVintage ? (
        <div className="flex flex-col items-center my-auto py-4 z-30 max-w-sm px-4">
          <Symbol className="w-10 h-10 mx-auto mb-2 opacity-90 text-[#C4823F] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] font-serif font-medium block mb-2 text-[#EDE5DB]/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            The Wedding Of
          </span>
          <h1 className="font-script text-5xl sm:text-6xl text-[#FFF9F6] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] py-1 leading-[1.15]">
            {data.coverTitle || `${data.groom.nickname} & ${data.bride.nickname}`}
          </h1>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C4823F]/60 to-transparent my-2.5" />
          <p className="text-xs tracking-[0.25em] uppercase font-serif font-medium text-[#EDE5DB] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center my-auto py-2 z-30 max-w-sm">
          <div className="relative mb-3">
            {/* Authentic Sunda Megamendung Clouds flanking arch photo */}
            {isSundaNavy && (
              <>
                <img
                  src="/assets/motion-art-sunda/extracted/cloud-grand-top-clean.png"
                  alt=""
                  className={`absolute -top-7 -right-8 w-28 h-auto pointer-events-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] z-20 ${
                    isOpening ? "animate-cloud-portal-right" : ""
                  }`}
                />
                <img
                  src="/assets/motion-art-sunda/extracted/cloud-mid-left-clean.png"
                  alt=""
                  className={`absolute -bottom-4 -left-7 w-24 h-auto pointer-events-none drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] z-20 ${
                    isOpening ? "animate-cloud-portal-left" : ""
                  }`}
                />
              </>
            )}
            {isAceh ? (
              /* Romanesque / Moorish Pointed Arch Window with Golden Pinto Aceh Seal */
              <div
                className="relative w-40 h-56 sm:w-48 sm:h-68 rounded-t-[100px] rounded-b-[44px] border-[2.5px] p-1.5 shadow-2xl transition-transform"
                style={{
                  borderColor: "#D4AF37",
                  boxShadow: "0 0 35px rgba(212, 175, 55, 0.4), inset 0 0 16px rgba(212, 175, 55, 0.2)",
                  background: "linear-gradient(to bottom, #181411, #0A0A0A)",
                }}
              >
                {/* Pinto Aceh Keystones Seal atop the arch */}
                <div className="absolute -top-5 inset-x-0 mx-auto w-10 h-10 flex items-center justify-center z-30 drop-shadow-[0_4px_12px_rgba(212,175,55,0.7)] pointer-events-none">
                  <AcehBungongEmblem className="w-9 h-9" />
                </div>

                {/* Inner Moorish Arch Inset Frame */}
                <div
                  className="w-full h-full rounded-t-[94px] rounded-b-[38px] overflow-hidden border relative ring-1 ring-[#D4AF37]/40 ring-offset-1 ring-offset-[#0A0A0A]"
                  style={{ borderColor: "rgba(212, 175, 55, 0.6)" }}
                >
                  <img
                    src={data.coverPhoto || data.bride.photo}
                    alt={data.coverTitle}
                    className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-[#D4AF37]/30 to-transparent border-t border-[#D4AF37]/30 pointer-events-none" />
                </div>
              </div>
            ) : (
              <div
                className="relative w-36 h-52 sm:w-44 sm:h-64 rounded-t-full rounded-b-[70px] border-[3px] p-1.5 shadow-2xl"
                style={{
                  borderColor: isBrown ? "#F5EBE1" : "var(--theme-primary)",
                  boxShadow: `0 0 35px ${theme.colors.glow}`,
                  background: `linear-gradient(to bottom, ${theme.colors.bgSurface}, ${theme.colors.bgBase})`,
                }}
              >
                <div
                  className="w-full h-full rounded-t-full rounded-b-[64px] overflow-hidden border relative"
                  style={{ borderColor: "var(--theme-border)" }}
                >
                  <img
                    src={data.coverPhoto || data.bride.photo}
                    alt={data.coverTitle}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              </div>
            )}
          </div>

          {/* Top Label */}
          <span className="text-xs uppercase tracking-[0.3em] font-serif font-medium block mb-1 text-white/90">
            The Wedding Of
          </span>

          {/* Cursive Romantic Couple Title */}
          <h1
            className={`font-script text-4xl sm:text-5xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] py-1 ${
              isMinang || isAceh
                ? "text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF7] via-[#F5D76E] to-[#D4A017]"
                : "text-white"
            }`}
          >
            {data.coverTitle || `${data.groom.nickname} & ${data.bride.nickname}`}
          </h1>

          {/* Symbol Ornamen / Minang Pucuk Rebung Divider / Aceh Bungong Emblem */}
          {isMinang ? (
            <div className="w-36 mx-auto my-2 opacity-85">
              <MinangPucukRebungDivider className="w-full h-auto" />
            </div>
          ) : isAceh ? (
            <div className="w-24 mx-auto my-1 opacity-95">
              <AcehBungongEmblem className="w-14 h-14 mx-auto" />
            </div>
          ) : (
            <Symbol className="w-9 h-12 mx-auto my-1.5 opacity-90 drop-shadow-[0_0_12px_rgba(229,193,108,0.45)]" />
          )}

          <p className="text-[11px] tracking-widest uppercase font-serif font-medium text-[#F5EBE1]/90">
            {formatDate(data.events[0]?.date, data.events[0]?.dayName)}
          </p>
        </div>
      )}

      {/* Bottom Card: Kepada Yth + Tombol Buka Undangan */}
      <div className="w-full max-w-xs z-30 pb-2 space-y-3">
        <div
          className="backdrop-blur-md border rounded-2xl p-3.5 shadow-2xl"
          style={{
            backgroundColor: isChinoiserie
              ? "rgba(92, 19, 26, 0.90)"
              : isCelestial
              ? "rgba(15, 21, 39, 0.88)"
              : isTerracotta
              ? "rgba(255, 253, 251, 0.95)"
              : isEmeraldNoir
              ? "rgba(13, 42, 32, 0.90)"
              : isAceh
              ? "rgba(18, 16, 14, 0.92)"
              : isSundaVintage
              ? "rgba(33, 21, 13, 0.84)"
              : isBrown
              ? "rgba(43, 23, 9, 0.85)"
              : "var(--theme-bg-card)",
            borderColor: isChinoiserie
              ? "rgba(212, 175, 55, 0.35)"
              : isCelestial
              ? "rgba(200, 182, 255, 0.3)"
              : isTerracotta
              ? "#E3D4C4"
              : isEmeraldNoir
              ? "rgba(212, 175, 55, 0.35)"
              : isAceh
              ? "rgba(212, 175, 55, 0.45)"
              : isSundaVintage
              ? "rgba(196, 130, 63, 0.35)"
              : isBrown
              ? "rgba(245, 235, 225, 0.25)"
              : "var(--theme-border)",
            boxShadow: isChinoiserie
              ? "0 8px 32px rgba(59, 8, 12, 0.85), 0 0 16px rgba(212, 175, 55, 0.2)"
              : isCelestial
              ? "0 8px 32px rgba(8, 11, 20, 0.85), 0 0 16px rgba(200, 182, 255, 0.15)"
              : isTerracotta
              ? "0 8px 24px rgba(191, 87, 63, 0.12)"
              : isEmeraldNoir
              ? "0 8px 32px rgba(0, 0, 0, 0.65)"
              : isAceh
              ? "0 8px 32px rgba(0, 0, 0, 0.85), 0 0 20px rgba(212, 175, 55, 0.25)"
              : undefined,
          }}
        >
          <p
            className={`text-[10px] tracking-wider uppercase mb-0.5 ${
              isChinoiserie
                ? "text-[#E6C65C]"
                : isCelestial
                ? "text-[#C8B6FF]"
                : isTerracotta
                ? "text-[#857468]"
                : isEmeraldNoir
                ? "text-[#8BA398]"
                : isAceh
                ? "text-[#D4AF37]"
                : "text-[#D8C7B8]"
            }`}
          >
            Kepada Yth, Bapak, Ibu, Saudara/i:
          </p>
          <h2
            className={`text-base font-serif font-bold truncate px-1 ${
              isChinoiserie
                ? "text-[#FAF7F0] drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                : isCelestial
                ? "text-[#F8F9FA] drop-shadow-[0_0_8px_rgba(200,182,255,0.4)]"
                : isTerracotta
                ? "text-[#2D231E]"
                : isAceh
                ? "text-[#FAF7F0] drop-shadow-[0_0_8px_rgba(212,175,55,0.35)]"
                : "text-white"
            }`}
          >
            {guestName}
          </h2>
          <p
            className={`text-[9px] mt-0.5 italic ${
              isChinoiserie
                ? "text-[#D1A7A0]"
                : isCelestial
                ? "text-[#8E9AAF]"
                : isTerracotta
                ? "text-[#857468]/80"
                : isEmeraldNoir
                ? "text-[#8BA398]/80"
                : isAceh
                ? "text-[#F4EFE6]/70"
                : "text-[#B8A798]"
            }`}
          >
            *Mohon maaf jika ada kesalahan penulisan nama/gelar
          </p>
        </div>

        <button
          onClick={onOpen}
          disabled={isOpening}
          className={`w-full py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group ${
            isChinoiserie
              ? "btn-imperial-gold text-[#3B080C] font-serif border border-[#FFE9AD]/70 shadow-[0_8px_30px_rgba(212,175,55,0.45)] hover:brightness-105"
              : isCelestial
              ? "btn-cosmic-shimmer text-[#080B14] font-semibold border border-[#FFF3B3]/60 shadow-[0_4px_24px_rgba(200,182,255,0.4)]"
              : isTerracotta
              ? "bg-[#BF573F] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/50 shadow-[0_4px_14px_rgba(191,87,63,0.25)] hover:bg-[#A94A34]"
              : isEmeraldNoir
              ? "bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#D4AF37] text-[#061A14] font-serif border border-[#FFF4D0]/60 shadow-[0_8px_30px_rgba(212,175,55,0.45)] hover:brightness-105"
              : isAceh
              ? "bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#D4AF37] text-[#0A0A0A] font-serif border border-[#FFF4D0]/70 shadow-[0_8px_30px_rgba(212,175,55,0.45)] hover:brightness-105"
              : isBrown
              ? "bg-[#FFF9F6] text-[#5C3410] hover:bg-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] border border-[#8B4E17]/20"
              : "text-black hover:brightness-110"
          }`}
          style={
            !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie && !isAceh
              ? {
                  background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`,
                  boxShadow: `0 10px 25px ${theme.colors.glow}`,
                }
              : undefined
          }
        >
          {/* Golden Sheen Shimmer Ray on CTA (Emerald, Chinoiserie, and Aceh) */}
          {(isEmeraldNoir || isChinoiserie || isAceh) && (
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-golden-sheen pointer-events-none" />
          )}
          <Mail
            className={`w-4 h-4 shrink-0 ${
              isChinoiserie
                ? "text-[#3B080C]"
                : isCelestial
                ? "text-[#080B14]"
                : isTerracotta
                ? "text-[#FFFDFB]"
                : isEmeraldNoir
                ? "text-[#061A14]"
                : isAceh
                ? "text-[#0A0A0A]"
                : isBrown
                ? "text-[#5C3410]"
                : ""
            }`}
          />
          <span>{isOpening ? "Membuka Undangan..." : "Buka Undangan"}</span>
        </button>
      </div>
    </div>
  );
}
