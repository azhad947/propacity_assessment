import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap, prefersReducedMotion } from "../lib/gsap";
import { hero } from "../data/content";

// Split a string into individual letter spans for staggered reveal
function SplitText({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="hero-letter inline-block"
          style={{ opacity: 0, display: ch === " " ? "inline" : "inline-block" }}
        >
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const videoWrapRef = useRef(null);
  const videoRef = useRef(null);
  const contentRef = useRef(null);
  const ctaRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  // ── Video autoplay reliability ──────────────────────────────────────────────
  // Assets now come through the Vite /cdn proxy which spoofs the Referer header,
  // so the murec.com CDN hotlink protection no longer blocks the request.
  // We still handle the browser autoplay policy edge-cases below.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const markReady = () => setVideoReady(true);
    video.addEventListener("playing", markReady);
    video.addEventListener("canplaythrough", markReady);
    if (video.readyState >= 3) markReady();

    let resumeAttached = false;
    const resume = () => video.play().catch(() => {});
    const attemptPlay = () => {
      video.play().catch(() => {
        if (resumeAttached) return;
        resumeAttached = true;
        ["pointerdown", "touchstart", "keydown"].forEach((e) =>
          window.addEventListener(e, resume, { once: true }),
        );
      });
    };
    attemptPlay();

    return () => {
      video.removeEventListener("playing", markReady);
      video.removeEventListener("canplaythrough", markReady);
      ["pointerdown", "touchstart", "keydown"].forEach((e) =>
        window.removeEventListener(e, resume),
      );
    };
  }, []);

  // ── Cinematic entrance + scroll exit ───────────────────────────────────────
  useEffect(() => {
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [".hero-eyebrow", ".hero-letter", ".hero-sub", ".hero-cta", ".hero-scroll-cue"],
          { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
        );
        return;
      }

      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: "power4.out" } });

      // 1. Eyebrow wipes in from left via clip-path
      tl.fromTo(
        ".hero-eyebrow",
        { clipPath: "inset(0% 100% 0% 0%)", opacity: 1 },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 },
      );

      // 2. "MUREC" — each letter drops from above with stagger
      tl.fromTo(
        ".hero-letter",
        { opacity: 0, y: -60, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.06,
          ease: "back.out(1.4)",
        },
        "-=0.5",
      );

      // 3. Subtitle fades up with a slight blur clear
      tl.fromTo(
        ".hero-sub",
        { opacity: 0, y: 22, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
        "-=0.6",
      );

      // 4. CTA scales in from slightly smaller
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, scale: 0.88, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.6)" },
        "-=0.55",
      );

      // 5. Scroll cue fades in last
      tl.fromTo(
        ".hero-scroll-cue",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3",
      );

      // ── Scroll exit: video zooms, content lifts & fades ──────────────────
      gsap.fromTo(
        videoWrapRef.current,
        { scale: 1 },
        {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "60% top",
            scrub: 0.9,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Magnetic CTA button ─────────────────────────────────────────────────────
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 18 });
  const sy = useSpring(my, { stiffness: 200, damping: 18 });

  const handleCtaMove = (e) => {
    const rect = ctaRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const handleCtaLeave = () => { mx.set(0); my.set(0); };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-ink"
    >
      {/* ── Background video ── */}
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <img
          src={hero.poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-0" : "opacity-70"
          }`}
        />
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-70" : "opacity-0"
          }`}
          src={hero.video}
          poster={hero.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Vignette layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/25 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-ink/40" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      {/* ── Hero content ── */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        {/* Eyebrow — clip-path wipe */}
        <p
          className="hero-eyebrow eyebrow mb-8 text-brass-bright"
          style={{ opacity: 1, clipPath: "inset(0% 100% 0% 0%)" }}
        >
          {hero.eyebrow}
        </p>

        {/* Title — per-letter drop */}
        <h1
          className="font-display text-[18vw] leading-[0.88] tracking-tight text-parchment sm:text-[11vw] md:text-[8.5rem]"
          style={{ perspective: "600px" }}
        >
          <SplitText text={hero.title} />
        </h1>

        {/* Subtitle */}
        <p
          className="hero-sub mt-6 max-w-md font-display text-lg italic text-parchment-dim md:text-xl"
          style={{ opacity: 0 }}
        >
          {hero.sub}
        </p>

        {/* Magnetic CTA */}
        <motion.a
          ref={ctaRef}
          href={hero.cta.href}
          className="hero-cta eyebrow group mt-10 inline-flex items-center gap-3 rounded-full border border-parchment/30 px-8 py-4 text-parchment transition-colors duration-300 hover:border-brass hover:text-brass-bright"
          style={{ opacity: 0, x: sx, y: sy }}
          onMouseMove={handleCtaMove}
          onMouseLeave={handleCtaLeave}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {hero.cta.label}
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.a>
      </div>

      {/* ── Scroll cue ── */}
      <div
        className="hero-scroll-cue absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="eyebrow text-parchment-dim tracking-[0.4em]">Scroll</span>
        <motion.span
          className="h-12 w-px bg-gradient-to-b from-parchment/50 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </div>
    </section>
  );
}
