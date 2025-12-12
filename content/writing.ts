export type WritingItem = {
  title: string;
  href: string;
  note?: string;
};

export const writing = {
  series: {
    title: "The AI-Driven Developer Series",
    href: "https://dev.to/haco29/series/34035",
    note: "Articles on AI software development, Cursor workflows, and engineering patterns.",
  },
  featured: [
    {
      title: "Stop “Vibe Coding”: What Worked for Me as a Front-End Tech Lead",
      href: "https://dev.to/haco29/series/34035",
      note: "From intuition to a repeatable workflow.",
    },
    {
      title: "The Red Queen Code Review Pattern — Perpetual Evolution in AI-Powered Development",
      href: "https://dev.to/haco29/series/34035",
      note: "A practical pattern for continuously improving AI-generated code.",
    },
  ] satisfies WritingItem[],
} as const;
