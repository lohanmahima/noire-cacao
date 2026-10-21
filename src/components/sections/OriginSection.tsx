'use client';

import { useState } from 'react';

export default function OriginSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'The Sacred Harvest',
      subtitle: 'Single-Estate Heirloom Pods',
      detail: '0°00′ Equator • Esmeraldas & Manabí',
      description:
        'We harvest solely heirloom Nacional Arriba trees cultivated under canopy shade in regenerative Ecuadorian agroforests. Each pod is hand-cut with curved machetes strictly at peak brix maturity.',
      metric: '100% Heirloom Nacional',
      image: '/images/journal/esmeraldas.jpg',
    },
    {
      number: '02',
      title: 'Wild Fermentation',
      subtitle: 'Microbial Terroir Alchemy',
      detail: '7 Days • Local Laurel Wood Casks',
      description:
        'Beans rest within fragrant indigenous laurel wood boxes wrapped in wild banana leaves. Native yeasts naturally ferment the sweet white mucilage, elevating core precursor polyphenols and eliminating astringent bitterness.',
      metric: '52°C Peak Thermal Curve',
      image: '/images/curated/ingredients/cacao-beans.jpg?v=cacao-v2',
    },
    {
      number: '03',
      title: 'Convection Roast',
      subtitle: 'Gentle Thermal Awakening',
      detail: 'Slow Batch • Ceramic Drum',
      description:
        'Never scorched. Low-and-slow convection roasting preserves floral monoterpenes and volatile fruit notes that industrial high-heat roasters destroy. Every harvest batch receives a custom temperature profile.',
      metric: '118°C Controlled Roast',
      image: '/images/journal/flavor-wheel.jpg',
    },
    {
      number: '04',
      title: 'Stone Melanging',
      subtitle: '72-Hour Micron Refinement',
      detail: 'Granite Rollers • Zero Emulsifiers',
      description:
        'Granite millstones crush roasted nibs for three continuous days and nights. Pure friction aerates volatile acids and shears particles down below 18 microns — the threshold where the human tongue perceives pure liquid silk.',
      metric: '< 18 Microns Texture',
      image: '/images/curated/ingredients/cacao-butter.jpg?v=cacao-v2',
    },
    {
      number: '05',
      title: 'Crystalline Tempering',
      subtitle: 'Type-V Beta Polymorphism',
      detail: 'Precision Marble Slab Cooling',
      description:
        'The silent choreography of thermal physics. Precise temperature cycling from 45°C down to 27°C and resting at 31.5°C stabilizes pure Form V beta crystals, imparting our legendary acoustic snap and mirror-like obsidian sheen.',
      metric: 'Form V Beta Crystals',
      image: '/images/journal/tempering.jpg',
    },
  ];

  return (
    <section
      id="origin"
      className="py-32 px-6 bg-[#F4EFE6]/88 backdrop-blur-[1px] relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6228] mb-3 font-bold font-mono">
            From Soil to Sculpture
          </div>
          <h2 className="font-serif text-[#1A0F0A] mb-6 text-4xl md:text-5xl font-semibold">
            From Origin to Obsession
          </h2>
          <p className="text-lg text-[#2D2018] max-w-2xl mx-auto font-normal leading-relaxed">
            Every bar is an unhurried pilgrimage of transformation. Five uncompromising acts,
            governed by nature and calibrated by devotion.
          </p>
        </div>

        {/* Step Selector Pills for Fast Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16">
          {steps.map((step, index) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(index)}
              className={`px-5 py-2.5 text-xs uppercase font-mono tracking-widest transition-all ${
                activeStep === index
                  ? 'bg-[#1A0F0A] text-white font-bold shadow-md'
                  : 'border border-[#C9A84C]/50 bg-white text-[#1A0F0A] hover:bg-[#FAF7F2] font-semibold'
              }`}
            >
              Act {step.number} • {step.title}
            </button>
          ))}
        </div>

        {/* Featured Step Detailed Spotlight Card with Real Image */}
        <div className="mb-20 border-2 border-[#C9A84C]/50 bg-white p-6 md:p-12 relative shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Real Harvest / Process Photo */}
            <div className="lg:col-span-4 h-64 lg:h-80 overflow-hidden border border-[#C9A84C]/30 bg-[#EDE5D8] relative shadow-sm">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-[#1A0F0A]/90 text-white font-mono text-xs font-bold uppercase tracking-wider">
                Act {steps[activeStep].number}
              </div>
            </div>

            {/* Content with Strong Dark Contrast */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#8C6228]">
                <span>{steps[activeStep].subtitle}</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif text-[#1A0F0A] font-semibold">
                {steps[activeStep].title}
              </h3>

              <div className="text-xs font-mono text-[#5C4C42] font-semibold pb-2">
                Terroir: {steps[activeStep].detail}
              </div>

              <p className="text-base text-[#2D2018] leading-relaxed font-normal">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Benchmark Box */}
            <div className="lg:col-span-3 bg-[#FAF7F2] p-6 border-2 border-[#C9A84C]/40 text-center shadow-sm space-y-2">
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#8C6228] block font-bold">
                Atelier Benchmark
              </span>
              <span className="text-2xl font-serif text-[#1A0F0A] block font-bold">
                {steps[activeStep].metric}
              </span>
              <span className="text-xs text-[#5C4C42] block font-mono">
                Single-Origin Standard
              </span>
            </div>
          </div>
        </div>

        {/* Chronological List of All 5 Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              onClick={() => setActiveStep(index)}
              className={`p-6 border transition-all duration-300 cursor-pointer ${
                activeStep === index
                  ? 'border-2 border-[#C9A84C] bg-white shadow-md'
                  : 'border border-[#C9A84C]/30 hover:border-[#C9A84C] bg-white/90'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-1 text-3xl font-serif text-[#9E7422] font-bold">
                  {step.number}
                </div>
                <div className="md:col-span-3">
                  <h4 className="text-xl font-serif text-[#1A0F0A] font-semibold">
                    {step.title}
                  </h4>
                  <span className="text-xs text-[#8C6228] font-mono font-bold block mt-0.5">
                    {step.subtitle}
                  </span>
                </div>
                <div className="md:col-span-6 text-sm text-[#2D2018] font-normal leading-relaxed">
                  {step.description}
                </div>
                <div className="md:col-span-2 text-right">
                  <span className="text-xs font-mono font-bold text-[#1A0F0A] px-3 py-1.5 border border-[#C9A84C]/50 bg-[#FAF7F2] inline-block shadow-xs">
                    {step.metric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
