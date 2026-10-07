import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT } from "../data/site";

// Three-step quote form (goal → site & budget → contact). Each step is one tap, so visitors start
// fast and we still get the details we need to quote. Sends to the same Formspree inbox as the studio form.

const goals = ["More sales", "More leads / enquiries", "Track what I already run", "Get found on Google & Maps", "Not sure yet"];
const platforms = ["Payhip", "Shopify", "WordPress / WooCommerce", "Wix / Squarespace", "Custom site", "No website yet"];
const budgets = ["Under €10 / day", "€10–30 / day", "€30–100 / day", "€100+ / day", "Not decided"];
const running = ["Not yet", "Google Ads", "Meta (Instagram / Facebook)", "Both"];

function Chips({ name, options, value, onPick }: { name: string; options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={name}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onPick(o)}
          className={`rounded-full border px-4 py-2 text-[14px] transition-colors ${value === o ? "border-accent bg-accent/15 text-ivory" : "hairline text-ivory/75 hover:border-accent/60"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function LeadForm({ id = "quote" }: { id?: string }) {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [platform, setPlatform] = useState("");
  const [budget, setBudget] = useState("");
  const [ads, setAds] = useState("");
  const [state, setState] = useState<{ msg: string; ok?: boolean; sending?: boolean }>({ msg: "" });

  const label = "font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/60";
  const field = "mt-2 w-full rounded-xl border hairline bg-ink/60 px-4 py-3 text-ivory outline-none focus:border-accent";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const email = String(data.get("email") || "").trim();
    if (!String(data.get("name") || "").trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState({ msg: "Please add your name and a valid email.", ok: false });
      return;
    }
    data.append("goal", goal);
    data.append("platform", platform);
    data.append("daily_budget", budget);
    data.append("ads_running", ads);
    data.append("_subject", `Marketing quote: ${goal || "general"} · ${platform || "site?"}`);
    setState({ msg: "", sending: true });
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset();
      setStep(3);
      setState({ msg: "" });
      window.gtag?.("event", "generate_lead", { form: "marketing_quote", goal });
    } catch {
      setState({ msg: `Something went wrong. Please email ${CONTACT_EMAIL} directly.`, ok: false });
    }
  }

  if (step === 3) {
    return (
      <div id={id} className="glass rounded-card p-7 sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Sent</p>
        <h3 className="mt-3 text-h3 font-medium">Thank you. We'll reply personally.</h3>
        <p className="text-muted mt-3">We'll look at your site and come back with a clear plan and a fixed price.</p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="glass rounded-card p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/55">Get a quote · 30 seconds</p>
        <p className="font-mono text-[11px] tracking-[0.2em] text-accent">{step + 1} / 3</p>
      </div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-ivory/[0.08]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((step + 1) / 3) * 100}%`, background: "linear-gradient(90deg,#C99A4E,#E2B464,#F0CF8E)" }} />
      </div>

      {step === 0 && (
        <div className="mt-7">
          <h3 className="text-h3 font-medium">What do you want from your ads?</h3>
          <div className="mt-5">
            <Chips name="Goal" options={goals} value={goal} onPick={(v) => { setGoal(v); setStep(1); }} />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mt-7 space-y-6">
          <div>
            <p className={label}>Your website runs on</p>
            <div className="mt-3"><Chips name="Platform" options={platforms} value={platform} onPick={setPlatform} /></div>
          </div>
          <div>
            <p className={label}>Ad budget you're thinking of</p>
            <div className="mt-3"><Chips name="Budget" options={budgets} value={budget} onPick={setBudget} /></div>
          </div>
          <div>
            <p className={label}>Running ads already?</p>
            <div className="mt-3"><Chips name="Ads running" options={running} value={ads} onPick={setAds} /></div>
          </div>
          <div className="flex items-center justify-between">
            <button type="button" onClick={() => setStep(0)} className="text-muted text-[14px] hover:text-ivory">← Back</button>
            <button type="button" onClick={() => setStep(2)} className="btn btn-accent">Next →</button>
          </div>
        </div>
      )}

      {/* Step 3 stays mounted only when visible; fields are plain inputs so autofill works. */}
      {step === 2 && (
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <h3 className="text-h3 font-medium sm:col-span-2">Where should we send your plan?</h3>
          <div>
            <label htmlFor={`${id}-name`} className={label}>Name</label>
            <input id={`${id}-name`} name="name" autoComplete="name" className={field} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={label}>Email</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-site`} className={label}>Website (optional)</label>
            <input id={`${id}-site`} name="website" type="url" inputMode="url" placeholder="https://" className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-msg`} className={label}>Anything else? (optional)</label>
            <textarea id={`${id}-msg`} name="message" rows={3} className={field} placeholder="Product, market, deadline…" />
          </div>
          <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={() => setStep(1)} className="text-muted self-start text-[14px] hover:text-ivory">← Back</button>
            <button type="submit" disabled={state.sending} className="btn btn-accent disabled:opacity-60">
              {state.sending ? "Sending…" : "Send & get my quote →"}
            </button>
          </div>
          <p role="status" aria-live="polite" className={`text-[14px] sm:col-span-2 ${state.ok === false ? "text-red-300" : "text-muted"}`}>
            {state.msg || "No spam. We reply personally."}
          </p>
        </div>
      )}
    </form>
  );
}
