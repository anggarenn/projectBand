import { Metadata } from "next";
import WeddingBentoCenter from "@/components/bento/WeddingBentoCenter";

export const metadata: Metadata = {
  title: "Live Monitor Acara & Resepsi | Mengundang.id",
  description:
    "Live monitor acara pernikahan real-time: RSVP live gauge, buku tamu WhatsApp dispatch, amplop digital, dan check-in terminal.",
};

export default function BentoPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <WeddingBentoCenter />
    </div>
  );
}
