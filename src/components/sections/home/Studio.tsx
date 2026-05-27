import { Play, Camera, Music2 } from "lucide-react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";

const SOCIALS = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@ALH_Studio",
    icon: Play,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/thealhstudio/",
    icon: Camera,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@thealhstudio",
    icon: Music2,
  },
] as const;

export default function Studio() {
  return (
    <SectionWrapper id="studio" className="border-t border-border">
      <Container>
        <div className="flex flex-col items-center text-center py-16 md:py-24 max-w-2xl mx-auto">

          <Reveal>
            <p className="text-label text-foreground/40 tracking-widest mb-8">
              ALH STUDIO
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
            <p className="text-sm text-muted-foreground/60 max-w-md mb-12">
              Documenting everything — the wins, the failures, and the work in between.
            </p>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex items-center gap-8">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/40 hover:text-foreground transition-colors duration-200"
                >
                  <Icon size={16} />
                  <span className="text-label">{label}</span>
                </a>
              ))}
            </div>
          </Reveal>

        </div>
      </Container>
    </SectionWrapper>
  );
}
