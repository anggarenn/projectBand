import { ThemeConfig } from "@/types/theme";
import {
  CelestialConstellationCorner,
  CelestialStarDivider,
  CelestialMoonSeal,
  CelestialStarfieldCanvas,
  CelestialHeroContent,
} from "@/components/themes/ornaments/celestial";

export const CelestialTwilightPreset: ThemeConfig = {
  id: "celestial-twilight",
  name: "Celestial Twilight",
  category: "modern",
  variant: "celestial-twilight",
  colors: {
    primary: "#C8B6FF", // Stardust Lavender
    accent: "#F3D082", // Celestial Star Gold
    bgBase: "#080B14", // Deep Midnight Cosmos
    bgSurface: "#0F1527", // Twilight Nebula Surface
    bgCard: "rgba(15, 21, 39, 0.85)", // Glassmorphism Cosmic Card
    border: "rgba(200, 182, 255, 0.20)", // Stardust Lavender Hairline
    textPrimary: "#F8F9FA", // Starlight Diamond White
    textSecondary: "#E2D9FC", // Soft Radiant Lavender
    textMuted: "#8E9AAF", // Cosmic Dust Muted Slate
    glow: "rgba(200, 182, 255, 0.35)", // Lavender Nebula Glow
    filterClass: "",
    overlayGradient: "bg-gradient-to-b from-[#080B14]/85 via-transparent to-[#080B14]/95",
  },
  backgrounds: {
    cover: "/assets/celestial-twilight/bg-cover.webp",
    stage: "/assets/celestial-twilight/bg-stage.webp",
    bankCard: "/assets/celestial-twilight/bg-stage.webp",
  },
  ornaments: {
    Corner: CelestialConstellationCorner,
    Divider: CelestialStarDivider,
    Symbol: CelestialMoonSeal,
    MonogramSeal: CelestialMoonSeal,
    CanvasEffect: CelestialStarfieldCanvas,
    HeroContent: CelestialHeroContent,
  },
};
