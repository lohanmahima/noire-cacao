'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Product } from '@/types/product';
import WebGLErrorBoundary from './WebGLErrorBoundary';

interface ChocolateProductProps {
  product: Product;
}

export default function ChocolateProduct({ product }: ChocolateProductProps) {
  return (
    <WebGLErrorBoundary
      fallback={
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[var(--color-espresso)]/80">
          <div className="w-16 h-16 border border-[var(--color-gold)]/40 flex items-center justify-center font-serif text-2xl text-[var(--color-gold)] mb-3">
            NC
          </div>
          <span className="text-sm font-serif text-[var(--color-ivory)]">
            {product.name}
          </span>
        </div>
      }
    >
      <div className="w-full h-full relative select-none">
        <Canvas
          camera={{ position: [0, 0, 3.8], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.8} color="#FFF8EE" />
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.2}
            color="#FFF4DE"
            castShadow
          />
          <directionalLight
            position={[-4, -2, -3]}
            intensity={1.2}
            color="#C9A84C"
          />
          <pointLight position={[0, -2, 3]} intensity={0.9} color="#A0522D" />

          <ProductMesh product={product} />

          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.8}
            dampingFactor={0.05}
          />
        </Canvas>
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none text-[10px] uppercase tracking-widest text-[var(--color-gold)]/60 font-mono">
          ✦ Drag to rotate 360°
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}

function ProductMesh({ product }: { product: Product }) {
  const meshRef = useRef<THREE.Group>(null);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: product.color,
        roughness:
          product.type === 'white' ? 0.22 : product.type === 'praline' ? 0.28 : 0.35,
        metalness: product.type === 'praline' ? 0.22 : 0.08,
      }),
    [product.color, product.type]
  );

  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E5B842',
        roughness: 0.18,
        metalness: 0.9,
        emissive: '#B8860B',
        emissiveIntensity: 0.2,
      }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    }
  });

  if (product.type === 'dark') {
    // Obsidian 72% - Classic sculpted bar with beveled facets
    return (
      <group ref={meshRef} rotation={[0.2, 0.4, 0]}>
        <mesh material={material} castShadow receiveShadow>
          <boxGeometry args={[1.8, 2.4, 0.22]} />
        </mesh>
        {/* Beveled face segments */}
        {[-0.5, 0, 0.5].map((y, i) => (
          <mesh
            key={i}
            material={material}
            position={[0, y * 1.3, 0.12]}
            castShadow
          >
            <boxGeometry args={[1.5, 0.5, 0.03]} />
          </mesh>
        ))}
        {/* Monogram Seal */}
        <mesh material={goldMaterial} position={[0, 0, 0.14]}>
          <octahedronGeometry args={[0.12, 0]} />
        </mesh>
      </group>
    );
  }

  if (product.type === 'praline') {
    // Golden Praline - Hand-crafted bonbon with 23k gold crown
    return (
      <group ref={meshRef} rotation={[0.2, 0, 0]}>
        <mesh material={material} position={[0, -0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.7, 1.4]} />
        </mesh>
        <mesh material={material} position={[0, 0.45, 0]} castShadow>
          <sphereGeometry args={[0.55, 32, 32]} />
        </mesh>
        <mesh material={goldMaterial} position={[0, 0.95, 0]} castShadow>
          <dodecahedronGeometry args={[0.18, 0]} />
        </mesh>
      </group>
    );
  }

  if (product.type === 'caramel') {
    // Velvet Caramel - Layered cushion with warm caramel core
    return (
      <group ref={meshRef} rotation={[0.3, 0.4, 0]}>
        <mesh material={material} position={[0, -0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.6, 1.5]} />
        </mesh>
        <mesh
          material={material}
          position={[0, 0.35, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.42, 0.42, 0.8, 32]} />
        </mesh>
        <mesh
          material={goldMaterial}
          position={[0, 0.35, 0.42]}
          rotation={[0, 0, 0.4]}
        >
          <boxGeometry args={[0.12, 0.02, 0.12]} />
        </mesh>
      </group>
    );
  }

  // Ivory Silk - Ethereal white chocolate bar
  return (
    <group ref={meshRef} rotation={[0.2, -0.3, 0]}>
      <mesh material={material} castShadow receiveShadow>
        <boxGeometry args={[1.8, 2.4, 0.2]} />
      </mesh>
      <mesh material={material} position={[0, 0, 0.11]} castShadow>
        <boxGeometry args={[1.5, 2.1, 0.03]} />
      </mesh>
      <mesh material={goldMaterial} position={[0, 0, 0.13]}>
        <ringGeometry args={[0.2, 0.25, 32]} />
      </mesh>
    </group>
  );
}
