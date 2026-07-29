import { describe, expect, it } from "vitest";
import { DEFAULT_CHAT_MODEL } from "../../lib/chat-model";

const MODELS_URL = "https://ai-gateway.vercel.sh/v1/models";

describe("chat model", () => {
  it("is still served by the AI Gateway", async () => {
    const res = await fetch(MODELS_URL);

    // Gateway flakiness isn't proof the model is gone - don't fail the build on it.
    if (!res.ok) {
      console.warn(`Skipping check: ${MODELS_URL} returned ${res.status}`);
      return;
    }

    const { data } = (await res.json()) as { data: Array<{ id: string }> };
    const available = data.map((model) => model.id);

    const [provider] = DEFAULT_CHAT_MODEL.split("/");
    const alternatives = available.filter((id) => id.startsWith(`${provider}/`));

    expect(
      available,
      `"${DEFAULT_CHAT_MODEL}" is no longer served by the AI Gateway. ` +
        `Update DEFAULT_CHAT_MODEL in lib/chat-model.ts. ` +
        `Available ${provider} models: ${alternatives.join(", ")}`,
    ).toContain(DEFAULT_CHAT_MODEL);
  }, 15_000);
});
