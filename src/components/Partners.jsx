import { useRef } from "react";
import { partners } from "../data/content";
import Reveal from "./Reveal";
import { useScrollParallax } from "../lib/useScrollParallax";

function PartnerCard({ p, offset }) {
  const ref = useRef(null);
  useScrollParallax(ref, { distance: offset, scrub: 0.6 });

  return (
    <div
      ref={ref}
      className="group flex h-full flex-col justify-between rounded-[6px] border border-hairline bg-surface/60 p-8 transition-colors duration-500 hover:border-brass/40 md:p-10"
    >
      <div>
        <span className="font-display text-5xl text-brass/50">&ldquo;</span>
        <p className="mt-4 font-display text-xl italic leading-relaxed text-parchment md:text-2xl">
          {p.quote}
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-hairline pt-6">
        <div className="flex items-center gap-4">
          <img
            src={p.photo}
            alt={p.name}
            className="h-14 w-14 rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
          <span className="eyebrow text-parchment">{p.name}</span>
        </div>
        <img
          src={p.mark}
          alt={`${p.name} studio mark`}
          className="h-7 w-auto object-contain opacity-70"
        />
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section className="overflow-hidden bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal scrub y={48} className="mb-14 md:mb-20">
          <p className="eyebrow mb-4 text-moss">{partners.eyebrow}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-parchment md:text-6xl">
            Voices behind the vision
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
          {partners.people.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.12}>
              <PartnerCard p={p} offset={i % 2 === 0 ? 34 : -34} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
