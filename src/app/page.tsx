"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Craftsmanship from "@/components/Craftsmanship";
import HowItWorks from "@/components/HowItWorks";
import WhatsAppGenerator from "@/components/WhatsAppGenerator";
import Features from "@/components/Features";
import GreenImpact from "@/components/GreenImpact";
import ThemeGallery from "@/components/ThemeGallery";
import ReceptionDisplaySection from "@/components/ReceptionDisplaySection";
import Pricing from "@/components/Pricing";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import DraftModal from "@/components/DraftModal";

export default function Home() {
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("basic_49k");

  const handleOpenDraft = (plan: string = "basic_49k") => {
    setSelectedPlan(plan);
    setIsDraftModalOpen(true);
  };

  const handleSelectTheme = (themeId: string) => {
    // Open draft modal with selected theme context
    setIsDraftModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F1D1B] selection:bg-[#F7EFEA] selection:text-[#A04F34]">
      {/* Sticky Header */}
      <Navbar onOpenDraft={() => handleOpenDraft("basic_49k")} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Editorial Headline & Interactive Live Phone Simulator */}
        <Hero onOpenDraft={() => handleOpenDraft("basic_49k")} />

        {/* 2. Curated Wedding Themes Gallery with Real Couple Photography */}
        <ThemeGallery onSelectTheme={handleSelectTheme} />

        {/* 3. Editorial Craftsmanship & Fine Art Wedding Lookbook */}
        <Craftsmanship />

        {/* 4. WhatsApp Personal Link & Message Generator Tool */}
        <WhatsAppGenerator />

        {/* 5. 5-Step "Cara Kerja" Timeline */}
        <HowItWorks />

        {/* 6. Exclusive Reception TV Display & QR Scanner Section */}
        <ReceptionDisplaySection />

        {/* 7. Essential Core Features with Varied Composition */}
        <Features />

        {/* 8. Environmental Impact (honest per-event estimates) */}
        <GreenImpact />

        {/* 9. Transparent Pricing (Basic Rp 49k vs Pro Rp 99k) + Cost Calculator */}
        <Pricing onSelectPlan={(plan) => handleOpenDraft(plan)} />

        {/* 10. Real User Concerns FAQ Accordion */}
        <Faq />
      </main>

      {/* Footer */}
      <Footer />

      {/* Draft Setup Modal */}
      <DraftModal
        isOpen={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
