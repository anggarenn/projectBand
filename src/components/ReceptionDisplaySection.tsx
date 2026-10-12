"use client";

import { useState } from "react";
import { Tv, QrCode, Heart, Check, Users, Sparkles } from "lucide-react";

export default function ReceptionDisplaySection() {
  const [viewMode, setViewMode] = useState<"screen" | "scanner">("screen");

  return (
    <section id="hari-h" className="py-20 bg-[#1F1D1B] text-white overflow-hidden relative">
      {/* Background soft glow */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#A04F34]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#C59B3C] text-xs font-semibold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Eksklusif Hari Resepsi</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Ubah layar TV gedung jadi penyambut tamu interaktif
          </h2>
          <p className="text-base text-[#D8D2C7] mt-3 leading-relaxed">
            Tidak perlu lagi antrean panjang di meja resepsionis hanya untuk menulis buku tamu manual.
            Tamu cukup menunjukkan kode QR dari undangan mereka, dan ucapan selamat langsung
            tertayang di layar videotron atau smart TV gedung.
          </p>

          {/* Toggle View Mode */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white/10 border border-white/15 mt-8">
            <button
              onClick={() => setViewMode("screen")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                viewMode === "screen"
                  ? "bg-white text-[#1F1D1B] shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <Tv className="w-4 h-4" />
              <span>Simulasi Layar TV Foyer / Panggung</span>
            </button>
            <button
              onClick={() => setViewMode("scanner")}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                viewMode === "scanner"
                  ? "bg-white text-[#1F1D1B] shadow-sm"
                  : "text-white/80 hover:text-white"
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Simulasi Scanner Meja Resepsionis</span>
            </button>
          </div>
        </div>

        {/* Interactive Screen Preview */}
        <div className="max-w-4xl mx-auto">
          {viewMode === "screen" ? (
            /* TV Display Simulator */
            <div className="bg-[#121110] border-4 border-[#332F2B] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Stand / Bezel accent */}
              <div className="flex justify-between items-center pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono text-white/70 uppercase tracking-wider">
                    LIVE RECEPTION DISPLAY • HOTEL GRAN MAHAKAM
                  </span>
                </div>
                <span className="text-xs text-white/60 font-mono">11:42 WIB</span>
              </div>

              {/* Main TV Content */}
              <div className="text-center py-6">
                <p className="text-xs text-[#C59B3C] font-semibold tracking-widest uppercase mb-2">
                  SELAMAT DATANG DI RESEPSI PERNIKAHAN
                </p>
                <h3 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  Dimas Pratama & Amanda Putri
                </h3>
                <p className="text-sm text-white/70 mt-2 font-serif-display italic">
                  Sabtu, 24 Oktober 2026
                </p>
              </div>

              {/* Live Guest Check-in Announcement Toast */}
              <div className="my-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center justify-between animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#A04F34] flex items-center justify-center font-bold text-sm text-white">
                    BS
                  </div>
                  <div>
                    <span className="text-xs text-white/60 block">Baru saja tiba:</span>
                    <span className="text-base font-bold text-white">
                      Bapak Budi Santoso & Partner
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Check className="w-3.5 h-3.5" />
                    Meja VIP 03
                  </span>
                </div>
              </div>

              {/* Running Wishes Carousel Simulator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs space-y-1">
                  <span className="font-semibold text-[#C59B3C] block">
                    Keluarga Besar dr. H. Irawan
                  </span>
                  <p className="text-white/80 text-[11px] leading-snug">
                    &ldquo;Barakallahu lakum wa baraka alaikum. Bahagia selalu kedua mempelai!&rdquo;
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-xs space-y-1">
                  <span className="font-semibold text-[#C59B3C] block">Rian & Maya</span>
                  <p className="text-white/80 text-[11px] leading-snug">
                    &ldquo;Happy wedding Dimas & Amanda! Langgeng sampai kakek nenek.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Receptionist Desk QR Scanner Simulator */
            <div className="bg-[#FAF8F5] text-[#1F1D1B] rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg mx-auto border border-[#EAE5DD]">
              <div className="text-center mb-6">
                <span className="text-[11px] font-bold text-[#A04F34] uppercase tracking-wider block mb-1">
                  Modul Panitia Resepsi
                </span>
                <h3 className="font-serif-display text-2xl font-bold text-[#1F1D1B]">
                  Pindai QR Tamu di Meja Registrasi
                </h3>
                <p className="text-xs text-[#6B655E] mt-1">
                  Dapat dibuka langsung dari browser smartphone panitia tanpa install aplikasi.
                </p>
              </div>

              {/* Simulated Camera Viewfinder */}
              <div className="w-64 h-64 mx-auto border-2 border-dashed border-[#A04F34] rounded-3xl p-3 flex flex-col items-center justify-center bg-white relative overflow-hidden shadow-inner">
                <div className="w-48 h-48 border-2 border-[#1F1D1B] rounded-2xl flex items-center justify-center p-4 relative">
                  {/* Corner accents */}
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#A04F34]" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#A04F34]" />
                  <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#A04F34]" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#A04F34]" />

                  <QrCode className="w-28 h-28 text-[#1F1D1B]" />
                </div>
                <span className="text-[10px] text-[#6B655E] mt-3 font-medium">
                  Arahkan kamera ke QR undangan tamu
                </span>
              </div>

              {/* Scan result simulation */}
              <div className="mt-6 bg-[#F7EFEA] p-4 rounded-2xl border border-[#EAE5DD] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8A837A] block">Tamu Terverifikasi:</span>
                  <span className="text-sm font-bold text-[#1F1D1B]">
                    Bapak Budi Santoso (2 Orang)
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-semibold">
                  Tercatat Hadir
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
