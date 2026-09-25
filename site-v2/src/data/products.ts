import { BUNDLE, PAYHIP } from "./site";

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
    cover: "/images/product-bundle-build-launch-sell.svg",
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
    cover: "/images/product-ai-content-system.svg",
    price: "€19",
    href: PAYHIP("RX0Q7"),
    status: "available",
    span: 4,
  },
  {
    id: "storefront",
    title: "The 60-Minute Storefront",
    blurb: "Launch a real website and shop in about an hour.",
    cover: "/images/product-site-shop-1h.svg",
    price: "€39",
    href: PAYHIP("Wgjuq"),
    status: "available",
    span: 4,
  },
  {
    id: "ebook-24h",
    title: "The 24-Hour Ebook",
    blurb: "Write, publish and sell your first ebook before the day is over.",
    cover: "/images/product-first-ebook-24h.svg",
    price: "€39",
    href: PAYHIP("ujzSi"),
    status: "available",
    span: 4,
  },
  {
    id: "first-sale",
    title: "Zero to First Sale",
    blurb: "Website, product and payment — the exact system behind this site, in one evening.",
    cover: "/images/product-zero-to-first-sale.svg",
    price: "€39",
    href: PAYHIP("0qJPn"),
    status: "available",
    span: 4,
  },
  {
    id: "template-kit",
    title: "The Content Template Kit",
    blurb: "Ready-to-edit posts, carousels and stories for a consistent, premium feed.",
    cover: "/images/product-content-template-kit.svg",
    href: "#contact",
    status: "soon",
    span: 4,
  },
  {
    id: "prompt-vault",
    title: "The Prompt Vault",
    blurb: "Tested AI prompts for hooks, captions and sales copy that sound like you.",
    cover: "/images/product-prompt-vault.svg",
    href: "#contact",
    status: "soon",
    span: 4,
  },
  {
    id: "presets",
    title: "Editorial Presets",
    blurb: "Warm, clean photo presets for a timeless editorial look in one tap.",
    cover: "/images/product-editorial-presets.svg",
    href: "#contact",
    status: "soon",
    span: 4,
  },
];
