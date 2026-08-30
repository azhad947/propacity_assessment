import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../lib/gsap";

export default function ZoomReveal({ images, lines }) {
  const wrapRef   = useRef(null);
  const stageRef  = useRef(null);
  const wordsRef  = useRef([]);
  const imgsRef   = useRef([]);
  const heroRef   = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const wrap    = wrapRef.current;
    const stage   = stageRef.current;
    const overlay = overlayRef.current;
    const hero    = heroRef.current;
    if (!wrap || !stage || prefersReducedMotion()) return undefined;

    const words = wordsRef.current.filter(Boolean);
    const imgs  = imgsRef.current.filter(Boolean);

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y: 22 });
      gsap.set(imgs,  { opacity: 0 });
      gsap.set(hero,  { opacity: 0, scale: 0.08, clipPath: "inset(4% 4% 4% 4% round 12px)" });
      gsap.set(overlay, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: "+=280%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      imgs.forEach((img, i) => {
        tl.to(img, { opacity: 1, duration: 0.08 }, i * 0.04);
      });

      words.forEach((word, i) => {
        tl.to(
          word,
          { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" },
          0.05 + i * 0.045,
        );
      });

      tl.to(words, { opacity: 0, y: -18, duration: 0.08, stagger: 0.01 }, 0.45);

      imgs.forEach((img) => {
        tl.to(
          img,
          {
            x: 0, y: 0, rotation: 0,
            xPercent: -50, yPercent: -50,
            left: "50%", top: "50%",
            opacity: 0,
            duration: 0.18,
            ease: "power3.in",
          },
          0.48,
        );
      });

      tl.to(
        hero,
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          duration: 0.3,
          ease: "power2.out",
        },
        0.55,
      );

      tl.to(overlay, { opacity: 1, duration: 0.18, ease: "none" }, 0.82);
    }, wrap);

    return () => ctx.revert();
  }, []);


  // On mobile: only show 2 cards (top-left, top-right), smaller, no translate offset
  // On desktop: all 4 cards with rotation and translate
  const floatConfig = [
    { top: "12%",  left: "4%",  w: "w-28 sm:w-44 md:w-60", rot: "-5deg", x: "-10px", y: "24px",  mobileHide: false },
    { top: "12%",  left: "auto", right: "4%", w: "w-28 sm:w-36 md:w-48", rot: "4deg",  x: "10px",  y: "-12px", mobileHide: false },
    { top: "62%", left: "4%",  w: "w-28 sm:w-40 md:w-52", rot: "3deg",  x: "-12px", y: "-18px", mobileHide: true },
    { top: "60%", left: "auto", right: "4%", w: "w-28 sm:w-44 md:w-56", rot: "-4deg", x: "12px",  y: "18px",  mobileHide: true },
  ];

  return (
    <section ref={wrapRef} className="relative bg-ink">
      <div
        ref={stageRef}
        className="relative h-[100svh] w-full overflow-hidden bg-ink"
      >
        {floatConfig.map((cfg, i) => (
          <div
            key={i}
            ref={(el) => (imgsRef.current[i] = el)}
            className={`pointer-events-none absolute rounded-[8px] border border-parchment/10 bg-surface/80 p-3 shadow-2xl backdrop-blur-sm sm:p-5 ${
              cfg.w
            } ${
              cfg.mobileHide ? "hidden sm:block" : ""
            }`}
            style={{
              top: cfg.top,
              left: cfg.left,
              right: cfg.right,
              // On mobile skip the translate so cards stay within viewport
              transform: `rotate(${cfg.rot})`,
              opacity: 0,
            }}
          >
            <img
              src={images[i + 1] ?? images[0]}
              alt=""
              className="h-8 w-full object-contain sm:h-12 md:h-16"
            />
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-3xl leading-[1.55] text-parchment sm:text-4xl md:text-6xl md:leading-[1.5]">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.split(" ").map((word, wi) => (
                  <span
                    key={wi}
                    ref={(el) => {
                      const idx = lines
                        .slice(0, li)
                        .reduce((acc, l) => acc + l.split(" ").length, 0) + wi;
                      wordsRef.current[idx] = el;
                    }}
                    className="mr-[0.28em] inline-block"
                    style={{ opacity: 0 }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>

        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center will-change-transform"
          style={{
            opacity: 0,
            clipPath: "inset(4% 4% 4% 4% round 12px)",
            transform: "scale(0.08)",
          }}
        >
          <div className="absolute inset-0 bg-ink" />
          <img
            src={images[0]}
            alt="MUREC"
            className="relative z-10 max-h-[55%] max-w-[70%] object-contain drop-shadow-[0_0_80px_rgba(185,143,82,0.3)]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(185,143,82,0.12) 0%, transparent 70%)",
            }}
          />
        </div>

        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-30 bg-ink"
          style={{ opacity: 0 }}
        />
      </div>
    </section>
  );
}