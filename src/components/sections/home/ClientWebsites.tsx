"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Badge from "@/components/primitives/Badge";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clientWebsites, type ClientWebsite } from "@/data/clientWebsites";
import { cn } from "@/lib/utils";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── BrowserMockupCard ────────────────────────────────────────────────────────

interface BrowserMockupCardProps {
  site: ClientWebsite;
  reduced: boolean;
}

function BrowserMockupCard({ site, reduced }: BrowserMockupCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      className={cn(
        "flex flex-col w-full h-full",
        "bg-surface border border-border rounded-sm overflow-hidden",
        "hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)]",
        "transition-[border-color,box-shadow] duration-300"
      )}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: expo }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* ── Browser chrome bar ── */}
      <div
        className="bg-muted border-b border-border px-3 py-2.5 flex items-center gap-2"
        aria-hidden
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 flex-none" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 flex-none" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 flex-none" />
        <div className="flex-1 bg-background/60 rounded-sm px-2.5 py-1 ml-1 font-mono text-[10px] text-muted-foreground/40 truncate">
          {site.url ?? "example.com"}
        </div>
      </div>

      {/* ── Screenshot area (16:9) ── */}
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-surface to-muted">
        {/* Real screenshot when available */}
        {site.cover && (
          <Image
            src={site.cover}
            alt={`${site.name} website screenshot`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        )}

        {/* Grid texture — shows through when no screenshot */}
        {!site.cover && (
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}

        {/* Hover overlay — reveals "handled" list */}
        <motion.div
          className="absolute inset-0 bg-background/85 flex flex-col justify-center px-6 gap-2 z-10"
          animate={{ opacity: !reduced && hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          aria-hidden={!hovered}
        >
          <p className="text-label mb-1">What I handled</p>
          {site.handled.map((item) => (
            <p key={item} className="text-sm text-foreground/80 leading-snug">
              — {item}
            </p>
          ))}
        </motion.div>
      </div>

      {/* ── Card body ── */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-display italic text-foreground leading-tight">
            {site.name}
          </h3>
          <Badge className="shrink-0 self-start">{site.clientType}</Badge>
        </div>

        <p className="text-label">{site.role}</p>

        <div className="rule" />

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {site.tech.map((tag) => (
            <Badge key={tag} className="px-2 py-0.5 text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer — pinned to bottom */}
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-label">{site.status}</span>
            <span className="font-mono text-xs text-muted-foreground/40">{site.year}</span>
          </div>
          {site.url ? (
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 self-start pb-1 border-b border-transparent hover:border-foreground/30"
            >
              Visit Site ↗
            </a>
          ) : (
            <span className="text-[11px] font-mono uppercase tracking-wider text-foreground/20">
              In Development
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── ClientWebsites section ───────────────────────────────────────────────────

export default function ClientWebsites() {
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="clientwebsites" className="border-t border-border">
      <Container>

        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
          className="mb-14"
        >
          <p className="text-label mb-4">Client Websites &amp; Digital Products</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            Real clients,{" "}
            <span className="text-muted-foreground">real projects.</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
            Paid web development — from layout and design to deployment. 3 live,
            1 in development.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {clientWebsites.map((site, i) => (
            <Reveal key={site.id} delay={i * 0.08} className="h-full">
              <BrowserMockupCard site={site} reduced={reduced} />
            </Reveal>
          ))}
        </div>

      </Container>
    </SectionWrapper>
  );
}
