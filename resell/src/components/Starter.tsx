import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT, PAYHIP, STARTER } from "../data/site";

/**
 * Waitlist signup used until the free starter kit exists as a Payhip product.
 * Goes to the same Formspree form as the contact form, tagged with its own subject.
 */
function Waitlist() {
  const [status, setStatus] = useState<{ msg: string; ok?: boolean }>({ msg: "" });
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return;
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ msg: "Please enter a valid email address.", ok: false });
      return;
    }
    setSending(true);
    setStatus({ msg: "" });
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus({ msg: "You're on the list — we'll email your starter kit as soon as it's ready.", ok: true });
    } catch {
      setStatus({ msg: `Something went wrong. Please email ${CONTACT_EMAIL} instead.`, ok: false });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-8">
      <input type="hidden" name="_subject" value="iLens Resell — starter kit waitlist" />
      <input type="hidden" name="message" value="Please send me the Resell Starter Kit when it's ready." />
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label htmlFor="starter-email" className="sr-only">
        Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="starter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-full border hairline bg-ink/60 px-5 py-3.5 text-ivory outline-none transition-colors placeholder:text-ivory/30 focus:border-accent"
        />
        <button type="submit" disabled={sending} className="btn btn-accent disabled:opacity-60">
          {sending ? "Sending…" : "Send me the kit"}
        </button>
      </div>
      <p role="status" aria-live="polite" className={`mt-3 min-h-[1.5em] text-[14px] ${status.ok ? "text-accent" : "text-red-300"}`}>
        {status.msg}
      </p>
      <p className="text-[12px] text-ivory/40">Free. One email with the kit, then occasional launch news — unsubscribe anytime.</p>
    </form>
  );
}

/** Free lead magnet: the starter kit, delivered by Payhip once STARTER.code is set. */
export default function Starter() {
  return (
    <section id="starter" className="border-t hairline py-section">
      <div className="container-x">
        <div
          data-reveal
          className="glass relative grid gap-10 overflow-hidden rounded-[24px] p-8 md:p-12 lg:grid-cols-2 lg:gap-16"
        >
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <p className="eyebrow">Free · Starter kit</p>
            <h2 className="mt-5 text-h1 font-medium">
              Start reselling <span className="serif-i text-accent">for €0.</span>
            </h2>
            <p className="text-muted mt-5 max-w-md text-[17px]">
              {STARTER.title}: everything you need to understand resell licenses and list your first product.
            </p>
            {STARTER.code ? (
              <a href={PAYHIP(STARTER.code)} className="btn btn-accent mt-8">
                Get the free kit <span aria-hidden="true">→</span>
              </a>
            ) : (
              <Waitlist />
            )}
          </div>
          <ul className="relative self-center divide-y divide-ivory/[0.08] border-y hairline">
            {STARTER.includes.map((item) => (
              <li key={item} className="flex gap-4 py-4 text-[15px] text-ivory/85">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-[11px] text-accent">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
