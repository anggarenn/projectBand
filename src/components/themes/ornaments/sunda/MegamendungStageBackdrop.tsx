"use client";

import React from "react";

interface MegamendungStageBackdropProps {
  className?: string;
  stageFallback?: string;
  isOpen?: boolean;
  isOpening?: boolean;
  videoUrl?: string;
  variant?: string;
}

/**
 * MegamendungStageBackdrop
 * Konsep:
 * - Sunda Vintage: Native Motion Video Folkinvitation Parahyangan (Frame etsa, butterflies, & parchment).
 * - Sunda Midnight Gold: Theatrical Cloud Parting Reveal khas Parahyangan (Rumah Julang Ngapak & Awan Megamendung).
 */
export function MegamendungStageBackdrop({
  className = "",
  stageFallback = "/assets/motion-art-sunda/bg-stage-sunda-julangngapak-gold.webp",
  isOpen,
  isOpening,
  videoUrl,
  variant,
}: MegamendungStageBackdropProps) {
  // Sync dengan siklus pembukaan undangan:
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  // Deteksi varian Sunda Vintage
  const isVintage =
    variant === "sunda-vintage" ||
    stageFallback?.includes("vintage") ||
    stageFallback?.includes("sepia");

  // MODE 1: NATIVE VIDEO MOTION FOLKINVITATION (SUNDA VINTAGE)
  if (isVintage) {
    const videoSrc = videoUrl || "/assets/motion-art-sunda/Motionn-Cultur-Sunda.mp4";
    const posterSrc =
      stageFallback || "/assets/motion-art-sunda/fallback-vintage-motion-sundaa.webp";

    return (
      <div
        key={isRevealed ? "stage-revealed-vintage" : "stage-idle-vintage"}
        className={`absolute inset-0 pointer-events-none overflow-hidden ${className} z-0`}
      >
        {/* Native Folkinvitation Video Motion Art */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          src={videoSrc}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Subtle Warm Sepia Atmosphere Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B1709]/15 via-transparent to-[#2B1709]/30 pointer-events-none z-1" />
      </div>
    );
  }

  // MODE 2: THEATRICAL ARCHITECTURE (SUNDA MIDNIGHT NAVY GOLD)
  const isVideo = Boolean(videoUrl || stageFallback?.match(/\.(mp4|webm)$/i));
  const videoSrc = videoUrl || (stageFallback?.match(/\.(mp4|webm)$/i) ? stageFallback : undefined);
  const webpFallback = !stageFallback?.match(/\.(mp4|webm)$/i)
    ? stageFallback
    : "/assets/motion-art-sunda/bg-stage-sunda-julangngapak.webp";

  return (
    <div
      key={isRevealed ? "stage-revealed" : "stage-idle"}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className} z-0`}
    >
      {/* ── LAYER 1: Clean Backdrop (Rumah Julang Ngapak Emas + Sawah Terasering / Video) ── */}
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
              alt="Panggung Sunda Julang Ngapak Megamendung"
              className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
            />
          </video>
        ) : (
          <img
            src={webpFallback}
            alt="Panggung Sunda Julang Ngapak Megamendung"
            className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
          />
        )}
      </div>

      {/* ── LAYER 2: Atmosphere Gradients & Parahyangan Golden Mist ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070D1E]/45 via-transparent to-[#070D1E]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.16)_0%,transparent_60%)] animate-blencong pointer-events-none" />

      {/* Parahyangan Mist / Golden Haze (Looping lembut di latar pegunungan & terasering) */}
      <div className="absolute top-[20%] inset-x-0 h-[42%] pointer-events-none z-1 overflow-hidden opacity-80 mix-blend-screen">
        <div className="w-[200%] h-full flex animate-parahyangan-mist">
          <img
            src="/assets/motion-art-sunda/parahyangan-mist-golden-haze.webp"
            alt="Parahyangan Mist Layer 1"
            className="w-1/2 h-full object-cover object-bottom"
          />
          <img
            src="/assets/motion-art-sunda/parahyangan-mist-golden-haze.webp"
            alt="Parahyangan Mist Layer 2"
            className="w-1/2 h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* ── LAYER 3: SAYAP AWAN MEGAMENDUNG (Theatrical Cloud Parting Reveal) ── */}
      {isRevealed && (
        <>
          {/* ── KANOPI ATAS MEGAMENDUNG (Symmetrical Theatrical Arch) ── */}
          <div className="absolute -top-16 sm:-top-20 inset-x-0 flex justify-center pointer-events-none z-20">
            <div
              className="w-[92%] max-w-[460px] animate-canopy-descend-y will-change-transform"
              style={{ animationDelay: "0.15s", opacity: 0, animationFillMode: "forwards" }}
            >
              <img
                src="/assets/motion-art-sunda/extracted/cloud-canopy-top-symmetrical.webp"
                alt="Megamendung Symmetrical Crown Top"
                className="w-full h-auto"
                style={{ filter: "brightness(1.05) drop-shadow(0 8px 24px rgba(7,13,30,0.8))" }}
              />
            </div>
          </div>

          {/* ── TIER 1: SAYAP AWAN SAMPING ATAS (Panah Merah Reno - Zona top-[30%]) ── */}
          {/* Sayap Awan Kiri Atas: Memeluk dari tepi kiri luar di atas kartu nama */}
          <div
            className="absolute top-[30%] -left-3 w-[22%] max-w-[95px] animate-curtain-wing-left pointer-events-none will-change-transform z-15 opacity-90"
            style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src="/assets/motion-art-sunda/extracted/cloud-flank-left.webp"
              alt="Sayap Kiri Atas Megamendung"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(3px 6px 14px rgba(7,13,30,0.75))" }}
            />
          </div>

          {/* Sayap Awan Kanan Atas: Memeluk dari tepi kanan luar di atas kartu nama (Mirrored) */}
          <div
            className="absolute top-[30%] -right-3 w-[22%] max-w-[95px] animate-curtain-wing-right pointer-events-none will-change-transform z-15 opacity-90"
            style={{ animationDelay: "0.25s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src="/assets/motion-art-sunda/extracted/cloud-flank-left.webp"
              alt="Sayap Kanan Atas Megamendung"
              className="w-full h-auto scale-x-[-1]"
              style={{ filter: "drop-shadow(-3px 6px 14px rgba(7,13,30,0.75))" }}
            />
          </div>

          {/* ── TIER 2: SAYAP AWAN SAMPING BAWAH (Calibrated Lower Flanks - Zona top-[55%]) ── */}
          {/* Sayap Awan Kiri Bawah: Sejajar di sisi kiri kartu nama */}
          <div
            className="absolute top-[55%] -left-3 w-[18%] max-w-[90px] animate-cloud-curtain-left-lower pointer-events-none will-change-transform z-15 opacity-85"
            style={{ animationDelay: "0.35s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src="/assets/motion-art-sunda/extracted/cloud-flank-left.webp"
              alt="Sayap Kiri Bawah Megamendung"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(3px 6px 14px rgba(7,13,30,0.7))" }}
            />
          </div>

          {/* Sayap Awan Kanan Bawah: 100% Simetris menggunakan mirrored asset */}
          <div
            className="absolute top-[55%] -right-3 w-[18%] max-w-[90px] animate-cloud-curtain-right-lower pointer-events-none will-change-transform z-15 opacity-85"
            style={{ animationDelay: "0.35s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src="/assets/motion-art-sunda/extracted/cloud-flank-left.webp"
              alt="Sayap Kanan Bawah Megamendung"
              className="w-full h-auto scale-x-[-1]"
              style={{ filter: "drop-shadow(-3px 6px 14px rgba(7,13,30,0.7))" }}
            />
          </div>

          {/* ── BUNGA PASUNDAN SUDUT BAWAH (Stage 2 Reveal Blooms) ── */}
          {/* Bunga Sudut Kiri Bawah: Meluncur mekar dari sudut kiri bawah */}
          <div
            className="absolute -bottom-2 -left-2 w-[32%] max-w-[145px] animate-floral-bloom-left pointer-events-none will-change-transform z-16"
            style={{ animationDelay: "0.55s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src={
                stageFallback?.includes("sepia")
                  ? "/assets/motion-art-sunda/sunda-floral-left-sepia.webp"
                  : "/assets/motion-art-sunda/sunda-floral-left.webp"
              }
              alt="Bunga Pasundan Bawah Kiri"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(2px 6px 16px rgba(7,13,30,0.85))" }}
            />
          </div>

          {/* Bunga Sudut Kanan Bawah: Meluncur mekar dari sudut kanan bawah */}
          <div
            className="absolute -bottom-2 -right-2 w-[32%] max-w-[145px] animate-floral-bloom-right pointer-events-none will-change-transform z-16"
            style={{ animationDelay: "0.68s", opacity: 0, animationFillMode: "forwards" }}
          >
            <img
              src={
                stageFallback?.includes("sepia")
                  ? "/assets/motion-art-sunda/sunda-floral-right-sepia.webp"
                  : "/assets/motion-art-sunda/sunda-floral-right.webp"
              }
              alt="Bunga Pasundan Bawah Kanan"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(-2px 6px 16px rgba(7,13,30,0.85))" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
