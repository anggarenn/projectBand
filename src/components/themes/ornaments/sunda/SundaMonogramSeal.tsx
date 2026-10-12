import React from "react";

export function SundaMonogramSeal({
  initials = "A & L",
  subtitle,
  className = "",
}: {
  initials?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Cyan-Gold Ethereal Backglow */}
      <div className="absolute inset-0 bg-[#D4AF37]/25 blur-2xl rounded-full scale-125 animate-pulse" />

      {/* Double Gold Ring Medallion with Megamendung Accent */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D4AF37] p-1.5 bg-gradient-to-br from-[#16213E] via-[#0F172A] to-[#0A1128] shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center">
        <div className="w-full h-full rounded-full border border-[#D4AF37]/50 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2),transparent_70%)]" />

          {subtitle && (
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block relative z-10">
              {subtitle}
            </span>
          )}

          <span className="font-serif-display text-xl sm:text-2xl font-bold text-[#FFF2D6] tracking-wide my-1 relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {initials}
          </span>

          <span className="text-[7.5px] uppercase text-[#8ECAE6] tracking-[0.2em] relative z-10 font-medium">
            {subtitle || "WALIMATUL 'URS"}
          </span>
        </div>
      </div>
    </div>
  );
}
