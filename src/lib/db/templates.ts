/**
 * Database Model & Repository for Templates (Katalog Desain Undangan)
 * Mirroring PostgreSQL table `templates` defined in `schema.sql`.
 */

export interface TemplatePalette {
  bg: string;
  surface: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
}

export interface TemplateRecord {
  id: string; // unique slug e.g. 'motion-art-jawa', 'snap-photo'
  name: string;
  nameIndo: string;
  category: "Modern" | "Minimalis" | "Elegan" | "Tradisional";
  tier: "pro" | "basic";
  coverImage: string;
  palette: TemplatePalette;
  coupleNames: [string, string];
  date: string;
  venue: string;
  quote: string;
  ornamentStyle: "geometric" | "floral" | "calligraphy" | "batik" | "botanical" | "art-deco";
  description: string;
  suitedFor: string;
  hasPreview: boolean; // Flag to filter templates with working live demos
  previewUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Seed Database Records
 * All templates are stored in this database repository.
 */
export const TEMPLATES_DB: TemplateRecord[] = [
  {
    id: "motion-art-jawa",
    name: "Motion Art Jawa",
    nameIndo: "Warisan Budaya Keraton Jawa",
    category: "Tradisional",
    tier: "pro",
    coverImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#141210",
      surface: "#1F1A17",
      accent: "#C59B3C",
      text: "#EAE5DD",
      muted: "#A7A29A",
      border: "#3D342C",
    },
    coupleNames: ["Raden Satria", "Dewi Sekar"],
    date: "Sabtu, 3 Januari 2026",
    venue: "Pendopo Agung Ambarrukmo",
    quote: "Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan",
    ornamentStyle: "batik",
    description:
      "Ornamen gunungan wayang kayon, 3 acara (Akad, Resepsi, Ngunduh Mantu), dress code tamu, dan gending gamelan keraton.",
    suitedFor: "Pernikahan adat Jawa, upacara ageng, pendopo keraton",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa",
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "emerald-velvet-noir",
    name: "Emerald Velvet Noir",
    nameIndo: "Nocturne Elegance & Imperial Gold",
    category: "Elegan",
    tier: "pro",
    coverImage: "/assets/emerald-noir/bg-cover.webp",
    palette: {
      bg: "#061A14",
      surface: "#0D2A20",
      accent: "#D4AF37",
      text: "#F4F6F0",
      muted: "#8BA398",
      border: "rgba(212, 175, 55, 0.28)",
    },
    coupleNames: ["Adrian", "Clarissa"],
    date: "Sabtu, 24 Oktober 2026",
    venue: "The Grand Ballroom, Hotel Mulia Jakarta",
    quote: "Under the celestial canopy of night, two souls unite in timeless elegance.",
    ornamentStyle: "botanical",
    description:
      "Tema malam mewah dengan tirai beludru hijau zamrud gelap, kilau debu emas, dan tipografi editorial anggun untuk resepsi ballroom spektakuler.",
    suitedFor: "Resepsi malam (evening dinner), ballroom hotel bintang 5, black-tie wedding.",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=emerald-velvet-noir",
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "terracotta-earthy-meadow",
    name: "Terracotta Earthy Meadow",
    nameIndo: "Rustic Botanical & Warm Clay",
    category: "Minimalis",
    tier: "pro",
    coverImage: "/assets/terracotta-meadow/bg-cover-kraft.webp",
    palette: {
      bg: "#FAF4EE",
      surface: "#FFFDFB",
      accent: "#BF573F",
      text: "#2D231E",
      muted: "#857468",
      border: "#E3D4C4",
    },
    coupleNames: ["Raka", "Nadia"],
    date: "Minggu, 15 November 2026",
    venue: "Pine Hill Outdoor & Glass House, Lembang Bandung",
    quote: "Rooted in simplicity, blossoming in warm earthy love.",
    ornamentStyle: "botanical",
    description:
      "Tema pernikahan rustic modern bernuansa terakota hangat, linen organik, dan aksen dedaunan pampas kering untuk pesta outdoor di alam terbuka.",
    suitedFor:
      "Garden party, villa wedding, intimate semi-outdoor, sunset celebration.",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=terracotta-earthy-meadow",
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "celestial-twilight",
    name: "Celestial Twilight",
    nameIndo: "Starlight & Cosmic Romance",
    category: "Elegan",
    tier: "pro",
    coverImage: "/assets/celestial-twilight/bg-cover.webp",
    palette: {
      bg: "#080B14",
      surface: "#0F1527",
      accent: "#C8B6FF",
      text: "#F8F9FA",
      muted: "#8E9AAF",
      border: "rgba(200, 182, 255, 0.2)",
    },
    coupleNames: ["Alister", "Celeste"],
    date: "Sabtu, 12 Desember 2026",
    venue: "Skyline Glasshouse & Observatory Rooftop, Jakarta",
    quote:
      "And when the twilight folded the sky into velvet, two stars — Alister and Celeste — chose to burn as one constellation.",
    ornamentStyle: "art-deco",
    description:
      "Tema pernikahan kosmik editorial persembahan Muse Engine: tirai senja beludru langit malam, rasi bintang Alister & Celeste, filosofi fase bulan, dan kilau Starlight Black-Tie.",
    suitedFor:
      "Rooftop reception, evening cocktail wedding, astronomy & modern aesthetic lovers.",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=celestial-twilight",
    isActive: true,
    sortOrder: 4,
  },
  {
    id: "royal-chinoiserie-silk",
    name: "Royal Chinoiserie Silk",
    nameIndo: "Peranakan Heritage & Imperial Peony",
    category: "Tradisional",
    tier: "pro",
    coverImage: "/assets/royal-chinoiserie-silk/bg-cover.webp",
    palette: {
      bg: "#3B080C",
      surface: "#5C131A",
      accent: "#D4AF37",
      text: "#FAF7F0",
      muted: "#D1A7A0",
      border: "rgba(212, 175, 55, 0.3)",
    },
    coupleNames: ["Darren", "Felicia"],
    date: "Minggu, 18 Oktober 2026",
    venue: "Grand Ballroom, The Langham Jakarta",
    quote:
      "Two souls woven by the red thread of destiny, blooming like peonies under the eternal moon.",
    ornamentStyle: "floral",
    description:
      "The Eternal Knot & Peranakan Heritage: Perpaduan sutra merah crimson, sulaman bunga peoni kekaisaran, dan benang merah takdir dalam kehormatan tradisi Sangjit serta ikrar suci pernikahan seumur hidup.",
    suitedFor:
      "Sangjit, Tea Ceremony, Grand Oriental Ballroom, Resepsi Tradisi Tionghoa / Peranakan.",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=royal-chinoiserie-silk",
    isActive: true,
    sortOrder: 5,
  },
  {
    id: "motion-art-sunda",
    name: "Motion Art Sunda Megamendung",
    nameIndo: "Parahyangan Keagungan Megamendung",
    category: "Tradisional",
    tier: "pro",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#0B132B",
      surface: "#111D3D",
      accent: "#D4AF37",
      text: "#FFFFFF",
      muted: "#94A3B8",
      border: "#D4AF37",
    },
    coupleNames: ["Asep Nugraha", "Lilis Permatasari"],
    date: "Minggu, 12 April 2026",
    venue: "Sasana Budaya Ganesha (Sabuga), Bandung",
    quote: "Panceg dina galur, ngahiji dina asih, luyu dina rasa marengan mangsa.",
    ornamentStyle: "batik",
    description:
      "Mahkota Siger Sunda, motif awan Megamendung konsentris emas, alunan suling kecapi Parahyangan, dan atmosfer malam megah.",
    suitedFor: "Pernikahan adat Sunda, Parahyangan royal wedding, resepsi gedung mewah",
    hasPreview: true,
    previewUrl: "/demo/motion-art-sunda?preset=midnight",
    isActive: true,
    sortOrder: 6,
  },
  {
    id: "motion-art-sunda-vintage",
    name: "Sunda Vintage Motion Art",
    nameIndo: "Sunda Vintage Folk Parahyangan",
    category: "Tradisional",
    tier: "pro",
    coverImage: "/assets/motion-art-sunda/bg-stage-sunda-julangngapak-sepia.webp",
    palette: {
      bg: "#EDE5DB",
      surface: "#FFF9F6",
      accent: "#8B4E17",
      text: "#1A140E",
      muted: "#7A6B62",
      border: "#5C3410",
    },
    coupleNames: ["Asep Nugraha", "Lilis Permatasari"],
    date: "Minggu, 12 April 2026",
    venue: "Bale Asri Sasana Budaya Ganesha (Sabuga), Bandung",
    quote: "Panceg dina galur, ngahiji dina asih, luyu dina rasa marengan mangsa.",
    ornamentStyle: "batik",
    description:
      "Motion art video budaya Sunda dengan rumah Julang Ngapak, terasering Parahyangan, ornamen Siger dan Megamendung bernuansa vintage sepia folk hangat.",
    suitedFor: "Pernikahan adat Sunda, Parahyangan folk heritage, intimate & rustic wedding",
    hasPreview: true,
    previewUrl: "/demo/motion-art-sunda?preset=vintage",
    isActive: true,
    sortOrder: 7,
  },
  {
    id: "motion-art-bali",
    name: "Motion Art Bali Royal Puri",
    nameIndo: "Kemegahan Puri Ageng Bali",
    category: "Tradisional",
    tier: "pro",
    coverImage:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#1A120B",
      surface: "#261B12",
      accent: "#D4AF37",
      text: "#F7F3EE",
      muted: "#A89C8F",
      border: "#8C4A2F",
    },
    coupleNames: ["I Wayan Gede", "Ni Made Rai"],
    date: "Sabtu, 18 Juli 2026",
    venue: "Puri Ageng Blahbatuh, Gianyar, Bali",
    quote: "Om Swastyastu, makardi hayuning jagat miwah saluring maurip.",
    ornamentStyle: "batik",
    description:
      "Arsitektur gapura candi bentar pura Bali, alunan tabuh jegog gamelan gong kebyar, ornamen ukiran keemasan, dan visual gerak sinematik.",
    suitedFor: "Pernikahan adat Bali, Pawiwahan, royal intimate celebration",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=bali",
    isActive: true,
    sortOrder: 8,
  },
  {
    id: "motion-art-minang",
    name: "Motion Art Minang Rumah Gadang",
    nameIndo: "Pesona Marawa Rumah Gadang Minangkabau",
    category: "Tradisional",
    tier: "pro",
    coverImage:
      "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#120808",
      surface: "#220F12",
      accent: "#E5A93C",
      text: "#FDFBF7",
      muted: "#BFA59F",
      border: "#8B1E1E",
    },
    coupleNames: ["Sutan Malenggang", "Puti Reno Sari"],
    date: "Minggu, 9 Agustus 2026",
    venue: "Balai Gadang Batusangkar, Tanah Datar",
    quote: "Adat basandi syarak, syarak basandi Kitabullah.",
    ornamentStyle: "batik",
    description:
      "Ornamen ukiran Rangkiang Rumah Gadang, songket Pandai Sikek berkilau, dan keanggunan warna adat Marawa khas Minangkabau.",
    suitedFor: "Pernikahan adat Minang, Baralek Gadang, resepsi megah bernuansa Minangkabau",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=minang",
    isActive: true,
    sortOrder: 9,
  },
  {
    id: "motion-art-aceh-black",
    name: "Motion Art Aceh Black Heritage",
    nameIndo: "Kemegahan Serambi Mekkah & Pinto Aceh",
    category: "Tradisional",
    tier: "pro",
    coverImage: "/assets/motion-art-aceh/bg-cover-aceh-krongbade.webp",
    palette: {
      bg: "#0A0A0A",
      surface: "#141414",
      accent: "#D4AF37",
      text: "#F7F4EB",
      muted: "#A89F91",
      border: "rgba(212, 175, 55, 0.28)",
    },
    coupleNames: ["Teuku Rayhan", "Cut Nyak Safira"],
    date: "Sabtu, 26 Desember 2026",
    venue: "Grand Ballroom, Hermes Palace Hotel, Banda Aceh",
    quote:
      "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.",
    ornamentStyle: "batik",
    description:
      "Tema Living Archival Painting mahakarya Serambi Mekkah: seni cukil kayu abad ke-19 Rumoh Aceh Krong Bade, Pinto Aceh keemasan, air terjun lembah mengalir, dan nuansa khidmat Sacred Heritage Noir.",
    suitedFor:
      "Pernikahan adat Aceh, Walimatul 'Ursy, Royal Ballroom, resepsi tradisi Serambi Mekkah megah.",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=aceh",
    isActive: true,
    sortOrder: 10,
  },
  {
    id: "motion-art-linocut-noir",
    name: "Motion Art Linocut Noir Heritage",
    nameIndo: "Mahakarya Cukil Kayu Nusantara & Gunungan",
    category: "Tradisional",
    tier: "pro",
    coverImage: "/assets/motion-art-linocut/bg-cover-linocut.webp",
    palette: {
      bg: "#0C0B09",
      surface: "#141311",
      accent: "#C59B3C",
      text: "#FFFFFF",
      muted: "#A49C8F",
      border: "rgba(197, 155, 60, 0.35)",
    },
    coupleNames: ["Raden Mas Aryo", "Dyah Ayu Sekar"],
    date: "Sabtu, 19 September 2026",
    venue: "Pendopo Ageng Keraton, Surakarta Hadiningrat",
    quote: "Cukil kayu klasik intaglio berpadu tinta obsidian dan sepuhan emas murni. Janji suci terukir abadi di atas serat kertas gading pusaka.",
    ornamentStyle: "batik",
    description:
      "Mahakarya seni grafis cukil kayu (linocut relief print): gerbang Gunungan Kayon pohon hayat, rembulan mistis, dan panggung proscenium berbalut emas murni 24 karat.",
    suitedFor:
      "Pernikahan adat Nusantara, royal keraton heritage, pasangan pencinta seni klasik archival & grafis bernilai tinggi.",
    hasPreview: true,
    previewUrl: "/demo/motion-art-jawa?preset=woodcut",
    isActive: true,
    sortOrder: 11,
  },
  {
    id: "snap-photo",
    name: "Snap Photo (Dark)",
    nameIndo: "Kemewahan Galeri Foto Modern",
    category: "Modern",
    tier: "basic",
    coverImage:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#0B0A09",
      surface: "#141311",
      accent: "#D4AF37",
      text: "#F5F3EF",
      muted: "#9E978E",
      border: "#2E2A24",
    },
    coupleNames: ["Sarah", "Faizal"],
    date: "Rabu, 31 Desember 2025",
    venue: "Sasana Kriya TMII, Jakarta Timur",
    quote:
      "Dan segala sesuatu Kami ciptakan berpasang-pasangan supaya kamu mengingat kebesaran Allah.",
    ornamentStyle: "geometric",
    description:
      "Desain dark-luxe eksklusif dengan fokus penuh pada fotografi pasangan, audio player otomatis, dan tata letak editorial.",
    suitedFor:
      "Pasangan urban modern, konsep ballroom mewah, fotografi prewedding estetik",
    hasPreview: true,
    previewUrl: "/demo/snap-photo",
    isActive: true,
    sortOrder: 11,
  },
  {
    id: "botanical-sage",
    name: "Botanical Sage",
    nameIndo: "Taman Hijau Sage",
    category: "Minimalis",
    tier: "basic",
    coverImage:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#F0F5F1",
      surface: "#FFFFFF",
      accent: "#3A5743",
      text: "#1A2B1F",
      muted: "#6B7E6F",
      border: "#C8D9CB",
    },
    coupleNames: ["Arya", "Kirana"],
    date: "7 Desember 2026",
    venue: "The Springs Club, Summarecon",
    quote: "Dua jiwa yang ditakdirkan dalam satu ikatan suci",
    ornamentStyle: "botanical",
    description:
      "Dedaunan eucalyptus dan fern lembut di atas kanvas hijau sage menenangkan tanpa video loop berat.",
    suitedFor: "Garden party, akad outdoor, eco-friendly wedding",
    hasPreview: true,
    previewUrl: "/demo/snap-photo?style=botanical",
    isActive: true,
    sortOrder: 12,
  },
  {
    id: "champagne-ivory",
    name: "Champagne Ivory",
    nameIndo: "Kemewahan Emas Sampanye",
    category: "Elegan",
    tier: "basic",
    coverImage:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#FBF6EB",
      surface: "#FFFFFF",
      accent: "#B8892E",
      text: "#2B2620",
      muted: "#9C8E74",
      border: "#EEDEB8",
    },
    coupleNames: ["Rizki", "Putri"],
    date: "14 November 2026",
    venue: "Raffles Hotel, Kuningan",
    quote: "Ya Allah, satukanlah hati kami dalam ridho-Mu",
    ornamentStyle: "calligraphy",
    description:
      "Nuansa emas klasik dengan aksen kaligrafi Arab yang anggun dan mewah, loading instan.",
    suitedFor: "Ballroom hotel, resepsi mewah, konsep islami modern",
    hasPreview: true,
    previewUrl: "/demo/snap-photo?style=champagne",
    isActive: true,
    sortOrder: 13,
  },
  {
    id: "terracotta-warmth",
    name: "Terracotta Warmth",
    nameIndo: "Kehangatan Terracotta",
    category: "Modern",
    tier: "basic",
    coverImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#FAF3EC",
      surface: "#FFFFFF",
      accent: "#A04F34",
      text: "#2B2118",
      muted: "#8A7568",
      border: "#E8D9CC",
    },
    coupleNames: ["Dimas", "Amanda"],
    date: "24 Oktober 2026",
    venue: "Hotel Gran Mahakam, Jakarta",
    quote: "Dengan cinta yang tulus, kami mengundang kehadiran Anda",
    ornamentStyle: "geometric",
    description:
      "Warna tanah liat hangat berpadu tipografi editorial modern yang clean dan responsif.",
    suitedFor: "Intimate wedding, semi-outdoor, rustic modern",
    hasPreview: true,
    previewUrl: "/demo/snap-photo?style=terracotta",
    isActive: true,
    sortOrder: 14,
  },
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    nameIndo: "Minimalis Monokrom Modern",
    category: "Minimalis",
    tier: "basic",
    coverImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#FAFAFA",
      surface: "#FFFFFF",
      accent: "#18181B",
      text: "#09090B",
      muted: "#71717A",
      border: "#E4E4E7",
    },
    coupleNames: ["Arka", "Nadia"],
    date: "Sabtu, 12 September 2026",
    venue: "Glasshouse at Plataran, Jakarta",
    quote: "Simple moments, lifetime memories.",
    ornamentStyle: "geometric",
    description:
      "Desain monokrom bersih dengan tipografi kontemporer, ultra ringan dan cepat dimuat di segala jenis koneksi.",
    suitedFor:
      "Intimate modern wedding, civil ceremony, pasangan yang mengutamakan kecepatan dan estetika minimalis",
    hasPreview: true,
    previewUrl: "/demo/snap-photo?style=minimalist",
    isActive: true,
    sortOrder: 15,
  },
  {
    id: "midnight-editorial",
    name: "Midnight Editorial",
    nameIndo: "Editorial Tengah Malam",
    category: "Modern",
    tier: "basic",
    coverImage:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#0F0F0F",
      surface: "#1A1A1A",
      accent: "#E8D5B5",
      text: "#F5F0E8",
      muted: "#8A8478",
      border: "#2E2E2E",
    },
    coupleNames: ["Fajar", "Sinta"],
    date: "21 Februari 2027",
    venue: "Museum MACAN, Jakarta Barat",
    quote: "Where two hearts become one story",
    ornamentStyle: "art-deco",
    description:
      "Desain gelap kontras tinggi bergaya majalah fashion dengan sentuhan art deco.",
    suitedFor: "Pasangan seni, urban chic, kontemporer museum",
    hasPreview: false,
    previewUrl: null,
    isActive: true,
    sortOrder: 16,
  },
  {
    id: "rose-blush",
    name: "Rose Blush",
    nameIndo: "Mawar Senja",
    category: "Elegan",
    tier: "basic",
    coverImage:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
    palette: {
      bg: "#FDF6F3",
      surface: "#FFFFFF",
      accent: "#C46A7A",
      text: "#3A2028",
      muted: "#A08890",
      border: "#F0D8DC",
    },
    coupleNames: ["Bayu", "Anisa"],
    date: "5 Maret 2027",
    venue: "The Ritz Carlton Pacific Place",
    quote: "Atas rahmat dan ridho Allah SWT",
    ornamentStyle: "floral",
    description:
      "Kombinasi mawar dusty pink lembut dengan detail floral watercolor yang romantis.",
    suitedFor: "Resepsi feminin, bridal shower vibes, romantis klasik",
    hasPreview: false,
    previewUrl: null,
    isActive: true,
    sortOrder: 17,
  },
];

/**
 * Returns all templates stored in the database.
 */
export function getAllTemplates(): TemplateRecord[] {
  return [...TEMPLATES_DB].sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Returns ONLY templates that can be previewed (hasPreview === true && isActive === true).
 * Used by landing pages to ensure visitors only see working demos.
 */
export function getPreviewableTemplates(): TemplateRecord[] {
  return TEMPLATES_DB.filter((t) => t.isActive && t.hasPreview).sort(
    (a, b) => a.sortOrder - b.sortOrder
  );
}

/**
 * Find single template by its ID/slug.
 */
export function getTemplateById(id: string): TemplateRecord | undefined {
  return TEMPLATES_DB.find((t) => t.id === id);
}
