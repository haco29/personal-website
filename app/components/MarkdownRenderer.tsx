"use client";

import React, { createContext, useContext } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Shared markdown component styles
const MARKDOWN_STYLES = {
  text: "text-zinc-950 dark:text-zinc-50",
  textSmall: "text-sm text-zinc-950 dark:text-zinc-50",
  heading: "text-zinc-950 dark:text-zinc-50",
  link: "text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
  codeInline:
    "rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50",
  codeBlock:
    "block overflow-x-auto rounded-lg bg-zinc-100 p-3 font-mono text-xs text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50",
  blockquote:
    "my-2 border-l-4 border-zinc-300 pl-4 text-zinc-700 italic dark:border-zinc-600 dark:text-zinc-300",
  hr: "my-4 border-zinc-200 dark:border-zinc-700",
} as const;

// Context to track if we're inside a <pre> element (fenced code block)
const PreContext = createContext(false);

// Wrapper component for code that can use hooks
function CodeComponent({
  className,
  children,
  ...props
}: {
  className?: string | null;
  children: React.ReactNode;
  [key: string]: unknown;
}) {
  const isInsidePre = useContext(PreContext);
  // Fenced code blocks are wrapped in <pre>, inline code is not
  // className may be present for language-tagged blocks, but fenced blocks without language
  // also get wrapped in <pre>, so we check the context
  const isBlock = isInsidePre || (className !== undefined && className !== null);
  const isInline = !isBlock;
  return (
    <code className={isInline ? MARKDOWN_STYLES.codeInline : MARKDOWN_STYLES.codeBlock} {...props}>
      {children}
    </code>
  );
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Headings
          h1: ({ ...props }) => (
            <h1 className={`mt-4 mb-2 text-xl font-bold ${MARKDOWN_STYLES.heading}`} {...props} />
          ),
          h2: ({ ...props }) => (
            <h2
              className={`mt-3 mb-2 text-lg font-semibold ${MARKDOWN_STYLES.heading}`}
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className={`mt-2 mb-1 text-base font-semibold ${MARKDOWN_STYLES.heading}`}
              {...props}
            />
          ),
          // Paragraphs
          p: ({ ...props }) => (
            <p className={`mb-2 leading-relaxed ${MARKDOWN_STYLES.textSmall}`} {...props} />
          ),
          // Lists
          ul: ({ ...props }) => (
            <ul
              className={`mb-2 list-inside list-disc space-y-1 ${MARKDOWN_STYLES.textSmall}`}
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className={`mb-2 list-inside list-decimal space-y-1 ${MARKDOWN_STYLES.textSmall}`}
              {...props}
            />
          ),
          li: ({ ...props }) => <li className={MARKDOWN_STYLES.textSmall} {...props} />,
          // Code blocks
          code: ({ className, children, ...props }) => (
            <CodeComponent className={className} {...props}>
              {children}
            </CodeComponent>
          ),
          pre: ({ children, ...props }) => (
            <PreContext.Provider value={true}>
              <pre className="mb-2 overflow-x-auto" {...props}>
                {children}
              </pre>
            </PreContext.Provider>
          ),
          // Links
          a: ({ ...props }) => (
            <a
              className={MARKDOWN_STYLES.link}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          // Strong/Bold
          strong: ({ ...props }) => (
            <strong className={`font-semibold ${MARKDOWN_STYLES.text}`} {...props} />
          ),
          // Emphasis/Italic
          em: ({ ...props }) => <em className={`italic ${MARKDOWN_STYLES.text}`} {...props} />,
          // Blockquotes
          blockquote: ({ ...props }) => (
            <blockquote className={MARKDOWN_STYLES.blockquote} {...props} />
          ),
          // Horizontal rule
          hr: ({ ...props }) => <hr className={MARKDOWN_STYLES.hr} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
