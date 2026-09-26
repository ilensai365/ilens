import { BUNDLE, PAYHIP } from "./site";

/** Base-relative image prefix, so the site also works from a sub-path (e.g. the accent preview build). */
const IMG = import.meta.env.BASE_URL;

export type Product = {
  id: string;
  title: string;
  blurb: string;
  cover: string;
  /** Display price, VAT included. Omit for coming-soon items. */
  price?: string;
  compareAt?: string;
  href: string;
  status: "available" | "soon";
  /** Page count shown on the card, e.g. "40 pages". */
  pages?: string;
  /** "What's inside" bullets — keep in sync with the Payhip description (ilens-ebooks/payhip-descriptions.html). */
  includes?: string[];
  featured?: boolean;
  /** Columns out of 12 on desktop. */
  span: 4 | 6 | 8;
};

export const products: Product[] = [
  {
    id: "bundle",
    title: "Build. Launch. Sell.",
    blurb:
      "All four guides in one download — AI Content System, The 60-Minute Storefront, The 24-Hour Ebook and Zero to First Sale. Everything from idea to first sale.",
    cover: IMG + "images/dark/product-bundle-build-launch-sell.svg",
    price: BUNDLE.price,
    compareAt: BUNDLE.compareAt,
    href: PAYHIP("j4i6s"),
    status: "available",
    featured: true,
    span: 8,
  },
  {
    id: "ai-content-system",
    title: "AI Content System",
    blurb: "Plan, create and repurpose content with AI — faster and smarter.",
    cover: IMG + "images/dark/product-ai-content-system.svg",
    price: "€19",
    href: PAYHIP("RX0Q7"),
    status: "available",
    pages: "29 pages",
    includes: [
      "Five-stage content loop, from strategy to repurposing",
      "30 copy-ready AI prompts for ideas, hooks and captions",
      "Seven hook types and a weekly content system",
      "7-day implementation challenge",
    ],
    span: 4,
  },
  {
    id: "storefront",
    title: "The 60-Minute Storefront",
    blurb: "Launch a real website and shop in about an hour.",
    cover: IMG + "images/dark/product-site-shop-1h.svg",
    price: "€39",
    href: PAYHIP("Wgjuq"),
    status: "available",
    pages: "40 pages",
    includes: [
      "Minute-by-minute build plan",
      "Master AI prompt for a clean, mobile-first site",
      "Payhip shop, Buy buttons and a working contact form",
      "Live on your own domain via GitHub + Cloudflare",
    ],
    span: 4,
  },
  {
    id: "ebook-24h",
    title: "The 24-Hour Ebook",
    blurb: "Write, publish and sell your first ebook before the day is over.",
    cover: IMG + "images/dark/product-first-ebook-24h.svg",
    price: "€39",
    href: PAYHIP("ujzSi"),
    status: "available",
    pages: "40 pages",
    includes: [
      "The 1-1-1 test to pick a topic people pay for",
      "Hour-by-hour writing sprint and chapter template",
      "AI as co-writer — in your own voice",
      "Pricing, Payhip checkout and launch scripts",
    ],
    span: 4,
  },
  {
    id: "first-sale",
    title: "Zero to First Sale",
    blurb: "Website, product and payment — the exact system behind this site, in one evening.",
    cover: IMG + "images/dark/product-zero-to-first-sale.svg",
    price: "€39",
    href: PAYHIP("0qJPn"),
    status: "available",
    pages: "40 pages",
    includes: [
      "Validate your offer in 15 minutes",
      "Storefront trust stack and a product card that converts",
      "Checkout, EU VAT basics and refund policy",
      "10–10–10 plan for your first hundred visitors",
    ],
    span: 4,
  },
  {
    id: "template-kit",
    title: "The Content Template Kit",
    blurb: "Ready-to-edit posts, carousels and stories for a consistent, premium feed.",
    cover: IMG + "images/dark/product-content-template-kit.svg",
    href: "#contact",
    status: "soon",
    span: 4,
  },
  {
    id: "prompt-vault",
    title: "The Prompt Vault",
    blurb: "Tested AI prompts for hooks, captions and sales copy that sound like you.",
    cover: IMG + "images/dark/product-prompt-vault.svg",
    href: "#contact",
    status: "soon",
    span: 4,
  },
  {
    id: "presets",
    title: "Editorial Presets",
    blurb: "Warm, clean photo presets for a timeless editorial look in one tap.",
    cover: IMG + "images/dark/product-editorial-presets.svg",
    href: "#contact",
    status: "soon",
    span: 4,
  },
];
