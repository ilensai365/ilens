// All editable copy and links live in src/data — change text here, not in components.

export const PAYHIP = (code: string) => `https://payhip.com/buy?link=${code}`;

/** Where the main "Get the bundle" buttons lead: the shop section on this page, not straight to checkout. */
export const SHOP_URL = "#shop";
export const CONTACT_EMAIL = "hello@ilens.co";
export const CONTACT_FORM_ENDPOINT = "https://formspree.io/f/myeyrnjy";

/** Social profiles shown in the footer. */
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/ilens.co/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594417455543" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ilenscreativestudio/" },
];

/**
 * Optional hero background video. Leave `src` empty to use the animated
 * gradient + floating covers. An `.m3u8` source streams via hls.js
 * (loaded only when needed); anything else plays as a normal <video>.
 */
export const heroVideo: { src: string; poster?: string } = { src: "" };

export const nav = [
  { label: "Shop", href: "#shop" },
  { label: "Offer", href: "#offer" },
  { label: "Method", href: "#method" },
  { label: "About", href: "#about" },
  { label: "1:1 & Projects", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

export const offer = [
  {
    title: "Ebooks & Playbooks",
    body: "Step-by-step guides you can finish in an evening — from building your shop to launching your first product.",
  },
  {
    title: "AI Prompt Packs",
    body: "Tested prompts for ideas, hooks, captions and sales copy that sound like you, not like a template.",
  },
  {
    title: "Content That Sells",
    body: "The hooks, structures and offers behind content that turns followers into buyers.",
  },
  {
    title: "Templates",
    body: "Ready-made layouts for posts, carousels, product pages and brand assets — edit, publish, done.",
    soon: true,
  },
  { title: "Presets", body: "Photo presets for a consistent, premium-looking feed in a single tap.", soon: true },
  {
    title: "Courses",
    body: "Guided programmes that take you from first idea to first sale, one lesson at a time.",
    soon: true,
  },
];

export const about = {
  lead: "iLens is a creative and strategy studio working at the intersection of design, marketing and artificial intelligence.",
  body: [
    "We help brands, founders and creators turn ideas into clear positioning, distinctive visual identities and content systems that scale. Every project combines editorial-level design craft with rigorous strategic thinking — so what looks good also works.",
    "AI is part of how we work, not a gimmick. We use it to research faster, test more ideas and build repeatable workflows, while every creative decision stays human, intentional and on-brand. The same thinking powers our digital products: practical guides and systems you can put to work the same day.",
  ],
  principles: [
    { title: "Clarity first", body: "Strategy before aesthetics — every project starts with what it needs to achieve." },
    { title: "Craft that lasts", body: "Editorial-level design, built as a system that scales across every channel." },
    { title: "AI with intent", body: "Faster research, more ideas, repeatable workflows — with human judgement on every decision." },
    { title: "Systems over one-offs", body: "Frameworks, templates and processes you keep using long after the launch." },
  ],
  tags: ["Brand Strategy", "Creative Direction", "Visual Identity", "Content Systems", "AI Workflows", "Digital Products"],
};

export const heroProof = ["4 guides", "149 pages", "Instant download", "VAT included"];

export const method = [
  { n: "01", title: "See", body: "Find the problem your audience will gladly pay you to solve." },
  { n: "02", title: "Think", body: "Shape the offer, the message and the hook that makes people stop scrolling." },
  { n: "03", title: "Create", body: "Build the product and the content around it — with AI for speed and craft for quality." },
  { n: "04", title: "Scale", body: "Sell, repurpose and systemise what works, so every launch is easier than the last." },
];

export const insideStats = [
  { value: "4", label: "step-by-step guides" },
  { value: "149", label: "pages in the bundle" },
  { value: "€60", label: "saved with the bundle" },
  { value: "0", label: "subscriptions — pay once" },
];

export const services = [
  {
    title: "1:1 Content Consultation",
    body: "A focused session on your content, offer and audience — you leave with a clear plan for what to post and how to sell.",
  },
  {
    title: "Digital Product Strategy",
    body: "From idea to launch plan for your own ebook, template pack or course — positioning, pricing and structure.",
  },
  {
    title: "Custom Design Projects",
    body: "Covers, templates, brand assets and landing pages designed to order, in a consistent, premium style.",
  },
  {
    title: "Brand & Product Photography",
    body: "Editorial photography for your brand, products and content — images made to be used, not just admired.",
  },
];

export const faq = [
  {
    q: "What format are the guides?",
    a: "Every guide is a PDF you can read on your phone, tablet or computer — and print if you prefer paper.",
  },
  {
    q: "When do I get access?",
    a: "Immediately. After payment Payhip shows your download link and emails it to you, so you can start the same minute.",
  },
  {
    q: "Is VAT included in the price?",
    a: "Yes. The price you see on this page is the final total at checkout — no extra tax added later.",
  },
  {
    q: "What's the difference between the bundle and single guides?",
    a: "The Build. Launch. Sell. bundle includes all four guides for €120 instead of €180 bought separately. If you only need one step — content, storefront, ebook or first sale — pick that guide on its own.",
  },
  {
    q: "Why does the bundle checkout ask me to create an account?",
    a: "Payhip, our checkout provider, requires a free customer account for bundles so all four files stay in one library you can come back to. Single guides don't need one.",
  },
  {
    q: "What language are the guides in?",
    a: "English — written in plain, practical language, with clear steps you can follow without prior experience.",
  },
  {
    q: "Who are these guides for?",
    a: "Creators, freelancers and small brands who want to turn what they know into a digital product and content that sells — especially if you're starting from zero.",
  },
  {
    q: "Can I work with iLens directly?",
    a: "Yes. A limited number of 1:1 consultations and custom projects are available each month — send a message through the form below.",
  },
];

export const marquee = ["Content that sells", "Built with AI", "Made by humans"];
