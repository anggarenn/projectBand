"use client";

import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Copy,
  Check,
  Send,
  Volume2,
  VolumeX,
  Disc3,
  Sparkles,
  Tv,
  ExternalLink,
  ChevronDown,
  Gift,
  X,
  Home,
  Users,
  Image as ImageIcon,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { InvitationData } from "@/types/invitation";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface SnapPhotoViewProps {
  data: InvitationData;
  guestName?: string;
  isEmbedded?: boolean; // If true, used in dashboard preview (no auto music play)
  onAddWish?: (wish: {
    name: string;
    attendance: "hadir" | "tidak_hadir";
    pax: number;
    message: string;
  }) => void;
}

export default function SnapPhotoView({
  data,
  guestName = "Tamu Undangan",
  isEmbedded = false,
  onAddWish,
}: SnapPhotoViewProps) {
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<string | null>(null);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== "Tamu Undangan" ? guestName : "");
  const [rsvpAttendance, setRsvpAttendance] = useState<"hadir" | "tidak_hadir">("hadir");
  const [rsvpPax, setRsvpPax] = useState(2);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Active Navigation Section
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (!element) return;
    const scrollContainer = element.closest(".overflow-y-auto") as HTMLElement | null;
    if (scrollContainer) {
      const containerRect = scrollContainer.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();
      const relativeTop = elemRect.top - containerRect.top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({ top: relativeTop - 10, behavior: "smooth" });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Calculate countdown to first event date
  useEffect(() => {
    const targetDate = data.events[0]?.date
      ? new Date(`${data.events[0].date}T08:00:00+07:00`).getTime()
      : new Date("2025-12-31T08:00:00+07:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.events]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (!isEmbedded && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay blocked by browser
          setIsPlaying(false);
        });
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleCopyAccount = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedAccount(number);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    if (onAddWish) {
      onAddWish({
        name: rsvpName.trim(),
        attendance: rsvpAttendance,
        pax: rsvpAttendance === "hadir" ? rsvpPax : 0,
        message: rsvpMessage.trim(),
      });
    }

    setRsvpSuccess(true);
    setRsvpMessage("");
    setTimeout(() => setRsvpSuccess(false), 4000);
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = (event: typeof data.events[0]) => {
    const title = encodeURIComponent(`${event.title} - ${data.coverTitle}`);
    const details = encodeURIComponent(
      `Pernikahan ${data.bride.name} & ${data.groom.name}\nLokasi: ${event.venueName}, ${event.venueAddress}`
    );
    const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}`);
    const dateFormatted = event.date.replace(/-/g, "");
    const startTime = event.startTime.replace(/:/g, "") + "00";
    const endTime = event.endTime.replace(/:/g, "") + "00";
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateFormatted}T${startTime}/${dateFormatted}T${endTime}`;
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0E0E10] text-[#F3F2F0] font-sans antialiased overflow-x-hidden selection:bg-[#C59B3C] selection:text-black">
      {/* Hidden Audio Element */}
      {data.musicUrl && (
        <audio
          ref={audioRef}
          src={data.musicUrl}
          loop
          preload="auto"
          aria-hidden="true"
        />
      )}

      {/* ------------------------------------------------------------- */}
      {/* COVER OVERLAY (Before user clicks "Buka Undangan")             */}
      {/* ------------------------------------------------------------- */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-black text-center p-6 transition-all duration-700">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url(${data.coverPhoto})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/60 to-black/80" />

          {/* Top Header */}
          <div className="relative z-10 pt-12">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C59B3C] font-semibold">
              {data.coverSubtitle}
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-white mt-2 tracking-wide">
              {data.coverTitle}
            </h1>
          </div>

          {/* Guest Card */}
          <div className="relative z-10 w-full max-w-sm px-6 py-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <span className="text-xs text-[#A7A29A] tracking-wider uppercase block">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </span>
            <div className="text-2xl font-serif-display font-bold text-white mt-2 mb-4">
              {guestName}
            </div>
            <p className="text-[11px] text-[#A7A29A] mb-6 leading-relaxed">
              Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan merayakan momen bahagia pernikahan kami.
            </p>

            <button
              onClick={handleOpenInvitation}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C59B3C] to-[#A04F34] text-white text-sm font-semibold tracking-wide shadow-lg shadow-[#C59B3C]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Buka Undangan</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Bottom Audio Notice */}
          <div className="relative z-10 pb-8 text-[11px] text-[#8A837A] flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[#C59B3C]" />
            <span>Putar lagu latar otomatis saat dibuka</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* FLOATING MUSIC CONTROLLER                                     */}
      {/* ------------------------------------------------------------- */}
      {isOpen && (
        <button
          onClick={toggleMusic}
          className={`${
            isEmbedded
              ? "sticky bottom-16 ml-auto mr-3 z-40"
              : "fixed bottom-20 right-4 sm:right-6 z-40"
          } w-11 h-11 rounded-full bg-black/80 backdrop-blur-md border border-[#C59B3C]/40 text-[#C59B3C] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer group`}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          title={data.musicTitle}
        >
          <Disc3
            className={`w-5 h-5 transition-transform ${
              isPlaying ? "animate-spin [animation-duration:4s]" : "opacity-60"
            }`}
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-0.5 bg-[#A04F34] rotate-45 rounded-full" />
            </div>
          )}
        </button>
      )}

      {/* ------------------------------------------------------------- */}
      {/* FLOATING BOTTOM NAVIGATION BAR (DOCK MENU)                   */}
      {/* ------------------------------------------------------------- */}
      {isOpen && !isEmbedded && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-[420px] transition-all">
          <nav
            aria-label="Navigasi Undangan"
            className="w-full bg-[#161619]/90 backdrop-blur-xl border border-[#C59B3C]/35 rounded-full px-2 py-1.5 shadow-2xl shadow-black/90 flex items-center justify-between"
          >
            {[
              { id: "hero", label: "Sampul", icon: Home },
              { id: "mempelai", label: "Mempelai", icon: Users },
              { id: "acara", label: "Acara", icon: Calendar },
              { id: "cerita", label: "Cerita", icon: BookOpen },
              { id: "galeri", label: "Galeri", icon: ImageIcon },
              { id: "amplop", label: "Kado", icon: Gift },
              { id: "ucapan", label: "Ucapan", icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex flex-col items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-tr from-[#C59B3C] to-[#E5C16C] text-black shadow-md shadow-[#C59B3C]/40 scale-105"
                      : "text-[#A7A29A] hover:text-white hover:bg-white/10"
                  }`}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="text-[7.5px] font-semibold leading-none mt-0.5 tracking-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MAIN INVITATION CONTENT CONTAINER                             */}
      {/* ------------------------------------------------------------- */}
      <main className="max-w-[480px] mx-auto min-h-screen bg-[#111113] shadow-2xl relative border-x border-white/5">
        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between items-center text-center p-8 overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${data.coverPhoto})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#111113] via-[#111113]/40 to-black/70" />

          {/* Top Tagline */}
          <div className="relative z-10 pt-12 animate-fadeIn">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#C59B3C] text-[10px] tracking-[0.25em] uppercase font-medium mb-3">
              <Sparkles className="w-3 h-3" />
              <span>{data.coverSubtitle}</span>
            </div>
            <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-white tracking-wider leading-tight">
              {data.coverTitle}
            </h1>
          </div>

          {/* Countdown Clock */}
          <div className="relative z-10 w-full pb-8">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#A7A29A] block mb-3 font-medium">
              Menghitung Hari Bahagia
            </span>
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto">
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black/60 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center"
                >
                  <span className="font-serif-display text-2xl sm:text-3xl font-bold text-[#C59B3C] leading-none block">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#8A837A] mt-1 block">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center animate-bounce opacity-60">
              <ChevronDown className="w-5 h-5 text-white/70" />
            </div>
          </div>
        </section>

        {/* QUOTE / AYAT SUCI */}
        <section className="py-16 px-6 sm:px-8 bg-gradient-to-b from-[#111113] to-[#161619] border-t border-white/5 text-center relative">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-8 h-8 rounded-full bg-[#C59B3C]/10 text-[#C59B3C] mx-auto flex items-center justify-center mb-2">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <p className="font-serif text-xl sm:text-2xl text-[#E8E6E1] leading-relaxed tracking-wide dir-rtl font-medium">
              {data.quoteArabic}
            </p>
            <p className="text-xs sm:text-sm text-[#A7A29A] italic leading-relaxed pt-2">
              &ldquo;{data.quoteTranslation}&rdquo;
            </p>
            <span className="text-[11px] font-semibold text-[#C59B3C] tracking-wider uppercase block">
              {data.quoteSource}
            </span>
          </div>
        </section>

        {/* PROFIL MEMPELAI (BRIDE & GROOM) */}
        <section id="mempelai" className="py-16 px-6 sm:px-8 bg-[#111113] space-y-12 border-t border-white/5">
          <div className="text-center max-w-sm mx-auto">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
              Kedua Mempelai
            </h2>
            <p className="text-xs text-[#A7A29A] mt-2 leading-relaxed">
              {data.openingMessage}
            </p>
          </div>

          {/* The Bride Card */}
          <div className="bg-[#18181C] rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden group hover:border-[#C59B3C]/50 transition-all">
            <div className="relative w-36 h-48 mx-auto rounded-2xl overflow-hidden shadow-2xl mb-5">
              <img
                src={data.bride.photo}
                alt={data.bride.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C59B3C] block mb-1">
              {data.bride.role}
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-white">
              {data.bride.name}
            </h3>
            <p className="text-xs text-[#A7A29A] mt-2 leading-relaxed px-4">
              {data.bride.parents}
            </p>

            {data.bride.instagram && (
              <a
                href={`https://instagram.com/${data.bride.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#C59B3C] hover:bg-white/10 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@{data.bride.instagram}</span>
              </a>
            )}
          </div>

          {/* Divider & Icon */}
          <div className="flex items-center justify-center gap-3">
            <div className="h-px bg-white/10 flex-1" />
            <span className="font-serif-display text-2xl text-[#C59B3C] font-bold">&amp;</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* The Groom Card */}
          <div className="bg-[#18181C] rounded-3xl p-6 border border-white/10 text-center relative overflow-hidden group hover:border-[#C59B3C]/50 transition-all">
            <div className="relative w-36 h-48 mx-auto rounded-2xl overflow-hidden shadow-2xl mb-5">
              <img
                src={data.groom.photo}
                alt={data.groom.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C59B3C] block mb-1">
              {data.groom.role}
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-white">
              {data.groom.name}
            </h3>
            <p className="text-xs text-[#A7A29A] mt-2 leading-relaxed px-4">
              {data.groom.parents}
            </p>

            {data.groom.instagram && (
              <a
                href={`https://instagram.com/${data.groom.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#C59B3C] hover:bg-white/10 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>@{data.groom.instagram}</span>
              </a>
            )}
          </div>
        </section>

        {/* JADWAL ACARA (AKAD & RESEPSI) */}
        <section id="acara" className="py-16 px-6 sm:px-8 bg-gradient-to-b from-[#111113] to-[#161619] border-t border-white/5 space-y-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59B3C]">
              Rangkaian Hari Bahagia
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Waktu &amp; Lokasi Acara
            </h2>
          </div>

          <div className="space-y-6">
            {data.events.map((event) => (
              <div
                key={event.id}
                className="bg-[#18181C] rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <h3 className="font-serif-display text-xl font-bold text-white">
                    {event.title}
                  </h3>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-[#C59B3C]/15 text-[#C59B3C] font-semibold">
                    {event.dayName}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#A7A29A] mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#C59B3C] shrink-0 mt-0.5" />
                    <span className="text-white font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#C59B3C] shrink-0 mt-0.5" />
                    <span>
                      {event.startTime} &ndash; {event.endTime} {event.timezone}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C59B3C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">
                        {event.venueName}
                      </strong>
                      <span className="text-[11px] text-[#8A837A] leading-relaxed block mt-0.5">
                        {event.venueAddress}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={getGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#C59B3C]" />
                    <span>Simpan Kalender</span>
                  </a>
                  <a
                    href={event.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-[#C59B3C] hover:bg-[#B38B32] text-black text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Peta Maps</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Live Streaming Button */}
          {data.liveStreamingUrl && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/40 to-black border border-red-500/20 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-red-400 font-semibold mb-2">
                <Tv className="w-4 h-4" />
                <span>Siaran Langsung Online</span>
              </div>
              <p className="text-[11px] text-[#A7A29A] mb-3">
                Bagi keluarga dan sahabat yang belum dapat hadir secara langsung, silakan saksikan melalui kanal live streaming:
              </p>
              <a
                href={data.liveStreamingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <span>Buka Siaran Langsung</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </section>

        {/* KISAH CINTA (LOVE STORY TIMELINE) */}
        {data.loveStories && data.loveStories.length > 0 && (
          <section id="cerita" className="py-16 px-6 sm:px-8 bg-[#111113] border-t border-white/5">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59B3C]">
                Cerita Kami
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Kisah Perjalanan Cinta
              </h2>
            </div>

            <div className="relative border-l border-dashed border-[#C59B3C]/30 ml-4 space-y-10 pl-6">
              {data.loveStories.map((story) => (
                <div key={story.id} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#C59B3C] border-2 border-[#111113] shadow-xs" />

                  <span className="text-[10px] font-semibold text-[#C59B3C] uppercase tracking-wider block mb-1">
                    {story.period}
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-white">
                    {story.title}
                  </h3>

                  {story.photo && (
                    <div className="w-full h-44 rounded-2xl overflow-hidden my-3 border border-white/10 shadow-lg">
                      <img
                        src={story.photo}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}

                  <p className="text-xs text-[#A7A29A] leading-relaxed">
                    {story.story}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GALERI FOTO PREWEDDING */}
        {data.gallery && data.gallery.length > 0 && (
          <section id="galeri" className="py-16 px-6 sm:px-8 bg-gradient-to-b from-[#111113] to-[#161619] border-t border-white/5">
            <div className="text-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59B3C]">
                Momen Abadi
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
                Galeri Prewedding
              </h2>
              <p className="text-[11px] text-[#A7A29A] mt-1">
                Geser ke samping untuk melihat foto lainnya &rarr;
              </p>
            </div>

            {/* Horizontal Swipe Carousel Track */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#C59B3C]/40 px-1 -mx-2">
              {data.gallery.map((photo, i) => (
                <div
                  key={photo.id}
                  onClick={() => setActiveLightbox(photo.url)}
                  className="relative shrink-0 snap-center w-56 sm:w-64 h-80 rounded-2xl overflow-hidden cursor-pointer group border border-white/10 shadow-xl"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || `Foto Prewedding ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[9px] uppercase tracking-wider text-[#C59B3C] font-semibold block mb-0.5">
                      Foto {i + 1} dari {data.gallery.length}
                    </span>
                    <p className="text-xs text-white font-medium truncate">
                      {photo.caption || "Momen Bahagia"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AMPLOP DIGITAL & KADO PERNIKAHAN */}
        <section id="amplop" className="py-16 px-6 sm:px-8 bg-[#111113] border-t border-white/5 space-y-6">
          <div className="text-center max-w-xs mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59B3C]">
              Tanda Kasih
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Amplop Digital &amp; Kado
            </h2>
            <p className="text-xs text-[#A7A29A] mt-2 leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih secara cashless:
            </p>
          </div>

          {/* Bank Accounts */}
          <div className="space-y-4">
            {data.bankAccounts.map((bank) => (
              <div
                key={bank.id}
                className="bg-gradient-to-br from-[#1C1C22] to-[#141418] rounded-2xl p-5 border border-white/10 relative overflow-hidden shadow-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C59B3C]">
                    Bank {bank.bankName}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white/70">
                    <Gift className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="font-mono text-lg sm:text-xl font-bold text-white tracking-wider mb-1">
                  {bank.accountNumber}
                </div>
                <div className="text-xs text-[#A7A29A] mb-4">
                  a.n. <strong className="text-white">{bank.accountHolder}</strong>
                </div>

                <button
                  onClick={() => handleCopyAccount(bank.accountNumber)}
                  className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#C59B3C] flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer"
                >
                  {copiedAccount === bank.accountNumber ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* QRIS Code Image */}
          {data.qrisImageUrl && (
            <div className="bg-[#18181C] rounded-2xl p-5 border border-white/10 text-center">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                Scan QRIS Donasi / Amplop
              </span>
              <div className="w-44 h-44 mx-auto bg-white p-3 rounded-xl shadow-lg mb-2">
                <img
                  src={data.qrisImageUrl}
                  alt="QRIS Amplop Digital"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] text-[#8A837A] block">
                Mendukung GoPay, OVO, Dana, ShopeePay, BCA, dan seluruh bank nasional
              </span>
            </div>
          )}

          {/* Physical Gift Address */}
          {data.physicalGift?.address && (
            <div className="bg-[#18181C] rounded-2xl p-5 border border-white/10">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Kirim Kado Fisik
              </span>
              <p className="text-xs text-[#A7A29A] leading-relaxed mb-3">
                Penerima: <strong className="text-white">{data.physicalGift.receiverName}</strong>
                <br />
                Telepon: {data.physicalGift.phoneNumber}
                <br />
                Alamat: {data.physicalGift.address}
              </p>
              <button
                onClick={() => handleCopyAddress(data.physicalGift.address)}
                className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white/90 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">Alamat Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#C59B3C]" />
                    <span>Salin Alamat Kirim</span>
                  </>
                )}
              </button>
            </div>
          )}
        </section>

        {/* BUKU TAMU & RSVP FORM */}
        <section id="ucapan" className="py-16 px-6 sm:px-8 bg-gradient-to-b from-[#111113] to-[#18181C] border-t border-white/5 space-y-8">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59B3C]">
              Konfirmasi &amp; Doa
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white mt-1">
              Buku Tamu &amp; RSVP
            </h2>
            <p className="text-xs text-[#A7A29A] mt-2">
              Mohon konfirmasikan kehadiran Anda untuk estimasi hidangan resepsi.
            </p>
          </div>

          {/* Form RSVP */}
          <form
            onSubmit={handleSubmitRsvp}
            className="bg-[#1C1C22] rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl"
          >
            <div>
              <label className="text-[11px] font-semibold text-[#A7A29A] uppercase tracking-wider block mb-1.5">
                Nama Anda
              </label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Tuliskan nama lengkap Anda"
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-[#6B655E] focus:outline-none focus:border-[#C59B3C]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#A7A29A] uppercase tracking-wider block mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRsvpAttendance("hadir")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    rsvpAttendance === "hadir"
                      ? "bg-[#C59B3C] text-black border-[#C59B3C]"
                      : "bg-black/30 text-[#A7A29A] border-white/10 hover:border-white/20"
                  }`}
                >
                  Insya Allah Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpAttendance("tidak_hadir")}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    rsvpAttendance === "tidak_hadir"
                      ? "bg-red-900/60 text-white border-red-500/50"
                      : "bg-black/30 text-[#A7A29A] border-white/10 hover:border-white/20"
                  }`}
                >
                  Berhalangan
                </button>
              </div>
            </div>

            {rsvpAttendance === "hadir" && (
              <div>
                <label className="text-[11px] font-semibold text-[#A7A29A] uppercase tracking-wider block mb-1.5">
                  Jumlah Kehadiran (Orang)
                </label>
                <select
                  value={rsvpPax}
                  onChange={(e) => setRsvpPax(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-[#C59B3C]"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                  <option value={3}>3 Orang</option>
                  <option value={4}>4 Orang</option>
                </select>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold text-[#A7A29A] uppercase tracking-wider block mb-1.5">
                Pesan Doa &amp; Ucapan
              </label>
              <textarea
                required
                rows={3}
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                placeholder="Berikan ucapan selamat dan doa restu..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs placeholder-[#6B655E] focus:outline-none focus:border-[#C59B3C] resize-none"
              />
            </div>

            {rsvpSuccess && (
              <div className="p-3 rounded-xl bg-green-950/60 border border-green-500/40 text-green-300 text-xs text-center flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4" />
                <span>Terima kasih! Doa dan konfirmasi Anda telah tercatat.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C59B3C] to-[#A04F34] text-white text-xs font-semibold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Konfirmasi &amp; Ucapan</span>
            </button>
          </form>

          {/* Wishes List Feed */}
          <div className="space-y-3 pt-4">
            <div className="flex justify-between items-center text-xs text-[#A7A29A] px-1">
              <span>{data.wishes.length} Ucapan &amp; Doa Masuk</span>
              <span className="text-[10px] text-[#C59B3C]">Real-time Feed</span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {data.wishes.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#141418] rounded-2xl p-4 border border-white/5 space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-medium text-white">
                        {item.name}
                      </strong>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${
                          item.attendance === "hadir"
                            ? "bg-green-900/40 text-green-300 border border-green-500/20"
                            : "bg-red-900/40 text-red-300 border border-red-500/20"
                        }`}
                      >
                        {item.attendance === "hadir" ? "Hadir" : "Berhalangan"}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#8A837A]">
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#A7A29A] leading-relaxed">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING & WATERMARK */}
        <footer className="py-16 px-6 text-center bg-black border-t border-white/5 space-y-4">
          <p className="text-xs text-[#A7A29A] leading-relaxed max-w-xs mx-auto">
            {data.closingMessage}
          </p>
          <div className="pt-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A837A] block">
              Kami yang Berbahagia
            </span>
            <div className="font-serif-display text-2xl font-bold text-white mt-1">
              {data.bride.nickname} &amp; {data.groom.nickname}
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <span className="text-[10px] text-[#6B655E] block">
              Digital Invitation Platform oleh{" "}
              <strong className="text-white/80">Mengundang</strong>
            </span>
          </div>
        </footer>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* LIGHTBOX MODAL                                                */}
      {/* ------------------------------------------------------------- */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Tutup foto"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={activeLightbox}
            alt="Preview Foto"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
