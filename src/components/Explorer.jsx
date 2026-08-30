import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { explorer } from "../data/content";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1];

export default function Explorer() {
  const [active, setActive] = useState(0);
  const current = explorer[active];
  const logo = current.isLogo;

  return (
    <section id="collection" className="relative bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <Reveal scrub y={48}>
            <p className="eyebrow mb-4 text-moss">What Guides Us</p>
            <h2 className="font-display text-4xl leading-[1.05] text-parchment md:text-6xl">
              Three pillars, <br className="hidden md:block" />
              one way of building
            </h2>
          </Reveal>
          <Reveal scrub y={36} className="max-w-sm">
            <p className="text-sm leading-relaxed text-parchment-dim">
              Every MUREC address rests on the same foundation — a legacy tested by time, principles
              that don't bend, and a collection built to outlast trends.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mb-10 flex flex-wrap gap-3 border-b border-hairline pb-6 md:mb-14">
          {explorer.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setActive(i)}
              className={`eyebrow relative rounded-full border px-6 py-3 transition-all duration-500 ${
                active === i
                  ? "border-brass bg-brass text-ink"
                  : "border-hairline text-parchment-dim hover:border-parchment/40 hover:text-parchment"
              }`}
            >
              {item.tab}
            </button>
          ))}
        </Reveal>

        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">

          <div className={`relative w-full overflow-hidden rounded-[6px] bg-surface ${
            logo ? "aspect-[16/9]" : "aspect-[4/5] md:aspect-[3/4]"
          }`}>
            <AnimatePresence>
              <motion.div
                key={current.key + "-glow"}
                className="pointer-events-none absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{
                  background: logo
                    ? "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(185,143,82,0.14) 0%, transparent 70%)"
                    : "none",
                }}
              />
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.img
                key={current.key}
                src={current.image}
                alt={current.heading}
                initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                transition={{ duration: 0.85, ease }}
                className={`absolute inset-0 h-full w-full ${
                  logo
                    ? "object-contain p-8 drop-shadow-[0_0_40px_rgba(185,143,82,0.25)]"
                    : "object-cover"
                }`}
              />
            </AnimatePresence>

            {!logo && (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            )}

            <AnimatePresence mode="wait">
              <motion.span
                key={current.key + "-tag"}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="eyebrow absolute left-5 top-5 z-10 rounded-full border border-parchment/25 bg-ink/60 px-4 py-2 text-parchment backdrop-blur-sm"
              >
                {current.tag}
              </motion.span>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
                exit: {},
              }}
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
                  exit: { opacity: 0, y: -14, transition: { duration: 0.35 } },
                }}
                className="font-display text-3xl leading-tight text-parchment md:text-5xl"
              >
                {current.heading}
              </motion.h3>

              <motion.div
                variants={{
                  hidden: { scaleX: 0 },
                  show: { scaleX: 1, transition: { duration: 0.6, ease } },
                  exit: { scaleX: 0, transition: { duration: 0.3 } },
                }}
                style={{ originX: 0 }}
                className="mt-6 h-px w-16 bg-brass/50"
              />

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
                  exit: { opacity: 0, transition: { duration: 0.3 } },
                }}
                className="mt-6 max-w-lg text-base leading-relaxed text-parchment-dim md:text-lg"
              >
                {current.body}
              </motion.p>

              <motion.a
                href={current.cta.href}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
                  exit: { opacity: 0, transition: { duration: 0.25 } },
                }}
                className="eyebrow link-underline group mt-9 inline-flex items-center gap-3 text-brass-bright"
              >
                {current.cta.label}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
