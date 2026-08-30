import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { board } from "../data/content";

const ease = [0.22, 1, 0.36, 1];

function MemberCard({ m }) {
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-[8px] border border-hairline bg-surface/60"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <motion.img
          src={m.photo}
          alt={m.name}
          loading="lazy"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.1, ease }}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
        <motion.div
          className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-[80px]"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            background:
              "radial-gradient(circle at top right, rgba(185,143,82,0.16), transparent 70%)",
          }}
        />
        <h3 className="absolute bottom-5 left-6 font-display text-xl text-parchment md:text-2xl">
          {m.name}
        </h3>
      </div>

      <div className="p-6 md:p-8">
        <motion.p
          className="text-sm leading-relaxed text-parchment-dim"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          {m.bio}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function Board() {
  return (
    <section className="overflow-hidden bg-ink-2 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal scrub y={48} className="mb-14 md:mb-20">
          <p className="eyebrow mb-4 text-moss">{board.eyebrow}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-parchment md:text-6xl">
            {board.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {board.members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.8, ease, delay: i * 0.15 }}
              className="h-full"
            >
              <MemberCard m={m} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
