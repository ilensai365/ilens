import { motion } from "framer-motion";
import { byId } from "../data/products";
import { buyHref, CONTACT_EMAIL, socials } from "../data/site";

const icons: Record<string, JSX.Element> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M14 8.5V6.8c0-.8.5-1 1-1h2V2.5h-2.8C11.2 2.5 10.5 4.6 10.5 6v2.5H8V12h2.5v9.5H14V12h2.7l.4-3.5H14z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M4.5 9h3v11h-3zM6 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10 9h2.9v1.5h.1c.4-.8 1.4-1.7 3-1.7 3.1 0 3.7 2 3.7 4.7V20h-3v-5.8c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3V20h-3z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  ),
};

type Offer = { title: string; body: string; image: string; cta: string; href: string; price?: string; compareAt?: string };

function offers(): Offer[] {
  const lib = byId("library")!;
  const mock = byId("mockups-all")!;
  const ai = byId("ai-content-system")!;
  const plr = ai.options.find((o) => o.license === "PLR")!;
  const lux = byId("lux-website")!;
  return [
    {
      title: lib.title,
      body: "Four ebooks you can edit, rebrand and sell as your own product line.",
      image: lib.image,
      price: lib.options[0].price,
      compareAt: lib.options[0].compareAt,
      cta: lib.options[0].code ? `Get the library ${lib.options[0].price}` : "See the library",
      href: lib.options[0].code ? buyHref(lib.options[0].code) : "#plr-shop",
    },
    {
      title: mock.title,
      body: "40 Canva + PSD scenes that make any product look premium.",
      image: mock.image,
      price: mock.options[0].price,
      compareAt: mock.options[0].compareAt,
      cta: mock.options[0].code ? `Only ${mock.options[0].price}` : "See the mockups",
      href: mock.options[0].code ? buyHref(mock.options[0].code) : "#plr-shop",
    },
    {
      title: `${ai.title} · PLR`,
      body: "Our newest resell ebook — 30 AI prompts and a complete content loop.",
      image: ai.image,
      price: plr.price,
      cta: plr.code ? `Resell it ${plr.price}` : "See the ebook",
      href: plr.code ? buyHref(plr.code) : "#plr-shop",
    },
    {
      title: lux.title,
      body: "Your own dedicated website and shop, built for you in 7 days — PLR products included.",
      image: lux.image,
      price: lux.options[0].price,
      cta: "Book your website",
      href: "#contact",
    },
  ];
}

const freebies = [
  { label: "The Resell Starter Kit", tag: "Free", href: "#starter", image: byId("mockups-devices")!.image },
  { label: "Which license do I need?", tag: "Free guide", href: "#licenses", image: byId("mockups-inside")!.image },
];

/** Link-in-bio style overview: brand card on the left, best offers and freebies on the right. */
export default function Offers() {
  return (
    <section id="products" className="border-t hairline py-section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <div data-reveal className="text-center lg:col-span-4">
          <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border border-accent/40 bg-accent/[0.06] shadow-[0_0_80px_-20px_var(--glow)]">
            <span className="font-display text-[56px] italic text-accent">iL</span>
          </div>
          <h2 className="mt-6 text-[28px] font-medium tracking-[-0.02em]">
            iLens <span className="serif-i text-accent">Resell</span>
          </h2>
          <p className="text-muted mx-auto mt-3 max-w-xs text-[16px]">Helping creators turn ready-made products into their own income.</p>
          <ul className="mt-6 flex justify-center gap-3">
            {[...socials, { label: "Email", href: `mailto:${CONTACT_EMAIL}` }].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-10 w-10 place-items-center rounded-full border hairline text-ivory/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {icons[s.label]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {offers().map((o) => (
            <div key={o.title} data-reveal className="glass flex flex-col rounded-card p-4">
              <div className="flex gap-4">
                <img
                  src={o.image}
                  alt=""
                  width={72}
                  height={72}
                  loading="lazy"
                  className={`h-[72px] w-[72px] shrink-0 rounded-lg ${o.image.endsWith(".svg") ? "bg-ivory/[0.05] object-contain p-1.5" : "object-cover"}`}
                />
                <div>
                  <h3 className="text-[17px] font-medium leading-snug">{o.title}</h3>
                  <p className="text-muted mt-1 text-[14px] leading-snug">{o.body}</p>
                  {o.price && (
                    <p className="mt-2 flex items-baseline gap-2 text-[15px]">
                      <span className="font-semibold text-accent">{o.price}</span>
                      {o.compareAt && <s className="font-mono text-[12px] text-ivory/40">{o.compareAt}</s>}
                    </p>
                  )}
                </div>
              </div>
              <motion.a href={o.href} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.98 }} className="btn btn-accent mt-4 w-full">
                {o.cta} <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          ))}
          {freebies.map((f) => (
            <a key={f.label} data-reveal href={f.href} className="surface group flex items-center gap-4 rounded-card p-3 transition-colors hover:!border-accent/50">
              <img src={f.image} alt="" width={48} height={48} loading="lazy" className="h-12 w-12 shrink-0 rounded-lg object-cover" />
              <span className="flex-1 text-[15px] font-medium">
                {f.label} <span className="ml-1 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">[{f.tag}]</span>
              </span>
              <span aria-hidden="true" className="pr-2 text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
