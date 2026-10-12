"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Apakah saya harus bayar terlebih dahulu sebelum membuat undangan?",
    answer:
      "Tidak. Anda bebas membuat draf undangan, mengisi data mempelai, jadwal akad dan resepsi, mengunggah galeri foto, serta mencoba tampilannya di simulator ponsel secara gratis tanpa dipungut biaya. Pembayaran baru dilakukan ketika draf undangan Anda sudah selesai dan siap disebarkan ke tamu resmi.",
  },
  {
    question: "Apakah ada batasan jumlah tamu yang bisa saya kirimkan link undangan?",
    answer:
      "Tidak ada batasan kuota tamu. Anda bebas mengirimkan undangan ke 50, 500, maupun lebih dari 2.000 tamu tanpa biaya tambahan per nama. Fitur personalisasi nama WhatsApp kami dapat digunakan sebanyak yang Anda perlukan.",
  },
  {
    question: "Bagaimana sistem amplop digital bekerja? Apakah uangnya dipotong komisi?",
    answer:
      "Tidak ada potongan sepeser pun dari pihak Mengundang. Tamu akan mentransfer uang langsung ke nomor rekening bank Anda sendiri (BCA, Mandiri, BRI, BSI, dll) atau memindai QRIS statis Anda. Dana 100% langsung masuk ke rekening pribadi Anda secara seketika tanpa melalui perantara penahanan saldo.",
  },
  {
    question: "Bagaimana jika jam acara, rundown, atau lokasi pernikahan berubah mendadak?",
    answer:
      "Anda dapat mengedit data teks, jam acara, maupun titik Google Maps kapan saja melalui dashboard Anda. Begitu Anda simpan, tautan undangan yang sudah tersebar di WhatsApp para tamu akan otomatis menampilkan informasi terbaru tanpa perlu mengirimkan tautan baru.",
  },
  {
    question: "Bagaimana cara menghubungkan Layar Resepsi TV Gedung pada Paket Pro?",
    answer:
      "Cukup buka browser di Smart TV gedung atau hubungkan laptop panitia ke videotron layar panggung menggunakan kabel HDMI. Lalu buka link resepsi khusus acara Anda (misal: mengundang.co/nama-acara/layar). Layar akan langsung menampilkan animasi selamat datang dan memunculkan nama tamu yang baru saja check-in di meja depan secara otomatis.",
  },
  {
    question: "Berapa lama proses undangan aktif setelah hari pernikahan?",
    answer:
      "Untuk Paket Basic, undangan dan rekap ucapan tetap aktif dapat diakses hingga H+30 hari setelah tanggal acara. Sedangkan untuk Paket Pro, undangan Anda akan tetap aktif selama 1 tahun penuh (365 hari), cocok untuk dijadikan kenang-kenangan digital keluarga.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white border-t border-[#EAE5DD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] text-[#6B655E] text-xs font-semibold mb-3 border border-[#EAE5DD]">
            <HelpCircle className="w-3.5 h-3.5 text-[#A04F34]" />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1F1D1B] tracking-tight">
            Jawaban jelas seputar pembuatan undangan digital
          </h2>
          <p className="text-base text-[#6B655E] mt-3">
            Kumpulan informasi penting yang paling sering ditanyakan oleh calon pengantin.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#EAE5DD] overflow-hidden transition-all bg-[#FAF8F5]/50"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-5 sm:p-6 flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A04F34] bg-white"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-display text-base sm:text-lg font-bold text-[#1F1D1B]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6B655E] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#A04F34]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-[#6B655E] leading-relaxed pt-2 bg-white border-t border-[#FAF8F5]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
