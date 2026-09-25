import { services } from "../data/site";
import SectionHead from "./SectionHead";

export default function Services() {
  return (
    <section id="services" className="border-t hairline py-section">
      <div className="container-x">
        <SectionHead
          eyebrow="Work with iLens"
          title={
            <>
              Prefer a <span className="serif-i text-accent">personal approach?</span>
            </>
          }
          intro="Digital products come first — but a limited number of 1:1 sessions and custom projects are available each month."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <article key={s.title} data-reveal className="surface rounded-card p-8 transition-colors hover:border-accent/30">
              <span className="font-mono text-mono text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-h3 font-medium">{s.title}</h3>
              <p className="text-muted mt-3">{s.body}</p>
            </article>
          ))}
        </div>
        <a data-reveal href="#contact" className="btn btn-ghost mt-10">
          Book a session or enquire <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
