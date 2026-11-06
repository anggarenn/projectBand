import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sillynvalley.web.id"),
  title: "Silly N Valley",
  description: "Official website of Silly N Valley. Music, releases, merch & bookings.",
  openGraph: {
    title: "Silly N Valley",
    description: "Music, releases, merch & bookings.",
    url: "https://sillynvalley.web.id",
    siteName: "Silly N Valley",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${bebasNeue.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#0A0A0A] text-[#F3EFE0] selection:bg-[#D4E627] selection:text-black">
        {children}
      </body>
    </html>
  );
}
