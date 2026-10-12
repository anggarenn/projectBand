"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Users,
  Send,
  CreditCard,
  QrCode,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  SlidersHorizontal,
  Share2,
  Activity,
} from "lucide-react";

interface EventOverviewViewProps {
  onNavigate: (
    view: "overview" | "editor" | "guests" | "rsvp" | "broadcast" | "reception" | "bento"
  ) => void;
}

export default function EventOverviewView({ onNavigate }: EventOverviewViewProps) {
  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* WELCOME BANNER & COUNTDOWN POD                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-[#181513] text-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#2B2724] relative overflow-hidden shadow-sm">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                Event Command Hub
              </span>
              <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
              <span className="text-xs text-[#A89F91]">
                Rabu, 31 Desember 2025 • Sasana Kriya TMII
              </span>
            </div>

            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Sarah Amalia & Faizal Aditya
            </h1>

            <p className="text-xs sm:text-sm text-[#C4B9AA] max-w-xl leading-relaxed">
              Selamat datang di pusat kendali pernikahan Anda. Kelola pembagian undangan
              WhatsApp personal, rekap konfirmasi kehadiran, hingga registrasi QR hari-H.
            </p>
          </div>

          {/* Countdown Clock Pods */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {[
              { val: "284", label: "Hari" },
              { val: "14", label: "Jam" },
              { val: "38", label: "Menit" },
              { val: "19", label: "Detik" },
            ].map((unit, i) => (
              <div
                key={i}
                className="bg-[#24201D] border border-[#38332E] rounded-2xl p-3 sm:p-4 text-center min-w-[64px] sm:min-w-[72px]"
              >
                <span className="font-serif-display text-xl sm:text-3xl font-bold text-[#D4AF37] block">
                  {unit.val}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#A89F91] font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 CORE KPI METRICS                                            */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tamu & RSVP */}
        <div
          onClick={() => onNavigate("rsvp")}
          className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs hover:border-[#A04F34] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              RSVP Kehadiran
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EDF3EE] text-[#3A5743] flex items-center justify-center group-hover:bg-[#3A5743] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-1">
            384 <span className="text-sm font-sans font-normal text-[#6B655E]">/ 450 Pax</span>
          </div>
          <div className="text-xs text-green-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>85.3% Terkonfirmasi Hadir</span>
          </div>
        </div>

        {/* Card 2: WhatsApp Broadcast */}
        <div
          onClick={() => onNavigate("broadcast")}
          className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs hover:border-[#A04F34] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              Kirim Undangan WA
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF2EB] text-[#A04F34] flex items-center justify-center group-hover:bg-[#A04F34] group-hover:text-white transition-colors">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-1">
            412 <span className="text-sm font-sans font-normal text-[#6B655E]">Kontak</span>
          </div>
          <div className="text-xs text-blue-700 font-medium flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" />
            <span>Link Personal Otomatis</span>
          </div>
        </div>

        {/* Card 3: Amplop Digital */}
        <div
          onClick={() => onNavigate("editor")}
          className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs hover:border-[#A04F34] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              Amplop Digital
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#1F1D1B] flex items-center justify-center group-hover:bg-[#1F1D1B] group-hover:text-white transition-colors">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-xl sm:text-2xl font-bold text-[#1F1D1B] mb-1 truncate">
            Rp 48.750.000
          </div>
          <div className="text-xs text-[#8A837A] font-medium">
            2 Rekening BCA & QRIS Aktif
          </div>
        </div>

        {/* Card 4: Live Monitor Acara */}
        <div
          onClick={() => onNavigate("bento")}
          className="bg-white text-[#1F1D1B] rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs hover:border-[#A04F34] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#A04F34] uppercase tracking-wider">
              Live Monitor Acara
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF2EB] text-[#A04F34] flex items-center justify-center group-hover:bg-[#A04F34] group-hover:text-white transition-colors">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-xl sm:text-2xl font-bold text-[#1F1D1B] mb-1">
            Status Hari-H
          </div>
          <div className="text-xs text-[#8A837A] font-medium flex items-center gap-1 group-hover:text-[#A04F34] transition-colors">
            <span>Terminal Meja & Resepsi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2-COLUMN ACTION PANELS                                        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Actions */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#EAE5DD] shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#1F1D1B] flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#A04F34]" />
            <span>Pintasan Cepat Manajemen Acara</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigate("broadcast")}
              className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] hover:border-[#A04F34] hover:bg-[#FAF2EB] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#166534] flex items-center justify-center font-bold">
                  <Send className="w-4 h-4" />
                </span>
                <ArrowRight className="w-4 h-4 text-[#8A837A] group-hover:text-[#A04F34] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-sm text-[#1F1D1B]">
                Kirim Broadcast WA
              </h3>
              <p className="text-xs text-[#6B655E] mt-0.5">
                Generate link tamu personal & kirim ke kontak keluarga / sahabat.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("editor")}
              className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] hover:border-[#A04F34] hover:bg-[#FAF2EB] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#FAF2EB] text-[#A04F34] flex items-center justify-center font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                </span>
                <ArrowRight className="w-4 h-4 text-[#8A837A] group-hover:text-[#A04F34] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-sm text-[#1F1D1B]">
                Editor Isi Undangan
              </h3>
              <p className="text-xs text-[#6B655E] mt-0.5">
                Ubah profil mempelai, jadwal acara, galeri foto, dan lagu latar.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate("guests")}
              className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] hover:border-[#A04F34] hover:bg-[#FAF2EB] text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#EDF3EE] text-[#3A5743] flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </span>
                <ArrowRight className="w-4 h-4 text-[#8A837A] group-hover:text-[#A04F34] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-sm text-[#1F1D1B]">
                Daftar Tamu Undangan
              </h3>
              <p className="text-xs text-[#6B655E] mt-0.5">
                Kelola calon tamu yang akan diundang, kuota pax, sesi, dan alokasi meja.
              </p>
            </button>

            <Link
              href="/demo/motion-art-jawa"
              target="_blank"
              className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] hover:border-[#A04F34] hover:bg-[#FAF2EB] text-left transition-all cursor-pointer group block"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-lg bg-[#181513] text-[#D4AF37] flex items-center justify-center font-bold">
                  <ExternalLink className="w-4 h-4" />
                </span>
                <ArrowRight className="w-4 h-4 text-[#8A837A] group-hover:text-[#A04F34] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-semibold text-sm text-[#1F1D1B]">
                Lihat Undangan Tamu
              </h3>
              <p className="text-xs text-[#6B655E] mt-0.5">
                Preview pengalaman tamu dengan tema Motion Art Jawa 60fps.
              </p>
            </Link>
          </div>
        </div>

        {/* Right: Readiness Checklist */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#EAE5DD] shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#1F1D1B]">
              Status Kesiapan Acara
            </h2>
            <span className="text-xs font-bold text-[#A04F34] bg-[#FAF2EB] px-2.5 py-1 rounded-full border border-[#F0D5C7]">
              94% Siap
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {[
              {
                title: "Data Mempelai & Orang Tua",
                desc: "Foto sarah & faizal, nama gelar lengkap terverifikasi",
                done: true,
              },
              {
                title: "Rundown Akad & Resepsi",
                desc: "Jadwal 31 Des 2025 & tautan Google Maps TMII aktif",
                done: true,
              },
              {
                title: "Amplop Digital & QRIS",
                desc: "Nomor rekening BCA & Mandiri aktif",
                done: true,
              },
              {
                title: "Distribusi Undangan WhatsApp",
                desc: "412 dari 450 kontak telah menerima link personal",
                done: true,
              },
              {
                title: "Sinkronisasi Terminal Meja Tamu Hari-H",
                desc: "QR scanner resepsi & layar TV sambutan tamu siap",
                done: false,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] flex items-start gap-3"
              >
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-semibold text-[#1F1D1B]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#6B655E] mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
