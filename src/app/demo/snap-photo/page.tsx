"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useInvitationData } from "@/lib/invitationStore";
import SnapPhotoView from "@/components/snap-photo/SnapPhotoView";
import { Sparkles, QrCode } from "lucide-react";

function SnapPhotoPageContent() {
  const searchParams = useSearchParams();
  const guest = searchParams.get("to") || "Tamu Undangan";
  const { data, addWish } = useInvitationData();

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-white flex flex-col md:flex-row justify-center relative overflow-hidden">
      {/* ----------------------------------------------------------- */}
      {/* DESKTOP LEFT AMBIENT PANEL (Identik dengan Wevitation)      */}
      {/* ----------------------------------------------------------- */}
      <aside className="hidden md:flex md:w-1/2 lg:w-7/12 fixed top-0 left-0 bottom-0 flex-col justify-between p-12 lg:p-16 z-10 border-r border-white/5">
        {/* Background Atmosphere */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 scale-105"
          style={{ backgroundImage: `url(${data.coverPhoto})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/80 to-[#0A0A0C]" />

        {/* Ambient Top Brand */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#C59B3C] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Wedding Invitation</span>
          </div>
        </div>

        {/* Ambient Center Title */}
        <div className="relative z-10 max-w-lg space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C59B3C] font-semibold block">
            {data.coverSubtitle}
          </span>
          <h1 className="font-serif-display text-5xl lg:text-7xl font-bold text-white tracking-wide leading-tight">
            {data.coverTitle}
          </h1>
          <p className="text-sm text-[#A7A29A] leading-relaxed max-w-md pt-2">
            Selamat datang di undangan pernikahan resmi kami. Silakan jelajahi informasi acara, konfirmasi kehadiran RSVP, dan sampaikan doa restu Anda.
          </p>
        </div>

        {/* Ambient Bottom Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#8A837A] border-t border-white/10 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C59B3C]">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white block font-medium">Buka di Smartphone</span>
              <span className="text-[10px] text-[#8A837A]">Scan atau buka via peramban mobile</span>
            </div>
          </div>
          <span>&copy; {new Date().getFullYear()} Mengundang</span>
        </div>
      </aside>

      {/* ----------------------------------------------------------- */}
      {/* RIGHT VIEWPORT CONTAINER (The Interactive Phone Invitation) */}
      {/* ----------------------------------------------------------- */}
      <div className="w-full md:w-1/2 lg:w-5/12 md:ml-auto relative z-20 min-h-screen">
        <SnapPhotoView data={data} guestName={guest} onAddWish={addWish} />
      </div>
    </div>
  );
}

export default function SnapPhotoDemoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center text-[#C59B3C] text-sm">
          Memuat undangan...
        </div>
      }
    >
      <SnapPhotoPageContent />
    </Suspense>
  );
}
