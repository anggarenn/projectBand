"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Heart,
  Send,
  Sparkles,
  ExternalLink,
} from "lucide-react";

type TabKey = "cover" | "mempelai" | "acara" | "amplop" | "ucapan";

interface WishItem {
  id: string;
  name: string;
  status: "Hadir" | "Tidak Hadir" | "Masih Ragu";
  message: string;
  time: string;
}

export default function PhoneSimulator() {
  const [activeTab, setActiveTab] = useState<TabKey>("cover");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [guestName, setGuestName] = useState("Bapak Budi Santoso & Partner");
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [activeTheme, setActiveTheme] = useState<"botanical" | "ivory" | "terracotta" | "aceh">("terracotta");

  // Mock Wishes list
  const [wishes, setWishes] = useState<WishItem[]>([
    {
      id: "1",
      name: "Rian & Maya",
      status: "Hadir",
      message: "Selamat berbahagia Dimas & Amanda! Semoga menjadi keluarga yang sakinah mawaddah warahmah.",
      time: "10 menit lalu",
    },
    {
      id: "2",
      name: "Keluarga Besar dr. H. Irawan",
      status: "Hadir",
      message: "Barakallahu lakum wa baraka alaikum. Selamat menempuh hidup baru!",
      time: "1 jam lalu",
    },
    {
      id: "3",
      name: "Siska Wardani",
      status: "Masih Ragu",
      message: "Happy wedding kalian berdua! Semoga lancar sampai hari-H ya.",
      time: "3 jam lalu",
    },
  ]);

  const [inputName, setInputName] = useState("");
  const [inputStatus, setInputStatus] = useState<"Hadir" | "Tidak Hadir" | "Masih Ragu">("Hadir");
  const [inputMessage, setInputMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim() || !inputMessage.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setWishes([
        {
          id: Date.now().toString(),
          name: inputName.trim(),
          status: inputStatus,
          message: inputMessage.trim(),
          time: "Baru saja",
        },
        ...wishes,
      ]);
      setInputName("");
      setInputMessage("");
      setIsSubmitting(false);
    }, 400);
  };

  // Color mappings based on selected theme
  const themeStyles = {
    terracotta: {
      accent: "#A04F34",
      bgSubtle: "#F7EFEA",
      tagBorder: "border-[#EAE5DD]",
      badge: "bg-[#A04F34] text-white",
    },
    botanical: {
      accent: "#3A5743",
      bgSubtle: "#EDF3EE",
      tagBorder: "border-[#D7E3D9]",
      badge: "bg-[#3A5743] text-white",
    },
    ivory: {
      accent: "#C59B3C",
      bgSubtle: "#FBF6EB",
      tagBorder: "border-[#EEDEB8]",
      badge: "bg-[#C59B3C] text-white",
    },
    aceh: {
      accent: "#D4AF37",
      bgSubtle: "#F5F0E6",
      tagBorder: "border-[#D4AF37]/40",
      badge: "bg-[#D4AF37] text-[#0A0A0A] font-bold",
    },
  }[activeTheme];

  return (
    <div id="simulator" className="flex flex-col items-center">
      {/* Control bar above simulator */}
      <div className="w-full max-w-[340px] mb-3 flex items-center justify-between bg-white border border-[#EAE5DD] px-3 py-2 rounded-2xl shadow-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold text-[#8A837A] uppercase tracking-wider">Tema</span>
          <div className="flex gap-1">
            {([
              { key: "terracotta" as const, color: "#A04F34", label: "Terracotta Warmth" },
              { key: "botanical" as const, color: "#3A5743", label: "Botanical Sage" },
              { key: "ivory" as const, color: "#C59B3C", label: "Champagne Ivory" },
              { key: "aceh" as const, color: "#0A0A0A", label: "Aceh Black Heritage" },
            ] as const).map(({ key, color, label }) => (
              <button
                key={key}
                onClick={() => setActiveTheme(key)}
                className={`w-6 h-6 rounded-full border transition-all ${
                  activeTheme === key
                    ? "border-[#1F1D1B] scale-110 shadow-xs ring-1 ring-white"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
                style={{ backgroundColor: color }}
                title={label}
                aria-label={`Pilih tema ${label}`}
              />
            ))}
          </div>
        </div>

        {/* Guest Name Tester */}
        <div className="flex items-center gap-1">
          <label htmlFor="sim-guest-input" className="sr-only">Ganti Nama Tamu</label>
          <input
            id="sim-guest-input"
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Ketik nama tamu..."
            className="w-32 text-[11px] px-2 py-1 rounded-lg border border-[#EAE5DD] bg-[#FAF8F5] text-[#1F1D1B] focus:outline-none focus:border-[#A04F34] transition-colors"
          />
        </div>
      </div>

      {/* Smartphone Frame */}
      <div className="relative w-[310px] sm:w-[340px] h-[580px] bg-gradient-to-b from-[#2A2724] to-[#1A1816] rounded-[48px] p-[8px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] ring-1 ring-white/10">
        {/* Dynamic Island */}
        <div className="absolute top-[16px] left-1/2 -translate-x-1/2 w-[88px] h-[24px] bg-black rounded-full z-30 flex items-center justify-center gap-2">
          <div className="w-[8px] h-[8px] rounded-full bg-[#1A1816] ring-1 ring-white/5" />
        </div>

        {/* Screen */}
        <div className="w-full h-full bg-[#FAF8F5] rounded-[40px] overflow-hidden flex flex-col relative text-[#1F1D1B]">
          {/* Top Status Bar Simulator */}
          <div className="h-9 px-5 flex items-center justify-between text-[10px] font-semibold text-[#6B655E] z-20 select-none">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <div className="w-3.5 h-2 border border-[#6B655E] rounded-xs p-0.5">
                <div className="h-full w-full bg-[#6B655E] rounded-xs" />
              </div>
            </div>
          </div>

          {/* Floating Audio Toggle Button */}
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className="absolute top-11 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#EAE5DD] shadow-xs flex items-center justify-center text-[#1F1D1B] hover:scale-105 transition-transform"
            aria-label={isPlayingAudio ? "Matikan musik" : "Putar musik"}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-3.5 h-3.5 text-[#A04F34] animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#6B655E]" />
            )}
          </button>

          {/* Scrollable Mobile Screen Body */}
          <div className="flex-1 overflow-y-auto px-3.5 pb-16 pt-1 space-y-2.5">
            {/* Tab 1: COVER */}
            {activeTab === "cover" && (
              <div className="text-center py-2 flex flex-col items-center animate-fadeIn">
                <div
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold mb-1.5 tracking-wide"
                  style={{ backgroundColor: themeStyles.bgSubtle, color: themeStyles.accent }}
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  THE WEDDING CELEBRATION
                </div>

                <h3 className="font-serif-display text-2xl font-bold text-[#1F1D1B] tracking-tight">
                  Dimas & Amanda
                </h3>
                <p className="text-[11px] text-[#6B655E] font-medium">Sabtu, 24 Oktober 2026</p>

                {/* Real Photo Frame */}
                <div className="w-36 h-44 my-2.5 rounded-xl overflow-hidden border-2 border-white shadow-md relative group">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop"
                    alt="Foto Prewedding Dimas & Amanda"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-2.5 text-white">
                    <span className="text-[9px] tracking-widest uppercase font-semibold text-white/80">
                      The Wedding Of
                    </span>
                    <span className="font-serif-display text-sm font-bold leading-tight text-white">
                      Dimas & Amanda
                    </span>
                  </div>
                </div>

                {/* Personal Guest Card */}
                <div className="w-full bg-white p-2.5 rounded-xl border border-[#EAE5DD] shadow-xs text-center space-y-0.5">
                  <p className="text-[10px] text-[#6B655E]">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                  <p className="font-serif-display text-sm font-bold text-[#1F1D1B]">
                    {guestName || "Nama Tamu"}
                  </p>
                  <p className="text-[9px] text-[#8A837A]">
                    Mohon maaf bila ada kesalahan penulisan nama
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab("mempelai");
                    setIsPlayingAudio(true);
                  }}
                  className="mt-2.5 w-full h-9 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-95"
                  style={{ backgroundColor: themeStyles.accent }}
                >
                  <Heart className="w-3.5 h-3.5 fill-white/30" />
                  Buka Undangan
                </button>
              </div>
            )}

            {/* Tab 2: MEMPELAI */}
            {activeTab === "mempelai" && (
              <div className="space-y-4 py-2 animate-fadeIn text-center">
                <div className="bg-white p-4 rounded-2xl border border-[#EAE5DD] shadow-xs">
                  <p className="text-xs italic text-[#6B655E] font-serif-display leading-relaxed">
                    &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan
                    pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa
                    tenteram kepadanya...&rdquo;
                  </p>
                  <span className="block text-[10px] text-[#8A837A] mt-2 font-medium">
                    (QS. Ar-Rum: 21)
                  </span>
                </div>

                {/* Profil Pria */}
                <div className="bg-white p-4 rounded-2xl border border-[#EAE5DD] shadow-xs text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 border-2 border-white shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                      alt="Dimas Pratama"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Dimas Pratama, S.T.
                  </h4>
                  <p className="text-[11px] text-[#6B655E] mt-0.5">
                    Putra pertama dari Bpk. Bambang Sutrisno & Ibu Ratna Dewi
                  </p>
                </div>

                {/* Profil Wanita */}
                <div className="bg-white p-4 rounded-2xl border border-[#EAE5DD] shadow-xs text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-2 border-2 border-white shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
                      alt="Amanda Putri"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Amanda Putri, S.I.Kom.
                  </h4>
                  <p className="text-[11px] text-[#6B655E] mt-0.5">
                    Putri kedua dari Bpk. Hendra Gunawan & Ibu Siti Aminah
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: ACARA */}
            {activeTab === "acara" && (
              <div className="space-y-3 py-2 animate-fadeIn">
                {/* Countdown Box */}
                <div
                  className="p-3.5 rounded-2xl text-center"
                  style={{ backgroundColor: themeStyles.bgSubtle }}
                >
                  <p className="text-[11px] font-semibold text-[#6B655E] uppercase tracking-wider mb-2">
                    Menghitung Hari Bahagia
                  </p>
                  <div className="flex justify-center gap-2 text-center">
                    <div className="bg-white px-2.5 py-1.5 rounded-xl border border-[#EAE5DD] min-w-12">
                      <span className="block font-serif-display text-lg font-bold text-[#1F1D1B]">
                        32
                      </span>
                      <span className="text-[9px] text-[#8A837A]">Hari</span>
                    </div>
                    <div className="bg-white px-2.5 py-1.5 rounded-xl border border-[#EAE5DD] min-w-12">
                      <span className="block font-serif-display text-lg font-bold text-[#1F1D1B]">
                        14
                      </span>
                      <span className="text-[9px] text-[#8A837A]">Jam</span>
                    </div>
                    <div className="bg-white px-2.5 py-1.5 rounded-xl border border-[#EAE5DD] min-w-12">
                      <span className="block font-serif-display text-lg font-bold text-[#1F1D1B]">
                        45
                      </span>
                      <span className="text-[9px] text-[#8A837A]">Menit</span>
                    </div>
                  </div>
                </div>

                {/* Akad Nikah */}
                <div className="bg-white p-4 rounded-2xl border border-[#EAE5DD] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-display text-sm font-bold text-[#1F1D1B]">
                      Akad Nikah
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#6B655E] border border-[#EAE5DD]">
                      Khusus Keluarga
                    </span>
                  </div>
                  <div className="text-xs text-[#6B655E] space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#A04F34]" />
                      <span>Sabtu, 24 Oktober 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#A04F34]" />
                      <span>08:00 - 10:00 WIB</span>
                    </div>
                  </div>
                </div>

                {/* Resepsi */}
                <div className="bg-white p-4 rounded-2xl border border-[#EAE5DD] shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif-display text-sm font-bold text-[#1F1D1B]">
                      Resepsi Pernikahan
                    </h4>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                      style={{ backgroundColor: themeStyles.bgSubtle, color: themeStyles.accent }}
                    >
                      Sesi 1 & 2
                    </span>
                  </div>
                  <div className="text-xs text-[#6B655E] space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#A04F34]" />
                      <span>Sabtu, 24 Oktober 2026</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#A04F34]" />
                      <span>11:00 - 14:00 WIB</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#A04F34]" />
                      <span>Hotel Gran Mahakam, Kebayoran Baru, Jakarta Selatan</span>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full h-9 rounded-xl border border-[#EAE5DD] text-xs font-semibold text-[#1F1D1B] hover:bg-[#FAF8F5] mt-1"
                  >
                    <span>Petunjuk Lokasi Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Tab 4: AMPLOP DIGITAL */}
            {activeTab === "amplop" && (
              <div className="space-y-3 py-2 animate-fadeIn text-center">
                <div className="bg-white p-4 rounded-2xl border border-[#EAE5DD] shadow-xs">
                  <Heart className="w-6 h-6 mx-auto text-[#A04F34] mb-1.5" />
                  <h4 className="font-serif-display text-sm font-bold text-[#1F1D1B]">
                    Tanda Kasih & Doa Restu
                  </h4>
                  <p className="text-[11px] text-[#6B655E] mt-1 leading-relaxed">
                    Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan
                    tanda kasih, dapat melalui nomor rekening berikut:
                  </p>
                </div>

                {/* Bank Card BCA */}
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white p-4 rounded-2xl shadow-sm text-left relative overflow-hidden">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold tracking-widest text-xs">BCA</span>
                    <span className="text-[10px] text-white/70">Transfer Bank</span>
                  </div>
                  <p className="font-mono text-base tracking-wider font-semibold">1234 5678 90</p>
                  <p className="text-[11px] text-white/80 mt-1">a.n Dimas Pratama</p>
                  <button
                    onClick={() => handleCopy("1234567890")}
                    className="mt-3 w-full h-8 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copiedAccount ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Nomor Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Nomor Rekening</span>
                      </>
                    )}
                  </button>
                </div>

                {/* QRIS Card */}
                <div className="bg-white p-3.5 rounded-2xl border border-[#EAE5DD] shadow-xs text-center">
                  <span className="text-[11px] font-bold text-[#1F1D1B] block">
                    Scan QRIS (Semua E-Wallet)
                  </span>
                  <div className="w-32 h-32 mx-auto my-2 border-2 border-dashed border-[#D8D2C7] rounded-xl flex items-center justify-center bg-[#FAF8F5]">
                    <div className="text-center p-2">
                      <span className="text-[10px] font-mono font-semibold text-[#6B655E] block">
                        [QRIS DEMO]
                      </span>
                      <span className="text-[9px] text-[#8A837A] block">0% Biaya Platform</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8A837A]">
                    Dana otomatis langsung masuk ke rekening pengantin
                  </p>
                </div>
              </div>
            )}

            {/* Tab 5: BUKU TAMU & RSVP */}
            {activeTab === "ucapan" && (
              <div className="space-y-3 py-2 animate-fadeIn">
                {/* Form Ucapan */}
                <form
                  onSubmit={handleAddWish}
                  className="bg-white p-3.5 rounded-2xl border border-[#EAE5DD] shadow-xs space-y-2.5"
                >
                  <h4 className="font-serif-display text-xs font-bold text-[#1F1D1B]">
                    Kirim Ucapan & Konfirmasi Kehadiran
                  </h4>

                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] focus:outline-none focus:border-[#A04F34]"
                  />

                  <div className="flex gap-1">
                    {(["Hadir", "Tidak Hadir", "Masih Ragu"] as const).map((status) => (
                      <button
                        type="button"
                        key={status}
                        onClick={() => setInputStatus(status)}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold border transition-all ${
                          inputStatus === status
                            ? "bg-[#1F1D1B] text-white border-[#1F1D1B]"
                            : "bg-[#FAF8F5] text-[#6B655E] border-[#EAE5DD]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <textarea
                    required
                    rows={2}
                    placeholder="Tuliskan doa restu untuk kedua mempelai..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] focus:outline-none focus:border-[#A04F34] resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-8 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-transform active:scale-98"
                    style={{ backgroundColor: themeStyles.accent }}
                  >
                    <Send className="w-3 h-3" />
                    <span>{isSubmitting ? "Mengirim..." : "Kirim Ucapan"}</span>
                  </button>
                </form>

                {/* Guestbook Stream */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-semibold text-[#6B655E]">
                      Ucapan Terbaru ({wishes.length})
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">● Real-time</span>
                  </div>

                  {wishes.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-3 rounded-xl border border-[#EAE5DD] text-xs space-y-1 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1F1D1B]">{item.name}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                            item.status === "Hadir"
                              ? "bg-emerald-50 text-emerald-700"
                              : item.status === "Tidak Hadir"
                              ? "bg-rose-50 text-rose-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4A453F] leading-snug">{item.message}</p>
                      <span className="text-[9px] text-[#9E978E] block text-right">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom App Navigation Bar inside phone */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-white/95 backdrop-blur-md border-t border-[#EAE5DD] px-2 flex items-center justify-around z-20">
            <button
              onClick={() => setActiveTab("cover")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                activeTab === "cover" ? "text-[#A04F34] font-bold" : "text-[#6B655E]"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Cover</span>
            </button>
            <button
              onClick={() => setActiveTab("mempelai")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                activeTab === "mempelai" ? "text-[#A04F34] font-bold" : "text-[#6B655E]"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Mempelai</span>
            </button>
            <button
              onClick={() => setActiveTab("acara")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                activeTab === "acara" ? "text-[#A04F34] font-bold" : "text-[#6B655E]"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Acara</span>
            </button>
            <button
              onClick={() => setActiveTab("amplop")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                activeTab === "amplop" ? "text-[#A04F34] font-bold" : "text-[#6B655E]"
              }`}
            >
              <Copy className="w-4 h-4" />
              <span>Amplop</span>
            </button>
            <button
              onClick={() => setActiveTab("ucapan")}
              className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors ${
                activeTab === "ucapan" ? "text-[#A04F34] font-bold" : "text-[#6B655E]"
              }`}
            >
              <Send className="w-4 h-4" />
              <span>RSVP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
