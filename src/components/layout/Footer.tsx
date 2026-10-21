'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3500);
  };

  const navItems = [
    { label: 'The Collection', href: '#collection' },
    { label: 'Origin to Obsession', href: '#origin' },
    { label: 'The Ingredient Lab', href: '#lab' },
    { label: 'Tasting Experience', href: '#tasting' },
    { label: 'Bespoke Gift Coffret', href: '#gift-box' },
    { label: 'Editorial Journal', href: '#journal' },
  ];

  return (
    <footer className="bg-[#1A0F0A] border-t border-[var(--color-gold)]/30 relative text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <span className="text-2xl md:text-3xl font-serif text-[var(--color-gold)] tracking-[0.2em] block">
              NOIRÉ CACAO
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]/70 font-mono">
              Haute Chocolaterie Artisanale • Paris & Guayaquil
            </p>
            <p className="text-sm text-[#FAF7F2]/70 leading-relaxed max-w-sm font-light">
              Single-origin heirloom Nacional cacao transformed into edible sculpture.
              Dedicated to the preservation of ancient terroir and crystalline purity.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-5 font-mono font-semibold">
              The Maison
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-[#FAF7F2]/75 hover:text-[var(--color-gold)] transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Private Allocation */}
          <div className="md:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold)] mb-3 font-mono font-semibold">
              Private Allocations
            </h4>
            <p className="text-xs text-[#FAF7F2]/70 mb-4 font-light leading-relaxed">
              Receive confidential invitations to rare micro-lot harvest releases and seasonal cuvees.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-[#2A160D] border border-[var(--color-gold)]/30 text-white placeholder:text-[#FAF7F2]/40 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-xs font-mono"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[var(--color-gold)] text-[#1A0F0A] hover:bg-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-semibold"
              >
                {isSubmitted ? 'Allocations Confirmed ✓' : 'Request Allocation Access'}
              </button>
            </form>
            <p className="text-[11px] text-[#FAF7F2]/50 mt-2 font-mono">
              Atelier demonstration • No unsolicited communications
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--color-gold)]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#FAF7F2]/60">
          <p>&copy; 2026 NOIRÉ CACAO S.A. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors">
              Terroir Ethics
            </a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors">
              Private Salons
            </a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors">
              Terms of Curation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
