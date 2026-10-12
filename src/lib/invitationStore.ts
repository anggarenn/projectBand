"use client";

import { useState, useEffect, useCallback } from "react";
import { InvitationData, WishItem } from "@/types/invitation";

export const DEFAULT_INVITATION_DATA: InvitationData = {
  slug: "sarah-faizal",
  activeTheme: "snap-photo",
  coverTitle: "Sarah & Faizal",
  coverSubtitle: "THE WEDDING OF",
  coverPhoto:
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  quoteArabic: "وَمِنْ كُلِّ شَيْءٍ خَلَقْنَا زَوْجَيْنِ لَعَلَّكُمْ تَذَكَّرُوْنَ",
  quoteTranslation:
    "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah.",
  quoteSource: "QS. Adz-Dzariyat: 49",
  openingMessage:
    "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam perayaan pernikahan kami:",
  closingMessage:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.",
  bride: {
    name: "Sarah Amalia, S.I.Kom",
    nickname: "Sarah",
    role: "The Bride",
    parents: "Putri pertama dari Bpk. H. Ahmad Dahlan & Ibu Hj. Siti Aminah",
    instagram: "sarahamalia",
    photo:
      "https://images.unsplash.com/photo-1594552072238-b8a33785b261?q=80&w=800&auto=format&fit=crop",
  },
  groom: {
    name: "Faizal Aditya, S.T.",
    nickname: "Faizal",
    role: "The Groom",
    parents: "Putra bungsu dari Bpk. Drs. Hendra Gunawan & Ibu Hj. Dewi Lestari",
    instagram: "faizaladitya",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
  events: [
    {
      id: "ev-1",
      title: "Akad Nikah",
      date: "2025-12-31",
      dayName: "Rabu",
      startTime: "08:00",
      endTime: "10:00",
      timezone: "WIB",
      venueName: "Masjid Agung Al-Azhar",
      venueAddress: "Jl. Sisingamangaraja, Selong, Kebayoran Baru, Jakarta Selatan",
      googleMapsUrl: "https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta",
    },
    {
      id: "ev-2",
      title: "Resepsi Pernikahan",
      date: "2025-12-31",
      dayName: "Rabu",
      startTime: "11:00",
      endTime: "14:00",
      timezone: "WIB",
      venueName: "Grand Ballroom Hotel Sahid",
      venueAddress: "Jl. Jend. Sudirman No.86, Karet Tengsin, Jakarta Pusat",
      googleMapsUrl: "https://maps.google.com/?q=Hotel+Grand+Sahid+Jaya+Jakarta",
    },
    {
      id: "ev-3",
      title: "Ngunduh Mantu",
      date: "2026-01-04",
      dayName: "Minggu",
      startTime: "10:00",
      endTime: "14:00",
      timezone: "WIB",
      venueName: "Kediaman Mempelai Pria (Pendopo)",
      venueAddress: "Jl. Kaliurang KM 9, Sinduharjo, Sleman, D.I. Yogyakarta",
      googleMapsUrl: "https://maps.google.com/?q=Yogyakarta",
    },
  ],
  dressCode: {
    title: "Dress Code Tamu",
    description:
      "Merupakan suatu kehormatan bila Bapak/Ibu/Saudara/i mengenakan pakaian bernuansa warna berikut demi keselarasan dokumentasi acara:",
    colors: [
      { name: "Batik Sogan", hex: "#6F4E37" },
      { name: "Sand Beige", hex: "#D2B48C" },
      { name: "Terracotta", hex: "#A04F34" },
      { name: "Olive Gold", hex: "#8A7520" },
    ],
  },
  liveStreamingUrl: "https://youtube.com",
  loveStories: [
    {
      id: "story-1",
      title: "When We First Met",
      period: "September 2019",
      story:
        "Pertemuan pertama kami di koridor kampus saat orientasi mahasiswa baru. Berawal dari meminjam buku catatan, percakapan kami mengalir dan tak pernah usai.",
      photo:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "story-2",
      title: "Our Journey",
      period: "Juli 2022",
      story:
        "Melewati masa-masa wisuda bersama, menghadapi awal dunia kerja, dan belajar saling mendukung dalam setiap pencapaian serta tantangan hidup.",
      photo:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "story-3",
      title: "A Promise of Forever",
      period: "Agustus 2024",
      story:
        "Di hadapan kedua keluarga besar, kami mengikat janji suci lamaran untuk melangkah bersama menuju babak baru kehidupan pernikahan.",
      photo:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      caption: "Momen senja di pesisir pantai",
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      caption: "Tatapan penuh kehangatan",
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop",
      caption: "Langkah pertama bersama",
    },
    {
      id: "gal-4",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      caption: "Senyuman terindah hari bahagia",
    },
    {
      id: "gal-5",
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
      caption: "Pelukan di tengah kabut",
    },
    {
      id: "gal-6",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
      caption: "Menatap masa depan",
    },
  ],
  bankAccounts: [
    {
      id: "bank-1",
      bankName: "BCA",
      accountNumber: "5221345678",
      accountHolder: "Faizal Aditya",
    },
    {
      id: "bank-2",
      bankName: "Mandiri",
      accountNumber: "1370019283746",
      accountHolder: "Sarah Amalia",
    },
  ],
  qrisImageUrl:
    "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021126570011ID.CO.QRIS01189360000201123456780208123456780303UME5204581253033605802ID5914FAIZAL+ADITYA6007JAKARTA6304ABCD",
  physicalGift: {
    receiverName: "Sarah Amalia / Faizal Aditya",
    phoneNumber: "081287654321",
    address:
      "Jl. Gandaria Tengah II No. 18, RT 05 / RW 03, Kramat Pela, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12130",
  },
  musicUrl:
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=piano-moment-9835.mp3",
  musicTitle: "Romantic Piano Moments",
  motionVideoUrl: "",
  wishes: [
    {
      id: "w-1",
      name: "Andi Sanjaya",
      attendance: "hadir",
      pax: 2,
      message:
        "Barakallahu lakum wa baraka alaikum wa jama'a bainakuma fii khair. Selamat menempuh hidup baru Faizal dan Sarah! Semoga langgeng dan sakinah mawaddah warahmah.",
      timestamp: "10 menit yang lalu",
    },
    {
      id: "w-2",
      name: "Rina Kusuma & Keluarga",
      attendance: "hadir",
      pax: 3,
      message:
        "Alhamdulillah, selamat ya Sarah sayang! Senang banget dengar kabar bahagia ini. Insya Allah kami sekeluarga hadir merayakan.",
      timestamp: "35 menit yang lalu",
    },
    {
      id: "w-3",
      name: "Dimas Ramadhan",
      attendance: "tidak_hadir",
      pax: 0,
      message:
        "Selamat kawan seperjuangan Faizal & Sarah! Maaf belum bisa hadir langsung karena dinas di luar kota. Doa terbaik menyertai kalian berdua!",
      timestamp: "2 jam yang lalu",
    },
  ],
};

const STORAGE_KEY = "mengundang_invitation_data_v1";

export function getStoredInvitationData(): InvitationData {
  if (typeof window === "undefined") return DEFAULT_INVITATION_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_INVITATION_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_INVITATION_DATA,
      ...parsed,
    };
  } catch {
    return DEFAULT_INVITATION_DATA;
  }
}

export function saveStoredInvitationData(data: InvitationData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event("invitation-data-updated"));
  } catch (e) {
    console.error("Gagal menyimpan data undangan:", e);
  }
}

export function resetStoredInvitationData(): InvitationData {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("invitation-data-updated"));
  }
  return DEFAULT_INVITATION_DATA;
}

export function useInvitationData() {
  const [data, setData] = useState<InvitationData>(DEFAULT_INVITATION_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(getStoredInvitationData());
    setIsLoaded(true);

    const handleUpdate = () => {
      setData(getStoredInvitationData());
    };

    window.addEventListener("invitation-data-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("invitation-data-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateData = useCallback((updater: (prev: InvitationData) => InvitationData) => {
    setData((prev) => {
      const next = updater(prev);
      saveStoredInvitationData(next);
      return next;
    });
  }, []);

  const addWish = useCallback((wish: Omit<WishItem, "id" | "timestamp">) => {
    const newWish: WishItem = {
      ...wish,
      id: "w-" + Date.now(),
      timestamp: "Baru saja",
    };
    setData((prev) => {
      const next = {
        ...prev,
        wishes: [newWish, ...prev.wishes],
      };
      saveStoredInvitationData(next);
      return next;
    });
  }, []);

  return {
    data,
    isLoaded,
    updateData,
    addWish,
    resetToDefault: resetStoredInvitationData,
  };
}
