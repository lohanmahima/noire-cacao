'use client';

import { useEffect, useState, useRef } from 'react';
import { useProgress } from '@react-three/drei';

export default function Preloader() {
  const [mounted, setMounted] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Drei useProgress tracks THREE.DefaultLoadingManager
  let assetProgress = 100;
  try {
    const { progress } = useProgress();
    assetProgress = progress;
  } catch {
    assetProgress = 100;
  }

  useEffect(() => {
    setMounted(true);

    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayProgress(100);
      setIsComplete(true);
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      // Advance toward either assetProgress or 100
      const target = Math.max(current + 3, Math.min(100, Math.round(assetProgress)));

      current += (target - current) * 0.25 + 1.2;

      if (current >= 100) {
        current = 100;
        setDisplayProgress(100);
        clearInterval(interval);

        // Initiate smooth fade out
        fadeTimerRef.current = setTimeout(() => {
          setIsFading(true);
          timerRef.current = setTimeout(() => {
            setIsComplete(true);
          }, 700);
        }, 250);
        return;
      }

      setDisplayProgress(Math.floor(current));
    }, 25);

    // Guaranteed failsafe: ensure site is revealed even under extreme slow-network conditions
    const failsafe = setTimeout(() => {
      clearInterval(interval);
      setDisplayProgress(100);
      setIsFading(true);
      timerRef.current = setTimeout(() => {
        setIsComplete(true);
      }, 500);
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [assetProgress]);

  if (!mounted || isComplete) return null;

  return (
    <div
      suppressHydrationWarning
      aria-hidden={isFading}
      className={`fixed inset-0 z-[100] bg-[#FAF7F2] flex flex-col items-center justify-center transition-opacity duration-700 ease-out select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div suppressHydrationWarning className="text-center px-6 max-w-md w-full">
        {/* Monogram emblem */}
        <div
          suppressHydrationWarning
          className="w-14 h-14 mx-auto mb-6 rounded-full border border-[var(--color-gold)]/50 bg-white flex items-center justify-center text-[var(--color-gold)] font-serif text-xl tracking-widest shadow-md"
        >
          ✦
        </div>

        <h1 className="text-3xl md:text-5xl font-serif text-[#1A0F0A] tracking-[0.25em] mb-2 font-semibold">
          NOIRÉ CACAO
        </h1>

        <p className="text-xs uppercase tracking-[0.3em] text-[#5C4C42] font-semibold mb-8">
          Haute Chocolaterie Parisienne
        </p>

        {/* Progress Bar Container */}
        <div className="w-48 md:w-64 h-[2px] bg-[var(--color-gold)]/20 mx-auto relative overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-caramel)] via-[var(--color-gold)] to-[var(--color-cocoa)] transition-all duration-150 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Numeric Counter */}
        <div className="mt-4 font-mono text-xs text-[var(--color-gold)] font-semibold tracking-widest">
          {displayProgress.toString().padStart(2, '0')}%
        </div>
      </div>
    </div>
  );
}
