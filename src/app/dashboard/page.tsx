"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  CreditCard,
  Music,
  ExternalLink,
  RotateCcw,
  Check,
  Sparkles,
  Smartphone,
  Eye,
  Plus,
  Trash2,
  Share2,
  Home,
  MessageSquare,
  Gift,
  Shirt,
  Menu,
} from "lucide-react";
import { useInvitationData } from "@/lib/invitationStore";
import SnapPhotoView from "@/components/snap-photo/SnapPhotoView";
import MotionArtJawaView from "@/components/themes/MotionArtJawaView";
import DashboardSidebar, { DashboardViewType } from "@/components/dashboard/DashboardSidebar";
import SendInvitationView from "@/components/dashboard/SendInvitationView";
import GuestManagementView from "@/components/dashboard/GuestManagementView";
import RsvpManagementView from "@/components/dashboard/RsvpManagementView";
import EventOverviewView from "@/components/dashboard/EventOverviewView";
import ReceptionManagerView from "@/components/dashboard/ReceptionManagerView";
import WeddingBentoCenter from "@/components/bento/WeddingBentoCenter";

export default function CustomerDashboardPage() {
  const { data, updateData, resetToDefault } = useInvitationData();
  const [currentView, setCurrentView] = useState<DashboardViewType>("editor");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "mempelai" | "acara" | "cerita" | "galeri" | "amplop" | "musik"
  >("mempelai");
  const [copiedLink, setCopiedLink] = useState(false);
  const [testGuestName, setTestGuestName] = useState("Bpk. Hendra Gunawan");

  // Phone Simulator Drag-to-Scroll & Navigation
  const phoneScrollRef = useRef<HTMLDivElement>(null);
  const isDraggingPhone = useRef(false);
  const startY = useRef(0);
  const startScrollTop = useRef(0);
  const [activePhoneSection, setActivePhoneSection] = useState("hero");

  const handlePhoneMouseDown = (e: React.MouseEvent) => {
    isDraggingPhone.current = true;
    startY.current = e.clientY;
    startScrollTop.current = phoneScrollRef.current?.scrollTop || 0;
  };

  const handlePhoneMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingPhone.current || !phoneScrollRef.current) return;
    e.preventDefault();
    const dy = e.clientY - startY.current;
    phoneScrollRef.current.scrollTop = startScrollTop.current - dy * 1.5;
  };

  const handlePhoneMouseUp = () => {
    isDraggingPhone.current = false;
  };

  const jumpToPhoneSection = (sectionId: string) => {
    setActivePhoneSection(sectionId);
    if (!phoneScrollRef.current) return;
    const targetElement = phoneScrollRef.current.querySelector(`#${sectionId}`) as HTMLElement | null;
    if (targetElement) {
      const containerRect = phoneScrollRef.current.getBoundingClientRect();
      const elemRect = targetElement.getBoundingClientRect();
      const relativeTop = elemRect.top - containerRect.top + phoneScrollRef.current.scrollTop;
      phoneScrollRef.current.scrollTo({ top: relativeTop - 10, behavior: "smooth" });
    }
  };

  const handleCopyShareLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/demo/snap-photo?to=${encodeURIComponent(testGuestName)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleResetData = () => {
    if (
      confirm(
        "Apakah Anda yakin ingin mengembalikan seluruh data undangan ke setelan awal demo?"
      )
    ) {
      resetToDefault();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B] flex flex-col lg:flex-row antialiased">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar / Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAE5DD] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-xl text-[#6B655E] hover:text-[#1F1D1B] hover:bg-[#FAF8F5] lg:hidden cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8A837A] font-medium hidden sm:inline">
                Dashboard
              </span>
              <span className="text-xs text-[#8A837A] hidden sm:inline">/</span>
              <h1 className="text-sm sm:text-base font-bold text-[#1F1D1B]">
                {currentView === "overview" && "Ringkasan Acara"}
                {currentView === "broadcast" && "Kirim Undangan WhatsApp"}
                {currentView === "guests" && "Daftar Tamu Undangan"}
                {currentView === "rsvp" && "Konfirmasi Kehadiran (RSVP)"}
                {currentView === "editor" && "Kostum Undangan"}
                {currentView === "reception" && "Check-in QR & Layar Resepsi"}
                {currentView === "bento" && "Live Monitor Acara"}
              </h1>
            </div>

            <span className="hidden sm:inline-block w-px h-5 bg-[#EAE5DD]" />

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EDF3EE] text-[#3A5743] text-xs font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Tersimpan Otomatis</span>
            </div>
          </div>

          {/* Topbar Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleCopyShareLink}
              className="px-3 py-1.5 rounded-xl border border-[#EAE5DD] bg-white hover:bg-[#FAF8F5] text-xs font-medium text-[#1F1D1B] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600 font-semibold">Link Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#A04F34]" />
                  <span className="hidden sm:inline">Salin Link Tamu</span>
                </>
              )}
            </button>

            <Link
              href={
                data.activeTheme === "motion-art-jawa"
                  ? "/demo/motion-art-jawa"
                  : "/demo/snap-photo"
              }
              target="_blank"
              className="px-3.5 py-1.5 rounded-xl bg-[#A04F34] hover:bg-[#873E27] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Buka Undangan</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* View Switcher Main Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentView === "overview" && (
            <EventOverviewView onNavigate={setCurrentView} />
          )}

          {currentView === "broadcast" && <SendInvitationView />}

          {currentView === "guests" && <GuestManagementView />}

          {currentView === "rsvp" && <RsvpManagementView />}

          {currentView === "reception" && <ReceptionManagerView />}

          {currentView === "bento" && <WeddingBentoCenter />}

          {currentView === "editor" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ========================================================= */}
              {/* LEFT COLUMN: FORM TABS & EDITORS (7 COLS)                 */}
              {/* ========================================================= */}
              <div className="lg:col-span-7 space-y-6">
          {/* Navigation Tab Bar - All 6 tabs visible without hiding */}
          <div className="bg-white rounded-2xl p-2 border border-[#EAE5DD] shadow-2xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
              {[
                { id: "mempelai", label: "Mempelai", icon: Users },
                { id: "acara", label: "Acara & Lokasi", icon: Calendar },
                { id: "cerita", label: "Love Story", icon: BookOpen },
                { id: "galeri", label: "Galeri Foto", icon: ImageIcon },
                { id: "amplop", label: "Amplop & Kado", icon: CreditCard },
                { id: "musik", label: "Musik & Doa", icon: Music },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center ${
                      isActive
                        ? "bg-[#A04F34] text-white shadow-xs font-bold scale-[1.02]"
                        : "text-[#6B655E] hover:text-[#1F1D1B] hover:bg-[#FAF8F5] bg-[#FAF8F5]/80"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: DATA MEMPELAI */}
          {activeTab === "mempelai" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DD] shadow-xs space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
                  Identitas Kedua Mempelai
                </h2>
                <p className="text-xs text-[#6B655E] mt-1">
                  Atur nama lengkap beserta gelar, nama panggilan, nama orang tua, dan foto profil mempelai.
                </p>
              </div>

              {/* Cover Header Settings */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3">
                <span className="text-xs font-bold text-[#A04F34] uppercase tracking-wider block">
                  Judul Cover Utama
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Nama di Cover
                    </label>
                    <input
                      type="text"
                      value={data.coverTitle}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          coverTitle: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Sub-judul Cover
                    </label>
                    <input
                      type="text"
                      value={data.coverSubtitle}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          coverSubtitle: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    URL Foto Cover Latar Belakang
                  </label>
                  <input
                    type="text"
                    value={data.coverPhoto}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        coverPhoto: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                  />
                </div>
              </div>

              {/* Mempelai Wanita (The Bride) */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EAE5DD]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C59B3C]" />
                  <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Mempelai Wanita (The Bride)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Nama Lengkap &amp; Gelar
                    </label>
                    <input
                      type="text"
                      value={data.bride.name}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          bride: { ...prev.bride, name: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      value={data.bride.nickname}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          bride: { ...prev.bride, nickname: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Keterangan Nama Orang Tua
                  </label>
                  <input
                    type="text"
                    value={data.bride.parents}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        bride: { ...prev.bride, parents: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Username Instagram (tanpa @)
                    </label>
                    <input
                      type="text"
                      value={data.bride.instagram}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          bride: { ...prev.bride, instagram: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      URL Foto Mempelai Wanita
                    </label>
                    <input
                      type="text"
                      value={data.bride.photo}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          bride: { ...prev.bride, photo: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                </div>
              </div>

              {/* Mempelai Pria (The Groom) */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#EAE5DD]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3A5743]" />
                  <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Mempelai Pria (The Groom)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Nama Lengkap &amp; Gelar
                    </label>
                    <input
                      type="text"
                      value={data.groom.name}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          groom: { ...prev.groom, name: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      value={data.groom.nickname}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          groom: { ...prev.groom, nickname: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Keterangan Nama Orang Tua
                  </label>
                  <input
                    type="text"
                    value={data.groom.parents}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        groom: { ...prev.groom, parents: e.target.value },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Username Instagram (tanpa @)
                    </label>
                    <input
                      type="text"
                      value={data.groom.instagram}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          groom: { ...prev.groom, instagram: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      URL Foto Mempelai Pria
                    </label>
                    <input
                      type="text"
                      value={data.groom.photo}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          groom: { ...prev.groom, photo: e.target.value },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACARA & LOKASI */}
          {activeTab === "acara" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DD] shadow-xs space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
                  Jadwal &amp; Lokasi Acara
                </h2>
                <p className="text-xs text-[#6B655E] mt-1">
                  Atur rangkaian acara akad nikah, resepsi, titik Google Maps, dan tautan live streaming.
                </p>
              </div>

              {data.events.map((event, index) => (
                <div
                  key={event.id}
                  className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3"
                >
                  <div className="flex justify-between items-center pb-2 border-b border-[#EAE5DD]">
                    <span className="text-xs font-bold text-[#A04F34] uppercase tracking-wider">
                      Rangkaian #{index + 1}: {event.title}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Judul Acara
                      </label>
                      <input
                        type="text"
                        value={event.title}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[index].title = e.target.value;
                          updateData((prev) => ({ ...prev, events: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Hari
                      </label>
                      <input
                        type="text"
                        value={event.dayName}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[index].dayName = e.target.value;
                          updateData((prev) => ({ ...prev, events: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Tanggal (YYYY-MM-DD)
                      </label>
                      <input
                        type="date"
                        value={event.date}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[index].date = e.target.value;
                          updateData((prev) => ({ ...prev, events: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Jam Mulai
                      </label>
                      <input
                        type="text"
                        value={event.startTime}
                        placeholder="08:00"
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[index].startTime = e.target.value;
                          updateData((prev) => ({ ...prev, events: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Jam Selesai &amp; Timezone
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={event.endTime}
                          placeholder="10:00"
                          onChange={(e) => {
                            const updated = [...data.events];
                            updated[index].endTime = e.target.value;
                            updateData((prev) => ({ ...prev, events: updated }));
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                        />
                        <input
                          type="text"
                          value={event.timezone}
                          placeholder="WIB"
                          onChange={(e) => {
                            const updated = [...data.events];
                            updated[index].timezone = e.target.value;
                            updateData((prev) => ({ ...prev, events: updated }));
                          }}
                          className="w-20 px-2 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] text-center focus:outline-none focus:border-[#A04F34]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Nama Tempat / Gedung
                      </label>
                      <input
                        type="text"
                        value={event.venueName}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[index].venueName = e.target.value;
                          updateData((prev) => ({ ...prev, events: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Link Google Maps
                      </label>
                      <input
                        type="text"
                        value={event.googleMapsUrl}
                        onChange={(e) => {
                          const updated = [...data.events];
                          updated[index].googleMapsUrl = e.target.value;
                          updateData((prev) => ({ ...prev, events: updated }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                      rows={2}
                      value={event.venueAddress}
                      onChange={(e) => {
                        const updated = [...data.events];
                        updated[index].venueAddress = e.target.value;
                        updateData((prev) => ({ ...prev, events: updated }));
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34] resize-none"
                    />
                  </div>
                </div>
              ))}

              {/* Action Buttons for Events */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const newId = `ev-${Date.now()}`;
                    updateData((prev) => ({
                      ...prev,
                      events: [
                        ...prev.events,
                        {
                          id: newId,
                          title: "Ngunduh Mantu",
                          date: "2026-01-04",
                          dayName: "Minggu",
                          startTime: "10:00",
                          endTime: "14:00",
                          timezone: "WIB",
                          venueName: "Kediaman Mempelai Pria (Pendopo)",
                          venueAddress: "Jl. Kaliurang KM 9, Sleman, D.I. Yogyakarta",
                          googleMapsUrl: "https://maps.google.com/?q=Yogyakarta",
                        },
                      ],
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#A04F34]/30 text-[#A04F34] hover:bg-[#A04F34]/10 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Acara Ngunduh Mantu</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const newId = `ev-${Date.now()}`;
                    updateData((prev) => ({
                      ...prev,
                      events: [
                        ...prev.events,
                        {
                          id: newId,
                          title: "Syukuran & Doa Bersama",
                          date: "2025-12-30",
                          dayName: "Selasa",
                          startTime: "19:00",
                          endTime: "21:00",
                          timezone: "WIB",
                          venueName: "Kediaman Mempelai",
                          venueAddress: "Jakarta",
                          googleMapsUrl: "",
                        },
                      ],
                    }));
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] text-[#6B655E] hover:text-[#1F1D1B] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Tambah Acara Kustom</span>
                </button>
              </div>

              {/* Live Streaming Link */}
              <div className="p-4 rounded-2xl bg-white border border-[#EAE5DD]">
                <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                  Link Siaran Langsung (YouTube Live / Zoom)
                </label>
                <input
                  type="text"
                  value={data.liveStreamingUrl}
                  placeholder="https://youtube.com/live/..."
                  onChange={(e) =>
                    updateData((prev) => ({
                      ...prev,
                      liveStreamingUrl: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                />
              </div>

              {/* Dress Code Tamu Editor */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#EAE5DD]">
                  <span className="text-xs font-bold text-[#A04F34] uppercase tracking-wider flex items-center gap-1.5">
                    <Shirt className="w-3.5 h-3.5" />
                    <span>Tata Busana Tamu (Dress Code)</span>
                  </span>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Judul Panduan
                  </label>
                  <input
                    type="text"
                    value={data.dressCode?.title || "Dress Code Tamu"}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        dressCode: {
                          title: e.target.value,
                          description: prev.dressCode?.description || "",
                          colors: prev.dressCode?.colors || [
                            { name: "Batik Sogan", hex: "#6F4E37" },
                            { name: "Sand Beige", hex: "#D2B48C" },
                            { name: "Terracotta", hex: "#A04F34" },
                            { name: "Olive Gold", hex: "#8A7520" },
                          ],
                        },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Deskripsi / Petunjuk Busana
                  </label>
                  <textarea
                    rows={2}
                    value={data.dressCode?.description || ""}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        dressCode: {
                          title: prev.dressCode?.title || "Dress Code Tamu",
                          description: e.target.value,
                          colors: prev.dressCode?.colors || [
                            { name: "Batik Sogan", hex: "#6F4E37" },
                            { name: "Sand Beige", hex: "#D2B48C" },
                            { name: "Terracotta", hex: "#A04F34" },
                            { name: "Olive Gold", hex: "#8A7520" },
                          ],
                        },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOVE STORY */}
          {activeTab === "cerita" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DD] shadow-xs space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
                  Perjalanan Cinta (Love Story)
                </h2>
                <p className="text-xs text-[#6B655E] mt-1">
                  Bagikan 3 tonggak kenangan manis Anda dan pasangan beserta foto dokumentasi.
                </p>
              </div>

              <div className="space-y-4">
                {data.loveStories.map((story, index) => (
                  <div
                    key={story.id}
                    className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3"
                  >
                    <div className="flex justify-between items-center pb-2 border-b border-[#EAE5DD]">
                      <span className="text-xs font-bold text-[#C59B3C] uppercase tracking-wider">
                        Kisah #{index + 1}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                          Judul Kisah
                        </label>
                        <input
                          type="text"
                          value={story.title}
                          onChange={(e) => {
                            const updated = [...data.loveStories];
                            updated[index].title = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              loveStories: updated,
                            }));
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                          Waktu / Periode (misal: September 2019)
                        </label>
                        <input
                          type="text"
                          value={story.period}
                          onChange={(e) => {
                            const updated = [...data.loveStories];
                            updated[index].period = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              loveStories: updated,
                            }));
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        URL Foto Momen
                      </label>
                      <input
                        type="text"
                        value={story.photo}
                        onChange={(e) => {
                          const updated = [...data.loveStories];
                          updated[index].photo = e.target.value;
                          updateData((prev) => ({
                            ...prev,
                            loveStories: updated,
                          }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                        Teks Cerita
                      </label>
                      <textarea
                        rows={3}
                        value={story.story}
                        onChange={(e) => {
                          const updated = [...data.loveStories];
                          updated[index].story = e.target.value;
                          updateData((prev) => ({
                            ...prev,
                            loveStories: updated,
                          }));
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34] resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GALERI FOTO */}
          {activeTab === "galeri" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DD] shadow-xs space-y-6 animate-fadeIn">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
                    Galeri Foto Prewedding
                  </h2>
                  <p className="text-xs text-[#6B655E] mt-1">
                    Kelola tautan gambar prewedding yang akan tampil di galeri pop-up lightbox.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newPhoto = {
                      id: "gal-" + Date.now(),
                      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
                      caption: "Momen bahagia bersama",
                    };
                    updateData((prev) => ({
                      ...prev,
                      gallery: [...prev.gallery, newPhoto],
                    }));
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#A04F34] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#873E27] transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Foto</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.gallery.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] flex items-center gap-4"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-[#EAE5DD]">
                      <img
                        src={photo.url}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={photo.url}
                        placeholder="https://..."
                        onChange={(e) => {
                          const updated = [...data.gallery];
                          updated[index].url = e.target.value;
                          updateData((prev) => ({ ...prev, gallery: updated }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                      />
                      <input
                        type="text"
                        value={photo.caption || ""}
                        placeholder="Keterangan foto (opsional)..."
                        onChange={(e) => {
                          const updated = [...data.gallery];
                          updated[index].caption = e.target.value;
                          updateData((prev) => ({ ...prev, gallery: updated }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#EAE5DD] bg-white text-xs text-[#6B655E] focus:outline-none focus:border-[#A04F34]"
                      />
                    </div>
                    {data.gallery.length > 2 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.gallery.filter((_, i) => i !== index);
                          updateData((prev) => ({ ...prev, gallery: updated }));
                        }}
                        className="w-9 h-9 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                        title="Hapus foto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: REKENING & KADO */}
          {activeTab === "amplop" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DD] shadow-xs space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
                  Amplop Digital &amp; Kado Fisik
                </h2>
                <p className="text-xs text-[#6B655E] mt-1">
                  Tamu mentransfer langsung ke rekening bank Anda atau QRIS. Dana 100% masuk tanpa potongan platform.
                </p>
              </div>

              {/* Bank Accounts */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#EAE5DD]">
                  <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                    Rekening Bank Penerima
                  </h3>
                </div>

                {data.bankAccounts.map((bank, index) => (
                  <div
                    key={bank.id}
                    className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3"
                  >
                    <span className="text-[11px] font-bold text-[#A04F34] uppercase tracking-wider block">
                      Rekening #{index + 1}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                          Nama Bank (BCA, Mandiri, BRI, dll)
                        </label>
                        <input
                          type="text"
                          value={bank.bankName}
                          onChange={(e) => {
                            const updated = [...data.bankAccounts];
                            updated[index].bankName = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              bankAccounts: updated,
                            }));
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                          Nomor Rekening
                        </label>
                        <input
                          type="text"
                          value={bank.accountNumber}
                          onChange={(e) => {
                            const updated = [...data.bankAccounts];
                            updated[index].accountNumber = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              bankAccounts: updated,
                            }));
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] font-mono focus:outline-none focus:border-[#A04F34]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                          Atas Nama (Pemilik)
                        </label>
                        <input
                          type="text"
                          value={bank.accountHolder}
                          onChange={(e) => {
                            const updated = [...data.bankAccounts];
                            updated[index].accountHolder = e.target.value;
                            updateData((prev) => ({
                              ...prev,
                              bankAccounts: updated,
                            }));
                          }}
                          className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* QRIS Code URL */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                  Gambar QRIS Statis
                </h3>
                <input
                  type="text"
                  value={data.qrisImageUrl}
                  placeholder="URL gambar kode QRIS..."
                  onChange={(e) =>
                    updateData((prev) => ({
                      ...prev,
                      qrisImageUrl: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                />
              </div>

              {/* Physical Gift Info */}
              <div className="space-y-3 pt-4 border-t border-[#EAE5DD]">
                <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                  Alamat Kirim Kado Fisik
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Nama Penerima
                    </label>
                    <input
                      type="text"
                      value={data.physicalGift.receiverName}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          physicalGift: {
                            ...prev.physicalGift,
                            receiverName: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Nomor Telepon
                    </label>
                    <input
                      type="text"
                      value={data.physicalGift.phoneNumber}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          physicalGift: {
                            ...prev.physicalGift,
                            phoneNumber: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Alamat Lengkap Pengiriman
                  </label>
                  <textarea
                    rows={2}
                    value={data.physicalGift.address}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        physicalGift: {
                          ...prev.physicalGift,
                          address: e.target.value,
                        },
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MUSIK & DOA */}
          {activeTab === "musik" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE5DD] shadow-xs space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-serif-display text-xl font-bold text-[#1F1D1B]">
                  Lagu Latar &amp; Doa Pembuka
                </h2>
                <p className="text-xs text-[#6B655E] mt-1">
                  Atur ayat suci Al-Quran / kutipan cinta dan instrumen musik latar belakang.
                </p>
              </div>

              {/* Music Setting */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD] space-y-3">
                <span className="text-xs font-bold text-[#A04F34] uppercase tracking-wider block">
                  Musik Latar (Audio MP3)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      Judul Lagu
                    </label>
                    <input
                      type="text"
                      value={data.musicTitle}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          musicTitle: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                      URL Berkas Audio MP3
                    </label>
                    <input
                      type="text"
                      value={data.musicUrl}
                      onChange={(e) =>
                        updateData((prev) => ({
                          ...prev,
                          musicUrl: e.target.value,
                        }))
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-white text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                    />
                  </div>
                </div>
              </div>

              {/* Quote Setting */}
              <div className="space-y-3">
                <h3 className="font-serif-display text-base font-bold text-[#1F1D1B]">
                  Kutipan Ayat Suci
                </h3>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Teks Arab
                  </label>
                  <input
                    type="text"
                    value={data.quoteArabic}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        quoteArabic: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] text-right focus:outline-none focus:border-[#A04F34]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Terjemahan
                  </label>
                  <textarea
                    rows={2}
                    value={data.quoteTranslation}
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        quoteTranslation: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34] resize-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-[#6B655E] block mb-1">
                    Sumber Ayat
                  </label>
                  <input
                    type="text"
                    value={data.quoteSource}
                    placeholder="QS. Adz-Dzariyat: 49"
                    onChange={(e) =>
                      updateData((prev) => ({
                        ...prev,
                        quoteSource: e.target.value,
                      }))
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: STICKY REAL-TIME PHONE PREVIEW (5 COLS)     */}
        {/* ========================================================= */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-[#EAE5DD] shadow-md">
            {/* Simulator Header Controls */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAE5DD]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#A04F34]" />
                <span className="text-xs font-bold text-[#1F1D1B]">
                  Live Simulator
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#8A837A]">
                <Eye className="w-3.5 h-3.5 text-[#3A5743]" />
                <span>Pratinjau Langsung</span>
              </div>
            </div>

            {/* Theme Switcher Quick Toggle */}
            <div className="mb-3">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#8A837A] block mb-1">
                Pilih Tema Undangan:
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAF8F5] border border-[#EAE5DD] rounded-xl">
                <button
                  type="button"
                  onClick={() =>
                    updateData((prev) => ({ ...prev, activeTheme: "snap-photo" }))
                  }
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                    (data.activeTheme || "snap-photo") === "snap-photo"
                      ? "bg-[#18181B] text-white shadow-xs"
                      : "text-[#6B655E] hover:text-[#1F1D1B]"
                  }`}
                >
                  Snap Photo (Dark)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateData((prev) => ({
                      ...prev,
                      activeTheme: "motion-art-jawa",
                    }))
                  }
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-center ${
                    data.activeTheme === "motion-art-jawa"
                      ? "bg-[#C59B3C] text-black shadow-xs font-bold"
                      : "text-[#6B655E] hover:text-[#1F1D1B]"
                  }`}
                >
                  Motion Art Jawa
                </button>
              </div>
            </div>

            {/* Test Guest Name Quick Switcher */}
            <div className="mb-3">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#8A837A] block mb-1">
                Uji Sapaan Tamu di Cover:
              </label>
              <input
                type="text"
                value={testGuestName}
                onChange={(e) => setTestGuestName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-[#EAE5DD] bg-[#FAF8F5] text-xs text-[#1F1D1B] focus:outline-none focus:border-[#A04F34]"
              />
            </div>

            {/* Simulated Phone Frame Container */}
            <div className="relative mx-auto w-full max-w-[340px] h-[580px] rounded-[36px] bg-[#0E0E10] border-4 border-[#222] shadow-2xl overflow-hidden flex flex-col group">
              {/* Dynamic Island / Bezel notch */}
              <div className="w-20 h-3.5 bg-black rounded-full mx-auto mt-2 shrink-0 z-30 pointer-events-none" />

              {/* The Live Invitation View inside the phone with Drag-to-Scroll */}
              <div
                ref={phoneScrollRef}
                onMouseDown={handlePhoneMouseDown}
                onMouseMove={handlePhoneMouseMove}
                onMouseUp={handlePhoneMouseUp}
                onMouseLeave={handlePhoneMouseUp}
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700/60 hover:scrollbar-thumb-[#C59B3C]/80 cursor-grab active:cursor-grabbing select-none"
              >
                {data.activeTheme === "motion-art-jawa" ? (
                  <MotionArtJawaView
                    data={data}
                    guestName={testGuestName}
                    isEmbedded={true}
                  />
                ) : (
                  <SnapPhotoView
                    data={data}
                    guestName={testGuestName}
                    isEmbedded={true}
                  />
                )}
              </div>

              {/* Pinned Bottom Navigation Dock Inside Phone Frame */}
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-40 w-[94%] pointer-events-auto">
                <nav
                  aria-label="Navigasi Undangan Preview"
                  className="w-full bg-[#161619]/95 backdrop-blur-xl border border-[#C59B3C]/35 rounded-full px-1.5 py-1.5 shadow-2xl shadow-black/90 flex items-center justify-between"
                >
                  {[
                    { id: "hero", label: "Sampul", icon: Home },
                    { id: "mempelai", label: "Mempelai", icon: Users },
                    { id: "acara", label: "Acara", icon: Calendar },
                    { id: "cerita", label: "Cerita", icon: BookOpen },
                    { id: "galeri", label: "Galeri", icon: ImageIcon },
                    { id: "kado", label: "Kado", icon: Gift },
                    { id: "ucapan", label: "Ucapan", icon: MessageSquare },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isActive = activePhoneSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => jumpToPhoneSection(item.id)}
                        className={`flex flex-col items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-tr from-[#C59B3C] to-[#E5C16C] text-black shadow-md shadow-[#C59B3C]/40 font-bold scale-105"
                            : "text-[#A7A29A] hover:text-white hover:bg-white/10"
                        }`}
                        title={item.label}
                        aria-label={item.label}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[7px] font-semibold leading-none mt-0.5 tracking-tight">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="text-center mt-3">
              <Link
                href={
                  data.activeTheme === "motion-art-jawa"
                    ? "/demo/motion-art-jawa"
                    : "/demo/snap-photo"
                }
                target="_blank"
                className="text-[11px] text-[#A04F34] font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>
                  Buka{" "}
                  {data.activeTheme === "motion-art-jawa"
                    ? "Motion Art Jawa"
                    : "Snap Photo"}{" "}
                  di layar penuh
                </span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    )}
  </main>
</div>
</div>
  );
}
