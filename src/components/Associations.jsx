import { associations } from "../data/content";
import Reveal from "./Reveal";

function MarqueeTrack({ logos, reverse = false }) {
  const items = [...logos, ...logos, ...logos];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <ul
        className={`flex shrink-0 items-center gap-14 py-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        aria-hidden="true"
      >
        {items.map((src, i) => (
          <li key={i} className="shrink-0">
            <img
              src={src}
              alt=""
              className="h-9 w-auto max-w-[120px] object-contain opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:h-11"
            />
          </li>
        ))}
      </ul>
      <ul
        className={`flex shrink-0 items-center gap-14 py-3 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((src, i) => (
          <li key={i} className="shrink-0">
            <img
              src={src}
              alt=""
              className="h-9 w-auto max-w-[120px] object-contain opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:h-11"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Associations() {
  return (
    <section className="border-y border-hairline bg-ink py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-10 text-center">
          <p className="eyebrow text-parchment-dim">{associations.eyebrow}</p>
        </Reveal>
      </div>

      <div className="flex flex-col gap-6">
        <MarqueeTrack logos={associations.logos} />
        <MarqueeTrack logos={[...associations.logos].reverse()} reverse />
      </div>
    </section>
  );
}
