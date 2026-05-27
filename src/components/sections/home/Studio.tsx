import Image from "next/image";
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
        <div className="flex flex-col items-center py-4">

          <Reveal>
            <p className="text-label text-center mb-8">ALH Studio</p>
          </Reveal>

          <Reveal delay={0.1}>
            <Image
              src="/ALH_Studio_Watermark_Under1MB.png"
              alt="ALH Studio"
              width={180}
              height={90}
              className="opacity-80 object-contain mb-10"
            />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-8">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-foreground/50 hover:text-foreground transition-colors duration-200"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </Reveal>

        </div>
      </Container>
    </SectionWrapper>
  );
}
