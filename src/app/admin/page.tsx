"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  Camera,
  Calendar,
  ShoppingBag,
  Inbox,
  UserCheck,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Save,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  Eye,
  Lock,
  LogOut,
  Sparkles,
  MapPin,
  Clock,
  DollarSign,
  MessageCircle,
  Tag,
  AlertCircle,
  FolderOpen
} from "lucide-react";
import { supabase, uploadImageToStorage } from "@/lib/supabase";

// =========================================================================
// TYPES & DATA CONTRACTS
// =========================================================================

export interface FanzineAlbum {
  id: string;
  title: string;
  date: string;
  venue: string;
  photographer: string;
  coverImage: string;
  photos: string[];
}

export interface GigItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  htm: string;
  instagramUrl: string;
  flyerImages: string[];
  status: "upcoming" | "completed" | "cancelled";
}

export interface MerchItem {
  id: string;
  name: string;
  price: string;
  category: "cassette" | "apparel" | "accessories" | "bundle";
  image: string;
  status: "available" | "preorder" | "soldout";
  description: string;
}

export interface BookingMessage {
  id: string;
  senderName: string;
  collective: string;
  eventName: string;
  eventDate: string;
  whatsapp: string;
  city: string;
  notes: string;
  receivedAt: string;
  status: "unread" | "replied" | "archived";
}

export interface ProfileData {
  bandName: string;
  tagline: string;
  headlineQuote: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  stageImage: string;
  whatsappHotline: string;
  instagramUrl: string;
  spotifyUrl: string;
  coreValues: {
    title: string;
    description: string;
    badge: string;
  }[];
}

// =========================================================================
// INITIAL DEFAULT DATA (SILLY N VALLEY CANONICAL)
// =========================================================================

const INITIAL_PROFILE: ProfileData = {
  bandName: "Silly N Valley",
  tagline: "Band Punk Tapi Kok Ngonten!?",
  headlineQuote: "Highly Motivated Punk Rock asal Kota Tangerang.",
  bioParagraph1:
    "Silly N Valley adalah band punk rock asal Kota Tangerang yang dibentuk pada tahun 2022 dan aktif dalam scene underground disana. Memiliki beberapa single dan album penuh.",
  bioParagraph2:
    "Mereka lebih dikenal melalui konten 'memes' harian yang mereka buat untuk dimanfaatkan sebagai platform untuk memperkenalkan aktivitas dan musik yang mereka buat serta mainkan.",
  bioParagraph3:
    "Pada akhirnya hal tersebut tetap menjaga semangat independent mereka dalam melakukan setiap dan segala keinginan, upaya dan improvement dalam menjalani eksplorasi musik dan performance didalam dan lintas scene.",
  stageImage: "/assets/silly-n-valley/about_us.png",
  whatsappHotline: "+62 812-9909-5137",
  instagramUrl: "https://instagram.com/silly.n.valley",
  spotifyUrl: "https://open.spotify.com/search/Silly%20N%20Valley",
  coreValues: [
    {
      title: "Ruang Aman (Safe Space)",
      badge: "Moshpit Etiquette",
      description:
        "Zero tolerance terhadap pelecehan seksual, kekerasan fisik, dan maskulinitas beracun di moshpit. Semua orang berhak pogo tanpa rasa takut."
    },
    {
      title: "DIY Culture & Swadaya",
      badge: "Mandiri",
      description:
        "Mulai dari produksi fisik kaset pita, desain merch, hingga showcase mandiri 'Latihan Di Lihatin', kami mengorganisirnya secara swadaya."
    },
    {
      title: "Highly Motivated",
      badge: "Anti Burnout",
      description:
        "Punk yang tidak cuma mengeluh, tapi memicu tindakan nyata. Melawan burnout dan apatisme harian dengan riff cepat dan optimisme keras kepala."
    },
    {
      title: "Tangerang Underground",
      badge: "Est. 2022",
      description:
        "Menghidupkan ekosistem dan venue kota sendiri. Kami percaya pergerakan tidak harus selalu berpusat di Jakarta untuk bisa berdampak luas."
    }
  ]
};

const INITIAL_ALBUMS: FanzineAlbum[] = [
  {
    id: "alb-1",
    title: "Showcase HALA Koffie: Rantai Reaksi",
    date: "14 Oktober 2024",
    venue: "HALA Koffie, Kota Tangerang",
    photographer: "@mqrifisnqini",
    coverImage: "/assets/silly-n-valley/gallery/photo-1.jpg",
    photos: [
      "/assets/silly-n-valley/gallery/photo-1.jpg",
      "/assets/silly-n-valley/gallery/photo-2.jpg",
      "/assets/silly-n-valley/gallery/photo-3.jpg",
      "/assets/silly-n-valley/gallery/photo-4.jpg"
    ]
  },
  {
    id: "alb-2",
    title: "Moshpit Chaos di Gigsgoks Fest",
    date: "28 September 2024",
    venue: "Tangerang Creative Space",
    photographer: "@silly.n.valley",
    coverImage: "/assets/silly-n-valley/gallery/photo-5.jpg",
    photos: [
      "/assets/silly-n-valley/gallery/photo-5.jpg",
      "/assets/silly-n-valley/gallery/photo-6.jpg",
      "/assets/silly-n-valley/gallery/photo-7.jpg",
      "/assets/silly-n-valley/gallery/photo-8.jpg"
    ]
  },
  {
    id: "alb-3",
    title: "Tape Cassette C-30 Production & Gear",
    date: "Agustus 2024",
    venue: "Silly DIY Workshop",
    photographer: "@silly.n.valley",
    coverImage: "/assets/silly-n-valley/gallery/photo-9.jpg",
    photos: [
      "/assets/silly-n-valley/gallery/photo-9.jpg",
      "/assets/silly-n-valley/gallery/photo-10.jpg",
      "/assets/silly-n-valley/gallery/photo-11.jpg",
      "/assets/silly-n-valley/gallery/photo-12.jpg"
    ]
  }
];

const INITIAL_GIGS: GigItem[] = [
  {
    id: "gig-1",
    title: "Latihan Di Lihatin Vol. 3",
    date: "25 Oktober 2026",
    time: "19:00 WIB",
    venue: "HALA Koffie, Tangerang",
    city: "Kota Tangerang",
    htm: "Bayar Seikhlasnya",
    instagramUrl: "https://instagram.com/silly.n.valley",
    flyerImages: [
      "/assets/silly-n-valley/gigs/flyer-latihan.png",
      "/assets/silly-n-valley/gallery/photo-1.jpg"
    ],
    status: "upcoming"
  },
  {
    id: "gig-2",
    title: "Tangerang Underground Movement",
    date: "10 November 2026",
    time: "16:00 WIB",
    venue: "Pasar Lama Warehouse",
    city: "Kota Tangerang",
    htm: "Rp 35.000",
    instagramUrl: "https://instagram.com/silly.n.valley",
    flyerImages: ["/assets/silly-n-valley/gallery/photo-5.jpg"],
    status: "upcoming"
  }
];

const INITIAL_MERCH: MerchItem[] = [
  {
    id: "merch-1",
    name: "Kaset Pita C-30 'Rantai Reaksi: Abu Tanpa Api'",
    price: "Rp 65.000",
    category: "cassette",
    image: "/assets/silly-n-valley/cover.jpg",
    status: "available",
    description: "Kaset tape C-30 analog transparan dengan cover lipat 4 panel & booklet lirik DIY."
  },
  {
    id: "merch-2",
    name: "T-Shirt 'Band Punk Tapi Kok Ngonten!?' (Heavyweight 24s)",
    price: "Rp 150.000",
    category: "apparel",
    image: "/assets/silly-n-valley/logo.png",
    status: "preorder",
    description: "Sablon plastisol raster di atas katun combad 24s hitam pekat vintage wash."
  },
  {
    id: "merch-3",
    name: "Enamel Pin & Sticker Pack Zine Edisi 01",
    price: "Rp 30.000",
    category: "accessories",
    image: "/assets/silly-n-valley/gallery/photo-9.jpg",
    status: "available",
    description: "5 lembar stiker vinyl tahan air + pin stempel '100% DIY Tangerang Hardcore'."
  }
];

const INITIAL_BOOKINGS: BookingMessage[] = [
  {
    id: "bk-1",
    senderName: "Budi Santoso",
    collective: "Kolektif Pinggiran Distorsi",
    eventName: "Gigs Solidaritas Pogo Bersama",
    eventDate: "15 November 2026",
    whatsapp: "081234567890",
    city: "Jakarta Barat",
    notes: "Mau ajak Silly N Valley buat headline di gigs amal kami. Backline & akomodasi siap.",
    receivedAt: "16 Okt 2026, 14:20",
    status: "unread"
  },
  {
    id: "bk-2",
    senderName: "Rian Hardcore",
    collective: "Tangerang Youth Club",
    eventName: "Weekend No Rules Showcase",
    eventDate: "05 Desember 2026",
    whatsapp: "089876543210",
    city: "Tangerang Selatan",
    notes: "Showcase intimate cafe. Slot main sekitar 40 menit setelah jam 8 malam.",
    receivedAt: "15 Okt 2026, 18:05",
    status: "replied"
  }
];

// =========================================================================
// MAIN ADMIN DASHBOARD COMPONENT
// =========================================================================

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");

  // Current Active Tab
  const [activeTab, setActiveTab] = useState<
    "profile" | "albums" | "gigs" | "merch" | "bookings"
  >("profile");

  // State Management with Local Storage fallback
  const [profile, setProfile] = useState<ProfileData>(INITIAL_PROFILE);
  const [albums, setAlbums] = useState<FanzineAlbum[]>(INITIAL_ALBUMS);
  const [gigs, setGigs] = useState<GigItem[]>(INITIAL_GIGS);
  const [merch, setMerch] = useState<MerchItem[]>(INITIAL_MERCH);
  const [bookings, setBookings] = useState<BookingMessage[]>(INITIAL_BOOKINGS);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Preview Modal for Albums
  const [activePreviewAlbum, setActivePreviewAlbum] = useState<FanzineAlbum | null>(null);
  const [previewPhotoIndex, setPreviewPhotoIndex] = useState<number>(0);

  // Modal Dialogs for Creating Items
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isGigModalOpen, setIsGigModalOpen] = useState(false);
  const [isMerchModalOpen, setIsMerchModalOpen] = useState(false);

  // Editing IDs
  const [editingAlbumId, setEditingAlbumId] = useState<string | null>(null);
  const [editingGigId, setEditingGigId] = useState<string | null>(null);
  const [editingMerchId, setEditingMerchId] = useState<string | null>(null);

  // Temp form states
  const [albumForm, setAlbumForm] = useState<Partial<FanzineAlbum>>({
    title: "",
    date: "",
    venue: "",
    photographer: "@silly.n.valley",
    coverImage: "",
    photos: []
  });
  const [newPhotoUrlInput, setNewPhotoUrlInput] = useState("");

  const [gigForm, setGigForm] = useState<Partial<GigItem>>({
    title: "",
    date: "",
    time: "19:00 WIB",
    venue: "",
    city: "Kota Tangerang",
    htm: "Gratis / Donasi",
    instagramUrl: "https://instagram.com/silly.n.valley",
    flyerImages: [],
    status: "upcoming"
  });
  const [newFlyerUrlInput, setNewFlyerUrlInput] = useState("");

  const [merchForm, setMerchForm] = useState<Partial<MerchItem>>({
    name: "",
    price: "Rp 50.000",
    category: "apparel",
    image: "",
    status: "available",
    description: ""
  });

  // Load from Supabase on mount (with localStorage/default fallbacks)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("snv_admin_logged");
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    }

    async function loadSupabaseData() {
      try {
        // 1. Profile
        const { data: profData } = await supabase
          .from("band_profile")
          .select("*")
          .eq("id", "main")
          .maybeSingle();

        if (profData) {
          setProfile({
            bandName: profData.band_name || INITIAL_PROFILE.bandName,
            tagline: profData.tagline || INITIAL_PROFILE.tagline,
            headlineQuote: profData.headline_quote || INITIAL_PROFILE.headlineQuote,
            bioParagraph1: profData.bio_paragraph_1 || INITIAL_PROFILE.bioParagraph1,
            bioParagraph2: profData.bio_paragraph_2 || INITIAL_PROFILE.bioParagraph2,
            bioParagraph3: profData.bio_paragraph_3 || INITIAL_PROFILE.bioParagraph3,
            stageImage: profData.stage_image || INITIAL_PROFILE.stageImage,
            whatsappHotline: profData.whatsapp_hotline || INITIAL_PROFILE.whatsappHotline,
            instagramUrl: profData.instagram_url || INITIAL_PROFILE.instagramUrl,
            spotifyUrl: profData.spotify_url || INITIAL_PROFILE.spotifyUrl,
            coreValues: Array.isArray(profData.core_values)
              ? profData.core_values
              : INITIAL_PROFILE.coreValues
          });
        }

        // 2. Albums
        const { data: albumData } = await supabase
          .from("fanzine_albums")
          .select("*")
          .order("created_at", { ascending: false });

        if (albumData && albumData.length > 0) {
          setAlbums(
            albumData.map((a: any) => ({
              id: a.id,
              title: a.title,
              date: a.date,
              venue: a.venue,
              photographer: a.photographer,
              coverImage: a.cover_image,
              photos: Array.isArray(a.photos) ? a.photos : [a.cover_image]
            }))
          );
        }

        // 3. Gigs
        const { data: gigData } = await supabase
          .from("gigs")
          .select("*")
          .order("created_at", { ascending: false });

        if (gigData && gigData.length > 0) {
          setGigs(
            gigData.map((g: any) => ({
              id: g.id,
              title: g.title,
              date: g.date,
              time: g.time,
              venue: g.venue,
              city: g.city,
              htm: g.htm,
              instagramUrl: g.instagram_url,
              flyerImages: Array.isArray(g.flyer_images) ? g.flyer_images : [],
              status: g.status
            }))
          );
        }

        // 4. Merch
        const { data: merchData } = await supabase
          .from("merch")
          .select("*")
          .order("created_at", { ascending: false });

        if (merchData && merchData.length > 0) {
          setMerch(
            merchData.map((m: any) => ({
              id: m.id,
              name: m.name,
              price: m.price,
              category: m.category,
              image: m.image,
              status: m.status,
              description: m.description
            }))
          );
        }

        // 5. Bookings
        const { data: bookingData } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false });

        if (bookingData && bookingData.length > 0) {
          setBookings(
            bookingData.map((b: any) => ({
              id: b.id,
              senderName: b.sender_name,
              collective: b.collective,
              eventName: b.event_name,
              eventDate: b.event_date,
              whatsapp: b.whatsapp,
              city: b.city,
              notes: b.notes,
              receivedAt: b.created_at
                ? new Date(b.created_at).toLocaleString("id-ID")
                : "Baru saja",
              status: b.status
            }))
          );
        }
      } catch (err) {
        console.warn("Supabase load fallback:", err);
      }
    }

    loadSupabaseData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleStageImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      triggerToast("Mengupload foto panggung...");
      const uploadedUrl = await uploadImageToStorage(file, "stage");
      setProfile(prev => ({ ...prev, stageImage: uploadedUrl }));
      triggerToast("Foto panggung berhasil dipilih & diupload!");
    } catch (err) {
      alert("Gagal membaca file foto.");
    }
  };

  const handleAlbumCoverFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      triggerToast("Mengupload cover album...");
      const uploadedUrl = await uploadImageToStorage(file, "covers");
      setAlbumForm(prev => ({ ...prev, coverImage: uploadedUrl }));
      triggerToast("Foto cover album berhasil dipilih!");
    } catch (err) {
      alert("Gagal membaca file foto.");
    }
  };

  const handleAlbumPhotosFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      triggerToast(`Mengupload ${files.length} foto...`);
      const uploadedUrls = await Promise.all(
        Array.from(files).map(f => uploadImageToStorage(f, "gallery"))
      );
      setAlbumForm(prev => ({
        ...prev,
        photos: [...(prev.photos || []), ...uploadedUrls]
      }));
      triggerToast(`${files.length} foto berhasil dimasukkan dari folder!`);
    } catch (err) {
      alert("Gagal membaca file foto.");
    }
  };

  const handleGigFlyersFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    try {
      triggerToast(`Mengupload ${files.length} flyer...`);
      const uploadedUrls = await Promise.all(
        Array.from(files).map(f => uploadImageToStorage(f, "flyers"))
      );
      setGigForm(prev => ({
        ...prev,
        flyerImages: [...(prev.flyerImages || []), ...uploadedUrls]
      }));
      triggerToast(`${files.length} gambar flyer dipilih!`);
    } catch (err) {
      alert("Gagal membaca file flyer.");
    }
  };

  const handleMerchImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      triggerToast("Mengupload foto produk...");
      const uploadedUrl = await uploadImageToStorage(file, "merch");
      setMerchForm(prev => ({ ...prev, image: uploadedUrl }));
      triggerToast("Foto produk dipilih dari folder!");
    } catch (err) {
      alert("Gagal membaca file foto.");
    }
  };

  // Login handler (Default simple PIN: "silly123" or "punk")
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === "silly123" || pinInput.trim() === "punk" || pinInput.trim() === "admin") {
      setIsAuthenticated(true);
      setPinError("");
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_admin_logged", "true");
      }
      triggerToast("Selamat datang di HQ Management Silly N Valley!");
    } else {
      setPinError("Kunci akses salah. Coba: silly123");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("snv_admin_logged");
    }
  };

  // Save Handlers
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      triggerToast("Menyimpan perubahan ke cloud...");
      const { error } = await supabase.from("band_profile").upsert({
        id: "main",
        band_name: profile.bandName,
        tagline: profile.tagline,
        headline_quote: profile.headlineQuote,
        bio_paragraph_1: profile.bioParagraph1,
        bio_paragraph_2: profile.bioParagraph2,
        bio_paragraph_3: profile.bioParagraph3,
        stage_image: profile.stageImage,
        whatsapp_hotline: profile.whatsappHotline,
        instagram_url: profile.instagramUrl,
        spotify_url: profile.spotifyUrl,
        core_values: profile.coreValues,
        updated_at: new Date().toISOString()
      });
      if (error) {
        console.warn("Supabase save profile warning:", error.message);
      }
    } catch (err) {
      console.warn("Profile cloud save fallback:", err);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("snv_profile", JSON.stringify(profile));
    }
    triggerToast("Data Profile & About Us berhasil disimpan!");
  };

  // Album Handlers
  const handleOpenCreateAlbum = () => {
    setEditingAlbumId(null);
    setAlbumForm({
      title: "",
      date: "",
      venue: "",
      photographer: "@silly.n.valley",
      coverImage: "",
      photos: []
    });
    setIsAlbumModalOpen(true);
  };

  const handleOpenEditAlbum = (alb: FanzineAlbum) => {
    setEditingAlbumId(alb.id);
    setAlbumForm({
      title: alb.title,
      date: alb.date,
      venue: alb.venue,
      photographer: alb.photographer,
      coverImage: alb.coverImage,
      photos: alb.photos
    });
    setIsAlbumModalOpen(true);
  };

  const handleSaveAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!albumForm.title || !albumForm.coverImage) {
      alert("Judul dan foto sampul wajib diisi.");
      return;
    }

    if (editingAlbumId) {
      const updatedPhotos = albumForm.photos && albumForm.photos.length > 0 ? albumForm.photos : [albumForm.coverImage!];
      const updated = albums.map(a =>
        a.id === editingAlbumId
          ? {
              ...a,
              title: albumForm.title!,
              date: albumForm.date || a.date,
              venue: albumForm.venue || a.venue,
              photographer: albumForm.photographer || a.photographer,
              coverImage: albumForm.coverImage!,
              photos: updatedPhotos
            }
          : a
      );
      setAlbums(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_albums", JSON.stringify(updated));
      }

      try {
        await supabase
          .from("fanzine_albums")
          .update({
            title: albumForm.title!,
            date: albumForm.date || "",
            venue: albumForm.venue || "",
            photographer: albumForm.photographer || "@silly.n.valley",
            cover_image: albumForm.coverImage!,
            photos: updatedPhotos
          })
          .eq("id", editingAlbumId);
      } catch (err) {
        console.warn("Supabase album update note:", err);
      }

      setIsAlbumModalOpen(false);
      setEditingAlbumId(null);
      triggerToast("Album dokumentasi berhasil diperbarui!");
      return;
    }

    const newAlbum: FanzineAlbum = {
      id: "alb-" + Date.now(),
      title: albumForm.title,
      date: albumForm.date || "2026",
      venue: albumForm.venue || "Tangerang",
      photographer: albumForm.photographer || "@silly.n.valley",
      coverImage: albumForm.coverImage,
      photos: albumForm.photos && albumForm.photos.length > 0 ? albumForm.photos : [albumForm.coverImage]
    };
    const updated = [newAlbum, ...albums];
    setAlbums(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("snv_albums", JSON.stringify(updated));
    }

    try {
      await supabase.from("fanzine_albums").insert({
        id: newAlbum.id,
        title: newAlbum.title,
        date: newAlbum.date,
        venue: newAlbum.venue,
        photographer: newAlbum.photographer,
        cover_image: newAlbum.coverImage,
        photos: newAlbum.photos
      });
    } catch (err) {
      console.warn("Supabase album insert note:", err);
    }

    setIsAlbumModalOpen(false);
    triggerToast("Album dokumentasi gigs berhasil ditambahkan!");
  };

  const handleDeleteAlbum = async (id: string) => {
    if (confirm("Yakin ingin menghapus album dokumentasi ini?")) {
      const updated = albums.filter(a => a.id !== id);
      setAlbums(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_albums", JSON.stringify(updated));
      }
      try {
        await supabase.from("fanzine_albums").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase album delete note:", err);
      }
      triggerToast("Album dihapus.");
    }
  };

  // Gig Handlers
  const handleOpenCreateGig = () => {
    setEditingGigId(null);
    setGigForm({
      title: "",
      date: "",
      time: "19:00 WIB",
      venue: "",
      city: "Kota Tangerang",
      htm: "Gratis / Donasi",
      instagramUrl: "https://instagram.com/silly.n.valley",
      flyerImages: [],
      status: "upcoming"
    });
    setIsGigModalOpen(true);
  };

  const handleOpenEditGig = (g: GigItem) => {
    setEditingGigId(g.id);
    setGigForm({
      title: g.title,
      date: g.date,
      time: g.time,
      venue: g.venue,
      city: g.city,
      htm: g.htm,
      instagramUrl: g.instagramUrl,
      flyerImages: g.flyerImages,
      status: g.status
    });
    setIsGigModalOpen(true);
  };

  const handleSaveGig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gigForm.title || !gigForm.venue) {
      alert("Nama gigs dan venue wajib diisi.");
      return;
    }

    if (editingGigId) {
      const updatedFlyers = gigForm.flyerImages && gigForm.flyerImages.length > 0 ? gigForm.flyerImages : [];
      const updated = gigs.map(g =>
        g.id === editingGigId
          ? {
              ...g,
              title: gigForm.title!,
              date: gigForm.date || g.date,
              time: gigForm.time || g.time,
              venue: gigForm.venue!,
              city: gigForm.city || g.city,
              htm: gigForm.htm || g.htm,
              instagramUrl: gigForm.instagramUrl || g.instagramUrl,
              flyerImages: updatedFlyers.length > 0 ? updatedFlyers : g.flyerImages,
              status: (gigForm.status as any) || g.status
            }
          : g
      );
      setGigs(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_gigs", JSON.stringify(updated));
      }

      try {
        await supabase
          .from("gigs")
          .update({
            title: gigForm.title!,
            date: gigForm.date || "",
            time: gigForm.time || "19:00 WIB",
            venue: gigForm.venue!,
            city: gigForm.city || "Kota Tangerang",
            htm: gigForm.htm || "Donasi",
            instagram_url: gigForm.instagramUrl || "https://instagram.com/silly.n.valley",
            flyer_images: updatedFlyers,
            status: gigForm.status || "upcoming"
          })
          .eq("id", editingGigId);
      } catch (err) {
        console.warn("Supabase gig update note:", err);
      }

      setIsGigModalOpen(false);
      setEditingGigId(null);
      triggerToast("Jadwal gigs berhasil diperbarui!");
      return;
    }

    const newGig: GigItem = {
      id: "gig-" + Date.now(),
      title: gigForm.title,
      date: gigForm.date || "Segera",
      time: gigForm.time || "19:00 WIB",
      venue: gigForm.venue,
      city: gigForm.city || "Kota Tangerang",
      htm: gigForm.htm || "Donasi",
      instagramUrl: gigForm.instagramUrl || "https://instagram.com/silly.n.valley",
      flyerImages:
        gigForm.flyerImages && gigForm.flyerImages.length > 0
          ? gigForm.flyerImages
          : ["/assets/silly-n-valley/gigs/flyer-latihan.png"],
      status: (gigForm.status as "upcoming" | "completed" | "cancelled") || "upcoming"
    };
    const updated = [newGig, ...gigs];
    setGigs(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("snv_gigs", JSON.stringify(updated));
    }

    try {
      await supabase.from("gigs").insert({
        id: newGig.id,
        title: newGig.title,
        date: newGig.date,
        time: newGig.time,
        venue: newGig.venue,
        city: newGig.city,
        htm: newGig.htm,
        instagram_url: newGig.instagramUrl,
        flyer_images: newGig.flyerImages,
        status: newGig.status
      });
    } catch (err) {
      console.warn("Supabase gig insert note:", err);
    }

    setIsGigModalOpen(false);
    triggerToast("Jadwal gigs & flyer berhasil ditambahkan!");
  };

  const handleDeleteGig = async (id: string) => {
    if (confirm("Hapus jadwal gigs ini?")) {
      const updated = gigs.filter(g => g.id !== id);
      setGigs(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_gigs", JSON.stringify(updated));
      }
      try {
        await supabase.from("gigs").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase gig delete note:", err);
      }
      triggerToast("Jadwal gigs dihapus.");
    }
  };

  // Merch Handlers
  const handleOpenCreateMerch = () => {
    setEditingMerchId(null);
    setMerchForm({
      name: "",
      price: "Rp 50.000",
      category: "apparel",
      image: "",
      status: "available",
      description: ""
    });
    setIsMerchModalOpen(true);
  };

  const handleOpenEditMerch = (m: MerchItem) => {
    setEditingMerchId(m.id);
    setMerchForm({
      name: m.name,
      price: m.price,
      category: m.category,
      image: m.image,
      status: m.status,
      description: m.description
    });
    setIsMerchModalOpen(true);
  };

  const handleSaveMerch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchForm.name || !merchForm.price) {
      alert("Nama produk dan harga wajib diisi.");
      return;
    }

    if (editingMerchId) {
      const updated = merch.map(m =>
        m.id === editingMerchId
          ? {
              ...m,
              name: merchForm.name!,
              price: merchForm.price!,
              category: (merchForm.category as any) || m.category,
              image: merchForm.image || m.image,
              status: (merchForm.status as any) || m.status,
              description: merchForm.description !== undefined ? merchForm.description : m.description
            }
          : m
      );
      setMerch(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_merch", JSON.stringify(updated));
      }

      try {
        await supabase
          .from("merch")
          .update({
            name: merchForm.name!,
            price: merchForm.price!,
            category: merchForm.category || "apparel",
            image: merchForm.image || "/assets/silly-n-valley/cover.jpg",
            status: merchForm.status || "available",
            description: merchForm.description || ""
          })
          .eq("id", editingMerchId);
      } catch (err) {
        console.warn("Supabase merch update note:", err);
      }

      setIsMerchModalOpen(false);
      setEditingMerchId(null);
      triggerToast("Produk merch berhasil diperbarui!");
      return;
    }

    const newItem: MerchItem = {
      id: "merch-" + Date.now(),
      name: merchForm.name,
      price: merchForm.price,
      category: (merchForm.category as "cassette" | "apparel" | "accessories" | "bundle") || "apparel",
      image: merchForm.image || "/assets/silly-n-valley/cover.jpg",
      status: (merchForm.status as "available" | "preorder" | "soldout") || "available",
      description: merchForm.description || ""
    };
    const updated = [newItem, ...merch];
    setMerch(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("snv_merch", JSON.stringify(updated));
    }

    try {
      await supabase.from("merch").insert({
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        image: newItem.image,
        status: newItem.status,
        description: newItem.description
      });
    } catch (err) {
      console.warn("Supabase merch insert note:", err);
    }

    setIsMerchModalOpen(false);
    triggerToast("Produk merch berhasil ditambahkan!");
  };

  const handleDeleteMerch = async (id: string) => {
    if (confirm("Hapus produk merch ini?")) {
      const updated = merch.filter(m => m.id !== id);
      setMerch(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_merch", JSON.stringify(updated));
      }
      try {
        await supabase.from("merch").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase merch delete note:", err);
      }
      triggerToast("Merch dihapus.");
    }
  };

  const handleToggleBookingStatus = async (id: string) => {
    let nextStatus: "unread" | "replied" = "replied";
    const updated = bookings.map(b => {
      if (b.id === id) {
        nextStatus = b.status === "unread" ? ("replied" as const) : ("unread" as const);
        return {
          ...b,
          status: nextStatus
        };
      }
      return b;
    });
    setBookings(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("snv_bookings", JSON.stringify(updated));
    }
    try {
      await supabase.from("bookings").update({ status: nextStatus }).eq("id", id);
    } catch (err) {
      console.warn("Supabase booking status update note:", err);
    }
    triggerToast("Status pesan diperbarui.");
  };

  const handleDeleteBooking = async (id: string) => {
    if (confirm("Hapus pesan booking ini?")) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("snv_bookings", JSON.stringify(updated));
      }
      try {
        await supabase.from("bookings").delete().eq("id", id);
      } catch (err) {
        console.warn("Supabase booking delete note:", err);
      }
      triggerToast("Pesan dihapus.");
    }
  };

  // =========================================================================
  // VIEW: LOGIN SCREEN (IF NOT AUTHENTICATED)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#10031B] text-[#F3EFE0] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1F0833] border-4 border-black p-8 shadow-[8px_8px_0px_#D4E627] relative">
          <div className="text-center space-y-3 mb-6">
            <div className="inline-block bg-[#D4E627] text-[#12041D] text-xs font-black uppercase px-3 py-1 border-2 border-black -rotate-2">
              RESTRICTED ACCESS
            </div>
            <h1 className="text-4xl font-punk uppercase tracking-normal text-[#F3EFE0]">
              SILLY N VALLEY HQ
            </h1>
            <p className="text-xs font-mono text-[#CBB8DC]">
              Panel Manajemen Konten & Operasional Band Punk Tangerang
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#D4E627] uppercase mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Kunci Akses Admin
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={e => setPinInput(e.target.value)}
                placeholder="Masukkan kata sandi (contoh: silly123)"
                className="w-full bg-[#12041D] border-2 border-black p-3 text-sm font-mono text-[#F3EFE0] focus:outline-none focus:border-[#D4E627] shadow-[2px_2px_0px_#000]"
                autoFocus
              />
              {pinError && (
                <div className="mt-2 text-xs font-mono text-[#FF4D4D] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {pinError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] py-3.5 font-punk text-lg uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#00BFA5] active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Buka Dashboard HQ</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t-2 border-dashed border-[#572288] text-center">
            <Link
              href="/"
              className="text-xs font-mono text-[#00BFA5] hover:underline flex items-center justify-center gap-1"
            >
              ← Kembali ke Website Publik (sillynvalley.web.id)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#12041D] text-[#F3EFE0] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00BFA5] text-[#12041D] font-mono font-black text-xs px-4 py-3 border-2 border-black shadow-[5px_5px_0px_#000] flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#12041D]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-[#1C0730] border-b-4 border-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#D4E627] text-[#12041D] px-2.5 py-1 font-punk text-xl border-2 border-black shadow-[2px_2px_0px_#00BFA5] -rotate-1">
              HQ
            </div>
            <div>
              <div className="font-punk text-xl uppercase tracking-wider text-[#F3EFE0] leading-none">
                Silly N Valley Admin
              </div>
              <div className="text-[10px] font-mono font-bold text-[#00BFA5] uppercase">
                Band Management Center
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="bg-[#240A3D] hover:bg-[#340F57] text-[#D4E627] text-xs font-mono font-bold px-3 py-2 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-colors"
            >
              <span>Lihat Web Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="bg-[#D90429] hover:bg-[#b00320] text-white text-xs font-mono font-bold px-3 py-2 border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-[#2A0E44] border-t-2 border-black overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 py-1.5">
            {[
              { id: "profile", label: "Profile & About Us", icon: Flame },
              { id: "albums", label: "Dokumentasi (Fanzine)", icon: Camera, count: albums.length },
              { id: "gigs", label: "Gigs & Flyer", icon: Calendar, count: gigs.length },
              { id: "merch", label: "Katalog Merch", icon: ShoppingBag, count: merch.length },
              {
                id: "bookings",
                label: "Pesan Booking",
                icon: Inbox,
                count: bookings.filter(b => b.status === "unread").length,
                highlightBadge: bookings.filter(b => b.status === "unread").length > 0
              }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 text-xs font-mono font-bold uppercase border-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#D4E627] text-[#12041D] border-black shadow-[2px_2px_0px_#00BFA5] -translate-y-0.5"
                      : "bg-[#1C0730] text-[#CBB8DC] border-transparent hover:border-black hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                        tab.highlightBadge
                          ? "bg-[#D90429] text-white animate-pulse"
                          : isActive
                          ? "bg-[#12041D] text-[#D4E627]"
                          : "bg-[#331154] text-[#CBB8DC]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* =====================================================================
            TAB 1: PROFILE & ABOUT US EDITOR
        ===================================================================== */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-dashed border-[#572288]">
              <div>
                <h2 className="text-3xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                  Edit Profile & About Us
                </h2>
                <p className="text-xs font-mono text-[#CBB8DC] mt-0.5">
                  Perbarui identitas band, narasi biografi, foto panggung, dan pilar nilai Silly N Valley.
                </p>
              </div>
              <button
                onClick={handleSaveProfile}
                className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-6 py-2.5 font-punk text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#00BFA5] flex items-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Bio & Info */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#1C0830] border-3 border-black p-5 shadow-[5px_5px_0px_#000] space-y-4">
                  <h3 className="text-lg font-punk uppercase text-[#D4E627] flex items-center gap-2">
                    <Flame className="w-4 h-4" /> Informasi Utama
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                        Nama Band
                      </label>
                      <input
                        type="text"
                        value={profile.bandName}
                        onChange={e => setProfile({ ...profile, bandName: e.target.value })}
                        className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                        Tagline Utama
                      </label>
                      <input
                        type="text"
                        value={profile.tagline}
                        onChange={e => setProfile({ ...profile, tagline: e.target.value })}
                        className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                      Deskripsi Ringkas / Headline
                    </label>
                    <input
                      type="text"
                      value={profile.headlineQuote}
                      onChange={e => setProfile({ ...profile, headlineQuote: e.target.value })}
                      className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                    />
                  </div>
                </div>

                {/* Paragraf Narasi Bio */}
                <div className="bg-[#1C0830] border-3 border-black p-5 shadow-[5px_5px_0px_#000] space-y-4">
                  <h3 className="text-lg font-punk uppercase text-[#00BFA5] flex items-center gap-2">
                    <Edit3 className="w-4 h-4" /> Paragraf Biografi & Cerita Band
                  </h3>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                      Paragraf 1 (Awal Mula & Asal Kota)
                    </label>
                    <textarea
                      rows={3}
                      value={profile.bioParagraph1}
                      onChange={e => setProfile({ ...profile, bioParagraph1: e.target.value })}
                      className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                      Paragraf 2 (Kultur Konten & Musik)
                    </label>
                    <textarea
                      rows={3}
                      value={profile.bioParagraph2}
                      onChange={e => setProfile({ ...profile, bioParagraph2: e.target.value })}
                      className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                      Paragraf 3 (Semangat Independen & Pergerakan)
                    </label>
                    <textarea
                      rows={3}
                      value={profile.bioParagraph3}
                      onChange={e => setProfile({ ...profile, bioParagraph3: e.target.value })}
                      className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627] leading-relaxed"
                    />
                  </div>
                </div>

                {/* Kontak & Hotline */}
                <div className="bg-[#1C0830] border-3 border-black p-5 shadow-[5px_5px_0px_#000] space-y-4">
                  <h3 className="text-lg font-punk uppercase text-[#D4E627] flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" /> Kontak & Media Sosial
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                        Hotline WhatsApp
                      </label>
                      <input
                        type="text"
                        value={profile.whatsappHotline}
                        onChange={e => setProfile({ ...profile, whatsappHotline: e.target.value })}
                        className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                        URL Instagram
                      </label>
                      <input
                        type="text"
                        value={profile.instagramUrl}
                        onChange={e => setProfile({ ...profile, instagramUrl: e.target.value })}
                        className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Stage Photo & Core Values */}
              <div className="lg:col-span-5 space-y-6">
                {/* Stage Photo Banner */}
                <div className="bg-[#1C0830] border-3 border-black p-5 shadow-[5px_5px_0px_#000] space-y-3">
                  <h3 className="text-lg font-punk uppercase text-[#D4E627] flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Foto Banner Panggung About Us
                  </h3>

                  <div className="border-2 border-black overflow-hidden bg-black aspect-video relative group">
                    <img
                      src={profile.stageImage}
                      alt="Preview About Us"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-mono text-[#D4E627]">
                      Live Preview di Web
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="cursor-pointer w-full bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] py-2.5 px-4 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all">
                      <FolderOpen className="w-4 h-4" />
                      <span>Buka Folder & Pilih Foto Baru</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleStageImageFileChange}
                      />
                    </label>

                    <div className="pt-2 border-t border-[#331154]">
                      <label className="block text-[11px] font-mono font-bold text-[#888] uppercase mb-1">
                        Atau Masukkan Path / URL Manual:
                      </label>
                      <input
                        type="text"
                        value={profile.stageImage}
                        onChange={e => setProfile({ ...profile, stageImage: e.target.value })}
                        className="w-full bg-[#12041D] border-2 border-black p-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4 Core Values Preview */}
                <div className="bg-[#1C0830] border-3 border-black p-5 shadow-[5px_5px_0px_#000] space-y-3">
                  <h3 className="text-lg font-punk uppercase text-[#00BFA5] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> 4 Pilar Nilai (Core Values)
                  </h3>
                  <div className="space-y-3">
                    {profile.coreValues.map((cv, idx) => (
                      <div key={idx} className="bg-[#12041D] border border-black p-3 space-y-1 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#D4E627] uppercase">{cv.title}</strong>
                          <span className="text-[10px] bg-[#2E104B] text-[#00BFA5] px-1.5 py-0.5 border border-black">
                            {cv.badge}
                          </span>
                        </div>
                        <p className="text-[#CBB8DC] text-[11px] leading-relaxed">{cv.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* =====================================================================
            TAB 2: FANZINE PHOTO GALLERY (ALBUMS PER GIGS)
        ===================================================================== */}
        {activeTab === "albums" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-dashed border-[#572288]">
              <div>
                <h2 className="text-3xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                  Fanzine Photo Gallery (Arsip per Gigs)
                </h2>
                <p className="text-xs font-mono text-[#CBB8DC] mt-0.5">
                  Kelola album dokumentasi panggung. Di halaman depan akan tampil cover utama, dan ketika diklik bisa digeser semua fotonya.
                </p>
              </div>
              <button
                onClick={handleOpenCreateAlbum}
                className="bg-[#00BFA5] hover:bg-[#00a892] text-[#12041D] px-5 py-2.5 font-punk text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#D4E627] flex items-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Album Gigs Baru</span>
              </button>
            </div>

            {/* Albums Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map(alb => (
                <div
                  key={alb.id}
                  className="bg-[#1C0830] border-3 border-black p-4 shadow-[5px_5px_0px_#000] flex flex-col justify-between hover:border-[#D4E627] transition-all group"
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="relative aspect-4/3 bg-black border-2 border-black overflow-hidden mb-3">
                      <img
                        src={alb.coverImage}
                        alt={alb.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-[#12041D] text-[#D4E627] text-[10px] font-mono font-black px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                        {alb.photos.length} FOTO
                      </div>
                      <div className="absolute bottom-2 left-2 bg-[#00BFA5] text-[#12041D] text-[10px] font-mono font-black px-2 py-0.5 border border-black">
                        {alb.date}
                      </div>
                    </div>

                    <h3 className="text-xl font-punk uppercase text-[#F3EFE0] tracking-wide leading-tight">
                      {alb.title}
                    </h3>

                    <div className="mt-2 space-y-1 text-xs font-mono text-[#CBB8DC]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#D4E627]" />
                        <span>{alb.venue}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#00BFA5]" />
                        <span>Foto: {alb.photographer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t-2 border-dashed border-[#572288] flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActivePreviewAlbum(alb);
                        setPreviewPhotoIndex(0);
                      }}
                      className="bg-[#240A3D] hover:bg-[#340F57] text-[#D4E627] px-3 py-1.5 text-xs font-mono font-bold border border-black flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Jajal Slider ({alb.photos.length})</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditAlbum(alb)}
                        className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-2.5 py-1.5 text-xs font-mono font-bold border border-black flex items-center gap-1 cursor-pointer"
                        title="Edit Album"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteAlbum(alb.id)}
                        className="bg-[#D90429]/20 hover:bg-[#D90429] text-[#FF4D4D] hover:text-white p-1.5 border border-black transition-colors cursor-pointer"
                        title="Hapus Album"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: GIGS & FLYER WALL (WITH INSTAGRAM LINK)
        ===================================================================== */}
        {activeTab === "gigs" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-dashed border-[#572288]">
              <div>
                <h2 className="text-3xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                  Jadwal Gigs & Flyer Wall
                </h2>
                <p className="text-xs font-mono text-[#CBB8DC] mt-0.5">
                  Fokus pada panggung mendatang. Masukkan poster flyer (support multi-foto) dan link postingan Instagram.
                </p>
              </div>
              <button
                onClick={handleOpenCreateGig}
                className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-5 py-2.5 font-punk text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#00BFA5] flex items-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Jadwal Gigs</span>
              </button>
            </div>

            {/* Gigs List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {gigs.map(g => (
                <div
                  key={g.id}
                  className="bg-[#1C0830] border-3 border-black p-5 shadow-[5px_5px_0px_#000] flex flex-col sm:flex-row gap-5 items-start justify-between"
                >
                  {/* Flyer Thumbnail with Multi-flyer indicator */}
                  <div className="w-full sm:w-44 shrink-0 aspect-3/4 bg-black border-2 border-black overflow-hidden relative">
                    <img
                      src={g.flyerImages[0] || "/assets/silly-n-valley/gigs/flyer-latihan.png"}
                      alt={g.title}
                      className="w-full h-full object-cover"
                    />
                    {g.flyerImages.length > 1 && (
                      <div className="absolute top-2 right-2 bg-[#D4E627] text-[#12041D] text-[10px] font-mono font-black px-1.5 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                        +{g.flyerImages.length - 1} FLYER
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 bg-[#12041D] text-[#00BFA5] text-[10px] font-mono font-black px-2 py-0.5 border border-black">
                      {g.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Gig Info */}
                  <div className="flex-1 space-y-2.5 w-full">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-[#2E104B] text-[#D4E627] text-[10px] font-mono font-bold px-2 py-0.5 border border-[#D4E627]">
                        {g.date} • {g.time}
                      </span>
                      <button
                        onClick={() => handleDeleteGig(g.id)}
                        className="text-[#888] hover:text-[#FF4D4D] p-1 cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3 className="text-2xl font-punk uppercase text-[#F3EFE0] tracking-wide leading-tight">
                      {g.title}
                    </h3>

                    <div className="space-y-1 text-xs font-mono text-[#CBB8DC]">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#00BFA5]" />
                        <span>{g.venue}, {g.city}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-[#D4E627]" />
                        <span>HTM: {g.htm}</span>
                      </div>
                    </div>

                    {/* Actions & Instagram Link Button */}
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleOpenEditGig(g)}
                        className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-3 py-1.5 text-xs font-mono font-bold border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Gigs</span>
                      </button>

                      <a
                        href={g.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#B879AD] hover:bg-[#a6689b] text-[#12041D] px-3 py-1.5 text-xs font-mono font-bold border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
                      >
                        <span>Lihat di Instagram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: MERCH & KASET DROP
        ===================================================================== */}
        {activeTab === "merch" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b-2 border-dashed border-[#572288]">
              <div>
                <h2 className="text-3xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                  Katalog Merch & Kaset Drop
                </h2>
                <p className="text-xs font-mono text-[#CBB8DC] mt-0.5">
                  Atur stok rilisan fisik kaset pita, t-shirt distro, dan aksesoris Silly N Valley.
                </p>
              </div>
              <button
                onClick={handleOpenCreateMerch}
                className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-5 py-2.5 font-punk text-base uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#00BFA5] flex items-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Produk Merch</span>
              </button>
            </div>

            {/* Merch Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {merch.map(m => (
                <div
                  key={m.id}
                  className="bg-[#1C0830] border-3 border-black p-4 shadow-[5px_5px_0px_#000] flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square bg-black border-2 border-black overflow-hidden relative mb-3">
                      <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                      <div
                        className={`absolute top-2 right-2 text-[10px] font-mono font-black px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000] uppercase ${
                          m.status === "available"
                            ? "bg-[#D4E627] text-[#12041D]"
                            : m.status === "preorder"
                            ? "bg-[#00BFA5] text-[#12041D]"
                            : "bg-[#D90429] text-white"
                        }`}
                      >
                        {m.status === "available" ? "TERSEDIA" : m.status === "preorder" ? "PRE-ORDER" : "SOLD OUT"}
                      </div>
                    </div>

                    <div className="text-[10px] font-mono font-bold text-[#00BFA5] uppercase">
                      {m.category}
                    </div>
                    <h3 className="text-xl font-punk uppercase text-[#F3EFE0] tracking-wide leading-tight mt-0.5">
                      {m.name}
                    </h3>
                    <div className="text-lg font-punk text-[#D4E627] mt-1">{m.price}</div>
                    <p className="text-xs font-mono text-[#CBB8DC] mt-2 line-clamp-2">
                      {m.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-dashed border-[#572288] flex items-center justify-between gap-1">
                    <button
                      onClick={() => {
                        const nextStatus: Record<string, MerchItem["status"]> = {
                          available: "preorder",
                          preorder: "soldout",
                          soldout: "available"
                        };
                        const updated = merch.map(item =>
                          item.id === m.id ? { ...item, status: nextStatus[item.status] } : item
                        );
                        setMerch(updated);
                        if (typeof window !== "undefined") {
                          localStorage.setItem("snv_merch", JSON.stringify(updated));
                        }
                        triggerToast("Status stok diubah!");
                      }}
                      className="bg-[#240A3D] hover:bg-[#340F57] text-white px-2.5 py-1.5 text-[11px] font-mono font-bold border border-black cursor-pointer"
                    >
                      Status Stok ↻
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditMerch(m)}
                        className="bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] px-2.5 py-1.5 text-[11px] font-mono font-bold border border-black flex items-center gap-1 cursor-pointer"
                        title="Edit Merch"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteMerch(m.id)}
                        className="text-[#FF4D4D] hover:text-white p-1.5 cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 5: PESAN BOOKING MASUK (INBOX)
        ===================================================================== */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="pb-4 border-b-2 border-dashed border-[#572288]">
              <h2 className="text-3xl font-punk uppercase tracking-normal text-[#F3EFE0]">
                Pesan Booking & Tawaran Gigs Masuk
              </h2>
              <p className="text-xs font-mono text-[#CBB8DC] mt-0.5">
                Daftar ajakan kolaborasi dan booking panggung dari form website publik.
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-[#1C0830] border-3 border-black p-12 text-center text-xs font-mono text-[#888]">
                Belum ada pesan booking yang masuk.
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map(b => (
                  <div
                    key={b.id}
                    className={`border-3 border-black p-5 shadow-[5px_5px_0px_#000] space-y-3 transition-colors ${
                      b.status === "unread" ? "bg-[#25093E] border-l-8 border-l-[#D4E627]" : "bg-[#180528]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#D4E627] text-[#12041D] text-xs font-black px-2 py-0.5 font-mono uppercase border border-black">
                          {b.senderName}
                        </span>
                        {b.collective && (
                          <span className="text-xs font-mono text-[#00BFA5] font-bold">
                            ({b.collective})
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 border border-black uppercase ${
                            b.status === "unread" ? "bg-[#D90429] text-white" : "bg-[#12041D] text-[#888]"
                          }`}
                        >
                          {b.status === "unread" ? "BELUM DIBALAS" : "SUDAH DIBALAS"}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[#888]">{b.receivedAt}</span>
                    </div>

                    <div className="text-sm font-mono text-[#F3EFE0] bg-[#10031B] p-3 border border-black rounded">
                      <div className="text-xs text-[#D4E627] font-bold mb-1">
                        ACARA: {b.eventName} • TANGGAL: {b.eventDate} ({b.city})
                      </div>
                      <p className="leading-relaxed">&quot;{b.notes}&quot;</p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="text-xs font-mono text-[#CBB8DC]">
                        WhatsApp: <strong className="text-white">{b.whatsapp}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Halo ${b.senderName}, terima kasih sudah menghubungi Silly N Valley mengenai acara ${b.eventName}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (b.status === "unread") handleToggleBookingStatus(b.id);
                          }}
                          className="bg-[#25D366] hover:bg-[#1eb956] text-black px-4 py-1.5 text-xs font-mono font-black border border-black shadow-[2px_2px_0px_#000] flex items-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Balas via WhatsApp</span>
                        </a>

                        <button
                          onClick={() => handleToggleBookingStatus(b.id)}
                          className="bg-[#240A3D] hover:bg-[#340F57] text-[#D4E627] px-3 py-1.5 text-xs font-mono font-bold border border-black cursor-pointer"
                        >
                          {b.status === "unread" ? "Tandai Selesai" : "Tandai Belum"}
                        </button>

                        <button
                          onClick={() => handleDeleteBooking(b.id)}
                          className="text-[#888] hover:text-[#FF4D4D] p-1.5 cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* =========================================================================
          MODAL: TAMBAH ALBUM GIGS BARU
      ========================================================================= */}
      {isAlbumModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1C0830] border-4 border-black max-w-xl w-full p-6 shadow-[8px_8px_0px_#00BFA5] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAlbumModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#D4E627]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-punk uppercase text-[#D4E627] mb-4">
              {editingAlbumId ? "Edit Album Dokumentasi Gigs" : "Tambah Album Dokumentasi Gigs"}
            </h3>

            <form onSubmit={handleSaveAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Nama Gigs / Acara
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Showcase Intimate Hala Koffie"
                  value={albumForm.title}
                  onChange={e => setAlbumForm({ ...albumForm, title: e.target.value })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Tanggal Gigs
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 14 Oktober 2026"
                    value={albumForm.date}
                    onChange={e => setAlbumForm({ ...albumForm, date: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Venue / Lokasi
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Hala Koffie Tangerang"
                    value={albumForm.venue}
                    onChange={e => setAlbumForm({ ...albumForm, venue: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Kredit Fotografer
                </label>
                <input
                  type="text"
                  placeholder="@mqrifisnqini"
                  value={albumForm.photographer}
                  onChange={e => setAlbumForm({ ...albumForm, photographer: e.target.value })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Foto Sampul Depan (Cover Gigs)
                </label>
                <div className="space-y-2">
                  <label className="cursor-pointer w-full bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] py-2.5 px-4 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all">
                    <FolderOpen className="w-4 h-4" />
                    <span>Pilih Foto Cover dari Folder</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAlbumCoverFileChange}
                    />
                  </label>
                  {albumForm.coverImage && (
                    <div className="flex items-center gap-2 p-2 bg-[#12041D] border border-black">
                      <div className="w-12 h-12 bg-black border border-black shrink-0 overflow-hidden">
                        <img src={albumForm.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-mono text-[#00BFA5] truncate flex-1">
                        Foto cover terpilih
                      </span>
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Atau masukkan path/URL cover..."
                    value={albumForm.coverImage}
                    onChange={e => setAlbumForm({ ...albumForm, coverImage: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Koleksi Foto Dokumentasi (Bisa Pilih Banyak Foto Sekaligus)
                </label>
                <div className="space-y-2">
                  <label className="cursor-pointer w-full bg-[#00BFA5] hover:bg-[#00a892] text-[#12041D] py-2.5 px-4 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all">
                    <FolderOpen className="w-4 h-4" />
                    <span>Buka Folder & Pilih Banyak Foto Sekaligus (Multi-Select)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleAlbumPhotosFileChange}
                    />
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Atau tambah URL foto manual..."
                      value={newPhotoUrlInput}
                      onChange={e => setNewPhotoUrlInput(e.target.value)}
                      className="flex-1 bg-[#12041D] border-2 border-black p-2 text-xs font-mono text-white focus:outline-none focus:border-[#00BFA5]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newPhotoUrlInput.trim()) {
                          const cur = albumForm.photos || [];
                          setAlbumForm({ ...albumForm, photos: [...cur, newPhotoUrlInput.trim()] });
                          setNewPhotoUrlInput("");
                        }
                      }}
                      className="bg-[#2E104B] text-white px-3 font-mono text-xs font-bold border border-black hover:bg-[#3E1564]"
                    >
                      + Tambah URL
                    </button>
                  </div>

                  {albumForm.photos && albumForm.photos.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-2 bg-[#12041D] border border-black max-h-40 overflow-y-auto">
                      {albumForm.photos.map((p, i) => (
                        <div key={i} className="relative aspect-square bg-black border border-black group">
                          <img src={p} alt={`Photo ${i}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setAlbumForm({
                                ...albumForm,
                                photos: albumForm.photos?.filter((_, idx) => idx !== i)
                              });
                            }}
                            className="absolute -top-1.5 -right-1.5 bg-[#D90429] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black shadow border border-black cursor-pointer"
                            title="Hapus foto ini"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAlbumModalOpen(false)}
                  className="bg-[#240A3D] text-white px-4 py-2 font-mono text-xs border border-black"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#D4E627] text-[#12041D] px-5 py-2 font-punk text-base uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
                >
                  {editingAlbumId ? "Simpan Perubahan Album" : "Simpan Album Gigs"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: TAMBAH JADWAL GIGS & FLYER
      ========================================================================= */}
      {isGigModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1C0830] border-4 border-black max-w-xl w-full p-6 shadow-[8px_8px_0px_#D4E627] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsGigModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#D4E627]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-punk uppercase text-[#D4E627] mb-4">
              {editingGigId ? "Edit Jadwal Gigs & Flyer" : "Tambah Jadwal Gigs & Flyer"}
            </h3>

            <form onSubmit={handleSaveGig} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Nama Acara / Gigs
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Latihan Di Lihatin Vol. 4"
                  value={gigForm.title}
                  onChange={e => setGigForm({ ...gigForm, title: e.target.value })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Tanggal
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 25 November 2026"
                    value={gigForm.date}
                    onChange={e => setGigForm({ ...gigForm, date: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Jam Main
                  </label>
                  <input
                    type="text"
                    placeholder="19:00 WIB"
                    value={gigForm.time}
                    onChange={e => setGigForm({ ...gigForm, time: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="HALA Koffie"
                    value={gigForm.venue}
                    onChange={e => setGigForm({ ...gigForm, venue: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Kota
                  </label>
                  <input
                    type="text"
                    value={gigForm.city}
                    onChange={e => setGigForm({ ...gigForm, city: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  HTM / Tiket
                </label>
                <input
                  type="text"
                  placeholder="Rp 35.000 / Donasi"
                  value={gigForm.htm}
                  onChange={e => setGigForm({ ...gigForm, htm: e.target.value })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Direct Link Instagram Post
                </label>
                <input
                  type="text"
                  placeholder="https://instagram.com/p/..."
                  value={gigForm.instagramUrl}
                  onChange={e => setGigForm({ ...gigForm, instagramUrl: e.target.value })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Flyer Images (Bisa Lebih Dari 1 Untuk Carousel)
                </label>
                <div className="space-y-2">
                  <label className="cursor-pointer w-full bg-[#D4E627] hover:bg-[#c3d51f] text-[#12041D] py-2.5 px-4 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all">
                    <FolderOpen className="w-4 h-4" />
                    <span>Pilih Flyer dari Folder Explorer (Multi-Select)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleGigFlyersFileChange}
                    />
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Atau tambah URL flyer..."
                      value={newFlyerUrlInput}
                      onChange={e => setNewFlyerUrlInput(e.target.value)}
                      className="flex-1 bg-[#12041D] border-2 border-black p-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFlyerUrlInput.trim()) {
                          const cur = gigForm.flyerImages || [];
                          setGigForm({ ...gigForm, flyerImages: [...cur, newFlyerUrlInput.trim()] });
                          setNewFlyerUrlInput("");
                        }
                      }}
                      className="bg-[#2E104B] text-white px-3 font-mono text-xs font-bold border border-black hover:bg-[#3E1564]"
                    >
                      + Tambah URL
                    </button>
                  </div>

                  {gigForm.flyerImages && gigForm.flyerImages.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-2 bg-[#12041D] border border-black max-h-36 overflow-y-auto">
                      {gigForm.flyerImages.map((f, i) => (
                        <div key={i} className="relative aspect-3/4 bg-black border border-black group">
                          <img src={f} alt={`Flyer ${i}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setGigForm({
                                ...gigForm,
                                flyerImages: gigForm.flyerImages?.filter((_, idx) => idx !== i)
                              });
                            }}
                            className="absolute -top-1.5 -right-1.5 bg-[#D90429] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black shadow border border-black cursor-pointer"
                            title="Hapus"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsGigModalOpen(false)}
                  className="bg-[#240A3D] text-white px-4 py-2 font-mono text-xs border border-black"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#D4E627] text-[#12041D] px-5 py-2 font-punk text-base uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
                >
                  {editingGigId ? "Simpan Perubahan Gigs" : "Simpan Jadwal Gigs"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: TAMBAH PRODUK MERCH
      ========================================================================= */}
      {isMerchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1C0830] border-4 border-black max-w-lg w-full p-6 shadow-[8px_8px_0px_#00BFA5] relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsMerchModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#D4E627]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-punk uppercase text-[#D4E627] mb-4">
              {editingMerchId ? "Edit Produk Merch" : "Tambah Produk Merch Baru"}
            </h3>

            <form onSubmit={handleSaveMerch} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Nama Produk
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kaset Pita C-30 Silly N Valley"
                  value={merchForm.name}
                  onChange={e => setMerchForm({ ...merchForm, name: e.target.value })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Harga
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rp 65.000"
                    value={merchForm.price}
                    onChange={e => setMerchForm({ ...merchForm, price: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={merchForm.category}
                    onChange={e => setMerchForm({ ...merchForm, category: e.target.value as any })}
                    className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  >
                    <option value="cassette">Kaset Pita (Tape)</option>
                    <option value="apparel">Kaos / Apparel</option>
                    <option value="accessories">Aksesoris / Pin</option>
                    <option value="bundle">Bundle Paket</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Foto Produk Merch
                </label>
                <div className="space-y-2">
                  <label className="cursor-pointer w-full bg-[#00BFA5] hover:bg-[#00a892] text-[#12041D] py-2.5 px-4 font-punk text-sm uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 flex items-center justify-center gap-2 transition-all">
                    <FolderOpen className="w-4 h-4" />
                    <span>Pilih Foto Produk dari Folder / Galeri</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMerchImageFileChange}
                    />
                  </label>
                  {merchForm.image && (
                    <div className="flex items-center gap-2 p-2 bg-[#12041D] border border-black">
                      <div className="w-12 h-12 bg-black border border-black shrink-0 overflow-hidden">
                        <img src={merchForm.image} alt="Merch Preview" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs font-mono text-[#D4E627] truncate flex-1">
                        Foto produk siap digunakan
                      </span>
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Atau masukkan path/URL manual..."
                    value={merchForm.image}
                    onChange={e => setMerchForm({ ...merchForm, image: e.target.value })}
                    className="w-full bg-[#12041D] border-2 border-black p-2 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Status Ketersediaan
                </label>
                <select
                  value={merchForm.status}
                  onChange={e => setMerchForm({ ...merchForm, status: e.target.value as any })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                >
                  <option value="available">Tersedia (Ready Stock)</option>
                  <option value="preorder">Pre-Order</option>
                  <option value="soldout">Sold Out (Habis)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#CBB8DC] uppercase mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  placeholder="Spesifikasi bahan, sablon, atau kelengkapan..."
                  value={merchForm.description}
                  onChange={e => setMerchForm({ ...merchForm, description: e.target.value })}
                  className="w-full bg-[#12041D] border-2 border-black p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#D4E627]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMerchModalOpen(false)}
                  className="bg-[#240A3D] text-white px-4 py-2 font-mono text-xs border border-black"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#D4E627] text-[#12041D] px-5 py-2 font-punk text-base uppercase border-2 border-black shadow-[3px_3px_0px_#000]"
                >
                  {editingMerchId ? "Simpan Perubahan Merch" : "Simpan Produk Merch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: PREVIEW SLIDER DOKUMENTASI GIGS
      ========================================================================= */}
      {activePreviewAlbum && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#1C0830] border-4 border-black max-w-3xl w-full p-6 shadow-[10px_10px_0px_#D4E627] relative">
            <button
              onClick={() => setActivePreviewAlbum(null)}
              className="absolute -top-3 -right-3 bg-[#D90429] text-white p-2 border-2 border-black font-black hover:scale-110 transition-transform shadow-[2px_2px_0px_#000] z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-3">
              <span className="text-[10px] font-mono font-black uppercase text-[#00BFA5]">
                PREVIEW SLIDER DOKUMENTASI
              </span>
              <h3 className="text-2xl font-punk uppercase text-[#F3EFE0]">
                {activePreviewAlbum.title}
              </h3>
              <p className="text-xs font-mono text-[#CBB8DC]">
                {activePreviewAlbum.venue} • {activePreviewAlbum.date} • Foto oleh {activePreviewAlbum.photographer}
              </p>
            </div>

            {/* Slider View */}
            <div className="aspect-16/10 bg-black border-2 border-black overflow-hidden relative flex items-center justify-center">
              <img
                src={activePreviewAlbum.photos[previewPhotoIndex]}
                alt={`Photo ${previewPhotoIndex + 1}`}
                className="w-full h-full object-contain"
              />

              {activePreviewAlbum.photos.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setPreviewPhotoIndex(
                        (previewPhotoIndex - 1 + activePreviewAlbum.photos.length) %
                          activePreviewAlbum.photos.length
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#2A0E44]/80 hover:bg-[#D4E627] hover:text-[#12041D] text-white p-2 border border-black cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setPreviewPhotoIndex((previewPhotoIndex + 1) % activePreviewAlbum.photos.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#2A0E44]/80 hover:bg-[#D4E627] hover:text-[#12041D] text-white p-2 border border-black cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs font-mono text-[#888]">
              <span>Gunakan panah kiri/kanan untuk geser foto</span>
              <span className="text-[#D4E627] font-bold">
                {previewPhotoIndex + 1} / {activePreviewAlbum.photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
