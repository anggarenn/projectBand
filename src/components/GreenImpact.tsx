"use client";

import { Leaf, TreePine, Truck } from "lucide-react";

export default function GreenImpact() {
  return (
    <section className="py-16 md:py-20 bg-[#EDF3EE] border-y border-[#C8D9CB]/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1A2B1F] tracking-tight">
            Setiap undangan digital adalah langkah kecil untuk bumi
          </h2>
          <p className="text-sm text-[#4A6B50] mt-2 max-w-xl mx-auto leading-relaxed">
            Pernikahan rata-rata mengundang 300 keluarga. Beralih ke undangan digital
            mengurangi konsumsi kertas, tinta cetak, dan emisi transportasi kurir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#C8D9CB]/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#3A5743]/10 mx-auto flex items-center justify-center">
              <TreePine className="w-5 h-5 text-[#3A5743]" />
            </div>
            <div className="font-serif-display text-2xl font-bold text-[#1A2B1F]">
              ~1,5 <span className="text-base font-semibold">kg</span>
            </div>
            <p className="text-xs text-[#4A6B50] leading-snug">
              Kertas yang tidak terpakai per acara (kalkulasi 300 lembar undangan A5 + amplop)
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#C8D9CB]/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#3A5743]/10 mx-auto flex items-center justify-center">
              <Leaf className="w-5 h-5 text-[#3A5743]" />
            </div>
            <div className="font-serif-display text-2xl font-bold text-[#1A2B1F]">
              0 <span className="text-base font-semibold">tinta</span>
            </div>
            <p className="text-xs text-[#4A6B50] leading-snug">
              Tanpa proses cetak offset yang menggunakan tinta berbasis minyak dan pelarut kimia
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-[#C8D9CB]/60 text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#3A5743]/10 mx-auto flex items-center justify-center">
              <Truck className="w-5 h-5 text-[#3A5743]" />
            </div>
            <div className="font-serif-display text-2xl font-bold text-[#1A2B1F]">
              0 <span className="text-base font-semibold">km</span>
            </div>
            <p className="text-xs text-[#4A6B50] leading-snug">
              Jarak distribusi fisik yang dihindari, cukup kirim lewat WhatsApp dalam hitungan detik
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#6B7E6F] text-center mt-6">
          Estimasi per acara berdasarkan asumsi 300 undangan fisik ukuran A5 (80gsm) dengan amplop.
          Angka aktual bervariasi tergantung jumlah tamu.
        </p>
      </div>
    </section>
  );
}
