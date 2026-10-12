"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { ThemeConfig } from "@/types/theme";

interface FloatingAudioProps {
  theme: ThemeConfig;
  isOpen: boolean;
  isPlaying: boolean;
  isEmbedded?: boolean;
  className?: string;
  onToggle: () => void;
}

export function FloatingAudio({
  theme,
  isOpen,
  isPlaying,
  isEmbedded = false,
  className,
  onToggle,
}: FloatingAudioProps) {
  if (!isOpen) return null;

  return (
    <button
      onClick={onToggle}
      className={
        className ||
        `${
          isEmbedded ? "sticky top-4 z-40 ml-auto mr-4" : "fixed top-4 right-4 z-40"
        } w-11 h-11 rounded-full border flex items-center justify-center shadow-xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 transition-all`
      }
      style={{
        backgroundColor: "var(--theme-bg-card)",
        borderColor: "var(--theme-border)",
        color: "var(--theme-primary)",
      }}
      aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
    >
      {isPlaying ? (
        <div className="relative flex items-center justify-center gap-1">
          {/* Interactive Mini 4-bar Equalizer */}
          <div className="flex items-end gap-0.5 h-3.5 pointer-events-none" aria-hidden="true">
            <span
              className="w-0.5 rounded-full animate-pulse"
              style={{
                height: "60%",
                backgroundColor: "var(--theme-primary)",
                animationDuration: "0.7s",
              }}
            />
            <span
              className="w-0.5 rounded-full animate-pulse"
              style={{
                height: "100%",
                backgroundColor: "var(--theme-accent)",
                animationDuration: "1.1s",
                animationDelay: "0.2s",
              }}
            />
            <span
              className="w-0.5 rounded-full animate-pulse"
              style={{
                height: "75%",
                backgroundColor: "var(--theme-primary)",
                animationDuration: "0.85s",
                animationDelay: "0.4s",
              }}
            />
            <span
              className="w-0.5 rounded-full animate-pulse"
              style={{
                height: "90%",
                backgroundColor: "var(--theme-accent)",
                animationDuration: "1.0s",
                animationDelay: "0.15s",
              }}
            />
          </div>
          <Volume2 className="w-4 h-4 shrink-0" style={{ color: "var(--theme-accent)" }} />
        </div>
      ) : (
        <VolumeX className="w-5 h-5" style={{ color: "var(--theme-text-muted)" }} />
      )}
    </button>
  );
}
