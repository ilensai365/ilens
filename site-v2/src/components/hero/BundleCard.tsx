import { motion } from "framer-motion";
import { BUNDLE_URL } from "../../data/site";
import { products } from "../../data/products";

/** Hero "checkout card" for the Build. Launch. Sell. bundle. */
export default function BundleCard() {
  const guides = products.filter((p) => p.status === "available" && !p.featured);

  return (
    <div className="glass rounded-[24px] p-2 shadow-[0_40px_120px_-40px_var(--glow)]">
      <div className="rounded-[18px] border hairline bg-ink/70 p-6 md:p-7">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Bundle · Best value</span>
          <span className="shrink-0 whitespace-nowrap rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-ink">Save €60</span>
        </div>

        <div className="mt-6 flex gap-5">
          <img
            src="/images/product-bundle-build-launch-sell.svg"
            alt="Build. Launch. Sell. bundle cover"
            width={320}
            height={460}
            className="w-24 shrink-0 self-start rounded-[3px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.9)] sm:w-28"
          />
          <div>
            <h2 className="font-display text-[30px] leading-tight">Build. Launch. Sell.</h2>
            <p className="text-muted mt-2 text-[14px]">Four guides, one path — from idea to first sale.</p>
          </div>
        </div>

        <ul className="mt-6 divide-y divide-ivory/[0.08] border-y hairline">
          {guides.map((g) => (
            <li key={g.id} className="flex items-center justify-between gap-3 py-3 text-[14px]">
              <span className="flex items-center gap-3">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] text-accent">✓</span>
                {g.title}
              </span>
              <span className="font-mono text-[12px] text-ivory/40 line-through">{g.price}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[12px] text-ivory/40 line-through">€180</p>
            <p className="font-display text-[44px] leading-none">€120</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/50">VAT incl. · PDF</p>
          </div>
          <motion.a href={BUNDLE_URL} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Get it now →
          </motion.a>
        </div>
      </div>
    </div>
  );
}
