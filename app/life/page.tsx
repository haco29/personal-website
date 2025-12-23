import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { life } from "../../content/life";

export const metadata: Metadata = {
  title: "Life",
  description: "Harel’s life outside of work: hobbies, games, sports, and family.",
  openGraph: {
    title: "Life · harelcoman",
    description: "Harel’s life outside of work: hobbies, games, sports, and family.",
    url: "/life",
  },
};

export default function LifePage() {
  return (
    <div className="font-sans">
      <Container>
        <div className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
              Life
            </h1>
            <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">{life.intro}</p>
          </div>
        </div>

        <Section title="Hobbies" eyebrow="Off the clock">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {life.hobbies.map((h) => (
              <div
                key={h.title}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none"
              >
                <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">{h.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title={life.family.headline} eyebrow="Family">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                {life.family.copy}
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm shadow-black/5 dark:border-white/15 dark:bg-black dark:shadow-none">
              <div className="relative aspect-[16/9] w-full bg-zinc-100 dark:bg-white/5">
                <Image
                  src={life.family.photo.src}
                  alt={life.family.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}
