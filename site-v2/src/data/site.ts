// All editable copy and links live in src/data — change text here, not in components.
// Polish copy sits next to the English as t(en, pl); pages under /pl/ pick it automatically.
import { t } from "../lib/i18n";

/** Payhip product page (description, mockups, then Buy) — not the bare checkout. */
export const PAYHIP = (code: string) => `https://payhip.com/b/${code}`;

/** Where the main "Get the bundle" buttons lead: the shop section on this page, not straight to checkout. */
export const SHOP_URL = "#shop";

/** Bundle pricing (VAT incl.) — keep in sync with Payhip. Single-guide prices live in products.ts. */
export const BUNDLE = { price: "€99", compareAt: "€136", save: "€37" };
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

// Top menu: the guides first, then the done-for-you offers (2026-10-07). Offer/Method stay on the page and in the footer.
export const nav = [
  { label: t("Ebooks", "Ebooki"), href: "#shop" },
  // { label: "Stores", href: "/shops/" }, // hidden until /shops is finished (owner, 2026-10-07)
  { label: "Google Ads", href: "/marketing/" },
  { label: "Studio", href: "/studio/" },
  { label: t("Free prompts", "Darmowe prompty"), href: "/free/" },
  { label: t("About", "O nas"), href: "#about" },
];

const offerEn = [
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

const offerPl: typeof offerEn = [
  {
    title: "Ebooki i poradniki",
    body: "Instrukcje krok po kroku do przerobienia w jeden wieczór — od zbudowania sklepu po start pierwszego produktu.",
  },
  {
    title: "Paczki promptów AI",
    body: "Sprawdzone prompty do pomysłów, hooków, opisów i tekstów sprzedażowych, które brzmią jak Ty, a nie jak szablon.",
  },
  {
    title: "Treści, które sprzedają",
    body: "Hooki, struktury i oferty stojące za treściami, które zamieniają obserwujących w klientów.",
  },
  {
    title: "Szablony",
    body: "Gotowe układy postów, karuzel, stron produktowych i materiałów marki — edytujesz, publikujesz, gotowe.",
    soon: true,
  },
  { title: "Presety", body: "Presety do zdjęć dla spójnego feedu premium jednym kliknięciem.", soon: true },
  {
    title: "Kursy",
    body: "Programy z prowadzeniem, które przeprowadzą Cię od pierwszego pomysłu do pierwszej sprzedaży, lekcja po lekcji.",
    soon: true,
  },
];

export const offer = t(offerEn, offerPl);

const aboutEn = {
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

const aboutPl: typeof aboutEn = {
  lead: "iLens to studio kreatywno-strategiczne działające na styku designu, marketingu i sztucznej inteligencji.",
  body: [
    "Pomagamy markom, founderom i twórcom zamieniać pomysły w jasne pozycjonowanie, wyrazistą identyfikację wizualną i systemy treści, które rosną razem z biznesem. Każdy projekt łączy design na poziomie edytorskim z przemyślaną strategią — tak, żeby to, co dobrze wygląda, także działało.",
    "AI to część naszej pracy, a nie gadżet. Dzięki niej szybciej robimy research, testujemy więcej pomysłów i budujemy powtarzalne procesy, a każda decyzja kreatywna zostaje ludzka, przemyślana i zgodna z marką. Na tym samym myśleniu opierają się nasze produkty cyfrowe: praktyczne poradniki i systemy, które wdrożysz tego samego dnia.",
  ],
  principles: [
    { title: "Najpierw jasność", body: "Strategia przed estetyką — każdy projekt zaczynamy od tego, co ma osiągnąć." },
    { title: "Jakość, która zostaje", body: "Design na poziomie edytorskim, zbudowany jako system działający w każdym kanale." },
    { title: "AI z intencją", body: "Szybszy research, więcej pomysłów, powtarzalne procesy — z ludzkim osądem przy każdej decyzji." },
    { title: "Systemy, nie jednorazówki", body: "Frameworki, szablony i procesy, z których korzystasz długo po starcie." },
  ],
  tags: ["Strategia marki", "Kierunek kreatywny", "Identyfikacja wizualna", "Systemy treści", "Procesy AI", "Produkty cyfrowe"],
};

export const about = t(aboutEn, aboutPl);

export const heroProof = ["49 pages", "9 chapters", "Instant download", "VAT included"];

export const method = t(
  [
    { n: "01", title: "See", body: "Find the problem your audience will gladly pay you to solve." },
    { n: "02", title: "Think", body: "Shape the offer, the message and the hook that makes people stop scrolling." },
    { n: "03", title: "Create", body: "Build the product and the content around it — with AI for speed and craft for quality." },
    { n: "04", title: "Scale", body: "Sell, repurpose and systemise what works, so every launch is easier than the last." },
  ],
  [
    { n: "01", title: "Zobacz", body: "Znajdź problem, za którego rozwiązanie Twoi odbiorcy chętnie zapłacą." },
    { n: "02", title: "Przemyśl", body: "Ułóż ofertę, przekaz i hook, który zatrzymuje scrollowanie." },
    { n: "03", title: "Stwórz", body: "Zbuduj produkt i treści wokół niego — z AI dla tempa i warsztatem dla jakości." },
    { n: "04", title: "Skaluj", body: "Sprzedawaj, przetwarzaj i systematyzuj to, co działa, żeby każdy kolejny start był łatwiejszy." },
  ],
);

/**
 * "By the numbers" cards: what each guide promises. `count` animates up to that number.
 * Only real, verifiable numbers here — no invented customer counts.
 */
export const insideStats = [
  { count: 60, unit: "min", title: t("to a live website & shop", "do działającej strony i sklepu"), source: "The 60-Minute Storefront", progress: 0.25 },
  { count: 24, unit: "h", title: t("from blank page to published ebook", "od pustej strony do wydanego ebooka"), source: "The 24-Hour Ebook", progress: 0.5 },
  { count: 1, unit: t("evening", "wieczór"), title: t("to set up the system behind your first sale", "na system, który da Ci pierwszą sprzedaż"), source: "Zero to First Sale", progress: 0.75 },
  { count: 99, prefix: "€", title: t(`for all four guides — ${BUNDLE.compareAt} separately`, `za wszystkie cztery poradniki — osobno ${BUNDLE.compareAt}`), source: "Build. Launch. Sell.", progress: 1 },
];

export const insideFacts = t(
  ["149 pages", "Instant PDF download", "VAT included", "Pay once — no subscription"],
  ["149 stron", "PDF od razu po zakupie", "VAT w cenie", "Płacisz raz — bez subskrypcji"],
);

/**
 * Social proof. Leave `customers` at null until there is a real number (Payhip → Customers);
 * the counter card appears automatically once it is set, e.g. { customers: 120 }.
 */
export const proof: { customers: number | null } = { customers: null };

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

const faqEn = [
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
    a: `The Build. Launch. Sell. bundle includes all four guides for ${BUNDLE.price} instead of ${BUNDLE.compareAt} bought separately. If you only need one step — content, storefront, ebook or first sale — pick that guide on its own.`,
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
    a: "Yes. iLens Studio designs brands, websites, campaigns and social media, and our top tier is a 1:1 creative partnership. See ilens.co/studio or send a message below.",
  },
];

const faqPl: typeof faqEn = [
  {
    q: "W jakim formacie są poradniki?",
    a: "Każdy poradnik to PDF, który przeczytasz na telefonie, tablecie albo komputerze — i wydrukujesz, jeśli wolisz papier.",
  },
  {
    q: "Kiedy dostanę dostęp?",
    a: "Od razu. Po płatności Payhip pokazuje link do pobrania i wysyła go mailem, więc możesz zacząć w tej samej minucie.",
  },
  {
    q: "Czy VAT jest wliczony w cenę?",
    a: "Tak. Cena na tej stronie to kwota końcowa przy płatności — żaden podatek nie zostanie doliczony później.",
  },
  {
    q: "Czym różni się pakiet od pojedynczych poradników?",
    a: `Pakiet Build. Launch. Sell. zawiera wszystkie cztery poradniki za ${BUNDLE.price} zamiast ${BUNDLE.compareAt} przy zakupie osobno. Jeśli potrzebujesz tylko jednego kroku — treści, sklepu, ebooka albo pierwszej sprzedaży — wybierz ten jeden poradnik.`,
  },
  {
    q: "Dlaczego przy zakupie pakietu muszę założyć konto?",
    a: "Payhip, nasz operator płatności, wymaga darmowego konta klienta przy pakietach, żeby wszystkie cztery pliki były w jednej bibliotece, do której zawsze wrócisz. Pojedyncze poradniki nie wymagają konta.",
  },
  {
    q: "W jakim języku są poradniki?",
    a: "Po angielsku — prostym, praktycznym językiem, z jasnymi krokami, które przejdziesz bez wcześniejszego doświadczenia.",
  },
  {
    q: "Dla kogo są te poradniki?",
    a: "Dla twórców, freelancerów i małych marek, które chcą zamienić swoją wiedzę w produkt cyfrowy i treści, które sprzedają — szczególnie jeśli zaczynasz od zera.",
  },
  {
    q: "Czy mogę współpracować z iLens bezpośrednio?",
    a: "Tak. iLens Studio projektuje marki, strony internetowe, kampanie i social media, a najwyższy pakiet to współpraca kreatywna 1:1. Zajrzyj na ilens.co/studio albo napisz do nas poniżej.",
  },
];

export const faq = t(faqEn, faqPl);

export const marquee = t(
  ["Content that sells", "Built with AI", "Made by humans"],
  ["Treści, które sprzedają", "Zbudowane z AI", "Tworzone przez ludzi"],
);
