"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const links = [
  { href: "#journey", label: "Journey" },
  { href: "#skills",  label: "Skills"  },
  { href: "#work",    label: "Work"    },
  { href: "#contact", label: "Contact" },
];

const SECTION_IDS = ["journey", "skills", "work", "contact"];

export default function Nav() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScrollSpy = () => {
      const scrollY = window.scrollY;
      let current = "";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScrollSpy, { passive: true });
    onScrollSpy();
    return () => window.removeEventListener("scroll", onScrollSpy);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 md:px-10",
        "transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="flex items-center gap-2.5"
      >
        <Image
          src="/images/profile.png"
          alt=""
          width={32}
          height={32}
          className="rounded-full object-cover opacity-70 hover:opacity-100 transition-opacity"
        />
        <span className="hidden sm:block text-sm font-sans text-foreground/70 hover:text-foreground transition-colors">
          Aung Lin Htet
        </span>
      </button>

      <nav aria-label="Main navigation" className="flex items-center gap-6 md:gap-10">
        {links.map(({ href, label }) => {
          const id = href.replace("#", "");
          return (
            <a
              key={href}
              href={href}
              className={cn(
                "text-label hover:text-foreground transition-colors",
                activeSection === id ? "text-foreground" : "text-foreground/40"
              )}
            >
              {label}
            </a>
          );
        })}
        <a
          href="https://github.com/SugarAung"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-foreground/40 hover:text-foreground transition-colors"
        >
          <Code2 size={16} />
        </a>
      </nav>
    </motion.header>
  );
}
