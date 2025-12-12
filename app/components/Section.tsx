import type { ReactNode } from "react";

export function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-10 sm:py-14">
      <div className="mb-6">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl dark:text-zinc-50">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
