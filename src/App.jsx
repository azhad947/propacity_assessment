import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ZoomReveal from "./components/ZoomReveal";
import Explorer from "./components/Explorer";
import Philosophy from "./components/Philosophy";
import Associations from "./components/Associations";
import Partners from "./components/Partners";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { explorer, associations } from "./data/content";

export default function App() {
  const zoomImages = [
    explorer[0].image,   // madhusudan.webp  — hero (expands fullscreen)
    explorer[2].image,   // murec.webp
    associations.logos[0],
    associations.logos[1],
    associations.logos[2],
  ];

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-ink">
        <Navbar />
        <main>
          <Hero />
          <ZoomReveal
            images={zoomImages}
            lines={["Quality before profit,", "trust before everything."]}
          />
          <Explorer />
          <Philosophy />
          <Associations />
          <Partners />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
