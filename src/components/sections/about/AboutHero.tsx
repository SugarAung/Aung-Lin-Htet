"use client";

import { motion } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Button from "@/components/primitives/Button";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DELAYS = [0, 0.15, 0.3, 0.5];

function fadeUp(delay: number, reduced: boolean) {
  return {
    initial: reduced ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.7, ease: expo, delay: reduced ? 0 : delay },
  };
}

export default function AboutHero() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper
      id="about-hero"
      className="border-b border-border pt-32 pb-24 md:pt-40 md:pb-32"
      variant="flush"
    >
      <Container>
        <motion.p {...fadeUp(DELAYS[0], reduced)} className="text-label mb-4">
          About Me
        </motion.p>

        <motion.h1
          {...fadeUp(DELAYS[1], reduced)}
          className="text-display-lg font-display italic text-foreground leading-none mb-6 max-w-3xl"
        >
          About Me
        </motion.h1>

        <motion.p
          {...fadeUp(DELAYS[2], reduced)}
          className="text-base text-muted-foreground leading-relaxed max-w-xl mb-10"
        >
          I&apos;m Aung Lin Htet, a Computer Engineering student and AI
          Developer. I build AI tools, web apps, automation systems, and
          creative digital products using modern development workflows.
        </motion.p>

        <motion.div
          {...fadeUp(DELAYS[3], reduced)}
          className="flex flex-wrap gap-3"
        >
          <Button as="a" href="/work" variant="outline">
            View My Work
          </Button>
          <Button as="a" href="/contact" variant="primary">
            Contact Me
          </Button>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
