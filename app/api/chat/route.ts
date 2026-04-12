import { streamText, convertToCoreMessages } from "ai";
import { buildSystemPrompt } from "@/lib/system-prompt";

// Node.js runtime: Reads .env.local properly for local dev
// Authentication:
// - Production: Vercel automatically injects VERCEL_OIDC_TOKEN
// - Local with `vc dev`: Automatically injects VERCEL_OIDC_TOKEN
// - Local with `next dev`: Requires VERCEL_OIDC_TOKEN from `vc env pull` OR use `pnpm dev:vercel`
// Note: Using Anthropic models via AI Gateway requires OIDC auth, not ANTHROPIC_API_KEY
export const runtime = "nodejs";

// Limits to prevent abuse
const MAX_MESSAGES_PER_REQUEST = 10;
const CHAT_MODEL = "anthropic/claude-sonnet-4.5";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request: messages array required", {
        status: 400,
      });
    }

    // Limit payload size to prevent abuse
    if (messages.length > MAX_MESSAGES_PER_REQUEST) {
      return new Response("Too many messages in request", { status: 400 });
    }

    const systemPrompt = buildSystemPrompt();

    // Convert UIMessage format to CoreMessage format for streamText
    const coreMessages = convertToCoreMessages(messages);

    // Uses AI Gateway with VERCEL_OIDC_TOKEN (automatically available in production or with `vc dev`)
    // For local dev with `next dev`, run `vc env pull` first or use `pnpm dev:vercel`
    const result = streamText({
      model: CHAT_MODEL,
      system: systemPrompt,
      messages: coreMessages,
    });

    // Use toUIMessageStreamResponse for DefaultChatTransport compatibility
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";

    // Provide helpful error message for auth issues
    if (
      errorMessage.includes("401") ||
      errorMessage.includes("Unauthorized") ||
      errorMessage.includes("authentication") ||
      errorMessage.includes("API key")
    ) {
      return new Response(
        "Authentication error: AI Gateway requires VERCEL_OIDC_TOKEN. Options: 1) Use `pnpm dev:vercel` (recommended), 2) Run `vc env pull` before `pnpm dev`, or 3) Use `vc dev` directly.",
        {
          status: 401,
        },
      );
    }

    return new Response(errorMessage, {
      status: 500,
    });
  }
}
