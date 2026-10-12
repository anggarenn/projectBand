import React from "react";

interface MegamendungCloudProps {
  className?: string;
  variant?:
    | "primary"
    | "subtle"
    | "glow"
    | "grand"
    | "mid-center"
    | "mid-left"
    | "mid-right"
    | "bottom-right"
    | "bottom-left"
    | "curtain-left"
    | "curtain-right";
  flip?: boolean;
  authentic?: boolean;
}

const AUTHENTIC_MAP: Record<string, string> = {
  grand: "/assets/motion-art-sunda/extracted/cloud-grand-top-clean.png",
  primary: "/assets/motion-art-sunda/extracted/cloud-grand-top-clean.png",
  glow: "/assets/motion-art-sunda/extracted/cloud-grand-top-clean.png",
  subtle: "/assets/motion-art-sunda/extracted/cloud-mid-center-clean.png",
  "mid-center": "/assets/motion-art-sunda/extracted/cloud-mid-center-clean.png",
  "mid-left": "/assets/motion-art-sunda/extracted/cloud-mid-left-clean.png",
  "mid-right": "/assets/motion-art-sunda/extracted/cloud-mid-right-clean.png",
  "bottom-right": "/assets/motion-art-sunda/extracted/cloud-bottom-right-clean.png",
  "bottom-left": "/assets/motion-art-sunda/extracted/cloud-bottom-left-clean.png",
  "curtain-left": "/assets/motion-art-sunda/curtain-cloud-left.webp",
  "curtain-right": "/assets/motion-art-sunda/curtain-cloud-right.webp",
};

export function AuthenticMegamendungCloud({
  className = "w-48 h-auto",
  variant = "grand",
  flip = false,
}: {
  className?: string;
  variant?:
    | "grand"
    | "mid-center"
    | "mid-left"
    | "mid-right"
    | "bottom-right"
    | "bottom-left"
    | "primary"
    | "subtle"
    | "glow"
    | "curtain-left"
    | "curtain-right";
  flip?: boolean;
}) {
  return (
    <img
      src={AUTHENTIC_MAP[variant] || AUTHENTIC_MAP.grand}
      alt="Megamendung Cloud"
      className={`pointer-events-none select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] ${
        flip ? "-scale-x-100" : ""
      } ${className}`}
    />
  );
}

/**
 * Vektor Awan Megamendung autentik khas Cirebon / Pasundan (Jawa Barat).
 * Menampilkan kontur berlapis konsentris dengan ujung meruncing tajam bergradasi emas keraton.
 */
export function MegamendungCloud({
  className = "w-32 h-auto",
  variant = "primary",
  flip = false,
  authentic = false,
}: MegamendungCloudProps) {
  if (authentic) {
    return <AuthenticMegamendungCloud className={className} variant={variant} flip={flip} />;
  }

  const transform = flip ? "scaleX(-1)" : undefined;

  return (
    <svg
      viewBox="0 0 240 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none transition-all duration-300 ${className}`}
      style={{ transform, transformOrigin: "center" }}
      aria-hidden="true"
    >
      <defs>
        {/* Gradien Emas Megamendung Berlapis */}
        <linearGradient id="megaGoldOuter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C59B3C" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E5C16C" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#9E782F" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id="megaGoldMid" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#F3E5AB" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#B38728" stopOpacity="0.7" />
        </linearGradient>

        <linearGradient id="megaGoldInner" x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E5C16C" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#C59B3C" stopOpacity="0.8" />
        </linearGradient>

        <filter id="megaGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Glow aura (optional) */}
      {variant === "glow" && (
        <path
          d="M15 65 C25 35, 55 20, 85 30 C105 15, 140 12, 170 28 C195 20, 225 35, 230 60 C235 85, 205 100, 175 95 C145 102, 110 100, 80 90 C50 98, 20 90, 15 65 Z"
          fill="#D4AF37"
          opacity="0.18"
          filter="url(#megaGlow)"
        />
      )}

      {/* Layer 1 (Terluar / Base Cloud Contour) */}
      <path
        d="M 12 68 
           C 16 42, 42 22, 74 30 
           C 92 14, 126 10, 156 22 
           C 182 14, 214 26, 226 50 
           C 238 74, 216 96, 184 94 
           C 156 104, 118 102, 88 92 
           C 58 100, 26 94, 16 78 
           C 12 74, 11 71, 12 68 Z"
        fill={variant === "subtle" ? "rgba(197, 155, 60, 0.15)" : "rgba(20, 18, 15, 0.65)"}
        stroke="url(#megaGoldOuter)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Layer 2 (Lobe Menengah Berombak Khas Megamendung) */}
      <path
        d="M 28 66 
           C 32 46, 54 32, 80 38 
           C 98 26, 126 24, 150 34 
           C 172 26, 198 36, 208 54 
           C 218 72, 198 88, 172 84 
           C 148 92, 118 90, 94 82 
           C 70 88, 42 82, 32 72 Z"
        fill="none"
        stroke="url(#megaGoldMid)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Layer 3 (Lobe Inti dengan Karakter Kuncup Lancip) */}
      <path
        d="M 46 64 
           C 50 50, 68 42, 88 46 
           C 104 38, 124 36, 142 44 
           C 158 38, 180 46, 188 58 
           C 194 70, 180 80, 160 76 
           C 140 82, 116 80, 100 74 
           C 80 78, 58 74, 50 68 Z"
        fill="rgba(229, 193, 108, 0.12)"
        stroke="url(#megaGoldInner)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Layer 4 & 5 (Pusat Pusaran Inti Awan / Rirungan) */}
      <path
        d="M 72 60 
           C 78 52, 92 48, 108 52 
           C 120 48, 134 50, 144 56 
           C 152 62, 146 70, 134 68 
           C 122 72, 106 70, 96 66 
           C 86 68, 76 66, 72 60 Z"
        fill="url(#megaGoldInner)"
        opacity="0.35"
        stroke="url(#megaGoldInner)"
        strokeWidth="1.2"
      />

      {/* Aksen Spiral Pusaran Pusaka Megamendung */}
      <path
        d="M 108 56 C 114 54, 122 55, 126 59 C 130 63, 124 67, 118 66 C 112 65, 110 61, 114 59"
        fill="none"
        stroke="#FFF2D6"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Titik Intan Pesisir Cirebon */}
      <circle cx="156" cy="22" r="2" fill="#FFF2D6" />
      <circle cx="74" cy="30" r="1.6" fill="#FFF2D6" />
      <circle cx="184" cy="94" r="1.6" fill="#FFF2D6" />
      <circle cx="12" cy="68" r="1.5" fill="#E5C16C" />
      <circle cx="226" cy="50" r="1.5" fill="#E5C16C" />
    </svg>
  );
}
