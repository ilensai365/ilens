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
            <a key={p.id} href="/studio/#work" className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-black">
              <img src={p.cover} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-[1.35]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/30 to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-ivory/10 transition-colors group-hover:ring-accent/50" aria-hidden="true" />
              <div className="absolute inset-x-4 bottom-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{p.sector}</p>
                <p className="mt-1 font-display text-[22px] leading-tight">{p.title}</p>
              </div>
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
