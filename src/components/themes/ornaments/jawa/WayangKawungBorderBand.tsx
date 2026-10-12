import React from "react";

export interface WayangKawungBorderBandProps {
  className?: string;
  src?: string;
  alt?: string;
}

export function WayangKawungBorderBand({
  className = "w-full h-auto",
  src,
  alt = "Ornamen Wayang Batik Kawung",
}: WayangKawungBorderBandProps) {
  return (
    <img
      src={src || "/assets/motion-art-jawa/border-wayang-kawung.png"}
      alt={alt}
      className={`pointer-events-none opacity-75 object-cover ${className}`}
      loading="lazy"
    />
  );
}
