"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  QrCode,
  Tv,
  Camera,
  Users,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Smartphone,
  Printer,
  Volume2,
} from "lucide-react";

export default function ReceptionManagerView() {
  const [checkedInCount, setCheckedInCount] = useState(214);
  const totalExpected = 450;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE5DD] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                Meja Resepsi Hari-H
              </span>
              <span className="text-xs text-[#8A837A]">• Sinkronisasi Meja Tamu Real-time</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1F1D1B]">
              Check-in QR & Layar Sambutan TV
            </h1>
            <p className="text-xs sm:text-sm text-[#6B655E] mt-1">
              Pindai kode QR dari HP tamu saat tiba di venue untuk pencatatan kehadiran instan dan sapaan di layar proyektor.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCheckedInCount((c) => c + 1)}
              className="min-h-[44px] px-4 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white text-xs font-bold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Check-in Manual (+1)</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 pt-5 border-t border-[#EAE5DD]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#1F1D1B]">
              Kapasitas Ballroom Terisi
            </span>
            <span className="font-mono text-[#A04F34] font-bold text-sm">
              {checkedInCount} / {totalExpected} Pax ({Math.round((checkedInCount / totalExpected) * 100)}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#FAF8F5] border border-[#EAE5DD] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#A04F34] to-[#D4AF37] rounded-full transition-all duration-500"
              style={{ width: `${(checkedInCount / totalExpected) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid: 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Scanner Desk */}
        <div className="bg-white rounded-2xl p-6 border border-[#EAE5DD] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1F1D1B] flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#A04F34]" />
              <span>Kamera Pemindai Meja Registrasi</span>
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
              Kamera Aktif
            </span>
          </div>

          <div className="relative aspect-video rounded-2xl bg-[#181513] border border-[#2B2724] overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-8 border-2 border-dashed border-[#D4AF37]/60 rounded-xl pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] animate-bounce pointer-events-none" />
            <Camera className="w-10 h-10 text-[#6B655E]" />

            <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-xs rounded-xl text-xs text-center text-[#FAF8F5] font-mono">
              Arahkan QR Code Undangan Tamu ke Lensa
            </div>
          </div>

          <p className="text-xs text-[#6B655E] leading-relaxed">
            Mendukung pemindaian dari kamera laptop, HP panitia resepsi, atau barcode scanner USB eksternal.
          </p>
        </div>

        {/* Card 2: TV Display Launcher */}
        <div className="bg-[#181513] text-[#FAF8F5] rounded-2xl p-6 border border-[#2B2724] shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#D4AF37] flex items-center gap-1.5">
                <Tv className="w-4 h-4" />
                Layar Proyektor & TV Venue
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#2B2724] text-[#A89F91]">
                Full HD 1080p / 4K
              </span>
            </div>

            <h2 className="text-xl font-serif-display font-bold text-white mb-2">
              Layar Sambutan & Live Photo Feed
            </h2>
            <p className="text-xs text-[#A89F91] leading-relaxed">
              Tampilkan sapaan selamat datang otomatis setiap kali tamu melakukan check-in, lengkap dengan galeri foto snap booth tamu secara live.
            </p>

            <div className="my-5 p-4 rounded-xl bg-[#24201D] border border-[#38332E] space-y-2">
              <div className="text-xs font-semibold text-white">
                Tamu Terakhir yang Check-in:
              </div>
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-serif-display">
                <span>Prof. Dr. Ir. Bambang Soedibyo</span>
                <span className="font-sans text-[11px] text-[#A89F91]">19:04 WIB • Meja VIP 01</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#2B2724]">
            <Link
              href="/bento"
              className="w-full min-h-[44px] px-4 rounded-xl bg-[#E5C158] hover:bg-[#D4AF37] text-black text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Tv className="w-4 h-4" />
              <span>Buka Live Monitor Acara Fullscreen</span>
            </Link>

            <button
              type="button"
              onClick={() => alert("Mengunduh Template Nomor Meja & QR Standee (Format PDF Siap Cetak)...")}
              className="w-full min-h-[40px] px-4 rounded-xl bg-[#24201D] border border-[#38332E] hover:border-[#D4AF37] text-xs font-semibold text-[#FAF8F5] flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#A89F91]" />
              <span>Cetak Standee QR Meja Tamu (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
