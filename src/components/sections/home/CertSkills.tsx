"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Badge from "@/components/primitives/Badge";
import Card from "@/components/primitives/Card";
import { skills } from "@/data/skills";
import { certificates } from "@/data/certificates";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { Skill, Certificate } from "@/types";

const expo: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Skills config ─────────────────────────────────────────────────────────────

type SkillCategory = Skill["category"];

const SKILL_CATEGORIES: { value: SkillCategory; label: string }[] = [
  { value: "ai",        label: "AI & LLM Engineering"   },
  { value: "fullstack", label: "Full-Stack Development"  },
  { value: "data",      label: "Data & Machine Learning" },
  { value: "cloud",     label: "Cloud & Deployment"      },
  { value: "systems",   label: "Systems & Engineering"   },
  { value: "creative",  label: "Creative & Content"      },
  { value: "soft",      label: "Soft Skills"             },
];

// ─── Cert config ───────────────────────────────────────────────────────────────

type CertFilter = "all" | Certificate["category"];

const CERT_FILTERS: { label: string; value: CertFilter }[] = [
  { label: "All",                  value: "all"       },
  { label: "Academic",             value: "academic"  },
  { label: "AI & ML",              value: "ai-ml"     },
  { label: "Cloud",                value: "cloud"     },
  { label: "Software Dev",         value: "software"  },
  { label: "Creative",             value: "creative"  },
  { label: "Personal Development", value: "personal"  },
];

const CERT_CATEGORY_LABELS: Record<Certificate["category"], string> = {
  "academic": "Academic",
  "ai-ml":    "AI & ML",
  "cloud":    "Cloud",
  "software": "Software",
  "creative": "Creative",
  "personal": "Personal Dev",
};

// ─── Skills panel ──────────────────────────────────────────────────────────────

function SkillsPanel() {
  const grouped = useMemo(() => {
    const map = new Map<SkillCategory, Skill[]>();
    for (const cat of SKILL_CATEGORIES) map.set(cat.value, []);
    for (const skill of skills) map.get(skill.category)?.push(skill);
    return map;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {SKILL_CATEGORIES.map(({ value, label }, i) => {
        const categorySkills = grouped.get(value) ?? [];
        return (
          <Reveal key={value} delay={i * 0.07}>
            <Card className="p-5 flex flex-col gap-4 h-full">
              <p className="text-label">{label}</p>
              <div className="flex flex-wrap gap-1.5">
                {categorySkills.map((skill) => (
                  <Badge key={skill.name} className="px-2 py-0.5 text-[10px]">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}

// ─── Cert card ─────────────────────────────────────────────────────────────────

function CertCard({ cert }: { cert: Certificate }) {
  return (
    <article
      onClick={cert.url ? () => window.open(cert.url, "_blank") : undefined}
      className={cn(
        "flex flex-col gap-3 p-5 h-full",
        "bg-surface border border-border rounded-sm",
        "hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)]",
        "transition-[border-color,box-shadow] duration-300",
        cert.url && "cursor-pointer"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-display italic text-foreground leading-snug">
          {cert.title}
        </p>
        <Badge className="shrink-0 self-start text-[9px] px-1.5 py-0.5 whitespace-nowrap">
          {CERT_CATEGORY_LABELS[cert.category]}
        </Badge>
      </div>
      <div className="rule" />
      <div className="flex items-center justify-between mt-auto">
        <p className="text-label">{cert.issuer}</p>
        <span className="font-mono text-[10px] text-muted-foreground/50">
          {cert.date}
        </span>
      </div>
    </article>
  );
}

// ─── Certifications panel ──────────────────────────────────────────────────────

function CertificationsPanel() {
  const [activeFilter, setActiveFilter] = useState<CertFilter>("all");

  const filtered =
    activeFilter === "all"
      ? certificates
      : certificates.filter((c) => c.category === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
        {CERT_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={cn(
              "text-label pb-1 border-b transition-colors duration-200",
              activeFilter === f.value
                ? "text-foreground border-foreground/40"
                : "text-muted-foreground border-transparent hover:text-foreground/70"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cert grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, i) => (
            <motion.div
              key={`${cert.category}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: expo, delay: i * 0.05 }}
              layout
            >
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────────

type ActiveTab = "skills" | "certs";

export default function CertSkills() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("skills");
  const reduced = useReducedMotion();

  return (
    <SectionWrapper id="skills" className="border-t border-border">
      <Container>

        {/* Section header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: expo }}
          className="mb-12"
        >
          <p className="text-label mb-4">Certifications & Skills</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            What I know,{" "}
            <span className="text-muted-foreground">what I&apos;ve earned.</span>
          </h2>
        </motion.div>

        {/* Tab switcher */}
        <div className="flex gap-x-8 mb-12 border-b border-border pb-4">
          {(["skills", "certs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "text-label pb-1 border-b-2 -mb-[17px] transition-colors duration-200",
                activeTab === tab
                  ? "text-foreground border-foreground/50"
                  : "text-muted-foreground border-transparent hover:text-foreground/70"
              )}
            >
              {tab === "skills" ? "Skills" : "Certifications"}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <AnimatePresence mode="wait">
          {activeTab === "skills" ? (
            <motion.div
              key="skills"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: expo }}
            >
              <SkillsPanel />
            </motion.div>
          ) : (
            <motion.div
              key="certs"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: expo }}
            >
              <CertificationsPanel />
            </motion.div>
          )}
        </AnimatePresence>

      </Container>
    </SectionWrapper>
  );
}
