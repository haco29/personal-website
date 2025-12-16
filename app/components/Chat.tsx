"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

type TextPart = { type: "text"; text: string };
type MessagePart = TextPart | { type: string; [key: string]: unknown };

function isTextPart(part: MessagePart): part is TextPart {
  return part.type === "text" && typeof (part as TextPart).text === "string";
}

// Input limits
const MAX_INPUT_LENGTH = 100;
const CHAR_COUNTER_THRESHOLD = 70; // Show counter when input exceeds this
const CHAR_WARNING_THRESHOLD = 80; // Show orange warning at this length
const CHAR_DANGER_THRESHOLD = 90; // Show red warning at this length

export function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });
    setInput("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Messages Area */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                Ask me anything about Harel
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                I can answer questions about his experience, skills, writing, and interests.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => {
              const role = message.role === "user" ? "user" : "assistant";
              const textParts = message.parts
                .filter(isTextPart)
                .map((part) => part.text)
                .join("");

              return (
                <div
                  key={message.id}
                  className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      role === "user"
                        ? "bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950"
                        : "border border-black/10 bg-white text-zinc-950 dark:border-white/15 dark:bg-black dark:text-zinc-50"
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{textParts}</div>
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 dark:border-white/15 dark:bg-black">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-400"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 delay-75"></div>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="border-t border-black/10 px-6 py-4 dark:border-white/15">
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900 dark:bg-red-950">
            <p className="text-sm text-red-800 dark:text-red-200">
              Error: {error.message || "Something went wrong. Please try again."}
            </p>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-black/10 p-6 dark:border-white/15">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a question about Harel..."
              disabled={isLoading}
              maxLength={MAX_INPUT_LENGTH}
              className="flex-1 rounded-full border border-black/10 bg-white px-5 py-3 text-sm text-zinc-950 placeholder:text-zinc-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:placeholder:text-zinc-400"
              aria-label="Chat input"
              aria-describedby="char-counter"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              aria-label="Send message"
            >
              Send
            </button>
          </div>
          {input.length > CHAR_COUNTER_THRESHOLD && (
            <div
              id="char-counter"
              className={`px-5 text-right text-xs ${
                input.length >= CHAR_DANGER_THRESHOLD
                  ? "text-red-600 dark:text-red-400"
                  : input.length >= CHAR_WARNING_THRESHOLD
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {input.length} / {MAX_INPUT_LENGTH} characters
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
