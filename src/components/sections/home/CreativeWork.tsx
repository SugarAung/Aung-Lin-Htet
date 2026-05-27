"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { creativeWork, type CreativeItem } from "@/data/creativeWork";
import { cn } from "@/lib/utils";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── ReelCard ─────────────────────────────────────────────────────────────────

interface ReelCardProps {
  item: CreativeItem;
  reduced: boolean;
}

function ReelCard({ item, reduced }: ReelCardProps) {
  const [hovered, setHovered] = useState(false);

  const playActive = !reduced && hovered;

  return (
    <motion.div
      className="flex flex-col gap-3 w-[240px] flex-none cursor-default"
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: expo }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Thumbnail area — portrait 9:16 */}
      <div
        className={cn(
          "aspect-[9/16] relative overflow-hidden rounded-sm border border-border",
          "bg-gradient-to-b",
          item.accentColor
        )}
      >
        {/* TODO: replace with next/image thumbnail — add thumbnail path in creativeWork.ts */}

        {/* Play icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              opacity: playActive ? 1 : 0.2,
              scale: playActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Play
              size={28}
              className="text-foreground fill-foreground/30"
              aria-hidden
            />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-1">
        <p className="text-label">{item.typeLabel}</p>
        <p className="text-sm font-display italic text-foreground/80 leading-snug">
          {item.title}
        </p>
      </div>
    </motion.div>
  );
}

// ─── CreativeWork section ─────────────────────────────────────────────────────

export default function CreativeWork() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="creativework" className="border-t border-border overflow-hidden">

      {/* Section header */}
      <Container>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
          className="mb-12"
        >
          <p className="text-label mb-4">Creative Work</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            The ALH Studio —{" "}
            <span className="text-muted-foreground">where ideas take form.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Video editing, social content, personal development, and creative
            experiments at the intersection of technology and storytelling.
          </p>
        </motion.div>
      </Container>

      {/* Horizontal reel strip — bleeds right, left-aligns with Container padding */}
      <div className="pl-6 md:pl-10 lg:pl-16 relative">
        <div className="flex gap-4 overflow-x-auto scroll-hide pb-6">
          {creativeWork.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06} className="flex-none">
              <ReelCard item={item} reduced={reduced} />
            </Reveal>
          ))}
          {/* Right-edge breathing room */}
          <div className="w-6 md:w-10 lg:w-16 flex-none" aria-hidden />
        </div>
        {/* Right-edge fade hint — signals horizontal scroll */}
        <div
          className="pointer-events-none absolute top-0 right-0 h-full w-20 md:w-32"
          style={{
            background: "linear-gradient(to right, transparent, var(--background))",
          }}
          aria-hidden
        />
      </div>

    </SectionWrapper>
  );
}
