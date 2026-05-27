"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Badge from "@/components/primitives/Badge";
import type { LabItem, LabStatus } from "@/data/lab";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Subtle color hints per status — stays within the dark theme
const STATUS_STYLES: Record<LabStatus, string> = {
  exploring: "border-foreground/15 text-foreground/40",
  building:  "border-blue-500/25 text-blue-400/60",
  shipped:   "border-green-500/25 text-green-400/70",
  improving: "border-amber-500/25 text-amber-400/60",
  paused:    "border-foreground/[0.08] text-foreground/20",
  ongoing:   "border-foreground/20 text-foreground/55",
};

interface LabCardProps {
  item: LabItem;
  index: number;
}

export default function LabCard({ item, index }: LabCardProps) {
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
      transition={{ duration: 0.25, ease: expo }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-xs text-muted-foreground/40">{num}</span>

        {/* Status badge — custom colors, not using Badge primitive */}
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono tracking-wider uppercase rounded-sm border",
            STATUS_STYLES[item.status]
          )}
        >
          {item.statusLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-display italic text-foreground leading-tight mb-3">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
        {item.description}
      </p>

      {/* Divider */}
      <div className="rule mb-4" />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {item.tags.map((tag) => (
          <Badge key={tag} className="px-2 py-0.5 text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 mt-auto">
        <span className="text-label shrink-0">{item.statusLabel}</span>

        <div className="flex items-center gap-4">
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              GitHub
            </a>
          )}
          {item.demo && (
            <a
              href={item.demo}
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
