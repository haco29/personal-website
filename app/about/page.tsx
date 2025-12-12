import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { Tag } from "../components/Tag";
import { Timeline, TimelineItem } from "../components/Timeline";
import { profile } from "../../content/profile";
import harel from "../harel.jpeg";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Harel Coman — Staff Engineer & AI Lead. Frontend architecture, UI infrastructure, performance, accessibility, CI/CD, and AI-driven DX.",
  openGraph: {
    title: "About · harelcoman",
    description:
      "About Harel Coman — Staff Engineer & AI Lead. Frontend architecture, UI infrastructure, performance, accessibility, CI/CD, and AI-driven DX.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="font-sans">
      <Container>
        <div className="py-14 sm:py-20">
          <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:text-left">
            <Image
              src={harel}
              alt={profile.name}
              width={124}
              height={124}
              priority
              className="h-[124px] w-[124px] rounded-full ring-1 ring-black/10 dark:ring-white/15"
            />
            <div className="flex-1">
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
                About
              </h1>
              <p className="mt-3 text-lg font-medium text-zinc-700 dark:text-zinc-300">
                {profile.title}
              </p>
              <div className="mt-6 space-y-4 text-left text-base leading-7 text-zinc-600 dark:text-zinc-400">
                {profile.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Section title="What I do" eyebrow="Impact areas">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Architecture & UI infrastructure
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                I design scalable front-end foundations: patterns, shared components, performance
                budgets, and integration boundaries that keep teams moving fast.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Performance & accessibility
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                I treat speed and a11y as product quality. I build systems that are measurable,
                testable, and maintainable over time.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                DX & CI/CD automation
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                I improve developer experience through automation, guardrails, and feedback loops:
                tests, linting, a11y tooling, and build pipelines.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                Mentoring & cross-team alignment
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                I mentor engineers, build hiring/onboarding systems, and align product, design, and
                architecture so teams can ship with confidence.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Experience" eyebrow="Timeline">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 sm:p-8 dark:border-white/15 dark:bg-black dark:shadow-none">
              <Timeline>
                {profile.experience.map((e) => (
                  <TimelineItem
                    key={`${e.company}-${e.title}-${e.start}`}
                    title={`${e.title} · ${e.company}`}
                    meta={`${e.start} — ${e.end}`}
                  >
                    {e.bullets.length ? (
                      <ul className="list-disc space-y-1 pl-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {e.bullets.slice(0, 6).map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </TimelineItem>
                ))}
              </Timeline>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Skills</h3>
                <div className="mt-4 space-y-4">
                  {profile.skills.map((g) => (
                    <div key={g.label}>
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {g.label}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {g.items.map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">Education</h3>
                <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {profile.education.map((ed) => (
                    <li key={ed.school}>
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {ed.school}
                      </span>{" "}
                      — {ed.degree}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
