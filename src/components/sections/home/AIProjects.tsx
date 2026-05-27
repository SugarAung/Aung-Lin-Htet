"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import AICard from "@/components/primitives/AICard";
import Reveal from "@/components/primitives/Reveal";
import { projects } from "@/data/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Easing ──────────────────────────────────────────────────────────────────
const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Workflow nodes ───────────────────────────────────────────────────────────
const NODES = [
  { label: "Input",     sub: "Query / Document"    },
  { label: "Retrieval", sub: "Vector Search"        },
  { label: "LLM",       sub: "Reasoning"            },
  { label: "Agent",     sub: "Tool Use / Planning"  },
  { label: "Output",    sub: "Response"             },
] as const;

// ─── WorkflowDiagram ─────────────────────────────────────────────────────────
function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const active = reduced ? true : inView;

  return (
    <div className="overflow-x-auto scroll-hide py-1">
      <div
        ref={ref}
        className="flex items-start justify-between gap-0 py-10 min-w-[480px]"
      >
        {NODES.map((node, i) => (
          <Fragment key={node.label}>
            {/* Connector line (before every node except the first) */}
            {i > 0 && (
              <motion.div
                className="flex-1 h-px bg-foreground/20 mt-[5px] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: active ? 1 : 0 }}
                transition={{ duration: 0.4, ease: expo, delay: (i - 1) * 0.22 + 0.25 }}
              />
            )}

            {/* Node */}
            <motion.div
              className="flex flex-col items-center gap-2 flex-none text-center w-[80px]"
              initial={{ opacity: 0.12 }}
              animate={{ opacity: active ? 1 : 0.12 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.22 }}
            >
              {/* Dot with glow */}
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                animate={
                  active
                    ? {
                        backgroundColor: "rgba(240, 237, 232, 0.85)",
                        boxShadow: "0 0 14px rgba(240, 237, 232, 0.4)",
                      }
                    : {
                        backgroundColor: "rgba(240, 237, 232, 0.15)",
                        boxShadow: "none",
                      }
                }
                transition={{ duration: 0.35, delay: i * 0.22 }}
              />
              <p className="text-[10px] font-mono uppercase tracking-wider text-foreground/80">
                {node.label}
              </p>
              <p className="text-[9px] text-muted-foreground/60 leading-tight">
                {node.sub}
              </p>
            </motion.div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── AI Projects section ──────────────────────────────────────────────────────
const aiProjects = projects.filter(
  (p) => p.category === "ai" || p.category === "ml"
);

export default function AIProjects() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="work" className="border-t border-border">
      <Container>

        {/* ── Section header ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
          className="mb-14"
        >
          <p className="text-label mb-4">AI Projects</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            I build AI systems,{" "}
            <span className="text-muted-foreground">not just use them.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Practical AI systems using LLMs, RAG, multi-agent architectures,
            and full-stack patterns — not wrappers.
          </p>
        </motion.div>

        {/* ── Main message ── */}
        <Reveal delay={0.1} className="mb-14">
          <blockquote className="border-l-2 border-foreground/20 pl-6">
            <p className="text-xl md:text-2xl font-display italic text-foreground/90 leading-snug max-w-2xl">
              &ldquo;Anyone can use AI tools. I&apos;m learning to build
              them.&rdquo;
            </p>
          </blockquote>
        </Reveal>

        {/* ── Workflow diagram ── */}
        <Reveal delay={0.15} className="mb-16">
          <div>
            <p className="text-label mb-2">How a typical AI system works</p>
            <WorkflowDiagram />
          </div>
        </Reveal>

        {/* ── Project grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {aiProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.07} className="h-full">
              <AICard project={project} index={i} />
            </Reveal>
          ))}
        </div>

      </Container>
    </SectionWrapper>
  );
}
