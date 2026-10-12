"use client";

import React from "react";
import {
  Home,
  Users,
  Calendar,
  Shirt,
  ImageIcon,
  Gift,
  MessageSquare,
} from "lucide-react";
import { ThemeConfig } from "@/types/theme";

interface BottomNavProps {
  theme: ThemeConfig;
  isOpen: boolean;
  isEmbedded?: boolean;
  className?: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  hasDressCode?: boolean;
  hasGallery?: boolean;
  hasGifts?: boolean;
}

export function BottomNav({
  theme,
  isOpen,
  isEmbedded = false,
  className,
  activeSection,
  onNavigate,
  hasDressCode = true,
  hasGallery = true,
  hasGifts = true,
}: BottomNavProps) {
  if (!isOpen || (!className && isEmbedded)) return null;

  const navItems = [
    { id: "hero", label: "Sampul", icon: Home },
    { id: "mempelai", label: "Mempelai", icon: Users },
    { id: "acara", label: "Acara", icon: Calendar },
    ...(hasDressCode ? [{ id: "dresscode", label: "Busana", icon: Shirt }] : []),
    ...(hasGallery ? [{ id: "galeri", label: "Galeri", icon: ImageIcon }] : []),
    ...(hasGifts ? [{ id: "kado", label: "Kado", icon: Gift }] : []),
    { id: "ucapan", label: "Ucapan", icon: MessageSquare },
  ];

  return (
    <div
      className={
        className ||
        "fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[420px] transition-all"
      }
    >
      <nav
        aria-label="Navigasi Undangan"
        className="w-full backdrop-blur-xl border rounded-full px-2 py-1.5 shadow-2xl flex items-center justify-between"
        style={{
          backgroundColor: theme.id === "terracotta-earthy-meadow" ? "rgba(255, 253, 251, 0.92)" : "var(--theme-bg-card)",
          borderColor: "var(--theme-border)",
          boxShadow: theme.id === "terracotta-earthy-meadow" ? "0 8px 30px rgba(45, 35, 30, 0.12)" : undefined,
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isTerracotta = theme.id === "terracotta-earthy-meadow";
          const isEmeraldNoir = theme.id === "emerald-velvet-noir";
          const isBrown = theme.id === "jawa-brown" || theme.id === "sunda-vintage";
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all cursor-pointer ${
                isActive
                  ? isTerracotta
                    ? "text-[#FFFDFB] font-semibold shadow-md scale-105 btn-tactile-clay border border-[#D98A76]/50"
                    : isBrown
                    ? "text-white shadow-md scale-105 border border-white/40"
                    : isEmeraldNoir
                    ? "text-[#061A14] font-semibold shadow-md scale-105"
                    : "text-black shadow-md scale-105"
                  : isTerracotta
                  ? "text-[#857468] hover:text-[#BF573F] hover:bg-[#BF573F]/10"
                  : isEmeraldNoir
                  ? "text-[#8BA398] hover:text-[#FFFDF0] hover:bg-[#D4AF37]/10"
                  : isBrown
                  ? "text-[#7A6B62] hover:text-[#5C3410] hover:bg-[#5C3410]/10"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
              style={
                isActive
                  ? {
                      background: `linear-gradient(to top right, ${theme.colors.primary}, ${theme.colors.accent})`,
                      boxShadow: `0 4px 12px ${theme.colors.glow}`,
                    }
                  : {}
              }
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-[7.5px] font-semibold leading-none mt-0.5 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
