import type { Metadata } from "next";

import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { LinkCard } from "../components/LinkCard";
import { writing } from "../../content/writing";
import { profile } from "../../content/profile";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Writing by Harel Coman on AI-driven development, Cursor workflows, and front-end engineering leadership.",
  openGraph: {
    title: "Writing · harelcoman",
    description:
      "Writing by Harel Coman on AI-driven development, Cursor workflows, and front-end engineering leadership.",
    url: "/writing",
  },
};

function Arrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WritingPage() {
  const emailHref =
    profile.links.find((l) => l.label === "Email")?.href ?? "mailto:haco29@gmail.com";

  return (
    <div className="font-sans">
      <Container>
        <div className="py-14 sm:py-20">
          <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            Essays & series
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            Writing
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I write about AI-driven development, front-end architecture, and the practices that help
            teams ship high-quality software.
          </p>
        </div>

        <Section title="Featured series" eyebrow="DEV.to">
          <LinkCard
            title={writing.series.title}
            description={writing.series.note}
            href={writing.series.href}
            meta="Series"
            icon={<Arrow />}
          />
        </Section>

        <Section title="Featured posts" eyebrow="Curated">
          <div className="grid gap-4 sm:grid-cols-2">
            {writing.featured.map((p) => (
              <LinkCard
                key={p.title}
                title={p.title}
                description={p.note ?? "Read on DEV.to"}
                href={p.href}
                meta="Post"
                icon={<Arrow />}
              />
            ))}
          </div>
        </Section>

        <Section title="Work with me" eyebrow="Consulting">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 sm:p-8 dark:border-white/15 dark:bg-black dark:shadow-none">
            <p className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
              Want help with frontend architecture or AI-driven workflows?
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              If you’re building at scale and want better performance, accessibility, DX, or a
              practical AI-first engineering process, let’s talk.
            </p>
            <div className="mt-6">
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                href={emailHref}
              >
                Email me
              </a>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
