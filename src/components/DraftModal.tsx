"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Heart, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";

interface DraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

export default function DraftModal({ isOpen, onClose, selectedPlan }: DraftModalProps) {
  const [groomName, setGroomName] = useState("");
  const [brideName, setBrideName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [plan, setPlan] = useState(selectedPlan || "basic_49k");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPlan) {
      setPlan(selectedPlan);
    }
  }, [selectedPlan]);

  // Handle ESC key to close modal (R-32 accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groomName.trim() || !brideName.trim() || !whatsapp.trim()) return;

    setIsSubmitting(true);
    // Persist to invitationStore in localStorage
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("mengundang_invitation_data");
        const parsed = stored ? JSON.parse(stored) : null;
        if (parsed) {
          parsed.coverTitle = `${brideName.trim()} & ${groomName.trim()}`;
          parsed.groom.name = `${groomName.trim()}, S.T.`;
          parsed.groom.nickname = groomName.trim();
          parsed.bride.name = `${brideName.trim()}, S.I.Kom`;
          parsed.bride.nickname = brideName.trim();
          localStorage.setItem("mengundang_invitation_data", JSON.stringify(parsed));
          window.dispatchEvent(new Event("invitation-data-updated"));
        }
      } catch (err) {
        // Fallback silently
      }
    }

    // Simulate instant draft creation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 400);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setGroomName("");
    setBrideName("");
    setWhatsapp("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="draft-modal-title"
    >
      <div
        className="bg-white w-full max-w-lg rounded-3xl border border-[#EAE5DD] shadow-2xl p-6 sm:p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EAE5DD] flex items-center justify-center text-[#6B655E] hover:text-[#1F1D1B] hover:bg-[#F7EFEA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34]"
          aria-label="Tutup jendela modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 mb-2 text-[#A04F34]">
              <Heart className="w-5 h-5 fill-[#A04F34]/20" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Mulai Draf Undangan Gratis
              </span>
            </div>

            <h3
              id="draft-modal-title"
              className="font-serif-display text-2xl font-bold text-[#1F1D1B] tracking-tight"
            >
              Langkah awal menuju hari bahagia Anda
            </h3>
            <p className="text-xs sm:text-sm text-[#6B655E] mt-1.5 mb-6">
              Isi data dasar kedua mempelai di bawah ini. Anda dapat melengkapi foto, jadwal, dan
              lagu nanti di halaman editor.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="groom-input"
                    className="block text-xs font-semibold text-[#1F1D1B] mb-1"
                  >
                    Nama Panggilan Pria
                  </label>
                  <input
                    id="groom-input"
                    type="text"
                    required
                    placeholder="Contoh: Dimas"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bride-input"
                    className="block text-xs font-semibold text-[#1F1D1B] mb-1"
                  >
                    Nama Panggilan Wanita
                  </label>
                  <input
                    id="bride-input"
                    type="text"
                    required
                    placeholder="Contoh: Amanda"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="wa-input"
                  className="block text-xs font-semibold text-[#1F1D1B] mb-1"
                >
                  Nomor WhatsApp Aktif
                </label>
                <input
                  id="wa-input"
                  type="tel"
                  required
                  placeholder="Contoh: 08123456789"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                />
                <span className="text-[11px] text-[#8A837A] mt-1 block">
                  Digunakan untuk mengirimkan tautan akses draf dan notifikasi konfirmasi tamu.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1F1D1B] mb-1.5">
                  Pilihan Paket Awal
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPlan("basic_49k")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      plan === "basic_49k"
                        ? "border-[#A04F34] bg-[#F7EFEA]"
                        : "border-[#EAE5DD] bg-[#FAF8F5]"
                    }`}
                  >
                    <span className="font-semibold text-xs text-[#1F1D1B] block">Basic</span>
                    <span className="font-serif-display font-bold text-sm text-[#A04F34]">
                      Rp 49.000
                    </span>
                    <span className="text-[10px] text-[#6B655E] block mt-0.5">Aktif H+30 Hari</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPlan("pro_99k")}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      plan === "pro_99k"
                        ? "border-[#A04F34] bg-[#F7EFEA]"
                        : "border-[#EAE5DD] bg-[#FAF8F5]"
                    }`}
                  >
                    <span className="font-semibold text-xs text-[#1F1D1B] block">Pro Resepsi</span>
                    <span className="font-serif-display font-bold text-sm text-[#A04F34]">
                      Rp 99.000
                    </span>
                    <span className="text-[10px] text-[#6B655E] block mt-0.5">
                      1 Tahun + Layar TV
                    </span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                >
                  <span>{isSubmitting ? "Menyiapkan Draf..." : "Buka Editor Undangan"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-[#8A837A] mt-2.5">
                  Bebas mencoba draf tanpa harus memasukkan kartu kredit ataupun pembayaran di awal.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif-display text-2xl font-bold text-[#1F1D1B]">
              Draf Undangan Siap Disusun!
            </h3>

            <p className="text-sm text-[#6B655E] max-w-sm mx-auto leading-relaxed">
              Selamat, draf untuk pernikahan <strong>{groomName} & {brideName}</strong> berhasil
              dibuat. Tautan akses pengeditan telah kami simpan.
            </p>

            <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#EAE5DD] text-xs font-mono text-[#1F1D1B]">
              mengundang.co/{groomName.toLowerCase()}-{brideName.toLowerCase()}
            </div>

            <div className="pt-4 space-y-2">
              <Link
                href="/dashboard"
                onClick={onClose}
                className="w-full h-11 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <span>Masuk ke Dashboard Editor</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleReset}
                className="w-full h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-[#6B655E] hover:text-[#1F1D1B] font-semibold text-xs transition-colors cursor-pointer"
              >
                Tutup &amp; Lanjut Jelajah
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
