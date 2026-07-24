"use client";

import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search resources..." }) {
  return (
    <div className="relative w-full md:w-80">
      <Search
        size={18}
        className="absolute left-3.5 top-3 text-slate-400 dark:text-slate-500"
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white/80 py-2.5 pl-10 pr-10 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-cyan-500/50"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}