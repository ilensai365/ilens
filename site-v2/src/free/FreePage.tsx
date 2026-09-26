import { useState } from "react";
import { motion } from "framer-motion";
import { FREE_PACK_URL, freePrompts, howToUse, samplePrompt } from "../data/freePack";
import { BUNDLE, PAYHIP, socials } from "../data/site";

const BASE = import.meta.env.BASE_URL;

function CopyPrompt() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(samplePrompt.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the text stays selectable */
    }
  };
  return (
    <button onClick={copy} className="btn btn-ghost px-4 py-2 text-[13px]">
      {copied ? "Copied ✓" : "Copy prompt"}
    </button>
  );
}

/** Highlights [brackets] — the parts the reader fills in. */
function PromptText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith("[") ? (
          <span key={i} className="text-accent">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function FreePage() {
  return (
    <div className="min-h-screen bg-ink">
      <header className="container-x flex h-[72px] items-center justify-between">
        <a href="/" className="font-display text-2xl" aria-label="iLens home">
          iLens
        </a>
        <a href="/#shop" className="text-muted text-[14px] transition-colors hover:text-ivory">
          Shop →
        </a>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute right-[-10%] top-[-10%] h-[60vmax] w-[60vmax] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--glow), transparent 60%)" }}
            aria-hidden="true"
          />
          <div className="container-x relative grid items-center gap-12 pb-20 pt-10 md:grid-cols-12 md:pt-16">
            <div className="md:col-span-7">
              <p className="eyebrow">Free · Prompt pack</p>
              <h1 className="mt-6 text-h1 font-medium">
                10 AI prompts that write content <span className="serif-i text-accent">that sells.</span>
              </h1>
              <p className="text-muted mt-6 max-w-xl text-[17px]">
                Copy, paste, fill in the brackets. From a blank page to hooks, captions, carousels, video scripts and
                product pages — the prompts we use every day at iLens.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <motion.a href={FREE_PACK_URL} className="btn btn-accent" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  Get the free PDF <span aria-hidden="true">→</span>
                </motion.a>
                <a href="#inside" className="btn btn-ghost">
                  See what's inside
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/50">
                {["€0", "PDF", "Instant download", "English"].map((f) => (
                  <li key={f}>
                    <span className="mr-2 text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <img
                src={`${BASE}images/free-pack-cover.png`}
                alt="10 AI Prompts That Write Content That Sells — cover"
                width={960}
                height={1380}
                className="mx-auto w-56 rounded-[4px] shadow-[0_40px_80px_-24px_rgba(0,0,0,0.95)] md:w-full md:max-w-[300px]"
              />
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section id="inside" className="border-t hairline py-20 md:py-28">
          <div className="container-x grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">What's inside</p>
              <h2 className="mt-5 text-h1 font-medium">
                Ten prompts, <span className="serif-i text-accent">in the order you'd use them.</span>
              </h2>
              <p className="text-muted mt-5">From finding the problem to planning a whole week of posts.</p>
            </div>
            <ol className="lg:col-span-7 lg:col-start-6">
              {freePrompts.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t hairline py-5 last:border-b sm:grid-cols-[3rem_1fr_auto]">
                  <span className="font-mono text-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[18px] font-medium">{p.title}</h3>
                    <p className="text-muted mt-1 text-[15px]">{p.why}</p>
                  </div>
                  <span className="col-start-2 mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/40 sm:col-start-3 sm:mt-1">
                    {p.stage}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Sample prompt */}
        <section className="border-t hairline py-20 md:py-28">
          <div className="container-x max-w-3xl">
            <p className="eyebrow">Try one now</p>
            <h2 className="mt-5 text-h1 font-medium">
              Prompt {samplePrompt.number}: <span className="serif-i text-accent">{samplePrompt.title.toLowerCase()}.</span>
            </h2>
            <div className="glass mt-8 rounded-card p-6 md:p-8">
              <pre className="whitespace-pre-wrap font-mono text-[14px] leading-relaxed text-ivory/90">
                <PromptText text={samplePrompt.text} />
              </pre>
              <div className="mt-6 flex items-center justify-between gap-4 border-t hairline pt-5">
                <p className="text-muted text-[14px]">Gold brackets are the parts you fill in.</p>
                <CopyPrompt />
              </div>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section className="border-t hairline py-20 md:py-28">
          <div className="container-x">
            <p className="eyebrow">How to use it</p>
            <h2 className="mt-5 text-h1 font-medium">
              Three steps, <span className="serif-i text-accent">two minutes.</span>
            </h2>
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {howToUse.map((s, i) => (
                <li key={s.title} className="surface rounded-card p-7">
                  <span className="font-mono text-mono text-accent">Step {i + 1}</span>
                  <h3 className="mt-3 text-h3 font-medium">{s.title}</h3>
                  <p className="text-muted mt-2">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="glass mt-12 flex flex-col items-start justify-between gap-6 rounded-card p-7 md:flex-row md:items-center md:p-9">
              <div>
                <h3 className="text-h3 font-medium">Get all ten as a PDF</h3>
                <p className="text-muted mt-2 max-w-xl">
                  Enter your email at checkout and the download opens straight away. We'll also send a few short emails
                  with ways to use the prompts — unsubscribe any time.
                </p>
              </div>
              <motion.a href={FREE_PACK_URL} className="btn btn-accent shrink-0" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Get the free PDF <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
        </section>

        {/* Next step */}
        <section className="border-t hairline py-20 md:py-28">
          <div className="container-x">
            <p className="eyebrow">Want the whole system?</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">
              These are 10 prompts. <span className="serif-i text-accent">AI Content System has 30</span> — and the system
              around them.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <a href={PAYHIP("RX0Q7")} className="surface group rounded-card p-7 transition-colors hover:border-accent/40">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Guide · PDF · 29 pages</span>
                <h3 className="mt-3 text-h3 font-medium">AI Content System</h3>
                <p className="text-muted mt-2">Five-stage content loop, 30 prompts, seven hook types and a 7-day challenge.</p>
                <p className="mt-6 flex items-center justify-between border-t hairline pt-4">
                  <span className="text-[18px] font-semibold">€19</span>
                  <span className="text-[14px] font-medium text-accent">Get the guide →</span>
                </p>
              </a>
              <a href="/#shop" className="surface group rounded-card !border-accent/40 p-7">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Bundle · 4 guides · Save {BUNDLE.save}</span>
                <h3 className="mt-3 text-h3 font-medium">Build. Launch. Sell.</h3>
                <p className="text-muted mt-2">Content, storefront, ebook and first sale — the complete iLens library.</p>
                <p className="mt-6 flex items-center justify-between border-t hairline pt-4">
                  <span className="text-[18px] font-semibold">
                    {BUNDLE.price} <s className="ml-1 font-mono text-[13px] font-normal text-ivory/40">{BUNDLE.compareAt}</s>
                  </span>
                  <span className="text-[14px] font-medium text-accent">See the bundle →</span>
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t hairline">
        <div className="container-x flex flex-col justify-between gap-4 py-8 text-[13px] text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} iLens Studio</p>
          <p className="flex gap-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                {s.label}
              </a>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
