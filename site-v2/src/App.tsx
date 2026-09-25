import { useEffect, useRef, useState } from "react";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import Offer from "./components/Offer";
import Method from "./components/Method";
import About from "./components/About";
import Inside from "./components/Inside";
import Services from "./components/Services";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";
import FloatingCta from "./components/FloatingCta";
import { initReveals, ScrollTrigger } from "./lib/motion";

export default function App() {
  const mainRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded || !mainRef.current) return;
    const cleanup = initReveals(mainRef.current);
    // Fonts and images shift layout after load; re-measure trigger positions.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return cleanup;
  }, [loaded]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Loader onDone={() => setLoaded(true)} />
      <Nav />
      <main id="main" ref={mainRef}>
        <Hero ready={loaded} />
        <Shop />
        <Offer />
        <Method />
        <Inside />
        <About />
        <Services />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
