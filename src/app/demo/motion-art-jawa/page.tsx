"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useInvitationData } from "@/lib/invitationStore";
import MotionArtJawaView, { GununganIcon } from "@/components/themes/MotionArtJawaView";
import { Sparkles, QrCode } from "lucide-react";

function MotionArtJawaPageContent() {
  const searchParams = useSearchParams();
  const guest = searchParams.get("to") || "Bpk. Hendra Gunawan & Keluarga";
  const preset = searchParams.get("preset") || searchParams.get("variant") || "jawa-black-gold";
  const { data } = useInvitationData();

  const isLinocut = preset.includes("linocut") || preset.includes("woodcut");
  const isAceh = preset.includes("aceh");
  const isChinoiserie = preset.includes("chinoiserie") || preset.includes("silk") || preset.includes("sangjit") || preset === "royal-chinoiserie-silk";
  const isCelestial = preset.includes("celestial") || preset.includes("twilight");
  const isTerracotta = preset.includes("terracotta") || preset.includes("earthy-meadow");
  const isBali = preset.includes("bali");
  const isMinang = preset.includes("minang");
  const isSunda = preset.includes("sunda");
  const isEmeraldVelvet = preset.includes("velvet") || preset.includes("emerald-noir") || preset === "emerald-velvet-noir";
  const isEmerald = !isEmeraldVelvet && preset.includes("emerald");
  const isBrown = preset.includes("brown");

  const cultureTitle = isLinocut
    ? "Archival Relief Art · Nusantara Linocut Noir"
    : isAceh
    ? "Pernikahan Adat Aceh · Serambi Mekkah"
    : isChinoiserie
    ? "Royal Chinoiserie Silk · Imperial Elegance"
    : isCelestial
    ? "Celestial Romance · Starlight & Constellation"
    : isTerracotta
    ? "Rustic Botanical · Terracotta Earthy Meadow"
    : isEmeraldVelvet
    ? "Pernikahan Elegan · Emerald Velvet Noir"
    : isBali
    ? "Pernikahan Adat Bali"
    : isMinang
    ? "Pernikahan Adat Minangkabau"
    : isSunda
    ? "Pernikahan Adat Sunda"
    : isEmerald
    ? "Pernikahan Adat Jawa · Keraton Emerald"
    : isBrown
    ? "Pernikahan Adat Jawa · Heritage Brown"
    : "Pernikahan Adat Jawa · Royal Gold";

  const cultureSubtitle = isLinocut
    ? "Archival Relief Art · Nusantara Linocut"
    : isAceh
    ? "Serambi Mekkah · Rumoh Aceh Krong Bade"
    : isChinoiserie
    ? "Sangjit & Peranakan · Royal Chinoiserie Silk"
    : isCelestial
    ? "Editorial Luxury · Celestial Twilight"
    : isTerracotta
    ? "Warm Clay & Pampas · Terracotta Meadow"
    : isEmeraldVelvet
    ? "Quiet Luxury · Emerald Velvet Noir"
    : isBali
    ? "Motion Art Bali · Pawiwahan Ageng"
    : isMinang
    ? "Motion Art Minang · Baralek Gadang"
    : isSunda
    ? "Motion Art Sunda · Parahyangan Megamendung"
    : isEmerald
    ? "Motion Art Jawa · Keraton Emerald Gold"
    : isBrown
    ? "Motion Art Jawa · Heritage Brown Folk"
    : "Motion Art Jawa · Exclusive Keraton";

  const cultureQuote = isLinocut
    ? "Cukil kayu klasik intaglio berpadu tinta obsidian dan sepuhan emas murni. Janji suci terukir abadi di atas serat kertas gading pusaka."
    : isAceh
    ? "Adat bak Poe Teumeureuhom, Hukom bak Syiah Kuala, Qanun bak Putroe Phang, Reusam bak Laksamana. Janji suci Baro & Dara Baro dinaungi berkah kemuliaan Tanah Rencong."
    : isChinoiserie
    ? "Dua hati bersatu dalam keanggunan sutra merah dan kemuliaan emas, dinaungi berkah kebahagiaan abadi (双喜)."
    : isCelestial
    ? "And when the twilight folded the sky into velvet, two stars — Alister and Celeste — chose to burn as one constellation."
    : isTerracotta
    ? "Dua hati bertaut dalam ketulusan alam raya. Sentuhan hangat tanah liat terakota dan kelembutan ilalang padang rumput abadi."
    : isEmeraldVelvet
    ? "Dua insan bersatu dalam janji suci abadi. Kehangatan cinta yang tenang berbalut keanggunan beludru zamrud dan kilau emas murni."
    : isBali
    ? "Mugi asung kertha wara nugraha Ida Sang Hyang Widhi Wasa, ngicenin karahajengan lan karahayuan ring sajeroning pawiwahan."
    : isMinang
    ? "Adat Basandi Syarak, Syarak Basandi Kitabullah. Tagak samo tinggi, duduak samo randah marajuk tali kabek nan arek."
    : isSunda
    ? "Mugia ginuluran karahayuan, runtut raut sauyunan, sarendeuk saigel sabobot sapihanean, ka cai jadi saleuwi ka darat jadi salebak."
    : "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Mugi-mugi dados kulawarga ingkang sakinah, mawaddah, warahmah.";

  return (
    <div className="min-h-screen bg-[#100E0C] text-[#EAE5DD] flex flex-col md:flex-row justify-center relative overflow-hidden">
      {/* ----------------------------------------------------------- */}
      {/* DESKTOP LEFT AMBIENT PANEL (Cultural Atmosphere)            */}
      {/* ----------------------------------------------------------- */}
      <aside className="hidden md:flex md:w-1/2 lg:w-7/12 fixed top-0 left-0 bottom-0 flex-col justify-between p-12 lg:p-16 z-10 border-r border-[#C59B3C]/20">
        {/* Background Atmosphere */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-25 scale-105"
          style={{ backgroundImage: `url(${data.coverPhoto})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0C0B0A]/95 via-[#141210]/90 to-[#100E0C]" />
        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[radial-gradient(#C59B3C_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Ambient Top Brand */}
        <div className="relative z-10 flex items-center gap-3">
          {isChinoiserie ? (
            <span className="text-3xl font-serif text-[#D4AF37] font-bold select-none drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">囍</span>
          ) : (
            <GununganIcon className="w-8 h-10 text-[#C59B3C]" />
          )}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1A17] border border-[#C59B3C]/40 text-[#E5C16C] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B3C]" />
              <span>{cultureSubtitle}</span>
            </div>
          </div>
        </div>

        {/* Ambient Center Title */}
        <div className="relative z-10 max-w-lg space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C59B3C] font-semibold block">
            {cultureTitle}
          </span>
          <h1 className="font-serif-display text-5xl lg:text-7xl font-bold text-white tracking-wide leading-tight">
            {data.coverTitle || `${data.groom.nickname} & ${data.bride.nickname}`}
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-[#C59B3C] to-transparent" />
          <p className="text-sm text-[#A7A29A] leading-relaxed max-w-md pt-2">
            {cultureQuote}
          </p>
        </div>

        {/* Ambient Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#8A837A] border-t border-[#C59B3C]/20 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1F1A17] border border-[#C59B3C]/30 flex items-center justify-center text-[#C59B3C]">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white block font-medium">Buka di Smartphone</span>
              <span className="text-[10px] text-[#8A837A]">Scan QR untuk pengalaman mobile terbaik</span>
            </div>
          </div>
          <span>&copy; {new Date().getFullYear()} Mengundang Traditional</span>
        </div>
      </aside>

      {/* ----------------------------------------------------------- */}
      {/* RIGHT VIEWPORT CONTAINER (The Interactive Phone Invitation) */}
      {/* ----------------------------------------------------------- */}
      <div className="w-full md:w-1/2 lg:w-5/12 md:ml-auto relative z-20 h-screen flex justify-center items-center">
        <MotionArtJawaView data={data} guestName={guest} variant={preset} />
      </div>
    </div>
  );
}

export default function MotionArtJawaDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#100E0C] flex items-center justify-center text-[#C59B3C] text-sm">
          Memuat undangan adat Jawa...
        </div>
      }
    >
      <MotionArtJawaPageContent />
    </Suspense>
  );
}
