'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useGiftStore } from '@/stores/giftStore';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { slots } = useGiftStore();
  const filledSlots = slots.filter((slot) => slot.product !== null).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#collection', label: 'The Collection' },
    { href: '#origin', label: 'Origin' },
    { href: '#lab', label: 'Ingredient Lab' },
    { href: '#tasting', label: 'Tasting Physics' },
    { href: '#gift-box', label: 'Gift Coffret' },
    { href: '#journal', label: 'Journal' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md py-3.5 border-b border-[#C9A84C]/40 shadow-md'
          : 'bg-[#FAF7F2]/80 backdrop-blur-sm py-5 border-b border-[#C9A84C]/25 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="group flex items-center gap-2.5 transition-all duration-300"
          title="NOIRÉ CACAO — Return to Top"
        >
          <span className="w-8 h-8 rounded-full border border-[#8C6228]/60 bg-white flex items-center justify-center text-[#8C6228] font-serif text-sm shadow-sm group-hover:scale-105 group-hover:border-[#1A0F0A] group-hover:text-[#1A0F0A] transition-all">
            ✦
          </span>
          <span className="text-2xl md:text-3xl font-serif font-black tracking-[0.24em] text-[#1A0F0A] drop-shadow-xs group-hover:text-[#8C6228] transition-colors">
            NOIRÉ CACAO
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-[#1A0F0A] hover:text-[#9E7422] transition-colors duration-300 font-bold"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA / Coffret Status Pill */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#gift-box"
            className="flex items-center gap-2.5 px-4 py-2 border border-[var(--color-gold)]/40 hover:border-[var(--color-gold)] bg-white text-[var(--color-cocoa)] hover:text-[var(--color-gold)] transition-all text-xs font-mono tracking-wider shadow-sm"
          >
            <ShoppingBag size={14} className="text-[var(--color-gold)]" />
            <span className="font-sans uppercase text-[11px] font-semibold">Coffret</span>
            <span className="w-5 h-5 rounded-full bg-[var(--color-cocoa)] text-white flex items-center justify-center font-bold text-[10px]">
              {filledSlots}
            </span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[var(--color-cocoa)] z-50 p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-[#FAF7F2]/98 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 flex flex-col justify-center items-center px-6 ${
          isOpen
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-9 h-9 rounded-full border border-[#8C6228]/60 bg-white flex items-center justify-center text-[#8C6228] font-serif text-base shadow-sm">
              ✦
            </span>
            <span className="text-2xl font-serif font-black tracking-[0.24em] text-[#1A0F0A]">
              NOIRÉ CACAO
            </span>
          </div>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif text-[var(--color-cocoa)] hover:text-[var(--color-gold)] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#gift-box"
            onClick={() => setIsOpen(false)}
            className="mt-6 px-8 py-3.5 bg-[var(--color-cocoa)] text-white text-xs uppercase tracking-widest font-semibold shadow-md"
          >
            Curate Gift Coffret ({filledSlots}/9)
          </a>
        </div>
      </div>
    </nav>
  );
}
