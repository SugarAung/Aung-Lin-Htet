"use client";

import { motion } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Badge from "@/components/primitives/Badge";
import { experience } from "@/data/experience";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DOT_CLASSES: Record<Experience["type"], string> = {
  work:      "bg-foreground",
  education: "bg-foreground/60",
  personal:  "bg-muted-foreground",
};

const TYPE_LABELS: Record<Experience["type"], string> = {
  work:      "Work",
  education: "Education",
  personal:  "Personal",
};

interface TimelineItemProps {
  item: Experience;
  index: number;
}

function TimelineItem({ item, index }: TimelineItemProps) {
  const isRight = index % 2 === 0;

  return (
    <Reveal delay={index * 0.07} className="w-full">
      {/* ── Mobile layout: left dot, card on right (unchanged) ── */}
      <div className="flex md:hidden gap-0 mb-6">
        <div className="relative flex flex-col items-center w-10 flex-none pt-1.5">
          <div
            className={cn(
              "w-2.5 h-2.5 rounded-full flex-none z-10 ring-2 ring-background",
              DOT_CLASSES[item.type]
            )}
          />
          <div className="w-px flex-1 bg-border mt-1.5 min-h-[3rem]" />
        </div>
        <TimelineCard item={item} />
      </div>

      {/* ── Desktop layout: alternating left / right ── */}
      <div
        className={cn(
          "hidden md:flex items-start gap-0 mb-8",
          isRight ? "flex-row" : "flex-row-reverse"
        )}
      >
        {/* Card side */}
        <div className={cn("w-[45%]", isRight ? "pr-8 text-left" : "pl-8 text-left")}>
          <TimelineCard item={item} />
        </div>

        {/* Center dot + line */}
        <div className="relative flex flex-col items-center w-[10%] flex-none pt-1.5">
          <div
            className={cn(
              "w-3 h-3 rounded-full flex-none z-10 ring-2 ring-background",
              DOT_CLASSES[item.type]
            )}
          />
          <div className="w-px flex-1 bg-border mt-2 min-h-[3rem]" />
        </div>

        {/* Empty spacer side */}
        <div className="w-[45%]" />
      </div>
    </Reveal>
  );
}

function TimelineCard({ item }: { item: Experience }) {
  return (
    <div
      className={cn(
        "flex-1 p-5",
        "bg-surface border border-border rounded-sm",
        "hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)]",
        "transition-[border-color,box-shadow] duration-300"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-display italic text-foreground leading-tight">
            {item.role}
          </p>
          <p className="text-label">{item.org}</p>
        </div>
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {item.upcoming ? (
            <Badge className="border-foreground/30 text-foreground/70">Upcoming</Badge>
          ) : (
            <Badge>{TYPE_LABELS[item.type]}</Badge>
          )}
          <span className="font-mono text-xs text-muted-foreground/50">
            {item.period}
          </span>
        </div>
      </div>
      <div className="rule mb-3" />
      <p className="text-base text-muted-foreground leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

export default function ExperienceTimeline() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="journey" className="border-t border-border">
      <Container>

        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
          className="mb-14"
        >
          <p className="text-label mb-4">Journey</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            Where I&apos;ve been,{" "}
            <span className="text-muted-foreground">what I&apos;ve built.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Education, work, and personal projects. Still in the journey.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {experience.map((item, i) => (
            <TimelineItem
              key={`${item.org}-${item.role}`}
              item={item}
              index={i}
            />
          ))}
        </div>

      </Container>
    </SectionWrapper>
  );
}
