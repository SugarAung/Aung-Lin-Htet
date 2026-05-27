"use client";

import { useState, useCallback } from "react";
import { Mail, Briefcase, Code2, Camera, FileText, Play, Music2 } from "lucide-react";
import Container from "@/components/primitives/Container";
import SectionWrapper from "@/components/primitives/SectionWrapper";
import Reveal from "@/components/primitives/Reveal";
import Button from "@/components/primitives/Button";

// ─── Update contact details here ─────────────────────────────────────────────
const EMAIL = "aunglinhtet710@gmail.com";

const CONTACT_ITEMS = [
  {
    id: "email",
    icon: Mail,
    label: "Email",
    display: EMAIL,
    cta: "Copy Email",
    href: null,
  },
  {
    id: "linkedin",
    icon: Briefcase,
    label: "LinkedIn",
    display: "/in/aung-lin-htet",
    cta: "Connect",
    href: "https://www.linkedin.com/in/aung-lin-htet/",
  },
  {
    id: "github",
    icon: Code2,
    label: "GitHub",
    display: "github.com/SugarAung",
    cta: "View Code",
    href: "https://github.com/SugarAung",
  },
  {
    id: "instagram",
    icon: Camera,
    label: "Instagram",
    display: "@thealhstudio",
    cta: "Follow",
    href: "https://www.instagram.com/thealhstudio/",
  },
  {
    id: "tiktok",
    icon: Music2,
    label: "TikTok",
    display: "@thealhstudio",
    cta: "Follow",
    href: "https://www.tiktok.com/@thealhstudio",
  },
  {
    id: "youtube",
    icon: Play,
    label: "YouTube",
    display: "@ALH_Studio",
    cta: "Subscribe",
    href: "https://www.youtube.com/@ALH_Studio",
  },
  {
    id: "cv",
    icon: FileText,
    label: "Resume / CV",
    display: "Aung Lin Htet — CV",
    cta: "Download PDF",
    href: "/cv.pdf",
  },
] as const;

function EmailCard({
  delay,
}: {
  delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open mail client
      window.location.href = `mailto:${EMAIL}`;
    }
  }, []);

  return (
    <Reveal delay={delay}>
      <article className="flex flex-col h-full bg-surface border border-border rounded-sm p-6 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)] transition-[border-color,box-shadow] duration-300">
        <Mail size={24} className="text-foreground mb-4" />
        <p className="text-label mb-1">Email</p>
        <p className="text-sm font-display italic text-foreground mb-6 flex-1 break-all">
          {EMAIL}
        </p>
        <Button variant="ghost" onClick={handleCopy} className="self-start px-0">
          {copied ? "Copied!" : "Copy Email"}
        </Button>
      </article>
    </Reveal>
  );
}

function LinkCard({
  item,
  delay,
}: {
  item: (typeof CONTACT_ITEMS)[number];
  delay: number;
}) {
  const Icon = item.icon;
  const isCV = item.id === "cv";

  return (
    <Reveal delay={delay}>
      <article className="flex flex-col h-full bg-surface border border-border rounded-sm p-6 hover:border-foreground/20 hover:shadow-[0_8px_32px_rgba(240,237,232,0.07)] transition-[border-color,box-shadow] duration-300">
        <Icon size={24} className="text-foreground mb-4" />
        <p className="text-label mb-1">{item.label}</p>
        <p className="text-sm font-display italic text-foreground mb-6 flex-1">
          {item.display}
        </p>
        {isCV ? (
          <Button
            as="a"
            href={item.href ?? "#"}
            variant="primary"
            className="self-start"
          >
            {item.cta}
          </Button>
        ) : (
          <a
            href={item.href ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-200 self-start pb-1 border-b border-transparent hover:border-foreground/30"
          >
            {item.cta} ↗
          </a>
        )}
      </article>
    </Reveal>
  );
}

export default function ContactCards() {
  return (
    <SectionWrapper id="contact-cards" className="border-b border-border">
      <Container>
        <Reveal className="mb-14">
          <p className="text-label mb-4">Contact</p>
          <h2 className="text-display-md font-display italic text-foreground max-w-2xl">
            Ways to reach me.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTACT_ITEMS.map((item, i) =>
            item.id === "email" ? (
              <EmailCard key="email" delay={i * 0.07} />
            ) : (
              <LinkCard key={item.id} item={item} delay={i * 0.07} />
            )
          )}
        </div>
      </Container>
    </SectionWrapper>
  );
}
