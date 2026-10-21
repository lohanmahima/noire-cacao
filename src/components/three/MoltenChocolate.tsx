'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function MoltenChocolate() {
  const ribbon1Ref = useRef<THREE.Mesh>(null);
  const ribbon2Ref = useRef<THREE.Mesh>(null);
  const poolRef = useRef<THREE.Mesh>(null);

  const moltenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#231207',
        roughness: 0.12,
        metalness: 0.2,
        emissive: '#150903',
        emissiveIntensity: 0.3,
      }),
    []
  );

  const goldRibbonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#C9A84C',
        roughness: 0.2,
        metalness: 0.85,
      }),
    []
  );

  const geometry1 = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.2, 0),
      new THREE.Vector3(0.25, 0.6, 0.15),
      new THREE.Vector3(-0.15, 0.1, -0.1),
      new THREE.Vector3(0.2, -0.4, 0.1),
      new THREE.Vector3(-0.05, -0.9, 0),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.09, 12, false);
  }, []);

  const geometry2 = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, 1.0, 0.1),
      new THREE.Vector3(-0.1, 0.4, -0.2),
      new THREE.Vector3(0.18, -0.2, 0.05),
      new THREE.Vector3(0.0, -0.85, -0.05),
    ]);
    return new THREE.TubeGeometry(curve, 28, 0.05, 10, false);
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (ribbon1Ref.current) {
      ribbon1Ref.current.rotation.y = Math.sin(time * 0.4) * 0.2;
      ribbon1Ref.current.position.y = Math.sin(time * 0.8) * 0.04;
    }
    if (ribbon2Ref.current) {
      ribbon2Ref.current.rotation.y = -Math.cos(time * 0.35) * 0.25;
      ribbon2Ref.current.position.y = Math.cos(time * 0.7) * 0.03;
    }
    if (poolRef.current) {
      const scale = 1 + Math.sin(time * 1.2) * 0.04;
      poolRef.current.scale.set(scale, 1, scale);
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Primary molten chocolate cascade */}
      <mesh
        ref={ribbon1Ref}
        geometry={geometry1}
        material={moltenMaterial}
        castShadow
      />

      {/* Secondary accent ribbon */}
      <mesh
        ref={ribbon2Ref}
        geometry={geometry2}
        material={moltenMaterial}
        castShadow
      />

      {/* Glossy chocolate pool at the base */}
      <mesh
        ref={poolRef}
        position={[0, -0.95, 0]}
        material={moltenMaterial}
        receiveShadow
      >
        <cylinderGeometry args={[0.55, 0.65, 0.04, 32]} />
      </mesh>

      {/* Gilded chocolate fleck resting on top */}
      <mesh
        position={[0.1, 0.6, 0.2]}
        material={goldRibbonMaterial}
        rotation={[0.3, 0.5, 0]}
      >
        <boxGeometry args={[0.06, 0.005, 0.06]} />
      </mesh>
    </group>
  );
}
