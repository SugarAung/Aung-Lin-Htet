import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Badge from "@/components/primitives/Badge";

const CAPABILITIES = [
  {
    title: "AI Applications",
    description:
      "RAG systems, LLM agents, prompt engineering, and Claude workflows that solve real problems.",
    tags: ["AI", "RAG", "LLM", "Agents"],
  },
  {
    title: "Full-Stack Web Apps",
    description:
      "End-to-end web applications with React, Next.js, and FastAPI — from UI to deployment.",
    tags: ["React", "Next.js", "FastAPI", "TypeScript"],
  },
  {
    title: "Automation Systems",
    description:
      "Python scripts and pipelines that replace repetitive manual workflows with reliable automation.",
    tags: ["Python", "Automation", "Scripting"],
  },
  {
    title: "Client Websites",
    description:
      "Responsive, production-ready websites built, deployed, and maintained for real clients.",
    tags: ["HTML", "CSS", "JavaScript", "Deployment"],
  },
  {
    title: "Creative Digital Content",
    description:
      "Video editing, social media content, and digital storytelling through The ALH Studio.",
    tags: ["Video", "Adobe Premiere", "Content"],
  },
] as const;

export default function AboutWhatIDo() {
  return (
    <SectionWrapper id="about-what-i-do" className="border-b border-border">
      <Container>
        <Reveal className="mb-14">
          <p className="text-label mb-4">What I Do</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl">
            From AI systems{" "}
            <span className="text-muted-foreground">to creative products.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.07}>
              <article className="flex flex-col h-full bg-surface border border-border rounded-sm p-6 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)] transition-[border-color,box-shadow] duration-300">
                <h3 className="text-xl font-display italic text-foreground leading-tight mb-3">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {cap.description}
                </p>
                <div className="rule mb-4" />
                <div className="flex flex-wrap gap-1.5">
                  {cap.tags.map((tag) => (
                    <Badge key={tag} className="px-2 py-0.5 text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
