import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";

const FOCUS_ITEMS = [
  "Claude workflows",
  "RAG systems",
  "AI agents",
  "Full-stack AI apps",
  "Client websites",
  "The ALH Studio",
  "Video & digital storytelling",
] as const;

export default function AboutCurrentFocus() {
  return (
    <SectionWrapper id="about-focus" variant="surface" className="border-t border-border">
      <Container>
        <Reveal className="mb-12">
          <p className="text-label mb-4">Current Focus</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl">
            What I&apos;m building{" "}
            <span className="text-muted-foreground">right now.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-3">
            {FOCUS_ITEMS.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-5 py-2.5 text-sm font-mono tracking-wide text-foreground border border-border rounded-sm hover:border-foreground/30 transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </SectionWrapper>
  );
}
