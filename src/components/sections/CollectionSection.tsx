'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { useGiftStore } from '@/stores/giftStore';
import dynamic from 'next/dynamic';
import { X, Check, Box } from 'lucide-react';

const ChocolateProduct = dynamic(() => import('../three/ChocolateProduct'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F4EFE6] text-center">
      <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest text-[var(--color-gold)] font-mono">
        Sculpting 3D Model...
      </span>
    </div>
  ),
});

export default function CollectionSection() {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [modalView, setModalView] = useState<'3d' | 'photo'>('photo');

  const { slots, placeInSlot, selectProduct } = useGiftStore();

  const handleAddToBox = (product: typeof products[0]) => {
    // Find first empty slot
    const emptyIndex = slots.findIndex((s) => s.product === null);
    if (emptyIndex !== -1) {
      selectProduct(product);
      placeInSlot(emptyIndex);
      setAddedToast(`${product.name} placed in Gift Slot 0${emptyIndex + 1}`);
    } else {
      setAddedToast(`Gift Box is currently full (9/9). Remove an item to add.`);
    }

    setTimeout(() => {
      setAddedToast(null);
    }, 3200);
  };

  return (
    <section id="collection" className="py-32 px-6 bg-[#FAF7F2]/88 backdrop-blur-[1px] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6228] mb-3 font-bold font-mono">
            Permanent Cuvees
          </div>
          <h2 className="font-serif text-[#1A0F0A] mb-6 text-4xl md:text-5xl font-semibold">
            The Collection
          </h2>
          <p className="text-lg text-[#2D2018] max-w-2xl mx-auto font-normal leading-relaxed">
            Four singular expressions. Each a study in single-origin balance, restraint, and obsessive refinement.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all duration-500 p-5 bg-white hover:-translate-y-2 flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                {/* Real Chocolate Photo */}
                <div className="w-full aspect-[16/9] mb-5 overflow-hidden relative bg-[#EDE5D8] border border-[#C9A84C]/40 shadow-xs">
                  <img
                    key={product.image}
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#1A0F0A]/90 backdrop-blur-sm text-white font-mono text-[10px] uppercase tracking-wider font-semibold">
                    {product.cocoaPercentage ? `${product.cocoaPercentage}% Cacao` : 'Grand Cru'}
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#1A0F0A] text-[10px] font-mono tracking-wider shadow-sm flex items-center gap-1 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    <Box size={10} /> Inspect in 3D
                  </div>
                </div>

                <div className="text-[11px] uppercase tracking-widest text-[#8C6228] mb-1.5 font-bold font-mono">
                  {product.tagline}
                </div>

                <h3 className="text-2xl font-serif text-[#1A0F0A] mb-2 group-hover:text-[#8C6228] transition-colors font-semibold">
                  {product.name}
                </h3>

                <p className="text-xs text-[#5C4C42] italic mb-3 font-medium">
                  Terroir: {product.origin}
                </p>

                <p className="text-sm text-[#2D2018] leading-relaxed mb-4 line-clamp-3 font-normal">
                  {product.description}
                </p>

                {/* Tasting notes pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.tastingNotes.slice(0, 3).map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 text-[11px] border border-[#C9A84C]/40 bg-[#FAF7F2] text-[#2D2018] font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#C9A84C]/20 flex items-center justify-between">
                <span className="text-2xl font-serif text-[#1A0F0A] font-bold">
                  ${product.price}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#8C6228] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                  Inspect & Curate →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-[#1A0F0A]/70 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="max-w-5xl w-full bg-[#FAF7F2] border border-[var(--color-gold)]/60 grid grid-cols-1 lg:grid-cols-2 max-h-[92vh] overflow-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 border border-[var(--color-border)] bg-white flex items-center justify-center text-[var(--color-cocoa)] hover:bg-[var(--color-cocoa)] hover:text-white transition-all shadow-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* 3D / Photo Interactive View */}
            <div className="h-[360px] lg:h-auto min-h-[360px] bg-gradient-to-br from-[#EDE5D8] to-[#FAF7F2] border-b lg:border-b-0 lg:border-r border-[#C9A84C]/30 relative flex items-center justify-center overflow-hidden">
              <div className="absolute top-4 left-4 z-20 flex items-center bg-white border border-[#C9A84C]/40 p-1 shadow-sm font-mono text-[11px]">
                <button
                  onClick={() => setModalView('photo')}
                  className={`px-3 py-1 flex items-center gap-1 transition-all ${
                    modalView === 'photo'
                      ? 'bg-[#1A0F0A] text-white font-semibold shadow-xs'
                      : 'text-[#5C4C42] hover:text-[#1A0F0A]'
                  }`}
                >
                  Studio Photo
                </button>
                <button
                  onClick={() => setModalView('3d')}
                  className={`px-3 py-1 flex items-center gap-1 transition-all ${
                    modalView === '3d'
                      ? 'bg-[#1A0F0A] text-white font-semibold shadow-xs'
                      : 'text-[#5C4C42] hover:text-[#1A0F0A]'
                  }`}
                >
                  3D Model
                </button>
              </div>

              {modalView === '3d' ? (
                <div className="w-full h-full">
                  <ChocolateProduct product={selectedProduct} />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6">
                  <img
                    key={selectedProduct.image}
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain max-h-[400px] shadow-lg border border-[#C9A84C]/40 bg-white"
                  />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-between bg-white">
              <div>
                <div className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-2 font-mono font-semibold">
                  {selectedProduct.tagline} • Grand Cru Selection
                </div>

                <h3 className="text-3xl md:text-4xl font-serif text-[var(--color-cocoa)] mb-3">
                  {selectedProduct.name}
                </h3>

                {selectedProduct.cocoaPercentage && (
                  <div className="text-sm font-mono text-[var(--color-gold)] font-medium mb-6">
                    {selectedProduct.cocoaPercentage}% Single-Origin Heirloom Cacao
                  </div>
                )}

                <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed mb-6 font-light">
                  {selectedProduct.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-widest text-[var(--color-cocoa)] mb-3 font-mono font-semibold">
                    Aromatic Notes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="px-3 py-1 border border-[var(--color-border)] text-xs text-[var(--color-cocoa)] bg-[#FAF7F2]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs uppercase tracking-widest text-[var(--color-cocoa)] mb-1 font-mono font-semibold">
                    Terroir & Origin
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] italic">
                    {selectedProduct.origin}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between gap-4">
                <span className="text-3xl font-serif text-[var(--color-cocoa)]">
                  ${selectedProduct.price}
                </span>
                <button
                  onClick={() => handleAddToBox(selectedProduct)}
                  className="px-6 py-3.5 bg-[var(--color-cocoa)] text-white hover:bg-[var(--color-gold)] transition-all duration-300 text-xs uppercase tracking-wider font-semibold shadow-md"
                >
                  Add to Gift Coffret
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A0F0A] text-white px-5 py-3 shadow-2xl flex items-center gap-3 animate-fade-in font-serif text-sm border border-[var(--color-gold)]/40">
          <span className="text-[var(--color-gold)]">
            <Check size={16} />
          </span>
          <span>{addedToast}</span>
          <a
            href="#gift-box"
            className="text-xs uppercase font-mono tracking-wider text-[var(--color-gold)] underline ml-2 font-medium"
          >
            View Coffret →
          </a>
        </div>
      )}
    </section>
  );
}
