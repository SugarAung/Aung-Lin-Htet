import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Button from "@/components/primitives/Button";
import Reveal from "@/components/primitives/Reveal";

export default function HomeContact() {
  return (
    <SectionWrapper id="contact" className="border-t border-border">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-label mb-6">Get In Touch</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-display-md font-display italic text-foreground mb-6">
              Let&apos;s build something{" "}
              <span className="text-muted-foreground">worth building.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-xl">
              Open to freelance projects, collaborations, and full-time roles. If
              you have something interesting in mind, reach out.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="flex flex-wrap gap-3">
              <Button
                as="a"
                href="mailto:aunglinhtet710@gmail.com"
                variant="primary"
              >
                Send Me an Email
              </Button>
              <Button
                as="a"
                href="mailto:aunglinhtet710@gmail.com"
                variant="outline"
              >
                aunglinhtet710@gmail.com
              </Button>
              <Button
                as="a"
                href="https://www.instagram.com/thealhstudio/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                Instagram ↗
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </SectionWrapper>
  );
}
