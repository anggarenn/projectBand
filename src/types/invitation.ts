export interface BrideGroomInfo {
  name: string;
  nickname: string;
  role: string;
  parents: string;
  instagram: string;
  photo: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  dayName: string; // e.g. "Rabu"
  startTime: string;
  endTime: string;
  timezone: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
}

export interface LoveStoryItem {
  id: string;
  title: string;
  period: string;
  story: string;
  photo: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
}

export interface BankAccountItem {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface PhysicalGiftInfo {
  receiverName: string;
  phoneNumber: string;
  address: string;
}

export interface WishItem {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir";
  pax: number;
  message: string;
  timestamp: string;
}

export interface DressCodeColor {
  name: string;
  hex: string;
}

export interface DressCodeInfo {
  title: string;
  description: string;
  colors: DressCodeColor[];
}

export interface InvitationData {
  slug: string;
  activeTheme?: "snap-photo" | "motion-art-jawa";
  coverTitle: string;
  coverSubtitle: string;
  coverPhoto: string;
  quoteArabic: string;
  quoteTranslation: string;
  quoteSource: string;
  openingMessage: string;
  closingMessage: string;
  bride: BrideGroomInfo;
  groom: BrideGroomInfo;
  events: WeddingEvent[];
  dressCode?: DressCodeInfo;
  liveStreamingUrl: string;
  loveStories: LoveStoryItem[];
  gallery: GalleryItem[];
  bankAccounts: BankAccountItem[];
  qrisImageUrl: string;
  physicalGift: PhysicalGiftInfo;
  musicUrl: string;
  musicTitle: string;
  motionVideoUrl?: string;
  wishes: WishItem[];
}
