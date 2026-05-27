"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import ProjectCard from "@/components/primitives/ProjectCard";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/types";

// ─── Filter config ──────────────────────────────────────────────────────────
type FilterValue = "all" | Project["category"];

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All",              value: "all"        },
  { label: "AI Projects",      value: "ai"         },
  { label: "Web Apps",         value: "web"        },
  { label: "ML Projects",      value: "ml"         },
  { label: "Creative / Video", value: "creative"   },
  { label: "Automation",       value: "automation" },
];

// ─── Easing ─────────────────────────────────────────────────────────────────
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── FeaturedWork ───────────────────────────────────────────────────────────
export default function FeaturedWork() {
  const [active, setActive] = useState<FilterValue>("all");
  const reduced = useReducedMotion();

  const featured = projects.filter((p) => p.featured);
  const filtered =
    active === "all" ? featured : featured.filter((p) => p.category === active);

  return (
    <SectionWrapper id="work" className="border-t border-border overflow-hidden">

      {/* ── Section header ── */}
      <Container>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
        >
          <p className="text-label mb-4">Selected Work</p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-wrap gap-x-6 gap-y-3 mt-10 mb-10"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              aria-pressed={active === f.value}
              className={cn(
                "text-label pb-1 border-b transition-colors duration-200",
                active === f.value
                  ? "text-foreground border-foreground/40"
                  : "text-muted-foreground border-transparent hover:text-foreground/70"
              )}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      </Container>

      {/* ── Carousel ──────────────────────────────────────────────────────── */}
      {/* Bleeds to viewport edges while keeping left indent matching Container */}
      <div className="-mt-2 pl-6 md:pl-10 lg:pl-16">
        <div className="flex gap-5 overflow-x-auto scroll-hide snap-x snap-mandatory pb-6">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="snap-start flex-none"
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                  transition={{
                    duration: 0.4,
                    ease: expo,
                    delay: reduced ? 0 : i * 0.05,
                  }}
                  layout
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground py-12"
              >
                No projects in this category yet.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Right-edge spacer so last card has breathing room */}
          <div className="w-6 md:w-10 lg:w-16 flex-none" aria-hidden />
        </div>
      </div>

    </SectionWrapper>
  );
}
