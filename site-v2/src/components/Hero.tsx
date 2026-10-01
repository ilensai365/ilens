import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroVideo } from "../data/site";
import { products } from "../data/products";
import { gsap, prefersReducedMotion } from "../lib/motion";
import Dust from "./Dust";
import HeroVideo from "./HeroVideo";
import HeroCtas from "./hero/HeroCtas";
import GuideCard from "./hero/GuideCard";

// Hero carousel: every product with a `hero` block gets a slide (headline + card), newest first.
const slides = products.filter((p) => p.hero);
const SLIDE_MS = 9000;
const PHRASE_MS = 2800;
const ease = [0.16, 1, 0.3, 1] as const;

/** Cinematic background (light beams, dust, giant wordmark) with a carousel of new guides: rotating headline + checkout card. */
export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const p = slides[slide];
  const h = p.hero!;
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (!ready || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", { opacity: 0, y: 32, duration: 1.1, ease: "power3.out", stagger: 0.09 });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // Rotating first line within the current slide.
  useEffect(() => {
    setI(0);
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % h.phrases.length), PHRASE_MS);
    return () => clearInterval(t);
  }, [slide, reduced, h.phrases.length]);

  // Auto-advance slides; paused while hovered/focused, and when the user prefers reduced motion.
  useEffect(() => {
    if (reduced || paused || slides.length < 2) return;
    const t = setTimeout(() => setSlide((n) => (n + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [slide, paused, reduced]);

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {/* Outer divs position/rotate the beams; inner divs drift (both use transform). */}
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
          className="absolute inset-x-0 bottom-[-6vw] select-none text-center font-display italic leading-none text-transparent [font-size:30vw]"
          style={{ WebkitTextStroke: "1px rgba(245,241,232,0.08)" }}
        >
          iLens
        </p>
        <HeroVideo />
        {heroVideo.src && <div className="absolute inset-0 bg-black/55" />}
      </div>
      <Dust count={80} />

      <div
        className="container-x relative z-10 grid min-h-[100svh] items-center gap-14 pb-20 pt-32 lg:grid-cols-12 lg:gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div data-hero className="lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.55, ease }}
            >
              <p className="eyebrow">{h.eyebrow}</p>

              <h1 className="mt-7 font-medium leading-[1.04] tracking-[-0.02em] [font-size:clamp(36px,9.5vw,56px)] lg:[font-size:clamp(52px,4.6vw,72px)]">
                <span className="sr-only">
                  {h.phrases.join(", ")} — {h.tagline}
                </span>
                <span aria-hidden="true" className="relative block h-[1.1em] overflow-hidden whitespace-nowrap">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={h.phrases[i] ?? h.phrases[0]}
                      className="block"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      {h.phrases[i] ?? h.phrases[0]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span aria-hidden="true" className="serif-i block text-accent">
                  {h.tagline}
                </span>
              </h1>

              <p className="text-muted mt-7 max-w-lg text-[17px]">{h.sub}</p>
              <HeroCtas p={p} className="mt-10" />
              <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/50">
                {h.proof.map((x) => (
                  <li key={x}>
                    <span className="mr-2 text-accent">✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          {/* Slide picker: one tab per guide, the active one fills with gold until the next slide. */}
          {slides.length > 1 && (
            <div className="mt-12 flex max-w-xl gap-4" role="tablist" aria-label="New guides">
              {slides.map((s, n) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={n === slide}
                  onClick={() => setSlide(n)}
                  className={`group flex flex-1 flex-col justify-start self-start text-left transition-colors ${n === slide ? "text-ivory" : "text-ivory/45 hover:text-ivory/80"}`}
                >
                  <span className="relative block h-[2px] overflow-hidden rounded-full bg-ivory/15">
                    {n === slide && (
                      <motion.span
                        key={`${s.id}-${paused}`}
                        className="absolute inset-y-0 left-0 bg-accent"
                        initial={{ width: reduced || paused ? "100%" : "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: reduced || paused ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                  <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.2em]">
                    {String(n + 1).padStart(2, "0")} · {s.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div data-hero className="lg:col-span-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -24, rotate: -1.5 }}
              transition={{ duration: 0.55, ease }}
            >
              <GuideCard p={p} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" aria-hidden="true" />
    </section>
  );
}
