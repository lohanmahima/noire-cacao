'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Experience initialization handled gracefully:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-[var(--color-espresso)] to-[var(--color-cocoa)] border border-[var(--color-gold)]/20">
          <div className="w-12 h-12 mb-4 rounded-full border border-[var(--color-gold)]/40 flex items-center justify-center text-[var(--color-gold)] font-serif text-xl">
            ✦
          </div>
          <h4 className="text-lg font-serif text-[var(--color-gold)] mb-2">
            NOIRÉ CACAO Pure Formulation
          </h4>
          <p className="text-xs text-[var(--color-text-muted)] max-w-sm leading-relaxed">
            Interactive 3D acceleration is resting. Six pure ingredients remain at the heart of our craft.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
