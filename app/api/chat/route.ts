import { streamText, convertToCoreMessages } from "ai";
import { buildSystemPrompt } from "@/lib/system-prompt";

// Node.js runtime: Reads .env.local properly for local dev
// Vercel AI SDK automatically uses VERCEL_OIDC_TOKEN when available (production or local)
// Falls back to ANTHROPIC_API_KEY if OIDC token not available
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request: messages array required", {
        status: 400,
      });
    }

    const systemPrompt = buildSystemPrompt();

    // Convert UIMessage format to CoreMessage format for streamText
    const coreMessages = convertToCoreMessages(messages);

    // Vercel AI SDK automatically uses VERCEL_OIDC_TOKEN if available (from .env.local or production)
    // Falls back to ANTHROPIC_API_KEY if OIDC token not available
    const result = streamText({
      model: "anthropic/claude-3.5-sonnet",
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
        "Authentication error: VERCEL_OIDC_TOKEN should be available (use `vc env pull`), or set ANTHROPIC_API_KEY in .env.local.",
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
