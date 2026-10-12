"use client";

import React, { useState, useMemo, useId } from "react";
import * as XLSX from "xlsx";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Send,
  MessageSquare,
  Users,
  Utensils,
  Share2,
  Tv,
  Pin,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Calendar,
  Check,
} from "lucide-react";

/* ========================================================================= */
/* DATA CONTRACT: KONFIRMASI RSVP & DOA RESTU TAMU                           */
/* ========================================================================= */
export interface RsvpResponse {
  id: string;
  guestName: string;
  category: "VIP" | "Keluarga" | "Sahabat" | "Rekan Kerja";
  phone: string;
  response: "hadir" | "ragu" | "tidak_hadir" | "menunggu";
  confirmedPax: number;
  wishes: string;
  submittedAt: string;
  checkedInVenue: boolean;
  isPinned?: boolean;
}

const DEFAULT_RSVP_RESPONSES: RsvpResponse[] = [
  {
    id: "rsvp-1",
    guestName: "Prof. Dr. Ir. Bambang Soedibyo",
    category: "VIP",
    phone: "081234567890",
    response: "hadir",
    confirmedPax: 2,
    wishes:
      "Selamat menempuh hidup baru Sarah & Faizal. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa diberkahi kelapangan rezeki dan kebahagiaan.",
    submittedAt: "18 Des 2025, 14:20 WIB",
    checkedInVenue: true,
    isPinned: true,
  },
  {
    id: "rsvp-2",
    guestName: "Keluarga Besar H. Rahmat Hidayat",
    category: "Keluarga",
    phone: "081398765432",
    response: "hadir",
    confirmedPax: 4,
    wishes:
      "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khair. Turut berbahagia untuk kedua mempelai dan keluarga besar!",
    submittedAt: "19 Des 2025, 09:15 WIB",
    checkedInVenue: true,
    isPinned: true,
  },
  {
    id: "rsvp-3",
    guestName: "Dimas Wicaksono, S.Kom",
    category: "Sahabat",
    phone: "081711223344",
    response: "hadir",
    confirmedPax: 2,
    wishes:
      "Congrats Faizal & Sarah! Akhirnya berlabuh juga di pelaminan. Lancar sampai hari-H ya bro, siap hadir tepat waktu!",
    submittedAt: "19 Des 2025, 19:40 WIB",
    checkedInVenue: false,
    isPinned: false,
  },
  {
    id: "rsvp-4",
    guestName: "Annisa Laksmi, M.Psi",
    category: "Sahabat",
    phone: "081855667788",
    response: "ragu",
    confirmedPax: 1,
    wishes:
      "Selamat ya Sarah cantik! Aku usahakan banget bisa hadir ya, saat ini masih nunggu konfirmasi jadwal dinas kantor.",
    submittedAt: "20 Des 2025, 11:30 WIB",
    checkedInVenue: false,
    isPinned: false,
  },
  {
    id: "rsvp-5",
    guestName: "Ir. Hendra Kusuma & Istri",
    category: "VIP",
    phone: "081288990011",
    response: "hadir",
    confirmedPax: 2,
    wishes:
      "Turut bersyukur atas pernikahan ananda berdua. Semoga cinta kasih selalu membimbing perjalanan rumah tangga kalian berdua.",
    submittedAt: "20 Des 2025, 16:05 WIB",
    checkedInVenue: true,
    isPinned: false,
  },
  {
    id: "rsvp-6",
    guestName: "Reza Fahlevi (Head of Tech)",
    category: "Rekan Kerja",
    phone: "081922334455",
    response: "tidak_hadir",
    confirmedPax: 0,
    wishes:
      "Happy wedding Sarah & Faizal! Mohon maaf sekali belum bisa hadir langsung karena bentrok agenda dinas luar kota. Doa terbaik dari kami sekeluarga!",
    submittedAt: "21 Des 2025, 08:50 WIB",
    checkedInVenue: false,
    isPinned: false,
  },
  {
    id: "rsvp-7",
    guestName: "dr. Maya Anggraini, Sp.A",
    category: "Sahabat",
    phone: "081133445566",
    response: "menunggu",
    confirmedPax: 0,
    wishes: "-",
    submittedAt: "Belum Mengisi",
    checkedInVenue: false,
    isPinned: false,
  },
];

export default function RsvpManagementView() {
  const [responses, setResponses] = useState<RsvpResponse[]>(DEFAULT_RSVP_RESPONSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"table" | "wishes">("table");
  const searchInputId = useId();

  // Metric calculation
  const metrics = useMemo(() => {
    const totalInvitedPax = 450;
    const hadirPax = responses
      .filter((r) => r.response === "hadir")
      .reduce((acc, r) => acc + r.confirmedPax, 0);
    const raguCount = responses.filter((r) => r.response === "ragu").length;
    const tidakHadirCount = responses.filter((r) => r.response === "tidak_hadir").length;
    const menungguCount = responses.filter((r) => r.response === "menunggu").length;
    const respondedCount = responses.filter((r) => r.response !== "menunggu").length;

    return {
      totalInvitedPax,
      hadirPax,
      raguCount,
      tidakHadirCount,
      menungguCount,
      respondedCount,
      responseRate: Math.round((respondedCount / responses.length) * 100),
    };
  }, [responses]);

  // Filtered responses
  const filteredResponses = useMemo(() => {
    return responses.filter((r) => {
      const matchSearch =
        r.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.phone.includes(searchQuery) ||
        r.wishes.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = filterStatus === "all" || r.response === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [responses, searchQuery, filterStatus]);

  // Toggle Pin for TV
  const togglePin = (id: string) => {
    setResponses((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isPinned: !r.isPinned } : r))
    );
  };

  // Follow-up via WhatsApp for undecided guests
  const handleFollowUpWA = (guest: RsvpResponse) => {
    const cleanPhone = guest.phone.replace(/[^0-9]/g, "");
    const waPhone = cleanPhone.startsWith("0") ? `62${cleanPhone.slice(1)}` : cleanPhone;
    const message = encodeURIComponent(
      `Halo ${guest.guestName}, kami dari tim panitia pernikahan Sarah & Faizal ingin mengonfirmasi rencana kehadiran Bapak/Ibu/Sahabat. Mohon kesediaannya melengkapi konfirmasi kehadiran melalui tautan berikut: https://mengundang.id/demo/motion-art-jawa?to=${encodeURIComponent(
        guest.guestName
      )} . Terima kasih banyak!`
    );
    window.open(`https://wa.me/${waPhone}?text=${message}`, "_blank");
  };

  // Export Catering Summary Excel (.xlsx)
  const handleExportCateringExcel = () => {
    const exportRows = responses.map((r) => ({
      "Nama Tamu": r.guestName,
      "Kategori": r.category,
      "Status RSVP":
        r.response === "hadir"
          ? "Pasti Hadir"
          : r.response === "ragu"
          ? "Masih Ragu"
          : r.response === "tidak_hadir"
          ? "Berhalangan / Izin"
          : "Belum Jawab",
      "Jumlah Pax Fix Hadir": r.confirmedPax,
      "No WhatsApp": r.phone,
      "Waktu Submit": r.submittedAt,
      "Pesan Ucapan & Doa": r.wishes,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    worksheet["!cols"] = [
      { wch: 30 },
      { wch: 14 },
      { wch: 20 },
      { wch: 22 },
      { wch: 18 },
      { wch: 22 },
      { wch: 45 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Katering");
    XLSX.writeFile(workbook, "Rekap_RSVP_Katering_Sarah_Faizal.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* HEADER SECTION                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE5DD] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EDF3EE] text-[#15803D] border border-[#C6DAC9]">
              Respon Tamu Masuk
            </span>
            <span className="text-xs text-[#8A837A]">
              Tingkat Respon: {metrics.responseRate}%
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1F1D1B]">
            Konfirmasi Kehadiran (RSVP) & Doa Restu
          </h1>
          <p className="text-xs sm:text-sm text-[#6B655E] mt-0.5 max-w-2xl">
            Data respon kehadiran yang diisi tamu lewat formulir undangan online untuk finalisasi porsi katering dan buku doa digital.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={handleExportCateringExcel}
            className="min-h-[44px] px-4 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] hover:bg-[#FAF2EB] hover:border-[#A04F34] text-xs font-semibold text-[#1F1D1B] flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            title="Download rekap katering dan respon ke file Excel (.xlsx)"
          >
            <Download className="w-3.5 h-3.5 text-[#6B655E]" />
            <span>Ekspor Rekap Katering (Excel)</span>
          </button>

          <button
            type="button"
            onClick={() => alert("Mengirim pesan pengingat RSVP ke 38 tamu yang belum konfirmasi...")}
            className="min-h-[44px] px-4 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Pengingat RSVP ({metrics.raguCount + metrics.menungguCount})</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 METRIC CARDS KHUSUS RSVP & KATERING                         */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pax Pasti Hadir */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#15803D] uppercase tracking-wider">
              Porsi Katering Fix
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EDF3EE] text-[#15803D] flex items-center justify-center">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-0.5">
            {metrics.hadirPax} Pax
          </div>
          <div className="text-xs text-[#15803D] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Konfirmasi Pasti Hadir</span>
          </div>
        </div>

        {/* Card 2: Tamu Masih Ragu */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#D97706] uppercase tracking-wider">
              Perlu Follow-up
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-0.5">
            {metrics.raguCount} Tamu
          </div>
          <div className="text-xs text-[#8A837A] font-medium">
            Status Masih Ragu-Ragu
          </div>
        </div>

        {/* Card 3: Berhalangan Hadir */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#DC2626] uppercase tracking-wider">
              Berhalangan
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-0.5">
            {metrics.tidakHadirCount} Tamu
          </div>
          <div className="text-xs text-[#8A837A] font-medium">
            Telah Menyampaikan Izin
          </div>
        </div>

        {/* Card 4: Belum Respon */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              Belum Mengisi
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#6B655E] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-0.5">
            {metrics.menungguCount} Tamu
          </div>
          <div className="text-xs text-[#8A837A] font-medium">
            Menunggu Respon Undangan
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* VIEW SWITCHER & FILTER BAR                                    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE5DD] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE5DD] pb-4">
          {/* Tab Switcher: Tabel vs Buku Doa Restu */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("table")}
              className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "table"
                  ? "bg-[#A04F34] text-white shadow-xs font-bold"
                  : "bg-[#FAF8F5] text-[#6B655E] hover:text-[#1F1D1B] border border-[#EAE5DD]"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Tabel Respon Kehadiran ({responses.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("wishes")}
              className={`min-h-[44px] px-4 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === "wishes"
                  ? "bg-[#A04F34] text-white shadow-xs font-bold"
                  : "bg-[#FAF8F5] text-[#6B655E] hover:text-[#1F1D1B] border border-[#EAE5DD]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Buku Doa & Ucapan Restu</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#FAF2EB] text-[#A04F34] font-mono">
                {responses.filter((r) => r.wishes && r.wishes !== "-").length}
              </span>
            </button>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="tablist">
            {[
              { id: "all", label: "Semua Respon" },
              { id: "hadir", label: "Pasti Hadir" },
              { id: "ragu", label: "Ragu" },
              { id: "tidak_hadir", label: "Absen" },
              { id: "menunggu", label: "Belum Jawab" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setFilterStatus(st.id)}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  filterStatus === st.id
                    ? "bg-[#1F1D1B] text-white font-bold"
                    : "bg-[#FAF8F5] text-[#6B655E] hover:text-[#1F1D1B] border border-[#EAE5DD]"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <label htmlFor={searchInputId} className="sr-only">
            Cari data konfirmasi atau ucapan tamu
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#8A837A]" />
          </div>
          <input
            id={searchInputId}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama tamu konfirmasi, nomor WhatsApp, atau kata dalam doa ucapan..."
            className="w-full min-h-[44px] pl-10 pr-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] placeholder-[#8A837A] focus:border-[#A04F34] focus:outline-none focus:ring-1 focus:ring-[#A04F34] transition-all"
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONTENT TAB 1: TABEL RESPON KEHADIRAN                         */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "table" && (
        <div className="bg-white rounded-2xl border border-[#EAE5DD] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs" role="table">
              <thead className="bg-[#FAF8F5] text-[#6B655E] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE5DD]">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    Nama Tamu & Kategori
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Status Respon
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Pax Hadir
                  </th>
                  <th scope="col" className="py-3 px-3">
                    Waktu Konfirmasi
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Cuplikan Ucapan
                  </th>
                  <th scope="col" className="py-3 px-4 text-right">
                    Tindakan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5DD]">
                {filteredResponses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#8A837A]">
                      Tidak ada data respon konfirmasi yang cocok dengan filter.
                    </td>
                  </tr>
                ) : (
                  filteredResponses.map((res) => (
                    <tr key={res.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-[#1F1D1B] text-sm">
                          {res.guestName}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#8A837A]">
                          <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE5DD] font-medium text-[#6B655E]">
                            {res.category}
                          </span>
                          <span>•</span>
                          <span>{res.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        {res.response === "hadir" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EDF3EE] text-[#15803D] border border-[#C6DAC9]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Pasti Hadir
                          </span>
                        )}
                        {res.response === "ragu" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                            <AlertCircle className="w-3.5 h-3.5" />
                            Masih Ragu
                          </span>
                        )}
                        {res.response === "tidak_hadir" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]">
                            <XCircle className="w-3.5 h-3.5" />
                            Berhalangan
                          </span>
                        )}
                        {res.response === "menunggu" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FAF8F5] text-[#8A837A] border border-[#EAE5DD]">
                            <Clock className="w-3.5 h-3.5" />
                            Belum Mengisi
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-mono font-bold text-sm text-[#1F1D1B]">
                          {res.confirmedPax > 0 ? `${res.confirmedPax} Pax` : "-"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-[#6B655E] text-[11px]">
                        {res.submittedAt}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate text-[#6B655E] italic">
                        {res.wishes && res.wishes !== "-" ? `"${res.wishes}"` : "-"}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {res.response === "ragu" || res.response === "menunggu" ? (
                            <button
                              type="button"
                              onClick={() => handleFollowUpWA(res)}
                              className="min-h-[34px] px-2.5 py-1 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Kirim follow up via WhatsApp"
                            >
                              <Send className="w-3 h-3" />
                              <span>Follow Up</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleFollowUpWA(res)}
                              className="min-h-[34px] px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF2EB] text-[#1F1D1B] border border-[#EAE5DD] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="Kirim pesan WhatsApp"
                            >
                              <Send className="w-3 h-3 text-[#6B655E]" />
                              <span>WA</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-[#EAE5DD] bg-[#FAF8F5] flex items-center justify-between text-xs text-[#8A837A]">
            <span>Menampilkan {filteredResponses.length} dari total {responses.length} catatan RSVP</span>
            <span>Update Otomatis Real-Time</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* CONTENT TAB 2: BUKU DOA & UCAPAN RESTU TAMU (FEED)            */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "wishes" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResponses
              .filter((r) => r.wishes && r.wishes !== "-")
              .map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-5 border transition-all shadow-2xs relative ${
                    item.isPinned
                      ? "border-[#A04F34] ring-1 ring-[#A04F34]/20 bg-gradient-to-br from-white to-[#FAF2EB]/40"
                      : "border-[#EAE5DD] hover:border-[#A04F34]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FAF2EB] text-[#A04F34] font-serif-display font-bold text-sm flex items-center justify-center border border-[#F0D5C7]">
                        {item.guestName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#1F1D1B] flex items-center gap-2">
                          <span>{item.guestName}</span>
                          {item.isPinned && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7] flex items-center gap-1">
                              <Pin className="w-2.5 h-2.5" />
                              Layar TV
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#8A837A] flex items-center gap-2 mt-0.5">
                          <span className="px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#EAE5DD] text-[#6B655E]">
                            {item.category}
                          </span>
                          <span>•</span>
                          <span>{item.submittedAt}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePin(item.id)}
                      className={`p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        item.isPinned
                          ? "bg-[#A04F34] text-white"
                          : "bg-[#FAF8F5] text-[#6B655E] hover:text-[#1F1D1B] border border-[#EAE5DD]"
                      }`}
                      title={item.isPinned ? "Lepas dari layar TV" : "Tampilkan ucapan ini di layar TV resepsi"}
                      aria-label="Toggle pin ke layar TV"
                    >
                      <Tv className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed italic bg-[#FAF8F5] p-3.5 rounded-xl border border-[#EAE5DD]">
                    "{item.wishes}"
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#8A837A]">
                    <span className="flex items-center gap-1 text-[#15803D] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Konfirmasi {item.confirmedPax} Pax Hadir
                    </span>
                    <button
                      type="button"
                      onClick={() => handleFollowUpWA(item)}
                      className="text-[#A04F34] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Balas Doa via WA</span>
                      <Send className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
