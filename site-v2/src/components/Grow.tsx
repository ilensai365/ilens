import SectionHead from "./SectionHead";

/** Home-page bridge from the guides to done-for-you services: stores, Google Ads & tracking, studio. */
const offers = [
  {
    tag: "New · 2026",
    title: "Websites & online stores",
    body: "For salons, cosmetics, electronics, fashion, restaurants and digital products. GDPR-ready, tracked, with an AI shop assistant if you want one.",
    price: "from €1,990",
    href: "/shops/",
    cta: "See store offers",
    featured: true,
  },
  {
    tag: "Marketing",
    title: "Google Ads & tracking",
    body: "Google Ads, GA4, conversion tracking, GDPR cookie consent and Search Console. Know which ad brought the sale.",
    price: "from €290",
    href: "/marketing/",
    cta: "See marketing",
  },
  {
    tag: "Studio",
    title: "Brand, content & social",
    body: "Identity, campaigns, AI video and monthly social media, designed in the same editorial style as this site.",
    price: "from €99 / month",
    href: "/studio/",
    cta: "See the studio",
  },
];

export default function Grow() {
  return (
    <section id="grow" className="border-t hairline py-section">
      <div className="container-x">
        <SectionHead
          eyebrow="Done for you · Malta & Europe"
          title={
            <>
              Rather have us <span className="serif-i text-accent">build and grow it?</span>
            </>
          }
          intro="The guides teach the system. Our team can also build your store, run your ads and design your brand, for businesses in Malta and across Europe."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {offers.map((o) => (
            <a
              key={o.href}
              data-reveal
              href={o.href}
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
        <p data-reveal className="text-muted mt-6 text-[14px]">Service prices exclude VAT.</p>
      </div>
    </section>
  );
}
