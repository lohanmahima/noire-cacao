'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { useGiftStore } from '@/stores/giftStore';
import { X, Sparkles, BookmarkCheck } from 'lucide-react';

export default function GiftBuilderSection() {
  const {
    slots,
    selectedProduct,
    selectProduct,
    placeInSlot,
    removeFromSlot,
    reset,
    getTotalPrice,
  } = useGiftStore();

  const [ribbon, setRibbon] = useState<'noir' | 'gold' | 'bronze'>('gold');
  const [giftNote, setGiftNote] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [curationCode, setCurationCode] = useState('');

  const filledSlots = slots.filter((slot) => slot.product !== null).length;

  const handleAutoFill = () => {
    // Fill all 9 slots with an artisanal curation
    const curationOrder = [
      products[0],
      products[1],
      products[2],
      products[3],
      products[0],
      products[1],
      products[2],
      products[3],
      products[0],
    ];
    curationOrder.forEach((prod, index) => {
      selectProduct(prod);
      placeInSlot(index);
    });
  };

  const handleCompleteCuration = () => {
    const code = `NC-${Math.floor(1000 + Math.random() * 9000)}-${ribbon.toUpperCase()}`;
    setCurationCode(code);
    setShowSummaryModal(true);
  };

  return (
    <section
      id="gift-box"
      className="py-32 px-6 bg-[#FAF7F2]/88 backdrop-blur-[1px] relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6228] mb-3 font-bold font-mono">
            Haute Chocolaterie Sur-Mesure
          </div>
          <h2 className="font-serif text-[#1A0F0A] mb-6 text-4xl md:text-5xl font-semibold">
            The Gift Builder
          </h2>
          <p className="text-lg text-[#2D2018] max-w-2xl mx-auto font-normal leading-relaxed">
            Compose a bespoke nine-piece collection. Hand-selected single-origins,
            customized silk ribbon, and hand-pressed gold foil dedication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Product Picker */}
          <div className="lg:col-span-4 space-y-4 bg-white p-6 border border-[#C9A84C]/40 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-serif text-[#1A0F0A] font-semibold">
                1. Select Chocolate
              </h3>
              {selectedProduct && (
                <span className="text-xs font-mono text-[var(--color-gold)] uppercase font-semibold animate-pulse">
                  Ready to place
                </span>
              )}
            </div>

            <p className="text-xs text-[var(--color-text-muted)] mb-4">
              Select a bar below, then click any empty coffret slot to place it.
            </p>

            <div className="space-y-3">
              {products.map((product) => {
                const isSelected = selectedProduct?.id === product.id;
                return (
                  <div
                    key={product.id}
                    onClick={() =>
                      selectProduct(isSelected ? null : product)
                    }
                    className={`border p-3 cursor-pointer transition-all duration-300 flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-[var(--color-gold)] bg-[#FAF7F2] shadow-sm ring-2 ring-[var(--color-gold)]/20'
                        : 'border-[var(--color-border-subtle)] hover:border-[var(--color-gold)]/60 bg-white'
                    }`}
                  >
                    {/* Real chocolate thumbnail photo */}
                    <div className="w-14 h-14 border border-[var(--color-border-subtle)] shrink-0 overflow-hidden bg-[#EDE5D8]">
                      <img
                        key={product.image}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-serif text-[var(--color-cocoa)] truncate font-medium">
                          {product.name}
                        </h4>
                        <span className="text-xs font-serif text-[var(--color-gold)] font-semibold">
                          ${product.price}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--color-text-light)] truncate">
                        {product.tagline} • {product.origin}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[var(--color-border-subtle)] flex gap-2">
              <button
                onClick={handleAutoFill}
                className="flex-1 py-2 px-3 border border-[var(--color-gold)] text-[var(--color-cocoa)] hover:bg-[var(--color-gold)] hover:text-white transition-all text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 font-medium"
              >
                <Sparkles size={12} className="text-[var(--color-gold)]" /> Auto-Curate
              </button>
              <button
                onClick={reset}
                className="py-2 px-3 border border-red-300 text-red-600 hover:bg-red-50 transition-all text-xs uppercase tracking-wider font-mono"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Center Column: 3x3 Luxury Presentation Box */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 border-2 border-[var(--color-gold)]/60 shadow-lg relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-serif text-[var(--color-cocoa)]">
                  2. Your 9-Piece Coffret
                </h3>
                <span className="text-xs font-mono text-[var(--color-gold)] font-medium">
                  {filledSlots} of 9 positions curated
                </span>
              </div>
              {/* Selected ribbon badge */}
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--color-cocoa)]">
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{
                    backgroundColor:
                      ribbon === 'noir'
                        ? '#1A0F0A'
                        : ribbon === 'gold'
                        ? '#C9A84C'
                        : '#A0522D',
                  }}
                />
                Ribbon: {ribbon}
              </div>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-3.5 p-5 border border-[var(--color-border)] bg-[#F4EFE6] shadow-inner">
              {slots.map((slot) => {
                const isOccupied = slot.product !== null;

                return (
                  <div
                    key={slot.index}
                    onClick={() => {
                      if (isOccupied) {
                        removeFromSlot(slot.index);
                      } else if (selectedProduct) {
                        placeInSlot(slot.index);
                      }
                    }}
                    className={`aspect-square relative flex flex-col items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden border ${
                      isOccupied
                        ? 'border-[var(--color-gold)] bg-white shadow-sm group'
                        : selectedProduct
                        ? 'border-[var(--color-gold)] border-dashed bg-[var(--color-gold)]/10 animate-pulse'
                        : 'border-[var(--color-border-subtle)] hover:border-[var(--color-gold)]/60 bg-white/70'
                    }`}
                  >
                    {isOccupied ? (
                      <>
                        {/* Real chocolate image in slot */}
                        <img
                          key={slot.product!.image}
                          src={slot.product!.image}
                          alt={slot.product!.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-1.5 text-center">
                          <span className="font-serif text-[10px] md:text-[11px] text-white leading-tight font-medium drop-shadow-sm truncate">
                            {slot.product!.name}
                          </span>
                          <span className="text-[9px] font-mono text-[var(--color-gold-light)]">
                            ${slot.product!.price}
                          </span>
                        </div>

                        {/* Individual Slot Remove Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromSlot(slot.index);
                          }}
                          className="absolute top-1 right-1 w-5 h-5 bg-[#1A0F0A]/90 text-white rounded-full flex items-center justify-center opacity-85 hover:opacity-100 hover:bg-red-600 transition-all shadow-sm"
                          title="Remove from slot"
                        >
                          <X size={11} />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-mono text-[var(--color-text-light)] select-none">
                        0{slot.index + 1}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Custom Ribbon Selector */}
            <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)]">
              <label className="text-xs font-mono uppercase tracking-widest text-[var(--color-cocoa)] font-semibold block mb-2.5">
                Silk Ribbon Finish
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gold', label: 'Antique Gold', hex: '#C9A84C' },
                  { id: 'noir', label: 'Obsidian Noir', hex: '#1A0F0A' },
                  { id: 'bronze', label: 'Caramel Bronze', hex: '#A0522D' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRibbon(item.id as any)}
                    className={`py-2 px-2.5 text-xs border text-left flex items-center gap-2 transition-all ${
                      ribbon === item.id
                        ? 'border-[var(--color-gold)] bg-[#FAF7F2] text-[var(--color-cocoa)] font-semibold shadow-sm'
                        : 'border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-gold)]/40 bg-white'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 border border-black/15 shadow-sm"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dedication & Summary */}
          <div className="lg:col-span-3 space-y-4 bg-white p-6 border border-[var(--color-border)] shadow-sm">
            <h3 className="text-lg font-serif text-[var(--color-cocoa)] mb-1">
              3. Dedication & Summary
            </h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">
              Personalized calligraphic card enclosed.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-cocoa)] font-semibold block mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Lady Vivienne"
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[var(--color-border)] text-[var(--color-cocoa)] focus:outline-none focus:border-[var(--color-gold)]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-cocoa)] font-semibold block mb-1">
                  Gift Note
                </label>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  rows={3}
                  placeholder="With deepest devotion..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[var(--color-border)] text-[var(--color-cocoa)] focus:outline-none focus:border-[var(--color-gold)] resize-none"
                />
              </div>
            </div>

            {/* Price breakdown */}
            <div className="pt-4 border-t border-[var(--color-border-subtle)] space-y-2">
              <div className="flex justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span>Selected Pieces ({filledSlots}):</span>
                <span>${getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-xs text-[var(--color-text-muted)] font-mono">
                <span>Hand-Bound Coffret:</span>
                <span className="text-[var(--color-gold)] font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[var(--color-border-subtle)]">
                <span className="font-serif text-lg text-[var(--color-cocoa)]">
                  Total
                </span>
                <span className="font-serif text-2xl text-[var(--color-gold)] font-semibold">
                  ${getTotalPrice()}
                </span>
              </div>
            </div>

            <button
              onClick={handleCompleteCuration}
              disabled={filledSlots === 0}
              className={`w-full py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                filledSlots > 0
                  ? 'bg-[var(--color-cocoa)] text-white hover:bg-[var(--color-gold)] shadow-md cursor-pointer'
                  : 'bg-[#EDE5D8] text-[var(--color-text-light)] cursor-not-allowed'
              }`}
            >
              Reserve Bespoke Box ✦
            </button>

            <p className="text-[11px] text-[var(--color-text-light)] text-center font-mono">
              Artisanal Atelier Demo • No Payment Collected
            </p>
          </div>
        </div>
      </div>

      {/* Curation Summary Modal */}
      {showSummaryModal && (
        <div
          className="fixed inset-0 z-50 bg-[#1A0F0A]/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          onClick={() => setShowSummaryModal(false)}
        >
          <div
            className="max-w-xl w-full bg-white border-2 border-[var(--color-gold)] p-8 md:p-10 shadow-2xl relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSummaryModal(false)}
              className="absolute top-4 right-4 text-[var(--color-cocoa)] hover:text-[var(--color-gold)]"
            >
              <X size={20} />
            </button>

            <div className="w-12 h-12 mx-auto mb-4 border border-[var(--color-gold)] bg-[#FAF7F2] flex items-center justify-center text-[var(--color-gold)] font-serif text-xl shadow-sm">
              <BookmarkCheck size={24} />
            </div>

            <span className="text-xs uppercase font-mono tracking-[0.3em] text-[var(--color-gold)] block mb-1 font-semibold">
              Atelier Reservation Registered
            </span>

            <h3 className="text-3xl font-serif text-[var(--color-cocoa)] mb-2">
              Bespoke Coffret Curated
            </h3>

            <div className="inline-block px-4 py-1.5 border border-[var(--color-gold)]/40 bg-[#FAF7F2] font-mono text-xs text-[var(--color-cocoa)] tracking-widest my-4 font-semibold">
              Curation Reference: {curationCode}
            </div>

            <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto mb-6 leading-relaxed">
              Your customized nine-slot selection has been prepared with{' '}
              <span className="text-[var(--color-cocoa)] uppercase font-mono font-bold">{ribbon}</span> silk ribbon.
              {recipient && ` Enclosed for ${recipient}.`}
            </p>

            {giftNote && (
              <div className="p-4 border-l-2 border-[var(--color-gold)] bg-[#FAF7F2] text-left mb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-gold)] block mb-1 font-semibold">
                  Card Inscription:
                </span>
                <p className="italic text-xs text-[var(--color-cocoa)] font-serif">
                  &ldquo;{giftNote}&rdquo;
                </p>
              </div>
            )}

            <div className="border-t border-[var(--color-border-subtle)] pt-4 flex items-center justify-between font-serif mb-6">
              <span className="text-sm text-[var(--color-text-muted)]">Curation Value:</span>
              <span className="text-2xl text-[var(--color-gold)] font-semibold">${getTotalPrice()}</span>
            </div>

            <button
              onClick={() => setShowSummaryModal(false)}
              className="w-full py-3.5 bg-[var(--color-cocoa)] text-white font-semibold uppercase text-xs tracking-widest hover:bg-[var(--color-gold)] transition-colors shadow-md"
            >
              Continue Exploring NOIRÉ
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
