import { useRef } from "react";
import { contact } from "../data/content";
import Reveal from "./Reveal";
import { useScrollParallax } from "../lib/useScrollParallax";

export default function Contact() {
  const glow = useRef(null);
  useScrollParallax(glow, { distance: 100, scrub: 0.5 });

  return (
    <section className="relative overflow-hidden bg-ink-2 px-6 py-24 md:px-10 md:py-32">
      <div
        ref={glow}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass/10 blur-[130px]"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal scrub y={48}>
          <p className="eyebrow mb-6 text-brass-bright">Let's Connect</p>
          <h2 className="font-display text-4xl leading-[1.05] text-parchment md:text-6xl">
            {contact.title}
          </h2>
        </Reveal>
        <Reveal scrub y={36} delay={0.15}>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-parchment-dim md:text-lg">
            {contact.body}
          </p>
        </Reveal>
        <Reveal delay={0.28} className="mt-10">
          <a
            href={contact.cta.href}
            className="eyebrow inline-flex items-center gap-3 rounded-full bg-brass px-8 py-4 text-ink transition-transform duration-300 hover:scale-[1.03] hover:bg-brass-bright"
          >
            {contact.cta.label}
            <span>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
