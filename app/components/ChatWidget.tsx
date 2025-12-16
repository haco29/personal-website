"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Chat } from "./Chat";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-4">
      {/* Chat Widget */}
      {isOpen && (
        <div className="flex h-[600px] w-[400px] flex-col rounded-2xl border border-black/10 bg-white shadow-2xl transition-all sm:w-[380px] dark:border-white/15 dark:bg-black">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 dark:border-white/15">
            <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Chat</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              aria-label="Close chat panel"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Component */}
          <div className="flex-1 overflow-hidden">
            <Chat />
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-zinc-950 shadow-lg transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none dark:bg-zinc-50"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-white dark:text-zinc-950"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <Image
            src="/chat/harel-chat.png"
            alt="Chat with Harel"
            width={56}
            height={56}
            className="h-full w-full object-cover"
            priority
          />
        )}
      </button>
    </div>
  );
}
