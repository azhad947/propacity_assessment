import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ZoomReveal from "./components/ZoomReveal";
import Stats from "./components/Stats";
import Explorer from "./components/Explorer";
import MissionVision from "./components/MissionVision";
import Philosophy from "./components/Philosophy";
import Associations from "./components/Associations";
import Board from "./components/Board";
import Partners from "./components/Partners";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { explorer, associations } from "./data/content";

export default function App() {
  const zoomImages = [
    explorer[0].image,
    explorer[2].image,
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
          <Stats />
          <Explorer />
          <MissionVision />
          <Philosophy />
          <Associations />
          <Board />
          <Partners />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
