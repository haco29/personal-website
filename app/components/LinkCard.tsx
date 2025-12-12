import type { ReactNode } from "react";

export function LinkCard({
  title,
  description,
  href,
  meta,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  meta?: string;
  icon?: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-3xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none dark:border-white/15 dark:bg-black dark:shadow-none"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
            {meta ?? "Writing"}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
        {icon ? (
          <div className="mt-1 text-zinc-400 transition-colors group-hover:text-zinc-700 dark:text-zinc-500 dark:group-hover:text-zinc-300">
            {icon}
          </div>
        ) : null}
      </div>
    </a>
  );
}
