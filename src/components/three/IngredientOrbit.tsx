'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Ingredient } from '@/types/product';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import { usePerformanceTier } from '@/hooks/usePerformanceTier';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { assetPath } from '@/utils/assetPath';

interface IngredientOrbitProps {
  ingredients?: Ingredient[];
  selectedIngredient?: Ingredient | null;
  onSelectIngredient?: (ingredient: Ingredient | null) => void;
}

export default function IngredientOrbit({
  selectedIngredient,
  onSelectIngredient,
}: IngredientOrbitProps) {
  const tier = usePerformanceTier();
  const dpr: [number, number] = tier === 'low' ? [1, 1.25] : [1, 2];

  const [autoRotate, setAutoRotate] = useState(true);
  const [controlsKey, setControlsKey] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<{ id: string; name: string } | null>(null);

  const resetView = () => {
    setControlsKey((k) => k + 1);
  };

  return (
    <WebGLErrorBoundary>
      <div className="w-full h-full relative select-none">
        {/* Top-Right Orbit Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 border border-[#C9A84C]/50 shadow-md">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1 text-[11px] uppercase font-mono font-bold tracking-wider flex items-center gap-1.5 transition-all ${
              autoRotate
                ? 'bg-[#1A0F0A] text-white'
                : 'bg-[#FAF7F2] text-[#8C6228] hover:bg-[#1A0F0A] hover:text-white'
            }`}
            title={autoRotate ? 'Pause 3D Orbit' : 'Resume 3D Orbit'}
          >
            {autoRotate ? <Pause size={12} /> : <Play size={12} />}
            <span>{autoRotate ? 'Orbiting' : 'Paused'}</span>
          </button>

          <button
            type="button"
            onClick={resetView}
            className="p-1 text-[#5C4C42] hover:text-[#1A0F0A] hover:bg-[#FAF7F2] transition-colors"
            title="Reset 3D camera position"
          >
            <RefreshCw size={12} />
          </button>
        </div>

        {/* Floating Active Inspection Badge (HTML overlay, outside Canvas to prevent React 19 unmount error) */}
        {(hoveredItem || selectedIngredient) && (
          <div className="absolute top-4 left-6 z-20 flex items-center gap-2 bg-[#1A0F0A]/95 text-[#C9A84C] border border-[#C9A84C]/70 px-3.5 py-1.5 shadow-2xl backdrop-blur-md animate-in fade-in duration-150">
            <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-widest font-bold">
              {hoveredItem ? hoveredItem.name : selectedIngredient?.name}
            </span>
          </div>
        )}

        {/* 3D WebGL Canvas */}
        <div className="w-full h-full cursor-grab active:cursor-grabbing">
          <Canvas
            dpr={dpr}
            camera={{ position: [0, 2.4, 4.2], fov: 46 }}
            shadows
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
          >
            {/* Studio Lighting */}
            <ambientLight intensity={0.92} color="#FFF8EE" />
            <directionalLight
              position={[5, 8, 5]}
              intensity={2.8}
              color="#FFF5E0"
              castShadow
            />
            <pointLight position={[-4, 3, -3]} intensity={1.8} color="#C9A84C" />
            <pointLight position={[3, -2, 3]} intensity={1.2} color="#A0522D" />
            <hemisphereLight color="#F5EDD6" groundColor="#1A0F0A" intensity={0.6} />

            <CelestialRealOrbitScene
              autoRotate={autoRotate}
              selectedIngredient={selectedIngredient}
              onSelectIngredient={onSelectIngredient}
              onHoverItem={setHoveredItem}
            />

            <OrbitControls
              key={controlsKey}
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 3.6}
              rotateSpeed={0.6}
              dampingFactor={0.06}
            />
          </Canvas>
        </div>

        {/* Bottom Status & Drag Guidance */}
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-6 pointer-events-none text-[11px] tracking-widest uppercase text-[#8C6228] font-mono font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6228] animate-ping" />
            Drag to rotate 3D celestial orbit • Real ingredients in motion
          </span>
          <span className="text-[#1A0F0A]">
            ✦ 100% Native WebGL Acceleration
          </span>
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}

function CelestialRealOrbitScene({
  autoRotate,
  selectedIngredient,
  onSelectIngredient,
  onHoverItem,
}: {
  autoRotate: boolean;
  selectedIngredient?: Ingredient | null;
  onSelectIngredient?: (ingredient: Ingredient | null) => void;
  onHoverItem: (item: { id: string; name: string } | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const centerDiamondRef = useRef<THREE.Group>(null);

  // 6 Orbiting ingredients mapping
  const orbitItems = useMemo(
    () => [
      {
        id: 'cacao-beans',
        name: 'Single-Origin Cacao Beans',
        radius: 2.15,
        angle: 0.1,
      },
      {
        id: 'cacao-butter',
        name: 'Pure Cacao Butter',
        radius: 2.15,
        angle: (Math.PI * 2) / 6 + 0.1,
      },
      {
        id: 'vanilla',
        name: 'Tahitian Vanilla',
        radius: 2.15,
        angle: ((Math.PI * 2) * 2) / 6 + 0.1,
      },
      {
        id: 'sea-salt',
        name: 'Fleur de Sel',
        radius: 2.15,
        angle: ((Math.PI * 2) * 3) / 6 + 0.1,
      },
      {
        id: 'hazelnuts',
        name: 'Piedmont Hazelnuts',
        radius: 2.15,
        angle: ((Math.PI * 2) * 4) / 6 + 0.1,
      },
      {
        id: 'gold',
        name: 'Edible Gold Leaf',
        radius: 2.15,
        angle: ((Math.PI * 2) * 5) / 6 + 0.1,
      },
    ],
    []
  );

  // Animation Loop: Unhurried, slow celestial revolution
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (autoRotate && groupRef.current) {
      const speed = selectedIngredient ? 0.05 : 0.11;
      groupRef.current.rotation.y += delta * speed;
    }
    if (centerDiamondRef.current) {
      centerDiamondRef.current.rotation.y += delta * 0.22;
      centerDiamondRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* 
        Dual Concentric Brass Orbit Rings (Directly modeled from the user's generated photo)
      */}
      {/* Inner Brass Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <ringGeometry args={[1.88, 1.91, 96]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.92}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Brass Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
        <ringGeometry args={[2.32, 2.35, 96]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.92}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Faint Concentric Alignment Circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.081, 0]}>
        <ringGeometry args={[2.14, 2.15, 64]} />
        <meshBasicMaterial color="#C9A84C" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* 
        Central Faceted Dark Chocolate Diamond
      */}
      <group ref={centerDiamondRef} position={[0, 0.12, 0]}>
        <CentralDiamondToken />
      </group>

      {/* 
        Orbiting Group: The 6 Real Ingredient Image Tokens
        Rendered as pure native 3D textured circular meshes!
      */}
      <group ref={groupRef}>
        {orbitItems.map((item, index) => {
          const isSelected = selectedIngredient?.id === item.id;
          return (
            <OrbitingRealItemNode
              key={item.id}
              id={item.id}
              name={item.name}
              radius={item.radius}
              angle={item.angle}
              indexOffset={index}
              isSelected={isSelected}
              onHover={onHoverItem}
              onSelect={() => {
                onSelectIngredient?.({
                  id: item.id,
                  name: item.name,
                  description: '',
                  origin: '',
                  characteristics: [],
                  meshType: 'sphere',
                  image: assetPath(`/images/lab/tokens/${item.id}.png`),
                });
              }}
            />
          );
        })}
      </group>
    </group>
  );
}

// Center Diamond Token in Native 3D WebGL
function CentralDiamondToken() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(assetPath('/images/lab/tokens/diamond.png'), (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    });
  }, []);

  return (
    <group>
      {/* 3D Faceted Diamond Mesh Core */}
      <mesh castShadow position={[0, 0, 0]}>
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color="#1A0A05"
          metalness={0.3}
          roughness={0.22}
        />
      </mesh>

      {/* Gold Outline Wireframe */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.33, 0]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.92}
          roughness={0.15}
          wireframe
        />
      </mesh>

      {/* Real Diamond Image Medallion */}
      {texture && (
        <group position={[0, 0.38, 0]}>
          <mesh>
            <circleGeometry args={[0.26, 32]} />
            <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, -0.005]}>
            <ringGeometry args={[0.26, 0.28, 32]} />
            <meshStandardMaterial color="#C9A84C" metalness={0.92} roughness={0.2} side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Each Orbiting Ingredient Token in Pure Native 3D WebGL (Zero DOM overhead, Zero race conditions)
function OrbitingRealItemNode({
  id,
  name,
  radius,
  angle,
  indexOffset,
  isSelected,
  onHover,
  onSelect,
}: {
  id: string;
  name: string;
  radius: number;
  angle: number;
  indexOffset: number;
  isSelected: boolean;
  onHover: (item: { id: string; name: string } | null) => void;
  onSelect: () => void;
}) {
  const nodeRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Load the circular real image token cropped from the user's generated image
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(assetPath(`/images/lab/tokens/${id}.png`), (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      setTexture(tex);
    });
  }, [id]);

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  // Floating bobbing, camera facing, and scale interpolation
  useFrame((state) => {
    if (nodeRef.current) {
      const t = state.clock.elapsedTime;
      nodeRef.current.position.y =
        Math.sin(t * 0.8 + indexOffset) * 0.08 + (isSelected ? 0.22 : 0);

      // Make the token billboard gently face the camera
      nodeRef.current.quaternion.copy(state.camera.quaternion);

      const targetScale = isSelected ? 1.35 : hovered ? 1.2 : 1.0;
      nodeRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.14
      );
    }
  });

  return (
    <group
      position={[x, 0, z]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover({ id, name });
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
        document.body.style.cursor = 'auto';
      }}
    >
      <group ref={nodeRef}>
        {/* Real Ingredient Circular Medallion */}
        {texture && (
          <mesh castShadow receiveShadow>
            <circleGeometry args={[0.26, 32]} />
            <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* 3D Antique Gold Bezel Rim */}
        <mesh position={[0, 0, -0.005]}>
          <ringGeometry args={[0.26, 0.285, 32]} />
          <meshStandardMaterial
            color="#C9A84C"
            metalness={0.92}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Golden Selection Glow Ring */}
        {isSelected && (
          <mesh position={[0, 0, -0.01]}>
            <ringGeometry args={[0.29, 0.34, 32]} />
            <meshBasicMaterial color="#C9A84C" side={THREE.DoubleSide} />
          </mesh>
        )}
      </group>
    </group>
  );
}
