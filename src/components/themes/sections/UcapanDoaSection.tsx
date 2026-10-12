"use client";

import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle2, XCircle } from "lucide-react";
import { ThemeConfig } from "@/types/theme";
import { InvitationData, WishItem } from "@/types/invitation";
import { SectionOrnamentBackdrop } from "@/components/themes/ornaments/jawa/SectionOrnamentBackdrop";
import { TraditionalGoldCorner } from "@/components/themes/ornaments/jawa/TraditionalGoldCorner";
import { ScrollReveal } from "@/components/themes/ScrollReveal";

interface UcapanDoaSectionProps {
  theme: ThemeConfig;
  data: InvitationData;
}

export function UcapanDoaSection({ theme, data }: UcapanDoaSectionProps) {
  const { Symbol, Divider } = theme.ornaments;
  const isChinoiserie = theme.id === "royal-chinoiserie-silk";
  const isCelestial = theme.id === "celestial-twilight";
  const isTerracotta = theme.id === "terracotta-earthy-meadow";
  const isEmeraldNoir = theme.id === "emerald-velvet-noir" || theme.id === "emerald-velfet-noir";
  const isSundaVintage = theme.id === "sunda-vintage";
  const isBrown = theme.id === "jawa-brown" || isSundaVintage;
  const isJawa = theme.id.startsWith("jawa") || theme.id === "black-gold" || theme.id === "emerald";

  const subtitleUcapan = isChinoiserie
    ? "Doa Restu & Kebahagiaan"
    : isSundaVintage
    ? "Pidua & Pangharepan"
    : isBrown
    ? "Panyuwunan & Donga"
    : isCelestial
    ? "Doa Restu Semesta"
    : "Ucapan & Doa";

  const closingGratitude = isChinoiserie
    ? "Xie Xie · Terima Kasih"
    : isSundaVintage
    ? "Hatur Nuhun"
    : isBrown
    ? "Matur Nuwun"
    : isCelestial
    ? "Salam Hangat Bintang"
    : "Terima Kasih";

  const [wishes, setWishes] = useState<WishItem[]>(data.wishes || []);
  const [formData, setFormData] = useState({
    name: "",
    attendance: "hadir" as "hadir" | "tidak_hadir",
    pax: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newWish: WishItem = {
        id: Date.now().toString(),
        name: formData.name,
        attendance: formData.attendance,
        pax: Number(formData.pax),
        message: formData.message,
        timestamp: "Baru saja",
      };
      setWishes([newWish, ...wishes]);
      setFormData({ name: "", attendance: "hadir", pax: 1, message: "" });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <>
      {/* RSVP & UCAPAN DOA (Folk Dark Chocolate Card / Boho Terracotta Card / Cosmic Bento) */}
      <section
        id="ucapan"
        className="py-12 px-5 sm:px-8 space-y-6 relative overflow-hidden"
        style={{
          backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-surface)",
          borderColor: "var(--theme-border)",
        }}
      >
        <SectionOrnamentBackdrop
          watermark={isJawa ? "gunungan" : "none"}
          showCorners={isJawa && !isBrown}
          cornerOpacity="opacity-40"
          watermarkOpacity="opacity-[0.07]"
        />

        <ScrollReveal direction="up" className="relative z-10 max-w-sm mx-auto">
          <div
            className={`p-7 sm:p-8 shadow-2xl relative overflow-hidden ${
              isChinoiserie
                ? "glass-chinoiserie-bento rounded-3xl text-[#FAF7F0] shadow-[0_8px_32px_rgba(59,8,12,0.85)] border border-[#D4AF37]/35"
                : isCelestial
                ? "glass-celestial-bento rounded-3xl text-[#F8F9FA] shadow-[0_8px_32px_rgba(8,11,20,0.85)] border border-[#C8B6FF]/30"
                : isTerracotta
                ? "rounded-t-[60px] rounded-b-[24px] bg-[#FFFDFB] border border-[#E3D4C4] shadow-sm text-[#2D231E]"
                : isEmeraldNoir
                ? "rounded-3xl bg-[#0D2A20]/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
                : isBrown
                ? "rounded-[28px] bg-[#4A2808] text-white border-2 border-[#C4823F]/30"
                : "border rounded-3xl bg-[var(--theme-bg-surface)] text-white"
            }`}
            style={!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie ? { borderColor: "var(--theme-border)" } : undefined}
          >
            <div className="text-center mb-6">
              <MessageSquare
                className="w-7 h-7 mx-auto mb-2 opacity-90 animate-float-slow"
                style={{
                  color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#BF573F" : isEmeraldNoir ? "#D4AF37" : "#D4A373",
                }}
              />
              <span
                className="text-[11px] font-serif font-bold uppercase tracking-[0.25em] block mb-1"
                style={{
                  color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#D4A373" : "var(--theme-primary)",
                }}
              >
                {subtitleUcapan}
              </span>
              <h2
                className={`mt-1 mb-2 ${
                  isChinoiserie
                    ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F0] via-[#FDE047] to-[#D4AF37]"
                    : isCelestial
                    ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F8F9FA] via-[#C8B6FF] to-[#F3D082]"
                    : isTerracotta
                    ? "font-serif text-2xl sm:text-3xl font-bold text-[#BF573F]"
                    : isEmeraldNoir
                    ? "font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37]"
                    : isBrown
                    ? "font-script text-4xl sm:text-5xl text-[#FFF9F6]"
                    : "font-serif-display text-2xl sm:text-3xl font-bold text-white"
                }`}
              >
                Wishes
              </h2>
              <p
                className="text-xs max-w-xs mx-auto leading-relaxed"
                style={{
                  color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "rgba(255, 249, 246, 0.85)" : "var(--theme-text-muted)",
                }}
              >
                Berikan ucapan terbaik dan konfirmasi kehadiran Anda untuk kedua mempelai:
              </p>
            </div>

            {/* Form RSVP */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
              <div>
                <label
                  className="block text-[11px] font-semibold mb-1.5 opacity-90"
                  style={{ color: isTerracotta ? "#2D231E" : undefined }}
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Tulis nama Anda..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 ${
                    isChinoiserie
                      ? "bg-[#3B080C]/80 border border-[#D4AF37]/30 text-[#FAF7F0] placeholder:text-[#D1A7A0]/60 focus:ring-[#D4AF37]"
                      : isCelestial
                      ? "bg-[#080B14]/80 border border-[#C8B6FF]/30 text-[#F8F9FA] placeholder:text-[#8E9AAF]/60 focus:ring-[#C8B6FF]"
                      : isTerracotta
                      ? "bg-[#FAF4EE] border border-[#E3D4C4] text-[#2D231E] placeholder:text-[#857468]/60 focus:ring-[#BF573F]"
                      : isEmeraldNoir
                      ? "bg-[#061A14]/80 border border-[#D4AF37]/30 text-[#F4F6F0] placeholder:text-[#8BA398]/60 focus:ring-[#D4AF37]"
                      : isBrown
                      ? "bg-white text-[#1A140E] placeholder:text-[#7A6B62] focus:ring-[#8B4E17]"
                      : "border text-white placeholder:text-neutral-500 focus:ring-[#C59B3C]"
                  }`}
                  style={
                    !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                      ? {
                          backgroundColor: "var(--theme-bg-surface)",
                          borderColor: "var(--theme-border)",
                        }
                      : undefined
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    className="block text-[11px] font-semibold mb-1.5 opacity-90"
                    style={{ color: isTerracotta ? "#2D231E" : undefined }}
                  >
                    Kehadiran
                  </label>
                  <select
                    value={formData.attendance}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attendance: e.target.value as "hadir" | "tidak_hadir",
                      })
                    }
                    className={`w-full px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 ${
                      isChinoiserie
                        ? "bg-[#3B080C]/80 border border-[#D4AF37]/30 text-[#FAF7F0] focus:ring-[#D4AF37]"
                        : isCelestial
                        ? "bg-[#080B14]/80 border border-[#C8B6FF]/30 text-[#F8F9FA] focus:ring-[#C8B6FF]"
                        : isTerracotta
                        ? "bg-[#FAF4EE] border border-[#E3D4C4] text-[#2D231E] focus:ring-[#BF573F]"
                        : isEmeraldNoir
                        ? "bg-[#061A14]/80 border border-[#D4AF37]/30 text-[#F4F6F0] focus:ring-[#D4AF37]"
                        : isBrown
                        ? "bg-white text-[#1A140E] focus:ring-[#8B4E17]"
                        : "border text-white focus:ring-[#C59B3C]"
                    }`}
                    style={
                      !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                        ? {
                            backgroundColor: "var(--theme-bg-surface)",
                            borderColor: "var(--theme-border)",
                          }
                        : undefined
                    }
                  >
                    <option value="hadir" className={isChinoiserie ? "bg-[#3B080C] text-[#FAF7F0]" : isCelestial ? "bg-[#080B14] text-[#F8F9FA]" : isEmeraldNoir ? "bg-[#061A14] text-[#F4F6F0]" : ""}>Hadir</option>
                    <option value="tidak_hadir" className={isChinoiserie ? "bg-[#3B080C] text-[#FAF7F0]" : isCelestial ? "bg-[#080B14] text-[#F8F9FA]" : isEmeraldNoir ? "bg-[#061A14] text-[#F4F6F0]" : ""}>Maaf Berhalangan</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-[11px] font-semibold mb-1.5 opacity-90"
                    style={{ color: isTerracotta ? "#2D231E" : undefined }}
                  >
                    Jumlah Tamu
                  </label>
                  <select
                    value={formData.pax}
                    onChange={(e) => setFormData({ ...formData, pax: Number(e.target.value) })}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 ${
                      isChinoiserie
                        ? "bg-[#3B080C]/80 border border-[#D4AF37]/30 text-[#FAF7F0] focus:ring-[#D4AF37]"
                        : isCelestial
                        ? "bg-[#080B14]/80 border border-[#C8B6FF]/30 text-[#F8F9FA] focus:ring-[#C8B6FF]"
                        : isTerracotta
                        ? "bg-[#FAF4EE] border border-[#E3D4C4] text-[#2D231E] focus:ring-[#BF573F]"
                        : isEmeraldNoir
                        ? "bg-[#061A14]/80 border border-[#D4AF37]/30 text-[#F4F6F0] focus:ring-[#D4AF37]"
                        : isBrown
                        ? "bg-white text-[#1A140E] focus:ring-[#8B4E17]"
                        : "border text-white focus:ring-[#C59B3C]"
                    }`}
                    style={
                      !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                        ? {
                            backgroundColor: "var(--theme-bg-surface)",
                            borderColor: "var(--theme-border)",
                          }
                        : undefined
                    }
                  >
                    <option value={1} className={isChinoiserie ? "bg-[#3B080C] text-[#FAF7F0]" : isCelestial ? "bg-[#080B14] text-[#F8F9FA]" : isEmeraldNoir ? "bg-[#061A14] text-[#F4F6F0]" : ""}>1 Orang</option>
                    <option value={2} className={isChinoiserie ? "bg-[#3B080C] text-[#FAF7F0]" : isCelestial ? "bg-[#080B14] text-[#F8F9FA]" : isEmeraldNoir ? "bg-[#061A14] text-[#F4F6F0]" : ""}>2 Orang</option>
                    <option value={3} className={isChinoiserie ? "bg-[#3B080C] text-[#FAF7F0]" : isCelestial ? "bg-[#080B14] text-[#F8F9FA]" : isEmeraldNoir ? "bg-[#061A14] text-[#F4F6F0]" : ""}>3 Orang</option>
                    <option value={4} className={isChinoiserie ? "bg-[#3B080C] text-[#FAF7F0]" : isCelestial ? "bg-[#080B14] text-[#F8F9FA]" : isEmeraldNoir ? "bg-[#061A14] text-[#F4F6F0]" : ""}>4 Orang</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-[11px] font-semibold mb-1.5 opacity-90"
                  style={{ color: isTerracotta ? "#2D231E" : undefined }}
                >
                  Pesan / Doa Restu
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tulis untaian doa restu untuk kedua mempelai..."
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 ${
                    isChinoiserie
                      ? "bg-[#3B080C]/80 border border-[#D4AF37]/30 text-[#FAF7F0] placeholder:text-[#D1A7A0]/60 focus:ring-[#D4AF37]"
                      : isCelestial
                      ? "bg-[#080B14]/80 border border-[#C8B6FF]/30 text-[#F8F9FA] placeholder:text-[#8E9AAF]/60 focus:ring-[#C8B6FF]"
                      : isTerracotta
                      ? "bg-[#FAF4EE] border border-[#E3D4C4] text-[#2D231E] placeholder:text-[#857468]/60 focus:ring-[#BF573F]"
                      : isEmeraldNoir
                      ? "bg-[#061A14]/80 border border-[#D4AF37]/30 text-[#F4F6F0] placeholder:text-[#8BA398]/60 focus:ring-[#D4AF37]"
                      : isBrown
                      ? "bg-white text-[#1A140E] placeholder:text-[#7A6B62] focus:ring-[#8B4E17]"
                      : "border text-white placeholder:text-neutral-500 focus:ring-[#C59B3C]"
                  }`}
                  style={
                    !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                      ? {
                          backgroundColor: "var(--theme-bg-surface)",
                          borderColor: "var(--theme-border)",
                        }
                      : undefined
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-full text-xs font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all relative overflow-hidden group active:scale-95 hover:brightness-105 ${
                  isChinoiserie
                    ? "btn-imperial-gold text-[#3B080C] font-semibold border border-[#FFE9AD]/70 shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                    : isCelestial
                    ? "btn-cosmic-shimmer text-[#080B14] font-semibold border border-[#FFF3B3]/60 shadow-[0_4px_20px_rgba(200,182,255,0.4)]"
                    : isTerracotta
                    ? "bg-[#BF573F] hover:bg-[#A94A34] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/50 shadow-[0_4px_14px_rgba(191,87,63,0.25)]"
                    : isEmeraldNoir
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#D4AF37] text-[#061A14] border border-[#FFF4D0]/60 shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                    : isBrown
                    ? "bg-white text-[#5C3410] hover:bg-[#FAF6F0]"
                    : "text-black hover:brightness-110"
                }`}
                style={
                  !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                    ? {
                        background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.accent})`,
                      }
                    : undefined
                }
              >
                {(isEmeraldNoir || isChinoiserie) && (
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-golden-sheen pointer-events-none" />
                )}
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "Mengirim Ucapan..." : "Kirim Ucapan & Konfirmasi"}</span>
              </button>
            </form>

            {/* Daftar Ucapan Tamu */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl relative overflow-hidden transition-all text-left ${
                    isChinoiserie
                      ? "glass-chinoiserie-bento border border-[#D4AF37]/25 shadow-sm text-[#FAF7F0]"
                      : isCelestial
                      ? "glass-celestial-bento border border-[#C8B6FF]/20 shadow-sm text-[#F8F9FA]"
                      : isTerracotta
                      ? "bg-[#FAF4EE] border border-[#E3D4C4] shadow-sm text-[#2D231E]"
                      : isEmeraldNoir
                      ? "bg-[#061A14]/70 border border-[#D4AF37]/25 shadow-sm text-[#F4F6F0]"
                      : isBrown
                      ? "bg-[#533418]/90 border border-[#EAD7C5]/20 shadow-sm"
                      : "border bg-[var(--theme-bg-base)]"
                  }`}
                  style={!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie ? { borderColor: "var(--theme-border)" } : undefined}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className="text-xs font-bold"
                      style={{ color: isTerracotta ? "#2D231E" : isChinoiserie ? "#E6C65C" : "white" }}
                    >
                      {item.name}
                    </span>
                    {item.attendance === "hadir" ? (
                      <span className={`flex items-center gap-1 text-[10px] font-medium ${isChinoiserie ? "text-[#E6C65C]" : isCelestial ? "text-[#C8B6FF]" : isTerracotta ? "text-emerald-700" : "text-emerald-300"}`}>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Hadir ({item.pax})</span>
                      </span>
                    ) : (
                      <span
                        className="flex items-center gap-1 text-[10px] font-medium"
                        style={{ color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : "rgba(234, 215, 197, 0.7)" }}
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Berhalangan</span>
                      </span>
                    )}
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: isChinoiserie ? "#FAF7F0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isBrown ? "#FAF6F0" : "var(--theme-text-secondary)",
                    }}
                  >
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* PENUTUP & FOOTER KERATON / TERRACOTTA / CELESTIAL / CHINOISERIE */}
      <footer
        className="py-16 px-6 sm:px-8 text-center pb-28 relative overflow-hidden"
        style={{
          backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-base)",
          borderColor: "var(--theme-border)",
        }}
      >
        <SectionOrnamentBackdrop
          watermark={isJawa ? "kayon" : "none"}
          showCorners={isJawa && !isBrown}
          cornerPosition="top"
          cornerOpacity="opacity-40"
          watermarkOpacity="opacity-[0.09]"
        />

        <ScrollReveal direction="zoom" className="relative z-10">
          <div
            className={
              isChinoiserie
                ? "text-[#D4AF37]"
                : isCelestial
                ? "text-[#C8B6FF]"
                : isTerracotta
                ? "text-[#BF573F]"
                : isEmeraldNoir
                ? "text-[#D4AF37]"
                : isBrown
                ? "text-[#5C3410]"
                : "text-[var(--theme-primary)]"
            }
          >
            <Symbol className="w-12 h-16 mx-auto mb-4 opacity-85 animate-float-slow" />
          </div>
          <p
            className="text-xs leading-relaxed max-w-xs mx-auto mb-6"
            style={{
              color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
            }}
          >
            {data.closingMessage}
          </p>

          <Divider className="w-40 mx-auto mb-6 opacity-75" />

          <h3
            className={`mb-2 ${
              isChinoiserie
                ? "font-serif text-2xl sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FAF7F0] via-[#FDE047] to-[#D4AF37]"
                : isCelestial
                ? "font-serif text-2xl sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F8F9FA] via-[#C8B6FF] to-[#F3D082]"
                : isTerracotta
                ? "font-serif text-2xl sm:text-3xl font-bold tracking-wide text-[#BF573F]"
                : isEmeraldNoir
                ? "font-serif text-2xl sm:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F3E5AB] to-[#D4AF37]"
                : isBrown
                ? "font-script text-4xl sm:text-5xl text-[#5C3410]"
                : "font-serif-display text-2xl font-bold text-white tracking-wide"
            }`}
          >
            {data.groom.nickname} &amp; {data.bride.nickname}
          </h3>

          <p
            className="text-[11px] font-serif uppercase tracking-[0.25em] font-bold"
            style={{
              color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#8B4E17" : "var(--theme-primary)",
            }}
          >
            {closingGratitude}
          </p>
        </ScrollReveal>
      </footer>
    </>
  );
}
