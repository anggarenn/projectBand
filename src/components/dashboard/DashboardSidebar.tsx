"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  LayoutDashboard,
  Users,
  Send,
  SlidersHorizontal,
  QrCode,
  Sparkles,
  Activity,
  ExternalLink,
  RotateCcw,
  X,
  ChevronRight,
  Tv,
  CheckCircle2,
} from "lucide-react";

export type DashboardViewType =
  | "overview"
  | "editor"
  | "guests"
  | "rsvp"
  | "broadcast"
  | "reception"
  | "bento";

interface DashboardSidebarProps {
  currentView: DashboardViewType;
  onSelectView: (view: DashboardViewType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onResetData: () => void;
}

export default function DashboardSidebar({
  currentView,
  onSelectView,
  isOpenMobile,
  onCloseMobile,
  onResetData,
}: DashboardSidebarProps) {
  const menuGroups = [
    {
      group: "Kustomisasi Undangan",
      items: [
        {
          id: "editor" as DashboardViewType,
          label: "Kostum Undangan",
          icon: SlidersHorizontal,
          badge: "Editor",
          badgeColor: "bg-[#FAF2EB] text-[#A04F34]",
        },
      ],
    },
    {
      group: "Pusat Kendali",
      items: [
        {
          id: "overview" as DashboardViewType,
          label: "Ringkasan Acara",
          icon: LayoutDashboard,
          badge: "Utama",
          badgeColor: "bg-[#FAF8F5] text-[#6B655E]",
        },
        {
          id: "bento" as DashboardViewType,
          label: "Live Monitor Acara",
          icon: Activity,
          badge: "Hari-H",
          badgeColor: "bg-[#EDF3EE] text-[#15803D]",
        },
      ],
    },
    {
      group: "Manajemen Tamu",
      items: [
        {
          id: "guests" as DashboardViewType,
          label: "Daftar Tamu",
          icon: Users,
          badge: "450 Tamu",
          badgeColor: "bg-[#FAF2EB] text-[#A04F34]",
        },
        {
          id: "broadcast" as DashboardViewType,
          label: "Kirim Undangan (WA)",
          icon: Send,
          badge: "Broadcast",
          badgeColor: "bg-green-50 text-green-700",
        },
        {
          id: "rsvp" as DashboardViewType,
          label: "Konfirmasi RSVP",
          icon: CheckCircle2,
          badge: "384 Hadir",
          badgeColor: "bg-[#EDF3EE] text-[#15803D]",
        },
      ],
    },
    {
      group: "Hari-H Resepsi",
      items: [
        {
          id: "reception" as DashboardViewType,
          label: "Check-in QR & TV",
          icon: QrCode,
          badge: "Meja Tamu",
          badgeColor: "bg-purple-50 text-purple-700",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-[#EAE5DD] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Navigasi Samping Dashboard"
      >
        {/* Upper Portion */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#EAE5DD]">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="Kembali ke Beranda"
            >
              <div className="w-9 h-9 rounded-xl bg-[#A04F34] text-white flex items-center justify-center shadow-xs">
                <Heart className="w-4 h-4 fill-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-lg font-bold tracking-tight text-[#1F1D1B]">
                  Mengundang
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#8A837A] font-medium">
                  Event OS
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-[#6B655E] hover:text-[#1F1D1B] hover:bg-[#FAF8F5] lg:hidden"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Couple Pill Badge */}
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DD] flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-[#1F1D1B] truncate block">
                Sarah & Faizal
              </span>
              <span className="text-[10px] text-[#8A837A] truncate block">
                31 Des 2025 • Sasana Kriya TMII
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EDF3EE] text-[#3A5743]">
              Aktif
            </span>
          </div>

          {/* Menu Groups */}
          <nav className="space-y-5" aria-label="Menu Utama Dashboard">
            {menuGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8A837A] px-2.5">
                  {group.group}
                </span>

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onSelectView(item.id);
                          onCloseMobile();
                        }}
                        className={`w-full min-h-[44px] px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#A04F34] text-white shadow-xs font-bold"
                            : "text-[#6B655E] hover:text-[#1F1D1B] hover:bg-[#FAF8F5]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-[#8A837A]"
                            }`}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                              isActive
                                ? "bg-white/20 text-white"
                                : item.badgeColor
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Lower Portion: Quick Links & Reset */}
        <div className="p-4 border-t border-[#EAE5DD] space-y-2 bg-[#FAF8F5]/60">
          <Link
            href="/demo/motion-art-jawa"
            target="_blank"
            className="w-full min-h-[40px] px-3 rounded-xl bg-white border border-[#EAE5DD] hover:border-[#A04F34] text-xs font-semibold text-[#1F1D1B] flex items-center justify-center gap-2 transition-colors shadow-2xs"
          >
            <span>Preview Undangan Tamu</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#6B655E]" />
          </Link>

          <button
            type="button"
            onClick={onResetData}
            className="w-full min-h-[36px] px-3 rounded-xl text-[11px] font-medium text-[#8A837A] hover:text-red-700 hover:bg-red-50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Data Bawaan</span>
          </button>
        </div>
      </aside>
    </>
  );
}
