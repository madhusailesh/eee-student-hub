import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-8 px-6 overflow-hidden transition-colors duration-300">
      {/* Background Subtle Glowing Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-75 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        {/* Left Side: Hub Branding */}
        <div>
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 tracking-wide">
            CORE EEE STUDENT HUB
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            © {new Date().getFullYear()} CORE EEE. All rights reserved.
          </p>
        </div>

        {/* Right Side: Developer Credit & LinkedIn */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-slate-600 dark:text-slate-400">Developed with ❤️ by</span>
          <a
            href="https://www.linkedin.com/in/madhu-sailesh-sasamal-6918912a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-200"
          >
            <span>Madhu Sailesh Sasamal</span>

            {/* LinkedIn Icon */}
            <svg
              className="w-4 h-4 fill-current transition-transform duration-200 group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>

            {/* Subtle Hover Underline Effect */}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-600 dark:bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </footer>
  );
}