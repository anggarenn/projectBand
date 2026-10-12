import React from "react";
import { ThemeConfig } from "@/types/theme";
import { InvitationData } from "@/types/invitation";
import {
  HeroStageSection,
  MempelaiSection,
  AcaraSection,
  KisahCintaSection,
  GaleriSection,
  KadoDigitalSection,
  UcapanDoaSection,
} from "./index";

export type SectionId =
  | "hero"
  | "mempelai"
  | "acara"
  | "cerita"
  | "galeri"
  | "kado"
  | "ucapan";

export interface SectionSharedProps {
  theme: ThemeConfig;
  data: InvitationData;
  timeLeft?: { days: number; hours: number; minutes: number; seconds: number };
  formatDate?: (dateStr: string, dayName?: string) => string;
  onScrollDown?: () => void;
  [key: string]: any;
}

export interface SectionDefinition {
  id: SectionId;
  label: string;
  component: React.ComponentType<SectionSharedProps>;
  isEnabled?: (data: InvitationData) => boolean;
}

export const SECTION_REGISTRY: Record<SectionId, SectionDefinition> = {
  hero: {
    id: "hero",
    label: "Panggung Utama (Hero)",
    component: HeroStageSection as unknown as React.ComponentType<SectionSharedProps>,
    isEnabled: () => true,
  },
  mempelai: {
    id: "mempelai",
    label: "Mempelai & Salam Pembuka",
    component: MempelaiSection as unknown as React.ComponentType<SectionSharedProps>,
    isEnabled: () => true,
  },
  acara: {
    id: "acara",
    label: "Rangkaian Acara & Lokasi",
    component: AcaraSection as unknown as React.ComponentType<SectionSharedProps>,
    isEnabled: (data) => Boolean(data.events && data.events.length > 0),
  },
  cerita: {
    id: "cerita",
    label: "Kisah Cinta (Love Story)",
    component: KisahCintaSection as unknown as React.ComponentType<SectionSharedProps>,
    isEnabled: (data) => Boolean(data.loveStories && data.loveStories.length > 0),
  },
  galeri: {
    id: "galeri",
    label: "Galeri Foto Prewedding",
    component: GaleriSection as unknown as React.ComponentType<SectionSharedProps>,
    isEnabled: (data) => Boolean(data.gallery && data.gallery.length > 0),
  },
  kado: {
    id: "kado",
    label: "Tanda Tresna / Kado Digital",
    component: KadoDigitalSection as unknown as React.ComponentType<SectionSharedProps>,
    isEnabled: (data) =>
      Boolean((data.bankAccounts && data.bankAccounts.length > 0) || data.physicalGift?.address),
  },
  ucapan: {
    id: "ucapan",
    label: "Buku Tamu & Doa Restu",
    component: UcapanDoaSection as unknown as React.ComponentType<SectionSharedProps>,
    isEnabled: () => true,
  },
};

export const DEFAULT_SECTION_ORDER: SectionId[] = [
  "hero",
  "mempelai",
  "acara",
  "cerita",
  "galeri",
  "kado",
  "ucapan",
];

/**
 * Filter and resolve active sections by order and data guard
 */
export function getActiveSections(
  order: SectionId[] = DEFAULT_SECTION_ORDER,
  data: InvitationData
): SectionDefinition[] {
  return order
    .map((id) => SECTION_REGISTRY[id])
    .filter((meta): meta is SectionDefinition => {
      if (!meta) return false;
      return meta.isEnabled ? meta.isEnabled(data) : true;
    });
}
