"use client";

import React from "react";

import { MinangSongketLace } from "./MinangSongketLace";

interface MinangStageBackdropProps {
  className?: string;
  stageFallback?: string;
  isOpen?: boolean;
  isOpening?: boolean;
  videoUrl?: string;
  variant?: string;
}

/**
 * MinangStageBackdrop
 * Konsep: Majestic Rumah Gadang Gonjong Reveal & Highland Mist khas Minangkabau
 * dengan Anatomi Mewah Folk Invitation Aceh/Minang:
 * - Top Header: Songket Lace Border filigree emas murni (kerancang Pandai Sikek)
 * - Backdrop: Rumah Adat megah gaya engraving/lithograph dengan tebing & bukit
 * - Suasana: Kabut sejuk Bukittinggi berarak lembut & pendaran damar hangat
 * - Bebas dari ornamen kaku, busur sirkus, atau elemen tali gantung janggal
 */
export function MinangStageBackdrop({
  className = "",
  stageFallback = "/assets/motion-art-minang/bg-stage-minang-rumahgadang.webp",
  isOpen,
  isOpening,
  videoUrl,
}: MinangStageBackdropProps) {
  // Sync dengan alur pembukaan panggung (terpicu saat isOpen / isOpening bernilai true)
  const isRevealed =
    isOpen === undefined && isOpening === undefined ? true : Boolean(isOpen || isOpening);

  const isVideo = Boolean(videoUrl || stageFallback?.match(/\.(mp4|webm)$/i));
  const videoSrc = videoUrl || (stageFallback?.match(/\.(mp4|webm)$/i) ? stageFallback : undefined);
  const webpFallback = !stageFallback?.match(/\.(mp4|webm)$/i)
    ? stageFallback
    : "/assets/motion-art-minang/bg-stage-minang-rumahgadang.webp";

  return (
    <div
      key={isRevealed ? "minang-stage-revealed" : "minang-stage-idle"}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className} z-0`}
    >
      {/* ── LAYER 1: Clean Backdrop (Majestic Rumah Gadang Gonjong Engraving/Lithograph / Video) ── */}
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
              alt="Panggung Rumah Gadang Minangkabau"
              className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
            />
          </video>
        ) : (
          <img
            src={webpFallback}
            alt="Panggung Rumah Gadang Minangkabau"
            className="w-full h-full object-cover object-bottom animate-kenburns-subtle"
          />
        )}
      </div>

      {/* ── LAYER 2: Sacred Marawa Atmosphere Gradients & Soft Damar Radiance ── */}
      {/* Deep Charcoal & Velvet Marawa Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0C09]/75 via-[#0F0C09]/25 to-[#0F0C09]/95 pointer-events-none" />

      {/* Top Header Scrim Shade (Menyempurnakan kontras renda songket) */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#0F0C09]/85 via-[#0F0C09]/40 to-transparent pointer-events-none z-1" />

      {/* Teplok / Lampu Damar Volumetric Warm Amber Radiance (Pendaran hangat lampu minyak tradisi) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,181,69,0.18)_0%,rgba(212,160,23,0.05)_45%,transparent_72%)] animate-blencong pointer-events-none" />

      {/* ── LAYER 3: HIGHLAND MIST BUKITTINGGI (Berarak lembut di latar Lembah Harau & Bukittinggi) ── */}
      <div className="absolute top-[18%] inset-x-0 h-[46%] pointer-events-none z-2 overflow-hidden opacity-50 mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]">
        <div className="w-[200%] h-full flex animate-parahyangan-mist">
          <img
            src="/assets/motion-art-minang/minang-highland-mist.webp"
            alt="Minang Highland Mist 1"
            className="w-1/2 h-full object-cover object-bottom"
          />
          <img
            src="/assets/motion-art-minang/minang-highland-mist.webp"
            alt="Minang Highland Mist 2"
            className="w-1/2 h-full object-cover object-bottom"
          />
        </div>
      </div>

      {/* ── LAYER 4: TOP HEADER SONGKET LACE BORDER (FILIGREE EMAS HALUS) ── */}
      <div className="absolute top-0 inset-x-0 w-full z-10 pointer-events-none">
        <MinangSongketLace height={56} className="opacity-95" />
      </div>

      {/* ── LAYER 5: BOTTOM STAGE MARAWA SHADOW ACCENT ── */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#0F0C09] via-[#0F0C09]/70 to-transparent pointer-events-none z-3" />
    </div>
  );
}
