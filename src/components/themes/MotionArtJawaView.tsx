"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { InvitationData } from "@/types/invitation";
import { ThemeConfig } from "@/types/theme";
import { getThemePreset } from "@/themes/presets";
import { ThemeContainer } from "@/themes/ThemeContainer";

// Re-export ornamen untuk backward-compatibility (ThemeGallery, demo page, dashboard, dll)
export {
  AuthenticGununganKayon,
  GununganIcon,
  TraditionalGoldCorner,
  TraditionalGoldHeader,
  WayangKawungBorderBand,
  RoyalMonogramSeal,
  GoldenEmbersCanvas,
  MotionVideoBackdrop,
} from "@/components/themes/ornaments/jawa";

import {
  CoverScreen,
  BottomNav,
  FloatingAudio,
  getActiveSections,
  SectionId,
  SectionDefinition,
  DEFAULT_SECTION_ORDER,
} from "@/components/themes/sections";

export interface MotionArtJawaViewProps {
  data: InvitationData;
  guestName?: string;
  isEmbedded?: boolean;
  themeConfig?: ThemeConfig;
  variant?: string; // e.g. "black-gold" | "emerald"
  sectionOrder?: SectionId[];
}

export default function MotionArtJawaView({
  data,
  guestName = "Bpk. Hendra Gunawan & Keluarga",
  isEmbedded = false,
  themeConfig,
  variant = "jawa-black-gold",
  sectionOrder,
}: MotionArtJawaViewProps) {
  // Resolve active theme configuration (Black-Gold, Emerald, atau custom)
  const theme = themeConfig || getThemePreset(variant);

  // Resolve dynamic active sections list
  const activeSections = useMemo(
    () => getActiveSections(sectionOrder || DEFAULT_SECTION_ORDER, data),
    [sectionOrder, data]
  );

  // State Cover Screen
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [isOpening, setIsOpening] = useState(false);

  // Audio Control
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Active Nav Section & Scroll Spy
  const [activeSection, setActiveSection] = useState("hero");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isProgrammaticScroll = useRef(false);

  // Scroll Spy: Update activeSection saat user scrolling
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isOpen) return;

    const checkpoints = [
      { domId: "hero", navId: "hero" },
      { domId: "salam", navId: "mempelai" },
      { domId: "mempelai", navId: "mempelai" },
      { domId: "acara", navId: "acara" },
      { domId: "dresscode", navId: data.dressCode ? "dresscode" : "acara" },
      { domId: "cerita", navId: "mempelai" },
      { domId: "galeri", navId: "galeri" },
      { domId: "kado", navId: "kado" },
      { domId: "ucapan", navId: "ucapan" },
    ];

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      const isWindow = container.scrollHeight <= container.clientHeight;
      const isAtBottom = isWindow
        ? window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60
        : container.scrollHeight - container.scrollTop <= container.clientHeight + 60;

      if (isAtBottom) {
        setActiveSection("ucapan");
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const triggerPoint = isWindow
        ? window.innerHeight * 0.35
        : containerRect.top + container.clientHeight * 0.35;

      let currentNav = "hero";
      for (const cp of checkpoints) {
        const el = document.getElementById(cp.domId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint) {
            currentNav = cp.navId;
          }
        }
      }

      setActiveSection((prev) => (prev !== currentNav ? currentNav : prev));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, data.dressCode]);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const backgroundAudioUrl =
    data.musicUrl ||
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=asian-traditional-instrumental-112191.mp3";

  // Hitung Countdown
  useEffect(() => {
    const mainEventDate = data.events[0]?.date || "2026-03-07";
    const mainEventTime = data.events[0]?.startTime || "09:00";
    const target = new Date(`${mainEventDate}T${mainEventTime}:00`);

    const updateCountdown = () => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [data.events]);

  // Handle Buka Undangan & Autoplay Audio
  const handleOpenInvitation = () => {
    setIsOpening(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 1250);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Navigasi Section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    isProgrammaticScroll.current = true;
    const element = document.getElementById(sectionId);
    if (!element) {
      isProgrammaticScroll.current = false;
      return;
    }
    const scrollContainer =
      scrollContainerRef.current || (element.closest(".overflow-y-auto") as HTMLElement | null);
    if (scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();
      const relativeTop = elemRect.top - containerRect.top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({ top: relativeTop - 10, behavior: "smooth" });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  };

  // Format tanggal acara ke bahasa Indonesia elegan
  const formatEventDate = (dateStr?: string, dayName?: string) => {
    if (!dateStr) return "Sabtu, 7 Maret 2026";
    try {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const months = [
          "Januari", "Februari", "Maret", "April", "Mei", "Juni",
          "Juli", "Agustus", "September", "Oktober", "November", "Desember",
        ];
        const day = parseInt(parts[2], 10);
        const month = months[parseInt(parts[1], 10) - 1] || parts[1];
        const year = parts[0];
        return `${dayName ? `${dayName}, ` : ""}${day} ${month} ${year}`;
      }
    } catch {}
    return `${dayName ? `${dayName}, ` : ""}${dateStr}`;
  };

  return (
    <ThemeContainer
      theme={theme}
      className={`h-screen w-full font-sans antialiased selection:bg-[var(--theme-primary)] selection:text-[var(--theme-bg-base)] flex justify-center items-center overflow-hidden ${
        theme.id === "terracotta-earthy-meadow" ? "text-[#2D231E]" : "text-[#EAE5DD]"
      }`}
    >
      {/* Background Audio Element */}
      <audio ref={audioRef} src={backgroundAudioUrl} loop preload="auto" />

      {/* PHONE FRAME */}
      <div className="relative w-full max-w-[480px] h-screen shadow-2xl overflow-hidden border-x border-[var(--theme-border)] bg-[var(--theme-bg-base)] flex flex-col">
        {/* 1. COVER SCREEN (Pinned inside phone frame) */}
        <CoverScreen
          theme={theme}
          data={data}
          guestName={guestName}
          isOpen={isOpen}
          isOpening={isOpening}
          isEmbedded={true}
          onOpen={handleOpenInvitation}
          formatDate={formatEventDate}
        />

        {/* 2. FLOATING AUDIO CONTROLLER (Pinned top-right inside phone frame) */}
        <FloatingAudio
          theme={theme}
          isOpen={isOpen}
          isPlaying={isPlaying}
          onToggle={toggleMusic}
          className="absolute top-4 right-4 z-40 w-11 h-11 rounded-full border flex items-center justify-center shadow-xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
        />

        {/* 3. SCROLLABLE CONTENT */}
        <div
          id="invitation-scroll-container"
          ref={scrollContainerRef}
          className="h-full overflow-y-auto scroll-smooth scrollbar-none"
        >
          <main className="relative z-10 min-h-screen pb-28 bg-[var(--theme-bg-base)]">
            {/* Ambient Body Texture if configured */}
            {theme.backgrounds.bodyTexture && (
              <div
                className={`absolute inset-0 pointer-events-none z-0 ${
                  theme.id === "sunda-vintage" || theme.id === "terracotta-earthy-meadow"
                    ? "opacity-35 mix-blend-multiply bg-repeat bg-top"
                    : "opacity-[0.06] mix-blend-screen bg-repeat"
                }`}
                style={{
                  backgroundImage: `url(${theme.backgrounds.bodyTexture})`,
                  backgroundSize: theme.id === "sunda-vintage" ? "100% auto" : "320px 320px",
                }}
              />
            )}
            {/* DYNAMIC MODULAR SECTIONS MAPPING */}
            {activeSections.map((section: SectionDefinition) => {
              const Component = section.component;
              return (
                <Component
                  key={section.id}
                  theme={theme}
                  data={data}
                  timeLeft={timeLeft}
                  formatDate={formatEventDate}
                  onScrollDown={() => scrollToSection("salam")}
                  activeSection={activeSection}
                  isOpen={isOpen}
                  isOpening={isOpening}
                />
              );
            })}
          </main>
        </div>

        {/* 4. STANDALONE FLOATING BOTTOM DOCK (Pinned bottom-center inside phone frame) */}
        <BottomNav
          theme={theme}
          isOpen={isOpen}
          activeSection={activeSection}
          onNavigate={scrollToSection}
          hasDressCode={Boolean(data.dressCode)}
          hasGallery={Boolean(data.gallery && data.gallery.length > 0)}
          hasGifts={Boolean(data.bankAccounts?.length || data.physicalGift)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[420px] transition-all pointer-events-auto"
        />
      </div>
    </ThemeContainer>
  );
}
