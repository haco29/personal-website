import type { ReactNode } from "react";

export function Timeline({ children }: { children: ReactNode }) {
  return (
    <ol className="relative border-l border-black/10 pl-6 dark:border-white/15">{children}</ol>
  );
}

export function TimelineItem({
  title,
  meta,
  children,
}: {
  title: string;
  meta: string;
  children?: ReactNode;
}) {
  return (
    <li className="mb-10 ml-1 last:mb-0">
      <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400" />
      <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{meta}</p>
      {children ? <div className="mt-3">{children}</div> : null}
    </li>
  );
}
