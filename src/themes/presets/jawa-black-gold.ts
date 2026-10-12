import { ThemeConfig } from "@/types/theme";
import {
  TraditionalGoldCorner,
  TraditionalGoldHeader,
  AuthenticGununganKayon,
  RoyalMonogramSeal,
  GoldenEmbersCanvas,
  JawaHeroContent,
} from "@/components/themes/ornaments/jawa";

export const JawaBlackGoldPreset: ThemeConfig = {
  id: "jawa-black-gold",
  name: "Jawa Keraton Royal Gold",
  category: "tradisional",
  variant: "black-gold",
  colors: {
    primary: "#C59B3C", // Royal Gold
    accent: "#E5C16C", // Warm Gold
    bgBase: "#12100E", // Obsidian Velvet Black
    bgSurface: "#181411", // Solid Card Background
    bgCard: "rgba(24, 20, 17, 0.9)", // Glass Card
    border: "rgba(197, 155, 60, 0.35)", // Gold Border
    textPrimary: "#FFFFFF",
    textSecondary: "#EAE5DD",
    textMuted: "#A7A29A",
    glow: "rgba(197, 155, 60, 0.25)",
    filterClass: "brightness-[0.82] contrast-[1.18] sepia-[0.24] hue-rotate-[-10deg]",
  },
  backgrounds: {
    videoUrl: "/assets/motion-art-jawa/Final-Fix-Jawa-Black.mp4",
    cover: "/assets/motion-art-jawa/bg-cover-joglo.webp",
    stage: "/assets/motion-art-jawa/bg-stage-joglo.webp",
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
