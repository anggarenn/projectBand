import React from "react";
import { ThemeConfig } from "@/types/theme";
import {
  EmeraldGoldCorner,
  EmeraldGoldDivider,
  EmeraldWaxSeal,
  EmeraldCurtainCanvas,
  EmeraldHeroContent,
} from "@/components/themes/ornaments/emerald-noir";

export const EmeraldVelvetNoirPreset: ThemeConfig = {
  id: "emerald-velvet-noir",
  name: "Emerald Velvet Noir",
  category: "modern",
  variant: "emerald-velvet-noir",
  colors: {
    primary: "#D4AF37", // Metallic Champagne Gold
    accent: "#F3E5AB", // Soft Vanilla Gold Highlight
    bgBase: "#061A14", // Deep Velvet Noir Forest
    bgSurface: "#0D2A20", // Rich Emerald Shadow Box
    bgCard: "rgba(13, 42, 32, 0.92)", // Translucent Velvet Card
    border: "rgba(212, 175, 55, 0.28)", // Hairline Gold Border
    textPrimary: "#F4F6F0", // Crisp Ivory White
    textSecondary: "#E0E8E3", // Soft Sage Off-White
    textMuted: "#8BA398", // Muted Botanical Celadon
    glow: "rgba(212, 175, 55, 0.35)", // Warm Candlelight Shimmer
    filterClass: "",
    overlayGradient: "bg-gradient-to-b from-[#061A14]/80 via-transparent to-[#061A14]/95",
  },
  backgrounds: {
    cover: "/assets/emerald-noir/bg-cover.webp",
    stage: "/assets/motion-art-jawa/bg-stage-joglo-emerald.webp",
    bankCard: "/assets/motion-art-jawa/bg-cover-joglo-emerald.webp",
  },
  ornaments: {
    Corner: EmeraldGoldCorner,
    Divider: EmeraldGoldDivider,
    Symbol: EmeraldWaxSeal,
    MonogramSeal: EmeraldWaxSeal,
    CanvasEffect: EmeraldCurtainCanvas,
    HeroContent: EmeraldHeroContent,
  },
};
