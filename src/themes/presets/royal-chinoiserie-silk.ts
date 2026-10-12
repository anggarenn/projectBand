import { ThemeConfig } from "@/types/theme";
import {
  PeonyCorner,
  LatticeDivider,
  ShuangXiSeal,
  MoonGate,
  PetalsCanvas,
  HeroContent,
} from "@/components/themes/ornaments/chinoiserie";

export const RoyalChinoiserieSilkPreset: ThemeConfig = {
  id: "royal-chinoiserie-silk",
  name: "Royal Chinoiserie Silk",
  category: "tradisional",
  variant: "royal-chinoiserie-silk",
  colors: {
    primary: "#D4AF37", // Imperial Gold
    accent: "#E6C65C", // Soft Silk Gold
    bgBase: "#3B080C", // Deep Imperial Wine Silk
    bgSurface: "#5C131A", // Crimson Ruby Shadow Box
    bgCard: "rgba(92, 19, 26, 0.85)", // Red Silk Translucent Bento Card
    border: "rgba(212, 175, 55, 0.3)", // Golden Lattice Hairline
    textPrimary: "#FAF7F0", // Crisp Parchment Silk White
    textSecondary: "#FAF7F0", // Parchment Silk Off-White
    textMuted: "#D1A7A0", // Rose Blush Muted Accent
    glow: "rgba(212, 175, 55, 0.35)", // Imperial Gold Candlelight Glow
    filterClass: "brightness-[0.85] contrast-[1.1]",
    overlayGradient: "bg-gradient-to-b from-[#3B080C]/85 via-transparent to-[#3B080C]/95",
  },
  backgrounds: {
    cover: "/assets/chinoiserie/bg-cover.webp",
    stage: "/assets/chinoiserie/bg-stage.webp",
    bankCard: "/assets/chinoiserie/bg-cover.webp",
  },
  ornaments: {
    Corner: PeonyCorner,
    Divider: LatticeDivider,
    Symbol: ShuangXiSeal,
    MonogramSeal: ShuangXiSeal,
    CanvasEffect: PetalsCanvas,
    HeroContent: HeroContent,
    StageBackdrop: MoonGate,
  },
};
