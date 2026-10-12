"use client";

import React from "react";
import { BaliFirefliesCanvas } from "./BaliFirefliesCanvas";

interface BaliStageBackdropProps {
  className?: string;
  stageFallback?: string;
  canopySrc?: string;
  isOpen?: boolean;
  isOpening?: boolean;
  videoUrl?: string;
  variant?: string;
}

/**
 * BaliStageBackdrop
 * Konsep: Majestic Candi Bentar Gate Opening, Sacred Temple Lake Reveal,
 * Royal Canopy Top, dan Balinese Gold Fireflies khas Bali Royal Candi Bentar.
 * 
 * Lapisan Panggung:
 * 1. Clean Backdrop: Candi Bentar membelah megah menatap Gunung Batur & Danau Beratan.
 * 2. Holy Atmosphere: Pendaran radial blencong dan marun keemasan.
 * 3. Temple Mist: Kabut suci pura yang berarak perlahan (looping).
 * 4. Top Canopy: Kanopi kencana ukiran Bali di puncak panggung (membingkai Mahkota Gelungan).
 * 5. Gold Fireflies: Partikel cahaya emas mistis melayang 60fps di seluruh panggung.
 * 6. Frangipani Blooms: Mekarnya bunga kamboja Bali di kedua sudut bawah.
 */
export function BaliStageBackdrop({
  className = "",
  stageFallback = "/assets/motion-art-bali/bg-stage-bali-candibentar.webp",
  canopySrc = "/assets/motion-art-bali/bali-canopy-top.webp",
  isOpen,
  isOpening,
  videoUrl,
}: BaliStageBackdropProps) {
  // Sync dengan alur pembukaan undangan (terpicu saat isOpen / isOpening bernilai true)
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const isVideo = Boolean(videoUrl || stageFallback?.match(/\.(mp4|webm)$/i));
  const videoSrc = videoUrl || (stageFallback?.match(/\.(mp4|webm)$/i) ? stageFallback : undefined);
  const webpFallback = !stageFallback?.match(/\.(mp4|webm)$/i)
    ? stageFallback
    : "/assets/motion-art-bali/bg-stage-bali-candibentar.webp";

  return (
    <div
      key={isRevealed ? "bali-stage-revealed" : "bali-stage-idle"}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className} z-0`}
    >
      {/* ── LAYER 0: Clean Backdrop (Majestic Candi Bentar + Mount Batur/Agung + Lake Beratan / Video) ── */}
      <div
        className={`absolute inset-0 z-0 will-change-transform ${
          isRevealed ? "animate-stage-zoom-in" : "opacity-0"
        }`}
      >
        {isVideo && videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={webpFallback}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type={videoSrc.endsWith(".webm") ? "video/webm" : "video/mp4"} />
            <img
              src={webpFallback}
              alt="Panggung Bali Candi Bentar & Danau Beratan"
              className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
            />
          </video>
        ) : (
          <img
            src={webpFallback}
            alt="Panggung Bali Candi Bentar & Danau Beratan"
            className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
          />
        )}
      </div>

      {/* ── LAYER 1: Sacred Atmosphere Gradients & Blencong Holy Glow ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0F0C1B]/60 via-transparent to-[#0F0C1B]/85 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.22)_0%,transparent_65%)] animate-blencong pointer-events-none" />

      {/* ── LAYER 2: SLOW DRIFTING TEMPLE MIST (Looping lembut di latar danau & pura) ── */}
      <div className="absolute top-[28%] inset-x-0 h-[38%] pointer-events-none z-[2] overflow-hidden opacity-75 mix-blend-screen">
        <div className="w-[200%] h-full flex animate-parahyangan-mist">
          <img
            src="/assets/motion-art-bali/bali-temple-mist.webp"
            alt="Bali Temple Mist 1"
            className="w-1/2 h-full object-cover object-bottom"
          />
          <img
            src="/assets/motion-art-bali/bali-temple-mist.webp"
            alt="Bali Temple Mist 2"
            className="w-1/2 h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* ── LAYER 3: BALINESE GOLD FIREFLIES & BLENCONG SPARKS ── */}
      {isRevealed && (
        <BaliFirefliesCanvas
          className="absolute inset-0 pointer-events-none z-[3] w-full h-full"
          particleCount={40}
        />
      )}

      {/* ── LAYER 4: ROYAL CANOPY TOP (Menggantung Anggun di Puncak Panggung) ── */}
      <div
        className={`absolute top-0 inset-x-0 z-[4] pointer-events-none flex justify-center transition-all duration-1000 ease-out ${
          isRevealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <div className="relative w-full max-w-[620px]">
          <img
            src={canopySrc}
            alt="Kanopi Atas Panggung Bali"
            className="w-full h-auto max-h-[140px] sm:max-h-[180px] object-cover object-top drop-shadow-[0_12px_28px_rgba(15,12,27,0.95)]"
          />
          {/* Subtle Ambient Gold Shimmer di Bawah Bibir Kanopi */}
          <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-b from-transparent to-[#0F0C1B]/40 pointer-events-none" />
        </div>
      </div>

      {/* ── LAYER 5: BUNGA KAMBOJA BALI SUDUT BAWAH (Stage 2 Frangipani Blooms) ── */}
      {isRevealed && (
        <>
          {/* Bunga Kamboja Sudut Kiri Bawah */}
          <div
            className="absolute -bottom-2 -left-2 w-[34%] max-w-[150px] animate-floral-bloom-left pointer-events-none will-change-transform z-[5]"
            style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src="/assets/motion-art-bali/bali-floral-left.webp"
              alt="Bunga Kamboja Bali Bawah Kiri"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(2px 6px 18px rgba(15,12,27,0.9))" }}
            />
          </div>

          {/* Bunga Kamboja Sudut Kanan Bawah */}
          <div
            className="absolute -bottom-2 -right-2 w-[34%] max-w-[150px] animate-floral-bloom-right pointer-events-none will-change-transform z-[5]"
            style={{ animationDelay: "0.68s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src="/assets/motion-art-bali/bali-floral-right.webp"
              alt="Bunga Kamboja Bali Bawah Kanan"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(-2px 6px 18px rgba(15,12,27,0.9))" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
