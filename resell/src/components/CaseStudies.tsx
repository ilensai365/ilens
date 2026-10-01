import { caseStudies } from "../data/site";
import SectionHead from "./SectionHead";

/** Worked examples per license. Labelled as examples — no invented customer results. */
export default function CaseStudies() {
  return (
    <section id="case-studies" className="border-t hairline py-section">
      <div className="container-x">
        <SectionHead
          eyebrow="Case studies"
          title={
            <>
              One product, <span className="serif-i text-accent">three ways to profit.</span>
            </>
          }
          intro="Worked examples of what each license lets you do. Real customer stories will appear here after launch."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <article key={c.title} data-reveal className="glass flex flex-col rounded-card p-6 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.15em] text-ink">
                  {c.license}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/45">Example · {c.product}</span>
              </div>
              <h3 className="mt-6 text-[22px] font-medium leading-snug tracking-[-0.01em]">{c.title}</h3>
              <ol className="mt-6 space-y-3 border-t hairline pt-5 text-[15px] text-ivory/80">
                {c.steps.map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <p className="mt-auto border-t hairline pt-5 font-display text-[18px] italic leading-snug text-ivory/90 [margin-top:1.5rem]">
                {c.result}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
