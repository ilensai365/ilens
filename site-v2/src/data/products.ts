import { BUNDLE, PAYHIP } from "./site";
import { isPl } from "../lib/i18n";

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
  /** false = sold on its own, not part of the Build. Launch. Sell. bundle (kept out of the bundle lists). */
  inBundle?: boolean;
  /** Full-width "new release" card at the top of the shop. */
  spotlight?: {
    label: string;
    lead: string;
    /** Extra paragraphs under the lead on the shop card. */
    body: string[];
    /** One-liner and chapter list for the hero card. */
    short: string;
    chapters: string[];
    /** Shown under the price, joined with " · ". */
    stats: string[];
  };
  /** Slide in the hero carousel (order = order in this list). */
  hero?: {
    eyebrow: string;
    /** Rotating first line — keep each short so it clears the hero card. */
    phrases: string[];
    /** Gold italic second line. */
    tagline: string;
    sub: string;
    proof: string[];
    /** Small looping reel beside the cover on the hero card. */
    reel?: { src: string; poster: string; label: string };
    /** Flagship look: lit cover with a floating AI-answer card instead of the reel. */
    flagship?: boolean;
  };
  /** Columns out of 12 on desktop. */
  span: 3 | 4 | 6 | 8 | 12;
};

const productsEn: Product[] = [
  {
    id: "chatgpt-visibility",
    title: "Your Business in ChatGPT",
    blurb: "Get your business and products recommended by ChatGPT — and understand the new ChatGPT ads.",
    cover: IMG + "images/dark/product-chatgpt-visibility.jpg",
    price: "€39",
    href: PAYHIP("DZMga"),
    status: "available",
    pages: "34 pages",
    inBundle: false,
    includes: [
      "How ChatGPT decides what to recommend",
      "The one-sentence test and a page AI can read",
      "Make sure your site doesn’t block ChatGPT",
      "Get mentioned honestly where AI looks",
      "A monthly audit: does ChatGPT know you?",
      "ChatGPT ads explained, plus a small-budget first test",
      "14-day plan, prompts and checklists",
    ],
    spotlight: {
      label: "Flagship · AI visibility guide",
      lead: "Your next customer is asking ChatGPT. Make sure it can recommend you.",
      body: [
        "People don’t only google anymore — they ask ChatGPT and get two or three suggestions, not ten links. This guide shows how AI answers pick products and how to make yours easy to understand, find and recommend.",
        "And since 2026 ChatGPT has ads: we explain how they work, what they cost and when a small test makes sense — using OpenAI’s own facts, in plain English.",
      ],
      short: "How AI answers pick products, how to make yours easy to recommend, and how the new ChatGPT ads fit in.",
      chapters: ["How ChatGPT picks what to mention", "A product page AI can read", "Be talked about where AI looks", "ChatGPT ads, explained", "The 14-day plan"],
      stats: ["One-time", "VAT incl.", "34 pages"],
    },
    hero: {
      eyebrow: "New guide · Your business in ChatGPT",
      phrases: ["Your business", "Your products", "Your brand"],
      tagline: "recommended by ChatGPT.",
      sub: "How AI answers pick products, how to be one of them — and what the new ChatGPT ads change.",
      proof: ["34 pages", "8 chapters", "Instant download", "VAT included"],
      flagship: true,
    },
    span: 12,
  },
  {
    id: "claude-remotion",
    title: "Claude × Remotion",
    blurb: "Make branded videos by describing them — no editing app, no timeline dragging.",
    cover: IMG + "images/dark/product-claude-remotion.webp",
    price: "€29",
    href: PAYHIP("QbEwq"),
    status: "available",
    pages: "49 pages",
    inBundle: false,
    includes: [
      "Setup in ten minutes with Claude Code",
      "The prompt that builds a finished reel",
      "Preview, edit in plain words, render to MP4",
      "Templates for whole series and client work",
      "Brand and label AI footage the right way",
      "Case study: our 30-second reel, frame by frame",
      "Prompt library, command sheet and fixes",
    ],
    spotlight: {
      label: "New · Video guide",
      lead: "Make branded videos by describing them — Claude writes the code, Remotion renders the MP4.",
      body: [
        "Every reel you build in an editor is a one-off: the title, the font, the timing, again and again. This guide turns your format into a template, so the tenth video takes minutes instead of an evening — in your colours, your fonts, every time.",
        "We make reels — for iLens and for brands — and every one in this guide is real: our brand intro, teaching reels, client product templates, AI clips, and a full case study of our 30-second reel, frame by frame. No coding experience needed.",
      ],
      short: "We make our reels this way. Describe it, Claude writes it, Remotion renders it. Inside: our own 30-second reel, frame by frame.",
      chapters: ["Set up in ten minutes", "The prompt that builds a reel", "Preview, edit, render", "One reel, many videos", "Case study: our 30-second reel"],
      stats: ["One-time", "VAT incl.", "49 pages"],
    },
    hero: {
      eyebrow: "New guide · Claude × Remotion",
      phrases: ["Make reels", "Make videos", "Make ads"],
      tagline: "just by describing them.",
      sub: "Claude writes the code, Remotion renders the MP4. On-brand videos in minutes — no editing app.",
      proof: ["49 pages", "9 chapters", "Instant download", "VAT included"],
      reel: { src: IMG + "video/claude-reel.mp4", poster: IMG + "video/claude-reel-poster.jpg", label: "Our reel, made with Claude and Remotion" },
    },
    span: 12,
  },
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

/** Polish copy for /pl/: the guides themselves are in English, so titles stay; descriptions are translated. */
const pl: Record<string, Partial<Product>> = {
  "chatgpt-visibility": {
    title: "Twoja firma w ChatGPT",
    blurb: "Spraw, żeby ChatGPT polecał Twoją firmę i produkty — i zrozum nowe reklamy w ChatGPT.",
    pages: "34 strony",
    includes: [
      "Jak ChatGPT decyduje, co polecić",
      "Test jednego zdania i strona, którą AI zrozumie",
      "Upewnij się, że Twoja strona nie blokuje ChatGPT",
      "Niech mówią o Tobie tam, gdzie zagląda AI",
      "Comiesięczny audyt: czy ChatGPT Cię zna?",
      "Reklamy w ChatGPT i pierwszy test na małym budżecie",
      "Plan na 14 dni, prompty i checklisty",
    ],
    spotlight: {
      label: "Flagowy · Widoczność w AI",
      lead: "Twój następny klient pyta ChatGPT. Zadbaj o to, żeby mógł polecić właśnie Ciebie.",
      body: [
        "Ludzie już nie tylko googlują — pytają ChatGPT i dostają dwie, trzy propozycje zamiast dziesięciu linków. Ten poradnik pokazuje, jak odpowiedzi AI wybierają produkty i jak sprawić, żeby Twój był łatwy do zrozumienia, znalezienia i polecenia.",
        "A od 2026 roku w ChatGPT są reklamy: wyjaśniamy, jak działają, ile kosztują i kiedy mały test ma sens — na podstawie oficjalnych informacji OpenAI, prostym językiem.",
      ],
      short: "Jak AI wybiera produkty, jak sprawić, żeby polecało Twój, i gdzie w tym wszystkim nowe reklamy w ChatGPT.",
      chapters: ["Jak ChatGPT wybiera, co polecić", "Strona produktu czytelna dla AI", "Bądź tam, gdzie zagląda AI", "Reklamy w ChatGPT w pigułce", "Plan na 14 dni"],
      stats: ["Jednorazowo", "VAT w cenie", "34 strony"],
    },
  },
  "claude-remotion": {
    blurb: "Twórz filmy w barwach marki, po prostu je opisując — bez programu do montażu i przeciągania na osi czasu.",
    pages: "49 stron",
    includes: [
      "Konfiguracja w dziesięć minut z Claude Code",
      "Prompt, który buduje gotową rolkę",
      "Podgląd, poprawki zwykłymi słowami, render do MP4",
      "Szablony na całe serie i projekty dla klientów",
      "Jak brandować i oznaczać materiały z AI",
      "Case study: nasza 30-sekundowa rolka klatka po klatce",
      "Biblioteka promptów, ściąga komend i rozwiązania problemów",
    ],
    spotlight: {
      label: "Nowość · Poradnik wideo",
      lead: "Twórz filmy w barwach marki, opisując je — Claude pisze kod, Remotion renderuje MP4.",
      body: [
        "Każda rolka zrobiona w edytorze to jednorazówka: tytuł, font, timing — w kółko od nowa. Ten poradnik zamienia Twój format w szablon, więc dziesiąty film zajmuje minuty zamiast wieczoru — zawsze w Twoich kolorach i fontach.",
        "Robimy rolki — dla iLens i dla marek — i każda w tym poradniku jest prawdziwa: intro marki, rolki edukacyjne, szablony produktowe dla klientów, klipy AI i pełne case study naszej 30-sekundowej rolki. Nie musisz umieć programować.",
      ],
      short: "Tak robimy nasze rolki. Opisujesz, Claude pisze, Remotion renderuje. W środku: nasza 30-sekundowa rolka klatka po klatce.",
      chapters: ["Konfiguracja w dziesięć minut", "Prompt, który buduje rolkę", "Podgląd, poprawki, render", "Jedna rolka, wiele filmów", "Case study: nasza 30-sekundowa rolka"],
      stats: ["Jednorazowo", "VAT w cenie", "49 stron"],
    },
  },
  bundle: {
    blurb:
      "Wszystkie cztery poradniki w jednym pliku — AI Content System, The 60-Minute Storefront, The 24-Hour Ebook i Zero to First Sale. Wszystko od pomysłu do pierwszej sprzedaży.",
  },
  "ai-content-system": {
    blurb: "Planuj, twórz i przetwarzaj treści z AI — szybciej i mądrzej.",
    pages: "29 stron",
    includes: [
      "Pięcioetapowa pętla treści: od strategii do recyklingu",
      "30 gotowych promptów AI do pomysłów, hooków i opisów",
      "Siedem typów hooków i tygodniowy system treści",
      "7-dniowe wyzwanie wdrożeniowe",
    ],
  },
  storefront: {
    blurb: "Uruchom prawdziwą stronę i sklep w około godzinę.",
    pages: "40 stron",
    includes: [
      "Plan budowy minuta po minucie",
      "Główny prompt AI na czystą stronę mobile-first",
      "Sklep Payhip, przyciski Kup i działający formularz kontaktowy",
      "Strona na własnej domenie przez GitHub + Cloudflare",
    ],
  },
  "ebook-24h": {
    blurb: "Napisz, wydaj i zacznij sprzedawać swój pierwszy ebook, zanim skończy się dzień.",
    pages: "40 stron",
    includes: [
      "Test 1-1-1: temat, za który ludzie płacą",
      "Sprint pisania godzina po godzinie i szablon rozdziału",
      "AI jako współautor — Twoim własnym głosem",
      "Cena, płatność w Payhip i skrypty na start",
    ],
  },
  "first-sale": {
    blurb: "Strona, produkt i płatności — dokładnie ten system, na którym działa ta strona, w jeden wieczór.",
    pages: "40 stron",
    includes: [
      "Zweryfikuj ofertę w 15 minut",
      "Elementy budujące zaufanie i karta produktu, która sprzedaje",
      "Płatności, podstawy VAT w UE i polityka zwrotów",
      "Plan 10–10–10 na pierwszych stu odwiedzających",
    ],
  },
  "template-kit": { blurb: "Gotowe do edycji posty, karuzele i relacje dla spójnego feedu premium." },
  "prompt-vault": { blurb: "Sprawdzone prompty AI do hooków, opisów i tekstów sprzedażowych, które brzmią jak Ty." },
  presets: { blurb: "Ciepłe, czyste presety do zdjęć — ponadczasowy, edytorski wygląd jednym kliknięciem." },
};

export const products: Product[] = isPl ? productsEn.map((p) => ({ ...p, ...pl[p.id] })) : productsEn;
