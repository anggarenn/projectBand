import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Alex_Brush, Inria_Serif, Cormorant_Infant } from "next/font/google";
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

const alexBrush = Alex_Brush({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

const inriaSerif = Inria_Serif({
  weight: ["300", "400", "700"],
  variable: "--font-inria",
  subsets: ["latin"],
  display: "swap",
});

const cormorantInfant = Cormorant_Infant({
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mengundang - Platform Undangan Pernikahan Digital Elegan",
  description:
    "Buat undangan pernikahan online modern dengan link personal WhatsApp, RSVP otomatis, amplop digital QRIS langsung masuk rekening, dan layar resepsi Hari-H.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${alexBrush.variable} ${inriaSerif.variable} ${cormorantInfant.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F1D1B] selection:bg-[#F7EFEA] selection:text-[#A04F34]">
        {children}
      </body>
    </html>
  );
}
