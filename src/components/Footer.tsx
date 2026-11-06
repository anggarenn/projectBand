import React from "react";
import { ArrowUpRightIcon } from "./Icons";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/silly.n.valley" },
  { label: "YouTube", href: "https://youtube.com/@sillynvalley" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/album/6weIaQGMlG6TQFaZJcYk3s",
  },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-[#0A0A0A] text-white/70 font-sans">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="border-t border-white/10 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start md:items-center">
          <div className="text-center md:text-left">
            <div className="font-bebas text-3xl sm:text-[34px] text-white tracking-wider uppercase leading-none">
              SILLY N VALLEY
            </div>
            <p className="text-white/50 text-[12px] tracking-wide mt-2.5">
              Bookings, shows &amp; everything else.
            </p>
          </div>

          <div className="text-center space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block">
              BOOKING
            </span>
            <a
              href="mailto:sillynvalley@gmail.com"
              className="text-[#D4E627] hover:opacity-80 font-semibold text-sm sm:text-[15px] tracking-wide transition-opacity block"
            >
              sillynvalley@gmail.com
            </a>
            <a
              href="https://wa.me/6281299095137"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white text-xs tracking-wider transition-colors block"
            >
              +62 812-9909-5137
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-0.5">
              SOCIALS
            </span>
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-[#D4E627] transition-colors"
              >
                <span>{item.label}</span>
                <ArrowUpRightIcon className="w-3 h-3 opacity-60" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/35">
          <span>&copy; 2026 Silly N Valley. All rights reserved.</span>
          <span>Tangerang, ID</span>
        </div>
      </div>
    </footer>
  );
}
