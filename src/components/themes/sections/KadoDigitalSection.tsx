"use client";

import React, { useState } from "react";
import { Gift, Copy, Check } from "lucide-react";
import { ThemeConfig } from "@/types/theme";
import { BankAccountItem, PhysicalGiftInfo, InvitationData } from "@/types/invitation";
import { SectionOrnamentBackdrop } from "@/components/themes/ornaments/jawa/SectionOrnamentBackdrop";
import { TraditionalGoldCorner } from "@/components/themes/ornaments/jawa/TraditionalGoldCorner";
import { ScrollReveal } from "@/components/themes/ScrollReveal";

interface KadoDigitalSectionProps {
  theme: ThemeConfig;
  data?: InvitationData;
  bankAccounts?: BankAccountItem[];
  physicalGift?: PhysicalGiftInfo;
}

export function KadoDigitalSection({
  theme,
  data,
  bankAccounts,
  physicalGift,
}: KadoDigitalSectionProps) {
  const [copiedBankId, setCopiedBankId] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const accounts = bankAccounts || data?.bankAccounts;
  const gift = physicalGift || data?.physicalGift;
  const isChinoiserie = theme.id === "royal-chinoiserie-silk";
  const isCelestial = theme.id === "celestial-twilight";
  const isTerracotta = theme.id === "terracotta-earthy-meadow";
  const isEmeraldNoir = theme.id === "emerald-velfet-noir" || theme.id === "emerald-velvet-noir";
  const isSundaVintage = theme.id === "sunda-vintage";
  const isBrown = theme.id === "jawa-brown" || isSundaVintage;
  const isJawa = theme.id.startsWith("jawa") || theme.id === "black-gold" || theme.id === "emerald";

  const subtitleKado = isChinoiserie
    ? "Tanda Kasih & Angpao"
    : isSundaVintage
    ? "Tanda Kanyaah"
    : isBrown
    ? "Tanda Tresna"
    : isCelestial
    ? "Tanda Kasih Bintang"
    : "Wedding Gift";

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBankId(id);
    setTimeout(() => setCopiedBankId(null), 2500);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  if ((!accounts || accounts.length === 0) && !gift) return null;

  return (
    <section
      id="kado"
      className="py-12 px-5 sm:px-8 space-y-6 relative overflow-hidden"
      style={{
        backgroundColor: isBrown || isTerracotta ? "transparent" : "var(--theme-bg-base)",
        borderColor: "var(--theme-border)",
      }}
    >
      <SectionOrnamentBackdrop
        watermark={isJawa ? "wayang" : "none"}
        showCorners={isJawa && !isBrown}
        cornerOpacity="opacity-35"
        watermarkOpacity="opacity-[0.07]"
      />

      <ScrollReveal direction="up" className="relative z-10 text-center">
        <Gift
          className="w-8 h-8 mx-auto mb-1 animate-float-slow"
          style={{ color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#BF573F" : isEmeraldNoir ? "#D4AF37" : "#8B4E17" }}
        />
        <span
          className="text-[11px] font-serif font-bold uppercase tracking-[0.25em] block"
          style={{
            color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#8B4E17" : "var(--theme-primary)",
          }}
        >
          {subtitleKado}
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
              ? "font-script text-4xl sm:text-5xl text-[#5C3410]"
              : "font-serif-display text-2xl sm:text-3xl font-bold text-white"
          }`}
        >
          Wedding Gift
        </h2>
        <p
          className="text-xs max-w-sm mx-auto leading-relaxed"
          style={{
            color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
          }}
        >
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan
          tanda kasih, dapat melalui rekening berikut:
        </p>
      </ScrollReveal>

      {/* Rekening Bank Cards */}
      <div className="relative z-10 space-y-5 max-w-sm mx-auto">
        {accounts?.map((bank, index) => {
          const isCopied = copiedBankId === bank.id;
          return (
            <ScrollReveal key={bank.id} direction="up" delay={index * 120}>
              <div
                className={`p-6 shadow-lg relative overflow-hidden text-center transition-all duration-300 hover:-translate-y-1 ${
                  isChinoiserie
                    ? "glass-chinoiserie-bento rounded-2xl text-[#FAF7F0] shadow-[0_8px_32px_rgba(59,8,12,0.85)] border border-[#D4AF37]/35"
                    : isCelestial
                    ? "glass-celestial-bento rounded-2xl text-[#F8F9FA] shadow-[0_8px_32px_rgba(8,11,20,0.85)] border border-[#C8B6FF]/30"
                    : isTerracotta
                    ? "border border-[#E3D4C4] rounded-t-[50px] rounded-b-[20px] bg-[#FFFDFB] shadow-sm text-[#2D231E]"
                    : isEmeraldNoir
                    ? "border border-[#D4AF37]/35 rounded-2xl bg-[#0D2A20]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
                    : isBrown
                    ? "border-[3px] border-[#5C3410] rounded-[24px] bg-[#FFF9F6]/95 backdrop-blur-md text-[#1A140E]"
                    : "border rounded-2xl bg-[var(--theme-bg-surface)] text-white"
                }`}
                style={!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie ? { borderColor: "var(--theme-border)" } : undefined}
              >
                {!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie && (
                  <>
                    <TraditionalGoldCorner className="absolute top-1 left-1 w-7 h-7 opacity-20 pointer-events-none" />
                    <TraditionalGoldCorner className="absolute top-1 right-1 w-7 h-7 -scale-x-100 opacity-20 pointer-events-none" />
                  </>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      isChinoiserie
                        ? "bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#E6C65C]"
                        : isCelestial
                        ? "bg-[#C8B6FF]/15 border-[#C8B6FF]/35 text-[#C8B6FF]"
                        : isTerracotta
                        ? "bg-[#BF573F]/10 border-[#BF573F]/25 text-[#BF573F]"
                        : isEmeraldNoir
                        ? "bg-[#D4AF37]/15 border-[#D4AF37]/35 text-[#F3E5AB]"
                        : isBrown
                        ? "bg-[#5C3410]/10 border-[#5C3410]/20 text-[#5C3410]"
                        : "text-white"
                    }`}
                    style={
                      !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                        ? {
                            backgroundColor: `${theme.colors.primary}26`,
                            borderColor: "var(--theme-border)",
                          }
                        : undefined
                    }
                  >
                    {bank.bankName}
                  </span>
                  <span
                    className="text-[10px] font-serif uppercase tracking-wider"
                    style={{
                      color: isChinoiserie ? "#D4AF37" : isCelestial ? "#C8B6FF" : isTerracotta ? "#8F3B25" : isEmeraldNoir ? "#D4AF37" : isBrown ? "#8B4E17" : "var(--theme-text-muted)",
                    }}
                  >
                    Transfer Bank
                  </span>
                </div>

                <p
                  className="text-base font-mono font-bold tracking-widest my-2"
                  style={{
                    color: isChinoiserie ? "#E6C65C" : isCelestial ? "#F3D082" : isTerracotta ? "#2D231E" : isEmeraldNoir ? "#FFFDF0" : isBrown ? "#1A140E" : "var(--theme-accent)",
                  }}
                >
                  {bank.accountNumber}
                </p>
                <p
                  className="text-xs mb-4"
                  style={{
                    color: isChinoiserie ? "#FAF7F0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-secondary)",
                  }}
                >
                  a.n {bank.accountHolder}
                </p>

                <button
                  onClick={() => handleCopy(bank.accountNumber, bank.id)}
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md relative overflow-hidden group active:scale-95 ${
                    isChinoiserie
                      ? "btn-imperial-gold text-[#3B080C] font-semibold border border-[#FFE9AD]/70 shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                      : isCelestial
                      ? "btn-cosmic-shimmer text-[#080B14] font-semibold border border-[#FFF3B3]/60 shadow-[0_4px_20px_rgba(200,182,255,0.4)]"
                      : isTerracotta
                      ? "bg-[#BF573F] hover:bg-[#A94A34] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/50 shadow-[0_4px_14px_rgba(191,87,63,0.25)]"
                      : isEmeraldNoir
                      ? "bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#D4AF37] text-[#061A14] border border-[#FFF4D0]/60 shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:brightness-105"
                      : isBrown
                      ? "bg-[#5C3410] hover:bg-[#4A2808] text-[#FFF9F6] border border-[#8B4E17]/30 shadow-[0_4px_16px_rgba(92,52,16,0.25)]"
                      : "border text-xs font-semibold hover:brightness-125"
                  }`}
                  style={
                    !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                      ? {
                          backgroundColor: "var(--theme-bg-base)",
                          borderColor: "var(--theme-border)",
                          color: "var(--theme-accent)",
                        }
                      : undefined
                  }
                >
                  {(isEmeraldNoir || isChinoiserie) && (
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-golden-sheen pointer-events-none" />
                  )}
                  {isCopied ? (
                    <>
                      <Check className={`w-3.5 h-3.5 ${isChinoiserie ? "text-[#3B080C]" : isCelestial ? "text-[#080B14]" : isTerracotta ? "text-[#FFFDFB]" : isEmeraldNoir ? "text-[#061A14]" : "text-emerald-300"}`} />
                      <span>Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className={`w-3.5 h-3.5 ${isChinoiserie ? "text-[#3B080C]" : isCelestial ? "text-[#080B14]" : isTerracotta ? "text-[#FFFDFB]" : isEmeraldNoir ? "text-[#061A14]" : ""}`} />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            </ScrollReveal>
          );
        })}

        {/* Kirim Kado Fisik */}
        {gift && gift.address && (
          <ScrollReveal direction="up" delay={200}>
            <div
              className={`p-6 shadow-lg relative overflow-hidden text-center transition-all duration-300 hover:-translate-y-1 ${
                isChinoiserie
                  ? "glass-chinoiserie-bento rounded-2xl text-[#FAF7F0] shadow-[0_8px_32px_rgba(59,8,12,0.85)] border border-[#D4AF37]/35"
                  : isCelestial
                  ? "glass-celestial-bento rounded-2xl text-[#F8F9FA] shadow-[0_8px_32px_rgba(8,11,20,0.85)] border border-[#C8B6FF]/30"
                  : isTerracotta
                  ? "border border-[#E3D4C4] rounded-t-[50px] rounded-b-[20px] bg-[#FFFDFB] shadow-sm text-[#2D231E]"
                  : isEmeraldNoir
                  ? "border border-[#D4AF37]/35 rounded-2xl bg-[#0D2A20]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-[#F4F6F0]"
                  : isBrown
                  ? "border-[3px] border-[#5C3410] rounded-[24px] bg-[#FFF9F6]/95 backdrop-blur-md text-[#1A140E]"
                  : "border rounded-2xl bg-[var(--theme-bg-surface)] text-white"
              }`}
              style={!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie ? { borderColor: "var(--theme-border)" } : undefined}
            >
              {!isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie && (
                <>
                  <TraditionalGoldCorner className="absolute top-1 left-1 w-7 h-7 opacity-20 pointer-events-none" />
                  <TraditionalGoldCorner className="absolute top-1 right-1 w-7 h-7 -scale-x-100 opacity-20 pointer-events-none" />
                </>
              )}

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border inline-block mb-3 ${
                  isChinoiserie
                    ? "bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#E6C65C]"
                    : isCelestial
                    ? "bg-[#C8B6FF]/15 border-[#C8B6FF]/35 text-[#C8B6FF]"
                    : isTerracotta
                    ? "bg-[#BF573F]/10 border-[#BF573F]/25 text-[#BF573F]"
                    : isEmeraldNoir
                    ? "bg-[#D4AF37]/15 border-[#D4AF37]/35 text-[#F3E5AB]"
                    : isBrown
                    ? "bg-[#5C3410]/10 border-[#5C3410]/20 text-[#5C3410]"
                    : "text-white"
                }`}
                style={
                  !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                    ? {
                        backgroundColor: `${theme.colors.primary}26`,
                        borderColor: "var(--theme-border)",
                      }
                    : undefined
                }
              >
                Kirim Kado Fisik
              </span>
              <p
                className="text-xs font-semibold"
                style={{
                  color: isChinoiserie ? "#FAF7F0" : isCelestial ? "#F8F9FA" : isTerracotta ? "#2D231E" : isEmeraldNoir ? "#FFFDF0" : isBrown ? "#1A140E" : "white",
                }}
              >
                Penerima: {gift.receiverName} ({gift.phoneNumber})
              </p>
              <p
                className="text-xs mt-1 mb-4 leading-relaxed"
                style={{
                  color: isChinoiserie ? "#D1A7A0" : isCelestial ? "#8E9AAF" : isTerracotta ? "#857468" : isEmeraldNoir ? "#8BA398" : isBrown ? "#7A6B62" : "var(--theme-text-muted)",
                }}
              >
                {gift.address}
              </p>
              <button
                onClick={() => handleCopyAddress(gift.address)}
                className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md relative overflow-hidden group active:scale-95 ${
                  isChinoiserie
                    ? "btn-imperial-gold text-[#3B080C] font-semibold border border-[#FFE9AD]/70 shadow-[0_4px_20px_rgba(212,175,55,0.4)]"
                    : isCelestial
                    ? "btn-cosmic-shimmer text-[#080B14] font-semibold border border-[#FFF3B3]/60 shadow-[0_4px_20px_rgba(200,182,255,0.4)]"
                    : isTerracotta
                    ? "bg-[#BF573F] hover:bg-[#A94A34] text-[#FFFDFB] btn-tactile-clay border border-[#D98A76]/50 shadow-[0_4px_14px_rgba(191,87,63,0.25)]"
                    : isEmeraldNoir
                    ? "bg-gradient-to-r from-[#D4AF37] via-[#FFF3B3] to-[#D4AF37] text-[#061A14] border border-[#FFF4D0]/60 shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:brightness-105"
                    : isBrown
                    ? "bg-[#5C3410] hover:bg-[#4A2808] text-[#FFF9F6] border border-[#8B4E17]/30 shadow-[0_4px_16px_rgba(92,52,16,0.25)]"
                    : "border text-xs font-semibold hover:brightness-125"
                }`}
                style={
                  !isBrown && !isEmeraldNoir && !isTerracotta && !isCelestial && !isChinoiserie
                    ? {
                        backgroundColor: "var(--theme-bg-base)",
                        borderColor: "var(--theme-border)",
                        color: "var(--theme-accent)",
                      }
                    : undefined
                }
              >
                {(isEmeraldNoir || isChinoiserie) && (
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent animate-golden-sheen pointer-events-none" />
                )}
                {copiedAddress ? (
                  <>
                    <Check className={`w-3.5 h-3.5 ${isChinoiserie ? "text-[#3B080C]" : isCelestial ? "text-[#080B14]" : isTerracotta ? "text-[#FFFDFB]" : isEmeraldNoir ? "text-[#061A14]" : "text-emerald-300"}`} />
                    <span>Alamat Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className={`w-3.5 h-3.5 ${isChinoiserie ? "text-[#3B080C]" : isCelestial ? "text-[#080B14]" : isTerracotta ? "text-[#FFFDFB]" : isEmeraldNoir ? "text-[#061A14]" : ""}`} />
                    <span>Salin Alamat Kirim</span>
                  </>
                )}
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
