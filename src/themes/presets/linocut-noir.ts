import { ThemeConfig } from "@/types/theme";
import {
  TraditionalGoldCorner,
  TraditionalGoldHeader,
  AuthenticGununganKayon,
  RoyalMonogramSeal,
  GoldenEmbersCanvas,
  JawaHeroContent,
} from "@/components/themes/ornaments/jawa";

// ponytail: preset linocut-noir - pure procedural relief print without diffusion models
export const LinocutNoirPreset: ThemeConfig = {
  id: "linocut-noir",
  name: "Nusantara Archival Linocut",
  category: "tradisional",
  variant: "black-gold",
  colors: {
    primary: "#C59B3C", // Gold Relief Foil
    accent: "#E5C16C", // Warm Gold
    bgBase: "#0C0B09", // Obsidian Velvet Ink Block
    bgSurface: "#141311", // Solid Relief Card
    bgCard: "rgba(20, 19, 17, 0.92)", // Archival Card
    border: "rgba(197, 155, 60, 0.35)", // Hairline Gold
    textPrimary: "#FFFFFF",
    textSecondary: "#E8DECB", // Ivory Paper Tone
    textMuted: "#A49C8F",
    glow: "rgba(197, 155, 60, 0.25)",
    filterClass: "brightness-[0.92] contrast-[1.08]",
  },
  backgrounds: {
    cover: "/assets/motion-art-linocut/bg-cover-linocut.webp",
    stage: "/assets/motion-art-linocut/bg-stage-linocut.webp",
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
