"use client";

import { useState } from "react";
import { MessageSquare, Copy, Check, Share2, Sparkles } from "lucide-react";

export default function WhatsAppGenerator() {
  const [guestName, setGuestName] = useState("Bapak Gunawan & Keluarga");
  const [coupleSlug, setCoupleSlug] = useState("dimas-amanda");
  const [copied, setCopied] = useState(false);

  // Encode name for URL parameter
  const encodedName = encodeURIComponent(guestName.trim());
  const sampleUrl = `https://mengundang.co/${coupleSlug}?to=${encodedName}`;

  const messageTemplate = `Assalamu'alaikum Wr. Wb. / Salam Sejahtera

Kepada Yth. ${guestName}

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan kami:

*Dimas Pratama & Amanda Putri*

Informasi lengkap mengenai jadwal akad, lokasi resepsi, dan konfirmasi kehadiran dapat diakses melalui tautan undangan berikut:

${sampleUrl}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.

Terima kasih atas doa dan perhatian yang diberikan.

Wassalamu'alaikum Wr. Wb.
Kami yang berbahagia,
Dimas & Amanda`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="generator" className="py-16 md:py-24 bg-[#FAF8F5] border-y border-[#EAE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF3EE] text-[#3A5743] text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Alat Bantu Calon Pengantin</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F1D1B] tracking-tight">
            Kirim undangan personal ke ratusan tamu tanpa ribet
          </h2>
          <p className="text-base text-[#6B655E] mt-3 leading-relaxed">
            Sistem kami otomatis membuatkan tautan khusus dengan nama masing-masing tamu. Saat tamu
            membuka tautan tersebut, nama mereka langsung tertulis di sampul undangan secara anggun.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          {/* Inputs */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-[#EAE5DD] shadow-xs space-y-5">
            <h3 className="font-serif-display text-lg font-bold text-[#1F1D1B]">
              Coba Uji Pesan WhatsApp
            </h3>

            <div>
              <label
                htmlFor="wa-guest-name"
                className="block text-xs font-semibold text-[#1F1D1B] mb-1.5"
              >
                Nama Tamu yang Dituju
              </label>
              <input
                id="wa-guest-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: dr. Bambang & Istri"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
              />
              <span className="text-[11px] text-[#8A837A] mt-1 block">
                Bisa diisi nama perorangan, keluarga, ataupun rekan kantor.
              </span>
            </div>

            <div>
              <label
                htmlFor="wa-slug"
                className="block text-xs font-semibold text-[#1F1D1B] mb-1.5"
              >
                Tautan Khusus Pasangan
              </label>
              <div className="flex rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] overflow-hidden focus-within:border-[#A04F34]">
                <span className="px-3 py-2.5 text-xs text-[#8A837A] bg-[#F5EFEB] border-r border-[#EAE5DD] select-none">
                  mengundang.co/
                </span>
                <input
                  id="wa-slug"
                  type="text"
                  value={coupleSlug}
                  onChange={(e) => setCoupleSlug(e.target.value)}
                  className="flex-1 text-xs px-2.5 py-2 text-[#1F1D1B] bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="bg-[#F7EFEA] p-3.5 rounded-2xl border border-[#EAE5DD] text-xs text-[#6B655E] space-y-1">
                <span className="font-semibold text-[#A04F34] block">Link yang dihasilkan:</span>
                <p className="font-mono text-[11px] text-[#1F1D1B] break-all bg-white px-2 py-1.5 rounded-lg border border-[#EAE5DD]">
                  {sampleUrl}
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Preview Bubble */}
          <div className="lg:col-span-7 bg-[#EFEAE2] p-5 sm:p-7 rounded-3xl border border-[#D8D2C7] shadow-inner relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C7]/60 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  WA
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1F1D1B] block">Pratinjau Pesan WhatsApp</span>
                  <span className="text-[10px] text-[#6B655E]">Format ramah dan sopan</span>
                </div>
              </div>

              <button
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#D8D2C7] text-xs font-semibold text-[#1F1D1B] hover:bg-[#FAF8F5] transition-colors"
                aria-label="Salin teks pesan undangan"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6B655E]" />
                    <span>Salin Pesan</span>
                  </>
                )}
              </button>
            </div>

            {/* Chat Bubble */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl rounded-tl-xs shadow-sm border border-[#E0DACF] space-y-3">
              <div className="text-xs text-[#2A2724] leading-relaxed whitespace-pre-line font-sans">
                {messageTemplate}
              </div>
              <div className="text-[10px] text-right text-[#8A837A] pt-1">
                09:42 • Terkirim
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
