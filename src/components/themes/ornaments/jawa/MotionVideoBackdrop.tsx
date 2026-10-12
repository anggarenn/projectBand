"use client";

import React, { useEffect, useRef } from "react";

export interface MotionVideoBackdropProps {
  src?: string;
  stageFallback?: string;
  filterClass?: string;
  overlayGradient?: string;
  className?: string;
}

export function MotionVideoBackdrop({
  src,
  stageFallback = "/assets/motion-art-jawa/bg-stage-joglo.webp",
  filterClass = "brightness-[0.82] contrast-[1.18] sepia-[0.22] hue-rotate-[-10deg]",
  overlayGradient,
  className = "",
}: MotionVideoBackdropProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className} z-0`}>
      {src ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={stageFallback}
          className={`absolute inset-0 w-full h-full object-cover object-bottom filter ${filterClass}`}
          src={src}
        />
      ) : (
        stageFallback && (
          <img
            src={stageFallback}
            alt="Panggung Ornamen Pemandangan"
            className={`absolute inset-0 w-full h-full object-cover object-bottom filter ${filterClass} animate-kenburns-subtle`}
          />
        )
      )}

      {/* Atmospheric Theme Gradient Overlay */}
      {overlayGradient ? (
        <div className={`absolute inset-0 pointer-events-none ${overlayGradient}`} />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(197,155,60,0.12)_0%,transparent_75%)] pointer-events-none" />
        </>
      )}
    </div>
  );
}
