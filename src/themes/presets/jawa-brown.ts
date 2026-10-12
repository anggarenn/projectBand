import { ThemeConfig } from "@/types/theme";
import {
  TraditionalGoldCorner,
  TraditionalGoldHeader,
  AuthenticGununganKayon,
  RoyalMonogramSeal,
  GoldenEmbersCanvas,
  JawaHeroContent,
} from "@/components/themes/ornaments/jawa";

export const JawaBrownPreset: ThemeConfig = {
  id: "jawa-brown",
  name: "Jawa Brown Folk Heritage",
  category: "tradisional",
  variant: "brown",
  colors: {
    primary: "#5C3410", // Rich Warm Javanese Wood Brown (rgb(92, 52, 16))
    accent: "#8B4E17", // Warm Bronze Amber (rgb(139, 78, 23))
    bgBase: "#EDE5DB", // Antique Sepia Cream Botanical
    bgSurface: "#FFF9F6", // Cream White Card Surface
    bgCard: "rgba(255, 249, 246, 0.90)", // Semi-translucent Cream Card
    border: "#5C3410", // 3px / 4px Signature Brown Border
    textPrimary: "#1A140E", // Deep Charcoal Brown
    textSecondary: "#4A3B32", // Medium Warm Earth Brown
    textMuted: "#7A6B62", // Muted Sepia Brown
    glow: "rgba(92, 52, 16, 0.15)",
    filterClass: "sepia-[0.18] contrast-[1.05]",
  },
  backgrounds: {
    cover: "/assets/motion-art-jawa/bg-cover-joglo.webp",
    stage: "/assets/motion-art-jawa/folk-bg-3.webp",
    bodyTexture: "/assets/motion-art-jawa/folk-bg-3.webp",
    bankCard: "/assets/motion-art-jawa/folk-bg-bank.webp",
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
