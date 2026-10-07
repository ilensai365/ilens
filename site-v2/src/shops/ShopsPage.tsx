import type { ReactNode } from "react";
import { aiAssistant, businessTypes, industries, storeAddOns, storeExternal, storeFaq, storePackages } from "../data/shops";
import { CONTACT_EMAIL, socials } from "../data/site";
import { clients, projects } from "../data/studio";
import LeadForm from "../marketing/LeadForm";

const nav = [
  { label: "Industries", href: "#industries" },
  { label: "AI assistant", href: "#ai" },
  { label: "Packages", href: "#packages" },
  { label: "Google Ads", href: "/marketing/" },
];

const formProps = {
  question: "What kind of business is it?",
  goalOptions: businessTypes,
  subject: "Store quote",
  extraLabel: "When do you want to launch?",
  extraOptions: ["As soon as possible", "Within 1–2 months", "In 3+ months", "Just exploring"],
};

// Hero promises: all things we control (no results guaranteed).
const promises = ["Fixed price before we start", "Live in 2–6 weeks", "You own the store and accounts", "Only 30% to start"];

/** Scrolling strip of the industry concepts under the hero, so visitors see the result before the details. */
function ConceptStrip() {
  const shots = [...industries, ...industries];
  return (
    <div className="relative overflow-hidden border-y hairline py-6" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-4 motion-reduce:animate-none">
        {shots.map((x, i) => (
          <img key={i} src={x.image} alt="" loading="lazy" className="h-[180px] w-auto rounded-[14px] ring-1 ring-ivory/10 sm:h-[230px]" />
        ))}
      </div>
    </div>
  );
}

/** Wordmark strip of brands we've worked with. */
export function ClientStrip() {
  return (
    <div className="container-x py-10">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/45">Brands we've worked with</p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {clients.map((c) => (
          <li key={c} className="font-display text-[22px] tracking-[-0.01em] text-ivory/60 sm:text-[26px]">{c}</li>
        ))}
      </ul>
    </div>
  );
}

/** Real web projects from the studio portfolio (same data as /studio). */
function Work() {
  const ids = ["ilens-guides", "g-volt", "centrum-seo", "block-street", "property-developer", "cube-casino"];
  const items = ids.map((id) => projects.find((p) => p.id === id)).filter((p): p is (typeof projects)[number] => !!p);
  return (
    <section id="work" className="border-t hairline py-section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Websites & stores <span className="serif-i text-accent">we've designed.</span></h2>
          </div>
          <a href="/studio/#work" className="btn btn-ghost shrink-0 self-start lg:self-auto">Full portfolio →</a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((p) => (
            <a key={p.id} href="/studio/#work" className="group relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-black">
              <img src={p.cover} alt={p.title} loading="lazy" style={{ objectPosition: p.focus ?? "50% 45%" }} className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-80" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,#0B0A08_10%,rgba(11,10,8,0.4)_55%,transparent)]" aria-hidden="true" />
              <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-ivory/10 transition-colors group-hover:ring-accent/50" aria-hidden="true" />
              <div className="absolute inset-x-4 bottom-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{p.sector}</p>
                <p className="mt-1 font-display text-[20px] leading-tight sm:text-[24px]">{p.title}</p>
                <p className="text-muted mt-1 hidden text-[13px] sm:block">{p.deliverables.slice(0, 3).join(" · ")}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink/80 backdrop-blur-xl">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="/" className="flex items-baseline gap-3" aria-label="iLens home">
          <span className="font-display text-2xl">iLens</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-accent sm:inline">Stores</span>
        </a>
        <nav aria-label="Stores" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[14px]">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-muted hover:text-ivory">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <a href="#quote" className="btn btn-accent px-5 py-2.5 text-[14px]">Get a quote</a>
      </div>
    </header>
  );
}

function Check({ children }: { children: ReactNode }) {
  return <li className="flex gap-3"><span className="text-accent" aria-hidden="true">✓</span>{children}</li>;
}

export default function ShopsPage() {
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute left-[35%] top-[-40%] h-[140%] w-[36vw] rotate-[20deg] blur-3xl"
            style={{ background: "linear-gradient(to bottom, var(--beam), transparent 75%)" }}
            aria-hidden="true"
          />
          <div className="container-x relative grid items-center gap-12 pb-20 pt-16 lg:grid-cols-12 lg:pt-24">
            <div className="lg:col-span-7">
              <p className="eyebrow">iLens Stores · Malta · 2026</p>
              <h1 className="mt-6 text-display font-medium">
                Websites & online stores <span className="serif-i text-accent">that sell.</span>
              </h1>
              <p className="text-muted mt-7 max-w-xl text-[18px]">
                For salons, cosmetics brands, electronics shops, boutiques, restaurants and digital products in Malta and
                across Europe. Designed, built, tracked and ready for ads, with an AI assistant if you want one.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="btn btn-accent">Get my quote →</a>
                <a href="#industries" className="btn btn-ghost">Find your industry</a>
              </div>
              <ul className="mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
                {promises.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-[15px]">
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-accent text-[12px] font-bold text-ink" aria-hidden="true">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="scroll-mt-24 lg:col-span-5">
              <LeadForm id="quote" {...formProps} />
            </div>
          </div>
        </section>

        <ConceptStrip />
        <ClientStrip />

        {/* Industries */}
        <section id="industries" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">By industry</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Built for <span className="serif-i text-accent">your kind of business.</span></h2>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((x) => (
                <article key={x.id} id={x.id} className="surface group flex scroll-mt-24 flex-col overflow-hidden rounded-card">
                  <div className="relative aspect-[16/10] overflow-hidden border-b hairline bg-black">
                    <img src={x.image} alt={`Example ${x.tag.toLowerCase()} store concept`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{x.tag}</p>
                  <h3 className="mt-3 text-h3 font-medium">{x.title}</h3>
                  <p className="text-muted mt-2">{x.lead}</p>
                  <ul className="mt-6 flex-1 space-y-3 border-t hairline pt-6 text-[15px]">
                    {x.points.map((p) => <Check key={p}>{p}</Check>)}
                  </ul>
                  <div className="mt-7 flex items-center justify-between gap-4">
                    <p className="text-[20px] font-medium">{x.price}</p>
                    <a href="#quote" className="rounded-full border hairline px-4 py-2 text-[13px] text-ivory/85 transition-colors hover:border-accent hover:text-accent">Ask →</a>
                  </div>
                  </div>
                </article>
              ))}
              <article className="glass flex flex-col justify-center rounded-card p-7">
                <h3 className="text-h3 font-medium">Something else?</h3>
                <p className="text-muted mt-2">Gyms, clinics, real estate, tour operators: tell us what you sell and we'll shape the right store.</p>
                <a href="#quote" className="btn btn-accent mt-6 self-start">Tell us →</a>
              </article>
            </div>
          </div>
        </section>

        <Work />

        {/* AI assistant */}
        <section id="ai" className="relative overflow-hidden border-t hairline py-section">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 50% 60% at 80% 40%, var(--glow), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="container-x relative grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">New · {aiAssistant.title}</p>
              <h2 className="mt-5 text-h1 font-medium">Your best salesperson, <span className="serif-i text-accent">awake 24/7.</span></h2>
              <p className="text-muted mt-5 text-[17px]">{aiAssistant.lead}</p>
              <ul className="mt-8 space-y-3 text-[15px]">
                {aiAssistant.points.map((p) => <Check key={p}>{p}</Check>)}
              </ul>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-3">
                <span className="text-[22px] font-medium">{aiAssistant.price}</span>
                <span className="text-muted text-[14px]">one-off setup · included in Premium</span>
              </p>
              <p className="text-muted mt-2 text-[13px]">{aiAssistant.note}</p>
            </div>
            <div className="lg:col-span-6">
              <div className="glass rounded-card p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/55">Store chat</p>
                  <span className="rounded-full border hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/45">Example</span>
                </div>
                <div className="mt-6 space-y-4">
                  {aiAssistant.sample.map((m, i) =>
                    m.from === "customer" ? (
                      <p key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-ivory/[0.08] px-4 py-3 text-[15px]">{m.text}</p>
                    ) : (
                      <div key={i} className="flex gap-3">
                        <span className="mt-1 h-8 w-8 flex-none rounded-full" style={{ background: "conic-gradient(#E2B464,#F6DDA4,#B98840,#E2B464)" }} aria-hidden="true" />
                        <p className="max-w-[85%] rounded-2xl rounded-bl-md border border-accent/30 bg-accent/[0.08] px-4 py-3 text-[15px]">{m.text}</p>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-6 flex gap-2 border-t hairline pt-5">
                  {["Add to basket", "Delivery options", "Talk to a person"].map((c) => (
                    <span key={c} className="rounded-full border hairline px-3 py-1.5 text-[12px] text-ivory/70">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">Store packages 2026</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Three ways <span className="serif-i text-accent">to launch.</span></h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {storePackages.map((p) => (
                <article key={p.name} className={`flex flex-col rounded-card p-7 ${p.premium ? "glass border border-accent/40" : "surface"}`}>
                  {p.premium && <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Most chosen</p>}
                  <h3 className="text-h3 font-medium">{p.name}</h3>
                  <p className="text-muted mt-1 text-[15px]">{p.tagline}</p>
                  <p className="mt-3 text-[22px] font-medium tracking-[-0.01em]">{p.price}</p>
                  <ul className="mt-6 flex-1 space-y-3 border-t hairline pt-6 text-[15px]">
                    {p.features.map((f) => <Check key={f}>{f}</Check>)}
                  </ul>
                  <a href="#quote" className={`btn mt-8 ${p.premium ? "btn-accent" : "btn-ghost"}`}>Ask about {p.name} →</a>
                </article>
              ))}
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              <div className="surface rounded-card p-7">
                <h3 className="text-[20px] font-medium">Add-ons</h3>
                <ul className="mt-5 divide-y divide-ivory/[0.08] text-[15px]">
                  {storeAddOns.map((a) => (
                    <li key={a.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span>{a.name}</span>
                      <span className="whitespace-nowrap font-mono text-[13px] text-accent">{a.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="surface rounded-card p-7">
                <h3 className="text-[20px] font-medium">Paid to other providers</h3>
                <p className="text-muted mt-2 text-[14px]">Not in our price. We help you choose and set them up, start to finish.</p>
                <ul className="mt-5 divide-y divide-ivory/[0.08] text-[15px]">
                  {storeExternal.map((a) => (
                    <li key={a.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span>{a.name}</span>
                      <span className="text-muted whitespace-nowrap text-[13px]">{a.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-muted mt-6 text-[15px]">
              All prices exclude VAT. Typical delivery 2–6 weeks. 30% to start, the rest at launch.
            </p>
          </div>
        </section>

        {/* FAQ + contact */}
        <section id="contact" className="relative overflow-hidden border-t hairline py-section">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
            style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, var(--glow), transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="container-x relative grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Get a quote</p>
              <h2 className="mt-5 text-h1 font-medium">Tell us about <span className="serif-i text-accent">your store.</span></h2>
              <p className="text-muted mt-5">
                Or write to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-ivory underline decoration-accent/60 underline-offset-4">{CONTACT_EMAIL}</a>
              </p>
              <dl className="mt-10 space-y-6">
                {storeFaq.map((f) => (
                  <div key={f.q} className="border-t hairline pt-5">
                    <dt className="font-medium">{f.q}</dt>
                    <dd className="text-muted mt-2 text-[15px]">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="scroll-mt-24 lg:col-span-7">
              <LeadForm id="quote-bottom" {...formProps} />
            </div>
          </div>
        </section>
      </main>

      <a href="#quote" className="btn btn-accent fixed inset-x-4 bottom-4 z-40 justify-center shadow-2xl md:hidden">
        Get my quote →
      </a>

      <footer className="border-t hairline pb-24 md:pb-0">
        <div className="container-x flex flex-col justify-between gap-4 py-8 text-[13px] text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} iLens · <a href="/studio/" className="hover:text-ivory">Studio</a> · <a href="/marketing/" className="hover:text-ivory">Google Ads & tracking</a> · <a href="/" className="hover:text-ivory">Shop & guides</a></p>
          <p className="flex gap-5">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">{s.label}</a>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
