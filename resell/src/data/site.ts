// All editable copy and links live in src/data — change text here, not in components.
// iLens Resell (resell.ilens.co) is a separate site from ilens.co with its own Payhip store.

/** Checkout link in the separate PLR/MRR Payhip store. Empty code = not on sale yet. */
export const PAYHIP = (code: string) => `https://payhip.com/buy?link=${code}`;
export const buyHref = (code?: string) => (code ? PAYHIP(code) : "#starter");

/** Public page of the resell Payhip store — set once the store exists. */
export const STORE_URL = "";

export const CONTACT_EMAIL = "hello@ilens.co";
export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/myeyrnjy";

/**
 * Free "Resell Starter Kit" (lead magnet). Set `code` to a free (€0) Payhip product in the resell store —
 * Payhip then collects the email and delivers the file. While empty, the section shows a waitlist form instead.
 */
export const STARTER = {
  code: "",
  title: "The Resell Starter Kit",
  includes: [
    "License cheat sheet — PLR, MRR, RR and Commercial Use on one page",
    "One device mockup template (Canva + PSD) — commercial use",
    "15 AI prompts to rewrite, rebrand and list a PLR product",
    "Pricing calculator for resell products",
  ],
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/ilens.co/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594417455543" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ilenscreativestudio/" },
];

/**
 * Customer login (Payhip library, where buyers re-download their files).
 * Check the exact URL once the resell store exists — it may be store-specific.
 */
export const LOGIN_URL = "https://payhip.com/login";

export const nav = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "PLR Shop", href: "#plr-shop" },
  { label: "Licenses", href: "#licenses" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Free kit", href: "#starter" },
];

export const about = {
  lead: "iLens Resell is the licensing arm of iLens — a creative and strategy studio working across design, marketing and AI.",
  body: [
    "We write, design and test digital products for our own studio first. The ones that work get a second life here, with the rights you need to sell them yourself.",
    "Everything is made to the same standard as our own launches: editorial design, practical content and the files you need to list a product the same day — not a folder of recycled PDFs.",
  ],
  points: [
    { title: "Original content", body: "Written and designed in-house — never scraped, spun or bought in bulk." },
    { title: "Clear licenses", body: "One license per product, in plain words, with a certificate in every download." },
    { title: "Ready to list", body: "Covers, mockups and sales copy included, so you can publish the same day." },
  ],
};

/**
 * Worked examples of what each license allows — clearly labelled as examples, not customer results.
 * Replace with real customer stories (with permission) once they exist.
 */
export const caseStudies = [
  {
    license: "PLR",
    product: "AI Content System",
    title: "From general guide to a niche product for coaches",
    steps: [
      "Retitled as “The Coach's Content Engine” with a new cover",
      "Examples rewritten for life coaches, 10 niche prompts added",
      "Listed on Etsy and Payhip with the device mockups",
    ],
    result: "A product with its own name and audience — sold under the reseller's brand.",
  },
  {
    license: "MRR",
    product: "The 24-Hour Ebook",
    title: "A ready-made bonus that raises the value of an offer",
    steps: [
      "Kept exactly as it is, iLens branding included",
      "Added as a bonus to an existing course bundle",
      "Also sold on its own, with resell rights passed on to buyers",
    ],
    result: "More value per sale without writing anything new.",
  },
  {
    license: "CU",
    product: "Device Mockups",
    title: "Listing images for a client launch",
    steps: [
      "Client's ebook cover dropped into the Canva frames",
      "Eight listing and social images exported in one sitting",
      "Delivered as part of a paid launch package",
    ],
    result: "Professional product visuals in client work — no photoshoot needed.",
  },
];

export const heroProof = ["PLR & MRR rights", "Editable files", "Commercial-use mockups", "VAT included"];

export const steps = [
  { n: "01", title: "Pick a license", body: "MRR to resell as-is, PLR to edit and rebrand — each product shows exactly what you're allowed to do." },
  { n: "02", title: "Make it yours", body: "With PLR, change the title, cover, text and author. Our mockups and prompts make the rebrand quick." },
  { n: "03", title: "List it", body: "Upload to your own store — Payhip, Etsy, Stan, Gumroad or your website — with the mockups as product images." },
  { n: "04", title: "Keep 100%", body: "No royalties, no revenue share. Every sale you make is yours." },
];

export type LicenseKey = "PUO" | "CU" | "RR" | "MRR" | "PLR";

/** License comparison — keep in sync with the full terms PDF included in every download. */
export const licenses: { key: LicenseKey; name: string; short: string; summary: string }[] = [
  { key: "PUO", name: "Personal Use", short: "PUO", summary: "Learn from it, fill it in, use it yourself. No commercial rights." },
  { key: "CU", name: "Commercial Use", short: "CU", summary: "Use it as an element in something new you sell or make for clients." },
  { key: "RR", name: "Resell Rights", short: "RR", summary: "Sell copies and keep the profit. Your buyers get personal use only." },
  { key: "MRR", name: "Master Resell Rights", short: "MRR", summary: "Sell copies as-is — and your buyers may resell it too." },
  { key: "PLR", name: "Private Label Rights", short: "PLR", summary: "Edit, rebrand and sell it under your own name." },
];

/** true = allowed, false = not allowed, string = allowed with a condition. Columns follow `licenses`. */
export const licenseRows: { label: string; values: Record<LicenseKey, boolean | string> }[] = [
  { label: "Use it yourself", values: { PUO: true, CU: true, RR: true, MRR: true, PLR: true } },
  { label: "Use it in client work or new products", values: { PUO: false, CU: true, RR: false, MRR: false, PLR: true } },
  { label: "Sell copies and keep 100% of the profit", values: { PUO: false, CU: false, RR: true, MRR: true, PLR: true } },
  { label: "Your buyers may resell it", values: { PUO: false, CU: false, RR: false, MRR: true, PLR: "RR or MRR only" } },
  { label: "Edit the content", values: { PUO: false, CU: "As part of new work", RR: false, MRR: false, PLR: true } },
  { label: "Put your name and brand on it", values: { PUO: false, CU: false, RR: false, MRR: false, PLR: true } },
  { label: "Sell the original file on its own", values: { PUO: false, CU: false, RR: true, MRR: true, PLR: true } },
];

export const licenseNever = [
  "Pass on PLR rights themselves — your buyers can get RR or MRR at most",
  "Give products away in free bundles, membership dumps or giveaway sites",
  "Sell below the minimum price stated in the terms",
  "Use the products for anything illegal, misleading or spammy",
];

export const faq = [
  {
    q: "What's the difference between PLR and MRR?",
    a: "MRR lets you sell the product exactly as it is — our branding stays — and your buyers can resell it too. PLR lets you edit everything, including the title, cover and author, and sell it as your own product.",
  },
  {
    q: "What files do I get?",
    a: "Every ebook comes as a ready PDF plus editable source files (DOCX and a Canva link for PLR), the cover, product mockups and a license certificate with the full terms.",
  },
  {
    q: "Can I sell on Etsy, Payhip, Gumroad or my own site?",
    a: "Yes — anywhere you can legally sell digital products. With PLR we recommend editing the product first so your listing is unique.",
  },
  {
    q: "What can I do with the mockup templates?",
    a: "Use them to present your own products — in listings, ads, social posts and client work. The Commercial Use license covers that; it doesn't allow reselling the mockup files themselves.",
  },
  {
    q: "Is VAT included in the price?",
    a: "Yes. The price you see on this page is the final total at checkout.",
  },
  {
    q: "When do I get access?",
    a: "Immediately. After payment Payhip shows your download link and emails it to you.",
  },
  {
    q: "Is this legal advice?",
    a: "No. The license table is a plain-language summary; the full terms in your download are what applies. If you're unsure about a specific use, ask us before you publish.",
  },
];

/** "Ready to start?" — the two ways in, shown above the contact form. */
export const paths = [
  {
    eyebrow: "Free · Start here",
    title: "Learn how reselling works",
    body: "The free starter kit walks you through licenses, rebranding and your first listing — step by step, at no cost.",
    cta: "Get the free kit",
    href: "#starter",
    primary: false,
  },
  {
    eyebrow: "Done for you · PLR & MRR",
    title: "Skip the blank page",
    body: "No research, no writing, no design. Pick a finished product with resell rights and have it listed in your store today.",
    cta: "Shop PLR products",
    href: "#plr-shop",
    primary: true,
  },
];

export const marquee =["Your brand", "Your price", "Your profit"];
