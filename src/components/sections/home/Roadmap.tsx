"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import { roadmap } from "@/data/roadmap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { RoadmapItem } from "@/types";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getDotClass(status: RoadmapItem["status"]): string {
  switch (status) {
    case "active":  return "bg-foreground";
    case "next":    return "bg-foreground/50";
    case "future":  return "bg-foreground/20";
    case "done":    return "bg-muted-foreground";
  }
}

const STATUS_LABELS: Record<RoadmapItem["status"], string> = {
  active: "Now",
  next:   "Next",
  future: "Future",
  done:   "Done",
};

// ─── Mobile layout ─────────────────────────────────────────────────────────────

function MobileRoadmap() {
  return (
    <div className="flex flex-col">
      {roadmap.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.07} className="flex gap-0">
          {/* Dot track */}
          <div className="flex flex-col items-center w-10 flex-none pt-1.5">
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full flex-none ring-2 ring-background",
                getDotClass(item.status)
              )}
              style={
                item.status === "active"
                  ? { boxShadow: "0 0 14px rgba(240, 237, 232, 0.45)" }
                  : undefined
              }
            />
            {i < roadmap.length - 1 && (
              <div className="w-px flex-1 bg-border mt-1.5 min-h-[4rem]" />
            )}
          </div>

          {/* Content */}
          <div className="pb-10 last:pb-0 pl-2">
            <p className="text-label mb-1">{STATUS_LABELS[item.status]}</p>
            <p className="text-base font-display italic text-foreground leading-snug mb-2">
              {item.title}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
              {item.description}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─── Desktop layout ────────────────────────────────────────────────────────────

function DesktopRoadmap() {
  const reduced = useReducedMotion();

  return (
    <div>
      {/* Dots row with connecting lines */}
      <motion.div
        className="flex items-center mb-10"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {roadmap.map((item, i) => (
          <Fragment key={item.title}>
            {i > 0 && <div className="flex-1 h-px bg-border" />}
            <motion.div
              className={cn(
                "w-3 h-3 rounded-full flex-none ring-2 ring-background",
                getDotClass(item.status)
              )}
              initial={reduced ? false : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              style={
                item.status === "active"
                  ? { boxShadow: "0 0 14px rgba(240, 237, 232, 0.45)" }
                  : undefined
              }
            />
          </Fragment>
        ))}
      </motion.div>

      {/* Cards row */}
      <div className="grid grid-cols-4 gap-5">
        {roadmap.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.07} className="h-full">
            <div
              className={cn(
                "h-full p-4 rounded-sm border transition-[border-color,box-shadow] duration-300",
                item.status === "active"
                  ? "border-foreground/25 bg-surface hover:border-foreground/40 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)]"
                  : "border-border bg-surface/50 hover:border-foreground/20"
              )}
            >
              <p className="text-label mb-2">{STATUS_LABELS[item.status]}</p>
              <p className="text-base font-display italic text-foreground leading-snug mb-2">
                {item.title}
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function Roadmap() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="roadmap" className="border-t border-border">
      <Container>

        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
          className="mb-14"
        >
          <p className="text-label mb-4">Roadmap</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            Where I&apos;m Going
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            A rough map of where I am now and where I&apos;m heading.
          </p>
        </motion.div>

        {/* Mobile */}
        <div className="lg:hidden">
          <MobileRoadmap />
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <DesktopRoadmap />
        </div>

      </Container>
    </SectionWrapper>
  );
}
