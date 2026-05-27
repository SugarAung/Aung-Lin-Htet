"use client";

import { createContext, useEffect, useState } from "react";
import type Lenis from "lenis";
import { createLenis, destroyLenis } from "@/lib/lenis";
import { registerGSAP, ScrollTrigger } from "@/lib/gsap";

export const LenisContext = createContext<Lenis | null>(null);

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    registerGSAP();
    const instance = createLenis();
    // Initialization — reading external system state into React on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    // Drive GSAP ScrollTrigger via Lenis RAF
    instance.on("scroll", ScrollTrigger.update);

    let rafId: number;
    const loop = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      destroyLenis();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
