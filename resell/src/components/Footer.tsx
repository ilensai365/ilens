import { socials } from "../data/site";

const cols = [
  {
    title: "Resell",
    links: [
      { label: "About", href: "#about" },
      { label: "PLR Shop", href: "#plr-shop" },
      { label: "Licenses", href: "#licenses" },
      { label: "Products", href: "#products" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Free starter kit", href: "#starter" },
      { label: "FAQ", href: "#faq" },
      { label: "iLens Studio ↗", href: "https://ilens.co" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      ...socials,
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="container-x grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">
            iLens <span className="serif-i text-accent">Resell</span>
          </p>
          <p className="text-muted mt-3 font-mono text-mono">PLR & MRR products / Commercial-use mockups</p>
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
                      href={l.href}
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
        <p>© {new Date().getFullYear()} iLens Studio. All rights reserved.</p>
        <p className="select-none font-display text-[13px] italic">Built with AI · Made by humans</p>
      </div>
    </footer>
  );
}
