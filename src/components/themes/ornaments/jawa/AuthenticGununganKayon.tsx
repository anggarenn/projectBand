import React from "react";

export interface AuthenticGununganKayonProps {
  className?: string;
  src?: string;
  alt?: string;
}

export function AuthenticGununganKayon({
  className = "w-20 h-auto",
  src,
  alt = "Gunungan Wayang Kulit Jawa",
}: AuthenticGununganKayonProps) {
  return (
    <img
      src={src || "/assets/motion-art-jawa/gunungan-wayang-gold.png"}
      alt={alt}
      className={`object-contain pointer-events-none drop-shadow-[0_4px_16px_rgba(229,193,108,0.45)] ${className}`}
      loading="lazy"
    />
  );
}

export const GununganIcon = AuthenticGununganKayon;
