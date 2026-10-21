'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ChocolateBreakProps {
  progress: number; // 0 (whole) to 1 (snapped/broken)
}

export default function ChocolateBreak({ progress }: ChocolateBreakProps) {
  const mainGroupRef = useRef<THREE.Group>(null);
  const leftHalfRef = useRef<THREE.Group>(null);
  const rightHalfRef = useRef<THREE.Group>(null);
  const crumbsRef = useRef<THREE.Group>(null);
  const beansRef = useRef<THREE.Group>(null);

  // Materials
  const chocolateMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#24130A',
        roughness: 0.32,
        metalness: 0.12,
      }),
    []
  );

  const cacaoBeanMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3B2012',
        roughness: 0.72,
        metalness: 0.04,
      }),
    []
  );

  const cacaoBeanDarkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#261309',
        roughness: 0.65,
        metalness: 0.05,
      }),
    []
  );

  const crumbMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2A150A',
        roughness: 0.48,
        metalness: 0.08,
      }),
    []
  );

  const moltenCoreMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#9C4C24',
        roughness: 0.16,
        metalness: 0.28,
        emissive: '#4A200E',
        emissiveIntensity: 0.25,
      }),
    []
  );

  // 18 Flying Cacao Beans with outward burst explosion trajectories
  const flyingBeans = useMemo(() => {
    const list = [];
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 1.9 + 1.2;
      list.push({
        position: [
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.15,
        ] as [number, number, number],
        velocity: [
          Math.cos(angle) * speed * 1.45,
          (Math.sin(angle) * speed + (Math.random() - 0.2)) * 1.35,
          (Math.random() - 0.5) * 2.6,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        rotSpeed: [
          Math.random() * 2.5 + 1.2,
          Math.random() * 2.5 + 1.2,
          Math.random() * 2.5 + 1.2,
        ] as [number, number, number],
        scaleFactor: Math.random() * 0.35 + 0.85,
        isDark: i % 2 === 0,
      });
    }
    return list;
  }, []);

  // 28 Chocolate Crumbs & Shards
  const crumbs = useMemo(() => {
    const list = [];
    for (let i = 0; i < 28; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.15,
        ] as [number, number, number],
        velocity: [
          (Math.random() - 0.5) * 3.4,
          (Math.random() - 0.5) * 3.2,
          (Math.random() - 0.5) * 2.8,
        ] as [number, number, number],
        size: Math.random() * 0.04 + 0.015,
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
      });
    }
    return list;
  }, []);

  const clampedProgress = Math.max(0, Math.min(1, progress));

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const eased = clampedProgress * clampedProgress * (3 - 2 * clampedProgress); // smoothstep

    // Continuous floating and slow 3D rotation
    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = Math.sin(t * 0.45) * 0.24;
      mainGroupRef.current.rotation.x = 0.2 + Math.cos(t * 0.38) * 0.08;
      mainGroupRef.current.position.y = Math.sin(t * 0.9) * 0.05;
    }

    if (leftHalfRef.current && rightHalfRef.current) {
      // Left half moves left, drops slightly, and tilts back
      leftHalfRef.current.position.x = -eased * 1.18;
      leftHalfRef.current.position.y = -eased * 0.2;
      leftHalfRef.current.rotation.z = eased * 0.25;
      leftHalfRef.current.rotation.y = -eased * 0.22;

      // Right half moves right, drops slightly, and tilts forward
      rightHalfRef.current.position.x = eased * 1.18;
      rightHalfRef.current.position.y = -eased * 0.2;
      rightHalfRef.current.rotation.z = -eased * 0.25;
      rightHalfRef.current.rotation.y = eased * 0.22;
    }

    // Dynamic Flying Cacao Beans ("beand flied")
    if (beansRef.current) {
      beansRef.current.children.forEach((bean, i) => {
        const data = flyingBeans[i];
        if (!data) return;

        // Propel outward on break with gravity arc
        bean.position.x = data.position[0] + data.velocity[0] * eased * 1.75;
        bean.position.y =
          data.position[1] + data.velocity[1] * eased * 1.55 - eased * eased * 0.55;
        bean.position.z = data.position[2] + data.velocity[2] * eased * 1.65;

        // Dynamic tumbling spin
        bean.rotation.x = data.rotation[0] + (t * 0.5 + eased * 2.5) * data.rotSpeed[0] * Math.PI;
        bean.rotation.y = data.rotation[1] + (t * 0.5 + eased * 2.5) * data.rotSpeed[1] * Math.PI;
        bean.rotation.z = data.rotation[2] + (t * 0.5 + eased * 2.5) * data.rotSpeed[2] * Math.PI;

        // Scale visibility based on break progress while preserving organic cacao bean ellipsoid aspect ratio
        const scale = eased > 0.03 ? 1 : eased * 33.3;
        bean.scale.set(
          scale * data.scaleFactor * 1.55,
          scale * data.scaleFactor * 0.92,
          scale * data.scaleFactor * 0.88
        );
      });
    }

    // Scatter Crumb Particles & Shards
    if (crumbsRef.current) {
      crumbsRef.current.children.forEach((crumb, i) => {
        const data = crumbs[i];
        if (!data) return;

        crumb.position.x = data.position[0] + data.velocity[0] * eased * 1.65;
        crumb.position.y = data.position[1] + data.velocity[1] * eased * 1.65;
        crumb.position.z = data.position[2] + data.velocity[2] * eased * 1.65;

        crumb.rotation.x = data.rotation[0] + eased * Math.PI * 4;
        crumb.rotation.y = data.rotation[1] + eased * Math.PI * 4;

        const s = Math.max(0, 1 - eased * 0.35);
        crumb.scale.set(s, s, s);
      });
    }
  });

  // Half-bar segments: 4 rows x 4 cols on left, 4 rows x 4 cols on right
  const segmentWidth = 0.22;
  const segmentHeight = 0.22;
  const segmentDepth = 0.15;
  const gap = 0.025;

  const leftSegments = useMemo(() => {
    const list = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const x = (col - 4 + 0.5) * (segmentWidth + gap);
        const y = (row - 2 + 0.5) * (segmentHeight + gap);
        list.push(
          <group key={`l-${row}-${col}`} position={[x, y, 0]}>
            <mesh material={chocolateMaterial} castShadow receiveShadow>
              <boxGeometry args={[segmentWidth, segmentHeight, segmentDepth]} />
            </mesh>
            <mesh
              material={chocolateMaterial}
              position={[0, 0, segmentDepth / 2 + 0.01]}
              castShadow
            >
              <boxGeometry
                args={[segmentWidth * 0.86, segmentHeight * 0.86, 0.025]}
              />
            </mesh>
          </group>
        );
      }
    }
    return list;
  }, [chocolateMaterial]);

  const rightSegments = useMemo(() => {
    const list = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const x = (col + 0.5) * (segmentWidth + gap);
        const y = (row - 2 + 0.5) * (segmentHeight + gap);
        list.push(
          <group key={`r-${row}-${col}`} position={[x, y, 0]}>
            <mesh material={chocolateMaterial} castShadow receiveShadow>
              <boxGeometry args={[segmentWidth, segmentHeight, segmentDepth]} />
            </mesh>
            <mesh
              material={chocolateMaterial}
              position={[0, 0, segmentDepth / 2 + 0.01]}
              castShadow
            >
              <boxGeometry
                args={[segmentWidth * 0.86, segmentHeight * 0.86, 0.025]}
              />
            </mesh>
          </group>
        );
      }
    }
    return list;
  }, [chocolateMaterial]);

  return (
    <group ref={mainGroupRef} rotation={[0.2, 0, 0]} position={[0, 0, 0]}>
      {/* Left Snapped Half */}
      <group ref={leftHalfRef}>
        {leftSegments}
        {/* Jagged fracture edge highlight */}
        <mesh position={[-0.01, 0, 0]} material={chocolateMaterial}>
          <boxGeometry args={[0.02, segmentHeight * 4.2, segmentDepth * 0.9]} />
        </mesh>
      </group>

      {/* Right Snapped Half */}
      <group ref={rightHalfRef}>
        {rightSegments}
        {/* Jagged fracture edge highlight */}
        <mesh position={[0.01, 0, 0]} material={chocolateMaterial}>
          <boxGeometry args={[0.02, segmentHeight * 4.2, segmentDepth * 0.9]} />
        </mesh>
      </group>

      {/* Flying 3D Whole Cacao Beans ("beand flied") */}
      <group ref={beansRef}>
        {flyingBeans.map((bean, i) => (
          <mesh
            key={`bean-${i}`}
            material={bean.isDark ? cacaoBeanDarkMaterial : cacaoBeanMaterial}
            position={bean.position}
            castShadow
          >
            <sphereGeometry args={[0.08, 16, 16]} />
          </mesh>
        ))}
      </group>

      {/* Scattered Shards & Crumb Particles */}
      <group ref={crumbsRef}>
        {crumbs.map((crumb, i) => (
          <mesh
            key={`crumb-${i}`}
            material={crumbMaterial}
            position={crumb.position}
            castShadow
          >
            <boxGeometry args={[crumb.size, crumb.size * 0.8, crumb.size]} />
          </mesh>
        ))}
      </group>

      {/* Molten Caramel / Chocolate Fracture Droplet Core */}
      {clampedProgress > 0.25 && (
        <group position={[0, -0.08, 0]}>
          <mesh material={moltenCoreMaterial}>
            <sphereGeometry args={[0.13 * clampedProgress, 16, 16]} />
          </mesh>
        </group>
      )}
    </group>
  );
}
