import { socials } from "../data/site";
import { href, t } from "../lib/i18n";

const cols = [
  {
    title: "iLens",
    links: [
      { label: t("Shop", "Sklep"), href: "#shop" },
      { label: t("Offer", "Oferta"), href: "#offer" },
      { label: t("Method", "Metoda"), href: "#method" },
      { label: t("About", "O nas"), href: "#about" },
      { label: "Studio", href: "/studio/" },
      { label: t("FAQ", "Pytania"), href: "#faq" },
      { label: t("Free prompts", "Darmowe prompty"), href: "/free/" },
    ],
  },
  {
    title: t("Services", "Usługi"),
    links: [
      // { label: "Websites & stores", href: "/shops/" }, // hidden until /shops is finished
      { label: t("Google Ads & tracking", "Google Ads i analityka"), href: "/marketing/" },
      { label: "Studio", href: "/studio/" },
    ],
  },
  {
    title: t("Connect", "Kontakt"),
    links: [
      { label: t("Contact", "Napisz do nas"), href: "#contact" },
      ...socials,
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl">iLens</p>
          <p className="text-muted mt-3 font-mono text-mono">{t("Digital products / Stores / Ads that sell", "Produkty cyfrowe / Sklepy / Reklamy, które sprzedają")}</p>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h4 className="font-mono text-[12px] uppercase tracking-eyebrow text-accent">{c.title}</h4>
            <ul className="mt-5 space-y-3">
              {c.links.map((l) => {
                const external = l.href.startsWith("http");
                return (
                  <li key={l.label}>
                    <a
                      href={href(l.href)}
                      className="text-muted transition-colors hover:text-ivory"
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-x flex flex-col justify-between gap-4 border-t hairline py-8 text-[13px] text-ivory/45 sm:flex-row">
        <p>© {new Date().getFullYear()} iLens Studio. {t("All rights reserved.", "Wszelkie prawa zastrzeżone.")}</p>
        <p className="select-none font-display text-[13px] italic">{t("Built with AI · Made by humans", "Zbudowane z AI · Tworzone przez ludzi")}</p>
      </div>
    </footer>
  );
}
