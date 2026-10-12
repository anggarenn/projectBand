import { ThemeConfig } from "@/types/theme";
import {
  MegamendungCorner,
  MegamendungDivider,
  SundaSigerEmblem,
  SundaMonogramSeal,
  MegamendungMistCanvas,
  MegamendungNameBorder,
  MegamendungStageBackdrop,
  SundaHeroContent,
} from "@/components/themes/ornaments/sunda";

export const SundaMegamendungPreset: ThemeConfig = {
  id: "sunda-megamendung",
  name: "Sunda Parahyangan Megamendung",
  category: "tradisional",
  variant: "sunda-megamendung",
  colors: {
    primary: "#D4AF37", // Royal Sunda Gold
    accent: "#FFF2D6", // Luminous Pearl Gold
    bgBase: "#0B132B", // Deep Parahyangan Midnight Blue
    bgSurface: "#111D3D", // Solid Card Background
    bgCard: "rgba(17, 29, 61, 0.88)", // Velvet Navy Glass Card
    border: "rgba(212, 175, 55, 0.4)", // Gold Megamendung Border
    textPrimary: "#FFFFFF",
    textSecondary: "#F1F5F9",
    textMuted: "#94A3B8",
    glow: "rgba(212, 175, 55, 0.3)",
    filterClass: "brightness-[0.95] contrast-[1.05]",
    overlayGradient: "bg-gradient-to-b from-[#070D1E]/60 via-transparent to-[#070D1E]/75",
  },
  backgrounds: {
    cover: "/assets/motion-art-sunda/bg-cover-sunda-julangngapak-gold.webp",
    stage: "/assets/motion-art-sunda/bg-stage-sunda-julangngapak-gold.webp",
    bodyTexture: "/assets/motion-art-sunda/bg-megamendung-dark.jpg",
    bankCard: "/assets/motion-art-sunda/bg-sunda-dark-gold.jpg",
  },
  ornaments: {
    Corner: MegamendungCorner,
    Divider: MegamendungDivider,
    Symbol: SundaSigerEmblem,
    MonogramSeal: SundaMonogramSeal,
    CanvasEffect: MegamendungMistCanvas,
    NameBorder: MegamendungNameBorder,
    StageBackdrop: MegamendungStageBackdrop,
    HeroContent: SundaHeroContent,
  },
};
