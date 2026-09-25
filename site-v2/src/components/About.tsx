import { about } from "../data/site";

export default function About() {
  return (
    <section id="about" className="border-t hairline py-section">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <p data-reveal className="eyebrow">
            About iLens
          </p>
          <h2 data-reveal className="mt-5 text-h1 font-medium">
            Where creative craft <span className="serif-i text-accent">meets intelligent systems.</span>
          </h2>
          <p data-reveal className="mt-8 font-display text-h3 leading-snug text-ivory/90">
            {about.lead}
          </p>
          {about.body.map((p) => (
            <p key={p.slice(0, 20)} data-reveal className="text-muted mt-5">
              {p}
            </p>
          ))}
          <ul data-reveal className="mt-8 flex flex-wrap gap-2">
            {about.tags.map((t) => (
              <li key={t} className="rounded-full border hairline px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-ivory/70">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal className="glass rounded-card p-8 md:p-10 lg:sticky lg:top-32">
            <p className="eyebrow">How we work</p>
            <ol className="mt-8">
              {about.principles.map((pr, i) => (
                <li key={pr.title} className="flex gap-5 border-t hairline py-5 first:border-t-0 first:pt-0 last:pb-0">
                  <span className="font-mono text-mono text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-[18px] font-medium">{pr.title}</h3>
                    <p className="text-muted mt-1 text-[15px]">{pr.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
