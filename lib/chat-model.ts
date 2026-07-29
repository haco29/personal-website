// The model the chat API talks to, as a Vercel AI Gateway slug.
//
// Gateway slugs get retired over time (google/gemini-2.0-flash was, which broke
// the chat in production). Two safeguards:
//   1. CHAT_MODEL env var - swap the model in Vercel without a code deploy.
//   2. tests/integration/chat-model.test.ts - fails CI once the slug stops
//      being served, so we find out before a visitor does.
// Haiku is half the price of Sonnet ($1/$5 vs $2/$10 per Mtok) and plenty for
// answering from a system prompt. Bump to anthropic/claude-sonnet-5 if answer
// quality ever justifies the cost.
export const DEFAULT_CHAT_MODEL = "anthropic/claude-haiku-4.5";

export const CHAT_MODEL = process.env.CHAT_MODEL || DEFAULT_CHAT_MODEL;
