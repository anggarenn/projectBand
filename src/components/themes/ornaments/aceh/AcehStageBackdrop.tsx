"use client";

import React from "react";
import { AcehPintoLace } from "./AcehPintoLace";

interface AcehStageBackdropProps {
  className?: string;
  stageFallback?: string;
  isOpen?: boolean;
  isOpening?: boolean;
  videoUrl?: string;
  variant?: string;
}

/**
 * AcehStageBackdrop
 * Panggung Stage 2 Teatrikal Rumoh Aceh / Krong Bade (Serambi Mekkah).
 * Mengusung standar Sacred Heritage Noir (Quiet Luxury):
 * - Layer 1: Background video / WebP fallback Rumoh Aceh (Krong Bade) engraving/lithograph berarsitektur pasak & tiang kayu ulin agung.
 * - Layer 2: Deep Charcoal & Obsidian Atmosphere Vignette di sekeliling panggung.
 * - Layer 3: Central Darkening Vignette untuk menjamin keterbacaan tipografi dan frame bento mempelai.
 * - Layer 4: Volumetric Warm Amber Radiance (pendaran damar / pelita minyak nilam tradisi).
 * - Layer 5: Ambient Mist Drift lembut berarak di lembah pegunungan Seulawah / Krueng Aceh.
 * - Layer 6: Pelmet ornamen renda emas motif Pinto Aceh & Bungong Jeumpa di ceiling panggung (z-10).
 */
export function AcehStageBackdrop({
  className = "",
  stageFallback = "/assets/motion-art-aceh/bg-stage-aceh-krongbade.webp",
  isOpen,
  isOpening,
  videoUrl,
}: AcehStageBackdropProps) {
  // Sinkronisasi status pembukaan panggung
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const isVideo = Boolean(videoUrl || stageFallback?.match(/\.(mp4|webm)$/i));
  const videoSrc = videoUrl || (stageFallback?.match(/\.(mp4|webm)$/i) ? stageFallback : undefined);
  const webpFallback = !stageFallback?.match(/\.(mp4|webm)$/i)
    ? stageFallback
    : "/assets/motion-art-aceh/bg-stage-aceh-krongbade.webp";

  return (
    <div
      key={isRevealed ? "aceh-stage-revealed" : "aceh-stage-idle"}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className} z-0`}
    >
      {/* ── LAYER 1: CLEAN BACKDROP (RUMOH ACEH KRONG BADE / VIDEO) ── */}
      <div
        className={`absolute inset-0 will-change-transform ${
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
              alt="Panggung Rumoh Aceh Krong Bade"
              className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
            />
          </video>
        ) : (
          <img
            src={webpFallback}
            alt="Panggung Rumoh Aceh Krong Bade"
            className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
          />
        )}
      </div>

      {/* ── LAYER 2: SACRED OBSIDIAN & CHARCOAL VIGNETTE ── */}
      {/* Gradient vertikal menyeluruh */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B08]/80 via-[#0D0B08]/30 to-[#0D0B08]/95 pointer-events-none" />

      {/* Top Header Scrim Shade (Mempertajam kontras pelmet renda atap) */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0D0B08]/90 via-[#0D0B08]/50 to-transparent pointer-events-none z-1" />

      {/* ── LAYER 3: CENTRAL DARKENING VIGNETTE ── */}
      {/* Menjaga kontras optimal nama mempelai & kaligrafi doa di area tengah */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(13,11,8,0.72)_0%,rgba(13,11,8,0.45)_52%,transparent_82%)] pointer-events-none z-1" />

      {/* ── LAYER 4: VOLUMETRIC WARM DAMAR / NILAM RADIANCE ── */}
      {/* Pendaran hangat keemasan pelita malam tradisional */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_36%,rgba(245,215,110,0.15)_0%,rgba(212,160,23,0.04)_45%,transparent_72%)] animate-blencong pointer-events-none z-1" />

      {/* ── LAYER 5: AMBIENT MIST DRIFT (LEMBAH SEULAWAH / KRUENG ACEH) ── */}
      <div className="absolute top-[16%] inset-x-0 h-[48%] pointer-events-none z-2 overflow-hidden opacity-45 mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]">
        <div className="w-[200%] h-full flex animate-parahyangan-mist">
          <img
            src="/assets/motion-art-aceh/aceh-valley-mist.webp"
            alt="Aceh Valley Mist 1"
            className="w-1/2 h-full object-cover object-bottom"
          />
          <img
            src="/assets/motion-art-aceh/aceh-valley-mist.webp"
            alt="Aceh Valley Mist 2"
            className="w-1/2 h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* ── LAYER 6: TOP CEILING PINTO LACE VALANCE (RENDAH ATAP EMAS) ── */}
      <div className="absolute top-0 inset-x-0 w-full z-10 pointer-events-none">
        <AcehPintoLace height={56} className="opacity-95" />
      </div>

      {/* ── LAYER 7: BOTTOM STAGE SHADOW ACCENT ── */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0D0B08] via-[#0D0B08]/75 to-transparent pointer-events-none z-3" />
    </div>
  );
}
