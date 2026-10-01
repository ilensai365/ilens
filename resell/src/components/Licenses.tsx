import { licenseNever, licenseRows, licenses } from "../data/site";
import SectionHead from "./SectionHead";

function Cell({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="mx-auto grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-[12px] text-accent">
        ✓<span className="sr-only">Allowed</span>
      </span>
    );
  if (v === false)
    return (
      <span className="text-ivory/25">
        —<span className="sr-only">Not allowed</span>
      </span>
    );
  return <span className="font-mono text-[11px] uppercase leading-tight tracking-[0.1em] text-accent/80">{v}</span>;
}

/** Plain-language comparison of the five license types; the full terms ship with every product. */
export default function Licenses() {
  return (
    <section id="licenses" className="border-t hairline py-section">
      <div className="container-x">
        <SectionHead
          eyebrow="Licenses"
          title={
            <>
              Know exactly <span className="serif-i text-accent">what you can do.</span>
            </>
          }
          intro="Every product is sold with one clear license. Here's what each one allows, in plain words."
        />

        <div data-reveal className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {licenses.map((l) => (
            <div key={l.key} className={`surface rounded-card p-5 ${l.key === "PLR" ? "!border-accent/50" : ""}`}>
              <p className="font-display text-[34px] leading-none text-accent">{l.short}</p>
              <p className="mt-3 text-[15px] font-medium">{l.name}</p>
              <p className="text-muted mt-2 text-[14px] leading-snug">{l.summary}</p>
            </div>
          ))}
        </div>

        <div data-reveal className="glass mt-6 overflow-x-auto rounded-card">
          <table className="w-full min-w-[720px] table-fixed border-collapse text-[14px]">
            <caption className="sr-only">What each license allows</caption>
            <thead>
              <tr className="border-b hairline">
                <th scope="col" className="w-[32%] p-4 text-left font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-ivory/50">
                  You can…
                </th>
                {licenses.map((l) => (
                  <th
                    key={l.key}
                    scope="col"
                    className={`p-4 text-center font-mono text-[12px] font-medium tracking-[0.15em] ${l.key === "PLR" ? "bg-accent/[0.06] text-accent" : ""}`}
                  >
                    {l.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {licenseRows.map((r) => (
                <tr key={r.label} className="border-b hairline last:border-0">
                  <th scope="row" className="p-4 text-left font-normal text-ivory/85">
                    {r.label}
                  </th>
                  {licenses.map((l) => (
                    <td key={l.key} className={`p-4 text-center ${l.key === "PLR" ? "bg-accent/[0.06]" : ""}`}>
                      <Cell v={r.values[l.key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div data-reveal className="mt-6 grid gap-6 rounded-card border hairline p-6 md:grid-cols-12 md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ivory/50 md:col-span-3">No license allows you to</p>
          <ul className="grid gap-3 text-[15px] text-ivory/80 sm:grid-cols-2 md:col-span-9">
            {licenseNever.map((n) => (
              <li key={n} className="flex gap-3">
                <span className="text-red-300/80" aria-hidden="true">
                  ✕
                </span>
                {n}
              </li>
            ))}
          </ul>
        </div>
        <p data-reveal className="mt-6 text-center text-[13px] text-ivory/45">
          A summary, not legal advice — the full license terms included in each download apply.
        </p>
      </div>
    </section>
  );
}
