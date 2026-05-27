import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Badge from "@/components/primitives/Badge";
import { projects } from "@/data/projects";

const CASE_STUDY_SLUGS = [
  "cv-helper-ai",
  "feedback-rag-agent",
  "premier-league-prediction",
] as const;

const CATEGORY_LABELS: Record<string, string> = {
  ai:         "AI",
  web:        "Web App",
  ml:         "ML",
  client:     "Client",
  creative:   "Creative",
  automation: "Automation",
};

export default function FeaturedCaseStudies() {
  const featured = CASE_STUDY_SLUGS.map((slug) =>
    projects.find((p) => p.slug === slug)
  ).filter(Boolean);

  return (
    <SectionWrapper id="case-studies" className="border-b border-border">
      <Container>

        {/* ── Section header ── */}
        <Reveal>
          <p className="text-label mb-4">Featured</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl mb-4">
            Deep Dives
          </h2>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed mb-16">
            A closer look at three projects that shaped how I think about building with AI.
          </p>
        </Reveal>

        {/* ── Case study cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((project, i) => {
            if (!project) return null;
            const visibleTags = project.tags.slice(0, 4);
            const extraCount = project.tags.length - visibleTags.length;

            return (
              <Reveal key={project.id} delay={i * 0.12}>
                <article className="flex flex-col h-full bg-surface border border-border rounded-sm p-7 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)] transition-[border-color,box-shadow] duration-300">

                  {/* AI concept */}
                  {project.aiConcept && (
                    <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-4">
                      {project.aiConcept}
                    </p>
                  )}

                  {/* Category badge */}
                  <div className="mb-4">
                    <Badge>{CATEGORY_LABELS[project.category] ?? project.category}</Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-display italic text-foreground leading-tight mb-3">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Divider */}
                  <div className="rule mb-4" />

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {visibleTags.map((tag) => (
                      <Badge key={tag} className="px-2 py-0.5 text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                    {extraCount > 0 && (
                      <span className="text-[10px] font-mono text-muted-foreground/50 self-center">
                        +{extraCount} more
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-3 mt-auto">
                    <span className="text-label shrink-0">
                      {project.statusLabel ?? project.status}
                    </span>

                    <span
                      aria-disabled="true"
                      className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/40 cursor-default select-none"
                      title="Case study coming soon"
                    >
                      Case Study (Soon)
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

      </Container>
    </SectionWrapper>
  );
}
