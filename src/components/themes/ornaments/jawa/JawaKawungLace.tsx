"use client";

import React from "react";

export interface JawaKawungLaceProps {
  className?: string;
  src?: string;
  alt?: string;
}

/**
 * JawaKawungLace
 * Ornamen renda ceiling / border motif Batik Kawung Keraton Jawa.
 * Mendukung pluggable asset dengan fallback aman jika file belum tersedia.
 */
export function JawaKawungLace({
  className = "",
  src = "/assets/motion-art-jawa/jawa-kawung-lace.webp",
  alt = "Renda Batik Kawung Keraton Jawa",
}: JawaKawungLaceProps) {
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] ${className}`}
      aria-hidden="true"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto max-h-16 object-cover object-top opacity-90 filter brightness-[0.95]"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.includes("border-wayang-kawung.png")) {
            target.src = "/assets/motion-art-jawa/border-wayang-kawung.png";
          }
        }}
      />
    </div>
  );
}
