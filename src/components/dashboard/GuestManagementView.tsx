"use client";

import React, { useState, useMemo, useId, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Users,
  Plus,
  Search,
  Download,
  Upload,
  FileSpreadsheet,
  Send,
  Share2,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  Filter,
  Check,
  Calendar,
  X,
  Building,
  UserPlus,
  ExternalLink,
  AlertCircle,
  FileText,
  RefreshCw,
  Loader2,
} from "lucide-react";

/* ========================================================================= */
/* DATA CONTRACT: DAFTAR TAMU (TARGET CALON UNDANGAN)                       */
/* ========================================================================= */
export interface InvitedGuest {
  id: string;
  name: string;
  category: "VIP" | "Keluarga" | "Sahabat" | "Rekan Kerja" | "Komunitas";
  phone: string;
  paxQuota: number;
  session: "sesi_1" | "sesi_2" | "all";
  tableAssignment: string;
  inviteStatus: "draft" | "siap_kirim" | "terkirim";
  notes?: string;
  createdAt: string;
}

const DEFAULT_TARGET_GUESTS: InvitedGuest[] = [
  {
    id: "g-1",
    name: "Prof. Dr. Ir. Bambang Soedibyo",
    category: "VIP",
    phone: "081234567890",
    paxQuota: 2,
    session: "all",
    tableAssignment: "Meja VIP 01",
    inviteStatus: "terkirim",
    notes: "Tamu kehormatan keluarga mempelai wanita",
    createdAt: "15 Des 2025",
  },
  {
    id: "g-2",
    name: "Keluarga Besar H. Rahmat Hidayat",
    category: "Keluarga",
    phone: "081398765432",
    paxQuota: 4,
    session: "all",
    tableAssignment: "Meja K-02",
    inviteStatus: "terkirim",
    notes: "Rombongan dari Surabaya",
    createdAt: "15 Des 2025",
  },
  {
    id: "g-3",
    name: "Dimas Wicaksono, S.Kom",
    category: "Sahabat",
    phone: "081711223344",
    paxQuota: 2,
    session: "sesi_2",
    tableAssignment: "Meja S-05",
    inviteStatus: "terkirim",
    notes: "Sahabat kuliah ITB",
    createdAt: "16 Des 2025",
  },
  {
    id: "g-4",
    name: "Annisa Laksmi, M.Psi",
    category: "Sahabat",
    phone: "081855667788",
    paxQuota: 1,
    session: "sesi_2",
    tableAssignment: "Meja S-02",
    inviteStatus: "terkirim",
    notes: "Teman SMA 8",
    createdAt: "16 Des 2025",
  },
  {
    id: "g-5",
    name: "Ir. Hendra Kusuma & Istri",
    category: "VIP",
    phone: "081288990011",
    paxQuota: 2,
    session: "sesi_2",
    tableAssignment: "Meja VIP 02",
    inviteStatus: "terkirim",
    notes: "Kolega Direksi Ayah Faizal",
    createdAt: "17 Des 2025",
  },
  {
    id: "g-6",
    name: "Reza Fahlevi (Head of Tech)",
    category: "Rekan Kerja",
    phone: "081922334455",
    paxQuota: 2,
    session: "sesi_2",
    tableAssignment: "Meja R-01",
    inviteStatus: "terkirim",
    notes: "Kantor Jakarta",
    createdAt: "17 Des 2025",
  },
  {
    id: "g-7",
    name: "dr. Maya Anggraini, Sp.A",
    category: "Sahabat",
    phone: "081133445566",
    paxQuota: 2,
    session: "sesi_2",
    tableAssignment: "Meja S-03",
    inviteStatus: "siap_kirim",
    notes: "Belum dikirimkan undangan fisik/digital",
    createdAt: "18 Des 2025",
  },
  {
    id: "g-8",
    name: "Keluarga dr. Raditya Wardhana",
    category: "Keluarga",
    phone: "081299443322",
    paxQuota: 3,
    session: "sesi_1",
    tableAssignment: "Meja K-01",
    inviteStatus: "draft",
    notes: "Menunggu konfirmasi alamat lengkap",
    createdAt: "19 Des 2025",
  },
];

export default function GuestManagementView() {
  const [guests, setGuests] = useState<InvitedGuest[]>(DEFAULT_TARGET_GUESTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSession, setFilterSession] = useState<string>("all");
  const [filterInviteStatus, setFilterInviteStatus] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [copiedGuestId, setCopiedGuestId] = useState<string | null>(null);
  const searchInputId = useId();

  // Import Modal State
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [importProgress, setImportProgress] = useState(0);
  const [importProgressMessage, setImportProgressMessage] = useState("");
  const [importedSummary, setImportedSummary] = useState<{ totalCount: number; sampleNames: string[] } | null>(null);
  const [importErrorMessage, setImportErrorMessage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // Form State for new invited guest
  const [formData, setFormData] = useState({
    name: "",
    category: "Sahabat" as InvitedGuest["category"],
    phone: "",
    paxQuota: 2,
    session: "sesi_2" as InvitedGuest["session"],
    tableAssignment: "",
    notes: "",
  });

  // Edit Guest State
  const [editingGuest, setEditingGuest] = useState<InvitedGuest | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "Sahabat" as InvitedGuest["category"],
    phone: "",
    paxQuota: 2,
    session: "sesi_2" as InvitedGuest["session"],
    tableAssignment: "",
    inviteStatus: "siap_kirim" as InvitedGuest["inviteStatus"],
    notes: "",
  });

  // Calculate Target Stats
  const stats = useMemo(() => {
    const totalContacts = guests.length;
    const totalEstimatedPax = guests.reduce((acc, g) => acc + g.paxQuota, 0);
    const sesi1Pax = guests
      .filter((g) => g.session === "sesi_1" || g.session === "all")
      .reduce((acc, g) => acc + g.paxQuota, 0);
    const sesi2Pax = guests
      .filter((g) => g.session === "sesi_2" || g.session === "all")
      .reduce((acc, g) => acc + g.paxQuota, 0);
    const sentCount = guests.filter((g) => g.inviteStatus === "terkirim").length;
    const readyCount = guests.filter((g) => g.inviteStatus !== "terkirim").length;

    return {
      totalContacts,
      totalEstimatedPax,
      sesi1Pax,
      sesi2Pax,
      sentCount,
      readyCount,
    };
  }, [guests]);

  // Filtered List
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchSearch =
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.phone.includes(searchQuery) ||
        g.tableAssignment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (g.notes && g.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCat = filterCategory === "all" || g.category === filterCategory;
      const matchSession = filterSession === "all" || g.session === filterSession;
      const matchStatus = filterInviteStatus === "all" || g.inviteStatus === filterInviteStatus;

      return matchSearch && matchCat && matchSession && matchStatus;
    });
  }, [guests, searchQuery, filterCategory, filterSession, filterInviteStatus]);

  // Add Guest Submit
  const handleAddGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newGuest: InvitedGuest = {
      id: `g-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      phone: formData.phone.trim() || "-",
      paxQuota: formData.paxQuota,
      session: formData.session,
      tableAssignment: formData.tableAssignment.trim() || "Reguler",
      inviteStatus: "siap_kirim",
      notes: formData.notes.trim() || undefined,
      createdAt: "Hari ini",
    };

    setGuests((prev) => [newGuest, ...prev]);
    setFormData({
      name: "",
      category: "Sahabat",
      phone: "",
      paxQuota: 2,
      session: "sesi_2",
      tableAssignment: "",
      notes: "",
    });
    setIsAddModalOpen(false);
  };

  // Open Edit Modal
  const handleOpenEditModal = (guest: InvitedGuest) => {
    setEditingGuest(guest);
    setEditFormData({
      name: guest.name,
      category: guest.category,
      phone: guest.phone === "-" ? "" : guest.phone,
      paxQuota: guest.paxQuota,
      session: guest.session,
      tableAssignment: guest.tableAssignment,
      inviteStatus: guest.inviteStatus,
      notes: guest.notes || "",
    });
  };

  // Submit Edit Guest
  const handleEditGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGuest || !editFormData.name.trim()) return;

    setGuests((prev) =>
      prev.map((g) =>
        g.id === editingGuest.id
          ? {
              ...g,
              name: editFormData.name.trim(),
              category: editFormData.category,
              phone: editFormData.phone.trim() || "-",
              paxQuota: editFormData.paxQuota,
              session: editFormData.session,
              tableAssignment: editFormData.tableAssignment.trim() || "Reguler",
              inviteStatus: editFormData.inviteStatus,
              notes: editFormData.notes.trim() || undefined,
            }
          : g
      )
    );
    setEditingGuest(null);
  };

  // Delete Guest
  const handleDeleteGuest = (id: string) => {
    if (confirm("Hapus tamu ini dari daftar rencana undangan?")) {
      setGuests((prev) => prev.filter((g) => g.id !== id));
    }
  };

  // Copy Personal Invitation Link
  const handleCopyPersonalLink = (guest: InvitedGuest) => {
    const encodedName = encodeURIComponent(guest.name);
    const link = `https://mengundang.id/demo/motion-art-jawa?to=${encodedName}`;
    navigator.clipboard.writeText(link);
    setCopiedGuestId(guest.id);
    setTimeout(() => setCopiedGuestId(null), 2000);
  };

  // File input ref for Excel import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Download Excel Template (.xlsx)
  const handleDownloadTemplate = () => {
    const templateRows = [
      {
        "Nama Calon Tamu": "Prof. Dr. Bambang Soedibyo",
        "Kategori (VIP/Keluarga/Sahabat/Rekan Kerja)": "VIP",
        "No WhatsApp": "081234567890",
        "Kuota Pax": 2,
        "Sesi Acara (sesi_1 / sesi_2 / all)": "sesi_1",
        "Rencana Meja": "Meja VIP 01",
        "Catatan Panitia": "Tamu kehormatan keluarga",
      },
      {
        "Nama Calon Tamu": "Keluarga H. Rahmat Hidayat",
        "Kategori (VIP/Keluarga/Sahabat/Rekan Kerja)": "Keluarga",
        "No WhatsApp": "081398765432",
        "Kuota Pax": 4,
        "Sesi Acara (sesi_1 / sesi_2 / all)": "all",
        "Rencana Meja": "Meja K-02",
        "Catatan Panitia": "Rombongan dari Surabaya",
      },
      {
        "Nama Calon Tamu": "Dimas Wicaksono, S.Kom",
        "Kategori (VIP/Keluarga/Sahabat/Rekan Kerja)": "Sahabat",
        "No WhatsApp": "081711223344",
        "Kuota Pax": 2,
        "Sesi Acara (sesi_1 / sesi_2 / all)": "sesi_2",
        "Rencana Meja": "Meja S-05",
        "Catatan Panitia": "Sahabat kuliah ITB",
      },
      {
        "Nama Calon Tamu": "Annisa Laksmi, M.Psi",
        "Kategori (VIP/Keluarga/Sahabat/Rekan Kerja)": "Sahabat",
        "No WhatsApp": "081855667788",
        "Kuota Pax": 1,
        "Sesi Acara (sesi_1 / sesi_2 / all)": "sesi_2",
        "Rencana Meja": "Meja S-02",
        "Catatan Panitia": "Teman SMA",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateRows);
    worksheet["!cols"] = [
      { wch: 32 },
      { wch: 26 },
      { wch: 18 },
      { wch: 12 },
      { wch: 25 },
      { wch: 18 },
      { wch: 32 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Template Tamu");
    XLSX.writeFile(workbook, "Template_Daftar_Tamu_Undangan.xlsx");
  };

  // Export Guest List to Excel (.xlsx)
  const handleExportExcel = () => {
    const exportRows = guests.map((g) => ({
      "Nama Calon Tamu": g.name,
      "Kategori": g.category,
      "No WhatsApp": g.phone,
      "Kuota Pax": g.paxQuota,
      "Sesi Acara":
        g.session === "all"
          ? "Semua Sesi (Akad + Resepsi)"
          : g.session === "sesi_1"
          ? "Sesi 1 (Akad & Siang)"
          : "Sesi 2 (Resepsi Malam)",
      "Rencana Meja": g.tableAssignment,
      "Status Undangan":
        g.inviteStatus === "terkirim"
          ? "Terkirim WA"
          : g.inviteStatus === "siap_kirim"
          ? "Siap Kirim"
          : "Draft",
      "Catatan Panitia": g.notes || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    worksheet["!cols"] = [
      { wch: 32 },
      { wch: 15 },
      { wch: 18 },
      { wch: 12 },
      { wch: 26 },
      { wch: 18 },
      { wch: 18 },
      { wch: 32 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Daftar Calon Tamu");
    XLSX.writeFile(workbook, "Daftar_Tamu_Undangan_Sarah_Faizal.xlsx");
  };

  // Import Guests from Excel (.xlsx / .xls / .csv)
  const processImportFile = async (file: File) => {
    if (!file) return;

    setSelectedFileName(file.name);
    setImportStatus("uploading");
    setImportProgress(15);
    setImportProgressMessage("Membaca file data...");
    setImportErrorMessage(null);

    try {
      await new Promise((r) => setTimeout(r, 250));
      const buffer = await file.arrayBuffer();

      setImportProgress(45);
      setImportProgressMessage("Memproses lembar kerja Excel...");
      await new Promise((r) => setTimeout(r, 250));

      const workbook = XLSX.read(buffer, { type: "array" });
      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        throw new Error("File Excel tidak memiliki lembar kerja (worksheet).");
      }

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      setImportProgress(75);
      setImportProgressMessage("Memvalidasi baris data calon tamu...");
      await new Promise((r) => setTimeout(r, 250));

      if (!rawData || rawData.length === 0) {
        throw new Error("File Excel kosong atau format tidak sesuai.");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const importedGuests: InvitedGuest[] = rawData
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((row: any, idx: number) => {
          const name = String(
            row["Nama Calon Tamu"] ||
              row["Nama"] ||
              row["Name"] ||
              row["Nama Tamu"] ||
              ""
          ).trim();
          if (!name) return null;

          const rawCategory = String(
            row["Kategori (VIP/Keluarga/Sahabat/Rekan Kerja)"] ||
              row["Kategori"] ||
              row["Category"] ||
              "Sahabat"
          ).trim();
          let category: InvitedGuest["category"] = "Sahabat";
          if (/vip/i.test(rawCategory)) category = "VIP";
          else if (/keluarga/i.test(rawCategory)) category = "Keluarga";
          else if (/rekan/i.test(rawCategory)) category = "Rekan Kerja";
          else if (/komunitas/i.test(rawCategory)) category = "Komunitas";

          const phone = String(row["No WhatsApp"] || row["Telepon"] || row["Phone"] || "-").trim();
          const paxQuota = Number(row["Kuota Pax"] || row["Pax"] || row["Jumlah Pax"]) || 2;

          const rawSession = String(
            row["Sesi Acara (sesi_1 / sesi_2 / all)"] ||
              row["Sesi Acara"] ||
              row["Sesi"] ||
              "sesi_2"
          ).toLowerCase();
          let session: InvitedGuest["session"] = "sesi_2";
          if (rawSession.includes("1") || rawSession.includes("akad")) session = "sesi_1";
          else if (rawSession.includes("all") || rawSession.includes("semua")) session = "all";

          const tableAssignment = String(
            row["Rencana Meja"] || row["Meja"] || row["Table"] || "Reguler"
          ).trim();
          const notes = String(
            row["Catatan Panitia"] || row["Catatan"] || row["Notes"] || ""
          ).trim();

          return {
            id: `imported-${Date.now()}-${idx}`,
            name,
            category,
            phone,
            paxQuota,
            session,
            tableAssignment,
            inviteStatus: "siap_kirim" as const,
            notes: notes || undefined,
            createdAt: "Diimpor dari Excel",
          };
        })
        .filter(Boolean) as InvitedGuest[];

      if (importedGuests.length === 0) {
        throw new Error(
          "Kolom 'Nama Calon Tamu' tidak ditemukan atau semua baris nama kosong. Pastikan format kolom sesuai template."
        );
      }

      setImportProgress(95);
      setImportProgressMessage("Menyimpan calon tamu ke database...");
      await new Promise((r) => setTimeout(r, 200));

      setGuests((prev) => [...importedGuests, ...prev]);
      setImportProgress(100);
      setImportProgressMessage("Import selesai!");
      setImportedSummary({
        totalCount: importedGuests.length,
        sampleNames: importedGuests.slice(0, 4).map((g) => g.name),
      });
      setImportStatus("success");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Gagal mengimpor file:", err);
      setImportProgress(100);
      setImportErrorMessage(
        err?.message ||
          "Gagal memproses file. Pastikan file berformat .xlsx / .xls dan kolom sesuai template."
      );
      setImportStatus("error");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImportFile(file);
  };

  return (
    <div className="space-y-6">
      {/* Hidden File Input for Excel Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".xlsx, .xls, .csv"
        className="hidden"
        aria-label="Upload file Excel"
      />

      {/* ------------------------------------------------------------- */}
      {/* HEADER SECTION                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EAE5DD] shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7]">
              Database Calon Tamu
            </span>
            <span className="text-xs text-[#8A837A]">
              Target: {stats.totalContacts} Kontak ({stats.totalEstimatedPax} Estimasi Pax)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif-display font-bold text-[#1F1D1B]">
            Daftar Tamu Undangan
          </h1>
          <p className="text-xs sm:text-sm text-[#6B655E] mt-0.5 max-w-xl">
            Kelola daftar nama keluarga, sahabat, dan relasi yang akan diundang, alokasi kuota pax, sesi acara, serta rencana meja.
          </p>
        </div>

        {/* Global Actions - Single Neat Row */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
          {/* Ekspor Excel */}
          <button
            type="button"
            onClick={handleExportExcel}
            className="min-h-[42px] px-3.5 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] hover:bg-[#FAF2EB] text-xs font-semibold text-[#1F1D1B] flex items-center gap-2 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            title="Download seluruh daftar calon tamu ke file Excel (.xlsx)"
          >
            <Download className="w-3.5 h-3.5 text-[#6B655E]" />
            <span>Ekspor Excel</span>
          </button>

          {/* 1 Button: Import Kontak */}
          <button
            type="button"
            onClick={() => {
              setImportStatus("idle");
              setImportProgress(0);
              setImportErrorMessage(null);
              setImportedSummary(null);
              setSelectedFileName(null);
              setIsImportModalOpen(true);
            }}
            className="min-h-[42px] px-3.5 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] hover:bg-[#FAF2EB] text-xs font-semibold text-[#1F1D1B] flex items-center gap-2 transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            title="Buka modal import kontak (download template & upload)"
          >
            <Upload className="w-3.5 h-3.5 text-[#6B655E]" />
            <span>Import Kontak</span>
          </button>

          {/* Add Guest Button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="min-h-[42px] px-4 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Tambah Calon Tamu</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4 STATS CARDS: RENCANA UNDANGAN & ALOKASI                     */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Calon Tamu */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              Calon Tamu
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF2EB] text-[#A04F34] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-0.5">
            {stats.totalContacts} Kontak
          </div>
          <div className="text-xs text-[#8A837A] font-medium">
            Total target undangan terdata
          </div>
        </div>

        {/* Card 2: Estimasi Total Pax */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              Estimasi Total Pax
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#1F1D1B] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-0.5">
            {stats.totalEstimatedPax} Pax
          </div>
          <div className="text-xs text-[#8A837A] font-medium">
            Berdasarkan alokasi kuota per tamu
          </div>
        </div>

        {/* Card 3: Pembagian Sesi Acara */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              Pembagian Sesi
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#EDF3EE] text-[#15803D] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-[#1F1D1B] mb-0.5 flex items-center justify-between">
            <span>Sesi 1 (Akad/Siang):</span>
            <span className="font-mono text-[#15803D]">{stats.sesi1Pax} Pax</span>
          </div>
          <div className="text-sm font-bold text-[#1F1D1B] flex items-center justify-between">
            <span>Sesi 2 (Malam):</span>
            <span className="font-mono text-[#A04F34]">{stats.sesi2Pax} Pax</span>
          </div>
        </div>

        {/* Card 4: Status Distribusi Undangan */}
        <div className="bg-white rounded-2xl p-5 border border-[#EAE5DD] shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#6B655E] uppercase tracking-wider">
              Status Pengiriman
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] text-[#1F1D1B] flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1F1D1B] mb-0.5">
            {stats.sentCount} / {stats.totalContacts}
          </div>
          <div className="text-xs text-[#15803D] font-medium">
            {stats.readyCount} Kontak Siap / Belum Dikirim
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FILTER & SEARCH BAR                                           */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE5DD] shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <label htmlFor={searchInputId} className="sr-only">
              Cari nama tamu, nomor WhatsApp, atau nomor meja
            </label>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#8A837A]" />
            </div>
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama calon tamu, instansi, nomor telepon, atau alokasi meja..."
              className="w-full min-h-[44px] pl-10 pr-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] placeholder-[#8A837A] focus:border-[#A04F34] focus:outline-none focus:ring-1 focus:ring-[#A04F34] transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0" role="tablist">
            {["all", "VIP", "Keluarga", "Sahabat", "Rekan Kerja"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`min-h-[38px] px-3 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  filterCategory === cat
                    ? "bg-[#A04F34] text-white font-bold"
                    : "bg-[#FAF8F5] text-[#6B655E] hover:text-[#1F1D1B] border border-[#EAE5DD]"
                }`}
              >
                {cat === "all" ? "Semua Kategori" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sub-Filters: Sesi & Status Pengiriman */}
        <div className="flex items-center gap-3 pt-2 border-t border-[#EAE5DD] text-xs text-[#6B655E] flex-wrap">
          <span className="font-semibold text-[#1F1D1B]">Filter Lanjutan:</span>

          {/* Sesi Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[#8A837A]">Sesi:</span>
            <select
              value={filterSession}
              onChange={(e) => setFilterSession(e.target.value)}
              className="bg-[#FAF8F5] border border-[#EAE5DD] rounded-lg px-2.5 py-1 text-xs text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
            >
              <option value="all">Semua Sesi</option>
              <option value="sesi_1">Sesi 1 (Akad & Siang)</option>
              <option value="sesi_2">Sesi 2 (Resepsi Malam)</option>
            </select>
          </div>

          {/* Status Undangan Filter */}
          <div className="flex items-center gap-1">
            <span className="text-[#8A837A]">Status Kirim:</span>
            <select
              value={filterInviteStatus}
              onChange={(e) => setFilterInviteStatus(e.target.value)}
              className="bg-[#FAF8F5] border border-[#EAE5DD] rounded-lg px-2.5 py-1 text-xs text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="terkirim">Sudah Dikirim</option>
              <option value="siap_kirim">Siap Kirim</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <span className="ml-auto text-[#8A837A]">
            Menampilkan {filteredGuests.length} dari {guests.length} tamu
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GUEST LIST TABLE                                              */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-[#EAE5DD] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs" role="table">
            <thead className="bg-[#FAF8F5] text-[#6B655E] uppercase font-semibold text-[10px] tracking-wider border-b border-[#EAE5DD]">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Nama Calon Tamu
                </th>
                <th scope="col" className="py-3 px-3">
                  Kategori
                </th>
                <th scope="col" className="py-3 px-3">
                  Kuota Pax
                </th>
                <th scope="col" className="py-3 px-3">
                  Sesi & Meja
                </th>
                <th scope="col" className="py-3 px-3">
                  Status Kirim
                </th>
                <th scope="col" className="py-3 px-4 text-right">
                  Aksi & Tautan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE5DD]">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8A837A]">
                    Tidak ada calon tamu yang cocok dengan filter pencarian.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    {/* Nama & Kontak */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#1F1D1B] text-sm">
                        {guest.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#8A837A]">
                        <span>{guest.phone}</span>
                        {guest.notes && (
                          <>
                            <span>•</span>
                            <span className="italic truncate max-w-xs">{guest.notes}</span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#EAE5DD] text-[11px] font-medium text-[#6B655E]">
                        {guest.category}
                      </span>
                    </td>

                    {/* Kuota Pax */}
                    <td className="py-3.5 px-3">
                      <span className="font-mono font-bold text-sm text-[#1F1D1B]">
                        {guest.paxQuota} Pax
                      </span>
                    </td>

                    {/* Sesi & Meja */}
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-[#1F1D1B]">
                        {guest.tableAssignment}
                      </div>
                      <div className="text-[10px] text-[#8A837A] mt-0.5">
                        {guest.session === "all"
                          ? "Semua Sesi (Akad + Resepsi)"
                          : guest.session === "sesi_1"
                          ? "Sesi 1 (Akad & Siang)"
                          : "Sesi 2 (Resepsi Malam)"}
                      </div>
                    </td>

                    {/* Status Kirim Undangan */}
                    <td className="py-3.5 px-3">
                      {guest.inviteStatus === "terkirim" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#EDF3EE] text-[#15803D] border border-[#C6DAC9]">
                          <CheckCircle2 className="w-3 h-3" />
                          Terkirim WA
                        </span>
                      )}
                      {guest.inviteStatus === "siap_kirim" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]">
                          <Clock className="w-3 h-3" />
                          Siap Kirim
                        </span>
                      )}
                      {guest.inviteStatus === "draft" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FAF8F5] text-[#8A837A] border border-[#EAE5DD]">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Aksi */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Copy Personal Link */}
                        <button
                          type="button"
                          onClick={() => handleCopyPersonalLink(guest)}
                          className="min-h-[36px] px-3 rounded-lg bg-[#FAF8F5] hover:bg-[#FAF2EB] text-[#1F1D1B] border border-[#EAE5DD] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Salin link undangan personal"
                          aria-label={`Salin link undangan untuk ${guest.name}`}
                        >
                          {copiedGuestId === guest.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-green-700 font-semibold">Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-[#6B655E]" />
                              <span>Salin Link</span>
                            </>
                          )}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(guest)}
                          className="min-h-[36px] px-2.5 py-1.5 rounded-lg text-[#6B655E] hover:text-[#A04F34] bg-[#FAF8F5] hover:bg-[#FAF2EB] border border-[#EAE5DD] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                          title="Edit data calon tamu"
                          aria-label={`Edit data ${guest.name}`}
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#A04F34]" />
                          <span>Edit</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="min-h-[36px] p-2 rounded-lg text-[#8A837A] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Hapus calon tamu"
                          aria-label={`Hapus ${guest.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#EAE5DD] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8A837A]">
          <span>Menampilkan {filteredGuests.length} dari total {guests.length} kontak calon tamu</span>
          <span>Data siap dikirimkan lewat modul Kirim Undangan WA</span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: TAMBAH CALON TAMU BARU                                 */}
      {/* ------------------------------------------------------------- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EAE5DD] shadow-xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#1F1D1B] font-serif-display">
                  Tambah Calon Tamu Undangan
                </h2>
                <p className="text-xs text-[#6B655E] mt-0.5">
                  Masukkan data kontak yang akan diundang ke pernikahan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-[#8A837A] hover:bg-[#FAF8F5] hover:text-[#1F1D1B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddGuestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                  Nama Lengkap & Gelar *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Dr. Budi Santoso, M.Si"
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Kategori Tamu
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as InvitedGuest["category"],
                      })
                    }
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  >
                    <option value="VIP">VIP</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Sahabat">Sahabat</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                    <option value="Komunitas">Komunitas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    No. WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812xxxxxxxx"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Kuota Pax
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formData.paxQuota}
                    onChange={(e) =>
                      setFormData({ ...formData, paxQuota: parseInt(e.target.value) || 1 })
                    }
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Sesi Acara
                  </label>
                  <select
                    value={formData.session}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        session: e.target.value as InvitedGuest["session"],
                      })
                    }
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  >
                    <option value="sesi_1">Sesi 1 (Akad & Siang)</option>
                    <option value="sesi_2">Sesi 2 (Resepsi Malam)</option>
                    <option value="all">Semua Sesi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Rencana Meja
                  </label>
                  <input
                    type="text"
                    value={formData.tableAssignment}
                    onChange={(e) => setFormData({ ...formData, tableAssignment: e.target.value })}
                    placeholder="Contoh: Meja S-01"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                  Catatan Panitia (Opsional)
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Misal: Atasan kantor, butuh kursi roda, keluarga dekat"
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAE5DD]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EAE5DD] bg-white text-xs font-semibold text-[#6B655E] hover:bg-[#FAF8F5]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white text-xs font-bold transition-all shadow-xs"
                >
                  Simpan Calon Tamu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: EDIT DATA CALON TAMU                                   */}
      {/* ------------------------------------------------------------- */}
      {editingGuest && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#EAE5DD] shadow-xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#EAE5DD] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7]">
                  <Edit2 className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-[#1F1D1B] font-serif-display">
                    Edit Data Calon Tamu
                  </h2>
                  <p className="text-xs text-[#6B655E] mt-0.5">
                    Perbarui informasi kontak, kuota, atau status kirim undangan.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingGuest(null)}
                className="p-1.5 rounded-lg text-[#8A837A] hover:bg-[#FAF8F5] hover:text-[#1F1D1B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditGuestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                  Nama Lengkap &amp; Gelar *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  placeholder="Contoh: Dr. Budi Santoso, M.Si"
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Kategori Tamu
                  </label>
                  <select
                    value={editFormData.category}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        category: e.target.value as InvitedGuest["category"],
                      })
                    }
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  >
                    <option value="VIP">VIP</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Sahabat">Sahabat</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                    <option value="Komunitas">Komunitas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    No. WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    placeholder="0812xxxxxxxx"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Kuota Pax
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={editFormData.paxQuota}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, paxQuota: parseInt(e.target.value) || 1 })
                    }
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Sesi Acara
                  </label>
                  <select
                    value={editFormData.session}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        session: e.target.value as InvitedGuest["session"],
                      })
                    }
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  >
                    <option value="sesi_1">Sesi 1 (Akad &amp; Siang)</option>
                    <option value="sesi_2">Sesi 2 (Resepsi Malam)</option>
                    <option value="all">Semua Sesi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Rencana Meja
                  </label>
                  <input
                    type="text"
                    value={editFormData.tableAssignment}
                    onChange={(e) => setEditFormData({ ...editFormData, tableAssignment: e.target.value })}
                    placeholder="Contoh: Meja S-01"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Status Pengiriman
                  </label>
                  <select
                    value={editFormData.inviteStatus}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        inviteStatus: e.target.value as InvitedGuest["inviteStatus"],
                      })
                    }
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  >
                    <option value="siap_kirim">Siap Kirim</option>
                    <option value="terkirim">Terkirim WA</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1F1D1B] uppercase tracking-wider mb-1.5">
                    Catatan Panitia (Opsional)
                  </label>
                  <input
                    type="text"
                    value={editFormData.notes}
                    onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                    placeholder="Misal: Atasan kantor, butuh kursi roda"
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-sm text-[#1F1D1B] focus:border-[#A04F34] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAE5DD]">
                <button
                  type="button"
                  onClick={() => setEditingGuest(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#EAE5DD] bg-white text-xs font-semibold text-[#6B655E] hover:bg-[#FAF8F5] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: IMPORT KONTAK DARI EXCEL                              */}
      {/* ------------------------------------------------------------- */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-[#EAE5DD] space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#EAE5DD] pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-[#FAF2EB] text-[#A04F34] border border-[#F0D5C7]">
                  <Upload className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-[#1F1D1B]">Import Kontak Calon Tamu</h2>
                  <p className="text-xs text-[#6B655E] mt-0.5">
                    Unggah file Excel untuk mengisi database calon tamu secara massal
                  </p>
                </div>
              </div>
              <button
                type="button"
                disabled={importStatus === "uploading"}
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportStatus("idle");
                }}
                className="p-1.5 rounded-lg text-[#8A837A] hover:bg-[#FAF8F5] transition-colors disabled:opacity-50 cursor-pointer"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step 1: Download Template */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#A04F34] text-white text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <span className="text-xs font-bold text-[#1F1D1B]">Download Template Resmi</span>
                </div>
                <span className="text-[11px] font-semibold text-[#15803D] bg-[#EDF3EE] px-2 py-0.5 rounded-md border border-[#C6DAC9]">
                  Excel .xlsx
                </span>
              </div>
              <p className="text-xs text-[#6B655E] leading-relaxed">
                Gunakan template resmi kami agar susunan kolom nama, nomor WhatsApp, kuota pax, sesi acara, dan meja langsung terbaca otomatis.
              </p>
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="w-full min-h-[42px] px-4 rounded-xl border border-[#C6DAC9] bg-[#EDF3EE] hover:bg-[#E2ECE3] text-xs font-bold text-[#15803D] flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#15803D]" />
                <span>Download Template Excel (.xlsx)</span>
              </button>
            </div>

            {/* Step 2: Upload File & Process */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#1F1D1B] text-white text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <span className="text-xs font-bold text-[#1F1D1B]">Upload File Excel Tamu</span>
              </div>

              {/* State: IDLE */}
              {importStatus === "idle" && (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const droppedFile = e.dataTransfer.files?.[0];
                    if (droppedFile) processImportFile(droppedFile);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-[#D5CEC5] hover:border-[#A04F34] bg-[#FAF8F5]/60 hover:bg-[#FAF2EB]/40 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs border border-[#EAE5DD] flex items-center justify-center text-[#A04F34] group-hover:scale-110 transition-transform mb-2.5">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-bold text-[#1F1D1B]">
                    Klik untuk pilih file atau seret file ke sini
                  </p>
                  <p className="text-[11px] text-[#8A837A] mt-1">
                    Mendukung format .xlsx, .xls, atau .csv (Maksimal 5MB)
                  </p>
                  <span className="mt-3 px-3.5 py-1.5 rounded-lg bg-white border border-[#EAE5DD] text-[11px] font-bold text-[#1F1D1B] shadow-2xs group-hover:bg-[#FAF2EB] transition-colors">
                    Pilih File dari Komputer
                  </span>
                </div>
              )}

              {/* State: UPLOADING / PROCESSING (WITH PROGRESS BAR) */}
              {importStatus === "uploading" && (
                <div className="p-5 rounded-2xl border border-[#EAE5DD] bg-white shadow-2xs space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate max-w-[240px]">
                      <FileText className="w-4 h-4 text-[#A04F34] shrink-0" />
                      <span className="font-semibold text-[#1F1D1B] truncate">
                        {selectedFileName || "Memproses file..."}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-[#A04F34]">{importProgress}%</span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="w-full bg-[#EAE5DD] h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#A04F34] h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${importProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6B655E]">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A04F34]" />
                    <span>{importProgressMessage}</span>
                  </div>
                </div>
              )}

              {/* State: SUCCESS NOTIFICATION */}
              {importStatus === "success" && (
                <div className="p-5 rounded-2xl border border-[#C6DAC9] bg-[#EDF3EE] space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#15803D] shadow-2xs border border-[#C6DAC9]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#15803D]">Berhasil Mengimpor Kontak!</h3>
                      <p className="text-xs text-[#1F1D1B] mt-0.5">
                        Sebanyak <strong>{importedSummary?.totalCount}</strong> calon tamu baru berhasil ditambahkan ke daftar target undangan.
                      </p>
                    </div>
                  </div>

                  {importedSummary?.sampleNames && importedSummary.sampleNames.length > 0 && (
                    <div className="pt-2 border-t border-[#C6DAC9]/60">
                      <p className="text-[11px] font-semibold text-[#15803D] mb-1.5">
                        Daftar nama yang diimpor:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {importedSummary.sampleNames.map((name, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-white border border-[#C6DAC9] text-[11px] text-[#1F1D1B]"
                          >
                            {name}
                          </span>
                        ))}
                        {importedSummary.totalCount > 4 && (
                          <span className="px-2 py-0.5 rounded-md bg-white/70 text-[11px] text-[#6B655E]">
                            +{importedSummary.totalCount - 4} lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsImportModalOpen(false);
                        setImportStatus("idle");
                      }}
                      className="flex-1 min-h-[40px] px-4 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Selesai & Lihat Daftar Tamu
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImportStatus("idle");
                        setImportProgress(0);
                      }}
                      className="min-h-[40px] px-3.5 rounded-xl border border-[#C6DAC9] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#1F1D1B] transition-colors cursor-pointer"
                    >
                      Import Lagi
                    </button>
                  </div>
                </div>
              )}

              {/* State: ERROR NOTIFICATION */}
              {importStatus === "error" && (
                <div className="p-5 rounded-2xl border border-[#FCA5A5] bg-[#FEF2F2] space-y-4 animate-in fade-in duration-150">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white text-[#DC2626] shadow-2xs border border-[#FCA5A5]">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#DC2626]">Gagal Mengimpor File</h3>
                      <p className="text-xs text-[#1F1D1B] mt-1 leading-relaxed">
                        {importErrorMessage || "Format file tidak dikenali atau lembar kerja kosong."}
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#7F1D1D] bg-white/80 p-2.5 rounded-xl border border-[#FCA5A5]/60">
                    💡 <strong>Tips:</strong> Pastikan Anda menggunakan file Excel yang diisi dari tombol <strong>Download Template Excel</strong> di Langkah 1.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setImportStatus("idle");
                        setImportProgress(0);
                        setImportErrorMessage(null);
                      }}
                      className="flex-1 min-h-[40px] px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Coba Upload Lagi</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="min-h-[40px] px-3.5 rounded-xl border border-[#FCA5A5] bg-white hover:bg-[#FEF2F2] text-xs font-semibold text-[#7F1D1D] transition-colors cursor-pointer"
                    >
                      Download Template
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end border-t border-[#EAE5DD] pt-4">
              <button
                type="button"
                disabled={importStatus === "uploading"}
                onClick={() => {
                  setIsImportModalOpen(false);
                  setImportStatus("idle");
                }}
                className="px-4 py-2 rounded-xl border border-[#EAE5DD] bg-white hover:bg-[#FAF8F5] text-xs font-semibold text-[#6B655E] disabled:opacity-50 transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
