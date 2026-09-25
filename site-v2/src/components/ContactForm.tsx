import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT } from "../data/site";

type Field = "name" | "email" | "message";

const validators: Record<Field, (v: string) => string> = {
  name: (v) => (v.trim() ? "" : "Please enter your name."),
  email: (v) => {
    if (!v.trim()) return "Please enter your email.";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.";
  },
  message: (v) => {
    if (!v.trim()) return "Please enter a message.";
    return v.trim().length >= 10 ? "" : "Message should be at least 10 characters.";
  },
};

const fields: { name: Field; label: string; type?: string; autoComplete?: string }[] = [
  { name: "name", label: "Name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "message", label: "Message" },
];

/**
 * Submits to the iLens Contact Form on Formspree, which notifies hello@ilens.co.
 * Never reports success it can't verify.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<{ msg: string; ok?: boolean }>({ msg: "" });
  const [sending, setSending] = useState(false);

  const check = (name: Field, value: string) => {
    const msg = validators[name](value);
    setErrors((e) => ({ ...e, [name]: msg }));
    return !msg;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("_gotcha")) return; // honeypot: only bots fill it

    const valid = fields.map((f) => check(f.name, String(data.get(f.name) ?? ""))).every(Boolean);
    if (!valid) {
      setStatus({ msg: "Please fix the highlighted fields.", ok: false });
      return;
    }

    setSending(true);
    setStatus({ msg: "" });
    try {
      const res = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = body?.errors?.length
          ? body.errors.map((x: { message: string }) => x.message).join(" ")
          : "Something went wrong sending your message.";
        throw new Error(msg);
      }
      form.reset();
      setStatus({ msg: "Thank you — your message has been sent. We'll be in touch soon.", ok: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong sending your message.";
      setStatus({ msg: `${msg} Please email ${CONTACT_EMAIL} directly.`, ok: false });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="glass mx-auto grid max-w-2xl gap-5 rounded-card p-6 text-left md:grid-cols-2 md:p-8">
      {fields.map((f) => {
        const err = errors[f.name];
        const cls = `mt-2 w-full rounded-xl border bg-ink/60 px-4 py-3 text-ivory outline-none transition-colors placeholder:text-ivory/30 focus:border-accent ${
          err ? "border-red-400/70" : "hairline"
        }`;
        return (
          <div key={f.name} className={f.name === "message" ? "md:col-span-2" : ""}>
            <label htmlFor={`cf-${f.name}`} className="font-mono text-[12px] uppercase tracking-[0.2em] text-ivory/60">
              {f.label}
            </label>
            {f.name === "message" ? (
              <textarea
                id={`cf-${f.name}`}
                name={f.name}
                rows={5}
                className={cls}
                aria-invalid={!!err}
                aria-describedby={err ? `cf-${f.name}-err` : undefined}
                onBlur={(e) => check(f.name, e.target.value)}
                onChange={(e) => errors[f.name] && check(f.name, e.target.value)}
              />
            ) : (
              <input
                id={`cf-${f.name}`}
                name={f.name}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                className={cls}
                aria-invalid={!!err}
                aria-describedby={err ? `cf-${f.name}-err` : undefined}
                onBlur={(e) => check(f.name, e.target.value)}
                onChange={(e) => errors[f.name] && check(f.name, e.target.value)}
              />
            )}
            {err && (
              <p id={`cf-${f.name}-err`} className="mt-1.5 text-[13px] text-red-300">
                {err}
              </p>
            )}
          </div>
        );
      })}

      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="flex flex-col items-start gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <button type="submit" disabled={sending} className="btn btn-ghost disabled:opacity-60">
          {sending ? "Sending…" : "Send message"}
        </button>
        <p role="status" aria-live="polite" className={`text-[14px] ${status.ok ? "text-accent" : "text-red-300"}`}>
          {status.msg}
        </p>
      </div>
    </form>
  );
}
