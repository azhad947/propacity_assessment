import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";


export function useScrollParallax(ref, { distance = 60, scrub = 0.7 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [distance, scrub]);
}

export function refresh() {
  ScrollTrigger.refresh();
}
