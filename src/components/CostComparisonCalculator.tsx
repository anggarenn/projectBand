"use client";

import { useState } from "react";
import { Calculator, Sparkles, TrendingDown } from "lucide-react";

export default function CostComparisonCalculator() {
  const [guestCount, setGuestCount] = useState(300);

  // Estimasi biaya cetak fisik rata-rata per lembar di Indonesia: Rp 4.500
  // Biaya bensin/ekspedisi antar undangan fisik rata-rata: Rp 250.000
  const physicalPrintCost = guestCount * 4500 + 250000;
  const mengundangCost = 49000;
  const savings = physicalPrintCost - mengundangCost;
  const savingsPercentage = Math.round((savings / physicalPrintCost) * 100);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE5DD] shadow-xs max-w-4xl mx-auto mb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAE5DD]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7EFEA] text-[#A04F34] text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Kalkulator Estimasi Anggaran</span>
          </div>
          <h3 className="font-serif-display text-2xl font-bold text-[#1F1D1B]">
            Bandingkan biaya undangan fisik vs undangan digital
          </h3>
          <p className="text-xs sm:text-sm text-[#6B655E] mt-1">
            Geser slider jumlah tamu untuk melihat estimasi penghematan biaya riil pernikahan Anda.
          </p>
        </div>

        <div className="bg-[#FAF8F5] px-4 py-3 rounded-2xl border border-[#EAE5DD] text-right shrink-0">
          <span className="text-[11px] text-[#6B655E] block">Target Tamu Undangan:</span>
          <span className="font-serif-display text-2xl font-bold text-[#A04F34]">
            {guestCount} Pasang/Keluarga
          </span>
        </div>
      </div>

      {/* Slider Control */}
      <div className="py-6">
        <div className="flex justify-between text-xs text-[#8A837A] mb-2 font-medium">
          <span>50 Tamu</span>
          <span>500 Tamu</span>
          <span>1.000 Tamu</span>
        </div>
        <input
          type="range"
          min="50"
          max="1000"
          step="25"
          value={guestCount}
          onChange={(e) => setGuestCount(Number(e.target.value))}
          className="w-full h-2.5 bg-[#FAF8F5] rounded-lg appearance-none cursor-pointer accent-[#A04F34] border border-[#EAE5DD]"
          aria-label="Slider jumlah tamu undangan"
        />
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Undangan Fisik */}
        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2">
          <span className="text-xs font-semibold text-[#6B655E] block">Undangan Cetak Fisik</span>
          <p className="font-serif-display text-xl font-bold text-[#1F1D1B]">
            {formatRupiah(physicalPrintCost)}
          </p>
          <p className="text-[11px] text-[#8A837A] leading-snug">
            Termasuk biaya cetak rata-rata Rp 4.500/pcs + biaya kurir/transportasi antar undangan.
          </p>
        </div>

        {/* Mengundang Digital */}
        <div className="p-4 rounded-2xl bg-[#F7EFEA] border border-[#EAE5DD] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-[#A04F34]">Mengundang Digital</span>
            <span className="text-[10px] bg-white text-[#A04F34] px-2 py-0.5 rounded-full font-bold border border-[#EAE5DD]">
              Sekali Bayar
            </span>
          </div>
          <p className="font-serif-display text-xl font-bold text-[#A04F34]">
            {formatRupiah(mengundangCost)}
          </p>
          <p className="text-[11px] text-[#6B655E] leading-snug">
            Tamu tak terbatas, kirim via WhatsApp, revisi kapan saja tanpa biaya cetak ulang.
          </p>
        </div>

        {/* Total Penghematan */}
        <div className="p-4 rounded-2xl bg-[#EDF3EE] border border-[#D7E3D9] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3A5743]">
            <TrendingDown className="w-4 h-4" />
            <span>Estimasi Penghematan</span>
          </div>
          <p className="font-serif-display text-xl font-bold text-[#3A5743]">
            {formatRupiah(savings)}
          </p>
          <p className="text-[11px] text-[#3A5743] leading-snug font-medium">
            Anda menghemat hingga {savingsPercentage}% anggaran untuk dialihkan ke katering atau
            tabungan rumah tangga.
          </p>
        </div>
      </div>
    </div>
  );
}
