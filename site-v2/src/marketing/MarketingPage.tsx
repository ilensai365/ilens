import { marketingFaq, marketingPackages, marketingServices, marketingSteps } from "../data/marketing";
import { CONTACT_EMAIL, socials } from "../data/site";
import LeadForm from "./LeadForm";

const nav = [
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "How it works", href: "#how" },
  // { label: "Stores", href: "/shops/" }, // hidden until /shops is finished (owner, 2026-10-07)
  { label: "Studio", href: "/studio/" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink/80 backdrop-blur-xl">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="/" className="flex items-baseline gap-3" aria-label="iLens home">
          <span className="font-display text-2xl">iLens</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-accent sm:inline">Marketing</span>
        </a>
        <nav aria-label="Marketing" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[14px]">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted hover:text-ivory">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#quote" className="btn btn-accent px-5 py-2.5 text-[14px]">Get a quote</a>
      </div>
    </header>
  );
}

/** Hero visual: a mock "your week" dashboard. Illustrative only, labelled as an example. */
function DashboardCard() {
  const rows = [
    { k: "Ad clicks", v: "Google Ads", w: "72%" },
    { k: "Visitors by source", v: "GA4", w: "88%" },
    { k: "Sales from ads", v: "Conversions", w: "46%" },
    { k: "Consent rate", v: "Cookie banner", w: "64%" },
  ];
  return (
    <div className="glass rounded-card p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/50">Your week, measured</p>
        <span className="rounded-full border hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/45">Example</span>
      </div>
      <ul className="mt-6 space-y-5">
        {rows.map((r) => (
          <li key={r.k}>
            <div className="flex items-baseline justify-between text-[14px]">
              <span>{r.k}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{r.v}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ivory/[0.08]">
              <div className="h-full rounded-full" style={{ width: r.w, background: "linear-gradient(90deg,#C99A4E,#E2B464,#F0CF8E)" }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="text-muted mt-6 border-t hairline pt-5 text-[14px]">
        One setup, four answers: who came, from where, what they bought, and which ad paid for itself.
      </p>
    </div>
  );
}

export default function MarketingPage() {
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
              <p className="eyebrow">iLens Marketing · Malta</p>
              <h1 className="mt-6 text-display font-medium">
                Ads you can <span className="serif-i text-accent">actually measure.</span>
              </h1>
              <p className="text-muted mt-7 max-w-xl text-[18px]">
                Google Ads, GA4, conversion tracking, GDPR cookie consent and Search Console, set up properly for brands in
                Malta and across Europe. Stop guessing which post or ad brought the sale.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#quote" className="btn btn-accent">Get my quote →</a>
                <a href="#packages" className="btn btn-ghost">See packages</a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/50">
                {["Google Ads", "GA4", "Conversions", "GDPR cookies", "Search Console"].map((t) => (
                  <li key={t}><span className="mr-2 text-accent">·</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="scroll-mt-24 lg:col-span-5">
              <LeadForm id="quote" />
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="border-t hairline py-section">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Why it matters</p>
              <h2 className="mt-5 text-h1 font-medium">Most small brands <span className="serif-i text-accent">advertise blind.</span></h2>
              <div className="mt-10"><DashboardCard /></div>
            </div>
            <div className="text-muted space-y-5 text-[17px] lg:col-span-7">
              <p>
                Ads run, money goes out, and nobody knows which click turned into a customer. Without conversion tracking,
                Google can't learn who to show your ads to, so every euro works harder for Google than for you.
              </p>
              <p>
                In the EU there's one more step: since 2024 Google expects Consent Mode v2 and a proper cookie banner, or
                it measures far less. We set it all up in one go and test it on a real visit before your ads go live.
              </p>
              <p className="text-ivory">
                We run the same setup on our own store, ilens.co, so we know every screen of it.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">Services</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Five pieces, <span className="serif-i text-accent">one clear picture.</span></h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-card border hairline bg-ivory/[0.08] md:grid-cols-2 lg:grid-cols-3">
              {marketingServices.map((s) => (
                <article key={s.id} className="flex flex-col bg-ink p-8">
                  <span className="font-mono text-mono text-accent">{s.tag}</span>
                  <h3 className="mt-3 text-h3 font-medium">{s.title}</h3>
                  <p className="text-muted mt-2">{s.lead}</p>
                  <ul className="mt-6 space-y-3 border-t hairline pt-6 text-[15px]">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3"><span className="text-accent" aria-hidden="true">✓</span>{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
              <article className="flex flex-col justify-between bg-ink p-8">
                <div>
                  <span className="font-mono text-mono text-accent">+</span>
                  <h3 className="mt-3 text-h3 font-medium">Prefer to learn it yourself?</h3>
                  <p className="text-muted mt-2">Our guide shows how AI answers pick brands, and how the new ChatGPT ads fit in.</p>
                </div>
                <a href="https://payhip.com/b/DZMga" className="mt-6 self-start rounded-full border hairline px-3.5 py-1.5 text-[13px] text-ivory/85 transition-colors hover:border-accent hover:text-accent">
                  Your Business in ChatGPT →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">Packages</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Start with tracking, <span className="serif-i text-accent">then grow.</span></h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {marketingPackages.map((p) => (
                <article key={p.name} className={`flex flex-col rounded-card p-7 ${p.premium ? "glass border border-accent/40" : "surface"}`}>
                  {p.premium && <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Most chosen</p>}
                  <h3 className="text-h3 font-medium">{p.name}</h3>
                  <p className="text-muted mt-1 text-[15px]">{p.tagline}</p>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                    <span className="whitespace-nowrap text-[22px] font-medium tracking-[-0.01em]">{p.price}</span>
                    <span className="text-muted text-[14px]">{p.unit}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 border-t hairline pt-6 text-[15px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3"><span className="text-accent" aria-hidden="true">✓</span>{f}</li>
                    ))}
                  </ul>
                  <a href="#contact" className={`btn mt-8 ${p.premium ? "btn-accent" : "btn-ghost"}`}>Ask about {p.name} →</a>
                </article>
              ))}
            </div>
            <p className="text-muted mt-6 text-[15px]">All prices exclude VAT. Ad budget is paid directly to Google and isn't included.</p>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Four steps, <span className="serif-i text-accent">no jargon.</span></h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {marketingSteps.map((s, i) => (
                <li key={s.title} className="surface rounded-card p-6">
                  <span className="font-mono text-mono text-accent">0{i + 1}</span>
                  <h3 className="mt-3 text-[20px] font-medium">{s.title}</h3>
                  <p className="text-muted mt-2 text-[15px]">{s.body}</p>
                </li>
              ))}
            </ol>
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
              <h2 className="mt-5 text-h1 font-medium">Tell us about <span className="serif-i text-accent">your ads.</span></h2>
              <p className="text-muted mt-5">
                Or write to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-ivory underline decoration-accent/60 underline-offset-4">{CONTACT_EMAIL}</a>
              </p>
              <dl className="mt-10 space-y-6">
                {marketingFaq.map((f) => (
                  <div key={f.q} className="border-t hairline pt-5">
                    <dt className="font-medium">{f.q}</dt>
                    <dd className="text-muted mt-2 text-[15px]">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="scroll-mt-24 lg:col-span-7">
              <LeadForm id="quote-bottom" />
            </div>
          </div>
        </section>
      </main>

      {/* Mobile: the quote button stays in reach while scrolling. */}
      <a href="#quote" className="btn btn-accent fixed inset-x-4 bottom-4 z-40 justify-center shadow-2xl md:hidden">
        Get my quote →
      </a>

      <footer className="border-t hairline pb-24 md:pb-0">
        <div className="container-x flex flex-col justify-between gap-4 py-8 text-[13px] text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} iLens · <a href="/studio/" className="hover:text-ivory">Studio</a> · <a href="/" className="hover:text-ivory">Shop & guides</a> · <a href="/free/" className="hover:text-ivory">Free prompts</a></p>
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
