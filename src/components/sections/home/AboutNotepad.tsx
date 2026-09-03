"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ITEMS = ["Study", "Train", "Build", "Post", "Journal"] as const;

// ─── Paper layout (scaled up ~18% from the original, all dimensions together) ─
const PAPER_WIDTH = 260;
const PAPER_HEIGHT = 305;
const PAPER_PAD_X = 24;
const LINE_TOP = 47; // first rule line's offset from the paper's top
const LINE_GAP = 42; // vertical spacing between rule lines
const RULE_COUNT = 6; // 5 for the items, 1 spare blank line beneath

// ─── Timing (seconds) ──────────────────────────────────────────────────────
const FILL_ITEM_DURATION = 0.28;
const FILL_STAGGER = 0.35;
const HOLD_AFTER_FILL = 0.65;
const STRIKE_DURATION = 0.32;
const STRIKE_GAP = 0.22;
const HOLD_AFTER_CROSS = 0.5;
const TEAR_DURATION = 0.55;
const PAUSE_AFTER_TEAR = 0.15;
const FADE_IN_NEW_SHEET = 0.3;

const sleep = (seconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));

function randomTilt() {
  // Always a noticeable few degrees, either direction — never near-flat.
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * (1.5 + Math.random() * 2); // 1.5°–3.5°
}

export default function AboutNotepad() {
  const reduced = useReducedMotion();

  const paperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const strikeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const paper = paperRef.current;
    if (!paper) return;

    // Instant reset via animate() (not raw style) so motion's own transform
    // tracking starts from a value it set itself, rather than a raw inline
    // style it doesn't know about.
    function resetSheet(visible: boolean) {
      if (!paper) return;
      animate(paper, { rotate: randomTilt(), x: 0, y: 0, opacity: visible ? 1 : 0 }, { duration: 0 });
      itemRefs.current.forEach((el) => el && animate(el, { opacity: 0, y: 6 }, { duration: 0 }));
      strikeRefs.current.forEach((el) => el && animate(el, { scaleX: 0 }, { duration: 0 }));
    }

    if (reduced) {
      // Static: all 5 items visible, none crossed off, no loop running.
      animate(paper, { rotate: randomTilt(), x: 0, y: 0, opacity: 1 }, { duration: 0 });
      itemRefs.current.forEach((el) => el && animate(el, { opacity: 1, y: 0 }, { duration: 0 }));
      strikeRefs.current.forEach((el) => el && animate(el, { scaleX: 0 }, { duration: 0 }));
      return;
    }

    let cancelled = false;
    resetSheet(true); // start visible, items blank — the FILL phase's starting point

    async function runCycle() {
      if (cancelled || !paper) return;

      // ── FILL — items appear one at a time ──
      let lastFill: ReturnType<typeof animate> | null = null;
      for (let i = 0; i < ITEMS.length; i++) {
        if (cancelled) return;
        const el = itemRefs.current[i];
        if (el) {
          lastFill = animate(el, { opacity: 1, y: 0 }, { duration: FILL_ITEM_DURATION, ease: "easeOut" });
        }
        await sleep(FILL_STAGGER);
      }
      if (lastFill) await lastFill;
      if (cancelled) return;

      // ── HOLD ──
      await sleep(HOLD_AFTER_FILL);
      if (cancelled) return;

      // ── CROSS OFF — top to bottom, animated strikethrough per item ──
      for (let i = 0; i < ITEMS.length; i++) {
        if (cancelled) return;
        const el = strikeRefs.current[i];
        if (el) await animate(el, { scaleX: 1 }, { duration: STRIKE_DURATION, ease: "easeInOut" });
        await sleep(STRIKE_GAP);
      }
      if (cancelled) return;

      // ── HOLD, then TEAR ──
      await sleep(HOLD_AFTER_CROSS);
      if (cancelled || !paper) return;

      await animate(
        paper,
        { y: -46, x: 26, rotate: 14, opacity: 0 },
        { duration: TEAR_DURATION, ease: [0.16, 1, 0.3, 1] }
      );
      if (cancelled) return;

      // ── Fresh blank sheet: instant reset (invisible), then fade in ──
      await sleep(PAUSE_AFTER_TEAR);
      if (cancelled) return;
      resetSheet(false);
      if (cancelled || !paper) return;
      await animate(paper, { opacity: 1 }, { duration: FADE_IN_NEW_SHEET });
    }

    (async () => {
      while (!cancelled) {
        await runCycle();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <div
      className="hidden lg:flex flex-none items-center justify-center"
      style={{ width: 310, height: 330 }}
      aria-hidden="true"
    >
      <div
        ref={paperRef}
        className="relative bg-surface border border-border rounded-sm shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
        style={{ width: PAPER_WIDTH, height: PAPER_HEIGHT }}
      >
        {Array.from({ length: RULE_COUNT }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-border"
            style={{ left: PAPER_PAD_X, right: PAPER_PAD_X, top: LINE_TOP + i * LINE_GAP }}
          />
        ))}

        <ul className="absolute inset-0">
          {ITEMS.map((text, i) => (
            <li key={text} className="absolute" style={{ left: PAPER_PAD_X, top: LINE_TOP + i * LINE_GAP - 24 }}>
              <span
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className="relative inline-block text-base text-foreground font-sans"
              >
                {text}
                <span
                  ref={(el) => {
                    strikeRefs.current[i] = el;
                  }}
                  className="absolute left-0 top-1/2 h-px w-full bg-foreground"
                  style={{ transformOrigin: "left" }}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
