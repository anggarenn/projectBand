import { ThemeConfig } from "@/types/theme";
import {
  AcehPintoLace,
  AcehBungongEmblem,
  AcehStageBackdrop,
  AcehNameBorder,
  AcehHeroContent,
  AcehFiligreeCorner,
} from "@/components/themes/ornaments/aceh";

export const AcehBlackHeritagePreset: ThemeConfig = {
  id: "aceh-black-heritage",
  name: "Aceh Black Heritage",
  category: "tradisional",
  variant: "aceh-black-heritage",
  colors: {
    primary: "#D4AF37", // Pure Royal Gold / Emas Kencana Kasab
    accent: "#F5D76E", // Luminous Gold Shimmer / Permata Putik
    bgBase: "#0A0A0A", // Obsidian Charcoal / Arang Hitam Pekat
    bgSurface: "#141414", // Solid Card Background / Beludru Hitam
    bgCard: "rgba(18, 16, 14, 0.90)", // Obsidian Glass Card
    border: "rgba(212, 175, 55, 0.38)", // Kasab Gold Hairline Border
    textPrimary: "#FFFFFF",
    textSecondary: "#F4EFE6",
    textMuted: "#A39E93",
    glow: "rgba(212, 175, 55, 0.35)",
    filterClass: "brightness-[0.88] contrast-[1.12]",
    overlayGradient: "bg-gradient-to-b from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/85",
  },
  backgrounds: {
    cover: "/assets/motion-art-aceh/bg-cover-aceh-krongbade.webp",
    stage: "/assets/motion-art-aceh/bg-stage-aceh-krongbade.webp",
    bodyTexture: "/assets/motion-art-aceh/bg-stage-aceh-krongbade.webp",
    bankCard: "/assets/motion-art-jawa/bg-bank.webp",
  },
  fonts: {
    display: "var(--font-cormorant), 'Cinzel', serif",
    serif: "var(--font-serif), 'Cormorant Garamond', serif",
    script: "var(--font-script), 'Pinyon Script', cursive",
    sans: "var(--font-sans), 'Plus Jakarta Sans', sans-serif",
  },
  ornaments: {
    Corner: AcehFiligreeCorner,
    Divider: AcehPintoLace as any,
    Symbol: AcehBungongEmblem,
    MonogramSeal: AcehBungongEmblem as any,
    StageBackdrop: AcehStageBackdrop,
    NameBorder: AcehNameBorder,
    HeroContent: AcehHeroContent,
  },
};
