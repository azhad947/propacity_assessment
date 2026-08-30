import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { stats } from "../data/content";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";

function StatCard({ stat }) {
  const numRef = useRef(null);
  const cardRef = useRef(null);
  const state = useRef({ val: 0 });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  useEffect(() => {
    const el = numRef.current;
    if (!el) return undefined;

    if (prefersReducedMotion()) {
      el.textContent = `${stat.value}${stat.suffix}`;
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.to(state.current, {
        val: stat.value,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          el.textContent = `${Math.round(state.current.val)}${stat.suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [stat]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="group relative overflow-hidden rounded-[8px] border border-hairline"
    >
      <ParallaxImage speed={0.1}>
        <img
          src={stat.bg}
          alt=""
          className="h-full w-full object-cover opacity-25 transition-opacity duration-700 group-hover:opacity-35"
        />
      </ParallaxImage>
      <div className="pointer-events-none absolute inset-0 bg-ink/70" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(185,143,82,0.16), transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center">
        <span
          ref={numRef}
          className="font-display text-5xl tabular-nums text-brass-bright md:text-6xl"
        >
          0{stat.suffix}
        </span>
        <span className="eyebrow mt-4 text-parchment-dim">{stat.label}</span>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-ink-2 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal scrub y={48} className="mb-14 text-center md:mb-20">
          <p className="eyebrow mb-4 text-moss">{stats.eyebrow}</p>
          <h2 className="font-display text-4xl leading-[1.05] text-parchment md:text-6xl">
            {stats.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.items.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
            >
              <StatCard stat={stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
