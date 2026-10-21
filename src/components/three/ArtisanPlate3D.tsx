'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ArtisanPlate3D() {
  const groupRef = useRef<THREE.Group>(null);
  const plateRef = useRef<THREE.Group>(null);

  // Materials modeled directly after the artisanal ceramic plate & dual chocolate bars in Image 3
  const darkChocolateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3E2114',
        roughness: 0.32,
        metalness: 0.1,
        envMapIntensity: 0.7,
      }),
    []
  );

  const whiteChocolateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F4EEDC',
        roughness: 0.26,
        metalness: 0.04,
        envMapIntensity: 0.5,
      }),
    []
  );

  const ceramicPlateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D4C4A8',
        roughness: 0.85,
        metalness: 0.05,
      }),
    []
  );

  const brassSpoonMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#C9A84C',
        roughness: 0.25,
        metalness: 0.88,
      }),
    []
  );

  const cocoaPowderMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2E1509',
        roughness: 0.98,
        metalness: 0.0,
      }),
    []
  );

  // Continuous 3D rotation and mouse parallax
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth continuous 3D rotation ("ye 3d ho ghume okay")
      groupRef.current.rotation.y += delta * 0.45;

      // Gentle floating bobbing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;

      // Mouse parallax tilt
      const targetTiltX = 0.35 - state.pointer.y * 0.25;
      const targetTiltZ = state.pointer.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetTiltX,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetTiltZ,
        0.05
      );
    }
  });

  // Segments for Milk/Dark Bar (4 cols x 7 rows)
  const darkSegments = useMemo(() => {
    const list = [];
    const rows = 7;
    const cols = 4;
    const w = 0.28;
    const h = 0.28;
    const d = 0.14;
    const gap = 0.025;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2 + 0.5) * (w + gap);
        const z = (r - rows / 2 + 0.5) * (h + gap);
        list.push(
          <group key={`dark-${r}-${c}`} position={[x, d / 2, z]}>
            <mesh material={darkChocolateMat} castShadow receiveShadow>
              <boxGeometry args={[w, d, h]} />
            </mesh>
            <mesh
              material={darkChocolateMat}
              position={[0, d / 2 + 0.015, 0]}
              castShadow
            >
              <boxGeometry args={[w * 0.85, 0.03, h * 0.85]} />
            </mesh>
          </group>
        );
      }
    }
    return list;
  }, [darkChocolateMat]);

  // Segments for Ivory White Bar (4 cols x 6 rows) with diagonal pattern
  const whiteSegments = useMemo(() => {
    const list = [];
    const rows = 6;
    const cols = 4;
    const w = 0.28;
    const h = 0.28;
    const d = 0.12;
    const gap = 0.025;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2 + 0.5) * (w + gap);
        const z = (r - rows / 2 + 0.5) * (h + gap);
        list.push(
          <group key={`white-${r}-${c}`} position={[x, d / 2, z]}>
            <mesh material={whiteChocolateMat} castShadow receiveShadow>
              <boxGeometry args={[w, d, h]} />
            </mesh>
            <mesh
              material={whiteChocolateMat}
              position={[0, d / 2 + 0.012, 0]}
              castShadow
            >
              <boxGeometry args={[w * 0.84, 0.025, h * 0.84]} />
            </mesh>
          </group>
        );
      }
    }
    return list;
  }, [whiteChocolateMat]);

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* 1. Ceramic Stoneware Plate */}
      <group ref={plateRef} position={[0, -0.15, 0]}>
        {/* Main plate dish */}
        <mesh material={ceramicPlateMat} receiveShadow castShadow>
          <cylinderGeometry args={[2.1, 1.95, 0.09, 64]} />
        </mesh>
        {/* Subtle raised rim */}
        <mesh position={[0, 0.05, 0]} material={ceramicPlateMat} receiveShadow>
          <torusGeometry args={[2.0, 0.07, 16, 64]} />
        </mesh>

        {/* 2. Cocoa Powder Dusting on Plate */}
        <group position={[-1.0, 0.06, 0.5]}>
          <mesh material={cocoaPowderMat} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.38, 24]} />
          </mesh>
          <mesh material={cocoaPowderMat} position={[0.08, 0.02, 0.04]}>
            <coneGeometry args={[0.2, 0.08, 16]} />
          </mesh>
        </group>

        {/* 3. Brass / Gold Tasting Spoon */}
        <group position={[-1.25, 0.08, 0.65]} rotation={[0.08, 0.6, -0.1]}>
          {/* Spoon handle */}
          <mesh material={brassSpoonMat} position={[0, 0, 0.55]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 1.1, 12]} />
          </mesh>
          {/* Spoon bowl */}
          <mesh material={brassSpoonMat} position={[0, 0.01, -0.05]} castShadow>
            <sphereGeometry args={[0.13, 16, 16]} />
          </mesh>
          {/* Cocoa powder in spoon */}
          <mesh material={cocoaPowderMat} position={[0, 0.04, -0.05]}>
            <sphereGeometry args={[0.1, 12, 12]} />
          </mesh>
        </group>

        {/* 4. Ivory White Chocolate Bar (Lower) */}
        <group position={[-0.1, 0.07, 0.1]} rotation={[0, -0.32, 0]}>
          {whiteSegments}
        </group>

        {/* 5. Rich Milk/Dark Chocolate Bar (Upper, overlapping diagonally) */}
        <group
          position={[0.32, 0.22, -0.22]}
          rotation={[0.07, 0.25, 0.05]}
        >
          {darkSegments}
        </group>
      </group>
    </group>
  );
}
