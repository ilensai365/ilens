import { packages, projects } from "../data/studio";
import SectionHead from "./SectionHead";
import { href, t } from "../lib/i18n";

/** Teaser for iLens Studio (done-for-you work) on the product-first home page; full page at /studio. */
// Polish labels for the teaser until /studio has its own Polish version.
const plText: Record<string, string> = {
  "Social media, done monthly": "Social media co miesiąc",
  "Brand + website, ready to sell": "Marka + strona, gotowe do sprzedaży",
  "Your design team on call": "Twój zespół designu na telefon",
  "The complete partnership": "Pełna współpraca",
  "/ month": "/ mies.",
  "/ project": "/ projekt",
  Beauty: "Uroda",
  "Marketing agency": "Agencja marketingowa",
  "Renewable energy": "Energia odnawialna",
};
const tr = (s: string) => t(s, plText[s] ?? s);
const price = (s: string) => t(s, s.replace(/^from /, "od "));

export default function Services() {
  const thumbs = ["centrum-seo", "lumiere", "g-volt", "cube-casino"].map((id) => projects.find((p) => p.id === id)!);

  return (
    <section id="services" className="border-t hairline py-section">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            eyebrow="iLens Studio"
            title={
              <>
                {t("Prefer we ", "Wolisz, żebyśmy ")}<span className="serif-i text-accent">{t("build it for you?", "zrobili to za Ciebie?")}</span>
              </>
            }
            intro={t("The guides are how we work, written down. The studio is the same team doing it for your brand: identity, websites, campaigns and social media.", "Poradniki to spisany sposób, w jaki pracujemy. Studio to ten sam zespół, który zrobi to dla Twojej marki: identyfikację, strony, kampanie i social media.")}
          />
          <a data-reveal href={href("/studio/")} className="btn btn-ghost shrink-0 self-start lg:self-auto">
            {t("See the studio →", "Zobacz studio →")}
          </a>
        </div>

        <div data-reveal className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {thumbs.map((p) => (
            <a key={p.id} href={href("/studio/#work")} className="group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-black">
              {/* Same "grey mist" card as /studio. */}
              <img
                src={p.cover}
                alt={p.title}
                loading="lazy"
                style={{ objectPosition: p.focus ?? "50% 45%" }}
                className="absolute inset-0 h-full w-full object-cover opacity-30 brightness-90 contrast-[1.05] grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-45"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,#0B0A08_18%,rgba(11,10,8,0.55)_55%,rgba(11,10,8,0.2))]" aria-hidden="true" />
              <div className="absolute inset-0 rounded-[20px] ring-1 ring-inset ring-ivory/10 transition-colors group-hover:ring-accent/50" aria-hidden="true" />
              <div className="absolute inset-x-4 bottom-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{tr(p.sector)}</p>
                <p className="mt-1 font-display text-[22px] leading-tight">{p.title}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((p) => (
            <a
              key={p.name}
              data-reveal
              href={href("/studio/#packages")}
              className={`flex flex-col rounded-card p-7 transition-colors ${p.premium ? "border-2 border-accent bg-accent/[0.05]" : "surface hover:border-accent/30"}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{tr(p.tagline)}</span>
              <h3 className="mt-3 text-h3 font-medium">{p.name}</h3>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="text-[18px] font-medium">{price(p.price)}</span>
                <span className="text-muted text-[13px]">{tr(p.unit)}</span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
