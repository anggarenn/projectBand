"use client";

import React from "react";
import { TraditionalGoldCorner } from "./TraditionalGoldCorner";

interface SectionOrnamentBackdropProps {
  watermark?: "gunungan" | "wayang" | "kayon" | "mandala" | "none";
  showCorners?: boolean;
  cornerPosition?: "top" | "all";
  cornerOpacity?: string;
  watermarkOpacity?: string;
}

export function SectionOrnamentBackdrop({
  watermark = "gunungan",
  showCorners = true,
  cornerPosition = "top",
  cornerOpacity = "opacity-35",
  watermarkOpacity = "opacity-[0.14]",
}: SectionOrnamentBackdropProps) {
  const isWayangBanner = watermark === "wayang";
  const watermarkSrc =
    watermark === "wayang"
      ? "/assets/motion-art-jawa/wayang-mandala-banner.jpg"
      : watermark === "mandala"
      ? "/assets/motion-art-jawa/mandala-gold.jpg"
      : watermark === "kayon"
      ? "/assets/motion-art-jawa/gunungan-kayon-joglo.png"
      : "/assets/motion-art-jawa/gunungan-wayang-gold.png";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Radial ambient glow in center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,155,60,0.06)_0%,transparent_70%)]" />

      {/* Watermark silhouette ornament in background with gentle floating breathing */}
      {watermark !== "none" && (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-slow ${
          isWayangBanner ? "w-full max-w-[480px] h-[120%] opacity-25 mix-blend-screen" : "w-[340px] sm:w-[420px] max-w-none flex items-center justify-center pointer-events-none"
        }`}>
          <img
            src={watermarkSrc}
            alt=""
            aria-hidden="true"
            className={
              isWayangBanner
                ? "w-full h-full object-cover object-center filter brightness-[1.2] contrast-[1.1]"
                : `w-full h-auto object-contain filter brightness-[1.1] sepia-[0.35] ${watermarkOpacity}`
            }
          />
        </div>
      )}

      {/* Corner Ornaments */}
      {showCorners && (
        <>
          <TraditionalGoldCorner
            className={`absolute top-2 left-2 w-12 h-12 z-0 ${cornerOpacity}`}
          />
          <TraditionalGoldCorner
            className={`absolute top-2 right-2 w-12 h-12 -scale-x-100 z-0 ${cornerOpacity}`}
          />
          {cornerPosition === "all" && (
            <>
              <TraditionalGoldCorner
                className={`absolute bottom-2 left-2 w-12 h-12 -scale-y-100 z-0 ${cornerOpacity}`}
              />
              <TraditionalGoldCorner
                className={`absolute bottom-2 right-2 w-12 h-12 -scale-x-100 -scale-y-100 z-0 ${cornerOpacity}`}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
