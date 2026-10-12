import React from "react";

export interface TraditionalGoldCornerProps {
  className?: string;
  src?: string;
  alt?: string;
}

export function TraditionalGoldCorner({
  className = "w-16 h-16",
  src,
  alt = "Ornamen Sudut Emas Tradisional",
}: TraditionalGoldCornerProps) {
  return (
    <img
      src={src || "/assets/motion-art-jawa/ornamen-corner-gold.png"}
      alt={alt}
      className={`pointer-events-none opacity-85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${className}`}
      loading="lazy"
    />
  );
}
