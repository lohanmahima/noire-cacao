'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { assetPath } from '@/utils/assetPath';

const TastingCanvas = dynamic(() => import('../three/TastingCanvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F4EFE6] text-center">
      <div className="w-8 h-8 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-xs uppercase tracking-widest text-[#8C6228] font-mono font-bold">
        Calibrating Sensory Chamber...
      </span>
    </div>
  ),
});

// Synthesizes a crisp, high-frequency acoustic snap + resonant wooden body thud
function playAcousticSnapSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // High frequency crystal snap transient
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.08);

    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.65, ctx.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);

    // Resonant tempered chocolate body thud
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160, ctx.currentTime);
    subOsc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);

    subGain.gain.setValueAtTime(0.35, ctx.currentTime);
    subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    subOsc.start();
    subOsc.stop(ctx.currentTime + 0.13);
  } catch {
    // Graceful fallback if blocked by browser policy
  }
}

export default function TastingSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [snapProgress, setSnapProgress] = useState(0.45);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  const handleSnapTrigger = useCallback((progress: number) => {
    setSnapProgress(progress);
    if (progress > 0.6) {
      playAcousticSnapSound();
    }
  }, []);

  const notes = [
    {
      number: '01',
      title: 'The Snap',
      subtitle: 'Acoustic Tempering',
      description:
        'The first encounter. A clean, resonant acoustic break confirms correct Type-V polymorph crystal formation and proper cellar aging. When fractured, cacao beans and crystalline shards burst forth.',
      interactionLabel: 'Break Tension',
    },
    {
      number: '02',
      title: 'The Melt',
      subtitle: 'Liquid Velvet Phase',
      description:
        'Body heat triggers the transformation at exactly 34°C. Pure unadulterated cacao butter releases aromatic volatile compounds in a slow, glossy ribbon cascade.',
      interactionLabel: 'Molten Cascade',
    },
    {
      number: '03',
      title: 'Development',
      subtitle: 'Chromatic Aromatics',
      description:
        'Terroir unfolds in sequential waves: tart blackberry, wild Ecuadorian tobacco, roasted hazelnut butter, and warm Tahitian spice.',
      interactionLabel: 'Harmonic Notes',
    },
    {
      number: '04',
      title: 'The Finish',
      subtitle: 'Enduring Reverberation',
      description:
        'The longest chapter. Long after the final particle melts, a clean, dry, mineral persistence remains for upwards of ten minutes.',
      interactionLabel: 'Golden Persistence',
    },
  ];

  return (
    <section id="tasting" className="py-32 px-6 bg-[#F4EFE6]/88 backdrop-blur-[1px] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6228] mb-3 font-bold font-mono">
            Sensory Ritual & Acoustic Physics
          </div>
          <h2 className="font-serif text-[#1A0F0A] mb-6 text-4xl md:text-5xl font-semibold">
            The Tasting Experience
          </h2>
          <p className="text-lg text-[#2D2018] max-w-2xl mx-auto font-normal leading-relaxed">
            Tasting chocolate is an intentional dialogue between crystalline physics and the human palate.
          </p>
        </div>

        {/* 2-Column Sensory Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-[#C9A84C]/40 p-6 md:p-10 shadow-lg">
          {/* Left Column: Interactive Stages */}
          <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              {notes.map((note, index) => {
                const isActive = activeStep === index;
                return (
                  <div
                    key={note.number}
                    onClick={() => setActiveStep(index)}
                    className={`p-5 md:p-6 border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-2 border-[#C9A84C] bg-[#FAF7F2] shadow-sm'
                        : 'border border-[#C9A84C]/25 hover:border-[#C9A84C]/60 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6228] font-mono font-bold">
                        Act {note.number} • {note.subtitle}
                      </span>
                      {isActive && (
                        <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 bg-[#1A0F0A] text-white font-mono font-semibold">
                          Active Stage
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-2xl font-serif mb-2 font-semibold transition-colors ${
                        isActive ? 'text-[#1A0F0A]' : 'text-[#5C4C42]'
                      }`}
                    >
                      {note.title}
                    </h3>

                    <p className="text-sm text-[#2D2018] leading-relaxed font-normal">
                      {note.description}
                    </p>

                    {/* Interactive Controls for Step 1 (The Snap) */}
                    {isActive && index === 0 && (
                      <div className="mt-4 pt-4 border-t border-[#C9A84C]/30 space-y-3">
                        <div className="flex items-center justify-between text-xs text-[#1A0F0A] font-mono font-semibold">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6228]" />
                            Fracture Tension & Dynamics:
                          </span>
                          <span className="text-[#8C6228] font-bold">
                            {Math.round(snapProgress * 100)}%
                          </span>
                        </div>

                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={snapProgress}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            handleSnapTrigger(val);
                          }}
                          className="w-full accent-[#8C6228] cursor-pointer h-2 bg-[#E6DAC9] rounded"
                        />

                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSnapTrigger(0);
                            }}
                            className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-mono border transition-all ${
                              snapProgress < 0.1
                                ? 'bg-[#1A0F0A] text-white border-[#1A0F0A]'
                                : 'border-[#C9A84C]/60 text-[#1A0F0A] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            Solid Bar
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSnapTrigger(0.45);
                            }}
                            className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-mono border transition-all ${
                              snapProgress >= 0.35 && snapProgress <= 0.6
                                ? 'bg-[#1A0F0A] text-white border-[#1A0F0A]'
                                : 'border-[#C9A84C]/60 text-[#1A0F0A] hover:bg-[#FAF7F2]'
                            }`}
                          >
                            Tension (45%)
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSnapTrigger(0.92);
                            }}
                            className="px-3.5 py-1.5 text-[11px] uppercase tracking-wider font-mono font-bold bg-[#8C6228] hover:bg-[#1A0F0A] text-white transition-all shadow-sm flex items-center gap-1.5"
                          >
                            <span>Snap Bar ✦</span>
                            <span className="text-[10px] opacity-80">(Sound & Flying Beans)</span>
                          </button>
                        </div>

                        {/* Dynamics Status Badge */}
                        <div className="p-2.5 bg-[#FAF7F2] border border-[#C9A84C]/30 text-[11px] font-mono text-[#2D2018] flex items-center justify-between">
                          <span>
                            {snapProgress > 0.4 ? (
                              <strong className="text-[#8C6228]">✦ 18 Flying Cacao Beans & 28 Shards in Orbit</strong>
                            ) : (
                              <span>Couverture In Equilibrium (0 Fractures)</span>
                            )}
                          </span>
                          <span className="text-[#8C6228] font-bold">1.4 kHz Acoustic Peak</span>
                        </div>
                      </div>
                    )}

                    {/* Step 2 note about 34°C molten chocolate */}
                    {isActive && index === 1 && (
                      <div className="mt-4 pt-4 border-t border-[#C9A84C]/30 text-xs text-[#2D2018] font-mono leading-relaxed bg-[#FAF7F2] p-3 border">
                        <strong className="text-[#8C6228]">✦ Viscosity Profile:</strong> Molten chocolate ribbons pool at 34°C. Watch the continuous liquid cascade render in real-time 3D or inspect the atelier tempering bowl in the studio photo.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Studio Photo Callout Bar */}
            <div className="p-3.5 bg-[#FAF7F2] border border-[#C9A84C]/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded border border-[#C9A84C]/60 overflow-hidden flex-shrink-0">
                  <Image
                    src={assetPath('/images/tasting/acoustic-snap-cacao.jpg')}
                    alt="Artisan snapped chocolate bar and cacao beans"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#1A0F0A]">
                    Atelier Photo Specimen
                  </div>
                  <div className="text-[11px] text-[#5C4C42]">
                    Fractured bar, molten bowl & roasted cacao beans
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewMode(viewMode === '3d' ? 'photo' : '3d')}
                className="px-3 py-1.5 text-[11px] uppercase tracking-wider font-mono font-bold border border-[#8C6228] text-[#8C6228] hover:bg-[#8C6228] hover:text-white transition-all whitespace-nowrap"
              >
                {viewMode === '3d' ? 'View Photo ↗' : 'View 3D ↗'}
              </button>
            </div>
          </div>

          {/* Right Column: 3D Visualization / Photo Switcher */}
          <div className="lg:col-span-6 h-[460px] md:h-[580px] border border-[#C9A84C]/40 bg-gradient-to-b from-[#F2EAE0] via-[#FAF7F2] to-[#ECE3D5] relative overflow-hidden flex flex-col shadow-inner">
            {/* Top Bar with Stage Title & Mode Toggle */}
            <div className="p-4 border-b border-[#C9A84C]/30 bg-white/90 backdrop-blur-sm z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8C6228] animate-ping" />
                <span className="text-xs uppercase tracking-widest text-[#1A0F0A] font-mono font-bold">
                  Act {notes[activeStep].number} • {notes[activeStep].subtitle}
                </span>
              </div>

              {/* View Switcher Toggle */}
              <div className="flex border border-[#C9A84C]/50 rounded-sm overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider font-mono font-bold transition-all ${
                    viewMode === '3d'
                      ? 'bg-[#1A0F0A] text-white'
                      : 'text-[#2D2018] hover:bg-[#FAF7F2]'
                  }`}
                >
                  3D Break & Beans ✦
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('photo')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider font-mono font-bold transition-all ${
                    viewMode === 'photo'
                      ? 'bg-[#1A0F0A] text-white'
                      : 'text-[#2D2018] hover:bg-[#FAF7F2]'
                  }`}
                >
                  Atelier Photo
                </button>
              </div>
            </div>

            {/* Display Area: 3D Canvas OR High-Res Studio Photo */}
            <div className="w-full flex-1 relative overflow-hidden">
              {viewMode === '3d' ? (
                <TastingCanvas
                  activeStep={activeStep}
                  snapProgress={snapProgress}
                />
              ) : (
                <div className="relative w-full h-full bg-[#1A0F0A] flex items-center justify-center">
                  <Image
                    src={assetPath('/images/tasting/acoustic-snap-cacao.jpg')}
                    alt="Acoustic chocolate fracture with scattered cacao beans and molten chocolate bowl"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                  {/* Photo Overlay Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-[#C9A84C]/40">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A84C] font-mono font-bold">
                      Atelier Study • Couverture Fracture & Raw Cacao
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md p-4 border border-[#C9A84C]/40 flex flex-col md:flex-row md:items-center justify-between gap-3 text-white">
                    <div>
                      <div className="font-serif text-lg font-semibold text-[#F5EDD6]">
                        Crystalline Fracture & Roasted Beans
                      </div>
                      <p className="text-xs text-white/80 font-normal leading-relaxed">
                        Photograph captures clean Type-V crystal breakage alongside whole roasted Criollo cacao beans and warm tempering bowl.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode('3d')}
                      className="px-3.5 py-1.5 bg-[#C9A84C] text-[#1A0F0A] hover:bg-white text-[11px] uppercase font-mono font-bold tracking-wider whitespace-nowrap self-start md:self-auto transition-all"
                    >
                      Inspect in 3D ✦
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls Footnote */}
            <div className="p-2.5 border-t border-[#C9A84C]/30 text-center text-[11px] font-mono uppercase tracking-widest text-[#5C4C42] bg-white/90">
              {viewMode === '3d' ? (
                <span>Drag to rotate in 3D • Adjust tension slider to launch flying cacao beans</span>
              ) : (
                <span>Atelier reference capture • High resolution culinary documentation</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}