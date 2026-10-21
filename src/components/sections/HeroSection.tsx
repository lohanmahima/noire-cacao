'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Sparkles, Eye, Box } from 'lucide-react';
import { assetPath } from '@/utils/assetPath';

const ExperienceCanvas = dynamic(() => import('../three/ExperienceCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F4EFE6] text-center">
      <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest text-[#1A0F0A] font-mono">
        Sculpting Artisan Plate...
      </span>
    </div>
  ),
});

export default function HeroSection() {
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  return (
    <section className="relative min-h-screen w-full bg-[#FAF7F2]/82 backdrop-blur-[1px] pt-28 pb-16 px-6 flex items-center overflow-hidden">
      {/* Subtle warm luxury grain and champagne ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,168,76,0.12)_0%,transparent_60%)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & CTAs (100% Crisp, Dark Cocoa Contrast) */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Heritage Tag */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#C9A84C]/50 bg-white shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B88E38] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#1A0F0A] font-semibold font-mono">
              Maison de Haute Chocolaterie • Paris
            </span>
          </div>

          <h1 className="font-serif text-[#1A0F0A] text-5xl sm:text-6xl lg:text-7xl leading-[1.06] tracking-tight font-medium">
            AN OBSESSION,
            <br />
            <span className="text-[#9E7422] italic font-light">PERFECTED.</span>
          </h1>

          <p className="text-lg md:text-xl text-[#2D2018] leading-relaxed max-w-xl font-normal">
            Single-origin grand cru cacao transformed into works of edible sculpture.
            Each bar is a meditation. Each bite, a revelation.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#collection"
              className="px-8 py-4 bg-[#1A0F0A] text-white hover:bg-[#B88E38] transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold text-center shadow-md hover:shadow-lg"
            >
              Discover The Collection
            </a>
            <a
              href="#tasting"
              className="px-8 py-4 border border-[#C9A84C] bg-white text-[#1A0F0A] hover:bg-[#FAF7F2] hover:border-[#1A0F0A] transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium text-center shadow-sm"
            >
              The Tasting Physics
            </a>
          </div>

          {/* Terroir credentials footer */}
          <div className="pt-6 border-t border-[#C9A84C]/25 flex items-center justify-between text-xs font-mono text-[#8C6228]">
            <span className="font-semibold">0°00′ Equator • Esmeraldas</span>
            <span>Type-V Crystalline Temper</span>
          </div>
        </div>

        {/* Right Column: 3D Rotating Artisan Plate Stage & Studio Photo Toggle */}
        <div className="lg:col-span-6 relative">
          <div className="border-2 border-[#C9A84C]/50 bg-white p-3 md:p-5 shadow-2xl relative">
            {/* View Mode Toggle Switch */}
            <div className="absolute top-5 right-5 z-20 flex items-center bg-[#FAF7F2] border border-[#C9A84C]/40 p-1 shadow-sm font-mono text-[11px]">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1 flex items-center gap-1.5 transition-all ${
                  viewMode === '3d'
                    ? 'bg-[#1A0F0A] text-white font-semibold shadow-sm'
                    : 'text-[#5C4C42] hover:text-[#1A0F0A]'
                }`}
              >
                <Box size={12} /> 3D Rotating Bar
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3 py-1 flex items-center gap-1.5 transition-all ${
                  viewMode === 'photo'
                    ? 'bg-[#1A0F0A] text-white font-semibold shadow-sm'
                    : 'text-[#5C4C42] hover:text-[#1A0F0A]'
                }`}
              >
                <Eye size={12} /> Studio Photo
              </button>
            </div>

            {/* Badge */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#B88E38] animate-ping" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#1A0F0A] font-bold bg-white/90 px-2 py-0.5 border border-[#C9A84C]/30 shadow-xs">
                {viewMode === '3d' ? '3D Active Kinetic Model' : 'Artisanal Studio Archive'}
              </span>
            </div>

            {/* Main Stage View Area */}
            <div className="h-[440px] sm:h-[500px] md:h-[540px] w-full bg-gradient-to-b from-[#F7F2E9] via-[#FAF7F2] to-[#ECE3D5] relative overflow-hidden flex items-center justify-center">
              {viewMode === '3d' ? (
                <div className="w-full h-full relative">
                  <ExperienceCanvas />
                  <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none text-[11px] uppercase tracking-widest text-[#8C6228] font-mono font-semibold">
                    ✦ Continuously Rotating in 3D • Drag to inspect plate
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative group">
                  <img
                    src={assetPath('/images/hero-chocolate-bars.jpg')}
                    alt="Artisanal Dark & White Chocolate Bars on Stoneware Plate with Gold Cocoa Spoon"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                    <p className="font-serif text-lg leading-tight">
                      Grand Cru Dual Expression
                    </p>
                    <p className="text-xs text-[#FAF7F2]/80 font-mono">
                      Pure Nacional Dark Bar over Vanilla Ivory Bar • Hand-carved Stoneware
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Details Footer */}
            <div className="mt-3 pt-3 border-t border-[#C9A84C]/20 flex items-center justify-between text-[11px] font-mono text-[#5C4C42]">
              <span>Dual Temper: 72% Dark & Ivory Silk</span>
              <span className="text-[#9E7422] font-semibold">
                {viewMode === '3d' ? 'Drag 360° to Orbit' : 'Single-Origin Formulation'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
