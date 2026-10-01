import { motion } from "framer-motion";
import { CONTACT_EMAIL, marquee, paths } from "../data/site";
import ContactForm from "./ContactForm";

function Marquee() {
  const run = [...marquee, ...marquee, ...marquee];
  return (
    <div className="group relative overflow-hidden border-y hairline py-6" aria-label={marquee.join(" · ")} role="marquee">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {run.map((word, i) => (
              <span key={i} className="flex items-center whitespace-nowrap px-6 font-mono text-[14px] uppercase tracking-eyebrow">
                <span className={i % 3 === 1 ? "text-accent" : "text-ivory/80"}>{word}</span>
                <span className="ml-12 text-accent/60">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden pt-section">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%]"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, var(--glow), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="container-x relative text-center">
        <p data-reveal className="eyebrow">
          Your move
        </p>
        <h2 data-reveal className="mx-auto mt-6 max-w-4xl text-display font-medium">
          Ready to <span className="serif-i text-accent">start?</span>
        </h2>
        <p data-reveal className="text-muted mx-auto mt-5 max-w-xl text-[17px]">
          Two ways in — learn the ropes for free, or skip straight to products you can sell this week.
        </p>
      </div>

      <div className="container-x relative mt-14 grid gap-6 text-left md:grid-cols-2">
        {paths.map((p) => (
          <div key={p.title} data-reveal>
            <motion.a
              href={p.href}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={`group glass flex h-full flex-col rounded-card p-7 md:p-9 ${p.primary ? "!border-accent/50 shadow-[0_0_60px_-20px_var(--glow)]" : ""}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{p.eyebrow}</span>
              <h3 className="mt-5 text-[28px] font-medium leading-tight tracking-[-0.02em] md:text-[32px]">{p.title}</h3>
              <p className="text-muted mb-8 mt-3 max-w-md text-[16px] leading-relaxed">{p.body}</p>
              <span className={`btn mt-auto self-start ${p.primary ? "btn-accent" : "btn-ghost"}`}>
                {p.cta}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.a>
          </div>
        ))}
      </div>

      <div className="relative mt-section">
        <Marquee />
      </div>

      <div className="container-x relative py-section text-center">
        <p data-reveal className="eyebrow">
          Get in touch
        </p>
        <h3 data-reveal className="mx-auto mt-5 max-w-2xl text-h1 font-medium">
          Not sure which license <span className="serif-i text-accent">you need?</span>
        </h3>
        <p data-reveal className="text-muted mx-auto mt-5 max-w-xl">
          Tell us what you want to sell and where — we'll tell you which license fits. Write to us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-ivory underline decoration-accent/60 underline-offset-4 hover:text-accent">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
        <div data-reveal className="mt-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
