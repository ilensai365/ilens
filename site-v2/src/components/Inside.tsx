import { insideStats } from "../data/site";
import { products } from "../data/products";

/** Proof without invented reviews: real numbers and what each guide covers. */
export default function Inside() {
  const guides = products.filter((p) => p.status === "available" && !p.featured);

  return (
    <section id="inside" className="py-section">
      <div className="container-x">
        <div className="grid gap-px overflow-hidden rounded-card border hairline bg-ivory/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {insideStats.map((s) => (
            <div key={s.label} data-reveal className="bg-ink p-8 md:p-10">
              <p className="font-display text-display text-accent">{s.value}</p>
              <p className="text-muted mt-2 font-mono text-mono uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
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
