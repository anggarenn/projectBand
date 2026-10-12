"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useInvitationData } from "@/lib/invitationStore";
import MotionArtJawaView from "@/components/themes/MotionArtJawaView";
import { SundaMegamendungPreset } from "@/themes/presets/sunda-megamendung";
import { SundaVintagePreset } from "@/themes/presets/sunda-vintage";
import { SundaSigerEmblem } from "@/components/themes/ornaments/sunda";
import { Sparkles, QrCode, Palette } from "lucide-react";

function MotionArtSundaPageContent() {
  const searchParams = useSearchParams();
  const guest = searchParams.get("to") || "Bpk. H. Ridwan Kamil & Keluarga";
  const initialPreset = searchParams.get("preset") === "midnight" ? "midnight" : "vintage";
  const [selectedVariant, setSelectedVariant] = useState<"vintage" | "midnight">(initialPreset);

  const activePreset = selectedVariant === "vintage" ? SundaVintagePreset : SundaMegamendungPreset;
  const isVintage = selectedVariant === "vintage";

  const { data: rawData } = useInvitationData();

  // Customize invitation data specifically for Sunda wedding atmosphere
  const data = useMemo(() => {
    return {
      ...rawData,
      groom: {
        ...rawData.groom,
        name: "Asep Nugraha, S.T.",
        nickname: "Asep",
        parents: "Putra pertama Bpk. H. Cecep Supriatna & Ibu Hj. Ai Komariah",
      },
      bride: {
        ...rawData.bride,
        name: "Lilis Permatasari, S.Farm.",
        nickname: "Lilis",
        parents: "Putri bungsu Bpk. H. Dadang Kusuma & Ibu Hj. Eneng Rohaeni",
      },
      coverTitle: "Asep & Lilis",
      coverSubtitle: isVintage
        ? "Pernikahan Adat Sunda Folk Parahyangan"
        : "Pernikahan Adat Sunda Parahyangan",
      quote: "Panceg dina galur, ngahiji dina asih, luyu dina rasa marengan mangsa.",
      events: rawData.events?.length
        ? rawData.events.map((ev, idx) => ({
            ...ev,
            venue: idx === 0 ? "Bale Asri Sasana Budaya Ganesha (Sabuga)" : "Grand Ballroom Sabuga Bandung",
            address: "Jl. Tamansari No. 73, Lebak Siliwangi, Coblong, Kota Bandung",
          }))
        : rawData.events,
    };
  }, [rawData, isVintage]);

  return (
    <div
      className={`min-h-screen ${
        isVintage ? "bg-[#140E0A] text-[#EDE5DB]" : "bg-[#070D1E] text-[#F1F5F9]"
      } flex flex-col md:flex-row justify-center relative overflow-hidden transition-colors duration-500`}
    >
      {/* ----------------------------------------------------------- */}
      {/* FLOATING PRESET SWITCHER PILL (Quick Toggle on All Screens) */}
      {/* ----------------------------------------------------------- */}
      <div className="fixed top-4 right-4 z-40 flex items-center bg-black/75 backdrop-blur-md border border-white/20 rounded-full p-1 shadow-2xl">
        <button
          onClick={() => setSelectedVariant("vintage")}
          title="Vintage Sepia (Folk Heritage)"
          className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
            isVintage
              ? "bg-[#5C3410] text-[#FFF9F6] shadow-md font-semibold"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#C4823F]" />
          <span>Vintage Folk</span>
        </button>
        <button
          onClick={() => setSelectedVariant("midnight")}
          title="Royal Midnight Navy"
          className={`px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
            !isVintage
              ? "bg-[#111D3D] text-[#FFF2D6] shadow-md font-semibold border border-[#D4AF37]/40"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
          <span>Midnight Gold</span>
        </button>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* DESKTOP LEFT AMBIENT PANEL                                  */}
      {/* ----------------------------------------------------------- */}
      <aside
        className={`hidden md:flex md:w-1/2 lg:w-7/12 fixed top-0 left-0 bottom-0 flex-col justify-between p-12 lg:p-16 z-10 border-r ${
          isVintage ? "border-[#8B4E17]/25" : "border-[#D4AF37]/20"
        } transition-colors duration-500`}
      >
        {/* Atmosphere Background Texture */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105 transition-all duration-700"
          style={{
            backgroundImage: `url('${
              isVintage
                ? "/assets/motion-art-sunda/bg-stage-sunda-julangngapak-sepia.webp"
                : "/assets/motion-art-sunda/bg-sunda-dark-gold.jpg"
            }')`,
          }}
        />
        <div
          className={`absolute inset-0 z-0 bg-gradient-to-r ${
            isVintage
              ? "from-[#140E0A]/98 via-[#21150D]/90 to-[#140E0A]"
              : "from-[#070D1E]/95 via-[#0B132B]/85 to-[#070D1E]"
          } transition-colors duration-500`}
        />

        {/* Authentic Megamendung Floating Cloud Backdrops */}
        <div className="absolute -top-10 -right-12 opacity-35 pointer-events-none transition-all duration-1000">
          <img
            src="/assets/motion-art-sunda/extracted/cloud-grand-top.png"
            alt="Megamendung Hero Cloud"
            className="w-[480px] h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </div>
        <div className="absolute -bottom-12 -left-10 opacity-30 pointer-events-none">
          <img
            src="/assets/motion-art-sunda/extracted/cloud-bottom-right.png"
            alt="Megamendung Ambient Cloud"
            className="w-[420px] h-auto -scale-x-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Ambient Top Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <SundaSigerEmblem
            className={`w-9 h-10 ${isVintage ? "text-[#C4823F]" : "text-[#D4AF37]"}`}
          />
          <div>
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                isVintage
                  ? "bg-[#2A180C] border border-[#8B4E17]/40 text-[#EDE5DB]"
                  : "bg-[#111D3D] border border-[#D4AF37]/40 text-[#FFF2D6] shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isVintage ? "text-[#C4823F]" : "text-[#D4AF37]"}`} />
              <span>
                {isVintage
                  ? "Motion Art Sunda · Vintage Folk Parahyangan"
                  : "Motion Art Sunda · Royal Midnight Series"}
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Center Content & Preset Selector */}
        <div className="relative z-10 max-w-lg space-y-5">
          <span
            className={`text-xs uppercase tracking-[0.3em] font-semibold block ${
              isVintage ? "text-[#C4823F]" : "text-[#D4AF37]"
            }`}
          >
            {isVintage ? "Heritage Folk Invitation" : "Pernikahan Adat Sunda Parahyangan"}
          </span>
          <h1 className="font-serif-display text-5xl lg:text-7xl font-bold text-white tracking-wide leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {data.coverTitle}
          </h1>
          <div
            className={`w-28 h-0.5 bg-gradient-to-r ${
              isVintage
                ? "from-[#C4823F] via-[#EDE5DB] to-transparent"
                : "from-[#D4AF37] via-[#FFF2D6] to-transparent"
            }`}
          />
          <p
            className={`text-sm leading-relaxed max-w-md pt-2 italic ${
              isVintage ? "text-[#C7B5A7]" : "text-[#94A3B8]"
            }`}
          >
            &ldquo;{data.quote}&rdquo;
          </p>
          <p
            className={`text-xs pt-1 ${
              isVintage ? "text-[#8E796C]" : "text-[#64748B]"
            }`}
          >
            Nyuhunkeun pidu&apos;a sareng karidoan manah ti para wargi sadaya.
          </p>

          {/* Interactive Preset Buttons in Ambient Panel */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs text-white/70">
              <Palette className="w-3.5 h-3.5 text-[#C4823F]" />
              <span className="font-medium">Nuansa Motion Art:</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => setSelectedVariant("vintage")}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                  isVintage
                    ? "bg-[#5C3410] border-[#8B4E17] text-white shadow-lg shadow-[#5C3410]/40 scale-102"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#C4823F]" />
                <span>Vintage Sepia (Folk Heritage)</span>
              </button>
              <button
                onClick={() => setSelectedVariant("midnight")}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer border ${
                  !isVintage
                    ? "bg-[#111D3D] border-[#D4AF37]/60 text-[#FFF2D6] shadow-lg shadow-[#111D3D]/60 scale-102"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span>Royal Midnight Navy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ambient Bottom Footer */}
        <div
          className={`relative z-10 flex items-center justify-between text-xs border-t pt-6 ${
            isVintage
              ? "border-[#8B4E17]/25 text-[#9E8A7C]"
              : "border-[#D4AF37]/20 text-[#94A3B8]"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                isVintage
                  ? "bg-[#2A180C] border-[#8B4E17]/40 text-[#C4823F]"
                  : "bg-[#111D3D] border-[#D4AF37]/35 text-[#D4AF37]"
              }`}
            >
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white block font-medium">Buka di Smartphone</span>
              <span className={`text-[10px] ${isVintage ? "text-[#8E796C]" : "text-[#64748B]"}`}>
                Scan QR untuk pengalaman mobile terbaik
              </span>
            </div>
          </div>
          <span>&copy; {new Date().getFullYear()} Mengundang Pasundan</span>
        </div>
      </aside>

      {/* ----------------------------------------------------------- */}
      {/* RIGHT VIEWPORT CONTAINER (The Interactive Phone Invitation) */}
      {/* ----------------------------------------------------------- */}
      <div className="w-full md:w-1/2 lg:w-5/12 md:ml-auto relative z-20 h-screen flex justify-center items-center">
        <MotionArtJawaView
          key={selectedVariant}
          data={data}
          guestName={guest}
          themeConfig={activePreset}
        />
      </div>
    </div>
  );
}

export default function MotionArtSundaDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070D1E] flex items-center justify-center text-[#D4AF37] text-sm">
          Memuat undangan adat Sunda Motion Art...
        </div>
      }
    >
      <MotionArtSundaPageContent />
    </Suspense>
  );
}

