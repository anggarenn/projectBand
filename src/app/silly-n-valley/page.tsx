"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  ShoppingBag,
  MessageCircle,
  Flame,
  ShieldCheck,
  Zap,
  Disc,
  Menu,
  X,
  ArrowUpRight,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Camera
} from "lucide-react";

// === ICONS ===

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

function SpotifyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

// === PUNK UI ACCENTS: TAPE & STAMPS ===

function DuctTape({
  className = "",
  color = "yellow"
}: {
  className?: string;
  color?: "yellow" | "purple" | "cyan" | "tan" | "grey";
}) {
  const bgClass =
    color === "yellow"
      ? "bg-[#D4E627]/85 border-[#AFC213]"
      : color === "purple"
      ? "bg-[#B879AD]/85 border-[#96558C]"
      : color === "cyan"
      ? "bg-[#00BFA5]/85 border-[#009682]"
      : color === "tan"
      ? "bg-[#D8C7A5]/85 border-[#B7A581]"
      : "bg-[#7A8089]/75 border-[#5A6069]";

  return (
    <div
      className={`absolute h-5 border-x border-dashed shadow-xs backdrop-blur-xs pointer-events-none z-30 select-none ${bgClass} ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 8px)"
      }}
    />
  );
}

// === TYPES & DATA ===

interface Track {
  id: number;
  title: string;
  duration: string;
  bpm: number;
  energy: string;
  sourceType: "single" | "live";
  lyrics: string;
  story: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "Berhala-Run!",
    duration: "01:58",
    bpm: 208,
    energy: "HIGH VELOCITY",
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
    bpm: 196,
    energy: "MAX INTENSITY",
    sourceType: "single",
    lyrics: `Merdeka-merdeka tapi mampus!
Tanah surga tak membuat semua mulus
Lihat ibu pertiwi rusak tergerus
Diabaikan dan sengaja tak terurus

Merdeka-merdeka tapi mampus!
Membawa perubahan dengan akal bulus
Laksanakan langkah haram dengan mulus
Istana tempat singgah orang tak becus!

(Maju. bergerak.) Kumpulkan semua nyali
(Maju. bergerak.) Lenyapkan tiang dinasti
(Maju. bergerak.) Jatuhkan bibit tirani
(Maju. bergerak.) Hancurkan dengan berani!`,
    story:
      "6th Single resmi Silly N Valley. Kritik sosial tajam berbalut agresi punk rock cepat mengenai dinamika politik dan realitas jalanan."
  },
  {
    id: 3,
    title: "Sabda Fufufafa (Live)",
    duration: "01:29",
    bpm: 210,
    energy: "CROWD EXPLOSION",
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
    bpm: 195,
    energy: "OVERDRIVE ANTHEM",
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
    bpm: 190,
    energy: "SOLIDARITY RIOT",
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
    bpm: 180,
    energy: "SING-ALONG HYMN",
    sourceType: "live",
    lyrics: `[Hymne Generasi Pinggiran]
Untuk semua kawan yang suaranya selalu dipinggirkan dari meja perundingan elit. Di sini kita berdiri, bernyanyi bersama sampai habis nafas!`,
    story:
      "Penutup epik HALA Live Session. Nomor sing-along bertempo sedang yang menyatukan seluruh penonton di lantai Hala Koffie."
  }
];

interface MerchItem {
  id: string;
  name: string;
  category: "Cassette" | "T-Shirt" | "Bundle";
  price: number;
  formattedPrice: string;
  image: string;
  status: "IN STOCK" | "PRE-ORDER" | "LIMITED";
  description: string;
  sizes?: string[];
}

const MERCH_CATALOG: MerchItem[] = [
  {
    id: "cassette-rantai-reaksi",
    name: "Kaset Pita C-30 'Rantai Reaksi: Abu Tanpa Api'",
    category: "Cassette",
    price: 65000,
    formattedPrice: "Rp 65.000",
    image: "/assets/silly-n-valley/album_cover.jpg",
    status: "LIMITED",
    description:
      "Rilisan fisik kaset analog pita magnetik C-30 Type II High Bias. Dilengkapi cover lipat booklet lirik full artwork & stiker pack DIY. Terbatas 100 copy.",
    sizes: ["One Size"]
  },
  {
    id: "tshirt-rantai-reaksi",
    name: "Heavyweight T-Shirt 'Rantai Reaksi'",
    category: "T-Shirt",
    price: 150000,
    formattedPrice: "Rp 150.000",
    image: "/assets/silly-n-valley/merch_tshirt_rantai_reaksi.jpg",
    status: "IN STOCK",
    description:
      "Kaos katun heavyweight 24s combed tebal tanpa jahitan samping. Sablon plastisol ink vintage wash dengan artwork album cover Silly N Valley.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "tshirt-berhala-run",
    name: "T-Shirt 'Berhala-Run!' Feat. Tabraklari",
    category: "T-Shirt",
    price: 150000,
    formattedPrice: "Rp 150.000",
    image: "/assets/silly-n-valley/merch_tshirt_berhala_run.jpg",
    status: "IN STOCK",
    description:
      "Tribute collab single edisi terbatas. Grafis speed-punk tengkorak berlari dengan tinta neon discharge glow-in-the-dark.",
    sizes: ["M", "L", "XL", "XXL"]
  },
  {
    id: "bundle-rantai-reaksi",
    name: "Official Fanzine & Sticker Pack Bundle",
    category: "Bundle",
    price: 35000,
    formattedPrice: "Rp 35.000",
    image: "/assets/silly-n-valley/merch_bundle.jpg",
    status: "IN STOCK",
    description:
      "Zine fisik cetak xerox 16 halaman berisi dokumentasi gigs eksklusif @mqrifisnqini, esai manifesto, 5 die-cut vinyl stickers, dan patch kanvas sablon.",
    sizes: ["One Size"]
  }
];

interface PhotoItem {
  id: number;
  src: string;
  caption: string;
  category: "stage" | "crowd" | "gear" | "backstage";
  timestamp: string;
}

const INSTAGRAM_PHOTOS: PhotoItem[] = [
  {
    id: 1,
    src: "/assets/silly-n-valley/photo_1.jpg",
    caption: "Distorsi power-chord dan teriakan tanpa kompromi di panggung mandiri HALA Koffie.",
    category: "stage",
    timestamp: "OKTOBER 2024"
  },
  {
    id: 2,
    src: "/assets/silly-n-valley/photo_2.jpg",
    caption: "Circle sing-along! Tak ada sekat antara band dan kawan pogo di depan panggung.",
    category: "crowd",
    timestamp: "SEPTEMBER 2024"
  },
  {
    id: 3,
    src: "/assets/silly-n-valley/photo_3.jpg",
    caption: "Check sound instrumen dan ampli tabung sebelum gemuruh distorsi dinyalakan.",
    category: "stage",
    timestamp: "AGUSTUS 2024"
  },
  {
    id: 4,
    src: "/assets/silly-n-valley/photo_4.jpg",
    caption: "Momen intim backstage: nafas sejenak, ngopi lokal, dan obrolan kawan pergerakan.",
    category: "backstage",
    timestamp: "JULI 2024"
  },
  {
    id: 5,
    src: "/assets/silly-n-valley/photo_5.jpg",
    caption: "Rilisan fisik kaset pita C-30 'Rantai Reaksi: Abu Tanpa Api' siap didistribusikan ke distro.",
    category: "gear",
    timestamp: "JUNI 2024"
  },
  {
    id: 6,
    src: "/assets/silly-n-valley/photo_6.jpg",
    caption: "Keringat, desak-desakan, dan energi positif murni tanpa kekerasan di tengah moshpit.",
    category: "crowd",
    timestamp: "MEI 2024"
  },
  {
    id: 7,
    src: "/assets/silly-n-valley/photo_7.jpg",
    caption: "Lead vocal take-over: meneriakkan lirik 'Merdeka Tapi Mampus' bersama massa.",
    category: "stage",
    timestamp: "APRIL 2024"
  },
  {
    id: 8,
    src: "/assets/silly-n-valley/photo_8.jpg",
    caption: "Rundown flyer fotokopian manual yang ditempel di dinding venue acara.",
    category: "gear",
    timestamp: "MARET 2024"
  },
  {
    id: 9,
    src: "/assets/silly-n-valley/photo_9.jpg",
    caption: "Luthfi Tank Grunge (Tabraklari) berbagi mic untuk track Berhala-Run!",
    category: "stage",
    timestamp: "FEBRUARI 2024"
  },
  {
    id: 10,
    src: "/assets/silly-n-valley/photo_10.jpg",
    caption: "Persiapan merch booth DIY: kaset, kaos sablon tangan, dan booklet zine.",
    category: "backstage",
    timestamp: "JANUARI 2024"
  },
  {
    id: 11,
    src: "/assets/silly-n-valley/photo_11.jpg",
    caption: "Panggung Authenticity Soundroom Tangerang. Suara punk menembus batas skena.",
    category: "stage",
    timestamp: "DESEMBER 2023"
  },
  {
    id: 12,
    src: "/assets/silly-n-valley/photo_12.jpg",
    caption: "Grup foto bersama seluruh audiens & kru seusai showcase berdarah-darah tapi bahagia.",
    category: "crowd",
    timestamp: "NOVEMBER 2023"
  }
];

interface GigEvent {
  id: number;
  title: string;
  date: string;
  venue: string;
  city: string;
  category: "SHOWCASE MANDIRI" | "FESTIVAL" | "PENSI" | "KOMPETISI";
  vibe: string;
  photoSrc: string;
  collab?: string;
}

const GIGS_TIMELINE: GigEvent[] = [
  {
    id: 1,
    title: "Latihan Di Lihatin (Vol. 03)",
    date: "SABTU, 16 NOVEMBER 2024",
    venue: "HALA Koffie Space, Cipondoh",
    city: "Kota Tangerang",
    category: "SHOWCASE MANDIRI",
    vibe: "Showcase rutin mandiri tanpa tiket, full sing-along dan circle karaoke gratis.",
    photoSrc: "/assets/silly-n-valley/photo_1.jpg",
    collab: "@halakoffie"
  },
  {
    id: 2,
    title: "Gigsgoks Fest: Solidaritas Jalanan",
    date: "MINGGU, 27 OKTOBER 2024",
    venue: "Tangerang Underground Warehouse",
    city: "Tangerang",
    category: "FESTIVAL",
    vibe: "Festival kolektif 12 band hardcore/punk Tangerang Raya.",
    photoSrc: "/assets/silly-n-valley/photo_6.jpg",
    collab: "@gigsgoks"
  },
  {
    id: 3,
    title: "D-Beat Distortion Night",
    date: "JUMAT, 13 SEPTEMBER 2024",
    venue: "Rooftop Kolektif Pasar Lama",
    city: "Kota Tangerang",
    category: "SHOWCASE MANDIRI",
    vibe: "Rilis perdana single 'Berhala-Run!' bersama Tabraklari.",
    photoSrc: "/assets/silly-n-valley/photo_9.jpg",
    collab: "@tabraklari"
  },
  {
    id: 4,
    title: "Authenticity Soundroom Showcase",
    date: "SABTU, 20 JULI 2024",
    venue: "Creative Hub Stage",
    city: "Tangerang",
    category: "KOMPETISI",
    vibe: "Showcase kompetitif berskala nasional, membuktikan taji punk Tangerang.",
    photoSrc: "/assets/silly-n-valley/photo_11.jpg",
    collab: "@authenticity_id"
  }
];

// === MAIN COMPONENT ===

export default function SillyNValleyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Gallery & Lightbox states
  const [galleryCategory, setGalleryCategory] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Merch selector states
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "bundle-rantai-reaksi": "One Size",
    "tshirt-rantai-reaksi": "L",
    "tshirt-berhala-run": "XL",
    "cassette-rantai-reaksi": "One Size"
  });

  // Spotify active track lyrics toggle
  const [openSpotifyTrackLyrics, setOpenSpotifyTrackLyrics] = useState<number | null>(null);

  // Booking quick form states
  const [bookingForm, setBookingForm] = useState({
    eventName: "",
    venueCity: "",
    date: "",
    format: "Showcase / Gigs Cafe",
    notes: ""
  });

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
    window.open(`https://wa.me/6281299095137?text=${text}`, "_blank");
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
        bookingForm.notes || "Mohon kirimkan info availability jadwal manggung."
      }\n\nMohon feedback-nya. Cheers! #HighlyMotivatedPunk`
    );
    window.open(`https://wa.me/6281299095137?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#1A062B] text-[#F3EFE0] font-mono selection:bg-[#D4E627] selection:text-[#12041D] overflow-x-hidden relative">
      {/* HALFTONE PAPER BACKGROUND OVERLAY */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage:
            "radial-gradient(#D4E627 0.6px, transparent 0.6px), radial-gradient(#6B249E 0.6px, #1A062B 0.6px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px"
        }}
      />

      {/* TOP TICKER NEWSLETTER STRIP */}
      <div className="bg-[#10031B] text-[#D4E627] py-2 px-4 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-between border-b-2 border-[#D4E627] z-50 relative select-none overflow-hidden">
        <div className="flex items-center space-x-2 shrink-0 pr-4">
          <span className="inline-block w-2.5 h-2.5 bg-[#00BFA5] rounded-full animate-ping" />
          <span className="bg-[#00BFA5] text-[#12041D] px-1.5 py-0.2 text-[10px] font-bold">
            ZINE ISSUE #04
          </span>
          <span className="hidden sm:inline text-[#F3EFE0]">TANGERANG DIY PUNK SCENE</span>
        </div>
        <div className="whitespace-nowrap overflow-hidden flex-1 relative text-[11px] sm:text-xs">
          <div className="inline-block animate-[marquee_22s_linear_infinite]">
            +++ SILLY N VALLEY +++ BAND PUNK TAPI KOK NGONTEN!? +++ OFFICIAL MERCH DROP & CASSETTE C-30 OUT NOW +++ FULL STREAMING DI SPOTIFY +++ SHOWCASE RESIDENCY @ HALA KOFFIE +++ ZERO VIOLENCE SAFE SPACE +++ DOKUMENTASI RESMI @MQRIFISNQINI +++ BOOKING WA: +62 812-9909-5137 +++
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-3 shrink-0 pl-4 text-xs">
          <a
            href="https://open.spotify.com/search/Silly%20N%20Valley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 font-bold text-[#1DB954] hover:text-[#1ed760]"
          >
            <SpotifyIcon className="w-3.5 h-3.5 text-[#1DB954]" /> Spotify
          </a>
          <span className="text-[#555]">|</span>
          <a
            href="https://instagram.com/silly.n.valley"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 font-bold text-[#F3EFE0] hover:text-[#D4E627]"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-[#D4E627]" /> @silly.n.valley
          </a>
        </div>
      </div>

      {/* MAIN NAV HEADER */}
      <header className="sticky top-0 z-40 bg-[#230B3A]/95 backdrop-blur-md border-b-3 border-black shadow-[0_4px_0px_#D4E627]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Brand Logo (From user attachment IMG_2914.PNG) */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center select-none group py-1">
              <img
                src="/assets/silly-n-valley/logo.png"
                alt="Silly N Valley Logo"
                className="h-14 sm:h-18 lg:h-20 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)]"
              />
            </Link>
          </div>

          {/* Desktop Nav Links (Sequence: Merch Drop, About Us, Galeri Zine, Listen to Us, Gigs Wall, Booking) */}
          <nav className="hidden md:flex items-center space-x-5 text-xs font-black uppercase tracking-wider">
            <a
              href="#merch"
              className="text-[#F3EFE0] hover:text-[#D4E627] transition-colors flex items-center gap-1"
            >
              <ShoppingBag className="w-4 h-4 text-[#00BFA5]" /> Merch Drop
            </a>
            <a
              href="#about"
              className="text-[#F3EFE0] hover:text-[#D4E627] transition-colors flex items-center gap-1"
            >
              <Flame className="w-4 h-4 text-[#D4E627]" /> About Us
            </a>
            <a
              href="#photos"
              className="text-[#F3EFE0] hover:text-[#D4E627] transition-colors flex items-center gap-1"
            >
              <Camera className="w-4 h-4 text-[#D4E627]" /> Galeri Zine
            </a>
            <a
              href="#listen"
              className="text-[#1DB954] hover:text-[#1ed760] transition-colors flex items-center gap-1"
            >
              <SpotifyIcon className="w-4 h-4 text-[#1DB954]" /> Listen to Us
            </a>
            <a
              href="#gigs"
              className="text-[#F3EFE0] hover:text-[#D4E627] transition-colors flex items-center gap-1"
            >
              <Calendar className="w-4 h-4 text-[#D4E627]" /> Gigs Wall
            </a>
            <a
              href="#booking"
              className="text-[#F3EFE0] hover:text-[#D4E627] transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-4 h-4 text-[#B879AD]" /> Booking
            </a>
          </nav>

          {/* Action Button: Booking Hotline */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="https://wa.me/6281299095137?text=Halo%20Silly%20N%20Valley!%20Mau%20booking%20manggung%20gigs."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4E627] hover:bg-[#c2d41e] text-[#12041D] px-4 py-2 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#00BFA5] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" /> Booking Gigs
            </a>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D4E627] bg-[#1A062B] border-2 border-[#D4E627] shadow-[2px_2px_0px_#000]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#230B3A] border-b-3 border-[#D4E627] px-6 py-5 text-sm uppercase space-y-4">
            <a
              href="#merch"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-[#F3EFE0] hover:text-[#D4E627] flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#00BFA5]" /> Official Merch Drop
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-[#F3EFE0] hover:text-[#D4E627] flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-[#D4E627]" /> About Us: Band Punk Kok Ngonten!?
            </a>
            <a
              href="#photos"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-[#F3EFE0] hover:text-[#D4E627] flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-[#D4E627]" /> Galeri Zine & Polaroid (12 Foto)
            </a>
            <a
              href="#listen"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-[#1DB954] hover:text-[#1ed760] flex items-center gap-2"
            >
              <SpotifyIcon className="w-4 h-4 text-[#1DB954]" /> Listen to Us (Spotify Streaming)
            </a>
            <a
              href="#gigs"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-[#F3EFE0] hover:text-[#D4E627] flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#D4E627]" /> Gigs Wall & Jadwal Panggung
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-[#F3EFE0] hover:text-[#D4E627] flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#B879AD]" /> Booking & Kolaborasi
            </a>
            <div className="pt-2 border-t-2 border-dashed border-[#D4E627]/40">
              <a
                href="https://wa.me/6281299095137?text=Halo%20Silly%20N%20Valley!%20Mau%20inquiry%20booking."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center block bg-[#D4E627] text-[#12041D] py-2.5 font-punk text-sm uppercase border-2 border-black shadow-[3px_3px_0px_#00BFA5]"
              >
                Hotline WA: +62 812-9909-5137
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 1: SILLY N VALLEY (HERO SECTION)
      ========================================================================= */}
      <section
        id="hero"
        className="relative pt-10 pb-20 md:pt-16 md:pb-28 border-b-4 border-black z-10 overflow-hidden bg-gradient-to-b from-[#1F0833] via-[#2A0E44] to-[#1A062B]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Zine Typography & Statement */}
            <div className="lg:col-span-7 space-y-6">
              {/* Headline */}
              <div className="space-y-3">

                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-punk uppercase tracking-normal leading-[0.9] text-[#F3EFE0]">
                  SILLY N <br />
                  <span className="inline-block bg-[#D4E627] text-[#12041D] px-3 my-1 -rotate-1 border-3 border-black shadow-[6px_6px_0px_#B879AD] cursor-default">
                    VALLEY
                  </span>
                </h1>

                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-block bg-[#B879AD] text-[#12041D] text-lg sm:text-2xl font-punk px-3 py-1 rotate-1 border-2 border-black shadow-[4px_4px_0px_#D4E627]">
                    &quot;BAND PUNK TAPI KOK NGONTEN!?&quot;
                  </span>
                  <span className="inline-block bg-[#12041D] text-[#D4E627] text-sm sm:text-base font-marker px-3 py-1 -rotate-1 border-2 border-[#D4E627] shadow-[2px_2px_0px_#00BFA5]">
                    RANTAI REAKSI: ABU TANPA API
                  </span>
                </div>
              </div>

              {/* Manifest Paper Paragraph */}
              <div className="relative bg-[#2B1046] border-3 border-[#D4E627] p-5 shadow-[6px_6px_0px_#12041D] hover:shadow-[8px_8px_0px_#D4E627] transition-shadow">
                <DuctTape className="-top-3 left-8 w-20 -rotate-2" color="yellow" />
                <DuctTape className="-bottom-3 right-8 w-20 rotate-1" color="purple" />
                <p className="text-[#F3EFE0] text-sm sm:text-base leading-relaxed font-mono">
                  Unit punk rock berdaya ledak tinggi asal <strong className="text-[#D4E627]">Kota Tangerang</strong>.
                  Mengawinkan distorsi kencang tanpa kompromi, lirik motivasi harian,
                  kultur DIY kaset pita, dan keberanian membajak algoritma digital demi merayakan
                  ruang aman bagi semua orang di moshpit!
                </p>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <a
                  href="#merch"
                  className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-6 py-3.5 font-punk text-base uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#00BFA5] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4 text-[#12041D]" />
                  <span>Lihat Merch Drop</span>
                </a>
                <a
                  href="#listen"
                  className="bg-[#1DB954] hover:bg-[#1ed760] text-black px-6 py-3.5 font-punk text-base uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <SpotifyIcon className="w-4 h-4 text-black" /> Dengarkan di Spotify
                </a>
                <a
                  href="#about"
                  className="bg-[#B879AD] hover:bg-[#a6689b] text-[#12041D] px-5 py-3.5 font-punk text-base uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#D4E627] flex items-center gap-1.5"
                >
                  <Flame className="w-4 h-4 text-[#12041D]" /> About Us
                </a>
              </div>
            </div>

            {/* Right Column: Authentic Album Artwork & Polaroid Showcase */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md px-2 sm:px-0">
                {/* Background Duct Tape Strips */}
                <DuctTape className="-top-4 left-10 w-28 -rotate-6" color="yellow" />
                <DuctTape className="-bottom-4 right-12 w-28 rotate-3" color="cyan" />

                {/* Primary Artwork Frame: Album Cover with Notched Border Style */}
                <div className="bg-[#D4E627] border-4 border-black p-2 sm:p-2.5 shadow-[10px_10px_0px_#12041D] rotate-1 relative z-20 group hover:rotate-0 transition-transform duration-300">
                  <div className="aspect-square bg-[#1A062B] overflow-hidden border-2 border-black relative">
                    <img
                      src="/assets/silly-n-valley/album_cover.jpg"
                      alt="Silly N Valley - Rantai Reaksi: Abu Tanpa Api Official Album Artwork"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-2 right-2 bg-[#00BFA5] text-[#12041D] text-[10px] font-black px-2 py-0.5 border border-black uppercase font-mono">
                      OFFICIAL COVER
                    </div>

                    <div className="absolute bottom-2 left-2 bg-[#12041D]/90 text-[#D4E627] text-[10px] sm:text-xs font-marker px-2.5 py-1 border border-[#D4E627]">
                      RANTAI REAKSI: ABU TANPA API
                    </div>
                  </div>
                  <div className="pt-2 px-1 flex justify-between items-center text-xs text-[#12041D]">
                    <span className="font-punk text-sm tracking-wide">
                      CASSETTE & DIGITAL RELEASE
                    </span>
                    <span className="text-[10px] text-[#12041D] font-bold">
                      SILLY N VALLEY
                    </span>
                  </div>
                </div>

                {/* Overlapping Secondary Photo: Live Stage Action */}
                <div className="bg-[#2E104B] border-3 border-black p-2 shadow-[6px_6px_0px_#00BFA5] -rotate-6 -mt-16 -ml-6 relative z-30 max-w-[210px] group">
                  <DuctTape className="-top-3 right-6 w-14 rotate-12" color="purple" />
                  <div className="aspect-4/3 bg-black overflow-hidden border-2 border-black">
                    <img
                      src="/assets/silly-n-valley/photo_1.jpg"
                      alt="Live distortion energy"
                      className="w-full h-full object-cover contrast-110 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="pt-1.5 text-[9px] font-mono font-bold text-[#D4E627] flex justify-between">
                    <span>LIVE MOSHPIT</span>
                    <span className="text-[#B879AD]">@HALAKOFFIE</span>
                  </div>
                </div>

                {/* Overlapping Cassette Badge */}
                <div className="absolute -bottom-6 -right-4 bg-[#B879AD] border-3 border-black p-2 shadow-[6px_6px_0px_#D4E627] rotate-3 z-30 max-w-[190px]">
                  <div className="w-full aspect-video overflow-hidden border border-black mb-1 bg-black">
                    <img
                      src="/assets/silly-n-valley/photo_5.jpg"
                      alt="Kaset Rantai Reaksi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-[10px] font-punk text-[#12041D] leading-tight">
                    CASSETTE C-30 OUT NOW!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: OFFICIAL MERCH DROP (RILISAN FISIK & DISTRO SHOP)
      ========================================================================= */}
      <section
        id="merch"
        className="py-20 bg-[#140421] text-[#F3EFE0] border-b-4 border-black relative overflow-hidden"
      >
        <span id="kaset-merch" className="absolute -top-20" />
        <span id="music" className="absolute -top-20" />

        {/* Subtle Ambient Studio Backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#D4E627]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4E627] text-[#12041D] px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#B879AD] mb-2 font-mono">
                <ShoppingBag className="w-3.5 h-3.5" /> DIY MERCHANDISE & RILISAN FISIK
              </div>
              <h2 className="text-4xl sm:text-6xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                Official Merch Drop
              </h2>
              <p className="text-[#CBB8DC] text-xs sm:text-sm font-mono font-bold mt-1 max-w-2xl">
                Rilisan fisik kaset pita C-30 &apos;Rantai Reaksi&apos;, t-shirt heavyweight plastisol ink, booklet zine dokumentasi, dan stiker diproduksi secara mandiri & swadaya.
              </p>
            </div>

            <div className="text-xs font-mono text-[#D4E627] font-bold">
              Order via WhatsApp Hotline: <span className="underline">+62 812-9909-5137</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MERCH_CATALOG.map((item, idx) => {
              const currentSize = selectedSizes[item.id] || (item.sizes ? item.sizes[0] : "One Size");
              return (
                <div
                  key={item.id}
                  className={`bg-[#280D41] border-3 border-black p-4 shadow-[6px_6px_0px_#10031B] relative flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[8px_8px_0px_#D4E627] transition-all duration-300 ${
                    idx % 2 === 0 ? "rotate-0.5" : "-rotate-0.5"
                  }`}
                >
                  <DuctTape
                    className="-top-3 left-8 w-16"
                    color={idx % 2 === 0 ? "yellow" : "cyan"}
                  />

                  <div>
                    {/* Product Image Frame */}
                    <div className="aspect-square bg-[#10031B] border-2 border-black overflow-hidden relative mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-[#12041D] text-[#D4E627] text-[10px] font-black px-2 py-0.5 border border-[#D4E627] font-mono uppercase">
                        {item.status}
                      </span>
                    </div>

                    {/* Details */}
                    <span className="text-[10px] text-[#00BFA5] font-black uppercase font-mono">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-punk uppercase text-[#F3EFE0] leading-snug mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#CBB8DC] font-mono leading-relaxed mt-1 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-dashed border-[#572288] space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xl font-punk text-[#D4E627]">
                        {item.formattedPrice}
                      </span>
                      <span className="text-[10px] text-[#A992C4] font-mono uppercase">
                        READY STOCK
                      </span>
                    </div>

                    {/* Size Selector */}
                    {item.sizes && item.sizes.length > 1 && (
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <span className="text-[10px] text-[#888] font-bold">SIZE:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.sizes.map(sz => (
                            <button
                              key={sz}
                              onClick={() =>
                                setSelectedSizes({ ...selectedSizes, [item.id]: sz })
                              }
                              className={`px-2 py-0.5 text-[10px] font-black border transition-all cursor-pointer ${
                                currentSize === sz
                                  ? "bg-[#D4E627] text-[#12041D] border-black shadow-[1px_1px_0px_#000]"
                                  : "bg-[#1A062B] text-[#F3EFE0] border-black hover:bg-[#381559]"
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
                      className="w-full bg-[#D4E627] hover:bg-[#c2d41e] text-[#12041D] py-2.5 px-3 font-punk text-base uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#00BFA5] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" /> Beli via WhatsApp
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shipping Note & Hotline */}
          <div className="mt-10 bg-[#280D41] border-2 border-[#D4E627] p-4 text-xs text-[#D8CCE6] font-mono font-bold flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#D4E627] text-[#12041D] px-1.5 py-0.5 border border-black font-black uppercase font-mono">
                INFO DISTRO
              </span>
              <span>Pengiriman dari Kota Tangerang via JNE / J&T / Paxel. Pembayaran transfer BCA / Mandiri / QRIS.</span>
            </div>
            <div className="text-[#00BFA5] font-black font-mono">
              Admin Hotline: +62 812-9909-5137
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BAND PUNK TAPI KOK NGONTEN (ABOUT US)
      ========================================================================= */}
      <section
        id="about"
        className="py-20 border-b-4 border-black bg-[#1A062B] relative overflow-hidden"
      >
        <span id="manifesto" className="absolute -top-20" />

        {/* Circular Seal in About Us */}
        <div className="hidden lg:flex absolute -top-4 -right-4 w-28 h-28 rounded-full border-3 border-dashed border-black bg-[#D4E627] text-[#12041D] items-center justify-center -rotate-6 shadow-[5px_5px_0px_#00BFA5] z-20 pointer-events-none select-none">
          <div className="text-[10px] font-punk uppercase text-center leading-tight tracking-wider px-1">
            ★ NO GATEKEEPING ★<br />100% DIY<br />PUNK ETHOS
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#00BFA5] text-[#12041D] px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] font-mono">
                <Flame className="w-3.5 h-3.5" /> BIOGRAFI & FILOSOFI
              </div>

              <h2 className="text-4xl sm:text-6xl font-punk uppercase tracking-normal leading-tight text-[#F3EFE0]">
                ABOUT US <br />
                <span className="inline-block bg-[#D4E627] text-[#12041D] px-2.5 py-0.5 border-2 border-black shadow-[4px_4px_0px_#B879AD] cursor-default">
                  Band Punk Tapi Kok Ngonten!?
                </span>
              </h2>

              {/* Real Artwork Feature from user upload (about_us.png) */}
              <div className="relative bg-[#2B1046] border-3 border-[#D4E627] p-5 sm:p-6 shadow-[6px_6px_0px_#10031B] hover:shadow-[8px_8px_0px_#D4E627] transition-shadow">
                <DuctTape className="-top-3 left-10 w-24 -rotate-2" color="yellow" />
                <DuctTape className="-bottom-3 right-10 w-24 rotate-2" color="purple" />

                {/* About Us Stage Visual Banner */}
                <div className="mb-4 overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000]">
                  <img
                    src="/assets/silly-n-valley/about_us.png"
                    alt="Silly N Valley About Us Stage Session"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Exact Bio text from image attachment */}
                <div className="space-y-3 text-[#F3EFE0] text-sm sm:text-base leading-relaxed font-mono">
                  <p>
                    <strong className="text-[#D4E627]">Silly N Valley</strong> adalah band punk rock asal Kota Tangerang yang dibentuk pada tahun 2022 dan aktif dalam scene underground disana. Memiliki beberapa single dan album penuh.
                  </p>
                  <p>
                    Mereka lebih dikenal melalui konten &apos;memes&apos; harian yang mereka buat untuk dimanfaatkan sebagai platform untuk memperkenalkan aktivitas dan musik yang mereka buat serta mainkan.
                  </p>
                  <p>
                    Pada akhirnya hal tersebut tetap menjaga semangat independent mereka dalam melakukan setiap dan segala keinginan, upaya dan improvement dalam menjalani eksplorasi musik dan performance didalam dan lintas scene.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Bento Grid of Core Values */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Safe Space */}
              <div className="bg-[#2E104B] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 -rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#00BFA5] transition-all">
                <DuctTape className="-top-3 right-6 w-14 rotate-6" color="cyan" />
                <div className="w-10 h-10 bg-[#00BFA5] text-[#12041D] border-2 border-black flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-punk uppercase text-[#00BFA5] tracking-wide">
                  Ruang Aman (Safe Space)
                </h3>
                <p className="text-xs text-[#D8CCE6] leading-normal font-mono">
                  Zero tolerance terhadap pelecehan seksual, kekerasan fisik, dan maskulinitas beracun di moshpit. Semua orang berhak pogo tanpa rasa takut.
                </p>
              </div>

              {/* Card 2: DIY Culture */}
              <div className="bg-[#D4E627] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#B879AD] transition-all">
                <DuctTape className="-top-3 left-6 w-14 -rotate-3" color="purple" />
                <div className="w-10 h-10 bg-[#12041D] text-[#D4E627] border-2 border-black flex items-center justify-center font-black">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-punk uppercase text-[#12041D] tracking-wide">
                  DIY Culture & Swadaya
                </h3>
                <p className="text-xs text-[#12041D] leading-normal font-mono font-bold">
                  Mulai dari produksi fisik kaset pita, desain merch, hingga showcase mandiri &apos;Latihan Di Lihatin&apos;, kami mengorganisirnya secara swadaya.
                </p>
              </div>

              {/* Card 3: Highly Motivated */}
              <div className="bg-[#B879AD] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#D4E627] transition-all">
                <div className="w-10 h-10 bg-[#12041D] text-[#B879AD] border-2 border-black flex items-center justify-center font-black">
                  <Flame className="w-5 h-5 text-[#D4E627]" />
                </div>
                <h3 className="text-xl font-punk uppercase text-[#12041D] tracking-wide">
                  Highly Motivated
                </h3>
                <p className="text-xs text-[#12041D] leading-normal font-mono font-bold">
                  Punk yang tidak cuma mengeluh, tapi memicu tindakan nyata. Melawan burnout dan apatisme harian dengan riff cepat dan optimisme keras kepala.
                </p>
              </div>

              {/* Card 4: Tangerang Scene */}
              <div className="bg-[#240A3D] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-2 -rotate-1 relative hover:rotate-0 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#D4E627] transition-all">
                <div className="w-10 h-10 bg-[#D4E627] text-[#12041D] border-2 border-black flex items-center justify-center font-black">
                  <MapPin className="w-5 h-5 text-[#12041D]" />
                </div>
                <h3 className="text-xl font-punk uppercase text-[#D4E627] tracking-wide">
                  Tangerang Underground (2022)
                </h3>
                <p className="text-xs text-[#D8CCE6] leading-normal font-mono">
                  Menghidupkan ekosistem dan venue kota sendiri. Kami percaya pergerakan tidak harus selalu berpusat di Jakarta untuk bisa berdampak luas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FANZINE PHOTO GALLERY (12 REAL PHOTOS)
      ========================================================================= */}
      <section id="photos" className="py-20 border-b-4 border-black bg-[#1E0833] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#00BFA5] text-[#12041D] px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] mb-2 font-mono">
                <Camera className="w-3.5 h-3.5" /> DOKUMENTASI RESMI INSTAGRAM
              </div>
              <h2 className="text-4xl sm:text-6xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                Fanzine Photo Gallery
              </h2>
              <p className="text-[#CBB8DC] text-sm mt-1 max-w-2xl font-bold font-mono">
                Arsip visual panggung, moshpit circle, rilis fisik, dan suasana showcase Silly N Valley.
                Dokumentasi eksklusif oleh <strong className="text-[#D4E627]">@silly.n.valley</strong> &{" "}
                <strong className="text-[#D4E627]">@mqrifisnqini</strong>.
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
                  className={`px-3 py-1.5 text-xs font-black uppercase border-2 border-black transition-all cursor-pointer ${
                    galleryCategory === tab.key
                      ? "bg-[#D4E627] text-[#12041D] shadow-[3px_3px_0px_#B879AD] -translate-y-0.5"
                      : "bg-[#2E104B] text-[#F3EFE0] hover:bg-[#3D1563] shadow-[2px_2px_0px_#000]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Polaroid Zine Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredPhotos.map((photo, idx) => {
              const rotateClasses = [
                "-rotate-1 hover:rotate-0",
                "rotate-2 hover:rotate-0",
                "-rotate-2 hover:rotate-0",
                "rotate-1 hover:rotate-0"
              ];
              const rotation = rotateClasses[idx % rotateClasses.length];

              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`bg-[#F3EFE0] text-[#12041D] p-3 border-3 border-black shadow-[6px_6px_0px_#10031B] cursor-pointer group transition-all duration-300 hover:scale-[1.03] hover:shadow-[10px_10px_0px_#D4E627] relative ${rotation}`}
                >
                  <DuctTape
                    className="-top-3 left-1/2 -translate-x-1/2 w-20"
                    color={idx % 3 === 0 ? "yellow" : idx % 3 === 1 ? "purple" : "cyan"}
                  />

                  <div className="aspect-square bg-black overflow-hidden border-2 border-black relative">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-[#12041D]/0 group-hover:bg-[#12041D]/30 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-[#D4E627] text-[#12041D] text-xs font-black uppercase px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" /> Perbesar
                      </span>
                    </div>

                    <span className="absolute bottom-2 left-2 bg-[#12041D]/80 text-[#D4E627] text-[9px] font-mono font-bold px-1.5 py-0.5 border border-[#D4E627]">
                      {photo.timestamp}
                    </span>
                  </div>

                  <div className="pt-3 px-1">
                    <p className="text-xs font-mono font-bold leading-snug line-clamp-2 text-[#12041D]">
                      {photo.caption}
                    </p>
                    <div className="mt-2 pt-2 border-t border-dashed border-black/30 flex justify-between items-center text-[10px] text-[#444] font-mono">
                      <span>#SILLYNVALLEY</span>
                      <span className="text-black font-black uppercase">FOTO #{photo.id}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#12041D]/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="bg-[#1A062B] border-4 border-black max-w-3xl w-full p-4 sm:p-6 shadow-[10px_10px_0px_#D4E627] relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute -top-4 -right-4 bg-[#D90429] text-white p-2 border-2 border-black font-black hover:scale-110 transition-transform shadow-[2px_2px_0px_#000] z-20"
              aria-label="Tutup popup"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-4/3 sm:aspect-16/10 bg-black overflow-hidden border-2 border-black relative">
              <img
                src={filteredPhotos[activePhotoIndex].src}
                alt={filteredPhotos[activePhotoIndex].caption}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-[#00BFA5] font-black uppercase text-[10px]">
                  DOKUMENTASI FOTO GIGS TANGERANG
                </span>
                <p className="text-sm font-bold text-[#F3EFE0] mt-0.5">
                  {filteredPhotos[activePhotoIndex].caption}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    setActivePhotoIndex(
                      (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                    )
                  }
                  className="bg-[#2A0E44] hover:bg-[#3D1563] text-[#D4E627] p-2 border-2 border-black cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[#D4E627] font-bold px-2">
                  {activePhotoIndex + 1} / {filteredPhotos.length}
                </span>
                <button
                  onClick={() =>
                    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length)
                  }
                  className="bg-[#2A0E44] hover:bg-[#3D1563] text-[#D4E627] p-2 border-2 border-black cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 5: LISTEN TO US (DEDICATED SPOTIFY STREAMING HUB)
      ========================================================================= */}
      <section
        id="listen"
        className="py-20 border-b-4 border-black bg-[#12041D] relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header with Spotify Branding */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#1DB954] text-black px-3.5 py-1 font-mono text-xs font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000]">
              <SpotifyIcon className="w-4 h-4 text-black" /> OFFICIAL SPOTIFY STREAMING
            </div>
            <h2 className="text-4xl sm:text-6xl font-punk uppercase tracking-normal text-[#F3EFE0]">
              LISTEN TO US
            </h2>
            <p className="text-[#CBB8DC] text-xs sm:text-sm font-mono font-bold max-w-xl mx-auto">
              Dengarkan katalog musik lengkap Silly N Valley di Spotify: dari single &apos;Berhala-Run!&apos;, mini album &apos;Rantai Reaksi (Abu Tanpa Api)&apos;, hingga rekaman panggung live di Tangerang!
            </p>
          </div>

          {/* Top Spotify Banner Card */}
          <div className="bg-[#1C0830] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#1DB954] relative mb-10">
            <DuctTape className="-top-3 left-10 w-24 -rotate-2" color="cyan" />
            <DuctTape className="-top-3 right-10 w-24 rotate-3" color="yellow" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1DB954] text-black flex items-center justify-center shrink-0 border-3 border-black shadow-[3px_3px_0px_#000]">
                  <SpotifyIcon className="w-9 h-9 sm:w-11 sm:h-11 text-black" />
                </div>
                <div>
                  <div className="text-[10px] text-[#1DB954] font-black uppercase tracking-wider font-mono">
                    AVAILABLE ON ALL DEVICES
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-punk uppercase text-[#F3EFE0]">
                    Silly N Valley on Spotify
                  </h3>
                  <p className="text-xs text-[#CBB8DC] font-mono font-bold mt-0.5">
                    Stream bebas iklan, kualitas audio master jernih, dan tambahkan ke playlist punk favoritmu!
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href="https://open.spotify.com/search/Silly%20N%20Valley"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1DB954] hover:bg-[#1ed760] text-black px-6 py-3 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-2 cursor-pointer active:translate-y-0.5"
                >
                  <SpotifyIcon className="w-4 h-4 text-black" /> Buka di Spotify Web / App
                </a>
                <a
                  href="https://open.spotify.com/search/Rantai%20Reaksi%20Abu%20Tanpa%20Api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-5 py-3 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-1.5 cursor-pointer"
                >
                  <Disc className="w-4 h-4" /> Cari EP Rantai Reaksi
                </a>
              </div>
            </div>
          </div>

          {/* SPOTIFY TRACKLIST GRID */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#572288]">
              <h3 className="text-2xl font-punk uppercase text-[#D4E627]">
                Daftar Lagu di Spotify ({TRACKS.length} Tracks)
              </h3>
              <span className="text-xs font-mono text-[#CBB8DC] font-bold">
                Pilih lagu untuk dengarkan langsung di Spotify
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TRACKS.map(t => {
                const isOpen = openSpotifyTrackLyrics === t.id;
                const spotifyTrackUrl = `https://open.spotify.com/search/${encodeURIComponent(
                  t.title + " Silly N Valley"
                )}`;

                return (
                  <div
                    key={t.id}
                    className="bg-[#240A3D] border-3 border-black p-4 shadow-[4px_4px_0px_#000] hover:border-[#1DB954] hover:shadow-[6px_6px_0px_#1DB954] transition-all relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-[#1DB954] text-black font-black text-xs flex items-center justify-center font-mono">
                            0{t.id}
                          </span>
                          <span className="text-[10px] font-mono font-black uppercase text-[#00BFA5]">
                            {t.sourceType === "single" ? "STUDIO SINGLE" : "LIVE AT HALA KOFFIE"}
                          </span>
                        </div>
                        <span className="bg-[#12041D] text-[#D4E627] text-[10px] font-black px-2 py-0.5 border border-[#D4E627] font-mono">
                          {t.bpm} BPM
                        </span>
                      </div>

                      <h4 className="text-2xl font-punk uppercase text-[#F3EFE0] tracking-wide">
                        {t.title}
                      </h4>
                      <p className="text-xs text-[#CBB8DC] font-mono mt-1 font-bold">
                        {t.story}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-dashed border-[#572288] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
                        <span>Durasi: <strong className="text-white">{t.duration}</strong></span>
                        <span>•</span>
                        <button
                          onClick={() => setOpenSpotifyTrackLyrics(isOpen ? null : t.id)}
                          className="text-[#D4E627] hover:underline cursor-pointer"
                        >
                          {isOpen ? "Tutup Lirik ↑" : "Lirik Lagu ↓"}
                        </button>
                      </div>

                      <a
                        href={spotifyTrackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1DB954] hover:bg-[#1ed760] text-black px-3.5 py-1.5 font-punk text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer"
                      >
                        <SpotifyIcon className="w-3.5 h-3.5 text-black" /> Putar di Spotify
                      </a>
                    </div>

                    {isOpen && (
                      <div className="mt-3 bg-[#12041D] border-2 border-[#1DB954] p-3 text-xs font-mono whitespace-pre-line text-[#F3EFE0]">
                        <div className="text-[10px] text-[#1DB954] font-black uppercase mb-1">
                          LIRIK RESMI: {t.title}
                        </div>
                        {t.lyrics}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: GIGS & FLYER WALL
      ========================================================================= */}
      <section id="gigs" className="py-20 border-b-4 border-black bg-[#180529] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#D4E627] text-[#12041D] px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#00BFA5] mb-2 font-mono">
                <Calendar className="w-3.5 h-3.5" /> FLYER WALL & PANGGUNG
              </div>
              <h2 className="text-4xl sm:text-6xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                Gigs & Flyer Wall
              </h2>
              <p className="text-[#CBB8DC] text-sm mt-1 font-bold font-mono">
                Jejak poster gigs fotokopi dinding, showcase mandiri, dan panggung festival Silly N Valley.
              </p>
            </div>
            <a
              href="https://wa.me/6281299095137?text=Halo%20Silly%20N%20Valley!%20Mau%20ajak%20manggung%20di%20kota%20kami."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00BFA5] hover:bg-[#00ab94] text-[#12041D] px-5 py-3 font-punk text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#D4E627] flex items-center gap-2 self-start md:self-auto hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Zap className="w-4 h-4 fill-current" /> Ajak Manggung di Kotamu
            </a>
          </div>

          {/* Flyers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {GIGS_TIMELINE.map((gig, idx) => (
              <div
                key={gig.id}
                className={`bg-[#280D41] border-3 border-black p-6 shadow-[7px_7px_0px_#10031B] relative flex flex-col justify-between group hover:rotate-0 hover:scale-[1.01] hover:shadow-[10px_10px_0px_#D4E627] transition-all duration-300 ${
                  idx % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                <DuctTape
                  className="-top-3 left-12 w-20 -rotate-3"
                  color={idx % 2 === 0 ? "yellow" : "purple"}
                />

                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
                    <span className="bg-[#B879AD] text-[#12041D] px-2 py-0.5 font-black uppercase border border-black flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12041D] animate-ping" />
                      {gig.category}
                    </span>
                    <span className="text-[#12041D] font-black flex items-center gap-1 bg-[#D4E627] px-2 py-0.5 border border-black font-mono">
                      <Calendar className="w-3 h-3 text-[#12041D]" /> {gig.date}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-punk uppercase text-[#F3EFE0] leading-tight mb-2">
                    {gig.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D4E627] mb-4">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {gig.venue}, {gig.city}
                    </span>
                  </div>

                  {/* Flyer Snapshot Graphic */}
                  <div className="aspect-16/9 bg-black border-2 border-black overflow-hidden mb-4 relative">
                    <img
                      src={gig.photoSrc}
                      alt={gig.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 filter contrast-110"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#12041D] text-[#D4E627] text-[10px] font-mono px-2 py-0.5 border border-[#D4E627] uppercase">
                      ARSIP LIVE
                    </div>
                  </div>

                  <p className="text-xs text-[#D8CCE6] font-mono leading-relaxed">
                    {gig.vibe}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-dashed border-[#572288] flex justify-between items-center text-xs">
                  <span className="text-[#D4E627] font-punk text-sm">
                    STATUS: SELESAI DIGUNCANG
                  </span>
                  {gig.collab && (
                    <div className="text-[#CBB8DC] text-[11px] font-mono font-bold">
                      Collab: <span className="text-[#00BFA5] font-black">{gig.collab}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Showcase Box for HALA Koffie */}
          <div className="mt-10 bg-[#D4E627] border-3 border-black p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[8px_8px_0px_#00BFA5] relative">
            <DuctTape className="-top-3 right-16 w-24 rotate-2" color="purple" />
            <div className="space-y-2 max-w-2xl text-[#12041D]">
              <span className="bg-[#12041D] text-[#D4E627] text-[10px] font-black px-2 py-0.5 uppercase border border-black font-mono">
                SHOWCASE RESIDENCY MANDIRI
              </span>
              <h3 className="text-3xl sm:text-4xl font-punk uppercase text-[#12041D] leading-tight">
                Mau Ikutan Sing-Along di &apos;Latihan Di Lihatin&apos;?
              </h3>
              <p className="text-xs sm:text-sm text-[#12041D] font-bold font-mono">
                Acara rutin di HALA Koffie Tangerang selalu gratis tanpa tiket. Pantau info jadwal sesi berikutnya langsung di Instagram stories @silly.n.valley!
              </p>
            </div>
            <a
              href="https://instagram.com/silly.n.valley"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#12041D] hover:bg-[#230B3A] text-[#D4E627] px-6 py-3 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#B879AD] shrink-0 flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4 text-[#D4E627]" /> Cek IG @silly.n.valley
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: BOOKING & KOLABORASI
      ========================================================================= */}
      <section id="booking" className="py-20 border-b-4 border-black bg-[#1E0833] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#D4E627] text-[#12041D] px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] font-mono">
                <Zap className="w-3.5 h-3.5 fill-current" /> DIRECT MANAGEMENT HOTLINE
              </div>

              <h2 className="text-4xl sm:text-6xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                Booking & Kolaborasi
              </h2>

              <p className="text-[#CBB8DC] text-sm sm:text-base leading-relaxed font-bold font-mono">
                Kami siap mengguncang gigs mandiri, pensi kampus, festival musik, showcase cafe, hingga tur lintas kota. Hubungi hotline resmi manajemen di bawah ini.
              </p>

              {/* Direct Info Card with Phone Number */}
              <div className="bg-[#280D41] border-3 border-black p-5 shadow-[6px_6px_0px_#10031B] space-y-4 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-[#CBB8DC] uppercase font-black">WHATSAPP BOOKING HOTLINE</div>
                  <a
                    href="https://wa.me/6281299095137"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-punk text-[#D4E627] hover:underline flex items-center gap-2 mt-0.5 tracking-wide"
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BFA5] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00BFA5]"></span>
                    </span>
                    +62 812-9909-5137 <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <div className="text-[#CBB8DC] text-[11px] mt-0.5">Respon cepat via pesan WhatsApp</div>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-[#572288]">
                  <div className="text-[10px] text-[#CBB8DC] uppercase font-black">OFFICIAL SPOTIFY</div>
                  <a
                    href="https://open.spotify.com/search/Silly%20N%20Valley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#1DB954] hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <SpotifyIcon className="w-4 h-4 text-[#1DB954]" /> Silly N Valley on Spotify
                  </a>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-[#572288]">
                  <div className="text-[10px] text-[#CBB8DC] uppercase font-black">OFFICIAL INSTAGRAM</div>
                  <a
                    href="https://instagram.com/silly.n.valley"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#F3EFE0] hover:text-[#D4E627] flex items-center gap-1.5 mt-0.5"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#D4E627]" /> @silly.n.valley
                  </a>
                </div>

                <div className="pt-3 border-t-2 border-dashed border-[#572288]">
                  <div className="text-[10px] text-[#CBB8DC] uppercase font-black">FOTOGRAFER & ARSIP DOKUMENTASI</div>
                  <a
                    href="https://instagram.com/mqrifisnqini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#F3EFE0] hover:text-[#00BFA5] flex items-center gap-1.5 mt-0.5"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#00BFA5]" /> @mqrifisnqini
                  </a>
                  <div className="text-[#CBB8DC] text-[11px] mt-0.5">Dokumentasi foto & video gigs resmi</div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#280D41] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#D4E627] relative">
                <DuctTape className="-top-3 right-12 w-20 rotate-3" color="purple" />

                <div className="mb-6 pb-4 border-b-2 border-[#572288]">
                  <h3 className="text-2xl sm:text-3xl font-punk uppercase text-[#D4E627]">
                    Formulir Inquiry Manggung
                  </h3>
                  <p className="text-xs text-[#CBB8DC] mt-1 font-bold font-mono">
                    Isi detail acara Anda untuk generate template pesan WhatsApp otomatis langsung ke nomor manajemen Silly N Valley.
                  </p>
                </div>

                <form onSubmit={handleSendBookingInquiry} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F3EFE0] uppercase font-black mb-1">
                        Nama Acara / Penyelenggara:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Tangerang Youth Fest 2024"
                        value={bookingForm.eventName}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, eventName: e.target.value })
                        }
                        className="w-full bg-[#180529] border-2 border-[#572288] focus:border-[#D4E627] p-3 text-[#F3EFE0] outline-none font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#F3EFE0] uppercase font-black mb-1">
                        Venue & Kota:
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: HALA Koffie, Tangerang"
                        value={bookingForm.venueCity}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, venueCity: e.target.value })
                        }
                        className="w-full bg-[#180529] border-2 border-[#572288] focus:border-[#D4E627] p-3 text-[#F3EFE0] outline-none font-bold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#F3EFE0] uppercase font-black mb-1">
                        Estimasi Tanggal:
                      </label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, date: e.target.value })
                        }
                        className="w-full bg-[#180529] border-2 border-[#572288] focus:border-[#D4E627] p-3 text-[#F3EFE0] outline-none font-bold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#F3EFE0] uppercase font-black mb-1">
                        Format Event:
                      </label>
                      <select
                        value={bookingForm.format}
                        onChange={e =>
                          setBookingForm({ ...bookingForm, format: e.target.value })
                        }
                        className="w-full bg-[#180529] border-2 border-[#572288] focus:border-[#D4E627] p-3 text-[#F3EFE0] outline-none font-bold cursor-pointer"
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
                    <label className="block text-[#F3EFE0] uppercase font-black mb-1">
                      Catatan Tambahan / Rundown:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Info sound system, durasi set list, atau pesan khusus..."
                      value={bookingForm.notes}
                      onChange={e =>
                        setBookingForm({ ...bookingForm, notes: e.target.value })
                      }
                      className="w-full bg-[#180529] border-2 border-[#572288] focus:border-[#D4E627] p-3 text-[#F3EFE0] outline-none resize-none font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4E627] hover:bg-[#c2d41e] text-[#12041D] font-punk uppercase text-base py-3.5 px-4 border-3 border-black shadow-[4px_4px_0px_#00BFA5] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#12041D]" /> Kirim Inquiry via WhatsApp
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0E0316] text-[#F3EFE0] border-t-4 border-[#D4E627] pt-14 pb-12 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b-2 border-[#331153] pb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/" className="select-none group">
                <img
                  src="/assets/silly-n-valley/logo.png"
                  alt="Silly N Valley"
                  className="h-14 sm:h-18 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                />
              </Link>
              <div className="text-sm font-punk text-[#D4E627] tracking-wide">
                HIGHLY MOTIVATED PUNK ROCK • KOTA TANGERANG, BANTEN
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://open.spotify.com/search/Silly%20N%20Valley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DB954] text-black hover:bg-[#1ed760] p-2.5 border-2 border-black transition-colors"
                title="Silly N Valley on Spotify"
              >
                <SpotifyIcon className="w-4 h-4 text-black" />
              </a>
              <a
                href="https://instagram.com/silly.n.valley"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#280D41] text-[#D4E627] hover:bg-[#D4E627] hover:text-[#12041D] p-2.5 border-2 border-black transition-colors"
                title="Instagram @silly.n.valley"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6281299095137"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D4E627] text-[#12041D] hover:bg-[#00BFA5] p-2.5 border-2 border-black transition-colors"
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
              <a href="#hero" className="hover:text-[#D4E627] transition-colors">
                Kembali ke Atas ↑
              </a>
              <span className="text-[#444]">|</span>
              <span className="text-[#D4E627] font-punk text-sm">BAND PUNK TAPI KOK NGONTEN!?</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
