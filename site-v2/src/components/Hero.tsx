import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroProof, heroVideo } from "../data/site";
import { gsap, prefersReducedMotion } from "../lib/motion";
import Dust from "./Dust";
import HeroVideo from "./HeroVideo";
import HeroCtas from "./hero/HeroCtas";
import GuideCard from "./hero/GuideCard";

// Lead product in the hero: Claude × Remotion (the bundle card lives on in the Shop section).
const phrases = ["Make reels", "Make videos", "Make ads"]; // short on purpose: keeps clear of the hero card

/** Cinematic background (light beams, dust, giant wordmark) with a rotating headline and the bundle card. */
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

      <div className="container-x relative z-10 grid min-h-[100svh] items-center gap-14 pb-20 pt-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p data-hero className="eyebrow">
            New guide · Claude × Remotion
          </p>

          <h1
            data-hero
            className="mt-7 font-medium leading-[1.04] tracking-[-0.02em] [font-size:clamp(36px,9.5vw,56px)] lg:[font-size:clamp(52px,4.6vw,72px)]"
          >
            <span className="sr-only">Make reels, videos and ads — just by describing them.</span>
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
              just by describing them.
            </span>
          </h1>

          <p data-hero className="text-muted mt-7 max-w-lg text-[17px]">
            Claude writes the code, Remotion renders the MP4.
            On-brand videos in minutes — no editing app.
          </p>
          <div data-hero>
            <HeroCtas className="mt-10" />
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

        <div data-hero className="relative lg:col-span-5">
          <GuideCard />
          {/* Our own reel, made with the guide, as a gold-framed phone tucked under the card (desktop only). */}
          <figure className="pointer-events-none absolute bottom-12 -left-36 hidden w-[140px] -rotate-6 xl:block">
            <div className="overflow-hidden rounded-[26px] border-[5px] border-accent bg-ink shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9)]">
              <video
                src={import.meta.env.BASE_URL + "video/claude-reel.mp4"}
                poster={import.meta.env.BASE_URL + "video/claude-reel-poster.jpg"}
                className="block aspect-[9/16] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Our 30-second reel, made with Claude and Remotion"
              />
            </div>
            <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-accent">We make reels ↑</figcaption>
          </figure>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink" aria-hidden="true" />
    </section>
  );
}
