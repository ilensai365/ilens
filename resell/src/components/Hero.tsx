import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroProof } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/motion";
import Dust from "./Dust";
import BundleCard from "./hero/BundleCard";

const phrases = ["Your brand.", "Your price.", "Your profit."];

/** Same cinematic background as ilens.co, with resell copy and the library card. */
export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", { opacity: 0, y: 32, duration: 1.1, ease: "power3.out", stagger: 0.09 });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = setInterval(() => setI((n) => (n + 1) % phrases.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-[18%] top-[-25%] h-[95%] w-[36vw] rotate-[18deg]">
          <div
            className="h-full w-full animate-drift blur-3xl"
            style={{ background: "linear-gradient(to bottom, var(--beam), transparent 75%)" }}
          />
        </div>
        <div className="absolute left-[48%] top-[-25%] h-[95%] w-[28vw] -rotate-[16deg]">
          <div
            className="h-full w-full animate-drift blur-3xl [animation-delay:-9s]"
            style={{ background: "linear-gradient(to bottom, rgba(245,241,232,0.10), transparent 75%)" }}
          />
        </div>
        <div
          className="absolute right-[-10%] top-[15%] h-[55vmax] w-[55vmax] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow), transparent 60%)" }}
        />
        <p
          className="absolute inset-x-0 bottom-[-6vw] select-none text-center font-display italic leading-none text-transparent [font-size:26vw]"
          style={{ WebkitTextStroke: "1px rgba(245,241,232,0.08)" }}
        >
          Resell
        </p>
      </div>
      <Dust count={80} />

      <div className="container-x relative z-10 grid min-h-[100svh] items-center gap-14 pb-20 pt-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p data-hero className="eyebrow">
            iLens Resell · PLR &amp; MRR
          </p>

          <h1
            data-hero
            className="mt-7 font-medium leading-[1.04] tracking-[-0.02em] [font-size:clamp(36px,9.5vw,56px)] lg:[font-size:clamp(56px,5.2vw,78px)]"
          >
            <span className="sr-only">Your brand, your price, your profit — our products.</span>
            <span aria-hidden="true" className="relative block h-[1.1em] overflow-hidden whitespace-nowrap">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={phrases[i]}
                  className="block"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {phrases[i]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span aria-hidden="true" className="serif-i block text-accent">
              Our products.
            </span>
          </h1>

          <p data-hero className="text-muted mt-7 max-w-lg text-[17px]">
            Professionally written ebooks and commercial-use mockup templates with resell rights. Put your name on them,
            sell them in your own store and keep every euro.
          </p>
          <div data-hero className="mt-10 flex flex-col gap-3 sm:flex-row">
            <motion.a href="#plr-shop" className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Browse the library <span aria-hidden="true">→</span>
            </motion.a>
            <motion.a href="#starter" className="btn btn-ghost" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Get the free starter kit
            </motion.a>
          </div>
          <ul data-hero className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/50">
            {heroProof.map((p) => (
              <li key={p}>
                <span className="mr-2 text-accent">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div data-hero className="lg:col-span-5">
          <BundleCard />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" aria-hidden="true" />
    </section>
  );
}
