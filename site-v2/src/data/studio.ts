// Content for ilens.co/studio — portfolio, services and packages.
// Projects: images cropped from the 2026 portfolio PDF (scripts/portfolio-images.mjs).
// Honesty rule: the set mixes client and self-initiated work, so no project claims a client or a result.
// Prices are "from" ranges proposed 2026-09-27 — confirm with the owner before changing.

const IMG = import.meta.env.BASE_URL + "images/work/";
const EB = import.meta.env.BASE_URL + "images/ebooks/";

export type Category = "Branding" | "Web" | "Social & campaigns" | "AI video" | "Print & packaging" | "Ebooks" | "Events";

export type Project = {
  id: string;
  title: string;
  sector: string;
  categories: Category[];
  summary: string;
  /** Single-shot, dark-graded card image (scripts/portfolio-covers.mjs). */
  cover: string;
  /** Dark toned detail for the grid card (scripts/portfolio-motifs.mjs); the cover stays for other uses. */
  motif?: string;
  deliverables: string[];
  images: string[];
  /** Grid size on desktop: wide tiles span two columns. */
  wide?: boolean;
};

export const categories: Category[] = ["Branding", "Web", "Social & campaigns", "AI video", "Print & packaging", "Ebooks", "Events"];

export const projects: Project[] = [
  {
    id: "luxe-rest",
    cover: IMG + "covers/luxe-rest-bed.webp",
    title: "Luxe Rest",
    sector: "Home & sleep",
    categories: ["AI video", "Social & campaigns"],
    summary: "AI films for a luxury mattress brand: a 10-second hero film generated in Google Flow and a 45-second brand edit with editorial type.",
    deliverables: ["AI hero film (10 s)", "Brand film edit (45 s)", "Scene generation", "Copy & typography"],
    images: [IMG + "video/luxe-rest-bed.mp4", IMG + "video/luxe-rest.mp4"],
  },
  {
    id: "penthouse-tour",
    cover: IMG + "covers/penthouse-tour.webp",
    title: "Penthouse Tour",
    sector: "Property developers",
    categories: ["AI video"],
    summary: "AI walkthrough films for property developers: sell the view and the light before the building is finished.",
    deliverables: ["AI property films", "Camera moves", "Social cut-downs"],
    images: [IMG + "video/penthouse-tour.mp4", IMG + "video/penthouse-interior.mp4"],
  },
  {
    id: "lumiere",
    cover: IMG + "covers/lumiere.webp",
    title: "Lumière",
    sector: "Beauty",
    categories: ["Social & campaigns", "Branding"],
    summary: "A beauty campaign: key visuals, product imagery and social content in one editorial look.",
    deliverables: ["Campaign key visuals", "Product imagery", "Social content"],
    images: [IMG + "lumiere.webp"],
  },
  {
    id: "centrum-seo",
    cover: IMG + "covers/centrum-seo.webp",
    title: "Centrum SEO",
    sector: "Marketing agency",
    categories: ["Branding", "Web"],
    summary: "Brand identity, stationery and a responsive website for an SEO agency.",
    deliverables: ["Logo & identity", "Business cards", "Responsive website"],
    images: [IMG + "centrum-seo.webp"],
  },
  {
    id: "cube-casino",
    cover: IMG + "covers/cube-casino.webp",
    title: "Cube Casino",
    sector: "iGaming",
    categories: ["Web", "Branding"],
    summary: "A dark, premium website and brand visuals for an online casino.",
    deliverables: ["Responsive website", "Brand visuals"],
    images: [IMG + "cube-casino.webp"],
  },
  {
    id: "flamart",
    cover: IMG + "covers/flamart.webp",
    title: "Flamart System",
    sector: "Wellness",
    categories: ["Print & packaging", "Branding"],
    summary: "Packaging system and product catalogue for a CBD wellness line.",
    deliverables: ["Packaging system", "Catalogue", "Product visuals"],
    images: [IMG + "flamart.webp", IMG + "flamart-catalogue.webp"],
  },
  {
    id: "summerhill",
    cover: IMG + "covers/summerhill.webp",
    title: "Summerhill",
    sector: "Food & drink",
    categories: ["Print & packaging"],
    summary: "A tea packaging series with a calm, pastel colour system.",
    deliverables: ["Packaging series", "Colour system"],
    images: [IMG + "summerhill.webp"],
  },
  {
    id: "property-developer",
    cover: IMG + "covers/property-developer.webp",
    title: "Property Developer",
    sector: "Real estate",
    categories: ["Web"],
    summary: "Digital strategy and a web presentation for a property developer.",
    deliverables: ["Web design", "Digital strategy", "Responsive layouts"],
    images: [IMG + "property-developer.webp"],
  },
  {
    id: "tech-webinar",
    cover: IMG + "covers/tech-webinar.webp",
    title: "Discover the Future of Tech",
    sector: "Tech events",
    categories: ["Social & campaigns", "Events"],
    summary: "Live webinar campaign: key visual, social formats and registration assets.",
    deliverables: ["Key visual", "Social formats", "Landing assets"],
    images: [IMG + "tech-webinar.webp"],
  },
  {
    id: "g-volt",
    cover: IMG + "covers/g-volt.webp",
    title: "G-Volt",
    sector: "Renewable energy",
    categories: ["Web", "Social & campaigns"],
    summary: "Website, product visuals and a digital campaign for a solar and heat-pump brand.",
    deliverables: ["Website", "Product visuals", "Social campaign", "Brand system"],
    images: [IMG + "g-volt.webp", IMG + "g-volt-campaign.webp"],
    wide: true,
  },
  {
    id: "finik-family",
    cover: IMG + "covers/finik-family.webp",
    title: "Finik Family",
    sector: "Natural products",
    categories: ["Print & packaging", "Branding"],
    summary: "Packaging and a monogram identity for a natural products line.",
    deliverables: ["Packaging", "Monogram identity"],
    images: [IMG + "finik-family.webp"],
  },
  {
    id: "ilens-guides",
    cover: EB + "bundle.webp",
    title: "iLens Guides",
    sector: "Ebooks",
    categories: ["Ebooks", "Branding"],
    summary: "Our own library of four PDF guides: covers, editorial layout, device and print mockups, and the store pages that sell them.",
    deliverables: ["Cover system", "Editorial layout", "Mockups", "Store pages"],
    images: [EB + "collection.webp", EB + "stack.webp", EB + "devices.webp", EB + "spread.webp"],
  },
  {
    id: "block-street",
    cover: IMG + "covers/block-street.webp",
    title: "Block Street",
    sector: "Real estate",
    categories: ["Web"],
    summary: "A clean, responsive website for a residential project.",
    deliverables: ["Website", "Responsive layouts"],
    images: [IMG + "block-street.webp"],
  },
  {
    id: "immersive",
    cover: IMG + "covers/immersive.webp",
    title: "Immersive Experiences",
    sector: "Gaming & tech",
    categories: ["Social & campaigns"],
    summary: "AI-assisted campaign visuals for an immersive gaming experience.",
    deliverables: ["Campaign visuals", "AI art direction"],
    images: [IMG + "immersive.webp"],
  },
];

// Every project has a motif named after its id.
for (const p of projects) p.motif = IMG + "motifs/" + p.id + ".webp";

/** Studio hero: the iLens guides as ebook-design showcase; each card opens the product page. */
export const heroEbooks = [
  { id: "hero-bundle", title: "Build. Launch. Sell.", price: "€99", cover: EB + "bundle.webp", href: "https://payhip.com/b/j4i6s" },
  { id: "hero-ai", title: "AI Content System", price: "€19", cover: EB + "ai-content-system.webp", href: "https://payhip.com/b/RX0Q7" },
  { id: "hero-24h", title: "The 24-Hour Ebook", price: "€39", cover: EB + "24-hour-ebook.webp", href: "https://payhip.com/b/ujzSi" },
];

export const services = [
  { title: "Social media", body: "Monthly content, templates and captions that look like one brand, not twenty posts.", from: "from €99 / month" },
  { title: "Brand identity", body: "Logo, colour, typography and a brand guide your team can actually use.", from: "from €1,200" },
  { title: "Websites & landing pages", body: "Designed and built, fast and mobile-first. Like the site you're on.", from: "from €199" },
  { title: "Campaigns & key visuals", body: "Launches, ads, events and seasonal campaigns across social, print and OOH.", from: "from €200" },
  { title: "Packaging & print", body: "Packaging systems, catalogues and print that hold up on the shelf.", from: "from €299" },
  {
    title: "AI content systems",
    body: "Prompt libraries, workflows and templates so your team creates faster, on-brand. Start with our guide or the free prompt pack.",
    from: "from €19",
    links: [
      { label: "AI Content System — €19", href: "https://payhip.com/b/RX0Q7" },
      { label: "Free: 10 AI prompts", href: "/free/" },
    ],
  },
  {
    title: "Ebooks & digital products",
    body: "Ebooks, guides and lead magnets designed to sell: cover, editorial layout, device and print mockups, and a store page. The same system behind our own guides.",
    from: "from €299",
    image: EB + "fan-wide.webp",
    links: [{ label: "See our guides", href: "/#shop" }],
  },
];

export const packages = [
  {
    name: "Content",
    tagline: "Social media, done monthly",
    price: "from €99",
    unit: "/ month",
    features: ["Monthly content plan", "Designed posts, carousels and stories", "Captions in your brand voice", "Reusable templates"],
  },
  {
    name: "Launch",
    tagline: "Brand + website, ready to sell",
    price: "from €199",
    unit: "/ project",
    features: ["Brand identity and guide", "Website or landing page", "Launch campaign visuals", "Social templates"],
  },
  {
    name: "1:1 Creative Partner",
    tagline: "Your design team on call",
    price: "from €299",
    unit: "/ month",
    cta: "Apply for 1:1 →",
    features: ["Strategy, design and social in one team", "Direct 1:1 line and monthly session", "AI workflows set up for your brand", "Limited places"],
  },
  {
    name: "1:1 Partner Pro",
    tagline: "The complete partnership",
    price: "from €999",
    unit: "/ month",
    premium: true,
    cta: "Apply for Pro →",
    features: ["Everything in 1:1 Creative Partner", "Brand, web, social and campaigns covered", "Weekly strategy sessions", "Custom AI content system for your team", "Priority turnaround, first in the queue"],
  },
];

export const process = [
  { title: "Discover", body: "Your goals, audience and what already works." },
  { title: "Define", body: "One clear direction and the brief we both sign off." },
  { title: "Ideate", body: "Concepts and routes, with AI to test more ideas faster." },
  { title: "Design", body: "The chosen route, crafted to detail." },
  { title: "Deliver", body: "Files, templates and a system you keep using." },
];

export const sectors = ["iGaming", "Real estate", "Energy", "Beauty & wellness", "Food & drink", "Tech"];

export const studioFaq = [
  { q: "How do we start?", a: "Send the form below with a few words about the project. We reply personally with questions and a proposal." },
  { q: "Do you work with small brands?", a: "Yes. The Content package is built for small teams; larger brands usually start with Launch or the 1:1 partnership." },
  { q: "What does “from” mean in the prices?", a: "It's the starting price for a typical scope. After a short call we send a fixed quote, so you know the total before we begin." },
  { q: "Can you work in English and Polish?", a: "Yes, we work with brands in both languages." },
];
