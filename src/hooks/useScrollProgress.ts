'use client';

import { useEffect, useState, RefObject } from 'react';

export function useScrollProgress(ref: RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = elementTop - windowHeight;
      const end = elementTop + elementHeight;
      const distance = end - start;

      const scrolled = scrollY - start;
      const progress = Math.max(0, Math.min(1, scrolled / distance));

      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}
