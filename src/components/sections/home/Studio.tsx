import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Button from "@/components/primitives/Button";
import Reveal from "@/components/primitives/Reveal";

export default function Studio() {
  return (
    <SectionWrapper id="studio" className="border-t border-border">
      <Container>
        <div className="flex flex-col items-center text-center py-16 md:py-24 max-w-2xl mx-auto">

          <Reveal>
            <p className="text-label text-foreground/40 tracking-widest mb-8">
              ALH Studio
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-display-xl font-display italic text-foreground leading-none mb-8">
              Building my life<br />one day at a time.
            </h2>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-col gap-1 mb-8">
              <p className="text-base md:text-lg text-muted-foreground">
                Daily progress journal.
              </p>
              <p className="text-base md:text-lg text-muted-foreground">
                Maxing Out My Stats.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-base text-muted-foreground leading-relaxed mb-12 max-w-xl">
              I&apos;m just building my own journey, writing my own story as
              it happens. If anything on this page resonates, drop a follow
              or let&apos;s connect.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                as="a"
                href="https://www.youtube.com/@ALH_Studio"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                YouTube ↗
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
              <Button
                as="a"
                href="https://www.tiktok.com/@thealhstudio"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                TikTok ↗
              </Button>
              <Button
                as="a"
                href="https://www.linkedin.com/in/aung-lin-htet/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
              >
                LinkedIn ↗
              </Button>
            </div>
          </Reveal>

        </div>
      </Container>
    </SectionWrapper>
  );
}
