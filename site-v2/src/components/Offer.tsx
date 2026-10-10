import { offer } from "../data/site";
import SectionHead from "./SectionHead";
import { t } from "../lib/i18n";

export default function Offer() {
  return (
    <section id="offer" className="border-t hairline py-section">
      <div className="container-x">
        <SectionHead
          eyebrow={t("What iLens teaches", "Czego uczy iLens")}
          title={
            <>
              {t("Everything you need to turn ", "Wszystko, czego potrzebujesz, żeby zamienić ")}<span className="serif-i text-accent">{t("content into income.", "treści w dochód.")}</span>
            </>
          }
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-card border hairline bg-ivory/[0.08] sm:grid-cols-2 lg:grid-cols-3">
          {offer.map((o, i) => (
            <article key={o.title} data-reveal className="group relative bg-ink p-8 transition-colors hover:bg-ivory/[0.02] md:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-mono text-accent">0{i + 1}</span>
                {o.soon && (
                  <span className="rounded-full border hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ivory/50">
                    {t("Coming soon", "Wkrótce")}
                  </span>
                )}
              </div>
              <h3 className="mt-8 text-h3 font-medium">{o.title}</h3>
              <p className="text-muted mt-3">{o.body}</p>
              <span
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
