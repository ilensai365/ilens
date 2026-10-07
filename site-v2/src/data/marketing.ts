// Content for ilens.co/marketing — Google Ads, GA4, conversion tracking, GDPR cookies and Search Console.
// Built 2026-10-07 from the setup we ran on ilens.co itself (Google Ads PMax, GA4, Consent Mode v2,
// Payhip → /thanks/ conversions, Search Console). Prices are proposed "from" prices: owner to confirm.

export const marketingServices = [
  {
    id: "google-ads",
    tag: "01",
    title: "Google Ads",
    lead: "Campaigns that start small and learn fast.",
    points: [
      "Search or Performance Max, chosen for your goal",
      "Keywords, locations and languages for Malta and Europe",
      "Ad copy, headlines and visuals in your brand style",
      "A daily budget and end date you set, never a surprise bill",
    ],
  },
  {
    id: "ga4",
    tag: "02",
    title: "Google Analytics 4",
    lead: "See where every visitor comes from.",
    points: [
      "GA4 property and data stream set up correctly",
      "Traffic split by Instagram, TikTok, Google and ads",
      "Linked to Google Ads for audiences and remarketing",
      "A simple dashboard you can actually read",
    ],
  },
  {
    id: "conversions",
    tag: "03",
    title: "Conversion tracking",
    lead: "Know which ad brought the sale.",
    points: [
      "Purchases, leads and sign-ups measured as conversions",
      "Thank-you page or event tracking, with real order values",
      "Works with Payhip, Shopify, WordPress and custom sites",
      "Tested end to end before your ads go live",
    ],
  },
  {
    id: "consent",
    tag: "04",
    title: "GDPR cookie consent",
    lead: "EU-compliant, without an ugly banner.",
    points: [
      "Google Consent Mode v2, required for ads in the EU",
      "Nothing stored for ads until the visitor accepts",
      "A banner designed to match your brand",
      "Accept and reject with equal weight, as the rules expect",
    ],
  },
  {
    id: "search-console",
    tag: "05",
    title: "Search Console & SEO basics",
    lead: "Get found on Google, including in Malta.",
    points: [
      "Domain verified and sitemap submitted",
      "Page titles and descriptions written for search",
      "Structured data so Google understands your business",
      "Google Business Profile checklist for Google Maps",
    ],
  },
];

export const marketingPackages = [
  {
    name: "Tracking Setup",
    tagline: "Measure before you spend",
    price: "from €149",
    unit: "one-off",
    features: ["GA4 + Search Console", "Conversion tracking for sales or leads", "GDPR cookie banner with Consent Mode v2", "Short video walkthrough of your data"],
  },
  {
    name: "Ads Launch",
    tagline: "Tracking + your first campaign",
    price: "from €349",
    unit: "one-off",
    premium: true,
    features: ["Everything in Tracking Setup", "Google Ads campaign built and launched", "Ad copy and visuals in your brand style", "Review call after the first two weeks"],
  },
  {
    name: "Ads Care",
    tagline: "We run it, you grow",
    price: "from €249",
    unit: "/ month",
    features: ["Weekly checks and optimisation", "New ad visuals each month", "Monthly report in plain English", "Ad budget paid directly to Google"],
  },
];

export const marketingSteps = [
  { title: "Audit", body: "We look at your site, store and any ads you already run." },
  { title: "Set up", body: "Tracking, consent and analytics, tested on a real visit." },
  { title: "Launch", body: "Your campaign goes live with a budget and end date you choose." },
  { title: "Report", body: "What worked, what didn't, and the next step, in plain English." },
];

export const marketingFaq = [
  { q: "Do I pay Google separately?", a: "Yes. Your ad budget goes straight to Google on your own card, so you always see exactly what you spend. Our fee covers the setup and management." },
  { q: "How much should I spend on ads?", a: "You can test with a few euros a day. We set a daily budget and an end date with you, so the campaign can't overspend." },
  { q: "Is this GDPR compliant?", a: "We set up Google Consent Mode v2 with a cookie banner: ad and analytics cookies stay off until the visitor accepts." },
  { q: "Who owns the accounts?", a: "You do. Google Ads, Analytics and Search Console are created in your name; we only work with the access you give us." },
  { q: "Which websites do you work with?", a: "Any site where we can add a script: Payhip, Shopify, WordPress, Wix, Squarespace and custom builds." },
];

