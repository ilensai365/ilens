import { useEffect, useRef, useState } from "react";
import { insideFacts, insideStats, proof } from "../data/site";
import { products } from "../data/products";
import { prefersReducedMotion } from "../lib/motion";

/** Counts from 0 to `to` the first time the number scrolls into view. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(() => (prefersReducedMotion() ? to : 0));

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / 1400, 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{n}</span>;
}

/** Proof without invented reviews: what each guide promises, real facts, and what's inside. */
export default function Inside() {
  const guides = products.filter((p) => p.status === "available" && !p.featured);

  return (
    <section id="inside" className="py-section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p data-reveal className="eyebrow">
              By the numbers
            </p>
            <h2 data-reveal className="mt-5 max-w-2xl text-h1 font-medium">
              From idea to income, <span className="serif-i text-accent">on a real timeline.</span>
            </h2>
          </div>
          {proof.customers !== null && (
            <div data-reveal className="glass rounded-card px-6 py-4 text-right">
              <p className="text-[40px] font-semibold leading-none tracking-[-0.03em]">
                <CountUp to={proof.customers} />+
              </p>
              <p className="text-muted mt-1 font-mono text-[11px] uppercase tracking-[0.2em]">creators already inside</p>
            </div>
          )}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {insideStats.map((s) => (
            <article
              key={s.source}
              data-reveal
              className={`surface group relative flex flex-col overflow-hidden rounded-card p-7 transition-colors hover:border-accent/40 ${
                s.progress === 1 ? "!border-accent/50 bg-accent/[0.04]" : ""
              }`}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "var(--glow)" }}
                aria-hidden="true"
              />
              <p className="flex items-baseline gap-2 font-semibold tracking-[-0.04em]">
                {s.prefix && <span className="text-[40px] leading-none text-accent">{s.prefix}</span>}
                <span className="text-[72px] leading-none md:text-[84px]">
                  <CountUp to={s.count} />
                </span>
                {s.unit && <span className="text-[22px] font-medium tracking-normal text-accent">{s.unit}</span>}
              </p>
              <p className="mt-4 text-[17px] leading-snug">{s.title}</p>

              <div className="mt-auto pt-8">
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-ivory/10" aria-hidden="true">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${s.progress * 100}%` }} />
                </div>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/45">{s.source}</p>
              </div>
            </article>
          ))}
        </div>

        <ul data-reveal className="mt-6 flex flex-wrap gap-2">
          {insideFacts.map((f) => (
            <li key={f} className="flex items-center gap-2 rounded-full border hairline px-4 py-2 text-[14px] text-ivory/80">
              <span className="text-accent" aria-hidden="true">
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p data-reveal className="eyebrow">
              What's inside
            </p>
            <h2 data-reveal className="mt-5 text-h1 font-medium">
              Four guides. <span className="serif-i text-accent">One path.</span>
            </h2>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {guides.map((g, i) => (
              <li key={g.id} data-reveal className="flex gap-6 border-t hairline py-6 last:border-b">
                <span className="font-mono text-mono text-accent">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="text-[20px] font-medium">{g.title}</h3>
                  <p className="text-muted mt-1">{g.blurb}</p>
                </div>
                <a href={g.href} className="hidden self-center font-mono text-mono text-ivory/70 hover:text-accent sm:block">
                  {g.price} →
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
