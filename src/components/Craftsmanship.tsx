"use client";

import { Sparkles, HeartHandshake, EyeOff, Smartphone } from "lucide-react";

export default function Craftsmanship() {
  return (
    <section className="py-20 md:py-32 bg-[#FAF6F0] border-t border-[#EAE5DD] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Editorial Image Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 grid grid-cols-12 gap-4">
              {/* Primary Large Image */}
              <div className="col-span-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] relative group">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                  alt="Fine Art Wedding Editorial"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-white/80 block">
                      Fine Art Editorial
                    </span>
                    <span className="font-serif-display text-lg font-bold">
                      Keindahan Tanpa Kompromi
                    </span>
                  </div>
                </div>
              </div>

              {/* Secondary Floating Image */}
              <div className="col-span-4 space-y-4 pt-10">
                <div className="rounded-2xl overflow-hidden shadow-lg border-2 border-white aspect-[3/4] relative group">
                  <img
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500&auto=format&fit=crop"
                    alt="Wedding Romance"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs text-center">
                  <span className="font-serif-display text-2xl font-bold text-[#A04F34] block">
                    100%
                  </span>
                  <span className="text-[11px] text-[#6B655E] mt-0.5 block leading-tight font-medium">
                    Bebas Watermark &amp; Iklan Pihak Ketiga
                  </span>
                </div>
              </div>
            </div>

            {/* Subtle background luxury stamp */}
            <div
              className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full border border-[#C59B3C]/30 flex items-center justify-center p-2 pointer-events-none opacity-60"
              aria-hidden="true"
            >
              <div className="w-full h-full rounded-full border border-dashed border-[#C59B3C]/40 flex items-center justify-center">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C59B3C] font-serif-display text-center">
                  MENGUNDANG<br />EST. 2026
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Craftsmanship Values */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7EFEA] text-[#A04F34] text-xs font-semibold border border-[#EAE5DD]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Standar Kualitas Tertinggi</span>
              </div>

              <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#1F1D1B] tracking-tight leading-tight">
                Dirancang selayaknya undangan fisik di atas kertas katun murni
              </h2>

              <p className="text-base text-[#6B655E] leading-relaxed">
                Kami percaya undangan pernikahan adalah representasi penghormatan kepada keluarga
                dan tamu undangan. Karena itu, setiap tema di Mengundang bebas dari elemen norak,
                pop-up yang mengagetkan, atau tombol iklan yang menurunkan kesakralan acara Anda.
              </p>
            </div>

            {/* Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#A04F34]/10 text-[#A04F34] flex items-center justify-center shrink-0 mt-0.5">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Pengalaman Tamu yang Khidmat &amp; Bersih
                  </h3>
                  <p className="text-xs text-[#6B655E] mt-1 leading-relaxed">
                    Tidak ada banner iklan pinjaman online, sponsor aplikasi, atau musik autoplay
                    yang memekakkan telinga tanpa kendali tamu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#C59B3C]/10 text-[#C59B3C] flex items-center justify-center shrink-0 mt-0.5">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Optimal di Semua Tipe Layar Ponsel
                  </h3>
                  <p className="text-xs text-[#6B655E] mt-1 leading-relaxed">
                    Ukuran font dan jarak ketuk tombol telah diuji agar mudah dibaca oleh generasi
                    orang tua tanpa perlu memperbesar layar berkali-kali.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#EAE5DD] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#3A5743]/10 text-[#3A5743] flex items-center justify-center shrink-0 mt-0.5">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Privasi Data Mempelai Terlindungi
                  </h3>
                  <p className="text-xs text-[#6B655E] mt-1 leading-relaxed">
                    Nomor rekening dan informasi pribadi Anda tidak akan pernah dibagikan atau
                    dijual ke pihak ketiga mana pun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
