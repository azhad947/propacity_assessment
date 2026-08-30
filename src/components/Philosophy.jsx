import { useRef } from "react";
import { philosophy } from "../data/content";
import Reveal from "./Reveal";
import { useScrollParallax } from "../lib/useScrollParallax";

export default function Philosophy() {
  const blobA = useRef(null);
  const blobB = useRef(null);
  useScrollParallax(blobA, { distance: 120, scrub: 0.5 });
  useScrollParallax(blobB, { distance: -90, scrub: 0.5 });

  return (
    <section className="relative overflow-hidden bg-ink-2 px-6 py-24 md:px-10 md:py-36">

      <div
        ref={blobA}
        className="pointer-events-none absolute -left-32 top-0 h-[26rem] w-[26rem] rounded-full bg-moss/15 blur-[110px]"
      />
      <div
        ref={blobB}
        className="pointer-events-none absolute -right-24 bottom-0 h-[22rem] w-[22rem] rounded-full bg-brass/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal scrub y={48}>
          <p className="eyebrow mb-6 text-moss">{philosophy.eyebrow}</p>
          <h2 className="font-display text-4xl leading-[1.1] text-parchment md:text-6xl">
            {philosophy.title}
          </h2>
        </Reveal>

        <Reveal scrub y={36} delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-parchment-dim md:text-lg">
            {philosophy.body}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10">
          <a
            href={philosophy.cta.href}
            className="eyebrow inline-flex items-center gap-3 rounded-full border border-moss/60 px-7 py-4 text-parchment transition-colors hover:bg-moss hover:text-ink"
          >
            {philosophy.cta.label}
            <span>→</span>
          </a>
        </Reveal>

        <Reveal
          delay={0.3}
          className="mt-16 flex items-center justify-center gap-8 text-parchment-dim"
        >
          <span className="eyebrow">Resource Efficient</span>
          <span className="h-1 w-1 rounded-full bg-parchment-dim" />
          <span className="eyebrow">Healthier Living</span>
          <span className="hidden h-1 w-1 rounded-full bg-parchment-dim sm:block" />
          <span className="eyebrow hidden sm:block">Long-Term Impact</span>
        </Reveal>
      </div>
    </section>
  );
}
