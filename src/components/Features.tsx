"use client";

import {
  Wallet,
  Users,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function Features() {
  return (
    <section id="fitur" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F7EFEA] text-[#A04F34] text-xs font-semibold mb-4 border border-[#EAE5DD]/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fokus Pada Kenyamanan</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1F1D1B] tracking-tight leading-tight">
            Fitur esensial yang benar-benar dibutuhkan mempelai dan tamu
          </h2>
          <p className="text-base sm:text-lg text-[#6B655E] mt-4 leading-relaxed max-w-2xl mx-auto">
            Kami membuang animasi berat yang lambat dan iklan yang mengganggu. Semua fitur dirancang
            agar hari bahagia Anda berlangsung lancar dan berkesan.
          </p>
          <div className="divider-ornament mt-8 max-w-xs mx-auto">
            <span className="text-[#D8D2C7]">&#10022;</span>
          </div>
        </div>

        {/* Varied Section Layout - Not uniform copy-paste cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Flagship Feature 1: Amplop Langsung Masuk Rekening (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-8 sm:p-10 rounded-3xl border border-[#EAE5DD] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#A04F34] text-white flex items-center justify-center shadow-xs">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#1F1D1B]">
                Dana amplop 100% langsung ke rekening Anda, tanpa penahanan saldo
              </h3>
              <p className="text-sm sm:text-base text-[#6B655E] leading-relaxed">
                Banyak platform menahan uang amplop pernikahan selama berhari-hari atau mengenakan
                biaya penarikan dana. Di Mengundang, tamu mentransfer uang langsung ke rekening bank
                pribadi Anda (BCA, Mandiri, BRI, BNI, BSI) atau memindai QRIS milik Anda secara
                langsung.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EAE5DD] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4A453F]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A04F34] shrink-0" />
                <span>Tanpa potongan komisi per transfer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A04F34] shrink-0" />
                <span>Bebas cantumkan hingga 3 rekening bank</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A04F34] shrink-0" />
                <span>Tombol salin nomor rekening satu sentuhan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A04F34] shrink-0" />
                <span>Dukungan alamat pengiriman kado fisik</span>
              </div>
            </div>
          </div>

          {/* Flagship Feature 2: Akurasi Katering & RSVP (Spans 5 cols) */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-8 sm:p-10 rounded-3xl border border-[#EAE5DD] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3A5743] text-white flex items-center justify-center shadow-xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#1F1D1B]">
                Estimasi kehadiran akurat untuk porsi katering
              </h3>
              <p className="text-sm sm:text-base text-[#6B655E] leading-relaxed">
                Cegah makanan katering terbuang percuma atau kekurangan porsi. Dapatkan konfirmasi
                kehadiran tamu secara terpusat dengan keterangan jumlah orang yang akan hadir.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-white border border-[#EAE5DD] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#1F1D1B]">Rekap Kehadiran Tamu</span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Otomatis
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-[#6B655E]">
                <div className="flex justify-between">
                  <span>Hadir (Sesi 1 & 2):</span>
                  <span className="font-bold text-[#1F1D1B]">210 Tamu</span>
                </div>
                <div className="flex justify-between">
                  <span>Masih Ragu:</span>
                  <span className="font-bold text-[#1F1D1B]">18 Tamu</span>
                </div>
                <div className="flex justify-between">
                  <span>Berhalangan Hadir:</span>
                  <span className="font-bold text-[#1F1D1B]">24 Tamu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Galeri Foto Ringan & Kompresi Otomatis (Spans 6 cols) */}
          <div className="lg:col-span-6 bg-[#FAF8F5] p-8 sm:p-9 rounded-3xl border border-[#EAE5DD] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C59B3C] text-white flex items-center justify-center shadow-xs">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
              Galeri foto tajam tapi ringan diakses di koneksi 4G
            </h3>
            <p className="text-sm text-[#6B655E] leading-relaxed">
              Foto prewedding Anda secara otomatis dioptimasi ke format WebP generasi modern.
              Kualitas foto tetap jernih dan tajam di layar Retina tanpa menguras paket data tamu.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-medium text-[#4A453F]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C59B3C]" />
                Kompresi WebP pintar
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C59B3C]" />
                Embed video kisah cinta YouTube
              </span>
            </div>
          </div>

          {/* Feature 4: Navigasi Lokasi & Integrasi Kalender (Spans 6 cols) */}
          <div className="lg:col-span-6 bg-[#FAF8F5] p-8 sm:p-9 rounded-3xl border border-[#EAE5DD] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#1F1D1B] text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
              Panduan lokasi presisi agar tamu tidak tersesat
            </h3>
            <p className="text-sm text-[#6B655E] leading-relaxed">
              Satu sentuhan langsung menghubungkan tamu ke rute Google Maps resmi gedung atau rumah.
              Tamu juga dapat langsung menambahkan jadwal akad dan resepsi ke kalender ponsel
              mereka.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-medium text-[#4A453F]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F1D1B]" />
                Akurasi pin lokasi gedung
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#1F1D1B]" />
                Pengingat Google Calendar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
