import React from "react";

export interface TraditionalGoldHeaderProps {
  className?: string;
  src?: string;
  alt?: string;
}

export function TraditionalGoldHeader({
  className = "w-48 h-auto",
  src,
  alt = "Ornamen Ukiran Emas Tradisional",
}: TraditionalGoldHeaderProps) {
  return (
    <img
      src={src || "/assets/motion-art-jawa/vintage-header-gold.png"}
      alt={alt}
      className={`pointer-events-none opacity-90 drop-shadow-[0_2px_10px_rgba(197,155,60,0.3)] mx-auto ${className}`}
      loading="lazy"
    />
  );
}
