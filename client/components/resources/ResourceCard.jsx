"use client";

import Link from "next/link";
import { FileText, Eye, Download, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function ResourceCard({ resource, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-2xl dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] active:scale-[0.99]"
    >
      {/* Dynamic Background Light */}
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/20" />

      <div>
        <div className="flex items-start gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 transition-colors group-hover:bg-cyan-500 group-hover:text-white dark:bg-cyan-500/20 dark:text-cyan-400 dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-950">
            <FileText className="h-6 w-6" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors dark:text-slate-100 dark:group-hover:text-cyan-400 line-clamp-1">
              {resource.title}
            </h3>

            {resource.description && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                {resource.description}
              </p>
            )}

            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              <Calendar size={13} className="text-cyan-500" />
              <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Footer */}
      <div className="mt-6 flex gap-2.5 border-t border-slate-100 pt-4 dark:border-slate-800/80">
        <Link
          href={resource.fileUrl}
          target="_blank"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-2 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition-all hover:opacity-95 active:scale-95"
        >
          <Eye size={15} />
          <span>View</span>
        </Link>

        <a
          href={resource.fileUrl}
          download
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs font-bold text-slate-700 transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 active:scale-95"
        >
          <Download size={15} />
          <span>Download</span>
        </a>
      </div>
    </motion.div>
  );
}