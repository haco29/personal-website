import Image from "next/image";
import harel from "./harel.jpeg";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
      <main className="w-full max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5 sm:p-12 dark:bg-black dark:ring-white/10">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:text-left">
          <Image
            src={harel}
            alt="Harel Coman"
            width={120}
            height={120}
            priority
            className="h-[120px] w-[120px] rounded-full ring-1 ring-black/10 dark:ring-white/15"
          />
          <div className="flex-1">
            <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
              harelcoman.dev
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Coming soon
            </h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              I’m building a new home for writing, talks, and projects. In the meantime:
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                href="https://github.com/haco29"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
                href="mailto:haco29@gmail.com"
              >
                Email
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
                href="https://dev.to/haco29/series/34035"
                target="_blank"
                rel="noopener noreferrer"
              >
                DEV.to
              </a>
              <a
                className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-base font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-white/15 dark:bg-black dark:text-zinc-50 dark:hover:bg-white/5"
                href="https://www.linkedin.com/in/harel-coman-16703289/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
