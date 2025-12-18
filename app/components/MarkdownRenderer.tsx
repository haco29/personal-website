"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ ...props }) => (
            <h1
              className="mt-4 mb-2 text-xl font-bold text-zinc-950 dark:text-zinc-50"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="mt-3 mb-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="mt-2 mb-1 text-base font-semibold text-zinc-950 dark:text-zinc-50"
              {...props}
            />
          ),
          // Paragraphs
          p: ({ ...props }) => (
            <p
              className="mb-2 text-sm leading-relaxed text-zinc-950 dark:text-zinc-50"
              {...props}
            />
          ),
          // Lists
          ul: ({ ...props }) => (
            <ul
              className="mb-2 list-inside list-disc space-y-1 text-sm text-zinc-950 dark:text-zinc-50"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="mb-2 list-inside list-decimal space-y-1 text-sm text-zinc-950 dark:text-zinc-50"
              {...props}
            />
          ),
          li: ({ ...props }) => (
            <li className="text-sm text-zinc-950 dark:text-zinc-50" {...props} />
          ),
          // Code blocks
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="block overflow-x-auto rounded-lg bg-zinc-100 p-3 font-mono text-xs text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ ...props }) => <pre className="mb-2 overflow-x-auto" {...props} />,
          // Links
          a: ({ ...props }) => (
            <a
              className="text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // Strong/Bold
          strong: ({ ...props }) => (
            <strong className="font-semibold text-zinc-950 dark:text-zinc-50" {...props} />
          ),
          // Emphasis/Italic
          em: ({ ...props }) => (
            <em className="text-zinc-950 italic dark:text-zinc-50" {...props} />
          ),
          // Blockquotes
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-2 border-l-4 border-zinc-300 pl-4 text-zinc-700 italic dark:border-zinc-600 dark:text-zinc-300"
              {...props}
            />
          ),
          // Horizontal rule
          hr: ({ ...props }) => (
            <hr className="my-4 border-zinc-200 dark:border-zinc-700" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
