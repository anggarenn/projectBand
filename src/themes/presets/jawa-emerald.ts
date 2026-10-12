import { ThemeConfig } from "@/types/theme";
import {
  TraditionalGoldCorner,
  TraditionalGoldHeader,
  AuthenticGununganKayon,
  RoyalMonogramSeal,
  GoldenEmbersCanvas,
  JawaHeroContent,
} from "@/components/themes/ornaments/jawa";

export const JawaEmeraldPreset: ThemeConfig = {
  id: "jawa-emerald",
  name: "Jawa Keraton Emerald Gold",
  category: "tradisional",
  variant: "emerald",
  colors: {
    primary: "#D4AF37",
    accent: "#F3E5AB",
    bgBase: "#09140F", // Deep Emerald
    bgSurface: "#0E1E17",
    bgCard: "rgba(14, 30, 23, 0.9)",
    border: "rgba(212, 175, 55, 0.35)",
    textPrimary: "#FFFFFF",
    textSecondary: "#E2ECE5",
    textMuted: "#8EABA0",
    glow: "rgba(52, 211, 153, 0.25)",
    filterClass: "brightness-[0.85] contrast-[1.15] sepia-[0.35] hue-rotate-[90deg]",
  },
  backgrounds: {
    videoUrl: "/assets/motion-art-jawa/Final-Fix-Jawa-Black.mp4",
    cover: "/assets/motion-art-jawa/bg-cover-joglo-emerald.webp",
    stage: "/assets/motion-art-jawa/bg-stage-joglo-emerald.webp",
    bankCard: "/assets/motion-art-jawa/bg-bank.webp",
  },
  ornaments: {
    Corner: TraditionalGoldCorner,
    Divider: TraditionalGoldHeader,
    Symbol: AuthenticGununganKayon,
    MonogramSeal: RoyalMonogramSeal,
    CanvasEffect: GoldenEmbersCanvas,
    HeroContent: JawaHeroContent,
  },
};
