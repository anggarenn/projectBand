"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc,
  Radio,
  Calendar,
  MapPin,
  Clock,
  ShoppingBag,
  Check,
  Copy,
  Download,
  ExternalLink,
  MessageCircle,
  Flame,
  ShieldCheck,
  Zap,
  Sliders,
  Headphones,
  Menu,
  X,
  ArrowUpRight,
  Heart,
  FileText,
  Shirt,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Camera,
  Layers,
  Sparkles
} from "lucide-react";

// ─── INSTAGRAM ICON ─────────────────────────────────────────────────────────

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// ─── PUNK UI ACCENTS: TAPE & STAMPS ─────────────────────────────────────────

function DuctTape({
  className = "",
  color = "tan"
}: {
  className?: string;
  color?: "tan" | "grey";
}) {
  const bgClass =
    color === "tan"
      ? "bg-[#D8C7A5]/85 border-[#B7A581]"
      : "bg-[#7A8089]/75 border-[#5A6069]";

  return (
    <div
      className={`absolute h-5 border-x border-dashed shadow-xs backdrop-blur-xs pointer-events-none z-30 select-none ${bgClass} ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 8px)"
      }}
    />
  );
}

function GrungeStamp({
  text,
  color = "red",
  className = ""
}: {
  text: string;
  color?: "red" | "black";
  className?: string;
}) {
  const isRed = color === "red";
  return (
    <div
      className={`inline-block font-mono font-black text-[11px] sm:text-xs uppercase px-2.5 py-1 border-2 border-dashed tracking-wider select-none ${
        isRed
          ? "border-[#D90429] text-[#D90429] bg-[#D90429]/5"
          : "border-black text-black bg-black/5"
      } ${className}`}
    >
      {text}
    </div>
  );
}

// ─── PUNK SKULL WITH MIC ANIMATED MASCOT COMPONENT ────────────────────────
function PunkSkullWithMic({
  isPlaying,
  bpm = 200,
  currentTrackTitle = "Berhala-Run!"
}: {
  isPlaying: boolean;
  bpm?: number;
  currentTrackTitle?: string;
}) {
  const [shoutIndex, setShoutIndex] = useState(0);
  const [isRoaring, setIsRoaring] = useState(false);

  const PUNK_SHOUTS = [
    "OI! OI! OI!",
    "HIGHLY MOTIVATED!",
    "DISTORSI MAKSIMAL!",
    "RANTAI REAKSI!",
    "LEDAKKAN SPEAKER!",
    "SWADAYA MANDIRI!",
    "TANGERANG HARDCORE!"
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setShoutIndex(prev => (prev + 1) % PUNK_SHOUTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSkullPoke = () => {
    setIsRoaring(true);
    setShoutIndex(prev => (prev + 1) % PUNK_SHOUTS.length);
    setTimeout(() => setIsRoaring(false), 900);
  };

  return (
    <div
      onClick={handleSkullPoke}
      className="relative flex flex-col items-center select-none cursor-pointer group"
      title="Klik tengkorak untuk memicu shout punk!"
    >
      {/* Punk Shout Comic Speech Bubble */}
      <div
        className={`transition-all duration-300 transform mb-1 z-20 ${
          isPlaying || isRoaring
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-40 scale-95"
        }`}
      >
        <div className="bg-[#FFE500] text-black font-black text-[10px] sm:text-xs px-2.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000] uppercase font-mono tracking-tight flex items-center gap-1.5 rotate-[-2deg]">
          <Flame className="w-3.5 h-3.5 text-black fill-current" />
          <span>{PUNK_SHOUTS[shoutIndex]}</span>
        </div>
        <div className="w-2.5 h-2.5 bg-[#FFE500] border-r-2 border-b-2 border-black rotate-45 mx-auto -mt-1.5 shadow-[1px_1px_0px_#000]" />
      </div>

      {/* SVG SKULL & VINTAGE MIC CANVAS */}
      <div className="relative w-28 h-36 sm:w-36 sm:h-44">
        {/* Soundwaves radiating from mic (left side) */}
        {isPlaying && (
          <div className="absolute left-2 top-24 pointer-events-none z-0">
            <div className="w-16 h-16 rounded-full border-2 border-[#FFE500]/40 animate-soundwave absolute -top-8 -left-8" />
            <div className="w-24 h-24 rounded-full border-2 border-[#FFE500]/25 animate-soundwave absolute -top-12 -left-12 [animation-delay:0.3s]" />
            <div className="w-32 h-32 rounded-full border-2 border-[#FFE500]/15 animate-soundwave absolute -top-16 -left-16 [animation-delay:0.6s]" />
          </div>
        )}

        <svg
          viewBox="0 0 240 250"
          className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* Punk Mohawk Duotone Gradient */}
            <linearGradient id="mohawkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE500" />
              <stop offset="100%" stopColor="#1A1D24" />
            </linearGradient>
            {/* Vintage Chrome Mic Gradient */}
            <linearGradient id="chromeMic" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8A92A0" />
              <stop offset="35%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#4A5260" />
              <stop offset="100%" stopColor="#1E2229" />
            </linearGradient>
          </defs>

          {/* ── MOHAWK SPIKES ── */}
          <g className={isPlaying ? "animate-pulse" : ""}>
            <polygon points="120,8 108,60 128,55" fill="url(#mohawkGrad)" stroke="#000" strokeWidth="3" />
            <polygon points="102,18 95,68 112,62" fill="#FFE500" stroke="#000" strokeWidth="3" />
            <polygon points="138,18 128,62 145,68" fill="#1A1D24" stroke="#000" strokeWidth="3" />
            <polygon points="86,34 82,75 100,70" fill="#2E333E" stroke="#000" strokeWidth="3" />
            <polygon points="154,34 140,70 158,75" fill="#FFE500" stroke="#000" strokeWidth="3" />
            <polygon points="72,55 75,85 90,80" fill="#1A1D24" stroke="#000" strokeWidth="3" />
            <polygon points="168,55 150,80 165,85" fill="#2E333E" stroke="#000" strokeWidth="3" />
          </g>

          {/* ── STUDDED LEATHER COLLAR ── */}
          <path d="M78,205 Q120,225 162,205 L165,225 Q120,245 75,225 Z" fill="#15171C" stroke="#000" strokeWidth="3" />
          <polygon points="88,212 92,205 96,212 92,216" fill="#FFF" stroke="#000" strokeWidth="1.5" />
          <polygon points="108,217 112,210 116,217 112,221" fill="#FFF" stroke="#000" strokeWidth="1.5" />
          <polygon points="128,217 132,210 136,217 132,221" fill="#FFF" stroke="#000" strokeWidth="1.5" />
          <polygon points="148,212 152,205 156,212 152,216" fill="#FFF" stroke="#000" strokeWidth="1.5" />

          {/* ── HEADBANGING CRANIUM & FACE ── */}
          <g className={isPlaying || isRoaring ? "animate-headbang-fast" : ""}>
            {/* Skull Head Base */}
            <path
              d="M80,82 C65,95 62,130 68,150 C72,165 82,170 88,172 L88,180 C95,182 145,182 152,180 L152,172 C158,170 168,165 172,150 C178,130 175,95 160,82 C148,70 92,70 80,82 Z"
              fill="#EAE5DA"
              stroke="#000"
              strokeWidth="4"
            />

            {/* Forehead punk fracture / crack */}
            <path d="M115,75 L120,90 L112,100 L118,110" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />

            {/* Safety Pin Piercing on Brow */}
            <path d="M74,96 Q70,90 76,86 L90,92 Q94,96 88,100 Z" fill="none" stroke="#FFE500" strokeWidth="2.5" />
            <circle cx="74" cy="92" r="2.5" fill="#000" />

            {/* Eye Sockets */}
            <path d="M85,115 C82,102 102,100 106,112 C108,126 88,128 85,115 Z" fill="#111317" stroke="#000" strokeWidth="3" />
            <path d="M134,112 C138,100 158,102 155,115 C152,128 132,126 134,112 Z" fill="#111317" stroke="#000" strokeWidth="3" />

            {/* Analog Amber Eye Pupils */}
            <g className={isPlaying ? "animate-pulse" : ""}>
              <polygon
                points="95,108 97,113 102,113 98,116 100,121 95,118 90,121 92,116 88,113 93,113"
                fill={isPlaying ? "#FFE500" : "#555"}
                className={isPlaying ? "filter drop-shadow-[0_0_4px_#FFE500]" : ""}
              />
              <polygon
                points="145,108 147,113 152,113 148,116 150,121 145,118 140,121 142,116 138,113 143,113"
                fill={isPlaying ? "#FFE500" : "#555"}
                className={isPlaying ? "filter drop-shadow-[0_0_4px_#FFE500]" : ""}
              />
            </g>

            {/* Triangular Inverted Nose Cavity */}
            <polygon points="120,126 114,142 126,142" fill="#111317" stroke="#000" strokeWidth="2" />

            {/* Cheekbone shadow accents */}
            <path d="M74,136 Q80,148 88,152" fill="none" stroke="#C4BEB1" strokeWidth="3" strokeLinecap="round" />
            <path d="M166,136 Q160,148 152,152" fill="none" stroke="#C4BEB1" strokeWidth="3" strokeLinecap="round" />

            {/* Upper Teeth */}
            <rect x="94" y="170" width="8" height="11" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
            <rect x="103" y="170" width="9" height="12" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
            <rect x="113" y="170" width="9" height="12" rx="1" fill="#FFE500" stroke="#000" strokeWidth="2" />
            <rect x="123" y="170" width="9" height="12" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
            <rect x="133" y="170" width="8" height="11" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="2" />

            {/* ── LOWER JAW (CHATTERS/ROARS WHEN PLAYING) ── */}
            <g className={isPlaying || isRoaring ? "animate-skull-jaw" : ""}>
              <path
                d="M90,183 L150,183 L144,204 Q120,214 96,204 Z"
                fill="#EAE5DA"
                stroke="#000"
                strokeWidth="3.5"
              />
              <rect x="98" y="181" width="8" height="8" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
              <rect x="107" y="181" width="8" height="9" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
              <rect x="116" y="181" width="8" height="9" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />
              <rect x="125" y="181" width="8" height="8" rx="1" fill="#FFFFFF" stroke="#000" strokeWidth="1.5" />

              {/* Chin Studded Spike Piercing */}
              <circle cx="120" cy="207" r="3" fill="#FFE500" stroke="#000" strokeWidth="1.5" />
              <polygon points="118,210 120,217 122,210" fill="#FFF" stroke="#000" strokeWidth="1" />
            </g>
          </g>

          {/* ── VINTAGE CHROME DYNAMIC MICROPHONE & SKELETAL HAND ── */}
          <g transform="translate(20, 115) rotate(-15)">
            {/* Curled Mic Cord */}
            <path
              d="M32,80 Q20,110 38,125 T25,145"
              fill="none"
              stroke="#181A20"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {isPlaying && (
              <path
                d="M32,80 Q20,110 38,125 T25,145"
                fill="none"
                stroke="#FFE500"
                strokeWidth="2"
                strokeDasharray="8 12"
                className="animate-pulse"
              />
            )}

            {/* Vintage Mic Grille Head */}
            <rect x="15" y="10" width="34" height="42" rx="10" fill={isPlaying ? "#FFE500" : "#22252C"} />
            <rect x="14" y="8" width="36" height="46" rx="12" fill="url(#chromeMic)" stroke="#000" strokeWidth="3" opacity="0.9" />
            <line x1="16" y1="16" x2="48" y2="16" stroke="#111" strokeWidth="2.5" />
            <line x1="15" y1="23" x2="49" y2="23" stroke="#111" strokeWidth="2.5" />
            <line x1="15" y1="30" x2="49" y2="30" stroke="#111" strokeWidth="2.5" />
            <line x1="16" y1="37" x2="48" y2="37" stroke="#111" strokeWidth="2.5" />
            <line x1="18" y1="44" x2="46" y2="44" stroke="#111" strokeWidth="2.5" />
            <line x1="32" y1="8" x2="32" y2="54" stroke="#FFF" strokeWidth="3" />
            <line x1="32" y1="8" x2="32" y2="54" stroke="#000" strokeWidth="1" />

            {/* Mic Base Collar & Shaft */}
            <rect x="24" y="54" width="16" height="30" rx="3" fill="#22252C" stroke="#000" strokeWidth="2.5" />
            <circle cx="32" cy="62" r="3" fill="#FFE500" />

            {/* Skeletal Bony Hand Clutched Around Mic Handle */}
            <g>
              <path d="M12,58 Q26,52 38,58" fill="none" stroke="#EAE5DA" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M12,58 Q26,52 38,58" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10,66 Q26,60 39,66" fill="none" stroke="#EAE5DA" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M10,66 Q26,60 39,66" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12,74 Q26,68 38,74" fill="none" stroke="#EAE5DA" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M12,74 Q26,68 38,74" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14,81 Q26,76 36,81" fill="none" stroke="#EAE5DA" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M40,56 Q44,66 36,72" fill="none" stroke="#EAE5DA" strokeWidth="5" strokeLinecap="round" />
              <path d="M40,56 Q44,66 36,72" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>

      {/* Status Tag beneath Skull */}
      <div className="mt-2 text-center">
        <div className="inline-flex items-center gap-1.5 bg-black/80 px-2.5 py-0.5 border border-black text-[9px] font-mono font-bold">
          <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#FFE500] animate-ping" : "bg-[#888]"}`} />
          <span className={isPlaying ? "text-[#FFE500]" : "text-[#888]"}>
            {isPlaying ? "VOCAL TRACK LIVE" : "IDLE • CLICK TO ROAR"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── ANALOG VU METER GAUGE COMPONENT ──────────────────────────────────────
function AnalogVUMeter({
  channel = "L",
  isPlaying,
  level = 5
}: {
  channel: string;
  isPlaying: boolean;
  level: number;
}) {
  const needleAngle = isPlaying ? -28 + level * 7 : -34;
  return (
    <div className="bg-[#101216] border-2 border-black p-1.5 sm:p-2 rounded-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] flex flex-col items-center w-full max-w-[105px] sm:max-w-[130px]">
      <div className="flex justify-between items-center w-full text-[8.5px] font-mono text-[#888] font-bold px-0.5 mb-1">
        <span className="text-[#FFE500]">CH {channel}</span>
        <span className={isPlaying ? "text-[#FFE500] animate-pulse" : "text-[#555]"}>
          {isPlaying ? "LIVE" : "IDLE"}
        </span>
      </div>
      {/* Dial Face */}
      <div className="relative w-full h-13 sm:h-15 bg-[#F5EEDC] border border-black rounded-t overflow-hidden shadow-inner flex flex-col justify-end items-center">
        <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "bg-[#FFE500]/25" : "bg-[#FFE500]/5"}`} />
        <svg viewBox="0 0 100 50" className="w-full h-full absolute inset-0">
          <path d="M 15 45 A 35 35 0 0 1 85 45" fill="none" stroke="#222" strokeWidth="1.5" />
          <path d="M 68 20 A 35 35 0 0 1 85 45" fill="none" stroke="#222" strokeWidth="2.5" />
          <text x="18" y="42" fontSize="5" fill="#555" fontWeight="bold">-20</text>
          <text x="32" y="27" fontSize="5" fill="#555" fontWeight="bold">-10</text>
          <text x="50" y="19" fontSize="5" fill="#555" fontWeight="bold">-3</text>
          <text x="68" y="20" fontSize="5" fill="#111" fontWeight="bold">0</text>
          <text x="80" y="32" fontSize="5" fill="#111" fontWeight="bold">+3</text>
          <text x="50" y="34" fontSize="6" fill="#111" fontWeight="900" textAnchor="middle">VU</text>
        </svg>
        {/* Needle */}
        <div
          className={`absolute bottom-0 w-0.5 h-14 bg-[#111] origin-bottom transition-transform duration-100 ease-out z-10 ${
            isPlaying ? "animate-vu-needle" : ""
          }`}
          style={{ transform: `rotate(${needleAngle}deg)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#111] -ml-0.5 -mt-0.5" />
        </div>
        <div className="w-3.5 h-2 rounded-t-full bg-[#111] z-20" />
      </div>
      <div className="mt-1 flex items-center justify-between w-full text-[7.5px] font-mono text-[#777]">
        <span>-20dB</span>
        <span className="text-[#FFE500] font-bold">PEAK +3dB</span>
      </div>
    </div>
  );
}

// ─── TYPES & DATA ──────────────────────────────────────────────────────────

interface Track {
  id: number;
  title: string;
  duration: string;
  durationSec: number;
  bpm: number;
  energy: string;
  audioSrc: string;
  sourceType: "single" | "live";
  lyrics: string;
  story: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Berhala-Run!",
    duration: "01:58",
    durationSec: 118,
    bpm: 208,
    energy: "HIGH VELOCITY",
    audioSrc: "/assets/silly-n-valley/audio/berhala-run.mp3",
    sourceType: "single",
    lyrics: `[Intro]
Satu! Dua! Tiga! LARI!

[Verse 1]
Mengejar angka di layar kaca
Lupa bernafas lupa membaca
Tunduk pada berhala semu
Menukar jiwa demi yang palsu!

[Chorus]
BERHALA RUN! Takkan ku kejar lagi!
BERHALA RUN! Ku injak ilusi pagi!
Kita bukan pion algoritma!
Kita distorsi yang bersuara!

[Outro]
STOP THE RUN! HENTIKAN!`,
    story:
      "Single kolaborasi resmi Silly N Valley Feat. Luthfi Tank Grunge (Tabraklari). Fast-paced d-beat punk rock berkecepatan 208 BPM."
  },
  {
    id: 2,
    title: "Merdeka Tapi Mampus!",
    duration: "02:19",
    durationSec: 139,
    bpm: 196,
    energy: "MAX INTENSITY",
    audioSrc: "/assets/silly-n-valley/audio/merdeka-tapi-mampus.mp3",
    sourceType: "single",
    lyrics: `Merdeka-merdeka tapi mampus!
Tanah surga tak membuat semua mulus
Lihat ibu pertiwi rusak tergerus
Diabaikan dan sengaja tak terurus

Merdeka-merdeka tapi mampus!
Membawa perubahan dengan akal bulus
Laksanakan langkah haram dengan mulus
Istana tempat singgah orang tak becus!

(Merdeka-merdeka tapi mampus!)
(Membawa perubahan dengan akal bulus)
(Laksanakan langkah haram dengan mulus)
(Istana tempat singgah orang tak becus!)

(Merdeka-merdeka tapi mampus!) 4x

(Maju. bergerak.) Kumpulkan semua nyali
(Maju. bergerak.) Lenyapkan tiang dinasti
(Maju. bergerak.) Jatuhkan bibit tirani
(Maju. bergerak.) Hancurkan dengan berani!

(Lihat. Amati. Brimob datang mengawasi)
(Lihat. Amati. Stafsus baper mensomasi)`,
    story:
      "6th Single resmi Silly N Valley. Kritik sosial tajam berbalut agresi punk rock cepat mengenai dinamika politik dan realitas jalanan."
  },
  {
    id: 3,
    title: "Sabda Fufufafa (Live)",
    duration: "01:29",
    durationSec: 89,
    bpm: 210,
    energy: "CROWD EXPLOSION",
    audioSrc: "/assets/silly-n-valley/audio/sabda-fufufafa-live.mp3",
    sourceType: "live",
    lyrics: `[Live at HALA Koffie - Latihan Di Lihatin]
Rekaman live murni dari showcase mandiri di HALA Koffie Tangerang.
Raw energy, sound ampli tabung direct, dan crowd scream tanpa filter.`,
    story:
      "Track 1 dari album 'HALA Latihan Dilihatin Live Session'. Menangkap kegilaan crowd sing-along dan circle karaoke di venue Hala Koffie Tangerang."
  },
  {
    id: 4,
    title: "Anak Anak Politikus (Live)",
    duration: "01:47",
    durationSec: 107,
    bpm: 195,
    energy: "OVERDRIVE ANTHEM",
    audioSrc: "/assets/silly-n-valley/audio/anak-anak-politikus-live.mp3",
    sourceType: "live",
    lyrics: `[Live at HALA Koffie Stage]
Lagu pembakar circle pit di setiap penampilan live. Menyerang privilege dinasti kekuasaan lewat riff power-chord tanpa kompromi.`,
    story:
      "Track 2 dari album live session HALA Koffie. Ditulis spontan untuk menyuarakan keresahan kelas pekerja muda Tangerang."
  },
  {
    id: 5,
    title: "Ledakkan Dinding Merkava (Live)",
    duration: "02:10",
    durationSec: 130,
    bpm: 190,
    energy: "SOLIDARITY RIOT",
    audioSrc: "/assets/silly-n-valley/audio/ledakkan-dinding-merkava-live.mp3",
    sourceType: "live",
    lyrics: `[Live Solidarity Track]
Suara solidaritas kemanusiaan melawan penindasan dan imperialisme militer. Runtuhkan dinding tirani dari panggung mandiri Tangerang!`,
    story:
      "Track 3 dari HALA Live Session. Lagu tema perlawanan dan solidaritas global yang selalu dimainkan dengan tensi maksimal."
  },
  {
    id: 6,
    title: "Kita Yang Tidak Dilibatkan (Live)",
    duration: "02:43",
    durationSec: 163,
    bpm: 180,
    energy: "SING-ALONG HYMN",
    audioSrc: "/assets/silly-n-valley/audio/kita-yang-tidak-dilibatkan-live.mp3",
    sourceType: "live",
    lyrics: `[Hymne Generasi Pinggiran]
Untuk semua kawan yang suaranya selalu dipinggirkan dari meja perundingan elit. Di sini kita berdiri, bernyanyi bersama sampai habis nafas!`,
    story:
      "Penutup epik HALA Live Session. Nomor sing-along bertempo sedang yang menyatukan seluruh penonton di lantai Hala Koffie."
  }
];

interface ZinePhoto {
  id: number;
  src: string;
  title: string;
  caption: string;
  venue: string;
  credit: string;
  category: "stage" | "crowd" | "gear" | "backstage";
  tilt: string;
}

const INSTAGRAM_PHOTOS: ZinePhoto[] = [
  {
    id: 1,
    src: "/assets/silly-n-valley/photo_1.jpg",
    title: "STAGE DIVE & AIRBORNE JUMP",
    caption:
      "Vokalis melayang di atas penonton HALA Koffie. Energi murni tanpa pagar barikade pembatas.",
    venue: "HALA Koffie, Tangerang",
    credit: "@mqrifisnqini",
    category: "stage",
    tilt: "-rotate-2"
  },
  {
    id: 2,
    src: "/assets/silly-n-valley/photo_2.jpg",
    title: "CROWD SING-ALONG CIRCLE",
    caption:
      "Penonton saling rangkul membentuk lingkaran karaoke punk di tengah ruang sempit kedai kopi.",
    venue: "Latihan Di Lihatin #3",
    credit: "@mqrifisnqini",
    category: "crowd",
    tilt: "rotate-3"
  },
  {
    id: 3,
    src: "/assets/silly-n-valley/photo_3.jpg",
    title: "GUITAR FEEDBACK OVERDRIVE",
    caption:
      "Riff gitar power chord mentok ampli tabung. Distorsi kotor bertenaga pendorong moshpit.",
    venue: "HALA Koffie Stage",
    credit: "@mqrifisnqini",
    category: "stage",
    tilt: "-rotate-1"
  },
  {
    id: 4,
    src: "/assets/silly-n-valley/photo_4.jpg",
    title: "D-BEAT BLAST BEAT",
    caption:
      "Ketukan drum berkecepatan 200 BPM memompa detak jantung seluruh penonton malam itu.",
    venue: "Latihan Di Lihatin Stage",
    credit: "@mqrifisnqini",
    category: "stage",
    tilt: "rotate-2"
  },
  {
    id: 5,
    src: "/assets/silly-n-valley/photo_5.jpg",
    title: "GUITAR LEAD & RIFF RUN",
    caption:
      "Gitaris memuntahkan riff cepat chord minor di atas panggung HALA Koffie. Karakter distorsi analog mentah.",
    venue: "HALA Koffie Stage",
    credit: "@mqrifisnqini",
    category: "stage",
    tilt: "-rotate-3"
  },
  {
    id: 6,
    src: "/assets/silly-n-valley/photo_6.jpg",
    title: "BASS LINE POGO ATTACK",
    caption:
      "Dentuman bassline rendah dari arah belakang panggung, memicu lompatan massa penonton festival.",
    venue: "Gigsgoks Fest Stage",
    credit: "@gigsgoks",
    category: "stage",
    tilt: "rotate-1"
  },
  {
    id: 7,
    src: "/assets/silly-n-valley/photo_7.jpg",
    title: "OFFICIAL MERCH T-SHIRT",
    caption:
      "Model showcase kaos resmi Silly N Valley 'Rantai Reaksi'. Heavyweight cotton 24s dengan sablon plastisol artwork band.",
    venue: "Merch Distro Stall",
    credit: "@silly.n.valley",
    category: "gear",
    tilt: "-rotate-2"
  },
  {
    id: 8,
    src: "/assets/silly-n-valley/photo_8.jpg",
    title: "DOUBLE PEDAL PUNCH",
    caption:
      "Aksi kaki drummer memompa ketukan cepat D-beat punk di atas panggung terbuka Gigsgoks Fest.",
    venue: "Mal Ciputra CitraRaya",
    credit: "@gigsgoks",
    category: "gear",
    tilt: "rotate-2"
  },
  {
    id: 9,
    src: "/assets/silly-n-valley/photo_9.jpg",
    title: "BALACLAVA BASSIST ROAR",
    caption:
      "Bassist dengan topeng balaclava hitam membetot 4-senar sebelum set dimulai di Tangerang.",
    venue: "Backstage Area, Tangerang",
    credit: "@silly.n.valley",
    category: "stage",
    tilt: "-rotate-1"
  },
  {
    id: 10,
    src: "/assets/silly-n-valley/photo_10.jpg",
    title: "OFFICIAL MERCH CATALOG DROP",
    caption:
      "Poster resmi rilisan fisik EP 'Rantai Reaksi', kaos Berhala-Run, paket bundle, dan kaset pita C-30.",
    venue: "Tangerang DIY Workshop",
    credit: "@silly.n.valley",
    category: "gear",
    tilt: "rotate-3"
  },
  {
    id: 11,
    src: "/assets/silly-n-valley/photo_11.jpg",
    title: "SWEAT & DISTORTION ANTHEM",
    caption:
      "Set live penuh keringat dan teriakan lantang. Membuktikan semangat pantang redup.",
    venue: "HALA Koffie Stage",
    credit: "@mqrifisnqini",
    category: "stage",
    tilt: "-rotate-2"
  },
  {
    id: 12,
    src: "/assets/silly-n-valley/photo_12.jpg",
    title: "OFFICIAL MERCH T-SHIRT",
    caption:
      "Kaos resmi Silly N Valley dipakai santai di studio. Jahitan rapi, fitting boxy mantap untuk dipakai manggung.",
    venue: "Studio Chill Session",
    credit: "@silly.n.valley",
    category: "gear",
    tilt: "rotate-1"
  }
];

interface MerchItem {
  id: string;
  name: string;
  category: string;
  price: number;
  formattedPrice: string;
  badge?: string;
  stockStatus: "READY STOCK" | "LIMITED EDITION" | "LOW STOCK";
  desc: string;
  specs: string[];
  sizes: string[];
  photoSrc: string;
}

const MERCH_CATALOG: MerchItem[] = [
  {
    id: "bundle-rantai-reaksi",
    name: "Rantai Reaksi Bulk (T-Shirt + Cassette Tape)",
    category: "OFFICIAL BUNDLE",
    price: 220000,
    formattedPrice: "Rp 220.000",
    badge: "BEST DEAL",
    stockStatus: "LIMITED EDITION",
    desc: "Paket bundling resmi: T-Shirt Rantai Reaksi + Kaset Pita Rantai Reaksi C-30 dengan packaging stensil underground.",
    specs: [
      "Heavyweight T-Shirt 24s Rantai Reaksi",
      "Kaset Pita C-30 Smokey Shell Rantai Reaksi",
      "Bonus Vinyl Sticker Pack",
      "Limited physical release"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    photoSrc: "/assets/silly-n-valley/merch_bundle.jpg"
  },
  {
    id: "tshirt-rantai-reaksi",
    name: "Rantai Reaksi T-Shirt",
    category: "APPAREL",
    price: 175000,
    formattedPrice: "Rp 175.000",
    badge: "OFFICIAL T-SHIRT",
    stockStatus: "READY STOCK",
    desc: "Kaos grafis utama Silly N Valley artwork ungu-kuning 'Rantai Reaksi'. Sablon plastisol tebal di atas kain katun hitam pekat.",
    specs: [
      "100% Cotton Combed 24s Heavyweight",
      "Plastisol High-Density Screenprint",
      "Seamless collar & double needle hems",
      "Woven label Silly N Valley"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    photoSrc: "/assets/silly-n-valley/merch_tshirt_rantai_reaksi.jpg"
  },
  {
    id: "tshirt-berhala-run",
    name: "Berhala-Run T-Shirt",
    category: "APPAREL",
    price: 150000,
    formattedPrice: "Rp 150.000",
    badge: "FAN FAVORITE",
    stockStatus: "READY STOCK",
    desc: "Kaos resmi single 'Berhala-Run!'. Artwork grafis api & patung berhala satir karya kolaborasi dengan sablon discharge tahan lama.",
    specs: [
      "100% Cotton Combed Black Heavyweight",
      "Discharge soft-hand screenprinting",
      "Oversized Boxy Fit",
      "Pre-shrunk fabric"
    ],
    sizes: ["S", "M", "L", "XL"],
    photoSrc: "/assets/silly-n-valley/merch_tshirt_berhala_run.jpg"
  },
  {
    id: "cassette-rantai-reaksi",
    name: "Rantai Reaksi Cassette Tape",
    category: "PHYSICAL AUDIO",
    price: 50000,
    formattedPrice: "Rp 50.000",
    badge: "PHYSICAL CASSETTE",
    stockStatus: "READY STOCK",
    desc: "Rilisan kaset analog resmi 'Rantai Reaksi' C-30 pita magnetik. Clear smokey case dengan full color 3-panel J-card lirik lipat.",
    specs: [
      "High-bias Magnetic Tape C-30",
      "Transparent Smokey Tint C-Shell",
      "3-Panel J-Card with Full Lyrics",
      "Official Silly N Valley Tangerang"
    ],
    sizes: ["One Size"],
    photoSrc: "/assets/silly-n-valley/merch_cassette.jpg"
  }
];

interface GigEvent {
  id: string;
  title: string;
  venue: string;
  location: string;
  dateStr: string;
  category: "SHOWCASE MANDIRI" | "FESTIVAL" | "SUPPORT GIG" | "CURATION RADAR";
  highlightBadge: string;
  desc: string;
  vibe: string;
  photoSrc: string;
  collab?: string;
}

const GIGS_TIMELINE: GigEvent[] = [
  {
    id: "gig-hala-koffie",
    title: "Latihan Di Lihatin #1 - #4",
    venue: "HALA Koffie Stage",
    location: "Kota Tangerang, Banten",
    dateStr: "Showcase Rutin Bulanan",
    category: "SHOWCASE MANDIRI",
    highlightBadge: "HOME BASE RESIDENCY",
    desc: "Showcase mandiri tanpa tiket masuk (free entry). Mengubah kedai kopi menjadi arena sing-along circle dan karaoke punk bersama kawan-kawan tongkrongan.",
    vibe: "Intimate, moshpit ramah kopi, karaoke massal, no gatekeeping.",
    photoSrc: "/assets/silly-n-valley/photo_2.jpg",
    collab: "@halakoffie"
  },
  {
    id: "gig-gigsgoks",
    title: "Gigsgoks Fest 2024",
    venue: "Lapangan Parkir Utara Mal Ciputra",
    location: "CitraRaya Tangerang, Banten",
    dateStr: "Edisi Festival Akbar",
    category: "FESTIVAL",
    highlightBadge: "OUTDOOR FESTIVAL",
    desc: "Membakar panggung festival outdoor bersama deretan band cadas Tangerang dan Jabodetabek. Pogo circle terpanjang di aspal CitraRaya.",
    vibe: "Open-air crowd surfing, sunset moshpit, distorsi ampli mentok.",
    photoSrc: "/assets/silly-n-valley/photo_8.jpg",
    collab: "@gigsgoks"
  },
  {
    id: "gig-heidegger",
    title: "Support: Launching Album HeideggerxCrust",
    venue: "HALA Koffie Stage",
    location: "Kota Tangerang, Banten",
    dateStr: "Showcase Solidaritas Scene",
    category: "SUPPORT GIG",
    highlightBadge: "BROTHERHOOD SUPPORT",
    desc: "Menjadi band pembuka pemicu adrenalin untuk pesta peluncuran album kawan satu kota @heideggerxcrust. Solidaritas scene hardcore-crust-punk lokal.",
    vibe: "High intensity, wall-to-wall pit, persaudaraan lintas subgenre.",
    photoSrc: "/assets/silly-n-valley/photo_3.jpg",
    collab: "@heideggerxcrust"
  },
  {
    id: "gig-authenticity",
    title: "Submission Authenticity Soundroom 2024",
    venue: "Road to Latihan Pestapora",
    location: "Kurasi & Showcase Nasional",
    dateStr: "Kurasi Nasional",
    category: "CURATION RADAR",
    highlightBadge: "CURATION RADAR",
    desc: "Silly N Valley terpilih dalam submission resmi Authenticity Soundroom berjejaring ke festival Latihan Pestapora.",
    vibe: "Showcase kompetitif berskala nasional, membuktikan taji punk Tangerang.",
    photoSrc: "/assets/silly-n-valley/photo_11.jpg",
    collab: "@authenticity_id"
  }
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function SillyNValleyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Audio Cassette states
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSec, setPlaybackSec] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Gallery & Lightbox states
  const [galleryCategory, setGalleryCategory] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Merch selector states
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "bundle-rantai-reaksi": "L",
    "tshirt-rantai-reaksi": "L",
    "tshirt-berhala-run": "XL",
    "cassette-rantai-reaksi": "One Size"
  });

  // Riders & Tech states
  const [activeRiderTab, setActiveRiderTab] = useState<"tech" | "hospitality">(
    "tech"
  );
  const [copiedRider, setCopiedRider] = useState(false);

  // Booking quick form states
  const [bookingForm, setBookingForm] = useState({
    eventName: "",
    venueCity: "",
    date: "",
    format: "Showcase / Gigs Cafe",
    notes: ""
  });

  // VU Meter random bounce simulation when playing
  const [vuLevelLeft, setVuLevelLeft] = useState(1);
  const [vuLevelRight, setVuLevelRight] = useState(1);

  useEffect(() => {
    let vuInterval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      vuInterval = setInterval(() => {
        setVuLevelLeft(Math.floor(Math.random() * 6) + 3);
        setVuLevelRight(Math.floor(Math.random() * 6) + 3);
      }, 120);
    } else {
      setVuLevelLeft(0);
      setVuLevelRight(0);
    }
    return () => {
      if (vuInterval) clearInterval(vuInterval);
    };
  }, [isPlaying]);

  // Sync mute & volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Track change auto-play when active
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex(prev =>
          prev === null || prev === 0 ? INSTAGRAM_PHOTOS.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex(prev =>
          prev === null || prev === INSTAGRAM_PHOTOS.length - 1 ? 0 : prev + 1
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(err => {
          console.error("Audio playback error:", err);
        });
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex(prev => (prev + 1) % TRACKS.length);
    setPlaybackSec(0);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex(prev => (prev === 0 ? TRACKS.length - 1 : prev - 1));
    setPlaybackSec(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const activeTrack = TRACKS[currentTrackIndex];

  const filteredPhotos =
    galleryCategory === "all"
      ? INSTAGRAM_PHOTOS
      : INSTAGRAM_PHOTOS.filter(p => p.category === galleryCategory);

  // WhatsApp generator for Merch Order
  const handleOrderMerch = (item: MerchItem) => {
    const chosenSize = selectedSizes[item.id] || "L";
    const text = encodeURIComponent(
      `Halo Silly N Valley! Saya mau order merch resmi:\n\n• Produk: ${item.name}\n• Ukuran: ${chosenSize}\n• Harga: ${item.formattedPrice}\n\nMohon info ketersediaan stok & ongkir ke kota saya. Makasih! #RantaiReaksi`
    );
    window.open(`https://wa.me/6282216387253?text=${text}`, "_blank");
  };

  // WhatsApp generator for Booking
  const handleSendBookingInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Halo Manajemen Silly N Valley! Kami mau invite manggung:\n\n• Nama Event: ${
        bookingForm.eventName || "[Nama Event]"
      }\n• Venue / Kota: ${
        bookingForm.venueCity || "[Kota Tangerang/Lainnya]"
      }\n• Tanggal: ${bookingForm.date || "[Tanggal Event]"}\n• Format Event: ${
        bookingForm.format
      }\n• Catatan: ${
        bookingForm.notes || "Mohon kirimkan info availability & tech rider."
      }\n\nMohon feedback-nya. Cheers! #HighlyMotivatedPunk`
    );
    window.open(`https://wa.me/6282216387253?text=${text}`, "_blank");
  };

  // Copy Rider Text
  const riderRawText = `=== SILLY N VALLEY (HIGHLY MOTIVATED PUNK) - TECHNICAL & HOSPITALITY RIDERS ===
Contact Booking Hotline: +62 822-1638-7253 | Instagram: @silly.n.valley

[CHANNEL INPUT LIST - 8 CHANNELS]
CH 1: Kick Drum -> Shure Beta 52A / AKG D112 (Short Boom Stand)
CH 2: Snare Drum -> Shure SM57 (Standard Boom Stand)
CH 3: Hi-Hat / Overhead -> Shure SM81 / Condenser (Tall Boom Stand)
CH 4: Bass Guitar -> DI Box Active / XLR Out Bass Head (BSS / Radial)
CH 5: Guitar 1 (Lead/Rhythm) -> Shure SM57 / Sennheiser e609 on 4x12 Cab
CH 6: Guitar 2 (Rhythm) -> Shure SM57 on 4x12 Cab
CH 7: Lead Vocal -> Shure SM58 / Shure Beta 58A (Straight / Boom Stand)
CH 8: Backing Vocal (Guitar 2) -> Shure SM58 (Boom Stand)

[MONITORING REQUIREMENTS]
- 3 Aux Foldback Monitor Wedges (Front Stage Left, Front Stage Right, Drum Thrown)
- 2x Independent 220V Grounded Electric Extensions on stage

[HOSPITALITY & GREEN ROOM]
- Ruang tunggu berventilasi baik / ber-AC yang aman untuk penyimpanan instrumen
- 2 Karton Air Mineral 600ml (suhu ruang & dingin)
- Kopi hitam / Cold Brew lokal (Non-alcohol friendly safe space)
- Buah segar (Pisang & Semangka) + Makanan berat untuk 5 personil & crew
- Akses loading gear bebas hambatan 2 jam sebelum check sound
================================================================================`;

  const copyRiderToClipboard = () => {
    navigator.clipboard.writeText(riderRawText);
    setCopiedRider(true);
    setTimeout(() => setCopiedRider(false), 2500);
  };

  const downloadRiderFile = () => {
    const element = document.createElement("a");
    const file = new Blob([riderRawText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "Riders-Silly-N-Valley-Tangerang.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#EBE7DF] text-[#0D0D0D] font-mono selection:bg-[#FFE500] selection:text-black overflow-x-hidden relative">
      {/* ─── XEROX HALFTONE PAPER BACKGROUND OVERLAY ───────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage:
            "radial-gradient(#0D0D0D 0.75px, transparent 0.75px), radial-gradient(#0D0D0D 0.75px, #EBE7DF 0.75px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px"
        }}
      />

      {/* ─── TOP TICKER NEWSLETTER STRIP ─────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] text-[#FFE500] py-2 px-4 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-between border-b-3 border-black z-50 relative select-none overflow-hidden">
        <div className="flex items-center space-x-2 shrink-0 pr-4">
          <span className="inline-block w-2.5 h-2.5 bg-[#D90429] rounded-full animate-ping" />
          <span className="bg-[#D90429] text-white px-1.5 py-0.2 text-[10px]">
            ZINE ISSUE #04
          </span>
          <span className="hidden sm:inline text-white">TANGERANG DIY PUNK SCENE</span>
        </div>
        <div className="whitespace-nowrap overflow-hidden flex-1 relative text-[11px] sm:text-xs">
          <div className="inline-block animate-[marquee_22s_linear_infinite]">
            +++ BAND PUNK TAPI KOK NGONTEN!? +++ CASSETTE C-30 &apos;RANTAI REAKSI&apos; OUT NOW +++ SHOWCASE RESIDENCY @ HALA KOFFIE +++ ZERO VIOLENCE SAFE SPACE +++ DOKUMENTASI RESMI @MQRIFISNQINI +++ BOOKING WA: 0822-1638-7253 +++
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-3 shrink-0 pl-4 text-xs">
          <a
            href="https://instagram.com/silly.n.valley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 font-bold text-white"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#FFE500]" /> @silly.n.valley
          </a>
        </div>
      </div>

      {/* ─── MAIN NAV HEADER (XEROX CUT-OUT STYLE) ────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#F2EEE5]/95 backdrop-blur-md border-b-3 border-black shadow-[0_4px_0px_#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo Ransom Note */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Link href="/silly-n-valley" className="flex items-center gap-1 select-none">
              <span className="bg-[#0D0D0D] text-white px-2 sm:px-2.5 py-1 text-lg sm:text-2xl font-black uppercase tracking-tighter -rotate-2 border-2 border-black shadow-[2px_2px_0px_#D90429]">
                SILLY
              </span>
              <span className="bg-[#FFE500] text-black px-1.5 sm:px-2 py-1 text-lg sm:text-2xl font-black uppercase tracking-tighter rotate-1 border-2 border-black shadow-[2px_2px_0px_#0D0D0D]">
                N
              </span>
              <span className="bg-[#D90429] text-white px-2 sm:px-2.5 py-1 text-lg sm:text-2xl font-black uppercase tracking-tighter -rotate-1 border-2 border-black shadow-[2px_2px_0px_#0D0D0D]">
                VALLEY
              </span>
            </Link>

            <span className="hidden lg:inline-block bg-white text-black text-[10px] font-black uppercase px-2 py-0.5 border border-black rotate-2 shadow-[1px_1px_0px_#000]">
              TNG HARDCORE
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-black uppercase tracking-wider">
            <a
              href="#photos"
              className="hover:text-[#D90429] transition-colors flex items-center gap-1"
            >
              <Camera className="w-4 h-4 text-[#D90429]" /> Galeri Zine
            </a>
            <a
              href="#music"
              className="hover:text-[#D90429] transition-colors flex items-center gap-1"
            >
              <Disc className="w-4 h-4 text-black" /> Kaset C-30
            </a>
            <a href="#manifesto" className="hover:text-[#D90429] transition-colors">
              Manifesto
            </a>
            <a
              href="#gigs"
              className="hover:text-[#D90429] transition-colors flex items-center gap-1"
            >
              <Calendar className="w-4 h-4 text-[#D90429]" /> Flyer Wall
            </a>
            <a
              href="#merch"
              className="hover:text-[#D90429] transition-colors flex items-center gap-1"
            >
              <ShoppingBag className="w-4 h-4 text-black" /> Distro Merch
            </a>
            <a href="#riders" className="hover:text-[#D90429] transition-colors">
              Riders
            </a>
          </nav>

          {/* Action Button: Booking Hotline */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://wa.me/6282216387253?text=Halo%20Silly%20N%20Valley!%20Mau%20booking%20manggung%20gigs."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D90429] hover:bg-[#b00320] text-white px-4 py-2 font-mono font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#0D0D0D] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> Booking Gigs
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-black bg-white border-2 border-black shadow-[2px_2px_0px_#000]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F2EEE5] border-b-3 border-black px-6 py-5 text-sm uppercase space-y-4">
            <a
              href="#photos"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold hover:text-[#D90429] flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-[#D90429]" /> Galeri Zine & Polaroid (12 Foto)
            </a>
            <a
              href="#music"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold hover:text-[#D90429] flex items-center gap-2"
            >
              <Disc className="w-4 h-4 text-black" /> Tape Deck Kaset C-30 &apos;Rantai Reaksi&apos;
            </a>
            <a
              href="#manifesto"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold hover:text-[#D90429]"
            >
              Manifesto &quot;Band Punk Ngonten!?&quot;
            </a>
            <a
              href="#gigs"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold hover:text-[#D90429] flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D90429]" /> Flyer Wall & Jadwal Panggung
            </a>
            <a
              href="#merch"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold hover:text-[#D90429] flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-black" /> Distro Merch & Kaset Fisik
            </a>
            <a
              href="#riders"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold hover:text-[#D90429]"
            >
              Technical Riders (8 Channel)
            </a>
            <div className="pt-2 border-t-2 border-dashed border-black">
              <a
                href="https://wa.me/6282216387253?text=Halo%20Silly%20N%20Valley!%20Mau%20inquiry%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-[#D90429] text-white py-2.5 font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                Hotline WA: 0822-1638-7253
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ─── SECTION 1: HERO SECTION (XEROX FANZINE COVER COLLAGE) ───────── */}
      <section
        id="hero"
        className="relative pt-10 pb-20 md:pt-16 md:pb-28 border-b-4 border-black z-10 overflow-hidden"
      >
        {/* Punk Stamp Seal */}
        <div className="hidden sm:flex absolute top-6 right-10 w-28 h-28 rounded-full border-3 border-dashed border-black bg-[#FFE500] items-center justify-center rotate-12 shadow-[5px_5px_0px_#000] z-20 pointer-events-none select-none">
          <div className="text-[10px] font-black uppercase text-center leading-tight tracking-wider text-black">
            ⚡ 100% DIY ⚡<br />TANGERANG<br />HARDCORE
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Zine Typography & Statement */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges Bar with DIY Stickers */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-[#0D0D0D] text-[#FFE500] text-xs font-black px-2.5 py-1 uppercase -rotate-1 border-2 border-black shadow-[2px_2px_0px_#D90429]">
                  HIGHLY MOTIVATED PUNK
                </span>
                <span className="bg-white text-black text-xs font-black px-2.5 py-1 uppercase rotate-2 border-2 border-black shadow-[2px_2px_0px_#0D0D0D]">
                  TANGERANG HARDCORE SCENE
                </span>
                <span className="bg-[#D90429] text-white text-xs font-black px-2.5 py-1 uppercase -rotate-2 border-2 border-black shadow-[2px_2px_0px_#FFE500]">
                  CASSETTE C-30 OUT NOW
                </span>
              </div>

              {/* Headline: Newspaper Cutout Ransom Style */}
              <div className="space-y-3">
                <div className="inline-block bg-[#FFE500] text-black px-3 py-1 font-black text-sm uppercase border-2 border-black -rotate-1 shadow-[3px_3px_0px_#000]">
                  SURAT KABAR BAWAH TANAH EDISI KHUSUS
                </div>

                <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black">
                  SILLY N <br />
                  <span className="inline-block bg-black text-white px-3 my-1 -rotate-1 border-2 border-black shadow-[6px_6px_0px_#D90429] cursor-default">
                    VALLEY
                  </span>
                </h1>

                <div className="pt-2">
                  <span className="inline-block bg-[#D90429] text-white text-lg sm:text-2xl font-black px-3 py-1 rotate-1 border-2 border-black shadow-[4px_4px_0px_#000]">
                    &quot;BAND PUNK TAPI KOK NGONTEN!?&quot;
                  </span>
                </div>
              </div>

              {/* Manifest Paper Paragraph */}
              <div className="relative bg-[#FAF8F5] border-3 border-black p-5 shadow-[6px_6px_0px_#0D0D0D] hover:shadow-[8px_8px_0px_#FFE500] transition-shadow">
                <DuctTape className="-top-3 left-8 w-20 -rotate-2" />
                <DuctTape className="-bottom-3 right-8 w-20 rotate-1" />
                <p className="text-black text-sm sm:text-base leading-relaxed font-mono">
                  Unit punk rock berdaya ledak tinggi asal <strong>Kota Tangerang</strong>.
                  Mengawinkan distorsi kencang tanpa kompromi, lirik motivasi harian,
                  kultur DIY kaset pita, dan keberanian membajak algoritma digital demi merayakan
                  ruang aman bagi semua orang di moshpit!
                </p>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="#music"
                  className="bg-[#FFE500] hover:bg-[#ebd300] text-black px-6 py-3.5 font-black text-sm uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#D90429] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                  <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
                  <span>Putar Kaset C-30</span>
                </a>
                <a
                  href="#photos"
                  className="bg-white hover:bg-[#F0ECE1] text-black px-6 py-3.5 font-black text-sm uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-[#D90429]" /> Lihat Foto Instagram
                </a>
                <a
                  href="#gigs"
                  className="bg-[#D90429] hover:bg-[#ba0323] text-white px-5 py-3.5 font-black text-sm uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] flex items-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-white" /> Flyer Gigs
                </a>
              </div>

              {/* Quick DIY Stats Badges */}
              <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-3 border-t-2 border-dashed border-black max-w-lg">
                <div className="bg-white border-2 border-black p-2 sm:p-2.5 shadow-[3px_3px_0px_#000] -rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-xl sm:text-2xl font-black text-black">4 TRACKS</div>
                  <div className="text-[9px] sm:text-[10px] text-[#555] font-bold uppercase">
                    Kaset Pita C-30
                  </div>
                </div>
                <div className="bg-[#FFE500] border-2 border-black p-2 sm:p-2.5 shadow-[3px_3px_0px_#000] rotate-1 hover:rotate-0 transition-transform">
                  <div className="text-xl sm:text-2xl font-black text-black">100% DIY</div>
                  <div className="text-[9px] sm:text-[10px] text-black font-bold uppercase">
                    Swadaya Mandiri
                  </div>
                </div>
                <div className="bg-[#D90429] border-2 border-black p-2 sm:p-2.5 shadow-[3px_3px_0px_#000] -rotate-2 hover:rotate-0 transition-transform">
                  <div className="text-xl sm:text-2xl font-black text-white">ZERO</div>
                  <div className="text-[9px] sm:text-[10px] text-white font-bold uppercase">
                    Kekerasan Moshpit
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Polaroid & Gigs Flyer Collage */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md px-2 sm:px-0">

                {/* Background Duct Tape Strips */}
                <DuctTape className="-top-4 left-10 w-28 -rotate-6" />
                <DuctTape className="-bottom-4 right-12 w-28 rotate-3" />

                {/* Pinboard Layer: Photo 1 (Stage dive) */}
                <div className="bg-white border-3 border-black p-3.5 shadow-[8px_8px_0px_#0D0D0D] rotate-2 relative z-20 group hover:rotate-0 transition-transform duration-300">
                  <div className="aspect-4/3 bg-black overflow-hidden border-2 border-black relative">
                    <img
                      src="/assets/silly-n-valley/photo_1.jpg"
                      alt="Silly N Valley Stage Dive at HALA Koffie"
                      className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute bottom-2 left-2 bg-[#D90429] text-white text-[10px] font-black px-2 py-0.5 border border-black uppercase">
                      HALA KOFFIE MOSHPIT
                    </div>
                  </div>
                  <div className="pt-2.5 flex justify-between items-center text-xs">
                    <span className="font-black uppercase tracking-tight">
                      LATIHAN DI LIHATIN #04
                    </span>
                    <span className="text-[10px] text-[#555] font-bold">
                      Dok: @mqrifisnqini
                    </span>
                  </div>
                </div>

                {/* Overlapping Secondary Photo: Photo 11 (Sweaty action) */}
                <div className="bg-[#FFE500] border-3 border-black p-3 shadow-[6px_6px_0px_#0D0D0D] -rotate-4 -mt-16 -ml-6 relative z-10 max-w-[260px]">
                  <DuctTape className="-top-3 right-6 w-16 rotate-12" color="grey" />
                  <div className="aspect-square bg-black overflow-hidden border-2 border-black">
                    <img
                      src="/assets/silly-n-valley/photo_11.jpg"
                      alt="Live distortion energy"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                  <div className="pt-1.5 text-[10px] font-black uppercase text-black">
                    DISTORSI & KERINGAT
                  </div>
                </div>

                {/* Overlapping Cassette Badge */}
                <div className="absolute -bottom-6 -right-4 bg-white border-3 border-black p-2.5 shadow-[6px_6px_0px_#D90429] rotate-3 z-30 max-w-[200px]">
                  <div className="w-full aspect-video overflow-hidden border border-black mb-1.5">
                    <img
                      src="/assets/silly-n-valley/photo_5.jpg"
                      alt="Kaset Rantai Reaksi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[10px] font-black uppercase leading-tight">
                    KASSETTE PITA C-30 OUT NOW!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: INSTAGRAM PHOTO ZINE GALLERY (12 REAL PHOTOS) ─────── */}
      <section id="photos" className="py-20 border-b-4 border-black bg-[#E2DDD3] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D90429] text-white px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
                <Camera className="w-3.5 h-3.5" /> DOKUMENTASI RESMI INSTAGRAM
              </div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
                Fanzine Photo Gallery
              </h2>
              <p className="text-[#444] text-sm mt-1 max-w-2xl font-bold">
                Arsip visual panggung, moshpit circle, rilis fisik, dan suasana showcase Silly N Valley.
                Dokumentasi eksklusif oleh <strong className="text-black">@silly.n.valley</strong> &{" "}
                <strong className="text-black">@mqrifisnqini</strong>.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "SEMUA (12)" },
                { key: "stage", label: "PANGGUNG" },
                { key: "crowd", label: "MOSHPIT" },
                { key: "gear", label: "KASET & GEAR" },
                { key: "backstage", label: "BACKSTAGE" }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setGalleryCategory(tab.key)}
                  className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all ${
                    galleryCategory === tab.key
                      ? "bg-[#FFE500] text-black shadow-[3px_3px_0px_#000] -translate-y-0.5"
                      : "bg-white text-black hover:bg-[#F0ECE1] shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Polaroid Pinboard Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredPhotos.map((photo, index) => {
              const originalIndex = INSTAGRAM_PHOTOS.findIndex(p => p.id === photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(originalIndex)}
                  className={`group bg-white border-3 border-black p-3.5 shadow-[5px_5px_0px_#0D0D0D] hover:shadow-[7px_7px_0px_#00F0FF,-7px_-7px_0px_#FF0055] hover:-translate-y-2 hover:rotate-0 transition-all duration-300 cursor-pointer relative ${photo.tilt}`}
                >
                  {/* Duct Tape on top of each polaroid */}
                  <DuctTape
                    className="-top-3 left-1/2 -translate-x-1/2 w-16"
                    color={index % 2 === 0 ? "tan" : "grey"}
                  />

                  {/* Photo Frame */}
                  <div className="aspect-4/3 sm:aspect-square bg-black overflow-hidden border-2 border-black relative">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 contrast-105"
                      loading="lazy"
                    />
                    {/* Animated Xerox Scanline Sweep on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Pop-up Authenticity Punk Stamp */}
                    <div className="absolute top-2 left-2 bg-[#FF0055] text-white text-[8px] font-black px-1.5 py-0.5 border border-black uppercase -rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-[1px_1px_0px_#000] z-10 scale-90 group-hover:scale-100">
                      AUTHENTIC PUNK
                    </div>

                    <div className="absolute top-2 right-2 bg-black/80 text-white p-1 rounded-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-[#FFE500] text-black text-[9px] font-black px-1.5 py-0.5 border border-black uppercase z-10">
                      #{photo.id.toString().padStart(2, "0")}
                    </div>
                  </div>

                  {/* Handwritten Polaroid Caption Area */}
                  <div className="pt-3 space-y-1">
                    <div className="font-black text-xs uppercase tracking-tight text-black truncate">
                      {photo.title}
                    </div>
                    <div className="text-[11px] text-[#444] line-clamp-2 leading-tight">
                      {photo.caption}
                    </div>
                    <div className="pt-2 border-t border-dashed border-[#BBB] flex justify-between items-center text-[10px] font-bold text-[#666]">
                      <span className="truncate">{photo.venue}</span>
                      <span className="text-[#D90429] shrink-0">{photo.credit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Instagram Follow Plug Banner */}
          <div className="mt-12 bg-white border-3 border-black p-6 shadow-[8px_8px_0px_#0D0D0D] flex flex-col md:flex-row items-center justify-between gap-6 relative">
            <DuctTape className="-top-3 left-12 w-24 -rotate-2" />
            <div className="space-y-1 text-center md:text-left">
              <div className="inline-block bg-[#FFE500] text-black text-[11px] font-black px-2 py-0.5 border border-black uppercase">
                INSTAGRAM RESMI
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-black">
                Mau Lihat Foto & Video Moshpit Lainnya?
              </h3>
              <p className="text-xs text-[#555] font-bold">
                Follow akun official <strong className="text-black">@silly.n.valley</strong> dan arsip fotografer <strong className="text-black">@mqrifisnqini</strong> untuk update jadwal gigs & behind the scenes!
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="https://instagram.com/silly.n.valley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D90429] hover:bg-[#ba0323] text-white px-4 py-2.5 text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
              >
                <InstagramIcon className="w-4 h-4 text-white" /> @silly.n.valley
              </a>
              <a
                href="https://instagram.com/mqrifisnqini"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0D0D0D] hover:bg-[#222] text-[#FFE500] px-4 py-2.5 text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] flex items-center gap-1.5"
              >
                <InstagramIcon className="w-4 h-4 text-[#FFE500]" /> @mqrifisnqini
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIGHTBOX MODAL (FULL RESOLUTION ZOOM) ────────────────────────── */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="bg-[#FAF8F5] border-4 border-black p-4 sm:p-6 max-w-4xl w-full shadow-[12px_12px_0px_#D90429] relative max-h-[92vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Duct tape decorative */}
            <DuctTape className="-top-3 left-10 w-24 -rotate-3" />
            <DuctTape className="-top-3 right-10 w-24 rotate-3" color="grey" />

            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 mb-3 border-b-2 border-black">
              <div className="flex items-center gap-2">
                <span className="bg-[#FFE500] text-black text-xs font-black px-2 py-0.5 border border-black uppercase">
                  FOTO #{INSTAGRAM_PHOTOS[activePhotoIndex].id} / {INSTAGRAM_PHOTOS.length}
                </span>
                <span className="text-xs font-bold text-[#666]">
                  {INSTAGRAM_PHOTOS[activePhotoIndex].venue}
                </span>
              </div>
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="bg-[#D90429] text-white p-1.5 border-2 border-black hover:bg-black transition-colors"
                aria-label="Tutup foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main High-Res Image Display */}
            <div className="relative bg-black border-3 border-black overflow-hidden flex items-center justify-center max-h-[58vh]">
              <img
                src={INSTAGRAM_PHOTOS[activePhotoIndex].src}
                alt={INSTAGRAM_PHOTOS[activePhotoIndex].title}
                className="max-h-[58vh] w-auto max-w-full object-contain mx-auto"
              />

              {/* Prev & Next Floating Buttons */}
              <button
                onClick={() =>
                  setActivePhotoIndex(prev =>
                    prev === null || prev === 0
                      ? INSTAGRAM_PHOTOS.length - 1
                      : prev - 1
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE500]"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setActivePhotoIndex(prev =>
                    prev === null || prev === INSTAGRAM_PHOTOS.length - 1
                      ? 0
                      : prev + 1
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-black p-2 border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE500]"
                aria-label="Foto selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Photo Caption & Details */}
            <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black uppercase text-black">
                  {INSTAGRAM_PHOTOS[activePhotoIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#444] mt-1 font-mono">
                  {INSTAGRAM_PHOTOS[activePhotoIndex].caption}
                </p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <div className="text-[10px] text-[#777] uppercase font-bold">KREDIT FOTOGRAFER:</div>
                <div className="text-xs font-black text-[#D90429]">
                  {INSTAGRAM_PHOTOS[activePhotoIndex].credit}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SECTION 3: VINTAGE 80s CASSETTE TAPE DECK & NEON PUNK JUKEBOX ──── */}
      {/* ─── SECTION 3: VINTAGE CASSETTE TAPE DECK & AUDIO PLAYER ──── */}
      <section id="music" className="py-20 bg-[#0E0F14] text-[#EBE7DF] border-b-4 border-black relative overflow-hidden">
        {/* Subtle Ambient Studio Backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FFE500]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#FFE500] text-black px-3 py-1 font-mono text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000]">
              <Headphones className="w-3.5 h-3.5" /> OFFICIAL TRACKS
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
              LISTEN TO US
            </h2>
          </div>

          {/* VINTAGE STUDIO TAPE DECK INDUSTRIAL RACK HOUSING */}
          <div className="bg-[#12141A] border-4 border-black p-4 sm:p-7 relative max-w-6xl mx-auto rounded-none shadow-[8px_8px_0px_#000]">
            {/* Clean Industrial Top Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#FFE500] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
              {/* LEFT COLUMN (7 COLS): FULL CASSETTE TAPE DECK & CONTROLS */}
              <div className="lg:col-span-7 bg-[#14161C] border-3 border-black p-4 sm:p-6 shadow-inner flex flex-col justify-between">
                <div>
                  {/* Cassette Label Header */}
                  <div className="bg-[#FFE500] text-black border-2 border-black p-3 flex flex-wrap justify-between items-center font-mono shadow-[3px_3px_0px_#000] gap-2">
                    <div>
                      <div className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#333]">
                        SIDE A • HIGH BIAS TYPE II • C-30 ANALOG CASSETTE
                      </div>
                      <div className="text-lg sm:text-2xl font-black uppercase tracking-tight">
                        RANTAI REAKSI [EP]
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black bg-black text-[#FFE500] px-2.5 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                        SILLY N VALLEY
                      </div>
                      <div className="text-[9px] sm:text-[10px] font-bold text-black mt-0.5">TANGERANG DIY REC.</div>
                    </div>
                  </div>

                  {/* CASSETTE TAPE WINDOW & ROTATING SPOOLS */}
                  <div className="my-4 bg-[#0B0C0E] border-3 border-black p-3 sm:p-5 relative shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] overflow-hidden">
                    {/* Backlight warm glow inside cassette well */}
                    <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                      isPlaying ? "bg-[#FFE500]/5" : "bg-transparent"
                    }`} />

                    {/* Magnetic tape ribbon */}
                    <div className="absolute inset-x-6 sm:inset-x-12 top-1/2 -translate-y-1/2 h-7 sm:h-8 bg-[#2B150A] opacity-85 pointer-events-none border-y border-[#4A2411]" />

                    {/* Rotating Spools */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-8 items-center max-w-sm mx-auto relative z-10">
                      {/* Left Spool (Supply) */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#1E222B] border-4 border-[#3A4252] flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.8)] ${
                            isPlaying ? "animate-[spin_2.5s_linear_infinite]" : ""
                          }`}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#101217] border-2 border-white/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#FFE500]/60" />
                          </div>
                          {/* Spokes */}
                          <div className="absolute w-full h-1 bg-[#3A4252] pointer-events-none" />
                          <div className="absolute h-full w-1 bg-[#3A4252] pointer-events-none" />
                        </div>
                        <span className="text-[9px] text-[#A4ACB9] mt-1.5 font-mono font-bold uppercase">SUPPLY REEL</span>
                      </div>

                      {/* Right Spool (Take-up) */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#1E222B] border-4 border-[#3A4252] flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.8)] ${
                            isPlaying ? "animate-[spin_2.5s_linear_infinite]" : ""
                          }`}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#101217] border-2 border-white/20 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-[#FFE500]/60" />
                          </div>
                          <div className="absolute w-full h-1 bg-[#3A4252] pointer-events-none" />
                          <div className="absolute h-full w-1 bg-[#3A4252] pointer-events-none" />
                        </div>
                        <span className="text-[9px] text-[#A4ACB9] mt-1.5 font-mono font-bold uppercase">TAKE-UP REEL</span>
                      </div>
                    </div>

                    {/* Amber LED Tape Counter HUD */}
                    <div className="mt-3 text-center relative z-10">
                      <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#0A0C10] border-2 border-black px-3 py-1 font-mono text-[11px] sm:text-xs shadow-[2px_2px_0px_#000]">
                        <span className="text-[#888] hidden sm:inline">TAPE COUNTER:</span>
                        <span className="text-[#FFE500] font-black tracking-widest text-xs sm:text-sm">
                          {formatTime(playbackSec)} / {activeTrack.duration}
                        </span>
                        <span className="text-[#FFE500] font-black">[{activeTrack.bpm} BPM]</span>
                      </div>
                    </div>
                  </div>

                  {/* NOW PLAYING TRACK STRIP */}
                  <div className="bg-[#0F1116] border-2 border-black p-3.5 flex flex-wrap items-center justify-between gap-3 font-mono shadow-[2px_2px_0px_#000]">
                    <div>
                      <div className="text-[10px] text-[#FFE500] font-bold uppercase">
                        NOW PLAYING • TRACK #{activeTrack.id} OF 6
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                        {activeTrack.title}
                      </div>
                      <div className="text-xs text-[#8E95A5] mt-0.5">
                        {activeTrack.story}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#1A1D24] text-[#FFE500] border border-black px-2 py-0.5 text-[11px] font-bold uppercase shadow-[2px_2px_0px_#000]">
                        {activeTrack.energy}
                      </span>
                      <button
                        onClick={() => setLyricsOpen(!lyricsOpen)}
                        className="bg-[#22252D] hover:bg-[#2C303A] text-white px-3 py-1.5 text-xs font-bold border border-black flex items-center gap-1.5 transition-colors cursor-pointer shadow-[2px_2px_0px_#000]"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#FFE500]" />
                        {lyricsOpen ? "Tutup Lirik" : "Baca Lirik"}
                      </button>
                    </div>
                  </div>

                  {/* NATIVE HTML5 AUDIO ELEMENT */}
                  <audio
                    ref={audioRef}
                    src={activeTrack.audioSrc}
                    onTimeUpdate={() => {
                      if (audioRef.current) {
                        setPlaybackSec(Math.floor(audioRef.current.currentTime));
                      }
                    }}
                    onEnded={handleNextTrack}
                    preload="auto"
                  />

                  {/* MONOCHROME SPECTRUM EQUALIZER BARS & NORMAL SEEK BAR */}
                  <div className="mt-4 space-y-1.5">
                    {/* Uniform Spectrum Bars */}
                    <div className="flex items-end gap-1 h-5 px-0.5" aria-hidden="true">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(bar => {
                        const height = isPlaying
                          ? `${Math.max(20, ((bar * 23 + playbackSec * 29) % 80) + 20)}%`
                          : "15%";
                        return (
                          <div
                            key={bar}
                            className={`flex-1 transition-all duration-150 ${
                              isPlaying ? "bg-[#FFE500]" : "bg-[#2A2E39]"
                            }`}
                            style={{ height }}
                          />
                        );
                      })}
                    </div>

                    {/* Normal Progress / Seek Bar with Scrubber */}
                    <div
                      className="relative w-full bg-[#1A1D24] h-3.5 border-2 border-black cursor-pointer shadow-inner group select-none"
                      onClick={e => {
                        if (!audioRef.current) return;
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newPct = Math.max(0, Math.min(1, clickX / rect.width));
                        const targetSec = newPct * activeTrack.durationSec;
                        audioRef.current.currentTime = targetSec;
                        setPlaybackSec(Math.floor(targetSec));
                      }}
                      title="Klik untuk seek posisi lagu"
                      role="progressbar"
                      aria-valuenow={playbackSec}
                      aria-valuemin={0}
                      aria-valuemax={activeTrack.durationSec}
                    >
                      {/* Fill Bar Solid Yellow */}
                      <div
                        className="bg-[#FFE500] h-full transition-all duration-100 relative pointer-events-none"
                        style={{
                          width: `${Math.min(100, (playbackSec / activeTrack.durationSec) * 100)}%`
                        }}
                      >
                        {/* Scrubber Thumb Indicator */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-5 bg-white border-2 border-black shadow-[1px_1px_0px_#000] group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    {/* Time Counter Below Seek Bar */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#8E95A5] px-0.5">
                      <span>{formatTime(playbackSec)}</span>
                      <span>{activeTrack.duration}</span>
                    </div>
                  </div>

                  {/* HEAVY TACTILE TRANSPORT BUTTONS & NORMAL VOLUME SLIDER */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-black/80">
                    {/* Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                      <button
                        onClick={handlePrevTrack}
                        className="bg-[#2B2E38] hover:bg-[#383C48] active:bg-[#1E2027] text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none transition-transform cursor-pointer"
                        title="Track Sebelumnya"
                        aria-label="Previous track"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>

                      <button
                        onClick={togglePlayPause}
                        className={`flex-1 sm:flex-initial px-6 sm:px-9 py-3 min-h-[44px] font-mono font-black text-sm uppercase tracking-wider border-2 border-black flex items-center justify-center gap-2 transition-all active:translate-y-0.5 active:shadow-none cursor-pointer ${
                          isPlaying
                            ? "bg-[#101217] text-[#FFE500] border-[#FFE500] shadow-[4px_4px_0px_#000]"
                            : "bg-[#FFE500] text-black shadow-[4px_4px_0px_#000]"
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-4 h-4 fill-current" /> STOP TAPE
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-current" /> PLAY TAPE
                          </>
                        )}
                      </button>

                      <button
                        onClick={handleNextTrack}
                        className="bg-[#2B2E38] hover:bg-[#383C48] active:bg-[#1E2027] text-white p-3 min-w-[44px] min-h-[44px] flex items-center justify-center border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none transition-transform cursor-pointer"
                        title="Track Selanjutnya"
                        aria-label="Next track"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Volume Slider & Mute Toggle */}
                    <div className="flex items-center gap-2.5 bg-[#14161C] px-3 py-2 border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-mono w-full sm:w-auto justify-between sm:justify-start">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-[#A4ACB9] hover:text-[#FFE500] transition-colors cursor-pointer"
                        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                        title={isMuted ? "Unmute" : "Mute"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-[#FFE500]" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={e => {
                          const val = parseFloat(e.target.value);
                          setVolume(val);
                          if (isMuted && val > 0) setIsMuted(false);
                        }}
                        className="w-24 h-2 bg-[#22242B] accent-[#FFE500] rounded-none cursor-pointer"
                        aria-label="Volume slider"
                      />
                      <span className="text-[11px] font-bold text-[#A4ACB9] w-9 text-right tabular-nums">
                        {isMuted ? "0%" : `${Math.round(volume * 100)}%`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LYRICS DRAWER ACCORDION */}
                {lyricsOpen && (
                  <div className="mt-4 pt-4 border-t-2 border-dashed border-[#444] animate-fadeIn">
                    <div className="bg-[#0C0D11] border-2 border-black p-4 font-mono text-xs shadow-[3px_3px_0px_#000]">
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-[#222]">
                        <span className="text-[#FFE500] font-black uppercase flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-[#FFE500]" /> Lirik: {activeTrack.title}
                        </span>
                        <span className="text-[10px] text-[#FFE500] font-bold">
                          {activeTrack.sourceType === "live" ? "🔴 LIVE SESSION" : "⚡ STUDIO MASTER"}
                        </span>
                      </div>
                      <pre className="font-mono text-[#D4D8E2] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto text-xs">
                        {activeTrack.lyrics}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN (5 COLS): COMPACT PUNK STAGE & PLAYLIST */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/* COMPACT PUNK STAGE: DUAL VU METERS + SKULL MASCOT */}
                <div className="bg-[#101217] border-2 border-[#2A2E39] p-3 sm:p-4 shadow-inner relative overflow-hidden">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#2A2E39]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFE500]" />
                      <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                        LIVE STAGE MONITOR
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#A4ACB9]">
                      <span className="bg-black px-2 py-0.5 border border-[#333]">192KBPS MASTER</span>
                    </div>
                  </div>

                  {/* Stage row: Left VU + Center Skull + Right VU */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col items-center shrink-0">
                      <AnalogVUMeter channel="L" isPlaying={isPlaying} level={vuLevelLeft} />
                      <span className="text-[8px] font-mono text-[#888] mt-1 font-bold">CH L</span>
                    </div>

                    <div className="flex-1 flex justify-center">
                      <PunkSkullWithMic
                        isPlaying={isPlaying}
                        bpm={activeTrack.bpm}
                        currentTrackTitle={activeTrack.title}
                      />
                    </div>

                    <div className="flex flex-col items-center shrink-0">
                      <AnalogVUMeter channel="R" isPlaying={isPlaying} level={vuLevelRight} />
                      <span className="text-[8px] font-mono text-[#888] mt-1 font-bold">CH R</span>
                    </div>
                  </div>
                </div>

                {/* TRACKLIST SELECTOR */}
                <div className="bg-[#14161C] border-2 border-black p-3 sm:p-4 shadow-inner flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2.5 text-xs font-mono font-bold text-[#A4ACB9]">
                      <span className="text-white">PILIH LAGU ({TRACKS.length} TRACKS):</span>
                      <a
                        href="https://sillynvalley.bandcamp.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FFE500] hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <ExternalLink className="w-3 h-3" /> Bandcamp Resmi
                      </a>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {TRACKS.map((t, idx) => {
                        const isSelected = idx === currentTrackIndex;
                        return (
                          <button
                            key={t.id}
                            onClick={() => {
                              setCurrentTrackIndex(idx);
                              setPlaybackSec(0);
                              setIsPlaying(true);
                            }}
                            className={`p-2.5 text-left font-mono border-2 transition-all flex items-center justify-between cursor-pointer ${
                              isSelected
                                ? "bg-[#FFE500] text-black border-black shadow-[3px_3px_0px_#000]"
                                : "bg-[#1A1D24] text-[#A4ACB9] border-black hover:border-[#FFE500] hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="font-black text-xs">0{t.id}.</span>
                              <span className="font-black text-xs sm:text-sm uppercase tracking-tight truncate">
                                {t.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold shrink-0 ml-2">
                              <span>{t.duration}</span>
                              <span className={`px-1.5 py-0.5 text-[9px] ${isSelected && isPlaying ? "bg-black text-[#FFE500]" : "bg-black/40 text-[#BBB]"}`}>
                                {isSelected && isPlaying ? "▶ PLAYING" : `${t.bpm} BPM`}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: MANIFESTO & PHILOSOPHY (TYPEWRITER ESSAY) ──────────── */}
      <section id="manifesto" className="py-20 border-b-4 border-black bg-[#F5F2EB] relative overflow-hidden">
        {/* Circular Seal in Manifesto */}
        <div className="hidden lg:flex absolute -top-4 -right-4 w-28 h-28 rounded-full border-3 border-dashed border-black bg-[#D90429] text-white items-center justify-center -rotate-6 shadow-[5px_5px_0px_#000] z-20 pointer-events-none select-none">
          <div className="text-[9px] font-black uppercase text-center leading-tight tracking-widest px-1">
            ★ NO GATEKEEPING ★<br />100% DIY<br />PUNK ETHOS
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#D90429] text-white px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                <Flame className="w-3.5 h-3.5" /> SURAT TERBUKA & MANIFESTO
              </div>

              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight text-black">
                Band Punk Tapi <br />
                <span className="inline-block bg-[#FFE500] text-black px-2 border-2 border-black shadow-[3px_3px_0px_#000] cursor-default">
                  Kok Ngonten!?
                </span>
              </h2>

              <div className="space-y-4 text-black text-sm sm:text-base leading-relaxed bg-white border-3 border-black p-6 shadow-[6px_6px_0px_#0D0D0D] hover:shadow-[8px_8px_0px_#FFE500] transition-shadow relative">
                <DuctTape className="-top-3 left-10 w-20 -rotate-2" />
                <p>
                  Pertanyaan ini paling sering dilempar: <em className="font-bold">&quot;Katanya band punk rock, tapi kok rajin bikin reels, ngonten TikTok, dan aktif di algoritma? Kenapa nggak sembunyi di gorong-gorong aja?&quot;</em>
                </p>
                <p>
                  Bagi <strong>Silly N Valley</strong>, etos punk itu tentang <strong>kejujuran, kemandirian (DIY), dan perlawanan terhadap elitisme</strong>. Punk bukan aturan kolot tentang apa yang &quot;boleh&quot; dan &quot;nggak boleh&quot; dilakukan menurut gatekeeper scene lama.
                </p>
                <p>
                  Di zaman di mana media sosial dipenuhi kepalsuan dan toxic comparison, kami membajak platform itu untuk menyebarkan pesan positif: <strong>bergerak, jangan menyerah, cintai scene kotamu, dan jaga ruang aman bersama</strong>.
                </p>
              </div>

              {/* Quote Sticker */}
              <div className="bg-[#0D0D0D] text-white border-2 border-black p-5 shadow-[5px_5px_0px_#FFE500] relative text-sm">
                <div className="font-bold italic">
                  &quot;Kami bikin konten bukan demi jadi selebriti, tapi supaya anak muda Tangerang tahu kalau mereka punya rumah dan distorsi yang siap merangkul mereka kapan saja.&quot;
                </div>
                <div className="mt-2 text-[#FFE500] text-xs font-black uppercase flex items-center justify-between">
                  <span>(Silly N Valley Official Statement)</span>
                  <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping" />
                </div>
              </div>
            </div>

            {/* Right Bento Grid of Core Values */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Safe Space */}
              <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 -rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#D90429] transition-all">
                <DuctTape className="-top-3 right-6 w-14 rotate-6" />
                <div className="w-10 h-10 bg-[#D90429] text-white border-2 border-black flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black uppercase text-black tracking-tight">
                  Ruang Aman (Safe Space)
                </h3>
                <p className="text-xs text-[#444] leading-normal font-mono">
                  Zero tolerance terhadap pelecehan seksual, kekerasan fisik, dan maskulinitas beracun di moshpit. Semua orang berhak pogo tanpa rasa takut.
                </p>
              </div>

              {/* Card 2: DIY Culture */}
              <div className="bg-[#FFE500] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all">
                <DuctTape className="-top-3 left-6 w-14 -rotate-3" color="grey" />
                <div className="w-10 h-10 bg-black text-[#FFE500] border-2 border-black flex items-center justify-center font-black">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black uppercase text-black tracking-tight">
                  DIY Culture & Swadaya
                </h3>
                <p className="text-xs text-black leading-normal font-mono font-bold">
                  Mulai dari produksi fisik kaset pita, desain merch, hingga showcase mandiri &apos;Latihan Di Lihatin&apos;, kami mengorganisirnya secara swadaya.
                </p>
              </div>

              {/* Card 3: High Energy Motivation */}
              <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#FFE500] transition-all">
                <div className="w-10 h-10 bg-[#FFE500] text-black border-2 border-black flex items-center justify-center font-black">
                  <Flame className="w-5 h-5 text-[#D90429]" />
                </div>
                <h3 className="text-base font-black uppercase text-black tracking-tight">
                  Highly Motivated
                </h3>
                <p className="text-xs text-[#444] leading-normal font-mono">
                  Punk yang tidak cuma mengeluh, tapi memicu tindakan nyata. Melawan burnout dan apatisme harian dengan riff cepat dan optimisme keras kepala.
                </p>
              </div>

              {/* Card 4: Tangerang Pride */}
              <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 -rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#D90429] transition-all">
                <div className="w-10 h-10 bg-black text-white border-2 border-black flex items-center justify-center font-black">
                  <MapPin className="w-5 h-5 text-[#FFE500]" />
                </div>
                <h3 className="text-base font-black uppercase text-black tracking-tight">
                  Tangerang Hyper-Local
                </h3>
                <p className="text-xs text-[#444] leading-normal font-mono">
                  Menghidupkan ekosistem dan venue kota sendiri. Kami percaya pergerakan tidak harus selalu berpusat di Jakarta untuk bisa berdampak luas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: GIGS FLYER WALL (PASTED POSTER BOARD) ─────────────── */}
      <section id="gigs" className="py-20 border-b-4 border-black bg-[#DDD7CB] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0D0D0D] text-[#FFE500] px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#D90429] mb-2">
                <Calendar className="w-3.5 h-3.5" /> FLYER WALL & PANGGUNG
              </div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
                Gigs & Flyer Wall
              </h2>
              <p className="text-[#444] text-sm mt-1 font-bold">
                Jejak poster gigs fotokopi dinding, showcase mandiri, dan panggung festival Silly N Valley.
              </p>
            </div>
            <a
              href="https://wa.me/6282216387253?text=Halo%20Silly%20N%20Valley!%20Mau%20ajak%20manggung%20di%20kota%20kami."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D90429] hover:bg-[#ba0323] text-white px-5 py-3 font-mono font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2 self-start md:self-auto hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Zap className="w-4 h-4 fill-white" /> Ajak Manggung di Kotamu
            </a>
          </div>

          {/* Flyers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GIGS_TIMELINE.map((gig, idx) => (
              <div
                key={gig.id}
                className={`bg-white border-3 border-black p-6 shadow-[7px_7px_0px_#0D0D0D] relative flex flex-col justify-between group hover:rotate-0 hover:scale-[1.01] hover:shadow-[10px_10px_0px_#D90429] transition-all duration-300 ${
                  idx % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                {/* Duct Tape on top edges */}
                <DuctTape
                  className="-top-3 left-12 w-20 -rotate-3"
                  color={idx % 2 === 0 ? "tan" : "grey"}
                />

                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
                    <span className="bg-[#D90429] text-white px-2 py-0.5 font-black uppercase border border-black flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      {gig.category}
                    </span>
                    <span className="text-black font-black flex items-center gap-1 bg-[#FFE500] px-2 py-0.5 border border-black">
                      <Clock className="w-3.5 h-3.5" /> {gig.dateStr}
                    </span>
                  </div>

                  {/* Flyer Visual Preview Thumbnail */}
                  <div className="aspect-16/9 bg-black overflow-hidden border-2 border-black mb-4 relative">
                    <img
                      src={gig.photoSrc}
                      alt={gig.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 contrast-110"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 border border-white uppercase">
                      {gig.highlightBadge}
                    </div>
                  </div>

                  {/* Title & Venue */}
                  <h3 className="text-2xl font-black uppercase text-black group-hover:text-[#D90429] transition-colors leading-tight">
                    {gig.title}
                  </h3>

                  <div className="mt-2 space-y-0.5 text-xs text-[#555]">
                    <div className="flex items-center gap-1.5 text-black font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#D90429]" /> {gig.venue}
                    </div>
                    <div className="text-[11px] pl-5">{gig.location}</div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-[#333] leading-relaxed font-mono">
                    {gig.desc}
                  </p>
                </div>

                {/* Footer of Gig Card */}
                <div className="mt-6 pt-3 border-t-2 border-dashed border-black flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-[#D90429] font-black text-[11px]">
                    VIBE: {gig.vibe}
                  </div>
                  {gig.collab && (
                    <div className="text-[#555] text-[11px] font-bold">
                      Collab: <span className="text-black font-black">{gig.collab}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>


          {/* Interactive Showcase Box for HALA Koffie */}
          <div className="mt-10 bg-[#FFE500] border-3 border-black p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_#0D0D0D] relative">
            <DuctTape className="-top-3 right-16 w-24 rotate-2" />
            <div className="space-y-2 max-w-2xl text-black">
              <span className="bg-black text-[#FFE500] text-[10px] font-black px-2 py-0.5 uppercase border border-black">
                SHOWCASE RESIDENCY MANDIRI
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-black leading-tight">
                Mau Ikutan Sing-Along di &apos;Latihan Di Lihatin&apos;?
              </h3>
              <p className="text-xs sm:text-sm text-black font-bold font-mono">
                Acara rutin di HALA Koffie Tangerang selalu gratis tanpa tiket. Pantau info jadwal sesi berikutnya langsung di Instagram stories @silly.n.valley!
              </p>
            </div>
            <a
              href="https://instagram.com/silly.n.valley"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-[#222] text-[#FFE500] px-6 py-3 font-black text-xs uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#D90429] shrink-0 flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4 text-[#FFE500]" /> Cek IG @silly.n.valley
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: MERCHANDISE DISTRO STALLS ──────────────────────────── */}
      <section id="merch" className="py-20 border-b-4 border-black bg-[#EAE5DA] relative overflow-hidden">
        {/* Circular Seal in Merch */}
        <div className="hidden md:flex absolute top-6 right-10 w-28 h-28 rounded-full border-3 border-dashed border-black bg-[#FFE500] items-center justify-center rotate-6 shadow-[5px_5px_0px_#000] z-20 pointer-events-none select-none">
          <div className="text-[9px] font-black uppercase text-center leading-tight tracking-wider text-black">
            ⚡ MERCH DROP ⚡<br />OFFICIAL DIY<br />DISTRO
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#FFE500] text-black px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
              <ShoppingBag className="w-3.5 h-3.5" /> DISTRO PUNK UNDERGROUND
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
              Kaset Pita & Merch Drop
            </h2>
            <p className="text-[#555] text-xs sm:text-sm font-mono font-bold">
              Semua hasil penjualan dialokasikan mandiri untuk pembiayaan rekaman, produksi kaset analog, dan operasional gigs gratis.
            </p>
          </div>

          {/* Merch Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MERCH_CATALOG.map((item, mIdx) => {
              const currentSize = selectedSizes[item.id] || item.sizes[0];
              return (
                <div
                  key={item.id}
                  className={`bg-white border-3 border-black shadow-[6px_6px_0px_#0D0D0D] hover:shadow-[8px_8px_0px_#00F0FF,-8px_-8px_0px_#FF0055] hover:-translate-y-2 hover:rotate-0 transition-all duration-300 flex flex-col justify-between p-5 relative group ${
                    mIdx % 2 === 0 ? "-rotate-1" : "rotate-1"
                  }`}
                >
                  <DuctTape
                    className="-top-3 left-6 w-16 -rotate-2"
                    color={mIdx % 2 === 0 ? "tan" : "grey"}
                  />

                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute -top-3 right-4 bg-[#FFE500] text-black font-black text-[10px] px-2 py-0.5 uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                      {item.badge}
                    </div>
                  )}

                  <div>
                    {/* Category & Status */}
                    <div className="flex justify-between items-center text-[10px] text-[#777] mb-3 font-bold">
                      <span className="font-mono">{item.category}</span>
                      <span className="text-[#D90429] font-black flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D90429] animate-ping" />
                        {item.stockStatus}
                      </span>
                    </div>

                    {/* Merch Real Photo Frame */}
                    <div className="aspect-square bg-[#D2D2D2] border-2 border-black overflow-hidden relative mb-4">
                      <img
                        src={item.photoSrc}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-2 left-2 bg-[#FFE500] text-black text-[9px] font-black px-1.5 py-0.5 border border-black uppercase">
                        ORIGINAL ITEM
                      </div>
                    </div>

                    {/* Item Name & Price */}
                    <h3 className="text-base sm:text-lg font-black uppercase text-black tracking-tight leading-snug group-hover:text-[#D90429] transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-xl font-black text-[#D90429] font-mono mt-1">
                      {item.formattedPrice}
                    </div>

                    <p className="text-xs text-[#555] mt-2 leading-relaxed">
                      {item.desc}
                    </p>

                    {/* Specs List */}
                    <ul className="mt-3 space-y-1 text-[11px] text-[#444] font-bold">
                      {item.specs.map((sp, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#D90429] shrink-0" />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Size Selector & Order Button */}
                  <div className="mt-6 pt-4 border-t-2 border-dashed border-black space-y-3">
                    {item.sizes.length > 1 && (
                      <div>
                        <label className="block text-[10px] text-[#777] uppercase mb-1 font-black">
                          PILIH UKURAN:
                        </label>
                        <div className="flex gap-1.5 flex-wrap">
                          {item.sizes.map(sz => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() =>
                                setSelectedSizes({
                                  ...selectedSizes,
                                  [item.id]: sz
                                })
                              }
                              className={`px-2 py-1 text-xs font-mono font-bold border-2 transition-colors cursor-pointer ${
                                currentSize === sz
                                  ? "bg-[#FFE500] text-black border-black font-black"
                                  : "bg-white text-black border-black hover:bg-[#F0ECE1]"
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Direct WA Order Button */}

                    <button
                      onClick={() => handleOrderMerch(item)}
                      className="w-full bg-[#D90429] hover:bg-[#ba0323] text-white py-2.5 px-3 font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Beli via WhatsApp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shipping Note */}
          <div className="mt-10 bg-white border-2 border-black p-4 text-xs text-[#555] font-bold flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFE500] text-black px-1.5 py-0.5 border border-black font-black uppercase">
                INFO
              </span>
              <span>Pengiriman dari Kota Tangerang via JNE / J&T / Paxel. Pembayaran transfer BCA / Mandiri / QRIS.</span>
            </div>
            <div className="text-black font-black">
              Admin Hotline: 0822-1638-7253
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: TECHNICAL RIDERS (TYPEWRITER CARBON COPY) ─────────── */}
      <section id="riders" className="py-20 border-b-4 border-black bg-[#F5F2EB] relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#0D0D0D] text-white px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#FFE500]">
              <Sliders className="w-3.5 h-3.5" /> STAGE PLOT & HOSPITALITY
            </div>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
              Technical Riders
            </h2>
            <p className="text-[#555] text-xs sm:text-sm font-mono font-bold">
              Spesifikasi teknis patch 8 channel & kebutuhan logistik demi kelancaran sound check Silly N Valley.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-white border-3 border-black p-1 inline-flex shadow-[4px_4px_0px_#000]">
              <button
                onClick={() => setActiveRiderTab("tech")}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeRiderTab === "tech"
                    ? "bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                    : "text-[#555] hover:text-black"
                }`}
              >
                Channel Input List (8 CH)
              </button>
              <button
                onClick={() => setActiveRiderTab("hospitality")}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeRiderTab === "hospitality"
                    ? "bg-[#FFE500] text-black border-2 border-black shadow-[2px_2px_0px_#000]"
                    : "text-[#555] hover:text-black"
                }`}
              >
                Hospitality & Ruang Tunggu
              </button>
            </div>
          </div>

          {/* Content Document Box */}
          <div className="bg-white border-4 border-black p-6 sm:p-9 shadow-[9px_9px_0px_#0D0D0D] relative">
            <DuctTape className="-top-4 left-10 w-24 -rotate-3" />
            <DuctTape className="-top-4 right-10 w-24 rotate-3" color="grey" />

            {activeRiderTab === "tech" ? (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-black">
                  <div>
                    <h3 className="text-xl font-black uppercase text-black flex items-center">
                      8-Channel Stage Patch List
                      <span className="inline-block w-2.5 h-4 bg-black ml-1.5 animate-pulse align-middle" />
                    </h3>
                    <p className="text-xs text-[#555] font-bold">
                      Setup simpel, bertenaga, cocok untuk panggung cafe, hall, maupun festival outdoor.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyRiderToClipboard}
                      className="bg-white hover:bg-[#F0ECE1] text-black px-3.5 py-2 text-xs font-black uppercase border-2 border-black flex items-center gap-1.5 shadow-[2px_2px_0px_#000] cursor-pointer"
                    >
                      {copiedRider ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#009933]" /> Disalin!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Salin Teks
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadRiderFile}
                      className="bg-[#FFE500] hover:bg-[#ebd300] text-black px-3.5 py-2 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download (.txt)
                    </button>
                  </div>
                </div>

                {/* Table Patch */}
                <div className="overflow-x-auto -mx-2 sm:mx-0">
                  <table className="w-full text-left font-mono text-xs min-w-[520px]">
                    <thead>
                      <tr className="border-b-2 border-black bg-[#EAE5DA] text-black font-black">
                        <th className="p-3">CH</th>
                        <th className="p-3">INSTRUMENT / SOURCE</th>
                        <th className="p-3">MIC / DI BOX</th>
                        <th className="p-3">STAND</th>
                        <th className="p-3">REMARKS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/20 text-black">
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0" />
                          CH 01
                        </td>
                        <td className="p-3 font-bold">Kick Drum</td>
                        <td className="p-3">Shure Beta 52A / AKG D112</td>
                        <td className="p-3">Short Boom</td>
                        <td className="p-3 text-[#666]">Punchy low end</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0 [animation-delay:0.2s]" />
                          CH 02
                        </td>
                        <td className="p-3 font-bold">Snare Drum</td>
                        <td className="p-3">Shure SM57</td>
                        <td className="p-3">Short Boom / Clip</td>
                        <td className="p-3 text-[#666]">Top snare crack</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0 [animation-delay:0.4s]" />
                          CH 03
                        </td>
                        <td className="p-3 font-bold">Hi-Hat / OH</td>
                        <td className="p-3">Shure SM81 / Condenser</td>
                        <td className="p-3">Tall Boom</td>
                        <td className="p-3 text-[#666]">Crisp attack</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0 [animation-delay:0.1s]" />
                          CH 04
                        </td>
                        <td className="p-3 font-bold">Bass Guitar</td>
                        <td className="p-3">DI Box Active / XLR Out Head</td>
                        <td className="p-3">-</td>
                        <td className="p-3 text-[#666]">Direct low-mid grit</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0 [animation-delay:0.3s]" />
                          CH 05
                        </td>
                        <td className="p-3 font-bold">Guitar 1 (Lead/Cab)</td>
                        <td className="p-3">Shure SM57 / Sennheiser e609</td>
                        <td className="p-3">Short Boom</td>
                        <td className="p-3 text-[#666]">Marshall / Peavey Cab</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0 [animation-delay:0.5s]" />
                          CH 06
                        </td>
                        <td className="p-3 font-bold">Guitar 2 (Rhythm)</td>
                        <td className="p-3">Shure SM57</td>
                        <td className="p-3">Short Boom</td>
                        <td className="p-3 text-[#666]">Full distortion wall</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0 [animation-delay:0.25s]" />
                          CH 07
                        </td>
                        <td className="p-3 font-bold">Lead Vocal</td>
                        <td className="p-3">Shure SM58 / Beta 58A</td>
                        <td className="p-3">Straight / Boom</td>
                        <td className="p-3 text-[#666]">High gain, feedback-free</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-black text-[#D90429] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-ping shrink-0 [animation-delay:0.35s]" />
                          CH 08
                        </td>
                        <td className="p-3 font-bold">Backing Vocal</td>
                        <td className="p-3">Shure SM58</td>
                        <td className="p-3">Boom Stand</td>
                        <td className="p-3 text-[#666]">Guitar 2 backing shouts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="sm:hidden text-[10px] text-[#666] font-mono italic mt-1.5">
                  ↔ Geser tabel ke samping untuk melihat detail mic & stands
                </div>

                {/* Electric & Monitoring Note */}
                <div className="bg-[#FAF8F5] border-2 border-black p-4 text-xs space-y-1">
                  <div className="text-black font-black uppercase">KEBUTUHAN MONITOR & LISTRIK:</div>
                  <div>• 3 Unit Foldback Wedge Monitors (Vocal Front, Stage Right, Drum Thrown).</div>
                  <div>• 2 Jalur Colokan Listrik 220V Grounded di dekat pedalboard gitar & bass.</div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black uppercase text-black">
                    Hospitality & Logistics Guide
                  </h3>
                  <p className="text-xs text-[#555] font-bold">
                    Standar keramahan dan fasilitas yang kami butuhkan untuk 5 personil & crew.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-1.5">
                    <div className="text-[#D90429] font-black uppercase flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> RUANG TUNGGU & KEAMANAN
                    </div>
                    <p className="text-[#444] leading-relaxed">
                      Ruang tunggu ber-AC / berventilasi memadai dengan akses aman untuk menyimpan instrumen dan gear sebelum serta sesudah perform.
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-1.5">
                    <div className="text-black font-black uppercase flex items-center gap-2">
                      <Heart className="w-4 h-4 text-[#D90429]" /> KONSUMSI & BEVERAGE
                    </div>
                    <p className="text-[#444] leading-relaxed">
                      2 karton air mineral 600ml (suhu ruang & dingin), buah segar (pisang), dan kopi lokal Tangerang. Makanan berat setelah check sound.
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-1.5">
                    <div className="text-[#D90429] font-black uppercase flex items-center gap-2">
                      <Flame className="w-4 h-4" /> NON-ALCOHOL FRIENDLY
                    </div>
                    <p className="text-[#444] leading-relaxed">
                      Strictly ruang aman dan non-alcohol friendly. Kami memprioritaskan performa prima berenergi tinggi tanpa kewajiban konsumsi alkohol.
                    </p>
                  </div>

                  <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-1.5">
                    <div className="text-black font-black uppercase flex items-center gap-2">
                      <Clock className="w-4 h-4" /> WAKTU SOUNDCHECK
                    </div>
                    <p className="text-[#444] leading-relaxed">
                      Akses panggung minimal 2 jam sebelum open gate / rundown untuk check sound 30 menit demi kualitas audio maksimal.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: CONTACT & BOOKING HOTLINE ─────────────────────────── */}
      <section id="booking" className="py-20 border-b-4 border-black bg-[#EAE5DA] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#D90429] text-white px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000]">
                <Zap className="w-3.5 h-3.5 fill-current" /> DIRECT MANAGEMENT HOTLINE
              </div>

              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black">
                Booking & Kolaborasi
              </h2>

              <p className="text-[#444] text-sm sm:text-base leading-relaxed font-bold">
                Kami siap mengguncang gigs mandiri, pensi kampus, festival musik, showcase cafe, hingga tur lintas kota. Hubungi hotline resmi manajemen di bawah ini.
              </p>

              {/* Direct Info Card */}
              <div className="bg-white border-3 border-black p-5 shadow-[6px_6px_0px_#0D0D0D] space-y-4 text-xs">
                <div>
                  <div className="text-[10px] text-[#777] uppercase font-black">WHATSAPP BOOKING HOTLINE</div>
                  <a
                    href="https://wa.me/6282216387253"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-black text-[#D90429] hover:underline flex items-center gap-2 mt-0.5"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D90429] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D90429]"></span>
                    </span>
                    +62 822-1638-7253 <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <div className="text-[#555] text-[11px] mt-0.5">Respon cepat via pesan WhatsApp</div>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-black">
                  <div className="text-[10px] text-[#777] uppercase font-black">OFFICIAL INSTAGRAM</div>
                  <a
                    href="https://instagram.com/silly.n.valley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-black text-black hover:text-[#D90429] flex items-center gap-1.5 mt-0.5"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#D90429]" /> @silly.n.valley
                  </a>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-black">
                  <div className="text-[10px] text-[#777] uppercase font-black">FOTOGRAFER & ARSIP DOKUMENTASI</div>
                  <a
                    href="https://instagram.com/mqrifisnqini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-black text-black hover:text-[#D90429] flex items-center gap-1.5 mt-0.5"
                  >
                    <InstagramIcon className="w-4 h-4 text-black" /> @mqrifisnqini
                  </a>
                  <div className="text-[#555] text-[11px] mt-0.5">Dokumentasi foto & video gigs resmi</div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#0D0D0D] relative">
                <DuctTape className="-top-3 right-12 w-20 rotate-3" />

                <div className="mb-6 pb-4 border-b-2 border-black">
                  <h3 className="text-2xl font-black uppercase text-black">
                    Formulir Inquiry Manggung
                  </h3>
                  <p className="text-xs text-[#555] mt-1 font-bold">
                    Isi detail acara Anda untuk generate template pesan WhatsApp otomatis langsung ke nomor manajemen Silly N Valley.
                  </p>
                </div>

                <form onSubmit={handleSendBookingInquiry} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black uppercase font-black mb-1">
                        Nama Acara / Penyelenggara:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Tangerang Youth Fest 2024"
                        value={bookingForm.eventName}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, eventName: e.target.value })
                        }
                        className="w-full bg-[#FAF8F5] border-2 border-black p-3 text-black outline-none font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-black uppercase font-black mb-1">
                        Venue & Kota:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: HALA Koffie, Tangerang"
                        value={bookingForm.venueCity}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, venueCity: e.target.value })
                        }
                        className="w-full bg-[#FAF8F5] border-2 border-black p-3 text-black outline-none font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-black uppercase font-black mb-1">
                        Estimasi Tanggal:
                      </label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, date: e.target.value })
                        }
                        className="w-full bg-[#FAF8F5] border-2 border-black p-3 text-black outline-none font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-black uppercase font-black mb-1">
                        Format Event:
                      </label>
                      <select
                        value={bookingForm.format}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, format: e.target.value })
                        }
                        className="w-full bg-[#FAF8F5] border-2 border-black p-3 text-black outline-none font-bold"
                      >
                        <option>Showcase / Gigs Cafe</option>
                        <option>Festival Musik Outdoor</option>
                        <option>Pensi Sekolah / Kampus</option>
                        <option>Showcase Kolektif Mandiri</option>
                        <option>Tur / Luar Kota</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-black uppercase font-black mb-1">
                      Catatan Tambahan / Rundown:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Info sound system, durasi set list, atau pesan khusus..."
                      value={bookingForm.notes}
                      onChange={e =>
                        setBookingForm({ ...bookingForm, notes: e.target.value })
                      }
                      className="w-full bg-[#FAF8F5] border-2 border-black p-3 text-black outline-none resize-none font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFE500] hover:bg-[#ebd300] text-black font-black uppercase text-sm py-3.5 px-4 border-3 border-black shadow-[4px_4px_0px_#D90429] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" /> Kirim Inquiry via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER (FANZINE COLOPHON & BARCODE) ──────────────────────────── */}
      <footer className="bg-[#0D0D0D] text-[#FAF8F5] border-t-4 border-black pt-14 pb-12 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b-2 border-[#333] pb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-1">
                <span className="bg-white text-black px-2 py-0.5 text-2xl font-black uppercase -rotate-1">
                  SILLY
                </span>
                <span className="bg-[#FFE500] text-black px-2 py-0.5 text-2xl font-black uppercase rotate-1">
                  N
                </span>
                <span className="bg-[#D90429] text-white px-2 py-0.5 text-2xl font-black uppercase -rotate-1">
                  VALLEY
                </span>
              </div>
              <div className="text-xs text-[#FFE500] font-black mt-2">
                HIGHLY MOTIVATED PUNK ROCK • KOTA TANGERANG, BANTEN
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/silly.n.valley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black hover:bg-[#FFE500] p-2.5 border-2 border-black transition-colors"
                title="Instagram @silly.n.valley"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6282216387253"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D90429] text-white hover:bg-[#ba0323] p-2.5 border-2 border-black transition-colors"
                title="WhatsApp Hotline"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#888]">
            <div>
              © {new Date().getFullYear()} SILLY N VALLEY. Dibuat dengan etos DIY & kecintaan pada skena lokal Tangerang.
            </div>
            <div className="flex items-center gap-4">
              <a href="#hero" className="hover:text-white transition-colors">
                Kembali ke Atas ↑
              </a>
              <span className="text-[#444]">|</span>
              <span className="text-[#FFE500] font-bold">BAND PUNK TAPI KOK NGONTEN!?</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
