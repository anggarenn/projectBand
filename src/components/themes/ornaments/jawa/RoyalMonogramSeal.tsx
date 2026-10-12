import React from "react";

export function RoyalMonogramSeal({
  initials = "R & C",
  subtitle,
  className = "",
}: {
  initials?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Blencong Candle Warm Backglow */}
      <div className="absolute inset-0 bg-[#C59B3C]/25 blur-2xl rounded-full scale-125 animate-blencong" />

      {/* Double Gold Ring Medallion */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#C59B3C] p-1.5 bg-gradient-to-br from-[#241E1A] via-[#1A1613] to-[#12100E] shadow-[0_0_30px_rgba(197,155,60,0.35)] flex items-center justify-center">
        <div className="w-full h-full rounded-full border border-[#C59B3C]/45 flex flex-col items-center justify-center text-center p-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,60,0.15),transparent_70%)]" />
          {subtitle && (
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-[#C59B3C] font-semibold block relative z-10">
              {subtitle}
            </span>
          )}
          <span className="font-serif-display text-xl sm:text-2xl font-bold text-[#E5C16C] tracking-wide my-1 relative z-10">
            {initials}
          </span>
          {subtitle ? (
            <span className="text-[7.5px] uppercase text-[#A7A29A] tracking-[0.2em] relative z-10">
              {subtitle}
            </span>
          ) : (
            <span className="text-[7.5px] uppercase text-[#A7A29A] tracking-[0.2em] relative z-10">
              EST. 2025
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
