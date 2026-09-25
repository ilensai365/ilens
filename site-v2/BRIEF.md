# iLens v2 — build brief

Build a single-page dark landing page for **iLens** (ilens.co) using
React 18 + Vite + TypeScript + Tailwind CSS + GSAP (ScrollTrigger) + Framer Motion.
hls.js only if a real `.m3u8` stream exists; otherwise a plain `<video>` (MP4/WebM) or no video.

## 01. Goal
A premium, cinematic, dark version of ilens.co that sells iLens digital products
(ebooks, templates, AI prompts, presets) and teaches people to create content that sells.
Original design — do not copy any other brand's layout or copy.
Voice: studio ("iLens", "we"). No personal names, photos or career references.

## 02. Content lives in data, not markup
All products, prices, Payhip links, FAQ and method steps live in `src/data/*.ts`.
Adding a product = adding one object; the card renders itself.

## 03. Design system (iLens, dark)
- Background: #0E0D0B (warm ink, not pure black)
- Surface: rgba(245,241,232,0.03) · Border: rgba(245,241,232,0.08)
- Text primary: #F5F1E8 (iLens ivory) · Text secondary: rgba(245,241,232,0.64)
- Accent: champagne #D9C3A0 (default) or acid lime #D4FF4F — temporary live toggle (AccentToggle.tsx) until the owner picks one
- Fonts: Fraunces italic (display, iLens brand serif) · Inter (sans) · JetBrains Mono (eyebrows, numbers)
- Radius 16px · Glass: backdrop-blur-xl on rgba(245,241,232,0.04)
- Type: Display clamp(48px,7vw,88px) · H1 clamp(36px,5vw,64px) · H2 clamp(24px,3vw,32px) · Body 16/1.6 · Mono 13/1.7, eyebrow tracking 0.4em
- Layout: max width 1280px, section padding clamp(80px,10vw,160px), 24px gutter, 12-col grid gap 24px

## 04. Page structure
1. Loader — short "iL" monogram shimmer, max ~0.8s, skipped on repeat visits and with reduced motion
2. Hero
3. Shop — 8-tile bento
4. The iLens Method — 4 steps
5. What's inside (proof without fake reviews)
6. Work with iLens — 1:1 & projects
7. FAQ — 8 items
8. Final CTA + marquee + contact form
9. Footer

## 05. Hero (100svh, centered)
- Eyebrow: "DIGITAL PRODUCTS · 2026"
- Headline (sans + italic serif): "Create content / *that actually sells.*"
- Sub: "Ebooks, templates and AI prompts that show you, step by step, how to build your site, launch your first digital product and turn content into income."
- Primary CTA: "Get the bundle — €120 →" (accent fill) → https://payhip.com/buy?link=j4i6s
- Secondary: "Browse the shop" (ghost) → #shop
- Proof line (mono): 4 guides · 149 pages · Instant download · VAT included
- Background: video (iLens footage, TBD) with 50–60% dark overlay; until then an animated warm gradient + floating product covers. Subtle dust particles on top.

## 06. Shop bento (12-col, 8 tiles)
Row 1: Bundle "Build. Launch. Sell." (8 cols, featured, accent border) — €120, ~~€180~~, "Save €60" — j4i6s · AI Content System (4) — €37.50 — RX0Q7
Row 2: The 60-Minute Storefront (4) — €47.50 — Wgjuq · The 24-Hour Ebook (4) — €47.50 — ujzSi · Zero to First Sale (4) — €47.50 — 0qJPn
Row 3: Content Template Kit (4) · Prompt Vault (4) · Editorial Presets (4) — "Coming soon", button "Get notified →" (#contact)
Each card: cover image (existing `images/product-*.svg`), title, 1-line description, price, CTA. Hover lift 6px.
Note under grid: "One-time payment · VAT included · Instant PDF download."

## 07. The iLens Method (sticky-pinned on desktop)
01 See — Find the problem your audience will gladly pay you to solve.
02 Think — Shape the offer, the message and the hook that makes people stop scrolling.
03 Create — Build the product and the content around it, with AI for speed and craft for quality.
04 Scale — Sell, repurpose and systemise what works, so every launch is easier than the last.
Numbers in mono accent; alternate text/visual alignment; no pinning on mobile.

## 08. What's inside (replaces testimonial wall)
No invented reviews. Stats + what you get: 4 guides, 149 pages, instant download, VAT included,
plus one line per guide on what it covers (only claims that match the actual PDFs). Add real testimonials later via `src/data/testimonials.ts` (empty = section hidden).

## 09. Work with iLens
4 rows: 1:1 Content Consultation · Digital Product Strategy · Custom Design Projects · Brand & Product Photography
(copy from current site). CTA "Book a session or enquire →" → #contact.

## 10. FAQ (8 items, accordion, 300ms height+opacity, open = 2px accent border-left)
Only facts that are true: format (PDF), instant download, VAT included in price,
bundle checkout requires a free Payhip account, language (English), who it's for,
difference between bundle and single guides, how to contact. Refund policy: ASK OWNER before writing.

## 11. Final CTA
- Display: "Ready to launch? / *Or still scrolling for ideas?*"
- Accent button: "Get the bundle — €120 →"
- Marquee: "CONTENT THAT SELLS · BUILT WITH AI · MADE BY HUMANS · " (infinite, pauses on hover)
- Soft radial accent glow bottom-center
- Contact form (Formspree https://formspree.io/f/myeyrnjy, honeypot `_gotcha`) + hello@ilens.co

## 12. Footer
iLens wordmark + "Digital products / Content that sells"; columns Studio (Shop, Method, About, 1:1) and Connect (Contact, LinkedIn, Instagram); © year iLens Studio.
Floating "All 4 guides · €120 — Get the Bundle →" pill after the hero.

## 13. Interactions & accessibility
GSAP ScrollTrigger reveals; Framer Motion hover (lift, button scale 1.02); no parallax on mobile.
Keyboard-reachable everything, 2px accent focus ring with offset, AA contrast,
prefers-reduced-motion disables loader and scroll animations, aria-labels on icon buttons, skip link.

## 14. Performance & deploy
Lazy-load below-fold images, WebP/AVIF for any photos, video `preload="metadata"` + poster.
Budget: LCP < 2.5s, CLS < 0.05. Meta/OG tags as on current site.
Deploy: Vite build → `dist/`; Cloudflare `wrangler.jsonc` assets directory switches to the build output only when v2 goes live.
