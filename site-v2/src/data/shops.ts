// Content for ilens.co/shops — websites and online stores by industry (Malta & EU), 2026 price list.
// Based on the owner's 2021 PL store price list (5 990 / 6 990 / 8 990 zł), rebuilt for 2026:
// EU payments, Malta shipping, AI product content, GA4 + Consent Mode, SEO, accessibility.
const SHOT = import.meta.env.BASE_URL + "images/shops/";
// All prices are net (excl. VAT) "from" prices proposed 2026-10-07 and raised at the owner's request: owner to confirm.

export const industries = [
  {
    id: "ecommerce",
    image: SHOT + "ecommerce.webp",
    tag: "E-commerce",
    title: "Online store",
    lead: "A complete shop that sells while you sleep.",
    price: "from €1,990",
    points: [
      "Shopify or WooCommerce, set up and designed for your brand",
      "Card, Apple Pay, Google Pay and PayPal checkout",
      "Shipping in Malta and across the EU, with clear delivery rules",
      "Discount codes, abandoned-cart emails and order tracking",
    ],
  },
  {
    id: "beauty-salon",
    image: SHOT + "beauty-salon.webp",
    tag: "Beauty salon",
    title: "Salon website with online booking",
    lead: "Fewer DMs, more booked chairs.",
    price: "from €1,490",
    points: [
      "Online booking linked to your system, e.g. Fresha, or a new one",
      "Treatment menu with prices, durations and before-and-after gallery",
      "Gift vouchers sold online",
      "Google Maps profile and reviews set up, so locals find you first",
    ],
  },
  {
    id: "cosmetics",
    image: SHOT + "cosmetics.webp",
    tag: "Cosmetics",
    title: "Cosmetics & skincare store",
    lead: "Product pages that answer every question before it's asked.",
    price: "from €3,490",
    points: [
      "Shade and size variants, bundles and gift sets",
      "Ingredients (INCI), how-to-use and skin-type filters",
      "Subscriptions and refill reminders",
      "AI product photos and lifestyle images in one brand look",
    ],
  },
  {
    id: "electronics",
    image: SHOT + "electronics.webp",
    tag: "Electronics",
    title: "Electronics & tech store",
    lead: "Hundreds of products, still easy to find.",
    price: "from €5,490",
    points: [
      "Spec filters, product comparison and fast search",
      "Bulk import of products and stock from a spreadsheet",
      "Warranty, returns and delivery info on every product",
      "Google Shopping product feed, ready for ads",
    ],
  },
  {
    id: "fashion",
    image: SHOT + "fashion.webp",
    tag: "Fashion",
    title: "Fashion boutique",
    lead: "Lookbook style, store-level checkout.",
    price: "from €2,990",
    points: [
      "Size guides, colour variants and low-stock badges",
      "Lookbook and “shop the look” pages",
      "Instagram shopping and new-drop email sign-ups",
      "Easy returns flow your customers trust",
    ],
  },
  {
    id: "restaurant",
    image: SHOT + "restaurant.webp",
    tag: "Restaurant & café",
    title: "Restaurant & café website",
    lead: "Menu, table booking and directions in two taps.",
    price: "from €990",
    points: [
      "Mobile menu you can update yourself",
      "Table booking and links to Wolt and Bolt Food",
      "Opening hours, map and reviews on Google",
      "Events and offers page for tourists and locals",
    ],
  },
  {
    id: "digital",
    image: SHOT + "digital.webp",
    tag: "Digital products",
    title: "Store for ebooks, courses & coaching",
    lead: "Sell knowledge, delivered automatically.",
    price: "from €1,490",
    points: [
      "Payhip or Shopify with instant digital delivery",
      "Free lead magnet and welcome email series",
      "Sales pages for ebooks, courses or 1:1 sessions",
      "The same system behind our own guides",
    ],
  },
];

export const storePackages = [
  {
    name: "Start",
    tagline: "A clean store, ready to sell",
    price: "from €1,990",
    features: ["Up to 5 pages and 10 products added", "Card, Apple Pay and Google Pay", "Pickup and courier delivery", "AI-written page and product texts, edited by us", "Tracking Setup included (GA4, conversions, GDPR cookies, Search Console)", "SEO basics + Google Maps", "1 h training, 1 month support"],
  },
  {
    name: "Business",
    tagline: "For brands ready to grow",
    price: "from €3,490",
    premium: true,
    features: ["Up to 10 pages and 30 products added", "+ PayPal and Revolut Pay", "+ MaltaPost / DHL and EU shipping zones", "+ AI product photos in your brand look", "Welcome and abandoned-cart emails", "Full SEO + Google Maps", "2 h training, 3 months support"],
  },
  {
    name: "Premium",
    tagline: "Everything, plus your first campaign",
    price: "from €5,490",
    features: ["Up to 20 pages and 100 products added", "+ instalments or subscriptions", "+ automatic shipping labels", "+ product photo session", "AI shop assistant, trained on your products", "Full email sequences", "Product structured data + Google Shopping feed", "Google Ads campaign launched", "3 h training, 6 months support"],
  },
];

export const storeAddOns = [
  { name: "AI shop assistant (setup + training on your products)", price: "from €490" },
  { name: "Tracking Setup (GA4, conversions, GDPR cookies, Search Console)", price: "from €290" },
  { name: "SEO & Google Maps", price: "from €390" },
  { name: "Google Ads campaign launch", price: "from €590" },
  { name: "AI product photos", price: "from €25 / photo" },
  { name: "Extra website language", price: "from €490" },
  { name: "Technical support", price: "€65 / hour" },
];

/** AI assistant on the store or salon site: answers customers 24/7 from the client's own content. */
export const aiAssistant = {
  title: "AI shop assistant",
  lead: "Answers your customers at 2 a.m., in their language, from your own information.",
  points: [
    "Trained on your products, prices, delivery and returns rules",
    "Recommends products and links straight to them",
    "Books treatments or tables for salons and restaurants",
    "Replies in English, Maltese, Italian, Polish and more",
    "Hands the chat to you when a human is needed",
    "Questions it can't answer show you what to add to the site",
  ],
  sample: [
    { from: "customer", text: "Which serum is best for dry skin, and can I get it by Friday in Sliema?" },
    { from: "ai", text: "For dry skin our customers choose the Hydra Serum 30 ml (€34). Order before 2 p.m. Thursday for Friday delivery in Sliema. Shall I add it to your basket?" },
  ],
  note: "Runs on the AI platform that suits your store and budget; usage costs are billed by that provider.",
  price: "from €490",
};

export const storeExternal = [
  { name: "AI assistant usage (only if you add it)", price: "about €20–60 / month" },
  { name: "Domain", price: "about €10–40 / year" },
  { name: "Hosting or Shopify plan", price: "about €30–100 / month" },
  { name: "Terms, privacy and returns policies", price: "about €150–500 one-off" },
];

export const storeFaq = [
  { q: "How long does it take?", a: "Most stores take 2–6 weeks, depending on the number of products and how fast we get your content." },
  { q: "How do payments work?", a: "We ask for 30% to start and the rest when your store is live. All prices exclude VAT." },
  { q: "Shopify or WooCommerce?", a: "Shopify if you want it simple and hosted; WooCommerce if you want full control and lower monthly fees. We'll recommend one after a short call." },
  { q: "Is my store accessible and GDPR-ready?", a: "Yes. We set up a cookie banner with Consent Mode v2 and follow accessibility basics from the European Accessibility Act: readable contrast, keyboard navigation and image descriptions." },
  { q: "What does the AI assistant cost to run?", a: "Setup is a one-off fee. The AI provider bills usage monthly, usually a few tens of euros for a small store. We help you set a spending limit." },
  { q: "Can I update the store myself?", a: "Yes. Training is included in every package, and you get a short video guide for the everyday tasks." },
];

export const businessTypes = ["Online store", "Beauty salon", "Cosmetics", "Electronics", "Fashion", "Restaurant / café", "Digital products", "Something else"];
