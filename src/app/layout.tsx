import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Bangers, Permanent_Marker } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const bangers = Bangers({
  weight: "400",
  variable: "--font-punk",
  subsets: ["latin"],
  display: "swap",
});

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-marker",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Silly N Valley | Highly Motivated Punk Rock Tangerang",
  description:
    "Official EPK & web profile Silly N Valley. Band punk Tangerang: rilis kaset pita 'Rantai Reaksi: Abu Tanpa Api', showcase HALA Koffie, distro merch, dan booking gigs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${bangers.variable} ${permanentMarker.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#170526] text-[#F3EFE0] selection:bg-[#D4E627] selection:text-[#12041D]">
        {children}
      </body>
    </html>
  );
}
