"use client";

import { motion } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import LabCard from "@/components/primitives/LabCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { labItems } from "@/data/lab";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AILab() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="ailab" className="border-t border-border">
      <Container>

        {/* ── Section header ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
          className="mb-14"
        >
          <p className="text-label mb-4">AI Lab</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            Experiments, not just{" "}
            <span className="text-muted-foreground">finished projects.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Experiments with Claude API, RAG systems, agent frameworks, and
            prompt engineering. Most aren&apos;t finished products — that&apos;s
            the point.
          </p>
        </motion.div>

        {/* ── Lab cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {labItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.07}>
              <LabCard item={item} index={i} />
            </Reveal>
          ))}
        </div>

      </Container>
    </SectionWrapper>
  );
}
