"use client";

import { ArrowRight, Play, Sparkles, ShieldCheck, Heart, Banknote } from "lucide-react";
import PhoneSimulator from "./PhoneSimulator";

interface HeroProps {
  onOpenDraft: () => void;
}

export default function Hero({ onOpenDraft }: HeroProps) {
  return (
    <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#FAF8F5]">
      {/* Editorial Luxury Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#F5ECE5] via-[#FAF3EC] to-transparent opacity-70 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#FBF6EB] via-[#F3EAD8] to-transparent opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#EDF3EE] to-transparent opacity-40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-7">
            {/* Status / Category Tag */}
            <div className="animate-fadeInUp inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#EAE5DD] text-[#A04F34] text-xs font-semibold tracking-wide shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B3C]" />
              <span className="tracking-wider uppercase text-[11px]">Estetika Majalah Bridal · Privasi Penuh</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="animate-fadeInUp stagger-1 font-serif-display text-[2.75rem] sm:text-5xl lg:text-[3.75rem] font-bold tracking-tight text-[#1F1D1B] leading-[1.1]">
              Kemewahan abadi,
              <br />
              <span className="font-serif-display italic font-normal text-[#A04F34]">
                disampaikan secara
              </span>{" "}
              personal.
            </h1>

            {/* Subtitle */}
            <p className="animate-fadeInUp stagger-2 text-base sm:text-lg text-[#6B655E] leading-relaxed max-w-xl font-normal">
              Bukan sekadar link website biasa. Setiap tamu disambut dengan tata nama personal di sampul,
              tipografi editorial berkelas galeri seni, RSVP otomatis, dan amplop digital yang langsung
              masuk ke rekening pribadi Anda tanpa potongan.
            </p>

            {/* High-Craft Feature Pillars */}
            <div className="animate-fadeInUp stagger-3 grid grid-cols-2 gap-4 pt-1 max-w-lg">
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#EAE5DD] backdrop-blur-xs">
                <span className="font-serif-display text-lg font-bold text-[#1F1D1B] block">
                  0% Potongan
                </span>
                <span className="text-xs text-[#8A837A] mt-0.5 block leading-snug">
                  Amplop transfer &amp; QRIS langsung ke rekening Anda
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#EAE5DD] backdrop-blur-xs">
                <span className="font-serif-display text-lg font-bold text-[#1F1D1B] block">
                  Bebas Iklan
                </span>
                <span className="text-xs text-[#8A837A] mt-0.5 block leading-snug">
                  Tanpa pop-up sponsor atau banner komersial yang mengganggu
                </span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="animate-fadeInUp stagger-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenDraft}
                className="h-[54px] px-8 rounded-2xl bg-[#A04F34] text-white font-semibold text-[15px] flex items-center justify-center gap-2.5 hover:bg-[#873E27] active:scale-[0.98] transition-all shadow-lg shadow-[#A04F34]/20 animate-pulseGlow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34]"
              >
                <span>Mulai Buat Draf Gratis</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>

              <a
                href="#simulator"
                className="h-[54px] px-6 rounded-2xl border border-[#D8D2C7] bg-white text-[#1F1D1B] font-semibold text-[15px] flex items-center justify-center gap-2 hover:bg-[#FAF8F5] hover:border-[#C5BFB5] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34]"
              >
                <Play className="w-4 h-4 text-[#A04F34]" />
                <span>Coba Simulator Interaktif</span>
              </a>
            </div>

            {/* Reassurance */}
            <div className="animate-fadeInUp stagger-5 flex items-center gap-6 pt-1 text-xs text-[#8A837A]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3A5743]" />
                <span>Bayar Rp 49.000 hanya saat siap dipublikasikan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Simulator */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end animate-slideInRight">
            <div className="animate-float">
              <PhoneSimulator />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
