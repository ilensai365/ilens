import { motion } from "framer-motion";
import { products, type Product } from "../data/products";
import { BUNDLE } from "../data/site";
import SectionHead from "./SectionHead";
import { t } from "../lib/i18n";

const spanClass: Record<Product["span"], string> = {
  3: "md:col-span-6 lg:col-span-3",
  12: "md:col-span-12",
  4: "md:col-span-6 lg:col-span-4",
  6: "md:col-span-6",
  8: "md:col-span-12 lg:col-span-8",
};

function Cover({ p, large, accent, fill }: { p: Product; large?: boolean; accent?: boolean; fill?: boolean }) {
  return (
    <div
      className={`relative grid aspect-[16/10] place-items-center overflow-hidden rounded-xl ${
        p.featured || accent ? "bg-accent/[0.07]" : "bg-ivory/[0.03]"
      } ${large ? `md:aspect-auto md:h-full ${fill ? "md:min-h-[440px]" : "md:min-h-[380px]"}` : ""}`}
    >
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 50% 60%, var(--glow), transparent 65%)" }}
        aria-hidden="true"
      />
      <div className={`absolute inset-0 flex items-center justify-center ${large ? (fill ? "py-[7%] md:py-[5%]" : "py-[7%] md:py-[12%]") : "py-[7%]"}`}>
        <img
          src={p.cover}
          alt={t(`${p.title} cover`, `Okładka: ${p.title}`)}
          width={320}
          height={460}
          loading="lazy"
          decoding="async"
          className="h-full w-auto rounded-[3px] shadow-[0_24px_40px_-16px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1.5deg]"
        />
      </div>
    </div>
  );
}

/** Featured bundle: short title, scannable list of what's included, clear price row. */
function BundleCard({ p }: { p: Product }) {
  const included = products.filter((g) => g.status === "available" && !g.featured && g.inBundle !== false);
  return (
    <div data-reveal className={spanClass[p.span]}>
      <motion.a
        href={p.href}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group glass flex h-full flex-col gap-3 rounded-card !border-accent/50 p-3 shadow-[0_0_60px_-20px_var(--glow)] md:grid md:grid-cols-2"
      >
        <Cover p={p} large />
        <div className="flex flex-col p-5 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{t("Bundle · 4 guides", "Pakiet · 4 poradniki")}</span>
            <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-ink">
              {t("Save", "Oszczędzasz")} {BUNDLE.save}
            </span>
          </div>

          <h3 className="mt-5 text-[30px] font-medium leading-tight tracking-[-0.02em] md:text-[34px]">{p.title}</h3>
          <p className="text-muted mt-2 text-[15px] leading-relaxed">{t("The complete iLens library — from idea to first sale.", "Cała biblioteka iLens — od pomysłu do pierwszej sprzedaży.")}</p>

          <ul className="mt-6 grid gap-x-5 gap-y-2.5 border-t hairline pt-5 text-[14px] sm:grid-cols-2">
            {included.map((g) => (
              <li key={g.id} className="flex items-start gap-2.5 text-ivory/85">
                <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-[9px] text-accent" aria-hidden="true">
                  ✓
                </span>
                <span>
                  {g.title}
                  {g.pages && <span className="ml-1.5 font-mono text-[11px] text-ivory/40">{g.pages.replace(/ (pages|strony|stron)$/, t(" p.", " s."))}</span>}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t hairline pt-6 md:mt-auto">
            <div>
              <p className="flex items-baseline gap-2.5">
                <span className="text-[40px] font-semibold leading-none tracking-[-0.03em]">{p.price}</span>
                {p.compareAt && <s className="font-mono text-[14px] text-ivory/40">{p.compareAt}</s>}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/45">{t("One-time · VAT incl.", "Jednorazowo · VAT w cenie")}</p>
            </div>
            <span className="btn btn-accent">
              {t("Get the bundle", "Kup pakiet")}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

/** New-release spotlight: same card language as the bundle (glass, gold frame, lit cover panel), full width. */
function SpotlightCard({ p }: { p: Product }) {
  const s = p.spotlight!;
  return (
    <div data-reveal className={spanClass[p.span]}>
      <motion.a
        href={p.href}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group glass flex h-full flex-col gap-3 rounded-card !border-accent/50 p-3 shadow-[0_0_60px_-20px_var(--glow)] md:grid md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)]"
      >
        {/* Narrow, tall cover panel so the book fills it, like the bundle card. */}
        <Cover p={p} large accent fill />
        <div className="flex flex-col p-5 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{s.label}</span>
            <span className="whitespace-nowrap rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-ink">{t("New", "Nowość")}</span>
          </div>

          <h3 className="mt-5 text-[30px] font-medium leading-tight tracking-[-0.02em] md:text-[34px]">{p.title}</h3>
          <p className="mt-3 text-[16px] leading-relaxed text-ivory/90">{s.lead}</p>
          {s.body.map((para) => (
            <p key={para} className="text-muted mt-3 max-w-2xl text-[15px] leading-relaxed">{para}</p>
          ))}

          <ul className="mt-6 grid gap-x-5 gap-y-2.5 border-t hairline pt-5 text-[14px] sm:grid-cols-2">
            {p.includes?.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-ivory/85">
                <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent/15 text-[9px] text-accent" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t hairline pt-6 md:mt-auto">
            <div>
              <p className="text-[40px] font-semibold leading-none tracking-[-0.03em]">{p.price}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/45">{s.stats.join(" · ")}</p>
            </div>
            <span className="btn btn-accent">
              {t("Get the guide", "Kup poradnik")}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

/** Single guide / coming-soon card: label, title, two-line blurb, price + action pinned to the bottom. */
function ProductCard({ p }: { p: Product }) {
  const soon = p.status === "soon";
  // Reveal (GSAP) and hover lift (Framer) sit on separate elements so their transforms don't fight.
  return (
    <div data-reveal className={spanClass[p.span]}>
      <motion.a
        href={p.href}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group glass flex h-full flex-col rounded-card p-3"
      >
        <Cover p={p} />
        <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
          <span className={`font-mono text-[11px] uppercase tracking-[0.25em] ${soon ? "text-ivory/40" : "text-accent"}`}>
            {soon ? t("Coming soon", "Wkrótce") : `${t("Guide", "Poradnik")} · PDF${p.pages ? ` · ${p.pages}` : ""}`}
          </span>
          <h3 className="mt-2.5 text-[20px] font-medium leading-snug tracking-[-0.01em]">{p.title}</h3>
          <p className="text-muted mb-6 mt-2 line-clamp-2 text-[15px] leading-relaxed">{p.blurb}</p>
          {p.includes && (
            <div className="mb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/40">{t("Inside", "W środku")}</p>
              <ul className="mt-3 space-y-2 text-[14px] leading-snug text-ivory/80">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto flex items-center justify-between border-t hairline pt-4">
            <span className={`text-[18px] font-semibold tracking-[-0.01em] ${soon ? "text-ivory/40" : ""}`}>
              {p.price ?? t("Soon", "Wkrótce")}
            </span>
            <span className={`inline-flex items-center gap-2 text-[14px] font-medium ${soon ? "text-ivory/60" : "text-accent"}`}>
              {soon ? t("Get notified", "Powiadom mnie") : t("Get the guide", "Kup poradnik")}
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </div>
      </motion.a>
    </div>
  );
}

export default function Shop() {
  return (
    <section id="shop" className="py-section">
      <div className="container-x">
        <SectionHead
          eyebrow={t("The Shop", "Sklep")}
          title={
            <>
              {t("Guides and tools to create, ", "Poradniki i narzędzia, żeby tworzyć, ")}<span className="serif-i text-accent">{t("launch and sell.", "startować i sprzedawać.")}</span>
            </>
          }
        />
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12">
          {products.map((p) => (
            p.spotlight ? <SpotlightCard key={p.id} p={p} /> : p.featured ? <BundleCard key={p.id} p={p} /> : <ProductCard key={p.id} p={p} />
          ))}
        </div>
        <p data-reveal className="mt-8 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/45">
          {t("One-time payment · VAT included · Instant PDF download", "Jednorazowa płatność · VAT w cenie · PDF od razu")}
        </p>
      </div>
    </section>
  );
}
