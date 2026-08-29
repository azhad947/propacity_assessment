import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/gsap";

// One smooth-scroll engine for the whole app. Lenis owns the actual scroll
// physics (the momentum/easing that makes scrolling itself feel premium);
// GSAP's ticker drives Lenis's rAF loop so every ScrollTrigger-based
// animation reads from the same clock instead of two rAF loops drifting out
// of sync with each other, which is what causes scroll-linked animation to
// feel laggy or stuttery.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
