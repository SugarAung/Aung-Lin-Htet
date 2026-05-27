"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import WorkCard from "@/components/primitives/WorkCard";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Project } from "@/types";

// ─── Filter config ────────────────────────────────────────────────────────────
type FilterValue = "all" | Project["category"];

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All",              value: "all"        },
  { label: "AI Projects",      value: "ai"         },
  { label: "Web Apps",         value: "web"        },
  { label: "ML Projects",      value: "ml"         },
  { label: "Client Websites",  value: "client"     },
  { label: "Creative / Video", value: "creative"   },
  { label: "Automation",       value: "automation" },
];

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── WorkGrid ─────────────────────────────────────────────────────────────────
export default function WorkGrid() {
  const [active, setActive] = useState<FilterValue>("all");
  const reduced = useReducedMotion();

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <SectionWrapper id="work-grid" className="border-b border-border">
      <Container>

        {/* ── Section header ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
        >
          <p className="text-label mb-4">All Projects</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            Everything I&apos;ve built,{" "}
            <span className="text-muted-foreground">in one place.</span>
          </h2>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-wrap gap-x-6 gap-y-3 mt-10 mb-12"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={active === f.value}
              onClick={() => setActive(f.value)}
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

        {/* ── Project grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <motion.div
                  key={project.id}
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
                  <WorkCard project={project} index={i} />
                </motion.div>
              ))
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-muted-foreground py-12 col-span-full"
              >
                No projects in this category yet.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </Container>
    </SectionWrapper>
  );
}
