"use client";

import { Heart, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#EAE5DD] py-16 text-[#6B655E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#EAE5DD]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#A04F34] text-white flex items-center justify-center shadow-xs">
                <Heart className="w-4 h-4 fill-white/20 stroke-white" />
              </div>
              <span className="font-serif-display text-2xl font-bold tracking-tight text-[#1F1D1B]">
                Mengundang
              </span>
            </div>
            <p className="text-sm text-[#6B655E] max-w-sm leading-relaxed">
              Platform undangan pernikahan digital bernuansa hangat dan elegan. Dirancang agar mudah
              dibuat oleh calon mempelai dan nyaman dibuka oleh para tamu di ponsel mereka.
            </p>
            <div className="pt-2">
              <span className="text-xs text-[#8A837A] block">
                Server berlokasi di Jakarta, Indonesia • Cepat & Ringan
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#1F1D1B] uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#fitur" className="hover:text-[#1F1D1B] transition-colors">
                  Fitur Utama
                </a>
              </li>
              <li>
                <a href="#generator" className="hover:text-[#1F1D1B] transition-colors">
                  Generator WhatsApp
                </a>
              </li>
              <li>
                <a href="#tema" className="hover:text-[#1F1D1B] transition-colors">
                  Pilihan Tema
                </a>
              </li>
              <li>
                <a href="#hari-h" className="hover:text-[#1F1D1B] transition-colors">
                  Modul Hari Resepsi
                </a>
              </li>
              <li>
                <a href="#harga" className="hover:text-[#1F1D1B] transition-colors">
                  Harga & Paket
                </a>
              </li>
            </ul>
          </div>

          {/* Practical Resources */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#1F1D1B] uppercase tracking-wider">Informasi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq" className="hover:text-[#1F1D1B] transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
              <li>
                <a href="#harga" className="hover:text-[#1F1D1B] transition-colors">
                  Kalkulator Anggaran
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-[#1F1D1B] transition-colors">
                  Pratinjau Simulator
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#1F1D1B] uppercase tracking-wider">
              Bantuan Mempelai
            </h4>
            <p className="text-xs text-[#6B655E] leading-relaxed">
              Punya pertanyaan seputar pengisian data atau membutuhkan bantuan teknis? Hubungi tim
              kami melalui WhatsApp:
            </p>
            <a
              href="https://wa.me/6281234567890?text=Halo%20tim%20Mengundang,%20saya%20ingin%20tanya%20seputar%20undangan%20digital"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#EAE5DD] text-xs font-semibold text-[#1F1D1B] hover:bg-[#F7EFEA] hover:border-[#A04F34] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat WhatsApp Customer Care</span>
            </a>
          </div>
        </div>

        {/* Copyright & Sign-off */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A837A]">
          <p>&copy; {new Date().getFullYear()} Mengundang. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1 text-[#6B655E]">
            <span>Dibuat untuk memudahkan momen bahagia pernikahan di Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
