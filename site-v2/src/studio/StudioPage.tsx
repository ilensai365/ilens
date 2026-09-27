import { useEffect, useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, packages, process, projects, sectors, services, studioFaq, type Category, type Project } from "../data/studio";
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT, socials } from "../data/site";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Process", href: "#process" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-ink/80 backdrop-blur-xl">
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <a href="/" className="flex items-baseline gap-3" aria-label="iLens home">
          <span className="font-display text-2xl">iLens</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-accent sm:inline">Studio</span>
        </a>
        <nav aria-label="Studio" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[14px]">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-muted hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/#shop" className="text-muted hover:text-ivory">
                Shop
              </a>
            </li>
          </ul>
        </nav>
        <a href="#contact" className="btn btn-accent px-5 py-2.5 text-[14px]">
          Start a project
        </a>
      </div>
    </header>
  );
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((n) => (n + 1) % p.images.length);
      if (e.key === "ArrowLeft") setI((n) => (n - 1 + p.images.length) % p.images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [p, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
    >
      <motion.div
        className="glass grid max-h-full w-full max-w-6xl overflow-auto rounded-card lg:grid-cols-[1fr_340px]"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-black">
          <img src={p.images[i]} alt={`${p.title} — image ${i + 1}`} className="max-h-[78vh] w-full object-contain" />
          {p.images.length > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
              {p.images.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Show image ${k + 1}`}
                  className={`h-2.5 w-2.5 rounded-full ${k === i ? "bg-accent" : "bg-ivory/30"}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col p-7">
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{p.sector}</p>
            <button onClick={onClose} aria-label="Close" className="text-ivory/60 hover:text-ivory">
              ✕
            </button>
          </div>
          <h3 className="mt-3 font-display text-h2">{p.title}</h3>
          <p className="text-muted mt-3">{p.summary}</p>
          <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/40">What we made</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            {p.deliverables.map((d) => (
              <li key={d} className="flex gap-2.5">
                <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={onClose} className="btn btn-accent mt-auto self-start pt-3.5">
            Start a similar project →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Work() {
  const [filter, setFilter] = useState<Category | "All">("All");
  const [open, setOpen] = useState<Project | null>(null);
  const shown = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))), [filter]);

  return (
    <section id="work" className="py-section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">
              Brands, campaigns and launches, <span className="serif-i text-accent">across industries.</span>
            </h2>
            <p className="text-muted mt-4 text-[15px]">A mix of client and self-initiated projects.</p>
          </div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {(["All", ...categories] as const).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                  filter === c ? "border-accent bg-accent text-ink" : "hairline text-ivory/70 hover:text-ivory"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.button
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(p)}
                className={`group relative overflow-hidden rounded-card border hairline text-left ${p.wide ? "lg:col-span-2" : ""}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-black lg:aspect-auto lg:h-[300px]">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{p.sector}</p>
                    <h3 className="mt-2 text-[20px] font-medium">{p.title}</h3>
                    <p className="text-muted mt-1 line-clamp-1 text-[14px]">{p.summary}</p>
                  </div>
                  <span className="shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>{open && <ProjectModal p={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  );
}

function StudioForm() {
  const [state, setState] = useState<{ msg: string; ok?: boolean; sending?: boolean }>({ msg: "" });
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const email = String(data.get("email") || "").trim();
    if (!String(data.get("name") || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || String(data.get("message") || "").trim().length < 10) {
      setState({ msg: "Please add your name, a valid email and a few words about the project.", ok: false });
      return;
    }
    data.append("_subject", `Studio enquiry: ${data.get("service")}`);
    setState({ msg: "", sending: true });
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset();
      setState({ msg: "Thank you — your enquiry has been sent. We'll reply personally.", ok: true });
    } catch {
      setState({ msg: `Something went wrong. Please email ${CONTACT_EMAIL} directly.`, ok: false });
    }
  }
  const field = "mt-2 w-full rounded-xl border hairline bg-ink/60 px-4 py-3 text-ivory outline-none focus:border-accent";
  const label = "font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/60";
  return (
    <form onSubmit={onSubmit} noValidate className="glass grid gap-5 rounded-card p-6 md:grid-cols-2 md:p-8">
      <div>
        <label htmlFor="s-name" className={label}>Name</label>
        <input id="s-name" name="name" autoComplete="name" className={field} />
      </div>
      <div>
        <label htmlFor="s-email" className={label}>Email</label>
        <input id="s-email" name="email" type="email" autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="s-service" className={label}>What do you need?</label>
        <select id="s-service" name="service" className={field} defaultValue="Not sure yet">
          {[...services.map((s) => s.title), ...packages.map((p) => `Package: ${p.name}`), "Photography", "Not sure yet"].map((o) => (
            <option key={o} className="bg-ink">{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="s-budget" className={label}>Budget</label>
        <select id="s-budget" name="budget" className={field} defaultValue="Not sure yet">
          {["Under €1,000", "€1,000 – €3,000", "€3,000 – €7,000", "€7,000+", "Monthly retainer", "Not sure yet"].map((o) => (
            <option key={o} className="bg-ink">{o}</option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <label htmlFor="s-message" className={label}>About the project</label>
        <textarea id="s-message" name="message" rows={5} className={field} placeholder="Brand, goal, timing, links…" />
      </div>
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="flex flex-col items-start gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button type="submit" disabled={state.sending} className="btn btn-accent disabled:opacity-60">
          {state.sending ? "Sending…" : "Send enquiry →"}
        </button>
        <p role="status" aria-live="polite" className={`text-[14px] ${state.ok ? "text-accent" : "text-red-300"}`}>
          {state.msg}
        </p>
      </div>
    </form>
  );
}

export default function StudioPage() {
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
              <p className="eyebrow">iLens Studio</p>
              <h1 className="mt-6 text-display font-medium">
                A creative studio for brands that <span className="serif-i text-accent">want to be seen.</span>
              </h1>
              <p className="text-muted mt-7 max-w-xl text-[18px]">
                Brand identity, websites, campaigns and social media, designed with editorial craft and built faster with
                AI.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a href="#work" className="btn btn-accent">See the work →</a>
                <a href="#contact" className="btn btn-ghost">Start a project</a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/50">
                {["Branding", "Web", "Social media", "Campaigns", "Packaging", "AI systems"].map((t) => (
                  <li key={t}><span className="mr-2 text-accent">·</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {["gks-katowice", "g-volt", "cube-casino", "bass-arena"].map((id) => {
                  const p = projects.find((x) => x.id === id)!;
                  return (
                    <a key={id} href="#work" className="group overflow-hidden rounded-xl border hairline">
                      <img src={p.images[0]} alt={p.title} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <Work />

        {/* Services */}
        <section id="services" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">Services</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">What we <span className="serif-i text-accent">design and build.</span></h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-card border hairline bg-ivory/[0.08] sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <article key={s.title} className="flex flex-col bg-ink p-8">
                  <h3 className="text-h3 font-medium">{s.title}</h3>
                  <p className="text-muted mt-3 flex-1">{s.body}</p>
                  <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-accent">{s.from}</p>
                </article>
              ))}
            </div>
            <p className="text-muted mt-6 text-[15px]">
              Brand & product photography:{" "}
              <a href="https://foto.ilens.co" className="text-ivory underline decoration-accent/60 underline-offset-4 hover:text-accent">foto.ilens.co</a>
            </p>
          </div>
        </section>

        {/* Packages */}
        <section id="packages" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">Packages</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Three ways <span className="serif-i text-accent">to work with us.</span></h2>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {packages.map((p) => (
                <article
                  key={p.name}
                  className={`flex flex-col rounded-card p-8 ${p.premium ? "border-2 border-accent bg-accent/[0.05] shadow-[0_0_80px_-30px_var(--glow)]" : "surface"}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{p.tagline}</p>
                    {p.premium && <span className="rounded-full bg-accent px-2.5 py-1 font-mono text-[10px] font-medium uppercase text-ink">Premium</span>}
                  </div>
                  <h3 className="mt-4 font-display text-h2">{p.name}</h3>
                  <p className="mt-5 flex items-baseline gap-2">
                    <span className="text-[34px] font-semibold tracking-[-0.02em]">{p.price}</span>
                    <span className="text-muted text-[14px]">{p.unit}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 border-t hairline pt-6 text-[15px]">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span className="text-accent" aria-hidden="true">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`btn mt-8 ${p.premium ? "btn-accent" : "btn-ghost"}`}>
                    {p.premium ? "Apply for 1:1 →" : "Ask about this →"}
                  </a>
                </article>
              ))}
            </div>
            <p className="text-muted mt-6 text-[15px]">
              Prefer to do it yourself? Our guides start at €19 —{" "}
              <a href="/#shop" className="text-ivory underline decoration-accent/60 underline-offset-4 hover:text-accent">visit the shop</a>.
            </p>
          </div>
        </section>

        {/* Process + sectors */}
        <section id="process" className="border-t hairline py-section">
          <div className="container-x">
            <p className="eyebrow">Process</p>
            <h2 className="mt-5 max-w-3xl text-h1 font-medium">Five steps, <span className="serif-i text-accent">no guesswork.</span></h2>
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {process.map((s, i) => (
                <li key={s.title} className="surface rounded-card p-6">
                  <span className="font-mono text-mono text-accent">0{i + 1}</span>
                  <h3 className="mt-3 text-[20px] font-medium">{s.title}</h3>
                  <p className="text-muted mt-2 text-[15px]">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-16">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/45">Industries we've designed for</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {sectors.map((s) => (
                  <li key={s} className="rounded-full border hairline px-4 py-2 text-[14px] text-ivory/80">{s}</li>
                ))}
              </ul>
            </div>
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
              <p className="eyebrow">Start a project</p>
              <h2 className="mt-5 text-h1 font-medium">Tell us <span className="serif-i text-accent">what you're building.</span></h2>
              <p className="text-muted mt-5">
                Or write to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-ivory underline decoration-accent/60 underline-offset-4">{CONTACT_EMAIL}</a>
              </p>
              <dl className="mt-10 space-y-6">
                {studioFaq.map((f) => (
                  <div key={f.q} className="border-t hairline pt-5">
                    <dt className="font-medium">{f.q}</dt>
                    <dd className="text-muted mt-2 text-[15px]">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-7">
              <StudioForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t hairline">
        <div className="container-x flex flex-col justify-between gap-4 py-8 text-[13px] text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} iLens Studio · <a href="/" className="hover:text-ivory">Shop & guides</a> · <a href="/free/" className="hover:text-ivory">Free prompts</a></p>
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
