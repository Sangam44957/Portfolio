"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Create dots on sphere surface
  const dotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const count = 800;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      positions.push(x, y, z);
    }

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, []);

  // Create connection lines
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];

    // Phagwara, Punjab coordinates (approximate on unit sphere)
    // Latitude: 31.2247° N, Longitude: 75.7730° E
    const phagwara = { x: 0.35, y: 0.52, z: 0.78 };
    const connections = [
      { x: -0.7, y: 0.5, z: 0.5 },   // US
      { x: 0.1, y: 0.8, z: -0.6 },    // Europe
      { x: -0.5, y: -0.3, z: 0.8 },   // South America
      { x: 0.8, y: 0.3, z: -0.5 },    // Japan
    ];

    connections.forEach((target) => {
      // Create arc between points
      const start = new THREE.Vector3(phagwara.x, phagwara.y, phagwara.z);
      const end = new THREE.Vector3(target.x, target.y, target.z);
      const mid = start
        .clone()
        .add(end)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(1.3);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(20);
      points.forEach((p) => positions.push(p.x, p.y, p.z));
    });

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Wireframe sphere */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Dot globe */}
      <points ref={pointsRef} geometry={dotGeometry}>
        <pointsMaterial
          size={0.015}
          color="#00f0ff"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#7b61ff"
          transparent
          opacity={0.3}
        />
      </lineSegments>

      {/* Location pin — Phagwara, Punjab */}
      <mesh position={[0.35, 0.52, 0.78]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#ff006e" />
      </mesh>

      {/* Pulsing ring on location */}
      <mesh
        position={[0.35, 0.52, 0.78]}
        rotation={[Math.PI / 3, 0, 0]}
      >
        <ringGeometry args={[0.04, 0.055, 32]} />
        <meshBasicMaterial
          color="#ff006e"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <div className="w-full h-64 md:h-80 relative">
      {/* Label */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-mono text-nexus-muted/40 uppercase tracking-wider">
          📍 Based in Phagwara, Punjab
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <GlobeMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}