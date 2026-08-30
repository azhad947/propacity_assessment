import { motion } from "framer-motion";
import { mission, vision } from "../data/content";
import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";

const ease = [0.22, 1, 0.36, 1];

function splitLines(text, wordsPerLine = 9) {
  const words = text.split(" ");
  const lines = [];
  for (let i = 0; i < words.length; i += wordsPerLine)
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  return lines;
}

function Block({ eyebrow, title, body, image, alt, reverse }) {
  const lines = splitLines(body);

  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
      <motion.div
        className={`group relative aspect-[4/3] w-full overflow-hidden rounded-[6px] bg-surface ${
          reverse ? "md:order-2" : ""
        }`}
        initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
      >
        <ParallaxImage speed={0.12}>
          <img src={image} alt={alt} className="h-full w-full object-cover" />
        </ParallaxImage>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(185,143,82,0.14), transparent 70%)",
          }}
        />
      </motion.div>

      <div className={reverse ? "md:order-1" : ""}>
        <Reveal scrub y={40}>
          <p className="eyebrow mb-4 text-moss">{eyebrow}</p>
          <h3 className="font-display text-3xl leading-tight text-parchment md:text-4xl">
            {title}
          </h3>
        </Reveal>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-parchment-dim md:text-lg">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease, delay: 0.1 + i * 0.1 }}
            >
              {line}{" "}
            </motion.span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function MissionVision() {
  return (
    <section className="bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-20 md:gap-28">
        <Block
          eyebrow={mission.eyebrow}
          title={mission.title}
          body={mission.body}
          image={mission.image}
          alt="MUREC mission"
        />
        <Block
          eyebrow={vision.eyebrow}
          title={vision.title}
          body={vision.body}
          image={vision.image}
          alt="MUREC vision"
          reverse
        />
      </div>
    </section>
  );
}
