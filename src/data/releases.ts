import type { MerchProduct } from "@/lib/supabase";

export type StreamingPlatform =
  | "Spotify"
  | "Apple Music"
  | "YouTube"
  | "Bandcamp"
  | "Video Lyrics";

export interface StreamingLink {
  platform: StreamingPlatform;
  url?: string;
}

export interface ReleaseItem {
  id: string;
  categoryTitle: string;
  bgImage: string;
  artworkImage: string;
  tag: string;
  isComingSoon?: boolean;
  streamingLinks?: StreamingLink[];
}

export const RELEASES: ReleaseItem[] = [
  {
    id: "maxi-single",
    categoryTitle: "MAXI SINGLE: 'FESTIVAL MUSIK NASIONAL' (2026)",
    bgImage: "/assets/silly-n-valley/new_theme/bg_2_maxi.png",
    artworkImage: "/assets/silly-n-valley/new_theme/art_maxi.png",
    tag: "MAXI SINGLE / 2026",
    isComingSoon: true,
  },
  {
    id: "rantai-reaksi",
    categoryTitle: "EP: 'RANTAI REAKSI' (2026)",
    bgImage: "/assets/silly-n-valley/new_theme/bg_3_rantai.png",
    artworkImage: "/assets/silly-n-valley/new_theme/art_rantai.jpg",
    tag: "EP / 2026",
    streamingLinks: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/album/6weIaQGMlG6TQFaZJcYk3s?si=C0BVuyPPQfC6MjD06WzAvw",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/album/rantai-reaksi-abu-tanpa-api-ep/6787028064",
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/playlist?list=OLAK5uy_k_5_NKu8BxlwmhmFbA-ZfQcdf2o3ElPD0&si=2kBu8Fjjj6Yhqgmc",
      },
    ],
  },
  {
    id: "berhala-run",
    categoryTitle: "SINGLE: 'BERHALA RUN!' FEAT. LUTHFI TANK GRUNGE (2026)",
    bgImage: "/assets/silly-n-valley/new_theme/bg_4_berhala.png",
    artworkImage: "/assets/silly-n-valley/new_theme/art_berhala.png",
    tag: "SINGLE / 2025",
    streamingLinks: [
      {
        platform: "Spotify",
        url: "https://open.spotify.com/track/5OVKeuJSabUopqjoQxxum1?si=f5e94728665445c2",
      },
      {
        platform: "Apple Music",
        url: "https://music.apple.com/us/song/berhala-run-feat-luthfi-tank-grunge/1893901678",
      },
      {
        platform: "YouTube",
        url: "https://youtu.be/i7TDdX0B9Yw?si=zsTXGJ1AVSiy2Cg4",
      },
    ],
  },
  {
    id: "merkava",
    categoryTitle: "SINGLE: 'LEDAKKAN DINDING MERKAVA' (2025)",
    bgImage: "/assets/silly-n-valley/new_theme/bg_5_merkava.png",
    artworkImage: "/assets/silly-n-valley/new_theme/art_merkava.png",
    tag: "SINGLE / 2024",
    streamingLinks: [
      {
        platform: "Bandcamp",
        url: "https://sillynvalley.bandcamp.com/track/against-the-blue-line-ledakkan-dinding-merkava",
      },
      {
        platform: "Video Lyrics",
      },
    ],
  },
  {
    id: "absurd-distortion",
    categoryTitle: "FULL ALBUM: 'ABSURD INTERNAL DISTORTION' (2024)",
    bgImage: "/assets/silly-n-valley/new_theme/bg_6_absurd.png",
    artworkImage: "/assets/silly-n-valley/new_theme/art_absurd.png",
    tag: "FULL ALBUM / 2023",
    streamingLinks: [
      {
        platform: "Bandcamp",
        url: "https://sillynvalley.bandcamp.com/album/absurd-internal-distortion",
      },
    ],
  },
];

export const FALLBACK_MERCH: MerchProduct[] = [
  {
    id: "bundle",
    title: "RANTAI REAKSI BULK - T-SHIRT + CASSETTE TAPE",
    price: "Rp 220,000",
    image_url: "/assets/silly-n-valley/new_theme/merch_1_bundle.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    is_active: true,
    created_at: "",
  },
  {
    id: "tshirt-rantai",
    title: "RANTAI REAKSI T-SHIRT",
    price: "Rp 175,000",
    image_url: "/assets/silly-n-valley/new_theme/merch_2_rantai_shirt.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    is_active: true,
    created_at: "",
  },
  {
    id: "tshirt-berhala",
    title: "BERHALA-RUN! T-SHIRT",
    price: "Rp 150,000",
    image_url: "/assets/silly-n-valley/new_theme/merch_3_berhala_shirt.png",
    sizes: ["S", "M", "L", "XL", "XXL"],
    is_active: true,
    created_at: "",
  },
  {
    id: "cassette",
    title: "RANTAI REAKSI CASSETTE TAPE",
    price: "Rp 50,000",
    image_url: "/assets/silly-n-valley/new_theme/merch_4_cassette.png",
    sizes: [],
    is_active: true,
    created_at: "",
  },
];
