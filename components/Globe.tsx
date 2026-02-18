"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/** Phagwara, Punjab approximate position on unit sphere */
const LOCATION = { x: 0.35, y: 0.52, z: 0.78 };

const CONNECTIONS = [
  { x: -0.7, y: 0.5, z: 0.5 },
  { x: 0.1, y: 0.8, z: -0.6 },
  { x: -0.5, y: -0.3, z: 0.8 },
  { x: 0.8, y: 0.3, z: -0.5 },
];

function GlobeMesh({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  const colors = isDark
    ? { primary: "#00f0ff", secondary: "#7b61ff", accent: "#ff006e" }
    : { primary: "#0088aa", secondary: "#5a3fd6", accent: "#c4004e" };

  const dotGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const count = 800;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      positions.push(
        Math.cos(theta) * Math.sin(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(phi),
      );
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const start = new THREE.Vector3(LOCATION.x, LOCATION.y, LOCATION.z);

    CONNECTIONS.forEach((target) => {
      const end = new THREE.Vector3(target.x, target.y, target.z);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1.3);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      curve.getPoints(20).forEach((p) => positions.push(p.x, p.y, p.z));
    });

    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Wireframe */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={colors.primary} wireframe transparent opacity={isDark ? 0.06 : 0.12} />
      </mesh>

      {/* Dots */}
      <points geometry={dotGeometry}>
        <pointsMaterial size={0.015} color={colors.primary} transparent opacity={isDark ? 0.4 : 0.6} sizeAttenuation />
      </points>

      {/* Connection arcs */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={colors.secondary} transparent opacity={isDark ? 0.3 : 0.5} />
      </lineSegments>

      {/* Location pin */}
      <mesh position={[LOCATION.x, LOCATION.y, LOCATION.z]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color={colors.accent} />
      </mesh>

      {/* Pulsing ring */}
      <mesh position={[LOCATION.x, LOCATION.y, LOCATION.z]} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[0.04, 0.055, 32]} />
        <meshBasicMaterial color={colors.accent} transparent opacity={isDark ? 0.4 : 0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color={colors.primary} transparent opacity={isDark ? 0.02 : 0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function Globe() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(!document.documentElement.classList.contains("light"));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-64 md:h-80 relative">
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
        <GlobeMesh isDark={isDark} />
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