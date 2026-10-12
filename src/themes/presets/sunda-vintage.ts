import { ThemeConfig } from "@/types/theme";
import {
  MegamendungCorner,
  MegamendungDivider,
  SundaSigerEmblem,
  SundaMonogramSeal,
  MegamendungMistCanvas,
  MegamendungNameBorder,
  SundaVintageHeroContent,
  SundaVintageDivider,
} from "@/components/themes/ornaments/sunda";

export const SundaVintagePreset: ThemeConfig = {
  id: "sunda-vintage",
  name: "Sunda Vintage Folk Parahyangan",
  category: "tradisional",
  variant: "sunda-vintage",
  colors: {
    primary: "#5C3410", // Warm Mahogany
    accent: "#8B4E17", // Warm Amber
    bgBase: "#EDE5DB", // Antique Sepia Cream
    bgSurface: "#FFF9F6", // Cream White Card Surface
    bgCard: "rgba(255, 249, 246, 0.90)", // Semi-translucent Cream Card
    border: "#5C3410", // Signature Brown Border
    textPrimary: "#1A140E", // Deep Charcoal Brown
    textSecondary: "#4A3B32", // Medium Warm Earth Brown
    textMuted: "#7A6B62", // Muted Sepia Brown
    glow: "rgba(92, 52, 16, 0.15)",
    filterClass: "",
    overlayGradient: "bg-gradient-to-b from-[#2B1709]/15 via-transparent to-[#2B1709]/30",
  },
  backgrounds: {
    cover: "/assets/motion-art-sunda/bg-cover-vintage-sunda.webp",
    stage: "/assets/motion-art-sunda/fallback-vintage-motion-sundaa.webp",
    bodyTexture: "/assets/motion-art-sunda/bg-fixed-sunda-etching.webp",
    bankCard: "/assets/motion-art-sunda/bg-sunda-dark-gold.jpg",
    videoUrl: "/assets/motion-art-sunda/Motionn-Cultur-Sunda.mp4",
  },
  ornaments: {
    Corner: () => null, // Arch etsa & bunga mekar sudah ter-render langsung di dalam video motion
    Divider: SundaVintageDivider,
    Symbol: SundaSigerEmblem,
    MonogramSeal: SundaMonogramSeal,
    CanvasEffect: () => null, // Pada mode vintage etsa, video motion sudah memiliki partikel kupu-kupu alami
    NameBorder: MegamendungNameBorder,
    HeroContent: SundaVintageHeroContent,
  },
};
