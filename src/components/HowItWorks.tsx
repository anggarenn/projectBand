import { Palette, FileEdit, Send, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Palette,
    title: "Pilih Desain",
    description: "Tentukan tema undangan favorit Anda dan sesuaikan palet warna sesuai konsep acara.",
  },
  {
    number: "02",
    icon: FileEdit,
    title: "Isi Data & Jadwal",
    description: "Masukkan nama mempelai, detail acara akad & resepsi, foto prewedding, dan nomor rekening.",
  },
  {
    number: "03",
    icon: Send,
    title: "Sebar via WhatsApp",
    description: "Buat link nama personal untuk tiap tamu secara instan dan pantau konfirmasi kehadiran otomatis.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-20 bg-[#FAF8F5] border-t border-[#EAE5DD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDF3EE] text-[#3A5743] text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mudah &amp; Cepat</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F1D1B] tracking-tight">
            Undangan Siap dalam 3 Langkah
          </h2>
          <p className="text-sm text-[#6B655E] mt-2">
            Tanpa perlu install aplikasi atau keahlian desain. Cukup dari peramban ponsel atau laptop Anda.
          </p>
        </div>

        {/* 3 Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-2xl p-6 border border-[#EAE5DD] shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                {/* Step number badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif-display text-2xl font-bold text-[#A04F34]/30 group-hover:text-[#A04F34] transition-colors">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] flex items-center justify-center text-[#1F1D1B] group-hover:bg-[#A04F34] group-hover:text-white group-hover:border-[#A04F34] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#1F1D1B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6B655E] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
