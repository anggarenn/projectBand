"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchActiveMerch, MerchProduct } from "@/lib/supabase";
import { FALLBACK_MERCH, RELEASES } from "@/data/releases";
import { useSeamlessAudio } from "@/hooks/useSeamlessAudio";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  StreamingPlatformIcon,
} from "@/components/Icons";
import { OrderModal } from "@/components/OrderModal";
import { Footer } from "@/components/Footer";

export default function SillyNValleyPage() {
  const bgmRef = useRef<HTMLAudioElement>(null);
  useSeamlessAudio(bgmRef);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [merch, setMerch] = useState<MerchProduct[]>(FALLBACK_MERCH);
  const [merchVisible, setMerchVisible] = useState(false);

  const [orderItem, setOrderItem] = useState<MerchProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const merchRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const container = merchRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMerchVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".snv-cover-reveal");
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchActiveMerch().then((data) => {
      if (data && data.length > 0) setMerch(data);
    });
  }, []);

  useEffect(() => {
    if (!orderItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOrderItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [orderItem]);

  const handleOrder = () => {
    if (!orderItem) return;
    const hasSizes = (orderItem.sizes?.length ?? 0) > 0;
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    const sizeLine = hasSizes ? `\n- Ukuran: ${selectedSize}` : "";
    const msg =
      `Halo Silly N Valley! Saya mau order merch resmi:\n\n` +
      `- Produk: ${orderItem.title}` +
      `${sizeLine}\n` +
      `- Harga: ${orderItem.price}\n\n` +
      `Mohon info ketersediaan stok & ongkir ke kota saya. Makasih! #RantaiReaksi`;
    window.open(
      `https://wa.me/6281299095137?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openOrder = (item: MerchProduct) => {
    setOrderItem(item);
    setSelectedSize("");
    setSizeError(false);
  };

  const merchRows: MerchProduct[][] = [];
  for (let i = 0; i < merch.length; i += 2) {
    merchRows.push(merch.slice(i, i + 2));
  }

  return (
    <div id="home" className="min-h-screen bg-[#0A0A0A] text-[#F3EFE0] font-sans antialiased">
      <audio
        ref={bgmRef}
        autoPlay
        loop
        preload="auto"
        playsInline
        className="hidden"
        aria-hidden="true"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-black/50 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className={`font-sans font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-all duration-300 cursor-pointer ${
              scrolled ? "text-white" : "text-black"
            }`}
          >
            SILLY N VALLEY
          </button>

          <div
            className={`hidden md:flex items-center space-x-9 font-sans font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
              scrolled ? "text-white" : "text-black"
            }`}
          >
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              HOME
            </button>
            <button
              type="button"
              onClick={() => scrollToId("maxi-single")}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              MUSIC
            </button>
            <button
              type="button"
              onClick={() => scrollToId("merch")}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              MERCH
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="hover:opacity-60 transition-opacity cursor-pointer"
            >
              CONTACT
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 focus:outline-none cursor-pointer transition-colors duration-300 ${
              scrolled ? "text-white" : "text-black"
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10 px-6 py-6 space-y-4 text-white font-sans font-bold uppercase text-xs tracking-widest">
            <button
              type="button"
              onClick={scrollToTop}
              className="block w-full text-left py-2 border-b border-white/10 cursor-pointer hover:opacity-60"
            >
              HOME
            </button>
            <button
              type="button"
              onClick={() => scrollToId("maxi-single")}
              className="block w-full text-left py-2 border-b border-white/10 cursor-pointer hover:opacity-60"
            >
              MUSIC
            </button>
            <button
              type="button"
              onClick={() => scrollToId("merch")}
              className="block w-full text-left py-2 border-b border-white/10 cursor-pointer hover:opacity-60"
            >
              MERCH
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="block w-full text-left py-2 cursor-pointer hover:opacity-60"
            >
              CONTACT
            </button>
          </div>
        )}
      </nav>

      <header
        className="relative min-h-screen flex flex-col justify-between bg-cover bg-center pt-20"
        style={{
          backgroundImage: "url('/assets/silly-n-valley/new_theme/bg_1_paper.png')",
          backgroundColor: "#C8CACD",
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 z-10">
          <div className="w-full max-w-[320px] sm:max-w-[460px] md:max-w-[540px] snv-hero-mark">
            <img
              src="/assets/silly-n-valley/new_theme/logo_black.png"
              alt="Silly N Valley"
              className="w-full h-auto object-contain select-none snv-hero-mark-img"
            />
          </div>
        </div>

        <div className="w-full text-center pb-8 z-10">
          <button
            type="button"
            onClick={() => scrollToId("maxi-single")}
            className="inline-flex flex-col items-center gap-1 text-black font-sans font-medium text-[11px] uppercase tracking-[0.2em] hover:opacity-70 transition-opacity cursor-pointer group"
          >
            <span>SEE RELEASES</span>
            <ChevronDownIcon className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </header>

      <main id="music">
        {RELEASES.map((rel) => (
          <section
            key={rel.id}
            id={rel.id}
            className="relative py-16 sm:py-24 md:py-28 bg-cover bg-center bg-no-repeat overflow-hidden"
            style={{ backgroundImage: `url('${rel.bgImage}')` }}
          >
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bebas text-white uppercase text-center tracking-[0.08em] mb-10 sm:mb-14">
                {rel.categoryTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
                <div className="flex justify-center md:justify-end">
                  <div
                    className={`w-full max-w-[300px] sm:max-w-[340px] aspect-square shadow-2xl snv-media-frame ${
                      rel.id !== "absurd-distortion" ? "snv-cover-reveal" : ""
                    }`}
                  >
                    <img
                      src={rel.artworkImage}
                      alt={rel.categoryTitle}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                  <span className="text-[11px] font-sans text-white/70 uppercase tracking-[0.18em] font-normal">
                    {rel.tag}
                  </span>

                  {rel.isComingSoon ? (
                    <div className="inline-block bg-[#D4E627] text-black font-sans font-bold text-sm sm:text-base px-8 py-2.5 uppercase tracking-wider cursor-default select-none">
                      COMING SOON!
                    </div>
                  ) : (
                    <div className="w-full max-w-[260px] space-y-3">
                      <h3 className="text-sm font-sans font-normal text-white tracking-wide">
                        Listen Now
                      </h3>
                      <div className="space-y-2">
                        {rel.streamingLinks?.map((link, idx) =>
                          link.url ? (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-between px-3.5 py-2.5 border border-white/40 hover:border-white/80 text-white hover:bg-white/[0.06] transition-all duration-150 text-[12px] font-sans tracking-wide"
                            >
                              <span className="flex items-center gap-2.5">
                                <StreamingPlatformIcon platform={link.platform} />
                                <span className="font-normal">{link.platform}</span>
                              </span>
                              <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/60" />
                            </a>
                          ) : (
                            <div
                              key={idx}
                              aria-disabled="true"
                              className="w-full flex items-center justify-between px-3.5 py-2.5 border border-white/25 text-white/45 text-[12px] font-sans tracking-wide select-none cursor-default"
                            >
                              <span className="flex items-center gap-2.5">
                                <StreamingPlatformIcon platform={link.platform} />
                                <span className="font-normal">{link.platform}</span>
                              </span>
                              <ArrowUpRightIcon className="w-3.5 h-3.5 text-white/30" />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section id="merch" className="bg-[#282828] text-white">
          <div className="px-6 sm:px-12 lg:px-[5cm] pt-16 sm:pt-20 pb-10">
            <span className="text-[10px] font-sans text-white/50 uppercase tracking-[0.2em] block mb-1">
              SILLY N VALLEY
            </span>
            <h2 className="text-6xl sm:text-7xl font-bebas text-white uppercase leading-none tracking-tight">
              MERCH!
            </h2>
            <div className="mt-3 space-y-0.5 text-[12px] font-sans text-white/60">
              <p>T-shirts, cassette tapes &amp; bundles.</p>
              <p>DIRECT ORDER ON WHATSAPP!</p>
            </div>
          </div>

          <div className="px-4 sm:px-8 lg:px-[3cm]" ref={merchRef}>
            {merchRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0 mb-6 sm:mb-10"
              >
                {row.map((item, i) => {
                  const globalIdx = rowIdx * 2 + i;
                  const isLeftCol = i === 0;
                  return (
                    <div
                      key={item.id}
                      onClick={() => openOrder(item)}
                      className={`snv-reveal flex flex-col cursor-pointer group ${
                        merchVisible ? "is-visible" : ""
                      }`}
                      style={{ transitionDelay: `${globalIdx * 100}ms` }}
                      title={item.title}
                    >
                      <div
                        className={`snv-media-frame bg-[#D9D9D9] aspect-square sm:aspect-auto sm:h-[420px] flex items-center justify-center p-6 sm:p-5 ${
                          isLeftCol && row.length > 1
                            ? "sm:border-r sm:border-black/10"
                            : ""
                        }`}
                      >
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-contain max-h-[280px] sm:max-h-[380px]"
                          />
                        ) : (
                          <span className="font-bebas text-2xl text-black/30 uppercase tracking-widest text-center px-4">
                            {item.title}
                          </span>
                        )}
                      </div>

                      <div
                        className={`flex-1 bg-[#282828] px-2 sm:px-6 py-4 sm:py-5 space-y-1 group-hover:bg-white/5 transition-colors border-b border-white/10 sm:border-b-0 ${
                          isLeftCol && row.length > 1
                            ? "sm:border-r sm:border-white/10"
                            : ""
                        }`}
                      >
                        <div className="text-base sm:text-lg font-sans font-bold text-white tracking-wide">
                          {item.price}
                        </div>
                        <div className="text-[11px] font-sans text-white/70 uppercase tracking-wider leading-tight">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {row.length === 1 && (
                  <div className="hidden sm:block bg-[#282828]" />
                )}
              </div>
            ))}
          </div>

          <div className="pb-10" />
        </section>
      </main>

      <Footer />

      {orderItem && (
        <OrderModal
          item={orderItem}
          selectedSize={selectedSize}
          sizeError={sizeError}
          onSelectSize={(size) => {
            setSelectedSize(size);
            setSizeError(false);
          }}
          onClose={() => setOrderItem(null)}
          onOrder={handleOrder}
        />
      )}
    </div>
  );
}
