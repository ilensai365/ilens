import { forwardRef, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { byId, categories, shopItems, type ShopItem } from "../data/products";
import { buyHref, licenseRows, licenses } from "../data/site";
import SectionHead from "./SectionHead";

const licenseName = (key: string) => licenses.find((l) => l.key === key)?.name ?? key;

/** SVG = dark cover art, shown whole on a gold glow; anything else fills the square. */
function Visual({ src, alt = "", hover }: { src: string; alt?: string; hover?: boolean }) {
  if (!src.endsWith(".svg"))
    return (
      <img
        src={src}
        alt={alt}
        width={800}
        height={800}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover ${hover ? "transition-transform duration-700 group-hover:scale-[1.04]" : ""}`}
      />
    );
  return (
    <div className="relative h-full w-full bg-ivory/[0.03]">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 55%, var(--glow), transparent 68%)" }} aria-hidden="true" />
      <div className="absolute inset-0 flex items-center justify-center py-[12%]">
        <img
          src={src}
          alt={alt}
          width={320}
          height={460}
          loading="lazy"
          decoding="async"
          className={`h-full w-auto rounded-[3px] shadow-[0_24px_40px_-16px_rgba(0,0,0,0.9)] ${
            hover ? "transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1.5deg]" : ""
          }`}
        />
      </div>
    </div>
  );
}

function Price({ price, compareAt, big }: { price: string; compareAt?: string; big?: boolean }) {
  return (
    <p className="flex items-baseline gap-2">
      {compareAt && <s className="font-mono text-[13px] text-ivory/40">{compareAt}</s>}
      <span className={`font-semibold tracking-[-0.01em] ${big ? "text-[32px]" : "text-[18px]"} ${compareAt ? "text-accent" : ""}`}>{price}</span>
    </p>
  );
}

/** Card in the style of a PLR store grid: mockup image with badges, title, price range, one action. */
const Card = forwardRef<HTMLButtonElement, { item: ShopItem; onOpen: () => void }>(function Card({ item, onOpen }, ref) {
  const cheapest = item.options[0];
  const sale = item.options.find((o) => o.compareAt);
  return (
    <motion.button
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      aria-label={`Quick view: ${item.title}`}
      className="group glass flex h-full flex-col rounded-card p-3 text-left transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Visual src={item.image} hover />
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
          {sale && <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink">Save</span>}
          {item.isNew && <span className="rounded-full bg-ivory px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink">New</span>}
          <span className="ml-auto rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ivory/80 backdrop-blur">
            {item.badge}
          </span>
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent backdrop-blur">
          {item.service ? "Done for you" : `${item.options.map((o) => o.license).join(" + ")} license`}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <h3 className="text-[17px] font-medium leading-snug">{item.title}</h3>
        <p className="text-muted mt-1.5 line-clamp-2 text-[14px] leading-relaxed">{item.blurb}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <Price price={item.options.length > 1 ? `from ${cheapest.price}` : cheapest.price} compareAt={sale?.compareAt} />
          <span className="rounded-full border hairline px-4 py-2 text-[13px] font-medium transition-colors group-hover:border-accent group-hover:text-accent">
            Quick view
          </span>
        </div>
      </div>
    </motion.button>
  );
});

/** Product page as a modal: gallery, license picker, rights checklist, what's inside, bundle upsell. */
function QuickView({ item, onClose, onOpen }: { item: ShopItem; onClose: () => void; onOpen: (id: string) => void }) {
  const [img, setImg] = useState(0);
  const [pick, setPick] = useState(item.options.length - 1);
  const opt = item.options[pick];
  const live = !!opt.code;
  const bundle = item.bundleId ? byId(item.bundleId) : undefined;
  /** Resell license shown in the "you can" checklist; none for done-for-you services. */
  const lic = opt.license === "DFY" ? null : opt.license;

  useEffect(() => {
    setImg(0);
    setPick(item.options.length - 1);
  }, [item]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92svh] w-full max-w-5xl overflow-y-auto rounded-t-[24px] border hairline bg-ink md:rounded-[24px]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-ink/80 text-[20px] text-ivory backdrop-blur hover:text-accent"
        >
          ×
        </button>
        <div className="grid gap-8 p-5 md:grid-cols-2 md:p-8">
          <div>
            <div className="aspect-square overflow-hidden rounded-xl">
              <Visual src={item.gallery[img]} alt={`${item.title} — image ${img + 1}`} />
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {item.gallery.map((g, i) => (
                <button
                  key={g}
                  onClick={() => setImg(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${i === img ? "border-accent" : "border-ivory/15 opacity-75 hover:opacity-100"}`}
                >
                  <Visual src={g} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              {item.badge} · {item.formats.join(" / ")}
            </p>
            <h2 className="mt-3 pr-10 text-[30px] font-medium leading-tight tracking-[-0.02em]">{item.title}</h2>
            <p className="text-muted mt-3 text-[15px] leading-relaxed">{item.blurb}</p>

            <div className="mt-6 flex items-end justify-between gap-4 border-y hairline py-5">
              <div>
                <Price price={opt.price} compareAt={opt.compareAt} big />
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/45">
                  {item.service ? "One-time · VAT incl. · no monthly fees" : "VAT incl. · instant download"}
                </p>
              </div>
              {item.options.length > 1 && (
                <div role="radiogroup" aria-label="License" className="flex gap-1 rounded-full border hairline p-1">
                  {item.options.map((o, i) => (
                    <button
                      key={o.license}
                      role="radio"
                      aria-checked={pick === i}
                      onClick={() => setPick(i)}
                      className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] tracking-[0.15em] transition-colors ${
                        pick === i ? "bg-accent text-ink" : "text-ivory/60 hover:text-ivory"
                      }`}
                    >
                      {o.license}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {item.service ? (
              <a href="#contact" onClick={onClose} className="btn btn-accent mt-6 w-full">
                Book your website <span aria-hidden="true">→</span>
              </a>
            ) : (
              <a href={buyHref(opt.code)} onClick={live ? undefined : onClose} className="btn btn-accent mt-6 w-full">
                {live ? `Buy with ${opt.license} license — ${opt.price}` : "Coming soon · get notified"} <span aria-hidden="true">→</span>
              </a>
            )}

            {lic && (
              <div className="mt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/45">{licenseName(lic)} — you can</p>
                <ul className="mt-3 grid gap-2 text-[14px] text-ivory/85 sm:grid-cols-2">
                  {licenseRows
                    .filter((r) => r.values[lic])
                    .map((r) => (
                      <li key={r.label} className="flex gap-2.5">
                        <span className="text-accent" aria-hidden="true">✓</span>
                        <span>
                          {r.label}
                          {typeof r.values[lic] === "string" && <span className="text-ivory/45"> ({r.values[lic]})</span>}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            <div className="mt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/45">{item.service ? "What we build for you" : "What's inside"}</p>
              <ul className="mt-3 space-y-2 text-[14px] leading-snug text-ivory/85">
                {item.includes.map((i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/45">Perfect for</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.perfectFor.map((p) => (
                  <span key={p} className="rounded-full border hairline px-3 py-1.5 text-[13px] text-ivory/75">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {bundle && (
              <button
                onClick={() => onOpen(bundle.id)}
                className="surface mt-7 flex items-center gap-4 rounded-xl p-3 text-left transition-colors hover:!border-accent/50"
              >
                <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Visual src={bundle.image} />
                </span>
                <span className="flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Bundle &amp; save</span>
                  <span className="mt-1 block text-[15px] font-medium">{bundle.title}</span>
                </span>
                <Price price={bundle.options[0].price} compareAt={bundle.options[0].compareAt} />
              </button>
            )}

            <p className="mt-7 text-[12px] leading-relaxed text-ivory/40">
              {item.service
                ? "Price covers the scope above; extra pages or products are quoted separately. Results depend on your own marketing — we don't promise specific earnings."
                : "Results depend on your own marketing — we don't promise specific earnings. Full license terms are included in the download."}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Shop() {
  const [cat, setCat] = useState<(typeof categories)[number]["key"]>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const active = categories.find((c) => c.key === cat)!;
  const items = shopItems.filter(active.match);
  const open = openId ? byId(openId) : undefined;
  const close = useCallback(() => setOpenId(null), []);

  return (
    <section id="plr-shop" className="py-section">
      <div className="container-x">
        <SectionHead
          eyebrow="PLR Shop"
          title={
            <>
              Done-for-you products, <span className="serif-i text-accent">ready to resell.</span>
            </>
          }
          intro="Ebooks with MRR or PLR rights and mockup templates with a commercial-use license. Open any product to see the images, what's inside and exactly what the license lets you do."
        />

        <div data-reveal className="-mx-6 mt-12 overflow-x-auto px-6 [scrollbar-width:none]">
          <div role="tablist" aria-label="Categories" className="flex w-max gap-2">
            {categories
              .filter((c) => shopItems.some(c.match))
              .map((c) => (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={cat === c.key}
                  onClick={() => setCat(c.key)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-[14px] transition-colors ${
                    cat === c.key ? "border-accent bg-accent text-ink" : "hairline text-ivory/70 hover:text-ivory"
                  }`}
                >
                  {c.label}
                  <span className={`ml-2 font-mono text-[11px] ${cat === c.key ? "text-ink/60" : "text-ivory/35"}`}>{shopItems.filter(c.match).length}</span>
                </button>
              ))}
          </div>
        </div>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((i) => (
              <Card key={i.id} item={i} onOpen={() => setOpenId(i.id)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p data-reveal className="mt-8 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/45">
          One-time payment · VAT included · License certificate in every download
        </p>
      </div>

      <AnimatePresence>{open && <QuickView key="qv" item={open} onClose={close} onOpen={setOpenId} />}</AnimatePresence>
    </section>
  );
}
