import React from "react";

export interface ThemeColorTokens {
  primary: string; // Accent/Gold utama, e.g. #C59B3C
  accent: string; // Highlight terang, e.g. #E5C16C
  bgBase: string; // Latar belakang utama, e.g. #12100E
  bgSurface: string; // Latar card solid, e.g. #181411
  bgCard: string; // Latar card transparan/backdrop, e.g. rgba(24, 20, 17, 0.9)
  border: string; // Garis border aksen, e.g. rgba(197, 155, 60, 0.35)
  textPrimary: string; // Teks utama / judul, e.g. #FFFFFF
  textSecondary: string; // Teks isi, e.g. #EAE5DD
  textMuted: string; // Teks sekunder / muted, e.g. #A7A29A
  glow: string; // Bayangan pendar, e.g. rgba(197, 155, 60, 0.25)
  filterClass?: string; // Filter CSS tailwind untuk gambar background, e.g. "sepia-[0.24] hue-rotate-[-10deg]"
  overlayGradient?: string; // Overlay gradasi custom untuk motion backdrop (opsional)
}

export interface ThemeBackgrounds {
  cover: string;
  stage: string;
  lace?: string;
  bodyTexture?: string;
  bankCard?: string;
  videoUrl?: string;
  coverVideoUrl?: string;
}

export interface ThemeOrnaments {
  Corner: React.ComponentType<{ className?: string; src?: string; [key: string]: any }>;
  Divider: React.ComponentType<{ className?: string; src?: string; [key: string]: any }>;
  Symbol: React.ComponentType<{ className?: string; src?: string; [key: string]: any }>;
  MonogramSeal: React.ComponentType<{ initials: string; subtitle?: string; className?: string }>;
  CanvasEffect?: React.ComponentType<{ className?: string }>;
  StageBackdrop?: React.ComponentType<{
    className?: string;
    stageFallback?: string;
    isOpen?: boolean;
    isOpening?: boolean;
    videoUrl?: string;
    variant?: string;
  }>;
  NameBorder?: React.ComponentType<{
    children: React.ReactNode;
    className?: string;
    isOpen?: boolean;
    isOpening?: boolean;
  }>;
  HeroContent?: React.ComponentType<{
    data: any;
    timeLeft: { days: number; hours: number; minutes: number; seconds: number };
    formatDate: (dateStr?: string, dayName?: string) => string;
    isOpen?: boolean;
    isOpening?: boolean;
    onScrollDown: () => void;
    theme?: ThemeConfig;
  }>;
}

export interface ThemeFonts {
  display?: string;
  serif?: string;
  script?: string;
  sans?: string;
  [key: string]: string | undefined;
}

export interface ThemeConfig {
  id: string;
  name: string;
  category: "tradisional" | "modern" | "islami";
  variant: string;
  colors: ThemeColorTokens;
  backgrounds: ThemeBackgrounds;
  ornaments: ThemeOrnaments;
  fonts?: ThemeFonts;
}
