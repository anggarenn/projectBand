import React from "react";
import { ThemeConfig } from "@/types/theme";
import {
  TerracottaCorner,
  TerracottaDivider,
  TerracottaEnvelopeSeal,
  TerracottaHeroContent,
} from "@/components/themes/ornaments/terracotta";

export const TerracottaEarthyMeadowPreset: ThemeConfig = {
  id: "terracotta-earthy-meadow",
  name: "Terracotta Earthy Meadow",
  category: "modern",
  variant: "terracotta-earthy-meadow",
  colors: {
    primary: "#BF573F", // Warm Terracotta Clay
    accent: "#8F3B25", // Deep Rust Umber
    bgBase: "#FAF4EE", // Soft Warm Cream Linen
    bgSurface: "#FFFDFB", // Pure Chalk Ceramic White
    bgCard: "rgba(255, 253, 251, 0.95)", // Tactile Warm Paper Card
    border: "#E3D4C4", // Warm Kraft Paper Border
    textPrimary: "#2D231E", // Roasted Espresso
    textSecondary: "#4A3B32", // Warm Earth Umber
    textMuted: "#857468", // Dried Pampas Muted Gray-Brown
    glow: "rgba(191, 87, 63, 0.25)", // Warm Sunset Clay Glow
    filterClass: "",
    overlayGradient: "bg-gradient-to-b from-[#FAF4EE]/70 via-transparent to-[#FAF4EE]/90",
  },
  backgrounds: {
    cover: "",
    stage: "",
    bankCard: "",
  },
  ornaments: {
    Corner: TerracottaCorner,
    Divider: TerracottaDivider,
    Symbol: TerracottaEnvelopeSeal,
    MonogramSeal: TerracottaEnvelopeSeal,
    HeroContent: TerracottaHeroContent,
  },
};
