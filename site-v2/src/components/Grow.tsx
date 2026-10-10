import SectionHead from "./SectionHead";
import { href, t } from "../lib/i18n";

/** Home-page bridge from the guides to done-for-you services: stores, Google Ads & tracking, studio. */
const offers = [
  {
    tag: t("New · 2026", "Nowość · 2026"),
    title: t("Websites & online stores", "Strony i sklepy internetowe"),
    body: t(
      "Starter website from €599: up to 3 pages, mobile-first, contact form, WhatsApp, Google Maps and basic SEO, live in 1–2 weeks. Full online stores from €1,990.",
      "Strona startowa od €599: do 3 podstron, mobile-first, formularz kontaktowy, WhatsApp, Mapy Google i podstawowe SEO, online w 1–2 tygodnie. Pełne sklepy internetowe od €1,990.",
    ),
    price: t("from €599", "od €599"),
    href: "/studio/#contact", // /shops hidden until finished
    cta: t("Get a quote", "Poproś o wycenę"),
    featured: true,
  },
  {
    tag: "Marketing",
    title: t("Google Ads & tracking", "Google Ads i analityka"),
    body: t(
      "Google Ads, GA4, conversion tracking, GDPR cookie consent and Search Console. Know which ad brought the sale.",
      "Google Ads, GA4, śledzenie konwersji, zgody cookies zgodne z RODO i Search Console. Wiesz, która reklama przyniosła sprzedaż.",
    ),
    price: t("from €290", "od €290"),
    href: "/marketing/",
    cta: t("See marketing", "Zobacz marketing"),
  },
  {
    tag: "Studio",
    title: t("Brand, content & social", "Marka, treści i social media"),
    body: t(
      "Identity, campaigns, AI video and monthly social media, designed in the same editorial style as this site.",
      "Identyfikacja, kampanie, wideo AI i comiesięczne social media w tym samym edytorskim stylu co ta strona.",
    ),
    price: t("from €99 / month", "od €99 / mies."),
    href: "/studio/",
    cta: t("See the studio", "Zobacz studio"),
  },
];

export default function Grow() {
  return (
    <section id="grow" className="border-t hairline py-section">
      <div className="container-x">
        <SectionHead
          eyebrow={t("Done for you · Malta & Europe", "Zrobimy to za Ciebie · Malta i Europa")}
          title={
            <>
              {t("Rather have us ", "Wolisz, żebyśmy ")}<span className="serif-i text-accent">{t("build and grow it?", "zbudowali to za Ciebie?")}</span>
            </>
          }
          intro={t("The guides teach the system. Our team can also build your store, run your ads and design your brand, for businesses in Malta and across Europe.", "Poradniki uczą systemu. Nasz zespół może też zbudować Twój sklep, prowadzić reklamy i zaprojektować markę — dla firm na Malcie i w całej Europie.")}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {offers.map((o) => (
            <a
              key={o.href}
              data-reveal
              href={href(o.href)}
              className={`group flex flex-col rounded-card p-7 transition-colors sm:p-8 ${o.featured ? "glass border border-accent/40" : "surface hover:border-accent/30"}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{o.tag}</span>
              <h3 className="mt-3 text-h3 font-medium">{o.title}</h3>
              <p className="text-muted mt-3 flex-1">{o.body}</p>
              <div className="mt-8 flex items-center justify-between gap-4 border-t hairline pt-5">
                <span className="text-[18px] font-medium">{o.price}</span>
                <span className="text-[14px] text-ivory/80 transition-colors group-hover:text-accent">{o.cta} →</span>
              </div>
            </a>
          ))}
        </div>
        <p data-reveal className="text-muted mt-6 text-[14px]">{t("Service prices exclude VAT.", "Ceny usług nie zawierają VAT.")}</p>
      </div>
    </section>
  );
}
