'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { assetPath } from '@/utils/assetPath';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import OriginSection from '@/components/sections/OriginSection';
import CollectionSection from '@/components/sections/CollectionSection';
import IngredientLabSection from '@/components/sections/IngredientLabSection';
import TastingSection from '@/components/sections/TastingSection';
import GiftBuilderSection from '@/components/sections/GiftBuilderSection';
import JournalSection from '@/components/sections/JournalSection';
import CandyRainWidget from '@/components/ui/CandyRainWidget';

// Dynamically imported with ssr: false to prevent extension hydration mismatches
const Preloader = dynamic(() => import('@/components/layout/Preloader'), {
  ssr: false,
});

export default function Home() {
  return (
    <main
      suppressHydrationWarning
      className="min-h-screen relative bg-[#FAF7F2] text-[var(--color-text)] overflow-hidden"
    >
      {/* 
        Atmospheric Atelier Cacao Background (90% presence, just lightly transparent with 2px soft blur)
        Boldly showcases the broken chocolate bar, pouring molten bowl, and cacao beans.
      */}
      <div
        suppressHydrationWarning
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      >
        <Image
          src={assetPath('/images/background/cacao-atelier-bg.jpg')}
          alt="Atmospheric Cacao Atelier Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-[0.90] filter blur-[2px] scale-105"
        />
        {/* Subtle warm glaze for optimal text contrast and luxury tone */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/25 via-transparent to-[#FAF7F2]/30" />
      </div>

      {/* Main Content Layers */}
      <div className="relative z-10">
        <Preloader />
        <Navigation />
        <HeroSection />
        <OriginSection />
        <CollectionSection />
        <IngredientLabSection />
        <TastingSection />
        <GiftBuilderSection />
        <JournalSection />
        <Footer />
        <CandyRainWidget />
      </div>
    </main>
  );
}
