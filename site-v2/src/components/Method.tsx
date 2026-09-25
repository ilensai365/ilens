import { useLayoutEffect, useRef, useState } from "react";
import { method } from "../data/site";
import { ScrollTrigger, gsap, isDesktop, prefersReducedMotion } from "../lib/motion";
import SectionHead from "./SectionHead";

/** One simple line glyph per step: See, Think, Create, Scale. */
const glyphs = [
  <g key="see">
    <path d="M10 50c12-18 26-27 40-27s28 9 40 27c-12 18-26 27-40 27S22 68 10 50z" />
    <circle cx="50" cy="50" r="11" />
  </g>,
  <g key="think">
    <path d="M50 14v14M50 72v14M14 50h14M72 50h14M25 25l10 10M65 65l10 10M75 25L65 35M35 65L25 75" />
    <circle cx="50" cy="50" r="8" />
  </g>,
  <g key="create">
    <rect x="22" y="22" width="56" height="56" rx="4" />
    <path d="M22 62l18-16 14 12 10-8 14 12" />
    <circle cx="62" cy="36" r="5" />
  </g>,
  <g key="scale">
    <path d="M18 78h64M26 78V60M42 78V48M58 78V36M74 78V22" />
    <path d="M24 44l18-12 16 6 20-18" />
  </g>,
];

export default function Method() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (!root.current || prefersReducedMotion() || !isDesktop()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="method" ref={root} className="relative border-y hairline bg-ivory/[0.015] py-section">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-6">
        {/* Pinned column on desktop */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHead
              eyebrow="The iLens Method"
              title={
                <>
                  From idea to income <span className="serif-i text-accent">in four steps.</span>
                </>
              }
            />
            <ol className="mt-12 hidden gap-3 lg:flex" aria-hidden="true">
              {method.map((s, i) => (
                <li key={s.n} className="flex-1">
                  <div className="h-px w-full bg-ivory/10">
                    <div
                      className="h-px bg-accent transition-all duration-500"
                      style={{ width: i <= active ? "100%" : "0%" }}
                    />
                  </div>
                  <span
                    className={`mt-3 block font-mono text-[12px] transition-colors ${i === active ? "text-accent" : "text-ivory/35"}`}
                  >
                    {s.n} {s.title}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:gap-[18vh] lg:py-[6vh]">
          {method.map((s, i) => (
            <li
              key={s.n}
              data-step
              data-reveal
              className={`surface flex flex-col gap-8 rounded-card p-8 sm:items-center md:p-10 ${
                i % 2 ? "sm:flex-row-reverse" : "sm:flex-row"
              }`}
            >
              <svg
                viewBox="0 0 100 100"
                className="h-24 w-24 shrink-0 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {glyphs[i]}
              </svg>
              <div>
                <span className="font-mono text-mono text-accent">{s.n}</span>
                <h3 className="mt-2 font-display text-h1">{s.title}</h3>
                <p className="text-muted mt-3 text-[17px]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
