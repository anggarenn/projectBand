"use client";

import React, { useState, useId } from "react";
import {
  Send,
  Share2,
  Copy,
  Check,
  Search,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Smartphone,
  Filter,
  Users,
  CheckCircle2,
  Clock,
  RefreshCw,
  Edit3,
} from "lucide-react";

export interface GuestContact {
  id: string;
  name: string;
  phone: string;
  category: "VIP" | "Keluarga" | "Sahabat" | "Rekan Kerja";
  pax: number;
  status: "belum" | "terkirim" | "dibaca";
  sentAt?: string;
}

const INITIAL_CONTACTS: GuestContact[] = [
  {
    id: "c-1",
    name: "Prof. Dr. Ir. Bambang Soedibyo",
    phone: "081234567890",
    category: "VIP",
    pax: 2,
    status: "dibaca",
    sentAt: "Kemarin, 14:20 WIB",
  },
  {
    id: "c-2",
    name: "Keluarga Besar H. Rahmat Hidayat",
    phone: "081398765432",
    category: "Keluarga",
    pax: 4,
    status: "dibaca",
    sentAt: "Kemarin, 15:10 WIB",
  },
  {
    id: "c-3",
    name: "Dimas Wicaksono, S.Kom",
    phone: "081711223344",
    category: "Sahabat",
    pax: 2,
    status: "terkirim",
    sentAt: "Hari ini, 09:15 WIB",
  },
  {
    id: "c-4",
    name: "Annisa Laksmi, M.Psi",
    phone: "081855667788",
    category: "Sahabat",
    pax: 1,
    status: "belum",
  },
  {
    id: "c-5",
    name: "Ir. Hendra Kusuma & Istri",
    phone: "081288990011",
    category: "VIP",
    pax: 2,
    status: "dibaca",
    sentAt: "Kemarin, 16:45 WIB",
  },
  {
    id: "c-6",
    name: "Reza Fahlevi (Head of Tech)",
    phone: "081922334455",
    category: "Rekan Kerja",
    pax: 1,
    status: "belum",
  },
  {
    id: "c-7",
    name: "dr. Maya Anggraini, Sp.A",
    phone: "081133445566",
    category: "Sahabat",
    pax: 2,
    status: "belum",
  },
];

export type BroadcastTemplateType = "formal" | "islami";

export const BROADCAST_TEMPLATES: Record<BroadcastTemplateType, string> = {
  formal: `Kepada Yth.
Bapak/Ibu/Saudara/i *{nama_tamu}*
di Tempat

Salam hangat & salam sejahtera,

Tanpa mengurangi rasa hormat, bersama pesan ini kami mengundang Bapak/Ibu/Saudara/i untuk berkenan hadir dan merayakan hari bahagia resepsi pernikahan kami:

*Sarah Amalia & Faizal Aditya*
🗓️ Rabu, 31 Desember 2025
🏛️ Sasana Kriya, Taman Mini Indonesia Indah (TMII), Jakarta

Informasi lengkap mengenai jadwal rangkaian acara, petunjuk lokasi, serta konfirmasi kehadiran (RSVP) dapat diakses melalui tautan undangan digital berikut:

🔗 {link_undangan}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.

Atas perhatian dan kehadirannya, kami ucapkan terima kasih yang sebesar-besarnya.

Salam hormat kami,
*Sarah & Faizal*`,

  islami: `Kepada Yth.
Bapak/Ibu/Saudara/i *{nama_tamu}*
di Tempat

_Assalamu’alaikum Warahmatullahi Wabarakatuh_

Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara akad & resepsi pernikahan kami:

*Sarah Amalia & Faizal Aditya*
🗓️ Rabu, 31 Desember 2025
🏛️ Sasana Kriya, Taman Mini Indonesia Indah (TMII), Jakarta

Detail susunan acara, peta lokasi, serta konfirmasi kehadiran (RSVP) dapat diakses melalui tautan undangan digital berikut:

🔗 {link_undangan}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan melimpahkan doa restu kepada kami berdua.

_Jazakumullahu Khairan Katsiran_
_Wassalamu’alaikum Warahmatullahi Wabarakatuh_

Kami yang berbahagia,
*Sarah & Faizal*`,
};

export default function SendInvitationView() {
  const [contacts, setContacts] = useState<GuestContact[]>(INITIAL_CONTACTS);
  const [templateType, setTemplateType] = useState<BroadcastTemplateType>("islami");
  const [template, setTemplate] = useState(BROADCAST_TEMPLATES.islami);
  const [selectedContact, setSelectedContact] = useState<GuestContact>(INITIAL_CONTACTS[3]); // default to a pending contact
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [themeVariant, setThemeVariant] = useState<"motion-art-jawa" | "snap-photo">("motion-art-jawa");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const searchInputId = useId();

  // Stats
  const stats = {
    total: contacts.length,
    terkirim: contacts.filter((c) => c.status === "terkirim" || c.status === "dibaca").length,
    belum: contacts.filter((c) => c.status === "belum").length,
  };

  const filteredContacts = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchCat = activeCategory === "all" || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  const getPersonalLink = (name: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    return `${baseUrl}/demo/${themeVariant}?to=${encodeURIComponent(name)}`;
  };

  const getRenderedMessage = (contact: GuestContact) => {
    const link = getPersonalLink(contact.name);
    return template
      .replace(/{nama_tamu}/g, contact.name)
      .replace(/{link_undangan}/g, link);
  };

  const handleCopyMessage = (contact: GuestContact) => {
    const text = getRenderedMessage(contact);
    navigator.clipboard.writeText(text);
    setCopiedId(contact.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSendWhatsApp = (contact: GuestContact) => {
    const text = getRenderedMessage(contact);
    let cleanPhone = contact.phone.replace(/\D/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "62" + cleanPhone.slice(1);
    }
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");

    // Mark as sent
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contact.id
          ? { ...c, status: "terkirim", sentAt: "Baru Saja" }
          : c
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER & METRIC SUMMARY                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE5DD] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7]">
                Broadcast WhatsApp Studio
              </span>
              <span className="text-xs text-[#8A837A]">• Personalisasi Nama Tamu 1-Klik</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1F1D1B]">
              Kirim Undangan & Distribusi Link
            </h1>
            <p className="text-xs sm:text-sm text-[#6B655E] mt-1">
              Setiap tamu akan menerima link unik dengan nama mereka tercetak di cover dan layar sambutan.
            </p>
          </div>

          {/* Theme Selector for URL */}
          <div className="flex items-center gap-2 bg-[#FAF8F5] p-1.5 rounded-xl border border-[#EAE5DD]">
            <span className="text-xs text-[#6B655E] px-2 font-medium">Tema Link:</span>
            <button
              type="button"
              onClick={() => setThemeVariant("motion-art-jawa")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                themeVariant === "motion-art-jawa"
                  ? "bg-[#181513] text-[#D4AF37] shadow-xs"
                  : "text-[#6B655E] hover:text-[#1F1D1B]"
              }`}
            >
              Motion Art Jawa
            </button>
            <button
              type="button"
              onClick={() => setThemeVariant("snap-photo")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                themeVariant === "snap-photo"
                  ? "bg-[#A04F34] text-white shadow-xs"
                  : "text-[#6B655E] hover:text-[#1F1D1B]"
              }`}
            >
              Snap-Photo Modern
            </button>
          </div>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5 pt-5 border-t border-[#EAE5DD]">
          <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD]">
            <span className="text-xs text-[#6B655E] block">Total Tamu di Kontak</span>
            <span className="text-2xl font-bold font-serif-display text-[#1F1D1B]">
              {stats.total} Tamu
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#DCFCE7]">
            <span className="text-xs text-[#166534] block">Sudah Dikirim / Dibaca</span>
            <span className="text-2xl font-bold font-serif-display text-[#15803D]">
              {stats.terkirim} Kontak
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FEF3C7]">
            <span className="text-xs text-[#92400E] block">Menunggu Pengiriman</span>
            <span className="text-2xl font-bold font-serif-display text-[#B45309]">
              {stats.belum} Kontak
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PROMINENT TOP BAR: FORMAT PESAN BROADCAST WA (FORMAL / ISLAMI) */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE5DD] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#FAF2EB] text-[#A04F34] flex items-center justify-center font-bold shrink-0 border border-[#F0D5C7]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B655E]">
                Format Template Pesan WhatsApp
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7]">
                {templateType === "formal" ? "🏛️ Gaya Formal / Umum" : "🕌 Gaya Islami"}
              </span>
            </div>
            <p className="text-xs text-[#8A837A] mt-0.5">
              Pilih gaya bahasa yang ingin digunakan untuk mengirim undangan ke para tamu:
            </p>
          </div>
        </div>

        {/* Switcher Opsi Formal vs Islami & Tombol Kustomisasi */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          <div className="inline-flex p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE5DD]">
            <button
              type="button"
              onClick={() => {
                setTemplateType("formal");
                setTemplate(BROADCAST_TEMPLATES.formal);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                templateType === "formal"
                  ? "bg-white text-[#A04F34] shadow-xs border border-[#EAE5DD]"
                  : "text-[#6B655E] hover:text-[#1F1D1B]"
              }`}
            >
              <span>🏛️ Formal / Umum</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setTemplateType("islami");
                setTemplate(BROADCAST_TEMPLATES.islami);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                templateType === "islami"
                  ? "bg-white text-[#A04F34] shadow-xs border border-[#EAE5DD]"
                  : "text-[#6B655E] hover:text-[#1F1D1B]"
              }`}
            >
              <span>🕌 Islami</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="min-h-[40px] px-3.5 rounded-xl border border-[#EAE5DD] bg-white hover:bg-[#FAF8F5] text-xs font-bold text-[#1F1D1B] flex items-center gap-2 transition-all cursor-pointer shadow-2xs hover:border-[#A04F34]"
            title="Edit dan kustomisasi teks pesan undangan"
          >
            <Edit3 className="w-4 h-4 text-[#A04F34]" />
            <span>Kustomisasi Teks</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2-COLUMN WORKSPACE: GUEST LIST (LEFT) & MESSAGE STUDIO (RIGHT) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================== */}
        {/* LEFT PANEL: CONTACT LIST & FILTER (7 COLS)                 */}
        {/* =========================================================== */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-bold text-[#1F1D1B] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#A04F34]" />
              <span>Pilih Tamu yang Dituju</span>
            </h2>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {["all", "VIP", "Keluarga", "Sahabat", "Rekan Kerja"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#A04F34] text-white font-semibold shadow-xs"
                      : "bg-[#FAF8F5] text-[#6B655E] hover:bg-[#F2ECE4] border border-[#EAE5DD]"
                  }`}
                >
                  {cat === "all" ? "Semua" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <label htmlFor={searchInputId} className="sr-only">
              Cari nama atau nomor kontak
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#8A837A]" />
            </div>
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama tamu atau nomor WhatsApp..."
              className="w-full min-h-[44px] pl-10 pr-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-xs sm:text-sm text-[#1F1D1B] placeholder-[#8A837A] focus:bg-white focus:border-[#A04F34] focus:outline-none focus:ring-1 focus:ring-[#A04F34]"
            />
          </div>

          {/* Contact Table / Card List */}
          <div className="divide-y divide-[#EAE5DD] rounded-xl border border-[#EAE5DD] overflow-hidden">
            {filteredContacts.map((contact) => {
              const isSelected = selectedContact.id === contact.id;
              return (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#FAF2EB] border-l-4 border-l-[#A04F34]"
                      : "hover:bg-[#FAF8F5] bg-white"
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-[#1F1D1B]">
                        {contact.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FAF8F5] text-[#6B655E] border border-[#EAE5DD]">
                        {contact.category}
                      </span>
                      <span className="text-[11px] text-[#8A837A]">
                        ({contact.pax} Pax)
                      </span>
                    </div>
                    <div className="text-xs text-[#6B655E] mt-0.5 flex items-center gap-2">
                      <span className="font-mono">{contact.phone}</span>
                      <span>•</span>
                      {contact.status === "dibaca" && (
                        <span className="text-green-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Dibaca ({contact.sentAt})
                        </span>
                      )}
                      {contact.status === "terkirim" && (
                        <span className="text-blue-700 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Terkirim ({contact.sentAt})
                        </span>
                      )}
                      {contact.status === "belum" && (
                        <span className="text-amber-700 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Belum Dikirim
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleCopyMessage(contact)}
                      className="p-2.5 rounded-xl border border-[#EAE5DD] bg-white hover:bg-[#FAF8F5] text-xs text-[#1F1D1B] flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Salin Teks Pesan"
                    >
                      {copiedId === contact.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#6B655E]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendWhatsApp(contact)}
                      className="min-h-[40px] px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 fill-white" />
                      <span>Kirim WA</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================== */}
        {/* RIGHT PANEL: LIVE MESSAGE PREVIEW & TEMPLATE (5 COLS)       */}
        {/* =========================================================== */}
        <div className="lg:col-span-5 space-y-4">
          {/* WhatsApp Chat Preview Card */}
          <div className="bg-[#EFEAE2] rounded-2xl p-4 sm:p-5 border border-[#D9D2C7] shadow-2xs relative">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9D2C7]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center font-bold text-xs">
                  WA
                </div>
                <div>
                  <span className="text-xs font-bold text-[#1F1D1B] block">
                    {selectedContact.name}
                  </span>
                  <span className="text-[10px] text-[#6B655E]">
                    Preview Pesan Personalisasi
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7]">
                  {templateType === "formal" ? "🏛️ Gaya Formal" : "🕌 Gaya Islami"}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/80 text-[10px] font-mono text-[#6B655E]">
                  {selectedContact.phone}
                </span>
              </div>
            </div>

            {/* Bubble Message */}
            <div className="bg-white rounded-2xl rounded-tr-xs p-4 shadow-xs text-xs text-[#1F1D1B] space-y-2.5 font-sans leading-relaxed">
              <div className="whitespace-pre-wrap">
                {getRenderedMessage(selectedContact)}
              </div>
              <div className="text-right text-[10px] text-[#8A837A]">
                10:42 ✓✓
              </div>
            </div>

            {/* Preview Action Buttons */}
            <div className="mt-4 pt-3 border-t border-[#D9D2C7] flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSendWhatsApp(selectedContact)}
                className="flex-1 min-h-[44px] px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Kirim ke {selectedContact.name.split(" ")[0]}</span>
              </button>

              <a
                href={getPersonalLink(selectedContact.name)}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] px-3.5 rounded-xl bg-white border border-[#D9D2C7] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1F1D1B] flex items-center gap-1.5 transition-colors"
                title="Buka Link Tamu Langsung"
              >
                <ExternalLink className="w-4 h-4 text-[#6B655E]" />
              </a>
            </div>
          </div>

          {/* Quick Template Switch & Edit Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE5DD] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B655E] flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-[#A04F34]" />
                <span>Format Gaya &amp; Kustomisasi</span>
              </h3>
              <button
                type="button"
                onClick={() => setTemplate(BROADCAST_TEMPLATES[templateType])}
                className="text-[11px] text-[#A04F34] hover:underline font-semibold cursor-pointer"
                title="Reset template ke format bawaan"
              >
                Reset Default
              </button>
            </div>

            {/* Option Buttons: Formal vs Islami */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE5DD]">
              <button
                type="button"
                onClick={() => {
                  setTemplateType("formal");
                  setTemplate(BROADCAST_TEMPLATES.formal);
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  templateType === "formal"
                    ? "bg-white text-[#A04F34] shadow-xs border border-[#EAE5DD]"
                    : "text-[#6B655E] hover:text-[#1F1D1B]"
                }`}
              >
                <span>🏛️ Formal / Umum</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTemplateType("islami");
                  setTemplate(BROADCAST_TEMPLATES.islami);
                }}
                className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  templateType === "islami"
                    ? "bg-white text-[#A04F34] shadow-xs border border-[#EAE5DD]"
                    : "text-[#6B655E] hover:text-[#1F1D1B]"
                }`}
              >
                <span>🕌 Islami</span>
              </button>
            </div>

            {/* Button to open detailed editor */}
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] hover:bg-[#FAF2EB] text-xs font-bold text-[#1F1D1B] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#A04F34]" />
              <span>Edit Susunan Kalimat Pesan</span>
            </button>

            <div className="text-[11px] text-[#8A837A] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EAE5DD] flex items-center justify-between">
              <span>Variabel otomatis:</span>
              <div className="flex items-center gap-1 font-mono text-[10px] text-[#A04F34] font-bold">
                <span className="bg-white px-1.5 py-0.5 rounded border border-[#EAE5DD]">{"{nama_tamu}"}</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-[#EAE5DD]">{"{link_undangan}"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: EDIT FORMAT TEMPLATE BROADCAST                         */}
      {/* ------------------------------------------------------------- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#EAE5DD] space-y-4 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Header Modal */}
            <div className="flex items-start justify-between gap-3 border-b border-[#EAE5DD] pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7]">
                  <Edit3 className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-[#1F1D1B]">
                    Edit Template Broadcast WhatsApp
                  </h2>
                  <p className="text-xs text-[#6B655E] mt-0.5">
                    Sesuaikan salam, muqaddimah, dan pesan broadcast untuk para tamu
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="text-[#8A837A] hover:text-[#1F1D1B] p-1.5 rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Pilihan Gaya: Formal vs Islami */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1F1D1B] block">
                Pilih Format Gaya Bahasa:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF8F5] rounded-xl border border-[#EAE5DD]">
                <button
                  type="button"
                  onClick={() => {
                    setTemplateType("formal");
                    setTemplate(BROADCAST_TEMPLATES.formal);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    templateType === "formal"
                      ? "bg-white text-[#A04F34] shadow-xs border border-[#EAE5DD]"
                      : "text-[#6B655E] hover:text-[#1F1D1B]"
                  }`}
                >
                  <span className="text-base">🏛️</span>
                  <div className="text-left">
                    <span className="block font-bold">Gaya Formal</span>
                    <span className="block text-[10px] font-normal text-[#8A837A]">Nasional &amp; Universal</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTemplateType("islami");
                    setTemplate(BROADCAST_TEMPLATES.islami);
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    templateType === "islami"
                      ? "bg-white text-[#A04F34] shadow-xs border border-[#EAE5DD]"
                      : "text-[#6B655E] hover:text-[#1F1D1B]"
                  }`}
                >
                  <span className="text-base">🕌</span>
                  <div className="text-left">
                    <span className="block font-bold">Gaya Islami</span>
                    <span className="block text-[10px] font-normal text-[#8A837A]">Salam &amp; Doa Islami</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Textarea Editor */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#6B655E]">
                  Isi Format Pesan Undangan:
                </label>
                <button
                  type="button"
                  onClick={() => setTemplate(BROADCAST_TEMPLATES[templateType])}
                  className="text-[11px] text-[#A04F34] hover:underline font-semibold cursor-pointer"
                >
                  Reset Default ({templateType === "formal" ? "Formal" : "Islami"})
                </button>
              </div>
              <textarea
                rows={10}
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-xs text-[#1F1D1B] font-mono leading-relaxed focus:bg-white focus:border-[#A04F34] focus:outline-none focus:ring-1 focus:ring-[#A04F34]"
                placeholder="Tulis pesan broadcast WhatsApp..."
              />
            </div>

            {/* Variable Tag Inserter */}
            <div className="text-[11px] text-[#8A837A] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#EAE5DD] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-medium text-[#6B655E]">Sisipkan Variabel:</span>
                <button
                  type="button"
                  onClick={() => setTemplate((prev) => prev + " {nama_tamu}")}
                  className="font-mono text-xs font-bold text-[#A04F34] bg-white px-2 py-0.5 rounded-md border border-[#EAE5DD] hover:bg-[#FAF2EB] transition-colors cursor-pointer"
                  title="Klik untuk menyisipkan ke pesan"
                >
                  {"{nama_tamu}"}
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate((prev) => prev + " {link_undangan}")}
                  className="font-mono text-xs font-bold text-[#A04F34] bg-white px-2 py-0.5 rounded-md border border-[#EAE5DD] hover:bg-[#FAF2EB] transition-colors cursor-pointer"
                  title="Klik untuk menyisipkan ke pesan"
                >
                  {"{link_undangan}"}
                </button>
              </div>
              <span className="text-[10px] text-[#8A837A]">Diganti otomatis per kontak tamu</span>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#EAE5DD]">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                Selesai &amp; Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
