'use client';

import { useState } from 'react';
import { ingredients } from '@/data/ingredients';
import dynamic from 'next/dynamic';

const IngredientOrbit = dynamic(() => import('../three/IngredientOrbit'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F4EFE6] text-center">
      <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-mono">
        Aligning Celestial Elements...
      </span>
    </div>
  ),
});

export default function IngredientLabSection() {
  const [selectedIngredient, setSelectedIngredient] = useState<typeof ingredients[0] | null>(
    null
  );

  return (
    <section id="lab" className="py-32 px-6 bg-[#F4EFE6]/88 backdrop-blur-[1px] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6228] mb-3 font-bold font-mono">
            Raw Alchemy & Terroir
          </div>
          <h2 className="font-serif text-[#1A0F0A] mb-6 text-4xl md:text-5xl font-semibold">
            The Ingredient Lab
          </h2>
          <p className="text-lg text-[#2D2018] max-w-2xl mx-auto font-normal leading-relaxed">
            Six raw elements. Sourced with uncompromising obsession from volcanic soils,
            alpine valleys, and ancient rainforest canopies.
          </p>
        </div>

        {/* 3D Visualization Chamber */}
        <div className="mb-16 h-[460px] md:h-[540px] border border-[#C9A84C]/50 bg-gradient-to-b from-[#F3ECE1] via-[#FAF7F2] to-[#ECE3D4] relative overflow-hidden shadow-lg">
          <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8C6228] animate-ping" />
            <span className="text-xs uppercase tracking-widest text-[#1A0F0A] font-mono font-bold">
              Celestial Ingredient Orbit • 3D Atelier Render
            </span>
          </div>

          <div className="w-full h-full">
            <IngredientOrbit
              ingredients={ingredients}
              selectedIngredient={selectedIngredient}
              onSelectIngredient={setSelectedIngredient}
            />
          </div>
        </div>

        {/* Ingredient Cards with Real Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ingredient) => {
            const isSelected = selectedIngredient?.id === ingredient.id;

            return (
              <div
                key={ingredient.id}
                onClick={() =>
                  setSelectedIngredient((prev) =>
                    prev?.id === ingredient.id ? null : ingredient
                  )
                }
                onMouseEnter={() => setSelectedIngredient(ingredient)}
                className={`group relative border transition-all duration-500 p-6 bg-white cursor-pointer shadow-sm ${
                  isSelected
                    ? 'border-[var(--color-gold)] ring-2 ring-[var(--color-gold)]/20 shadow-lg -translate-y-1'
                    : 'border-[var(--color-border)] hover:border-[var(--color-gold)]/70 hover:shadow-md'
                }`}
              >
                {/* Real Ingredient Photo Header */}
                <div className="w-full aspect-[5/6] mb-4 overflow-hidden relative border border-[#C9A84C]/40 bg-[#EDE5D8] shadow-xs">
                  <img
                    key={ingredient.image}
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#1A0F0A] font-mono text-[11px] uppercase tracking-wider font-bold shadow-xs border border-[#C9A84C]/30">
                    0{ingredients.indexOf(ingredient) + 1}
                  </div>
                </div>

                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`text-xl font-serif font-semibold transition-colors ${
                      isSelected
                        ? 'text-[#8C6228]'
                        : 'text-[#1A0F0A] group-hover:text-[#8C6228]'
                    }`}
                  >
                    {ingredient.name}
                  </h3>
                </div>

                <p className="text-xs text-[#5C4C42] mb-3 italic font-medium">
                  Origin: {ingredient.origin}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ingredient.characteristics.map((char) => (
                    <span
                      key={char}
                      className="px-2.5 py-1 text-[11px] border border-[#C9A84C]/40 text-[#2D2018] bg-[#FAF7F2] font-medium"
                    >
                      {char}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isSelected
                      ? 'max-h-96 opacity-100 pt-3 border-t border-[#C9A84C]/25'
                      : 'max-h-20 opacity-90'
                  }`}
                >
                  <p className="text-xs text-[#2D2018] leading-relaxed font-normal">
                    {ingredient.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#C9A84C]/25 flex items-center justify-between text-xs text-[#8C6228] font-bold">
                  <span>{isSelected ? '✦ Inspected in Orbit' : 'Inspect in 3D'}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
