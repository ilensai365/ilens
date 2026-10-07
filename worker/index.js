// ilens.co Worker: serves the built site (site-v2/dist) and the AI chat endpoint at /api/chat.
// The Anthropic API key lives only in the Worker secret ANTHROPIC_API_KEY (never in this public repo).
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "./knowledge.js";

const MAX_TURNS = 12; // visitor messages per conversation
const MAX_CHARS = 1000; // per visitor message

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

/** Keep only well-formed user/assistant text turns, ending with a user turn. */
function cleanHistory(messages) {
  if (!Array.isArray(messages)) return null;
  const out = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (!out.length || out[out.length - 1].role !== "user") return null;
  if (out.filter((m) => m.role === "user").length > MAX_TURNS) return "limit";
  return out.slice(-2 * MAX_TURNS);
}

async function chat(request, env) {
  if (!env.ANTHROPIC_API_KEY) return json({ error: "Chat is not configured yet." }, 503);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Bad request." }, 400);
  }
  const messages = cleanHistory(body.messages);
  if (messages === "limit") return json({ reply: "We've covered a lot! For anything more, please use the quote form or write to hello@ilens.co and we'll reply personally." });
  if (!messages) return json({ error: "Bad request." }, 400);

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  try {
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 2000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
      messages,
    });
    if (response.stop_reason === "refusal") {
      return json({ reply: "Sorry, I can't help with that here. For anything about our guides or services, write to hello@ilens.co." });
    }
    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return json({ reply: reply || "Sorry, something went wrong. Please write to hello@ilens.co." });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) return json({ error: "Busy right now, please try again in a minute." }, 429);
    console.error("chat error", err?.status, err?.message);
    return json({ error: "Chat is unavailable right now. Please write to hello@ilens.co." }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/chat") {
      // Same-origin only: the widget on ilens.co is the only caller.
      const origin = request.headers.get("origin");
      if (origin && origin !== url.origin) return json({ error: "Forbidden." }, 403);
      if (request.method === "GET") return json({ ready: Boolean(env.ANTHROPIC_API_KEY) });
      if (request.method === "POST") return chat(request, env);
      return json({ error: "Method not allowed." }, 405);
    }
    return env.ASSETS.fetch(request);
  },
};
