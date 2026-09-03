"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion } from "motion/react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Lighting presets (theme-aware) ──────────────────────────────────────────
const LIGHTING = {
  dark:  { ambient: 0.5, purple: 0.4, white: 0.4, shirt: "#e8e8e8", collar: "#f5f5f5" },
  light: { ambient: 0.7, purple: 0.6, white: 0.5, shirt: "#1e3a5f", collar: "#2d4f7c" },
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const CYAN = "#00bcd4";
const DARK = "#111111";
const SURFACE = "#8a8a8a";
const SKIN = "#c4956a";
const PURPLE = "#4a1d96";
const PURPLE_DARK = "#3b0764";

// ─── Utility: single box mesh ─────────────────────────────────────────────────
function Box({
  size,
  position,
  rotation,
  color,
  emissive,
  emissiveIntensity = 0,
}: {
  size: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}) {
  return (
    <mesh position={position} rotation={rotation ?? [0, 0, 0]}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.9}
        metalness={0.05}
      />
    </mesh>
  );
}

// ─── Code lines scrolling on the laptop screen ────────────────────────────────
const LINES = [
  { w: 0.45, x: -0.1 },
  { w: 0.28, x: 0.03 },
  { w: 0.52, x: -0.1 },
  { w: 0.20, x: 0.02 },
  { w: 0.38, x: -0.06 },
  { w: 0.30, x: 0.05 },
];

function ScreenLines({ reduced }: { reduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reduced || !groupRef.current) return;
    for (const child of groupRef.current.children) {
      child.position.y += delta * 0.09;
      if (child.position.y > 0.28) child.position.y -= 0.56;
    }
  });

  const startYs = [-0.21, -0.12, -0.04, 0.05, 0.13, 0.21];

  return (
    // Offset slightly in front of the laptop screen face
    <group ref={groupRef} position={[0.6, 0.44, -0.185]} rotation={[-0.32, 0, 0]}>
      {LINES.map((line, i) => (
        <mesh key={i} position={[line.x, startYs[i], 0]}>
          <boxGeometry args={[line.w, 0.018, 0.001]} />
          <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Typing arms (alternating Y bob) ─────────────────────────────────────────
function TypingArms({ reduced, shirtColor }: { reduced: boolean; shirtColor: string }) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.getElapsedTime();
    if (leftRef.current)  leftRef.current.position.y  = -0.12 + Math.sin(t * 4) * 0.015;
    if (rightRef.current) rightRef.current.position.y = -0.12 + Math.cos(t * 4) * 0.015;
  });

  return (
    <>
      {/* Left forearm */}
      <mesh ref={leftRef} position={[-0.82, -0.12, 0.28]}>
        <boxGeometry args={[0.14, 0.08, 0.42]} />
        <meshStandardMaterial color={shirtColor} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Right forearm */}
      <mesh ref={rightRef} position={[-1.38, -0.12, 0.28]}>
        <boxGeometry args={[0.14, 0.08, 0.42]} />
        <meshStandardMaterial color={shirtColor} roughness={0.9} metalness={0.05} />
      </mesh>
    </>
  );
}

// ─── Mouse-driven group tilt ──────────────────────────────────────────────────
function TiltGroup({
  children,
  reduced,
}: {
  children: React.ReactNode;
  reduced: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current || reduced) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.35 + mouse.current.x * 0.18,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.current.y * 0.1,
      0.04
    );
  });

  return (
    <group ref={groupRef} rotation={[0, -0.35, 0]}>
      {children}
    </group>
  );
}

// ─── The full 3D scene ────────────────────────────────────────────────────────
function Scene({ reduced, isDark }: { reduced: boolean; isDark: boolean }) {
  const L = isDark ? LIGHTING.dark : LIGHTING.light;
  return (
    <>
      <ambientLight intensity={L.ambient} />
      {/* Cyan screen glow from laptop */}
      <pointLight position={[0.8, 1.4, 2.0]} intensity={1.6} color={CYAN} />
      {/* Purple fill from left */}
      <pointLight position={[-2, 2, 1]} intensity={L.purple} color="#7c3aed" />
      {/* Soft white fill from right */}
      <pointLight position={[3, 1.5, 2]} intensity={L.white} color="#ffffff" />

      <TiltGroup reduced={reduced}>
        <Float
          speed={reduced ? 0 : 1.4}
          rotationIntensity={0}
          floatIntensity={reduced ? 0 : 0.35}
        >
          {/* ── Desk ── */}
          <Box size={[3.6, 0.1, 1.2]} position={[0, 0, 0]} color={SURFACE} />

          {/* ── Laptop base (keyboard half) ── */}
          <Box size={[0.88, 0.04, 0.52]} position={[0.6, 0.065, 0.05]} color={DARK} />

          {/* ── Laptop screen half ── */}
          <Box
            size={[0.88, 0.62, 0.025]}
            position={[0.6, 0.44, -0.21]}
            rotation={[-0.32, 0, 0]}
            color="#1a1a2e"
          />
          {/* Screen face (emissive cyan) */}
          <Box
            size={[0.80, 0.52, 0.01]}
            position={[0.6, 0.44, -0.195]}
            rotation={[-0.32, 0, 0]}
            color={CYAN}
            emissive={CYAN}
            emissiveIntensity={0.22}
          />

          {/* ── Keyboard ── */}
          <Box size={[0.62, 0.018, 0.24]} position={[0.6, 0.074, 0.08]} color="#141414" />
          {/* Mouse */}
          <Box size={[0.15, 0.03, 0.22]} position={[1.1, 0.062, 0.14]} color="#141414" />

          {/* ── Character — body (shirt, theme-aware) ── */}
          <Box size={[0.58, 0.75, 0.4]} position={[-1.1, 0.52, 0]} color={L.shirt} />
          {/* Collar / shirt detail */}
          <Box size={[0.22, 0.18, 0.41]} position={[-1.1, 0.88, 0]} color={L.collar} />
          {/* Head */}
          <Box size={[0.42, 0.42, 0.4]} position={[-1.1, 1.1, 0]} color={SKIN} />
          {/* Hair */}
          <Box size={[0.44, 0.13, 0.42]} position={[-1.1, 1.35, 0]} color="#1a1118" />
          {/* Side hair (left) */}
          <Box size={[0.04, 0.26, 0.42]} position={[-1.32, 1.18, 0]} color="#1a1118" />
          {/* Glasses */}
          <Box size={[0.36, 0.04, 0.02]} position={[-1.1, 1.08, 0.21]} color="#555568" />

          {/* ── Gaming chair — purple ── */}
          {/* Seat */}
          <Box size={[0.72, 0.06, 0.72]} position={[-1.1, -0.1, -0.3]} color={PURPLE} />
          {/* Back */}
          <Box size={[0.65, 0.92, 0.06]} position={[-1.1, 0.38, -0.66]} color={PURPLE_DARK} />
          {/* Left armrest */}
          <Box size={[0.08, 0.28, 0.52]} position={[-0.77, 0.18, -0.3]} color={PURPLE} />
          {/* Right armrest */}
          <Box size={[0.08, 0.28, 0.52]} position={[-1.43, 0.18, -0.3]} color={PURPLE} />

          {/* ── Mug on desk ── */}
          <Box size={[0.14, 0.18, 0.14]} position={[-0.5, 0.14, -0.35]} color={SURFACE} />
          <Box size={[0.03, 0.08, 0.06]} position={[-0.43, 0.14, -0.35]} color={SURFACE} />
        </Float>

        {/* Typing arms animate independently */}
        <TypingArms reduced={reduced} shirtColor={L.shirt} />

        {/* Code lines run independently of Float bob */}
        <ScreenLines reduced={reduced} />
      </TiltGroup>
    </>
  );
}

// ─── CoderScene (exported) ────────────────────────────────────────────────────
export default function CoderScene() {
  const reduced = useReducedMotion();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(localStorage.getItem("theme") !== "light");
    const observer = new MutationObserver(() => {
      setIsDark(!document.documentElement.classList.contains("light"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="w-full max-w-[320px] lg:max-w-[380px] mx-auto"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 3.6 }}
    >
      {/* Canvas — transparent bg so hero section colour shows through */}
      <div className="w-full aspect-square">
        <Canvas
          camera={{ position: [0, 1.6, 5], fov: 42 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
        >
          <Scene reduced={reduced} isDark={isDark} />
        </Canvas>
      </div>
    </motion.div>
  );
}
