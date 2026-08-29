import { associations } from "../data/content";
import Reveal from "./Reveal";

export default function Associations() {
  return (
    <section className="border-y border-hairline bg-ink px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow text-parchment-dim">{associations.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap items-center justify-center gap-x-14 gap-y-10">
          {associations.logos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="MUREC association partner"
              className="h-10 w-auto object-contain opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:h-12"
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
