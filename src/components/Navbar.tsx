"use client";

import { useState } from "react";
import { Heart, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenDraft: () => void;
}

export default function Navbar({ onOpenDraft }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass-surface border-b border-[#EAE5DD]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34] rounded-lg"
          aria-label="Mengundang Beranda"
        >
          <div className="w-9 h-9 rounded-xl bg-[#A04F34] text-white flex items-center justify-center shadow-sm group-hover:bg-[#873E27] transition-colors">
            <Heart className="w-4 h-4 fill-white/20 stroke-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif-display text-xl font-bold tracking-tight text-[#1F1D1B]">
              Mengundang
            </span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#8A837A] font-medium mt-0.5">
              Digital Invitation
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navigasi Utama">
          {[
            { label: "Fitur", href: "#fitur" },
            { label: "Template", href: "#tema" },
            { label: "Hari-H", href: "#hari-h" },
            { label: "Harga", href: "#harga" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-[13px] font-medium text-[#6B655E] hover:text-[#1F1D1B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34] rounded-lg hover:bg-[#F7EFEA]/60"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/demo/snap-photo"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 text-[13px] font-medium text-[#A04F34] hover:text-[#873E27] transition-colors rounded-lg hover:bg-[#F7EFEA]"
          >
            Demo Snap-Photo
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/dashboard"
            className="text-[13px] font-semibold text-[#6B655E] hover:text-[#1F1D1B] px-3 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34] rounded-lg"
          >
            Dashboard
          </a>
          <button
            onClick={onOpenDraft}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#A04F34] text-white text-[13px] font-semibold hover:bg-[#873E27] active:scale-[0.97] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34] focus-visible:ring-offset-2"
          >
            <span>Buat Undangan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-[#EAE5DD] text-[#1F1D1B] hover:bg-[#FAF8F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigasi menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EAE5DD] bg-white/95 backdrop-blur-xl px-4 pt-2 pb-5 space-y-1 animate-fadeIn">
          {[
            { label: "Fitur Utama", href: "#fitur" },
            { label: "Template Undangan", href: "#tema" },
            { label: "Modul Hari-H", href: "#hari-h" },
            { label: "Harga Paket", href: "#harga" },
            { label: "Tanya Jawab", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-[15px] font-medium text-[#1F1D1B] hover:bg-[#F7EFEA] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDraft();
              }}
              className="w-full h-12 rounded-xl bg-[#A04F34] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              Mulai Buat Undangan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
