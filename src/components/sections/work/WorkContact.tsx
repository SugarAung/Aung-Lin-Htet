import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Button from "@/components/primitives/Button";

export default function WorkContact() {
  return (
    <SectionWrapper id="work-contact" variant="surface">
      <Container>
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <Reveal>
            <p className="text-label mb-6">Let&apos;s Work Together</p>
            <h2 className="text-display-md font-display italic text-foreground leading-tight mb-8">
              Interested in how I build AI tools, web apps, or creative digital products?
            </h2>
            <Button as="a" href="/contact" variant="primary">
              Contact Me
            </Button>
          </Reveal>
        </div>
      </Container>
    </SectionWrapper>
  );
}
