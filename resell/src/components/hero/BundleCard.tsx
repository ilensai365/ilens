import { motion } from "framer-motion";
import { buyHref } from "../../data/site";
import { LIBRARY, ebooks } from "../../data/products";

/** Hero "checkout card" for the Resell Library (all four ebooks with PLR). */
export default function BundleCard() {
  const live = !!LIBRARY.code;
  return (
    <div className="glass rounded-[24px] p-2 shadow-[0_40px_120px_-40px_var(--glow)]">
      <div className="rounded-[18px] border hairline bg-ink/70 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Library · {LIBRARY.license} license</span>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-ink">
            Save {LIBRARY.save}
          </span>
        </div>

        <div className="mt-6 flex gap-5">
          <img
            src={LIBRARY.cover}
            alt={`${LIBRARY.title} cover`}
            width={320}
            height={460}
            className="w-24 shrink-0 self-start rounded-[3px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] sm:w-28"
          />
          <div>
            <h2 className="font-display text-[30px] leading-tight">{LIBRARY.title}</h2>
            <p className="text-muted mt-2 text-[14px]">Four ebooks you can edit, rebrand and sell as your own.</p>
          </div>
        </div>

        <ul className="mt-6 divide-y divide-ivory/[0.08] border-y hairline">
          {ebooks.map((p) => (
            <li key={p.id} className="flex items-center justify-between gap-3 py-3 text-[14px]">
              <span className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] text-accent">✓</span>
                {p.title}
              </span>
              <span className="font-mono text-[12px] text-ivory/40 line-through">
                {p.options.find((o) => o.license === "PLR")?.price}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] text-ivory/40 line-through">{LIBRARY.compareAt}</p>
            <p className="font-display text-[44px] leading-none">{LIBRARY.price}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/50">VAT incl. · PLR</p>
          </div>
          <motion.a href={live ? buyHref(LIBRARY.code) : "#plr-shop"} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            {live ? "Get the library →" : "See the library →"}
          </motion.a>
        </div>
      </div>
    </div>
  );
}
