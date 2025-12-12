import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "./components/Container";
import { Section } from "./components/Section";
import { profile } from "../content/profile";
import harel from "./harel.jpeg";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Harel Coman — Staff Engineer & AI Lead. Frontend architecture, performance, accessibility, and AI-driven developer experience.",
  openGraph: {
    title: "harelcoman",
    description:
      "Harel Coman — Staff Engineer & AI Lead. Frontend architecture, performance, accessibility, and AI-driven developer experience.",
    url: "/",
  },
};

export default function Home() {
  const emailHref =
    profile.links.find((l) => l.label === "Email")?.href ?? "mailto:haco29@gmail.com";

  return (
    <div className="font-sans">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_-10%,rgba(16,185,129,0.20),transparent_50%),radial-gradient(800px_circle_at_80%_0%,rgba(34,211,238,0.18),transparent_45%)] dark:bg-[radial-gradient(900px_circle_at_20%_-10%,rgba(16,185,129,0.18),transparent_50%),radial-gradient(800px_circle_at_80%_0%,rgba(34,211,238,0.14),transparent_45%)]" />
        <Container>
          <div className="relative py-14 sm:py-20">
            <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:text-left">
              <div className="flex-shrink-0">
                <Image
                  src={harel}
                  alt={profile.name}
                  width={136}
                  height={136}
                  priority
                  className="h-[136px] w-[136px] rounded-full ring-1 ring-black/10 dark:ring-white/15"
                />
              </div>
              <div className="flex-1">
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
                  {profile.name}
                </h1>
                <p className="mt-3 text-lg font-medium text-zinc-700 dark:text-zinc-300">
                  {profile.title}
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                  {profile.tagline}
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                  <a
                    className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                    href={emailHref}
                  >
                    Email me
                  </a>
                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    {profile.links
                      .filter((l) => l.label !== "Email")
                      .map((l) => (
                        <a
                          key={l.href}
                          className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {l.label}
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <Section title="What I optimize for" eyebrow="Focus">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.highlights.map((h) => (
              <div
                key={h}
                className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none"
              >
                <p className="text-sm leading-6 font-medium text-zinc-950 dark:text-zinc-50">{h}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Now" eyebrow="Currently">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 sm:p-8 dark:border-white/15 dark:bg-black dark:shadow-none">
            <p className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
              {profile.title} at{" "}
              <span className="text-emerald-700 dark:text-emerald-300">Verbit.ai</span>
            </p>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
              I shape front-end architecture and system quality across products, staying ~50%
              hands-on in code while driving cross-team initiatives (shared UI, platform gaps, DX
              improvements). I also lead AI-driven developer experience: evaluating tooling,
              defining safe practices, and building internal integrations that improve daily
              engineering workflows.
            </p>
          </div>
        </Section>

        <Section title="Coming soon" eyebrow="Future">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
                Live presentations
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Realtime audience polling
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Ask a question on stage, share a deep link, and show results live with a polished
                UI.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
                Knowledge
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                Harel chatbot
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                A bot trained on my public content to help you find the right talk, post, or project
                fast.
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
