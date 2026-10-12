import { ThemeConfig } from "@/types/theme";
import { JawaBlackGoldPreset } from "./jawa-black-gold";
import { JawaEmeraldPreset } from "./jawa-emerald";
import { JawaBrownPreset } from "./jawa-brown";
import { SundaMegamendungPreset } from "./sunda-megamendung";
import { SundaVintagePreset } from "./sunda-vintage";
import { BaliCandiBentarPreset } from "./bali-candi-bentar";
import { MinangRumahGadangPreset } from "./minang-rumah-gadang";
import { EmeraldVelvetNoirPreset } from "./emerald-velvet-noir";
import { TerracottaEarthyMeadowPreset } from "./terracotta-earthy-meadow";
import { CelestialTwilightPreset } from "./celestial-twilight";
import { RoyalChinoiserieSilkPreset } from "./royal-chinoiserie-silk";
import { AcehBlackHeritagePreset } from "./aceh-black-heritage";
import { LinocutNoirPreset } from "./linocut-noir";

export * from "./jawa-black-gold";
export * from "./jawa-emerald";
export * from "./jawa-brown";
export * from "./sunda-megamendung";
export * from "./sunda-vintage";
export * from "./bali-candi-bentar";
export * from "./minang-rumah-gadang";
export * from "./emerald-velvet-noir";
export * from "./terracotta-earthy-meadow";
export * from "./celestial-twilight";
export * from "./royal-chinoiserie-silk";
export * from "./aceh-black-heritage";
export * from "./linocut-noir";

export const themePresets: Record<string, ThemeConfig> = {
  "jawa-black-gold": JawaBlackGoldPreset,
  "jawa-emerald": JawaEmeraldPreset,
  "jawa-brown": JawaBrownPreset,
  "sunda-megamendung": SundaMegamendungPreset,
  "sunda-vintage": SundaVintagePreset,
  "bali-candi-bentar": BaliCandiBentarPreset,
  "minang-rumah-gadang": MinangRumahGadangPreset,
  "emerald-velvet-noir": EmeraldVelvetNoirPreset,
  "terracotta-earthy-meadow": TerracottaEarthyMeadowPreset,
  "celestial-twilight": CelestialTwilightPreset,
  "royal-chinoiserie-silk": RoyalChinoiserieSilkPreset,
  "aceh-black-heritage": AcehBlackHeritagePreset,
  "linocut-noir": LinocutNoirPreset,
};

export function getThemePreset(idOrVariant: string = "jawa-brown"): ThemeConfig {
  if (
    idOrVariant === "royal-chinoiserie-silk" ||
    idOrVariant === "chinoiserie" ||
    idOrVariant === "sangjit"
  ) {
    return RoyalChinoiserieSilkPreset;
  }
  if (
    idOrVariant === "celestial-twilight" ||
    idOrVariant === "celestial" ||
    idOrVariant === "celestial-midnight"
  ) {
    return CelestialTwilightPreset;
  }
  if (
    idOrVariant === "terracotta-earthy-meadow" ||
    idOrVariant === "terracotta" ||
    idOrVariant === "earthy-meadow"
  ) {
    return TerracottaEarthyMeadowPreset;
  }
  if (
    idOrVariant === "emerald-velvet-noir" ||
    idOrVariant === "emerald-noir" ||
    idOrVariant === "velvet-noir"
  ) {
    return EmeraldVelvetNoirPreset;
  }
  if (idOrVariant === "emerald" || idOrVariant === "jawa-emerald") {
    return JawaEmeraldPreset;
  }
  if (idOrVariant === "black-gold" || idOrVariant === "jawa-black-gold") {
    return JawaBlackGoldPreset;
  }
  if (idOrVariant === "brown" || idOrVariant === "jawa-brown") {
    return JawaBrownPreset;
  }
  if (
    idOrVariant === "bali" ||
    idOrVariant === "bali-candi-bentar" ||
    idOrVariant === "motion-art-bali"
  ) {
    return BaliCandiBentarPreset;
  }
  if (
    idOrVariant === "minang" ||
    idOrVariant === "minang-rumah-gadang" ||
    idOrVariant === "motion-art-minang"
  ) {
    return MinangRumahGadangPreset;
  }
  if (
    idOrVariant === "sunda-vintage" ||
    idOrVariant === "vintage-sunda" ||
    idOrVariant === "sunda-folk"
  ) {
    return SundaVintagePreset;
  }
  if (
    idOrVariant === "sunda" ||
    idOrVariant === "sunda-megamendung" ||
    idOrVariant === "motion-art-sunda"
  ) {
    return SundaMegamendungPreset;
  }
  if (
    idOrVariant === "aceh" ||
    idOrVariant === "aceh-black" ||
    idOrVariant === "aceh-black-heritage" ||
    idOrVariant === "motion-art-aceh"
  ) {
    return AcehBlackHeritagePreset;
  }
  if (
    idOrVariant === "woodcut" ||
    idOrVariant === "linocut" ||
    idOrVariant === "linocut-noir" ||
    idOrVariant === "nusantara-woodcut" ||
    idOrVariant === "motion-art-woodcut"
  ) {
    return LinocutNoirPreset;
  }
  return themePresets[idOrVariant] || JawaBrownPreset;
}
