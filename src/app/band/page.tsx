import type { Metadata } from "next";
import SillyNValleyPage from "../silly-n-valley/page";

export const metadata: Metadata = {
  title: "Silly N Valley (@silly.n.valley) — Highly Motivated Punk Rock | Tangerang",
  description:
    "Official EPK & web profile Silly N Valley. Band punk Tangerang dengan rilis kaset pita 'Rantai Reaksi', showcase HALA Koffie, official merch, riders 8-channel, dan booking hotline.",
  keywords: [
    "Silly N Valley",
    "Band Punk Tangerang",
    "Rantai Reaksi",
    "Highly Motivated Punk",
    "Hala Koffie Tangerang",
    "Gigsgoks Fest",
    "Authenticity Soundroom"
  ],
  openGraph: {
    title: "Silly N Valley — Highly Motivated Punk Tangerang",
    description: "Band punk tapi kok ngonten!? Rilisan fisik kaset pita 'Rantai Reaksi' out now.",
    type: "website"
  }
};

export default function BandPage() {
  return <SillyNValleyPage />;
}
