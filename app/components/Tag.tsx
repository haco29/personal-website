export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-medium text-zinc-700 dark:border-white/15 dark:bg-black dark:text-zinc-200">
      {children}
    </span>
  );
}


