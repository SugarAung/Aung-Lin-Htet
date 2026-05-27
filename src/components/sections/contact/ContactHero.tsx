"use client";

import { motion } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DELAYS = [0, 0.1, 0.25, 0.4, 0.55];

function fadeUp(delay: number, reduced: boolean) {
  return {
    initial: reduced ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.7, ease: expo, delay: reduced ? 0 : delay },
  };
}

export default function ContactHero() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper
      id="contact-hero"
      className="border-b border-border pt-32 pb-24 md:pt-40 md:pb-32"
      variant="flush"
    >
      <Container>
        {/* Availability badge */}
        <motion.div
          {...fadeUp(DELAYS[0], reduced)}
          className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-border rounded-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden />
          <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/70">
            Open to opportunities
          </span>
        </motion.div>

        <motion.p {...fadeUp(DELAYS[1], reduced)} className="text-label mb-4">
          Get In Touch
        </motion.p>

        <motion.h1
          {...fadeUp(DELAYS[2], reduced)}
          className="text-display-lg font-display italic text-foreground leading-none mb-6 max-w-3xl"
        >
          Let&apos;s build something useful.
        </motion.h1>

        <motion.p
          {...fadeUp(DELAYS[3], reduced)}
          className="text-base text-muted-foreground leading-relaxed max-w-xl"
        >
          Open to AI internships, software development opportunities, freelance
          websites, creative collaborations, and AI product experiments.
        </motion.p>
      </Container>
    </SectionWrapper>
  );
}
