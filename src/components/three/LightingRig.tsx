'use client';

export default function LightingRig() {
  return (
    <>
      {/* Key light - warm main light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        color="#F5E6D3"
        castShadow
      />

      {/* Rim light - golden edge highlight */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={1.8}
        color="#C9A84C"
      />

      {/* Fill light - soft ambient */}
      <pointLight
        position={[0, -2, 8]}
        intensity={1.2}
        color="#A0522D"
        distance={15}
      />

      {/* Ambient base */}
      <ambientLight intensity={0.4} color="#1A0F0A" />

      {/* Hemisphere for subtle gradient */}
      <hemisphereLight
        color="#C9A84C"
        groundColor="#0D0906"
        intensity={0.6}
      />
    </>
  );
}
