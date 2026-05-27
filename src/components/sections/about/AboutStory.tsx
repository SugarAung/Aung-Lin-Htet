import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";

export default function AboutStory() {
  return (
    <SectionWrapper id="about-story" className="border-b border-border">
      <Container>
        <Reveal className="mb-4">
          <p className="text-label">My Story</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — opening headline */}
          <Reveal delay={0.05}>
            <h2 className="text-display-md font-display italic text-foreground leading-tight">
              Building at the intersection of AI, code,{" "}
              <span className="text-muted-foreground">and creativity.</span>
            </h2>
          </Reveal>

          {/* Right — narrative paragraphs */}
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-5">
              <p className="text-base text-muted-foreground leading-relaxed">
                I work across AI engineering, full-stack development,
                automation, and creative media. My current focus includes RAG
                systems, LLM agents, Claude workflows, AI-assisted coding, and
                practical software projects.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Through The ALH Studio, I also explore video editing, social
                media content, client websites, and digital storytelling —
                combining technical depth with creative direction.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </SectionWrapper>
  );
}
