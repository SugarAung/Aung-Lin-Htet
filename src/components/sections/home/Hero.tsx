"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "motion/react";
import { useEffect } from "react";
import Container from "@/components/primitives/Container";
import Button from "@/components/primitives/Button";
import CoderScene from "@/components/primitives/CoderScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Easing ───────────────────────────────────────────────────────────────────
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Shared fade+rise variant factory ─────────────────────────────────────────
function makeVariant(
  delay: number,
  y = 16,
  duration = 0.7
): Variants {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: expo, delay },
    },
  };
}

// Fade-only (no y shift) for roles and support line
function makeFade(delay: number, duration = 0.6): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration, ease: "easeOut", delay },
    },
  };
}

// ─── Cursor glow ──────────────────────────────────────────────────────────────
function CursorGlow() {
  const rawX = useMotionValue(-1000);
  const rawY = useMotionValue(-1000);
  const x = useSpring(rawX, { stiffness: 80, damping: 20 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      aria-hidden
    >
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(240,237,232,0.055) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

// ─── Background glow ──────────────────────────────────────────────────────────
function BackgroundGlow() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      initial={{ opacity: 0.6, scale: 1 }}
      animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.04, 1] }}
      transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
      style={{
        background:
          "radial-gradient(ellipse 900px 600px at 18% 55%, rgba(240,237,232,0.038) 0%, transparent 70%)",
      }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const ROLES = [
  "AI Developer",
  "Web Developer",
  "Solopreneur · 4 Products in 4 Years",
] as const;

const CTAS: {
  label: string;
  href: string;
  variant: "primary" | "outline" | "ghost";
}[] = [
  { label: "View My Work", href: "#work",    variant: "primary" },
  { label: "My Journey",   href: "#journey", variant: "outline" },
];

export default function Hero() {
  const reduced = useReducedMotion();

  // Shared animate/initial props
  const ai = (v: Variants) => ({
    variants: v,
    initial: reduced ? false : "hidden",
    animate: "visible",
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <CursorGlow />
      <BackgroundGlow />

      <Container className="relative z-10 py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_400px] md:gap-12 lg:gap-20 md:items-center">
        <div>

          {/* Greeting — step 1 */}
          <motion.p
            {...ai(makeVariant(0, 12, 1.0))}
            className="text-sm text-muted-foreground font-sans tracking-wide mb-2"
          >
            Hi,
          </motion.p>

          {/* Greeting — step 2 */}
          <motion.p
            {...ai(makeVariant(0.8, 12, 1.0))}
            className="text-sm text-muted-foreground font-sans tracking-wide mb-4"
          >
            My name is
          </motion.p>

          {/* Name */}
          <motion.h1
            {...ai(makeVariant(1.6, 24, 1.8))}
            className="text-display-xl font-display italic text-foreground leading-none mb-6"
          >
            Aung Lin Htet
          </motion.h1>

          {/* Roles */}
          <motion.p
            {...ai(makeFade(2.1, 1.2))}
            className="text-label mb-12"
          >
            {ROLES.map((role, i) => (
              <span key={role}>
                {role}
                {i < ROLES.length - 1 && (
                  <span className="mx-2 opacity-30">/</span>
                )}
              </span>
            ))}
          </motion.p>

          {/* Body copy */}
          <motion.p
            {...ai(makeVariant(2.5, 10, 1.2))}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-4"
          >
            Building AI tools, web apps, and automation systems — and posting the
            whole journey online. My goal: become a solopreneur who ships full
            products solo.
          </motion.p>

          {/* Supporting line */}
          <motion.p
            {...ai(makeFade(2.9, 1.0))}
            className="text-sm text-muted-foreground/60 max-w-xl mb-10"
          >
            SP Computer Engineering graduate · GPA 3.86 · AI intern at Tiny
            Equation · SUTD CSD Sep 2026
          </motion.p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            {CTAS.map(({ label, href, variant }, i) => (
              <motion.div
                key={label}
                {...ai(makeVariant(3.2 + i * 0.1, 8, 1.0))}
              >
                <Button as="a" href={href} variant={variant}>
                  {label}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side — 3D voxel coder scene */}
        <div className="hidden md:flex items-center justify-center">
          <CoderScene />
        </div>

        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        variants={makeFade(3.8, 1.2)}
        initial={reduced ? false : "hidden"}
        animate="visible"
        className="absolute bottom-8 right-6 md:right-10 flex flex-col items-center gap-2 z-10"
        aria-hidden
      >
        <span className="text-label">Scroll</span>
        <div className="w-px h-12 bg-foreground/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-foreground/50"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{
              duration: 2.8,
              delay: 4.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
