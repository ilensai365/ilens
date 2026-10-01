import type { TipReelProps } from './TipReel';

// Copy comes from the iLens guides and the free prompt pack (same sources as the Instagram/TikTok carousels).
// *text* = gold italic. Keep hooks under ~8 words so they land in the first 2 seconds.
export const tipReels: { id: string; props: TipReelProps }[] = [
  {
    id: 'TipReel-Prompts',
    props: {
      tag: 'AI prompts', eyebrow: 'Stop doing this',
      hook: 'Your AI content sounds like AI *because of your prompt.*',
      tips: [
        { num: 'Fix 01 · Role', title: 'Give it a *job title.*', body: '“You are a market researcher.” One line changes the whole answer.' },
        { num: 'Fix 02 · Audience', title: 'Name one *real person.*', body: 'Not “entrepreneurs”. Who exactly, and what frustrates them?' },
        { num: 'Fix 03 · Limits', title: 'Add *hard rules.*', body: 'Under 12 words. No emojis. No questions. Limits make it sound human.' },
      ],
    },
  },
  {
    id: 'TipReel-Ebook',
    props: {
      tag: 'Ebook', eyebrow: 'Hour by hour',
      hook: 'Your first ebook *in 24 hours.*',
      tips: [
        { num: 'Hour 0–2', title: 'One problem. One promise. *One person.*', body: 'Most first ebooks die here, because the topic is too broad to finish.' },
        { num: 'Hour 6–16', title: 'Write in *90-minute sprints.*', body: 'Only write forward. Stuck? Leave [[fix this]] and keep going.' },
        { num: 'Hour 22–24', title: 'Launch to people who *already trust you.*', body: 'Not a big audience. The people who already know you.' },
      ],
    },
  },
  {
    id: 'TipReel-NoSales',
    props: {
      tag: 'Launch check', eyebrow: 'Before you launch',
      hook: 'Why your new site *makes no sales.*',
      tips: [
        { num: 'Reason 01', title: 'The button goes *nowhere.*', body: 'Tap it yourself, on a phone, right now. Don’t trust “probably fine”.' },
        { num: 'Reason 02', title: 'The checkout is *untested.*', body: 'Check the price, the product name and the delivery. Buy it yourself.' },
        { num: 'Reason 03', title: 'It breaks *on a phone.*', body: 'Most of your first visitors are on a phone. Check it there.' },
      ],
    },
  },
  {
    id: 'TipReel-Repurpose',
    props: {
      tag: 'Repurpose', eyebrow: 'Work smarter',
      hook: 'One idea. *Five posts.*',
      tips: [
        { num: 'Format 01', title: 'A *short video.*', body: '4–6 lines of text on screen. The hook lands in under 2 seconds.' },
        { num: 'Format 02', title: 'A *six-slide* carousel.', body: 'Slide 1 is a bold promise. Slide 6 asks for the save.' },
        { num: 'Format 03', title: 'An email *subject line.*', body: 'Specific, useful and clear without any context. Then let AI draft all five.' },
      ],
    },
  },
  {
    id: 'TipReel-FirstSale',
    props: {
      tag: 'First sale', eyebrow: 'Myth vs truth',
      hook: 'You don’t need followers *for your first sale.*',
      tips: [
        { num: 'Do 01', title: 'DM *your one person.*', body: 'A few people who match your reader exactly. Mention their situation.' },
        { num: 'Do 02', title: 'Post *the problem,* not the product.', body: 'Start with the frustration you solve. Then one clear link.' },
        { num: 'Then', title: 'Ask *one honest question.*', body: '“What almost stopped you from buying?” Fix that first.' },
      ],
    },
  },
  // Claude × Remotion series. Commands checked against remotion-dev/skills README (2026-09-28).
  {
    id: 'TipReel-ClaudeSetup',
    props: {
      tag: 'Claude × Remotion', eyebrow: 'Part 1 · Setup',
      hook: 'Make videos with Claude. *No editing app.*',
      tips: [
        { num: 'Step 01 · Project', title: 'Start a *Remotion* project.', body: 'Run `npx create-video@latest` and pick a blank template. It’s code that renders to MP4.' },
        { num: 'Step 02 · Skills', title: 'Teach Claude *how Remotion works.*', body: 'Run `npx skills add remotion-dev/skills` in the project folder. Official best practices.' },
        { num: 'Step 03 · Claude', title: 'Open it in *Claude Code.*', body: 'Type `claude` in the folder, then describe your video in plain words.' },
      ],
      ctaTitle: 'This reel was\n*made this way.*', cta: 'Follow @ilens.co', ctaSub: 'Part 2: the prompt that builds the video.',
    },
  },
  {
    id: 'TipReel-ClaudePrompt',
    props: {
      tag: 'Claude × Remotion', eyebrow: 'Part 2 · The prompt',
      hook: 'One prompt. *One finished reel.*',
      tips: [
        { num: 'Brief 01 · Format', title: 'Give it *the canvas.*', body: '1080×1920, 30 fps, 15 seconds. Vertical for Reels and TikTok.' },
        { num: 'Brief 02 · Brand', title: 'Give it *your brand.*', body: 'Your colours, fonts and logo file. “Black and gold, serif headlines.”' },
        { num: 'Brief 03 · Script', title: 'Give it *the script.*', body: 'Hook, three points, one call to action. Line by line, word for word.' },
      ],
      ctaTitle: 'Save this for\n*your first video.*', cta: 'Follow @ilens.co', ctaSub: 'Part 3: from preview to MP4.',
    },
  },
  {
    id: 'TipReel-ClaudeRender',
    props: {
      tag: 'Claude × Remotion', eyebrow: 'Part 3 · Export',
      hook: 'From prompt *to MP4.*',
      tips: [
        { num: 'Preview', title: 'Watch it in *the Studio.*', body: 'Run `npm run dev`. Scrub the timeline and spot what feels off.' },
        { num: 'Edit', title: 'Ask for changes *in plain words.*', body: '“Slower hook.” “Bigger text.” Claude edits the code, the video updates.' },
        { num: 'Export', title: 'Render *and post.*', body: 'Run `npx remotion render` and you get an MP4, ready for Reels and TikTok.' },
      ],
      ctaTitle: 'Your content,\n*on autopilot.*', cta: 'Follow @ilens.co', ctaSub: 'More AI video tips every week.',
    },
  },
  // Batch 2026-09-30: one reel per product (storefront, KDP, stack, templates, sales page, content plan).
  // KDP numbers checked 2026-09-30: 70% royalty band is $2.99–9.99, KDP Select = exclusive digital distribution.
  {
    id: 'TipReel-Storefront',
    props: {
      tag: 'Storefront', eyebrow: 'Launch tonight',
      hook: 'Your store *in 60 minutes.*',
      tips: [
        { num: 'Min 0–20', title: 'One product. *One price.*', body: 'Not a catalogue. The one thing you can sell this week.' },
        { num: 'Min 20–40', title: 'Write *one clear page.*', body: 'The problem, what they get, the price. Cut everything else.' },
        { num: 'Min 40–60', title: 'One button. *Test it.*', body: 'Buy it yourself on your phone. Payments go live once Stripe verifies you.' },
      ],
      ctaTitle: 'Open *tonight,*\nnot next month.', cta: 'Follow @ilens.co', ctaSub: 'The full checklist: link in bio.',
    },
  },
  {
    id: 'TipReel-Amazon',
    props: {
      tag: 'Amazon KDP', eyebrow: 'Read this first',
      hook: 'Selling your ebook *on Amazon?*',
      tips: [
        { num: 'Rule 01 · Price', title: 'Price it *$2.99–9.99.*', body: 'That’s where Amazon pays you 70%. Above it, you keep only 35%.' },
        { num: 'Rule 02 · Rights', title: 'Skip *KDP Select.*', body: 'It’s exclusive. You couldn’t sell the same ebook on your own store.' },
        { num: 'Rule 03 · Funnel', title: 'Sell *the short version.*', body: 'The text on Amazon. Templates and bonuses on your own site.' },
      ],
      ctaTitle: 'Amazon finds readers.\n*You keep them.*', cta: 'Follow @ilens.co', ctaSub: 'More ebook tips every week.',
    },
  },
  {
    id: 'TipReel-Stack',
    props: {
      tag: 'AI tools', eyebrow: 'Our stack',
      hook: 'The 3 AI tools *behind our content.*',
      tips: [
        { num: 'Tool 01 · Claude', title: 'The one that *writes.*', body: 'Scripts, captions, product pages, and the code behind our videos.' },
        { num: 'Tool 02 · Remotion', title: 'The one that *renders.*', body: 'Videos made from code. This reel was built with it.' },
        { num: 'Tool 03 · Higgsfield', title: 'The one that *films.*', body: 'AI clips for b-roll: rooms, products, scenes we can’t shoot. Labelled as AI.' },
      ],
      ctaTitle: 'Three tools.\n*One brand.*', cta: 'Follow @ilens.co', ctaSub: 'How we use each one, every week.',
    },
  },
  {
    id: 'TipReel-Templates',
    props: {
      tag: 'Claude × Remotion', eyebrow: 'Part 4 · Templates',
      hook: 'Stop editing reels *one by one.*',
      tips: [
        { num: 'Step 01', title: 'Build *one reel.*', body: 'Hook, three points, call to action. Get it right once.' },
        { num: 'Step 02', title: 'Turn the text *into a list.*', body: 'Ask Claude: “make the title and tips editable.” Now it’s a template.' },
        { num: 'Step 03', title: 'Ten titles. *Ten videos.*', body: 'Add a new entry, render, post. Same brand, every time.' },
      ],
      ctaTitle: 'This reel is\n*entry number 12.*', cta: 'Follow @ilens.co', ctaSub: 'The full guide: Claude × Remotion, link in bio.',
    },
  },
  {
    id: 'TipReel-SalesPage',
    props: {
      tag: 'Sales page', eyebrow: 'Before you post',
      hook: 'The one page every *digital product* needs.',
      tips: [
        { num: 'Part 01 · Problem', title: 'Start with *their problem.*', body: 'In their words. If they nod at the first line, they keep reading.' },
        { num: 'Part 02 · Proof', title: 'Show *what’s inside.*', body: 'Real pages, a real result, a real person. Not adjectives.' },
        { num: 'Part 03 · Action', title: 'One *clear button.*', body: 'One price, one next step. Every extra choice makes buying harder.' },
      ],
      ctaTitle: 'Fix the page\n*before the posts.*', cta: 'Follow @ilens.co', ctaSub: 'More launch tips every week.',
    },
  },
  {
    id: 'TipReel-ContentMonth',
    props: {
      tag: 'Content', eyebrow: 'Plan once',
      hook: '30 days of content *from one idea.*',
      tips: [
        { num: 'Step 01 · Angles', title: 'Find *six angles.*', body: 'Mistake, myth, how-to, story, list, before and after.' },
        { num: 'Step 02 · Formats', title: 'Give each *five formats.*', body: 'Reel, carousel, post, story, email. That’s 30 pieces.' },
        { num: 'Step 03 · Batch', title: 'Make them *in one sitting.*', body: 'AI drafts, you edit. One afternoon, a month of posts.' },
      ],
    },
  },
  // Promo for the "Get found in ChatGPT" ebook. Facts from OpenAI's Help Center (read 2026-10-01).
  {
    id: 'TipReel-ChatGPTAds',
    props: {
      tag: 'ChatGPT ads', eyebrow: 'New in 2026',
      hook: 'ChatGPT now has ads. *Here’s what it means for you.*',
      tips: [
        { num: 'Fact 01 · Placement', title: 'Ads sit *below* the answer.', body: 'Labelled as sponsored. OpenAI says ads don’t change what ChatGPT answers.' },
        { num: 'Fact 02 · Access', title: 'Any business *can buy them.*', body: 'Self-serve Ads Manager since May 2026. Pay per click or per view.' },
        { num: 'Your move', title: 'Earn the answer *first.*', body: 'A clear product page, real reviews and a site ChatGPT can read. Free, and it lasts.' },
      ],
      ctaTitle: 'Make ChatGPT\n*recommend you.*', cta: 'New guide · ilens.co', ctaSub: 'How AI picks products, step by step.',
    },
  },
];
