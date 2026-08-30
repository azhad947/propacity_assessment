import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";


export default function ParallaxImage({
  children,
  speed = 0.14,
  className = "",
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const trigger = el?.parentElement;
    if (!el || !trigger || prefersReducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`absolute inset-x-0 -top-[16%] h-[132%] w-full ${className}`}
    >
      {children}
    </div>
  );
}
