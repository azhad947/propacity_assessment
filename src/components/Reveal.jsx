import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

// scrub=false  → one-shot entrance (original behaviour)
// scrub=true   → element slides continuously tied to scroll position
export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className = "",
  scrub = false,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      if (scrub) {
        // Slide from below into place as the element scrolls into view,
        // then drift upward as it scrolls out — continuous, scrubbed motion.
        gsap.fromTo(
          el,
          { opacity: 0, y: y * 1.5 },
          {
            opacity: 1,
            y: -y * 0.4,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 20%",
              scrub: 1.2,
            },
          },
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, y, scrub]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
