import Lenis from "lenis";

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

export function createLenis(): Lenis {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
  });
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}
