import { motion } from "framer-motion";
import type { Product } from "../../data/products";

/**
 * Flagship visual: the cover on a lit, dotted "screen" panel with a floating glass AI-answer card
 * that ranks "your product" first and a labelled sponsored chip — the guide's idea in one glance.
 */
function FlagshipVisual({ p }: { p: Product }) {
  return (
    <div className="relative shrink-0 self-start pb-8">
      <div
        className="relative overflow-hidden rounded-[14px] border border-accent/25 p-3"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(226,180,100,.22), transparent 70%), radial-gradient(rgba(245,241,232,.08) 1px, transparent 1px) 0 0 / 10px 10px, #0E0D0B",
        }}
      >
        <img
          src={p.cover}
          alt={`${p.title} cover`}
          width={640}
          height={908}
          className="w-24 rounded-[3px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9),0_0_0_1px_rgba(226,180,100,.35)] sm:w-28"
        />
      </div>
      <motion.div
        aria-hidden="true"
        className="absolute -left-2 -right-2 bottom-0 rounded-[10px] border border-ivory/10 bg-ink/85 p-2 font-mono text-[9px] shadow-[0_18px_40px_-12px_rgba(0,0,0,.9)] backdrop-blur-md"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="flex items-center gap-1.5 uppercase tracking-[0.18em] text-ivory/45">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          AI answer
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 rounded-[6px] border border-accent/60 bg-accent/10 px-1.5 py-1 font-sans text-[10px] text-ivory">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-accent text-[8px] font-semibold text-ink">1</span>
          Your product ✓
        </p>
        <p className="mt-1.5 flex items-center justify-between text-ivory/40">
          <span className="rounded-full border border-accent/50 px-1.5 py-[1px] uppercase tracking-[0.15em] text-accent">Ad</span>
          sits below
        </p>
      </motion.div>
    </div>
  );
}

/** Hero "checkout card" for one hero-carousel guide, in the bundle card's style. */
export default function GuideCard({ p }: { p: Product }) {
  const s = p.spotlight!;
  const reel = p.hero?.reel;

  return (
    <div className="glass rounded-[24px] p-2 shadow-[0_40px_120px_-40px_var(--glow)]">
      <div className="rounded-[18px] border hairline bg-ink/70 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{s.label}</span>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-ink">New</span>
        </div>

        <div className="mt-6 flex gap-5">
          {p.hero?.flagship ? (
            <FlagshipVisual p={p} />
          ) : (
          <div className="flex shrink-0 items-start self-start">
            <img
              src={p.cover}
              alt={`${p.title} cover`}
              width={640}
              height={908}
              className="w-24 rounded-[3px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] sm:w-28"
            />
            {/* Our own reel for this guide, as a small gold-framed phone beside the cover. */}
            {reel && (
              <div className="relative z-10 -ml-8 mt-6 w-[62px] rotate-6 overflow-hidden rounded-[12px] border-[3px] border-accent bg-ink shadow-[0_20px_40px_-10px_rgba(0,0,0,0.95)] sm:w-[72px]">
                <video
                  src={reel.src}
                  poster={reel.poster}
                  className="block aspect-[9/16] w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={reel.label}
                />
              </div>
            )}
          </div>
          )}
          <div>
            <h2 className="text-[28px] font-medium leading-tight tracking-[-0.02em]">{p.title}</h2>
            <p className="text-muted mt-2 text-[14px]">{s.short}</p>
          </div>
        </div>

        <ul className="mt-6 divide-y divide-ivory/[0.08] border-y hairline">
          {s.chapters.map((c, i) => (
            <li key={c} className="flex items-center justify-between gap-3 py-3 text-[14px]">
              <span className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] text-accent">✓</span>
                {c}
              </span>
              <span className="font-mono text-[12px] text-ivory/40">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/40">{p.pages}</p>
            <p className="text-[40px] font-semibold leading-none tracking-[-0.03em]">{p.price}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/50">VAT incl. · PDF</p>
          </div>
          <motion.a href={p.href} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Get it now →
          </motion.a>
        </div>
      </div>
    </div>
  );
}
