import React from "react";

interface SundaVintageDividerProps {
  className?: string;
}

/**
 * SundaVintageDivider
 * Ornamen pembatas vintage etsa khas Folkinvitation Parahyangan.
 * Menggantikan MegamendungDivider pada preset `sunda-vintage`.
 * Menampilkan ornamen etsa vintage warm mahogany & amber yang anggun
 * untuk memisahkan judul section, monogram, dan detail acara.
 */
export function SundaVintageDivider({ className = "w-36 sm:w-44 h-auto" }: SundaVintageDividerProps) {
  return (
    <div className={`relative flex items-center justify-center mx-auto my-2.5 select-none pointer-events-none ${className}`}>
      {/* Garis Aksen Tipis Kiri */}
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#8B4E17]/30 to-[#5C3410]/50 max-w-[40px] hidden sm:block" />

      {/* Ornamen Etsa Utama */}
      <img
        src="/assets/motion-art-sunda/ornamen-vintage-divider.webp"
        alt="Ornamen Vintage Divider"
        className="h-7 sm:h-8 w-auto object-contain mx-2 drop-shadow-[0_1px_2px_rgba(92,52,16,0.12)]"
        loading="lazy"
      />

      {/* Garis Aksen Tipis Kanan */}
      <span className="flex-1 h-px bg-gradient-to-l from-transparent via-[#8B4E17]/30 to-[#5C3410]/50 max-w-[40px] hidden sm:block" />
    </div>
  );
}
