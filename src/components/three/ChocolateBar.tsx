'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ChocolateBar() {
  const groupRef = useRef<THREE.Group>(null);

  // Memoized PBR Chocolate Material with luxurious satin sheen
  const chocolateMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1A0A05',
        roughness: 0.32,
        metalness: 0.12,
        envMapIntensity: 0.8,
      }),
    []
  );

  const goldLeafMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E5B842',
        roughness: 0.22,
        metalness: 0.9,
        emissive: '#B8860B',
        emissiveIntensity: 0.2,
      }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      // Gentle floating animation combined with subtle mouse tracking tilt
      const targetRotY = Math.sin(time * 0.3) * 0.15 + state.pointer.x * 0.35;
      const targetRotX = Math.cos(time * 0.25) * 0.08 - state.pointer.y * 0.25;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      );
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.08;
    }
  });

  // Create 4x8 grid of segments (32 breakable squares)
  const rows = 4;
  const cols = 8;
  const segmentWidth = 0.22;
  const segmentHeight = 0.22;
  const segmentDepth = 0.15;
  const gap = 0.025;

  const segments = useMemo(() => {
    const list: React.ReactElement[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = (col - cols / 2 + 0.5) * (segmentWidth + gap);
        const y = (row - rows / 2 + 0.5) * (segmentHeight + gap);
        const isCenterGold =
          (row === 1 || row === 2) && (col === 3 || col === 4);

        list.push(
          <group key={`${row}-${col}`} position={[x, y, 0]}>
            {/* Main base segment */}
            <mesh material={chocolateMaterial} castShadow receiveShadow>
              <boxGeometry args={[segmentWidth, segmentHeight, segmentDepth]} />
            </mesh>

            {/* Beveled top facet */}
            <mesh
              material={chocolateMaterial}
              position={[0, 0, segmentDepth / 2 + 0.012]}
              castShadow
            >
              <boxGeometry
                args={[segmentWidth * 0.86, segmentHeight * 0.86, 0.025]}
              />
            </mesh>

            {/* Subtle luxury gold leaf fleck on center squares */}
            {isCenterGold && (
              <mesh
                material={goldLeafMaterial}
                position={[
                  (col === 3 ? 0.02 : -0.02),
                  (row === 1 ? -0.02 : 0.02),
                  segmentDepth / 2 + 0.026,
                ]}
              >
                <boxGeometry args={[0.04, 0.04, 0.002]} />
              </mesh>
            )}
          </group>
        );
      }
    }
    return list;
  }, [chocolateMaterial, goldLeafMaterial]);

  return (
    <group ref={groupRef} name="chocolateBar" rotation={[0.15, -0.2, 0]}>
      {segments}
    </group>
  );
}
