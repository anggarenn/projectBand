"use client";

import { useState, useRef } from "react";
import { Eye, Palette, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { getPreviewableTemplates, TemplateRecord } from "@/lib/db/templates";
import { AuthenticGununganKayon, TraditionalGoldCorner, TraditionalGoldHeader } from "@/components/themes/MotionArtJawaView";

/* ─── Mini Invitation Card Preview with Theme-Specific Authentic Aesthetic ─── */
function MiniInvitationPreview({
  theme,
  isHovered,
}: {
  theme: TemplateRecord;
  isHovered: boolean;
}) {
  const { coupleNames, date, venue, coverImage, previewUrl, tier } = theme;
  const isJawa = theme.id === "motion-art-jawa";

  if (isJawa) {
    return (
      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative flex flex-col items-center justify-between p-4 bg-[#100E0C] border border-[#C59B3C]/40 shadow-xl group/card">
        {/* Background Layer: Authentic Joglo Silhouette & Botanical Flora */}
        <img
          src="/assets/motion-art-jawa/bg-cover-joglo.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.18] sepia-[0.24] hue-rotate-[-10deg]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0B09]/75 via-[#14110E]/50 to-[#0A0907]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(197,155,60,0.18)_0%,transparent_75%)]" />

        {/* Ornamen Sudut Emas Kaligrafi di 4 Pojok */}
        <TraditionalGoldCorner className="absolute top-1.5 left-1.5 w-12 h-12 z-10" />
        <TraditionalGoldCorner className="absolute top-1.5 right-1.5 w-12 h-12 -scale-x-100 z-10" />
        <TraditionalGoldCorner className="absolute bottom-1.5 left-1.5 w-12 h-12 -scale-y-100 z-10" />
        <TraditionalGoldCorner className="absolute bottom-1.5 right-1.5 w-12 h-12 -scale-x-100 -scale-y-100 z-10" />

        {/* Garis Border Emas Mewah */}
        <div className="absolute inset-2 border border-[#C59B3C]/25 rounded-xl pointer-events-none" />

        {/* Top Tier Badge Jawa (Berkilau) */}
        <div className="relative z-20 pt-2 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#18130E]/95 via-[#2D2316]/95 to-[#18130E]/95 border border-[#E5C16C] text-[#FFF5DF] text-[9.5px] font-black uppercase tracking-wider shadow-[0_0_14px_rgba(229,193,108,0.45)]">
            <Sparkles className="w-3 h-3 text-[#E5C16C] animate-pulse" />
            <span className="bg-gradient-to-r from-[#FFF5DE] via-[#E5C16C] to-[#E5A93C] bg-clip-text text-transparent font-black">
              PRO • MOTION ART
            </span>
          </span>
        </div>

        {/* Center: Gunungan Wayang Kulit Otentik & Divider Emas */}
        <div className="relative z-20 flex flex-col items-center my-auto transition-transform duration-500 ease-out group-hover/card:scale-105">
          <AuthenticGununganKayon className="w-16 h-24 mb-1 drop-shadow-[0_4px_16px_rgba(229,193,108,0.45)]" />
          <TraditionalGoldHeader className="w-32 h-auto my-0.5 opacity-90" />
        </div>

        {/* Bottom Typography */}
        <div className="relative z-20 pb-2 text-center space-y-0.5">
          <h4 className="font-serif-display text-lg font-bold tracking-wide text-white drop-shadow-xs">
            {coupleNames[0]} &amp; {coupleNames[1]}
          </h4>
          <p className="text-[10px] text-[#E5C16C] font-serif-display font-medium tracking-wider">{date}</p>
          <p className="text-[9px] text-[#A7A29A] line-clamp-1">{venue}</p>
        </div>

        {/* Hover Overlay with Preview Button */}
        <div
          className={`absolute inset-0 z-30 bg-black/50 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-1.5 rounded-xl bg-[#C59B3C] text-black font-bold text-xs flex items-center gap-1.5 shadow-xl hover:bg-[#D8AE4D] transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-black" />
              <span>Buka Demo</span>
            </a>
          )}
        </div>
      </div>
    );
  }

  // Default Editorial Snap-Photo / Modern Template Preview
  return (
    <div
      className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative flex flex-col group/card shadow-xs bg-[#0B0A09]"
    >
      {/* Background Photography with Zoom Effect on Hover */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={coverImage}
          alt={`Tema ${theme.name}`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          loading="lazy"
        />
        {/* Gradients for typography legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
      </div>

      {/* Decorative Frame Line */}
      <div className="absolute inset-2.5 border border-white/20 rounded-xl pointer-events-none" />

      {/* Top Tier Badge (Mencolok: Pro vs Basic) */}
      <div className="relative z-10 pt-3 px-3 text-center">
        {tier === "pro" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#18130E]/95 via-[#2D2316]/95 to-[#18130E]/95 border border-[#E5C16C] text-[#FFF5DF] text-[9.5px] font-black uppercase tracking-wider shadow-[0_0_14px_rgba(229,193,108,0.45)] backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-[#E5C16C] animate-pulse" />
            <span className="bg-gradient-to-r from-[#FFF5DE] via-[#E5C16C] to-[#E5A93C] bg-clip-text text-transparent font-black">
              PRO • MOTION ART
            </span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 border border-white/25 text-white text-[9.5px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>BASIC • FAST LOAD</span>
          </span>
        )}
      </div>

      {/* Center / Bottom Editorial Typography */}
      <div className="relative z-10 mt-auto pb-4 px-4 text-center text-white space-y-1">
        <h4 className="font-serif-display text-xl font-bold tracking-tight text-white drop-shadow-xs">
          {coupleNames[0]} &amp; {coupleNames[1]}
        </h4>
        <p className="text-[11px] text-white/90 font-medium">{date}</p>
        <p className="text-[10px] text-white/70 line-clamp-1">{venue}</p>
      </div>

      {/* Hover Overlay with Preview Button */}
      <div
        className={`absolute inset-0 z-20 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-3.5 py-1.5 rounded-xl bg-white text-[#1F1D1B] font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:bg-[#FAF8F5] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#A04F34]" />
            <span>Buka Demo</span>
          </a>
        )}
      </div>
    </div>
  );
}

interface ThemeGalleryProps {
  onSelectTheme: (themeId: string) => void;
}

export default function ThemeGallery({ onSelectTheme }: ThemeGalleryProps) {
  const [selectedTier, setSelectedTier] = useState<"all" | "pro" | "basic">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Read previewable templates from DB layer
  const previewableThemes = getPreviewableTemplates();

  const categories = [
    "Semua",
    ...Array.from(new Set(previewableThemes.map((t) => t.category))),
  ];

  const filteredThemes = previewableThemes.filter((t) => {
    const matchesTier = selectedTier === "all" || t.tier === selectedTier;
    const matchesCategory =
      selectedCategory === "Semua" || t.category === selectedCategory;
    return matchesTier && matchesCategory;
  });

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="tema" className="py-16 md:py-24 bg-white border-t border-[#EAE5DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Carousel Navigation Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBF6EB] text-[#B8892E] text-xs font-semibold mb-2.5 border border-[#EEDEB8]/60">
              <Palette className="w-3.5 h-3.5" />
              <span>Koleksi Desain Undangan Siap Pakai</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F1D1B] tracking-tight">
              Pilihan Tema Siap Pakai
            </h2>
            <p className="text-sm text-[#6B655E] mt-1.5 max-w-xl">
              Pilihan tema premium yang dapat langsung Anda uji coba live demonya. Desain otomatis menyesuaikan warna dan foto prewedding Anda.
            </p>
          </div>

          {/* Prev / Next Carousel Buttons */}
          <div className="flex items-center gap-1.5 self-end">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full border border-[#EAE5DD] bg-white hover:bg-[#FAF8F5] flex items-center justify-center text-[#1F1D1B] transition-colors shadow-xs active:scale-95 cursor-pointer"
              aria-label="Geser ke kiri"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full border border-[#EAE5DD] bg-white hover:bg-[#FAF8F5] flex items-center justify-center text-[#1F1D1B] transition-colors shadow-xs active:scale-95 cursor-pointer"
              aria-label="Geser ke kanan"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tier Classification Tab Buttons (Pro Motion Art vs Basic Clean & Fast) */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DD]">
          {/* Main Tier Buttons */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-xl bg-white border border-[#EAE5DD] shadow-xs overflow-x-auto [scrollbar-width:none]">
            {/* Tab: Semua */}
            <button
              onClick={() => setSelectedTier("all")}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedTier === "all"
                  ? "bg-[#1F1D1B] text-white shadow-xs font-bold"
                  : "text-[#6B655E] hover:text-[#1F1D1B] hover:bg-black/5"
              }`}
            >
              Semua
            </button>

            {/* Tab: ✨ Pro (Motion Art) (dengan badge gradient emas) */}
            <button
              onClick={() => setSelectedTier("pro")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedTier === "pro"
                  ? "bg-gradient-to-r from-[#18130E] via-[#2A2114] to-[#18130E] text-[#FFF5DE] border border-[#E5C16C]/70 shadow-md font-bold"
                  : "text-[#6B655E] hover:text-[#B8892E] hover:bg-[#FBF6EB]/60"
              }`}
            >
              <span>✨ Pro (Motion Art)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B3C] text-[#1A140E] shadow-xs">
                PRO
              </span>
            </button>

            {/* Tab: ⚡ Basic (Clean & Fast) */}
            <button
              onClick={() => setSelectedTier("basic")}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedTier === "basic"
                  ? "bg-[#1F1D1B] text-white shadow-xs font-bold"
                  : "text-[#6B655E] hover:text-[#1F1D1B] hover:bg-black/5"
              }`}
            >
              <span>⚡ Basic (Clean & Fast)</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F0EDE8] text-[#5A544E]">
                FAST
              </span>
            </button>
          </div>

          {/* Sub-filter: Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 [scrollbar-width:none]">
            <span className="text-[11px] font-medium text-[#8A837A] mr-1 hidden lg:inline">Kategori:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#1F1D1B] text-white shadow-xs"
                    : "text-[#6B655E] hover:text-[#1F1D1B] bg-white md:bg-transparent border border-[#EAE5DD] md:border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid / Carousel */}
        {filteredThemes.length === 0 ? (
          <div className="py-16 text-center bg-[#FAF8F5] rounded-2xl border border-dashed border-[#EAE5DD] p-8">
            <p className="text-sm font-medium text-[#6B655E]">
              Tidak ada tema untuk kombinasi tier <span className="font-bold text-[#1F1D1B]">"{selectedTier}"</span> dan kategori <span className="font-bold text-[#1F1D1B]">"{selectedCategory}"</span>.
            </p>
            <button
              onClick={() => {
                setSelectedTier("all");
                setSelectedCategory("Semua");
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#1F1D1B] text-white text-xs font-semibold hover:bg-[#332F2B] transition-colors cursor-pointer"
            >
              Tampilkan Semua Tema
            </button>
          </div>
        ) : (
          <div
            ref={carouselRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-1"
          >
            {filteredThemes.map((theme) => {
              const isHovered = hoveredId === theme.id;

              return (
                <div
                  key={theme.id}
                  className="group rounded-2xl border border-[#EAE5DD] bg-[#FAF8F5] p-3 hover:shadow-lg hover:border-[#D8D2C7] transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  onMouseEnter={() => setHoveredId(theme.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => onSelectTheme(theme.id)}
                >
                  {/* Mini Preview */}
                  <MiniInvitationPreview theme={theme} isHovered={isHovered} />

                  {/* Simplified Bottom Bar */}
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-serif-display text-sm font-bold text-[#1F1D1B] group-hover:text-[#A04F34] transition-colors leading-tight">
                          {theme.name}
                        </h3>
                        {theme.tier === "pro" ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#1F1A17] uppercase shadow-xs">
                            <Sparkles className="w-2.5 h-2.5 text-[#1F1A17]" />
                            PRO
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-[#EAE5DD] text-[#5A544E] uppercase">
                            <Zap className="w-2.5 h-2.5 text-amber-600" />
                            BASIC
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#8A837A] block">
                        {theme.category} · {theme.nameIndo}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {theme.previewUrl && (
                        <a
                          href={theme.previewUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 rounded-lg bg-[#1F1D1B] hover:bg-[#332F2B] text-[#D4AF37] text-[10px] font-bold tracking-wider uppercase transition-colors"
                        >
                          Demo Live
                        </a>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#A04F34] group-hover:translate-x-0.5 transition-transform">
                        <span>Pilih</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
