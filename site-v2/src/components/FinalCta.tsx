import { motion } from "framer-motion";
import { SHOP_URL, CONTACT_EMAIL, marquee } from "../data/site";
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
          Ready to launch?
          <br />
          <span className="serif-i text-accent">Or still scrolling for ideas?</span>
        </h2>
        <div data-reveal className="mt-10">
          <motion.a href={SHOP_URL} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            Get the bundle — €120 <span aria-hidden="true">→</span>
          </motion.a>
        </div>
      </div>

      <div className="relative mt-section">
        <Marquee />
      </div>

      <div className="container-x relative py-section text-center">
        <p data-reveal className="eyebrow">
          Get in touch
        </p>
        <h3 data-reveal className="mx-auto mt-5 max-w-2xl text-h1 font-medium">
          Questions, or ready <span className="serif-i text-accent">to work together?</span>
        </h3>
        <p data-reveal className="text-muted mx-auto mt-5 max-w-xl">
          Ask about a product, book a 1:1 consultation or enquire about a custom project — we'll get back to you
          personally at{" "}
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
