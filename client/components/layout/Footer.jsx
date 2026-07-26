import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-slate-200/80 bg-slate-50/80 dark:border-slate-800/80 dark:bg-slate-950/80 text-slate-600 dark:text-slate-400 py-8 px-6 overflow-hidden transition-colors duration-300 backdrop-blur-md">
      
      {/* Top Ambient Cyan Glow Line (GPU Accelerated) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-75 shadow-[0_0_15px_rgba(6,182,212,0.8)] transform-gpu pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative z-10">
        
        {/* Left Side: Hub Branding */}
        <div className="space-y-1">
          <p className="text-lg font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500">
            CORE EEE STUDENT HUB
          </p>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-500">
            © {currentYear} CORE EEE. All rights reserved.
          </p>
        </div>

        {/* Center: Team Page Link */}
        <div>
          <Link
            href="/team"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-md"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-cyan-500" />
          </Link>
        </div>

        {/* Right Side: Developer Credit & Personal Website Link */}
        <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400">
          <span>Developed with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by</span>
          <a
            href="https://madhusailesh.qzz.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-1.5 font-bold text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-200 ml-0.5"
            title="Visit Portfolio"
          >
            <span>Madhu Sailesh Sasamal</span>
            
            {/* Website Icon */}
            <Globe className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12" />

            {/* Subtle Hover Underline Effect */}
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-cyan-600 dark:bg-cyan-400 transition-all duration-300 group-hover:w-full" />
          </a>
        </div>

      </div>
    </footer>
  );
}