'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ArtisanPlate3D from './ArtisanPlate3D';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';

export default function ExperienceCanvas() {
  const tier = usePerformanceTier();
  const dpr: [number, number] = tier === 'low' ? [1, 1.25] : [1, 2];

  return (
    <WebGLErrorBoundary
      fallback={
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src="/images/hero-chocolate-bars.jpg"
            alt="Artisanal Chocolate Bars on Ceramic Plate"
            className="w-full h-full max-h-[500px] object-cover shadow-2xl border border-[var(--color-border)]"
          />
        </div>
      }
    >
      <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 3.0, 4.0], fov: 44 }}
          shadows
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          {/* Warm studio lighting showcasing the rich chocolate and ceramic textures */}
          <ambientLight intensity={1.2} color="#FFFBF5" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={2.8}
            color="#FFF5E0"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight
            position={[-5, 4, -4]}
            intensity={1.5}
            color="#D4AF37"
          />
          <pointLight position={[0, -2, 4]} intensity={0.9} color="#E8D5B5" />

          <ArtisanPlate3D />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            maxPolarAngle={Math.PI / 2.2}
            minPolarAngle={Math.PI / 4.2}
            dampingFactor={0.06}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
