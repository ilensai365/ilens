import { PAYHIP } from "./site";

// Content of the free lead magnet (ilens-marketing/lead-magnet/10-ai-prompts.html) — keep in sync with the PDF.

/** Payhip €0 product; checkout collects the email and adds it to MailerLite "Free Prompts". */
export const FREE_PACK_URL = PAYHIP("BRv9T");

/** Word people comment on Instagram to get the link by DM (ManyChat). */
export const FREE_KEYWORD = "PROMPTS";

export const freePrompts = [
  { stage: "Idea", title: "Find the real problem", why: "Content that sells starts with a frustration your reader already feels." },
  { stage: "Idea", title: "Turn questions into a product", why: "Your audience has already told you what to sell." },
  { stage: "Attention", title: "Hooks that stop the scroll", why: "The first line decides whether anyone reads the rest." },
  { stage: "Attention", title: "A carousel in six slides", why: "Carousels get saved, and saves get your post shown." },
  { stage: "Short video", title: "A 30-second video script", why: "Faceless, text-on-screen videos reach new people fastest." },
  { stage: "Short video", title: "A caption that sells without being salesy", why: "Hook, story, shift, invite." },
  { stage: "Leverage", title: "One idea, five formats", why: "Repetition isn't lazy, it's strategy." },
  { stage: "Leverage", title: "A product description that converts", why: "Sound like you understand them better than they do." },
  { stage: "Trust & rhythm", title: "Answer the doubt before they ask", why: "People don't buy while a doubt stays unanswered." },
  { stage: "Trust & rhythm", title: "A week of content in one go", why: "Plan once, post all week." },
];

/** Prompt 03 from the pack, shown in full as a sample. Brackets are the parts you fill in. */
export const samplePrompt = {
  number: "03",
  title: "Hooks that stop the scroll",
  text: "Write 5 hooks for a post about [topic] for [audience].\nEach hook must name a specific frustration they feel.\nUnder 12 words. No emojis. No questions.",
};

export const howToUse = [
  { title: "Copy a prompt", body: "Pick the step you're stuck on — idea, hook, caption, script or sales page." },
  { title: "Fill in the brackets", body: "Replace [audience] and [topic] with real words. Be specific: not “women”, but “mums returning to work who want a side income”." },
  { title: "Paste into ChatGPT or Claude", body: "Ask for options, pick the best one, then edit it so it sounds like you." },
];
