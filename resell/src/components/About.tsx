import { about } from "../data/site";
import SectionHead from "./SectionHead";

export default function About() {
  return (
    <section id="about" className="border-t hairline py-section">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="About"
            title={
              <>
                Products we'd sell <span className="serif-i text-accent">ourselves.</span>
              </>
            }
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p data-reveal className="text-[20px] leading-relaxed">
            {about.lead}
          </p>
          {about.body.map((p) => (
            <p key={p} data-reveal className="text-muted mt-5 text-[16px] leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="container-x mt-14 grid gap-3 md:grid-cols-3">
        {about.points.map((p) => (
          <div key={p.title} data-reveal className="surface rounded-card p-6">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent/15 text-[12px] text-accent">✓</span>
            <h3 className="mt-5 text-[18px] font-medium">{p.title}</h3>
            <p className="text-muted mt-2 text-[15px] leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
