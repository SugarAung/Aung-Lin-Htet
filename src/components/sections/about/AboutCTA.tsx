import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Button from "@/components/primitives/Button";

export default function AboutCTA() {
  return (
    <SectionWrapper id="about-cta" className="border-t border-border">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <p className="text-label mb-6">Download CV</p>
            <h2 className="text-display-md font-display italic text-foreground leading-tight mb-4">
              Want to know more?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-10">
              Download my CV for a full overview of my skills, experience, and
              education.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {/* TODO: Add cv.pdf to public/ directory before this link works */}
              <Button as="a" href="/cv.pdf" variant="primary">
                Download CV
              </Button>
              <Button as="a" href="/contact" variant="outline">
                Get In Touch
              </Button>
            </div>

            {/* TODO: Add cv.pdf to public/ directory */}
          </Reveal>
        </div>
      </Container>
    </SectionWrapper>
  );
}
