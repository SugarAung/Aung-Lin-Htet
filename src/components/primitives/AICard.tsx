"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Badge from "@/components/primitives/Badge";
import type { Project } from "@/types";

interface AICardProps {
  project: Project;
  index:   number;
}

export default function AICard({ project, index }: AICardProps) {
  const reduced = useReducedMotion();
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className={cn(
        "flex flex-col w-full min-h-[360px]",
        "bg-surface border border-border rounded-sm p-6",
        "hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)]",
        "transition-[border-color,box-shadow] duration-300"
      )}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-muted-foreground/40">{num}</span>
        <Badge>{project.category.toUpperCase()}</Badge>
      </div>

      {/* AI Concept row */}
      {project.aiConcept && (
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-label shrink-0">Concept</span>
          <span className="font-mono text-xs text-foreground/70 leading-tight">
            {project.aiConcept}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-display italic text-foreground leading-tight mb-3">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
        {project.description}
      </p>

      {/* Divider */}
      <div className="rule mb-4" />

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <Badge key={tag} className="px-2 py-0.5 text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <span className="text-label shrink-0">
          {project.statusLabel ?? project.status}
        </span>

        <div className="flex items-center gap-4">
          {project.caseStudy && (
            <a
              href={project.caseStudy}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Case Study
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
