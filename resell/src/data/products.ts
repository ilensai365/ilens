import type { LicenseKey } from "./site";

/** Base-relative image prefix, so the site also works from a sub-path. */
const IMG = import.meta.env.BASE_URL + "images/";
const MOCK = (slug: string, kind: string) => `${IMG}mockups/${slug}-mockup-${kind}.webp`;
/** Dark cover art (SVG) — shown on the card and first in the gallery. */
const COVER = (name: string) => `${IMG}dark/product-${name}.svg`;
const LUX = (name: string) => `${IMG}lux/${name}.webp`;

export type Category = "ebooks" | "mockups" | "bundles" | "websites";

/** One purchasable license of an item. Empty `code` = not in the Payhip store yet. */
export type LicenseOption = {
  /** DFY = done-for-you service (no resell license; the buyer gets a finished website). */
  license: Extract<LicenseKey, "MRR" | "PLR" | "CU"> | "DFY";
  price: string;
  /** Only for bundles: the real total of the items bought separately. No invented "regular" prices. */
  compareAt?: string;
  code: string;
};

export type ShopItem = {
  id: string;
  title: string;
  blurb: string;
  category: Category;
  isNew?: boolean;
  /** Card image; the first gallery image in the quick view. SVG = dark cover art, shown whole on a glow. */
  image: string;
  gallery: string[];
  /** Small badge on the image, e.g. "40 pages" or "12 scenes". */
  badge: string;
  formats: string[];
  options: LicenseOption[];
  includes: string[];
  perfectFor: string[];
  /** Id of the bundle suggested as "Bundle & save" in the quick view. */
  bundleId?: string;
  /** Done-for-you service: enquiry instead of checkout, no license checklist. */
  service?: boolean;
};

const ebookIncludes = (pages: string) => [
  `The finished ebook — ${pages}, PDF`,
  "Editable source: DOCX + Canva template (PLR)",
  "Cover + 4 product mockups for your listing",
  "Ready-to-paste sales page copy",
  "License certificate with the full terms",
];

const ebookGallery = (slug: string) => ["devices", "spread", "stack", "inside"].map((k) => MOCK(slug, k));

/** Prices are proposals (VAT incl.) — confirm before creating the Payhip products. */
export const shopItems: ShopItem[] = [
  {
    id: "library",
    title: "The Resell Library",
    blurb: "All four ebooks with PLR rights — edit, rebrand and sell them as your own product line.",
    category: "bundles",
    isNew: true,
    // Not the "collection" render: it has the old €180 bundle price baked in.
    image: COVER("resell-library"),
    gallery: [COVER("resell-library"), MOCK("build-launch-sell", "stack"), ...["ai-content-system", "the-60-minute-storefront", "zero-to-first-sale"].map((s) => MOCK(s, "devices"))],
    badge: "4 ebooks",
    formats: ["PDF", "DOCX", "Canva"],
    options: [{ license: "PLR", price: "€147", compareAt: "€268", code: "" }],
    includes: [
      "AI Content System, The 60-Minute Storefront, The 24-Hour Ebook, Zero to First Sale",
      "Editable DOCX + Canva source for every ebook",
      "16 product mockups and 4 covers",
      "Sales page copy for each ebook",
      "PLR license certificate",
    ],
    perfectFor: ["Launching a full product line at once", "Coaches and educators who teach online business", "Building a bundle or membership"],
  },
  {
    id: "lux-website",
    title: "Lux Website & Store",
    blurb: "We build your own dedicated website and shop in this premium dark style — stocked with PLR products rebranded under your name.",
    category: "websites",
    isNew: true,
    service: true,
    image: LUX("lux-devices"),
    gallery: [LUX("lux-devices"), LUX("lux-shop"), LUX("lux-offers"), LUX("lux-mobile")],
    badge: "7 days",
    formats: ["Your domain", "Payhip", "Cloudflare"],
    options: [{ license: "DFY", price: "€997", code: "" }],
    includes: [
      "A dedicated one-page website on your domain, in your colours and fonts",
      "Shop with up to 10 products, product quick views and Payhip checkout (EU VAT handled)",
      "The Resell Library rebranded under your name — 4 ebooks with new titles and dark covers",
      "Mockups for every product, license page, FAQ and contact form",
      "Free-starter email signup (lead magnet) connected",
      "Hosting set up on Cloudflare — no monthly fees",
      "1:1 launch call + 30 days of small changes",
    ],
    perfectFor: ["Creators launching a digital product brand", "PLR resellers who want a premium store", "Coaches moving off link-in-bio pages"],
  },
  {
    id: "ai-content-system",
    title: "AI Content System",
    blurb: "A five-stage content loop with 30 AI prompts — an evergreen topic every creator audience buys.",
    category: "ebooks",
    isNew: true,
    image: COVER("ai-content-system"),
    gallery: [COVER("ai-content-system"), ...ebookGallery("ai-content-system")],
    badge: "29 pages",
    formats: ["PDF", "DOCX", "Canva"],
    options: [
      { license: "MRR", price: "€47", code: "" },
      { license: "PLR", price: "€67", code: "" },
    ],
    includes: ebookIncludes("29 pages"),
    perfectFor: ["Social media managers", "Content creators and coaches", "AI and productivity niches"],
    bundleId: "library",
  },
  {
    id: "storefront",
    title: "The 60-Minute Storefront",
    blurb: "Website and shop in an hour — a step-by-step build guide for first-time sellers.",
    category: "ebooks",
    image: COVER("site-shop-1h"),
    gallery: [COVER("site-shop-1h"), ...ebookGallery("the-60-minute-storefront")],
    badge: "40 pages",
    formats: ["PDF", "DOCX", "Canva"],
    options: [
      { license: "MRR", price: "€47", code: "" },
      { license: "PLR", price: "€67", code: "" },
    ],
    includes: ebookIncludes("40 pages"),
    perfectFor: ["Web designers and VAs", "Small-business audiences", "Side-hustle and online business niches"],
    bundleId: "library",
  },
  {
    id: "ebook-24h",
    title: "The 24-Hour Ebook",
    blurb: "Write, publish and sell an ebook in a day — ideal for audiences who want to start creating.",
    category: "ebooks",
    image: COVER("first-ebook-24h"),
    gallery: [COVER("first-ebook-24h"), ...ebookGallery("the-24-hour-ebook")],
    badge: "40 pages",
    formats: ["PDF", "DOCX", "Canva"],
    options: [
      { license: "MRR", price: "€47", code: "" },
      { license: "PLR", price: "€67", code: "" },
    ],
    includes: ebookIncludes("40 pages"),
    perfectFor: ["Writing and publishing niches", "Coaches with a first-product audience", "Digital product educators"],
    bundleId: "library",
  },
  {
    id: "first-sale",
    title: "Zero to First Sale",
    blurb: "Site, product and payment in one evening — the complete first-sale system.",
    category: "ebooks",
    image: COVER("zero-to-first-sale"),
    gallery: [COVER("zero-to-first-sale"), ...ebookGallery("zero-to-first-sale")],
    badge: "40 pages",
    formats: ["PDF", "DOCX", "Canva"],
    options: [
      { license: "MRR", price: "€47", code: "" },
      { license: "PLR", price: "€67", code: "" },
    ],
    includes: ebookIncludes("40 pages"),
    perfectFor: ["Beginner online business audiences", "Etsy and Payhip sellers", "Side-hustle communities"],
    bundleId: "library",
  },
  {
    id: "mockups-all",
    title: "All Mockup Packs",
    blurb: "Every mockup template we make — devices, open books, stacks and page grids.",
    category: "bundles",
    image: MOCK("zero-to-first-sale", "stack"),
    gallery: [MOCK("zero-to-first-sale", "stack"), MOCK("the-60-minute-storefront", "devices"), MOCK("the-24-hour-ebook", "spread"), MOCK("zero-to-first-sale", "inside")],
    badge: "40 scenes",
    formats: ["Canva", "PSD"],
    options: [{ license: "CU", price: "€49", compareAt: "€76", code: "" }],
    includes: ["Device, Open Book, Stack & Bundle and “What's Inside” packs", "Canva frames + PSD smart objects", "Commercial-use license certificate"],
    perfectFor: ["Digital product sellers", "Designers doing client launches", "Etsy and Payhip listings"],
  },
  ...(
    [
      ["devices", "Device Mockups", "Tablet + phone scenes that show your ebook or app on screen.", "the-60-minute-storefront", "12 scenes"],
      ["spread", "Open Book Mockups", "Printed-spread scenes that make a PDF look like a real book.", "the-24-hour-ebook", "10 scenes"],
      ["stack", "Stack & Bundle Mockups", "Fanned covers and stacks for bundles, collections and upsells.", "the-24-hour-ebook", "10 scenes"],
      ["inside", "“What's Inside” Grids", "Page-grid layouts that preview the content before people buy.", "zero-to-first-sale", "8 layouts"],
    ] as const
  ).map(
    ([kind, title, blurb, hero, badge]): ShopItem => ({
      id: `mockups-${kind}`,
      title,
      blurb,
      category: "mockups",
      image: MOCK(hero, kind),
      // The same template shown with different covers.
      gallery: [hero, ...["ai-content-system", "the-60-minute-storefront", "the-24-hour-ebook", "zero-to-first-sale"].filter((s) => s !== hero)].map((s) => MOCK(s, kind)),
      badge,
      formats: ["Canva", "PSD"],
      options: [{ license: "CU", price: "€19", code: "" }],
      includes: [`${badge} in one pack`, "Canva frames + PSD smart objects", "Drop in your cover, export at 2000 px", "Commercial-use license certificate"],
      perfectFor: ["Product listings and ads", "Social posts and launches", "Client work"],
      bundleId: "mockups-all",
    }),
  ),
];

export const byId = (id: string) => shopItems.find((i) => i.id === id);

const lib = byId("library")!;
/** The hero card and floating CTA use the library bundle. */
export const LIBRARY = {
  title: lib.title,
  license: "PLR" as const,
  price: lib.options[0].price,
  compareAt: lib.options[0].compareAt!,
  save: "€121",
  code: lib.options[0].code,
  cover: COVER("resell-library"),
};

export const ebooks = shopItems.filter((i) => i.category === "ebooks");

export const categories: { key: "all" | "new" | Category | "under20"; label: string; match: (i: ShopItem) => boolean }[] = [
  { key: "all", label: "All products", match: () => true },
  { key: "new", label: "New", match: (i) => !!i.isNew },
  { key: "ebooks", label: "eBooks", match: (i) => i.category === "ebooks" },
  { key: "mockups", label: "Mockups", match: (i) => i.category === "mockups" },
  { key: "bundles", label: "Bundles", match: (i) => i.category === "bundles" },
  { key: "websites", label: "Websites", match: (i) => i.category === "websites" },
  { key: "under20", label: "Under €20", match: (i) => i.options.some((o) => parseFloat(o.price.replace("€", "")) < 20) },
];
