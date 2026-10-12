import { ThemeConfig } from "@/types/theme";
import {
  MinangGonjongCorner,
  MinangPucukRebungDivider,
  MinangSuntiangEmblem,
  MinangNameBorder,
  MinangStageBackdrop,
  MinangHeroContent,
} from "@/components/themes/ornaments/minang";

export const MinangRumahGadangPreset: ThemeConfig = {
  id: "minang-rumah-gadang",
  name: "Minangkabau Rumah Gadang",
  category: "tradisional",
  variant: "minang-rumah-gadang",
  colors: {
    primary: "#E5A93C", // Royal Minang Songket Gold
    accent: "#FDE047", // Glowing Kembang Goyang Yellow
    bgBase: "#120808", // Deep Midnight Burgundy
    bgSurface: "#220F12", // Velvet Burgundy Surface
    bgCard: "rgba(34, 15, 18, 0.90)", // Deep Marawa Glass
    border: "rgba(229, 169, 60, 0.4)", // Filigree Gold Border
    textPrimary: "#FFFFFF",
    textSecondary: "#FDFBF7",
    textMuted: "#BFA59F",
    glow: "rgba(229, 169, 60, 0.35)",
    filterClass: "brightness-[0.95] contrast-[1.05]",
    overlayGradient: "bg-gradient-to-b from-[#120808]/60 via-transparent to-[#120808]/80",
  },
  backgrounds: {
    cover: "/assets/motion-art-minang/bg-cover-minang-rumahgadang.webp",
    stage: "/assets/motion-art-minang/bg-stage-minang-rumahgadang.webp",
    bodyTexture: "/assets/motion-art-minang/bg-stage-minang-rumahgadang.webp",
    bankCard: "/assets/motion-art-jawa/bg-bank.webp",
  },
  ornaments: {
    Corner: MinangGonjongCorner,
    Divider: MinangPucukRebungDivider,
    Symbol: MinangSuntiangEmblem,
    MonogramSeal: MinangSuntiangEmblem as any,
    NameBorder: MinangNameBorder,
    StageBackdrop: MinangStageBackdrop,
    HeroContent: MinangHeroContent,
  },
};
