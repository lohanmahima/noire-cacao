'use client';

import { useEffect, useState } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('medium');

  useEffect(() => {
    const dpr = window.devicePixelRatio || 1;
    const cores = navigator.hardwareConcurrency || 2;

    // High: High DPR + many cores
    if (dpr >= 2 && cores >= 8) {
      setTier('high');
    }
    // Low: Low DPR or few cores
    else if (dpr < 1.5 || cores < 4) {
      setTier('low');
    }
    // Medium: everything else
    else {
      setTier('medium');
    }
  }, []);

  return tier;
}
