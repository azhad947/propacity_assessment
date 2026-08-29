import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Explorer from "./components/Explorer";
import Philosophy from "./components/Philosophy";
import Associations from "./components/Associations";
import Partners from "./components/Partners";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-ink">
        <Navbar />
        <main>
          <Hero />
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
