import { motion } from "framer-motion";
import { partners } from "../data/content";
import Reveal from "./Reveal";
import { splitLines } from "../lib/text";
import { useTiltCard } from "../lib/useTiltCard";

const ease = [0.22, 1, 0.36, 1];

function PartnerCard({ p }) {
  const { cardRef, tiltStyle, handleMove, handleLeave } = useTiltCard({ maxTilt: 8 });

  const lines = splitLines(p.quote);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...tiltStyle }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[8px] border border-hairline bg-surface/60 p-8 md:p-10"
    >
      <motion.div
        className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-[80px]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          background:
            "radial-gradient(circle at top right, rgba(185,143,82,0.12), transparent 70%)",
        }}
      />

      <div>
        <motion.span
          className="block font-display text-6xl leading-none text-brass/40"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          &ldquo;
        </motion.span>

        <p className="mt-4 font-display text-xl italic leading-relaxed text-parchment md:text-2xl">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.1 }}
            >
              {line}{" "}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Footer */}
      <motion.div
        className="mt-10 flex items-center justify-between border-t border-hairline pt-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease, delay: 0.35 + lines.length * 0.1 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-full">
            <motion.img
              src={p.photo}
              alt={p.name}
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full"
              initial={{ boxShadow: "inset 0 0 0 0px rgba(185,143,82,0)" }}
              whileHover={{ boxShadow: "inset 0 0 0 2px rgba(185,143,82,0.7)" }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div>
            <span className="eyebrow block text-parchment">{p.name}</span>
            <span className="eyebrow mt-1 block text-parchment-dim opacity-60">Partner</span>
          </div>
        </div>
        <img
          src={p.mark}
          alt={`${p.name} studio mark`}
          className="h-7 w-auto max-w-[100px] object-contain opacity-60 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
        />
      </motion.div>
    </motion.div>
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
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
            >
              <PartnerCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}