"use client";

import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import CostComparisonCalculator from "./CostComparisonCalculator";

interface PricingProps {
  onSelectPlan: (planCode: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section id="harga" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7EFEA] text-[#A04F34] text-xs font-semibold mb-4 border border-[#EAE5DD]/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biaya Jujur dan Transparan</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1F1D1B] tracking-tight leading-tight">
            Pilih paket sesuai kebutuhan pernikahan Anda
          </h2>
          <p className="text-base sm:text-lg text-[#6B655E] mt-4 leading-relaxed max-w-2xl mx-auto">
            Tanpa biaya tersembunyi, tanpa langganan bulanan. Anda bebas membuat draf dan menguji
            tampilan undangan sampai puas secara gratis, bayar hanya ketika Anda siap
            mempublikasikan tautan resmi.
          </p>
          <div className="divider-ornament mt-8 max-w-xs mx-auto">
            <span className="text-[#D8D2C7]">&#10022;</span>
          </div>
        </div>

        {/* Cost Comparison Slider */}
        <CostComparisonCalculator />

        {/* The 2 Authentic Pricing Cards (Strictly No AI 3-column template) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Paket Basic Rp 49.000 */}
          <div className="bg-white rounded-3xl border border-[#EAE5DD] p-8 sm:p-10 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-[#6B655E] uppercase tracking-wider">
                  Paket Basic
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE5DD] text-[#6B655E]">
                  Paling Hemat
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1F1D1B]">
                    Rp 49.000
                  </span>
                  <span className="text-xs text-[#8A837A]">/ sekali bayar</span>
                </div>
                <p className="text-xs text-[#6B655E] mt-2">
                  Ideal untuk acara syukuran akad intim dan resepsi keluarga sederhana.
                </p>
              </div>

              <div className="w-full h-px bg-[#EAE5DD] my-6" />

              <div className="space-y-3.5 text-xs sm:text-sm text-[#4A453F]">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>
                    Masa aktif sampai <strong>H+30</strong> setelah hari acara
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>
                    Personalisasi nama tamu <strong>tanpa batas kuota</strong>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Maksimal 10 foto galeri prewedding</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>RSVP & Buku Tamu online terpusat</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Pemutar musik latar otomatis</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Amplop transfer digital & QRIS langsung rekening</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Petunjuk lokasi Google Maps presisi</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Bebas revisi data kapan saja</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onSelectPlan("basic_49k")}
                className="w-full h-12 rounded-xl border border-[#D8D2C7] bg-white hover:bg-[#FAF8F5] text-[#1F1D1B] font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <span>Pilih Paket Basic</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Paket Pro Rp 99.000 (Highlighted) */}
          <div className="bg-white rounded-3xl border-2 border-[#A04F34] p-8 sm:p-10 shadow-xl shadow-[#A04F34]/8 relative flex flex-col justify-between animate-shimmer">
            {/* Top highlight ribbon */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#A04F34] text-white text-[11px] font-bold px-5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              Solusi Lengkap Resepsi
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 pt-1">
                <span className="text-xs font-bold text-[#A04F34] uppercase tracking-wider">
                  Paket Pro Resepsi
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F7EFEA] text-[#A04F34] font-semibold">
                  Fitur Paling Lengkap
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1F1D1B]">
                    Rp 99.000
                  </span>
                  <span className="text-xs text-[#8A837A]">/ sekali bayar</span>
                </div>
                <p className="text-xs text-[#6B655E] mt-2">
                  Lengkap dengan modul registrasi meja tamu dan layar TV panggung gedung.
                </p>
              </div>

              <div className="w-full h-px bg-[#EAE5DD] my-6" />

              <div className="space-y-3.5 text-xs sm:text-sm text-[#4A453F]">
                <div className="flex items-start gap-2.5 font-medium text-[#1F1D1B]">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Semua fitur yang ada pada Paket Basic</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>
                    Masa aktif <strong>1 tahun penuh</strong> (365 hari)
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Maksimal 30 foto galeri + Video YouTube</span>
                </div>
                <div className="flex items-start gap-2.5 bg-[#F7EFEA] p-2 rounded-xl text-[#A04F34] font-semibold">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Modul Check-in QR Meja Resepsionis Panitia</span>
                </div>
                <div className="flex items-start gap-2.5 bg-[#F7EFEA] p-2 rounded-xl text-[#A04F34] font-semibold">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Tampilan Layar TV Gedung (Live Guest Display)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Export rekap kehadiran & ucapan ke Excel/CSV</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#A04F34] shrink-0 mt-0.5" />
                  <span>Prioritas bantuan teknis langsung via WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => onSelectPlan("pro_99k")}
                className="w-full h-12 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <span>Pilih Paket Pro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Peace of mind banner */}
        <div className="mt-12 text-center text-xs text-[#6B655E] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#3A5743]" />
          <span>
            Jaminan pembayaran aman melalui QRIS resmi. Anda tidak akan ditagih sebelum menyetujui
            draf akhir.
          </span>
        </div>
      </div>
    </section>
  );
}
