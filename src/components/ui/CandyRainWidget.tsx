'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, X, Volume2, VolumeX, Play, Pause } from 'lucide-react';

type RainMode = 'gems' | 'cacao' | 'molten';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  color: string;
  highlightColor: string;
  type: RainMode;
  popped: boolean;
  opacity: number;
}

const GEMS_COLORS = [
  { base: '#E91E63', highlight: '#F48FB1' }, // Magenta / Pink
  { base: '#FFEB3B', highlight: '#FFF59D' }, // Cadbury Yellow
  { base: '#00BCD4', highlight: '#80DEEA' }, // Electric Cyan
  { base: '#4CAF50', highlight: '#A5D6A7' }, // Candy Green
  { base: '#FF9800', highlight: '#FFCC80' }, // Tangy Orange
  { base: '#9C27B0', highlight: '#CE93D8' }, // Gems Purple
  { base: '#F44336', highlight: '#EF9A9A' }, // Crimson Red
  { base: '#3F51B5', highlight: '#9FA8DA' }, // Royal Blue
  { base: '#795548', highlight: '#BCAAA4' }, // Milk Choco
];

const CACAO_COLORS = [
  { base: '#3B2012', highlight: '#5A321C' }, // Roasted Criollo Bean
  { base: '#2A1308', highlight: '#422010' }, // Dark Cocoa
  { base: '#C9A84C', highlight: '#F5EDD6' }, // 23k Edible Gold Leaf
  { base: '#E5C158', highlight: '#FFFBEA' }, // Shimmering Gold
  { base: '#8C6228', highlight: '#B88E38' }, // Amber Nibs
];

const MOLTEN_COLORS = [
  { base: '#1A0A05', highlight: '#3D1A0E' }, // Obsidian Couverture
  { base: '#2D160A', highlight: '#522A16' }, // Velvety Dark
  { base: '#8B4513', highlight: '#C67A3B' }, // Warm Salted Caramel
];

export default function CandyRainWidget() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<RainMode>('gems');
  const [density, setDensity] = useState<'gentle' | 'normal' | 'shower'>('normal');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Play micro pop sound via Web Audio API
  const playPopSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const startFreq = mode === 'gems' ? 800 + Math.random() * 400 : 350 + Math.random() * 200;
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // Audio fallback
    }
  }, [soundEnabled, mode]);

  // Spawn new particles
  const spawnParticle = useCallback((w: number): Particle => {
    let colors = GEMS_COLORS;
    if (mode === 'cacao') colors = CACAO_COLORS;
    if (mode === 'molten') colors = MOLTEN_COLORS;

    const chosen = colors[Math.floor(Math.random() * colors.length)];
    const size = mode === 'gems' ? Math.random() * 10 + 14 : mode === 'cacao' ? Math.random() * 9 + 12 : Math.random() * 8 + 12;

    return {
      id: Math.random(),
      x: Math.random() * w,
      y: -35,
      size,
      vx: (Math.random() - 0.5) * 0.6,
      vy: Math.random() * 0.7 + 0.65, // Gentle, unhurried, slow floating descent
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.018, // Slow graceful tumbling
      color: chosen.base,
      highlightColor: chosen.highlight,
      type: mode,
      popped: false,
      opacity: 1,
    };
  }, [mode]);

  // Canvas Animation Loop
  useEffect(() => {
    if (!isActive) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      particlesRef.current = [];
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const maxParticles = density === 'gentle' ? 6 : density === 'normal' ? 12 : 20;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Replenish particles sparingly (less quantity, spaced out)
      if (particlesRef.current.length < maxParticles && Math.random() > 0.82) {
        particlesRef.current.push(spawnParticle(width));
      }

      // Update & Draw
      particlesRef.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Draw Cadbury Gems / Candy
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === 'gems') {
          // Candy drop shadow
          ctx.beginPath();
          ctx.ellipse(2, 4, p.size * 0.95, p.size * 0.75, 0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.fill();

          // Smooth outer candy button
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // 3D Glossy candy highlight (specular reflection)
          ctx.beginPath();
          ctx.ellipse(-p.size * 0.32, -p.size * 0.25, p.size * 0.45, p.size * 0.22, -0.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
          ctx.fill();

          // Outer sugar glaze rim
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = p.highlightColor;
          ctx.stroke();
        } else if (p.type === 'cacao') {
          // Roasted Cacao Bean & Gold Flake
          if (p.color === '#C9A84C' || p.color === '#E5C158') {
            // Gold Leaf flake (angular shard)
            ctx.beginPath();
            ctx.moveTo(-p.size * 0.8, -p.size * 0.4);
            ctx.lineTo(p.size * 0.6, -p.size * 0.7);
            ctx.lineTo(p.size * 0.9, p.size * 0.5);
            ctx.lineTo(-p.size * 0.3, p.size * 0.8);
            ctx.closePath();
            ctx.fillStyle = p.color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#FFFBEA';
            ctx.stroke();
          } else {
            // Whole oblong cacao bean
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.3, p.size * 0.7, 0, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Bean texture rib
            ctx.beginPath();
            ctx.moveTo(-p.size * 0.9, 0);
            ctx.quadraticCurveTo(0, -p.size * 0.3, p.size * 0.9, 0);
            ctx.lineWidth = 1.4;
            ctx.strokeStyle = p.highlightColor;
            ctx.stroke();
          }
        } else {
          // Molten Chocolate Drop (teardrop)
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.3);
          ctx.quadraticCurveTo(p.size * 0.85, -p.size * 0.2, p.size * 0.85, p.size * 0.6);
          ctx.arc(0, p.size * 0.6, p.size * 0.85, 0, Math.PI);
          ctx.quadraticCurveTo(-p.size * 0.85, -p.size * 0.2, 0, -p.size * 1.3);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Glossy liquid curve
          ctx.beginPath();
          ctx.ellipse(-p.size * 0.25, p.size * 0.3, p.size * 0.3, p.size * 0.15, -0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.fill();
        }

        ctx.restore();

        // Remove out-of-bounds particles
        if (p.y > height + 40 || p.popped) {
          particlesRef.current.splice(idx, 1);
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isActive, density, mode, spawnParticle]);

  // Click on canvas to pop candies!
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isActive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    particlesRef.current.forEach((p) => {
      const dist = Math.hypot(p.x - clickX, p.y - clickY);
      if (dist < p.size * 2.2) {
        p.popped = true;
        playPopSound();
      }
    });
  };

  return (
    <>
      {/* Interactive Rain Canvas Overlay */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className={`fixed inset-0 z-40 transition-opacity duration-500 ${
          isActive ? 'pointer-events-auto opacity-100 cursor-pointer' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Floating Side Button & Options Drawer */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Expanded Options Card */}
        {isOpen && (
          <div className="mb-3 w-80 bg-white/95 backdrop-blur-md border border-[#C9A84C]/50 shadow-2xl p-5 text-[#1A0F0A] animate-in fade-in slide-in-from-bottom-3 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#C9A84C]/30 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍬</span>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#1A0F0A]">
                    Choco Magic & Candy Rain
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#8C6228]">
                    Interactive Delight
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#FAF7F2] text-[#5C4C42] transition-colors"
                aria-label="Close panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Big ON / OFF Toggle */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  const nextState = !isActive;
                  setIsActive(nextState);
                  if (nextState) playPopSound();
                }}
                className={`w-full py-2.5 px-4 font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isActive
                    ? 'bg-[#1A0F0A] text-white hover:bg-[#8C6228]'
                    : 'bg-[#C9A84C] text-[#1A0F0A] hover:bg-[#1A0F0A] hover:text-white'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause size={14} /> Stop Rain (Active)
                  </>
                ) : (
                  <>
                    <Play size={14} /> Start Candy Rain ✦
                  </>
                )}
              </button>
            </div>

            {/* Rain Flavor Modes */}
            <div className="space-y-2 mb-4">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C6228] font-bold block">
                Rain Flavors:
              </label>

              <div className="grid grid-cols-1 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setMode('gems');
                    if (!isActive) setIsActive(true);
                    playPopSound();
                  }}
                  className={`p-2.5 text-left border text-xs font-serif font-medium transition-all flex items-center justify-between ${
                    mode === 'gems'
                      ? 'border-[#C9A84C] bg-[#FAF7F2] shadow-xs ring-1 ring-[#C9A84C]'
                      : 'border-[#C9A84C]/30 hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🍬</span> Rainbow Gems (Gems Minis)
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E91E63]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFEB3B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00BCD4]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('cacao');
                    if (!isActive) setIsActive(true);
                    playPopSound();
                  }}
                  className={`p-2.5 text-left border text-xs font-serif font-medium transition-all flex items-center justify-between ${
                    mode === 'cacao'
                      ? 'border-[#C9A84C] bg-[#FAF7F2] shadow-xs ring-1 ring-[#C9A84C]'
                      : 'border-[#C9A84C]/30 hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>✦</span> Cacao Beans & 23k Gold
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B2012]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C9A84C]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('molten');
                    if (!isActive) setIsActive(true);
                    playPopSound();
                  }}
                  className={`p-2.5 text-left border text-xs font-serif font-medium transition-all flex items-center justify-between ${
                    mode === 'molten'
                      ? 'border-[#C9A84C] bg-[#FAF7F2] shadow-xs ring-1 ring-[#C9A84C]'
                      : 'border-[#C9A84C]/30 hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>🍫</span> Molten Truffle Drops
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1A0A05]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8B4513]" />
                  </div>
                </button>
              </div>
            </div>

            {/* Density & Sound Options */}
            <div className="pt-3 border-t border-[#C9A84C]/30 flex items-center justify-between">
              {/* Density Pills */}
              <div className="flex items-center gap-1">
                {(['gentle', 'normal', 'shower'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDensity(d)}
                    className={`px-2 py-1 text-[10px] uppercase font-mono tracking-wider transition-all border ${
                      density === d
                        ? 'bg-[#1A0F0A] text-white border-[#1A0F0A] font-bold'
                        : 'border-[#C9A84C]/40 text-[#2D2018] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    {d === 'gentle' ? 'Light' : d === 'normal' ? 'Mid' : 'Shower'}
                  </button>
                ))}
              </div>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 border transition-all ${
                  soundEnabled
                    ? 'border-[#C9A84C] text-[#8C6228] bg-[#FAF7F2]'
                    : 'border-gray-300 text-gray-400'
                }`}
                title={soundEnabled ? 'Pop sound active' : 'Sound muted'}
              >
                {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
            </div>

            {isActive && (
              <p className="mt-3 text-[10px] text-center font-mono text-[#8C6228]">
                ✦ Click on any falling candy on screen to pop it!
              </p>
            )}
          </div>
        )}

        {/* Floating Trigger Pill */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border shadow-xl transition-all duration-300 ${
            isActive
              ? 'bg-[#1A0F0A] text-[#C9A84C] border-[#C9A84C] scale-105 ring-2 ring-[#C9A84C]/30'
              : 'bg-white/95 text-[#1A0F0A] border-[#C9A84C]/60 hover:border-[#C9A84C] hover:bg-[#FAF7F2]'
          }`}
          aria-label="Toggle Candy Rain Controls"
        >
          <span className="text-base animate-bounce">🍬</span>
          <span className="font-mono text-xs uppercase tracking-wider font-bold">
            {isActive ? 'Gems Rain (ON)' : 'Candy Rain ✦'}
          </span>
          <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
        </button>
      </div>
    </>
  );
}