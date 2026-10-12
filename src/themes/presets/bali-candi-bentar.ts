import { ThemeConfig } from "@/types/theme";
import {
  BaliPatraCorner,
  BaliPatraDivider,
  BaliGelunganEmblem,
  BaliNameBorder,
  BaliStageBackdrop,
  BaliHeroContent,
  BaliFirefliesCanvas,
} from "@/components/themes/ornaments/bali";

export const BaliCandiBentarPreset: ThemeConfig = {
  id: "bali-candi-bentar",
  name: "Bali Royal Candi Bentar",
  category: "tradisional",
  variant: "bali-candi-bentar",
  colors: {
    primary: "#D4AF37", // Royal Balinese Gold
    accent: "#FDE68A", // Luminous Temple Gold
    bgBase: "#0F0C1B", // Deep Sacred Temple Night
    bgSurface: "#191528", // Solid Card Background
    bgCard: "rgba(25, 21, 40, 0.90)", // Obsidian Glass Card
    border: "rgba(212, 175, 55, 0.4)", // Balinese Gold Border
    textPrimary: "#FFFFFF",
    textSecondary: "#FDFBF7",
    textMuted: "#BFA59F",
    glow: "rgba(212, 175, 55, 0.35)",
    filterClass: "brightness-[0.95] contrast-[1.05]",
    overlayGradient: "bg-gradient-to-b from-[#0F0C1B]/60 via-transparent to-[#0F0C1B]/80",
  },
  backgrounds: {
    cover: "/assets/motion-art-bali/bg-cover-bali-candibentar.webp",
    stage: "/assets/motion-art-bali/bg-stage-bali-candibentar.webp",
    bodyTexture: "/assets/motion-art-bali/bg-stage-bali-candibentar.webp",
    bankCard: "/assets/motion-art-jawa/bg-bank.webp",
  },
  ornaments: {
    Corner: BaliPatraCorner,
    Divider: BaliPatraDivider,
    Symbol: BaliGelunganEmblem,
    MonogramSeal: BaliGelunganEmblem as any,
    CanvasEffect: BaliFirefliesCanvas,
    NameBorder: BaliNameBorder,
    StageBackdrop: BaliStageBackdrop,
    HeroContent: BaliHeroContent,
  },
};
