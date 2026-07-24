"use client";

import { FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyState({
  title = "No Resources",
  description = "Nothing uploaded yet.",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/40 px-6 py-16 text-center backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/20"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
        <FolderOpen size={36} />
      </div>

      <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
        {title}
      </h2>

      <p className="mt-1.5 max-w-sm text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
        {description}
      </p>
    </motion.div>
  );
}