import { steps } from "../data/site";
import SectionHead from "./SectionHead";

export default function HowItWorks() {
  return (
    <section id="how" className="border-t hairline py-section">
      <div className="container-x">
        <SectionHead
          eyebrow="How it works"
          title={
            <>
              From download to <span className="serif-i text-accent">your first sale.</span>
            </>
          }
        />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-card border hairline bg-ivory/[0.08] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} data-reveal className="bg-ink p-7">
              <span className="font-mono text-[12px] tracking-[0.2em] text-accent">{s.n}</span>
              <h3 className="mt-6 font-display text-[30px] leading-tight">{s.title}</h3>
              <p className="text-muted mt-3 text-[15px] leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
