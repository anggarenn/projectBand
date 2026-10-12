"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ThemeConfig } from "@/types/theme";
import { GalleryItem, InvitationData } from "@/types/invitation";
import { SectionOrnamentBackdrop } from "@/components/themes/ornaments/jawa/SectionOrnamentBackdrop";
import { ScrollReveal } from "@/components/themes/ScrollReveal";
import {
  LayoutGrid,
  Film,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";

interface GaleriSectionProps {
  theme: ThemeConfig;
  data?: InvitationData;
  gallery?: GalleryItem[];
}

export function GaleriSection({ theme, data, gallery }: GaleriSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "slider">("grid");
  const [sliderIndex, setSliderIndex] = useState(0);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const items = gallery || data?.gallery || [];
  const isTerracotta = theme.id === "terracotta-earthy-meadow";
  const isEmeraldNoir = theme.id === "emerald-velvet-noir";
  const isBrown = theme.id === "jawa-brown" || theme.id === "sunda-vintage";
  const isJawa = theme.id.startsWith("jawa") || theme.id === "black-gold" || theme.id === "emerald";

  // Lightbox keyboard navigation (ArrowLeft, ArrowRight, Escape)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "Escape") {
        setActiveLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : items.length - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev < items.length - 1 ? prev + 1 : 0) : null
        );
      }
    },
    [activeLightboxIndex, items.length]
  );

  useEffect(() => {
    if (activeLightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeLightboxIndex, handleKeyDown]);

  if (!items || items.length === 0) return null;

  const nextSlider = () => {
    setSliderIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const prevSlider = () => {
    setSliderIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev < items.length - 1 ? prev + 1 : 0) : 0
    );
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLightboxIndex((prev) =>
      prev !== null ? (prev > 0 ? prev - 1 : items.length - 1) : 0
    );
  };

  return (
    <>
      <section
        id="galeri"
        className="py-12 px-4 sm:px-6 relative overflow-hidden"
        style={{
          backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-surface)",
          borderColor: "var(--theme-border)",
        }}
      >
        <SectionOrnamentBackdrop
          watermark={isJawa ? "kayon" : "none"}
          showCorners={isJawa && !isBrown}
          cornerOpacity="opacity-30"
          watermarkOpacity="opacity-[0.05]"
        />

        {/* SECTION HEADER (Clean, no description) */}
        <ScrollReveal direction="up" className="relative z-10 text-center mb-6">
          <h2
            className={`mb-2 ${
              isTerracotta
                ? "font-serif text-2xl sm:text-3xl font-bold text-[#BF573F] tracking-wide"
                : isEmeraldNoir
                ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37] tracking-wide"
                : isBrown
                ? "font-script text-4xl sm:text-5xl text-[#5C3410]"
                : "font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-wide"
            }`}
          >
            Our Gallery
          </h2>

          {/* Warm / Golden Divider */}
          <div className="flex items-center justify-center gap-2 my-1.5">
            <div
              className={`w-12 h-[1px] bg-gradient-to-r from-transparent ${
                isTerracotta ? "to-[#BF573F]" : isEmeraldNoir ? "to-[#D4AF37]" : "to-[#C59B3C]"
              }`}
            />
            <div
              className={`w-1.5 h-1.5 rotate-45 ${
                isTerracotta ? "bg-[#BF573F]" : isEmeraldNoir ? "bg-[#D4AF37]" : "bg-[#C59B3C]"
              }`}
            />
            <div
              className={`w-12 h-[1px] bg-gradient-to-l from-transparent ${
                isTerracotta ? "to-[#BF573F]" : isEmeraldNoir ? "to-[#D4AF37]" : "to-[#C59B3C]"
              }`}
            />
          </div>

          {/* VIEW MODE TOGGLE SWITCHER */}
          <div
            className={`inline-flex items-center p-1 rounded-full text-xs mt-3 shadow-lg backdrop-blur-md ${
              isTerracotta
                ? "bg-[#FFFDFB] border border-[#E3D4C4] shadow-sm"
                : isEmeraldNoir
                ? "border border-[#D4AF37]/35 bg-[#0D2A20]/80 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                : isBrown
                ? "bg-[#FFF9F6]/85 border border-[#5C3410]/25"
                : "border border-[#C59B3C]/30 bg-black/40"
            }`}
          >
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-[11px] font-medium cursor-pointer ${
                viewMode === "grid"
                  ? isTerracotta
                    ? "bg-[#BF573F] text-[#FFFDFB] font-semibold shadow-md btn-tactile-clay"
                    : isEmeraldNoir
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#061A14] font-semibold shadow-md"
                    : isBrown
                    ? "bg-[#5C3410] text-[#FFF9F6] font-semibold shadow-md"
                    : "bg-[#C59B3C] text-black font-semibold shadow-md"
                  : isTerracotta
                  ? "text-[#857468] hover:text-[#2D231E]"
                  : isEmeraldNoir
                  ? "text-[#8BA398] hover:text-[#FFFDF0]"
                  : isBrown
                  ? "text-[#7A6B62] hover:text-[#5C3410]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("slider")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all text-[11px] font-medium cursor-pointer ${
                viewMode === "slider"
                  ? isTerracotta
                    ? "bg-[#BF573F] text-[#FFFDFB] font-semibold shadow-md btn-tactile-clay"
                    : isEmeraldNoir
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#061A14] font-semibold shadow-md"
                    : isBrown
                    ? "bg-[#5C3410] text-white font-semibold shadow-md"
                    : "bg-[#C59B3C] text-black font-semibold shadow-md"
                  : isTerracotta
                  ? "text-[#857468] hover:text-[#2D231E]"
                  : isEmeraldNoir
                  ? "text-[#8BA398] hover:text-[#FFFDF0]"
                  : isBrown
                  ? "text-[#7A6B62] hover:text-[#5C3410]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Slide</span>
            </button>
          </div>
        </ScrollReveal>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: BENTO / MASONRY EDITORIAL GRID                        */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "grid" && (
          <ScrollReveal direction="up" delay={150}>
            <div className="relative z-10 grid grid-cols-2 gap-2.5 sm:gap-3">
              {items.map((photo, i) => {
                const isFeatured = i === 0 || (i > 0 && i % 5 === 0);

                return (
                  <div
                    key={photo.id || i}
                    onClick={() => setActiveLightboxIndex(i)}
                    className={`relative overflow-hidden cursor-pointer group shadow-xl transition-all duration-500 hover:-translate-y-1 ${
                      isFeatured ? "col-span-2 h-56 sm:h-64" : "col-span-1 h-44 sm:h-52"
                    } ${
                      isTerracotta
                        ? "rounded-t-[40px] rounded-b-[18px] border border-[#E3D4C4] bg-[#FFFDFB] shadow-sm"
                        : isEmeraldNoir
                        ? "rounded-2xl border border-[#D4AF37]/35 bg-[#0D2A20] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : isBrown
                        ? "rounded-[20px] border-[2px] border-[#5C3410]/40 bg-[#FFF9F6]"
                        : "rounded-2xl border border-[#C59B3C]/30 bg-[#161412]"
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle Hover Vignette */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Expand Icon Badge */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg scale-90 group-hover:scale-100 transition-transform ${
                        isTerracotta
                          ? "bg-[#FFFDFB]/90 border border-[#BF573F] text-[#BF573F]"
                          : isEmeraldNoir
                          ? "bg-[#0D2A20]/80 border border-[#D4AF37] text-[#D4AF37]"
                          : "bg-black/60 border border-[#C59B3C]/60 text-[#C59B3C]"
                      }`}>
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: CINEMATIC SLIDER                                      */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "slider" && (
          <ScrollReveal direction="up" delay={150}>
            <div className="relative z-10 space-y-3">
              {/* Main Showcase Slide */}
              <div
                onClick={() => setActiveLightboxIndex(sliderIndex)}
                className={`relative h-80 sm:h-96 overflow-hidden cursor-pointer group shadow-2xl transition-all duration-500 ${
                  isTerracotta
                    ? "rounded-t-[60px] rounded-b-[24px] border border-[#E3D4C4] bg-[#FFFDFB] shadow-sm"
                    : isEmeraldNoir
                    ? "rounded-2xl border border-[#D4AF37]/40 bg-[#0D2A20] shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                    : isBrown
                    ? "rounded-[24px] border-[2px] border-[#5C3410]/50 bg-[#FFF9F6]"
                    : "rounded-2xl border border-[#C59B3C]/40 bg-[#161412]"
                }`}
              >
                <img
                  src={items[sliderIndex]?.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Left Navigation Chevron */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlider();
                  }}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg z-20 ${
                    isTerracotta
                      ? "bg-[#FFFDFB]/90 border border-[#E3D4C4] text-[#2D231E] hover:text-[#BF573F]"
                      : isEmeraldNoir
                      ? "bg-[#0D2A20]/80 border border-[#D4AF37]/50 text-[#D4AF37]"
                      : "bg-black/60 border border-white/20 text-white"
                  }`}
                  aria-label="Foto Sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right Navigation Chevron */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlider();
                  }}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg z-20 ${
                    isTerracotta
                      ? "bg-[#FFFDFB]/90 border border-[#E3D4C4] text-[#2D231E] hover:text-[#BF573F]"
                      : isEmeraldNoir
                      ? "bg-[#0D2A20]/80 border border-[#D4AF37]/50 text-[#D4AF37]"
                      : "bg-black/60 border border-white/20 text-white"
                  }`}
                  aria-label="Foto Selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Center Hover Magnifier */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center shadow-2xl ${
                    isTerracotta
                      ? "bg-[#FFFDFB]/90 border border-[#BF573F] text-[#BF573F]"
                      : isEmeraldNoir
                      ? "bg-[#0D2A20]/80 border border-[#D4AF37] text-[#D4AF37]"
                      : "bg-black/70 border border-[#C59B3C]/60 text-[#C59B3C]"
                  }`}>
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none snap-x justify-center">
                {items.map((photo, idx) => (
                  <button
                    key={photo.id || idx}
                    type="button"
                    onClick={() => setSliderIndex(idx)}
                    className={`relative shrink-0 snap-center w-14 h-14 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                      sliderIndex === idx
                        ? isTerracotta
                          ? "border-[#BF573F] scale-105 shadow-md shadow-[#BF573F]/30"
                          : isEmeraldNoir
                          ? "border-[#D4AF37] scale-105 shadow-md shadow-[#D4AF37]/40"
                          : isBrown
                          ? "border-[#5C3410] scale-105 shadow-md shadow-[#5C3410]/30"
                          : "border-[#C59B3C] scale-105 shadow-md shadow-[#C59B3C]/30"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FULLSCREEN LIGHTBOX MODAL (Pure visual, no descriptions)      */}
      {/* ------------------------------------------------------------- */}
      {activeLightboxIndex !== null && items[activeLightboxIndex] && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 animate-fadeIn select-none"
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="flex items-center justify-between w-full max-w-3xl mx-auto z-20 pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-zinc-200">
              <span className="text-[#C59B3C] font-semibold">
                {activeLightboxIndex + 1}
              </span>
              <span className="text-zinc-500">/</span>
              <span>{items.length}</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-xl"
              aria-label="Tutup Galeri"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Stage: Image + Navigation Arrows */}
          <div
            className="relative flex-1 flex items-center justify-center w-full max-w-4xl mx-auto my-auto overflow-hidden py-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow Button */}
            <button
              type="button"
              onClick={prevLightbox}
              className="absolute left-2 sm:left-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Lightbox Main Image */}
            <img
              src={items[activeLightboxIndex].url}
              alt=""
              className="max-w-full max-h-[76vh] object-contain rounded-xl shadow-2xl border border-white/10 transition-all duration-300"
            />

            {/* Next Arrow Button */}
            <button
              type="button"
              onClick={nextLightbox}
              className="absolute right-2 sm:right-4 z-30 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Foto Selanjutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Quick Thumbnail Navigation */}
          <div
            className="w-full max-w-2xl mx-auto text-center z-20 pb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-1.5 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
              {items.map((thumb, idx) => (
                <button
                  key={thumb.id || idx}
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`w-10 h-10 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                    activeLightboxIndex === idx
                      ? "border-[#C59B3C] scale-110 shadow-lg shadow-[#C59B3C]/40 opacity-100"
                      : "border-transparent opacity-40 hover:opacity-80"
                  }`}
                  aria-label={`Pilih foto ${idx + 1}`}
                >
                  <img src={thumb.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
