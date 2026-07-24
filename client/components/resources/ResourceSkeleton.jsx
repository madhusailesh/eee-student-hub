"use client";

export default function ResourceSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-sm backdrop-blur-xl animate-pulse dark:border-slate-800/80 dark:bg-slate-900/40"
        >
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
              <div className="h-3.5 w-full rounded bg-slate-200/70 dark:bg-slate-800/60" />
              <div className="h-3 w-1/2 rounded bg-slate-200/50 dark:bg-slate-800/40" />
            </div>
          </div>

          <div className="mt-6 flex gap-3 border-t border-slate-100 pt-4 dark:border-slate-800/80">
            <div className="h-9 flex-1 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 flex-1 rounded-xl bg-slate-200/60 dark:bg-slate-800/60" />
          </div>
        </div>
      ))}
    </div>
  );
}