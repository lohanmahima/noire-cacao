'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import ChocolateBreak from './ChocolateBreak';
import MoltenChocolate from './MoltenChocolate';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

interface TastingCanvasProps {
  activeStep: number; // 0: Snap, 1: Texture, 2: Development, 3: Finish
  snapProgress: number; // 0 to 1 for Snap mode
}

function DevelopmentScene() {
  const groupRef = useRef<THREE.Group>(null);
  const notesCount = 18;

  const notes = useMemo(() => {
    const colors = ['#C9A84C', '#8B2500', '#4A0E17', '#D4AF37', '#5C2E2E'];
    return Array.from({ length: notesCount }, (_, i) => ({
      position: [
        Math.cos((i / notesCount) * Math.PI * 2) * 1.6,
        (Math.random() - 0.5) * 1.2,
        Math.sin((i / notesCount) * Math.PI * 2) * 1.6,
      ] as [number, number, number],
      color: colors[i % colors.length],
      scale: Math.random() * 0.08 + 0.06,
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Aromatics Orb */}
      <mesh>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#1C0D06"
          roughness={0.25}
          metalness={0.4}
        />
      </mesh>
      {/* Orbiting flavor notes */}
      {notes.map((note, idx) => (
        <mesh key={idx} position={note.position}>
          <octahedronGeometry args={[note.scale, 0]} />
          <meshStandardMaterial
            color={note.color}
            metalness={0.8}
            roughness={0.2}
            emissive={note.color}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

function FinishScene() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.6, 2.2, 0.2]} />
        <meshStandardMaterial
          color="#150803"
          roughness={0.18}
          metalness={0.25}
        />
      </mesh>
      {/* Floating gold leaf halo */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.9}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function TastingCanvas({
  activeStep,
  snapProgress,
}: TastingCanvasProps) {
  const tier = usePerformanceTier();
  const dpr: [number, number] = tier === 'low' ? [1, 1.25] : [1, 2];

  return (
    <WebGLErrorBoundary
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[var(--color-espresso)]/80 border border-[var(--color-gold)]/20">
          <div className="text-[var(--color-gold)] font-serif text-3xl mb-2">✦</div>
          <div className="text-sm font-serif text-[var(--color-gold)]">
            Sensory Chamber Active
          </div>
        </div>
      }
    >
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 4.2], fov: 46 }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.7} color="#FFF5EA" />
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.2}
            color="#FFF2D6"
            castShadow
          />
          <pointLight position={[-4, 2, -3]} intensity={1.6} color="#C9A84C" />
          <pointLight position={[0, -3, 3]} intensity={0.8} color="#A0522D" />

          {activeStep === 0 && <ChocolateBreak progress={snapProgress} />}
          {activeStep === 1 && <MoltenChocolate />}
          {activeStep === 2 && <DevelopmentScene />}
          {activeStep === 3 && <FinishScene />}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.8}
            dampingFactor={0.06}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
