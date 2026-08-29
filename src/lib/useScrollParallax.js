import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

// Ties an element's vertical position directly to scroll progress through its
// own section (scrub, not a viewport-enter trigger) — the element keeps
// drifting continuously as the user scrolls instead of popping in once and
// sitting still, which is what makes a parallax read as premium rather than
// a "reveal".
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [distance, scrub]);
}

export function refresh() {
  ScrollTrigger.refresh();
}
