"use client";

import { useEffect, useRef } from "react";
import Container from "@/components/primitives/Container";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Step {
  num: string;
  label: string;
  desc: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    label: "AI Builder",
    desc: "RAG systems, LLM workflows, agent-based tools, and AI apps — built from scratch, not just configured.",
  },
  {
    num: "02",
    label: "Software Developer",
    desc: "Full-stack web apps, APIs, automation pipelines, and deployable products.",
  },
  {
    num: "03",
    label: "Content Creator",
    desc: "Personal development content on YouTube, Instagram, and TikTok. On hiatus — restarting September 2026.",
  },
];

// ─── Mobile view ──────────────────────────────────────────────────────────────

function MobileView() {
  return (
    <section className="lg:hidden border-t border-border">
      <Container className="py-20">
        <p className="text-label mb-10">Three ways I build.</p>
        <div className="flex flex-col">
          {STEPS.map(({ num, label, desc }, i) => (
            <div
              key={num}
              className={`py-10 ${i < STEPS.length - 1 ? "border-b border-border" : ""}`}
            >
              <p className="text-label mb-4">{num}</p>
              <h3 className="text-2xl md:text-3xl font-display italic text-foreground mb-4 leading-tight">
                {label}.
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Identity Scroll (desktop, GSAP-driven) ───────────────────────────────────

export default function IdentityScroll() {
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Skip on mobile or reduced motion
    if (typeof window === "undefined" || window.innerWidth < 1024 || reduced) {
      return;
    }

    registerGSAP();

    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    const bars = stepBarRefs.current.filter(Boolean) as HTMLDivElement[];
    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];

    if (panels.length !== 3) return;

    // ── Initial state ────────────────────────────────────────────────────────
    gsap.set(panels[0], { opacity: 1, y: 0 });
    gsap.set(panels[1], { opacity: 0, y: 50 });
    gsap.set(panels[2], { opacity: 0, y: 50 });

    // ── Build timeline ────────────────────────────────────────────────────────
    // Duration 2: 2 transitions (step 0→1 and step 1→2)
    const tl = gsap.timeline();

    // Transition 0→1
    tl.to(panels[0], { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" }, 0);
    tl.to(panels[1], { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }, 0);

    // Transition 1→2
    tl.to(panels[1], { opacity: 0, y: -50, duration: 1, ease: "power2.inOut" }, 1);
    tl.to(panels[2], { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" }, 1);

    // ── Update indicators on scroll ──────────────────────────────────────────
    function updateIndicators(progress: number) {
      const active = Math.min(Math.floor(progress * 3), 2);

      bars.forEach((bar, i) => {
        bar.style.opacity = i === active ? "1" : "0.18";
        bar.style.transform = `scaleX(${i === active ? 1 : 0.55})`;
      });

      nodes.forEach((node, i) => {
        node.style.opacity = i === active ? "0.28" : "0.07";
      });

      if (counterRef.current) {
        counterRef.current.textContent = `0${active + 1}`;
      }
    }

    // ── ScrollTrigger ─────────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1200",
        pin: true,
        scrub: 1.5,
        animation: tl,
        onUpdate: (self) => updateIndicators(self.progress),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      {/* ─── Mobile ─────────────────────────────────────────────────────── */}
      <MobileView />

      {/* ─── Desktop ────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="hidden lg:flex items-center min-h-screen border-t border-border relative"
      >
        {/* Background glow orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
        >
          {/* Orb A — top right */}
          <div
            className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(240,237,232,0.025) 0%, transparent 70%)",
            }}
          />
          {/* Orb B — bottom left */}
          <div
            className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(240,237,232,0.02) 0%, transparent 70%)",
            }}
          />

          {/* Glow nodes — one per step */}
          {([
            { top: "22%", right: "20%" },
            { top: "50%", right: "12%" },
            { top: "72%", right: "28%" },
          ] as const).map(({ top, right }, i) => (
            <div
              key={i}
              ref={(el) => { nodeRefs.current[i] = el; }}
              className="absolute transition-opacity duration-700"
              style={{ top, right, opacity: i === 0 ? 0.28 : 0.07 }}
            >
              {/* Halo */}
              <div
                className="absolute -inset-6 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(240,237,232,0.15) 0%, transparent 70%)",
                }}
              />
              {/* Core dot */}
              <div className="relative w-2 h-2 rounded-full bg-foreground/40" />
            </div>
          ))}
        </div>

        <Container className="relative z-10 py-20">
          <div className="grid grid-cols-[2fr_3fr] gap-20 items-center min-h-[calc(100vh-10rem)]">

            {/* ── Left: heading + step indicators ── */}
            <div className="flex flex-col justify-between h-full py-8">
              <div>
                <p className="text-label mb-8">Three ways I build.</p>

                {/* Step bars */}
                <div className="flex flex-col gap-5">
                  {STEPS.map(({ num, label }, i) => (
                    <div key={num} className="flex items-center gap-4">
                      {/* Progress bar */}
                      <div
                        ref={(el) => { stepBarRefs.current[i] = el; }}
                        className="h-px w-12 bg-foreground origin-left transition-all duration-500"
                        style={{ opacity: i === 0 ? 1 : 0.18, transform: `scaleX(${i === 0 ? 1 : 0.55})` }}
                      />
                      <span
                        className="text-label transition-opacity duration-500"
                        style={{ opacity: i === 0 ? 1 : 0.18 }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step counter */}
              <p className="text-label">
                <span ref={counterRef}>01</span>
                {" / 03"}
              </p>
            </div>

            {/* ── Right: content panels (absolutely stacked) ── */}
            <div className="relative h-[55vh] overflow-hidden">
              {STEPS.map(({ num, label, desc }, i) => (
                <div
                  key={num}
                  ref={(el) => { panelRefs.current[i] = el; }}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    transform: i === 0 ? "translateY(0)" : "translateY(50px)",
                  }}
                >
                  <p className="text-label mb-6" style={{ opacity: 0.4 }}>
                    {num}
                  </p>
                  <h2 className="text-display-lg font-display italic text-foreground leading-none mb-8">
                    {label}.
                  </h2>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
