import { packages, projects } from "../data/studio";
import SectionHead from "./SectionHead";

/** Teaser for iLens Studio (done-for-you work) on the product-first home page; full page at /studio. */
export default function Services() {
  const thumbs = ["centrum-seo", "lumiere", "g-volt", "cube-casino"].map((id) => projects.find((p) => p.id === id)!);

  return (
    <section id="services" className="border-t hairline py-section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="iLens Studio"
            title={
              <>
                Prefer we <span className="serif-i text-accent">build it for you?</span>
              </>
            }
            intro="The guides are how we work, written down. The studio is the same team doing it for your brand: identity, websites, campaigns and social media."
          />
          <a data-reveal href="/studio/" className="btn btn-ghost shrink-0 self-start lg:self-auto">
            See the studio →
          </a>
        </div>

        <div data-reveal className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {thumbs.map((p) => (
            <a key={p.id} href="/studio/#work" className="group overflow-hidden rounded-xl border hairline">
              <img src={p.images[0]} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <p className="px-4 py-3 text-[14px]">
                {p.title} <span className="text-ivory/40">· {p.sector}</span>
              </p>
            </a>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {packages.map((p) => (
            <a
              key={p.name}
              data-reveal
              href="/studio/#packages"
              className={`flex flex-col rounded-card p-7 transition-colors ${p.premium ? "border-2 border-accent bg-accent/[0.05]" : "surface hover:border-accent/30"}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{p.tagline}</span>
              <h3 className="mt-3 text-h3 font-medium">{p.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-[24px] font-semibold">{p.price}</span>
                <span className="text-muted text-[13px]">{p.unit}</span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
