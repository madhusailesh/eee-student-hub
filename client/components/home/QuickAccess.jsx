"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  FileQuestion,
  Users,
  Bell,
  Calendar,
  Globe,
  Trophy,
  CalendarDays,
  ExternalLink,
  Compass,
} from "lucide-react";

const quickLinks = [
  {
    title: "Semester Notes",
    desc: "Study notes for all EEE subjects",
    href: "/semester",
    icon: FileText,
    isExternal: false,
    color:
      "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
  },
  {
    title: "PYQs Vault",
    desc: "Previous year question papers",
    href: "/semester",
    icon: FileQuestion,
    isExternal: false,
    color:
      "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
  },
  {
    title: "Faculty Directory",
    desc: "EEE Department faculty details",
    href: "/faculty",
    icon: Users,
    isExternal: false,
    color:
      "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
  },
  {
    title: "Timetable",
    desc: "Coming Soon",
    href: null,
    icon: Calendar,
    isExternal: false,
    color:
      "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  },

  {
    title: "Official Website",
    desc: "vssut.ac.in — Main University Site",
    href: "https://www.vssut.ac.in",
    icon: Globe,
    isExternal: true,
    color:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-500/20 dark:text-violet-400",
  },
  {
    title: "VSSUT Results",
    desc: "Check your semester grades",
    href: "https://www.vssut.ac.in/notice-board.php",
    icon: Trophy,
    isExternal: true,
    color:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  },
  {
    title: "Official Notices",
    desc: "Coming Soon",
    href: null,
    icon: Bell,
    isExternal: false,
    color:
      "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
  },
  {
    title: "Academic Calendar",
    desc: "Exams, Holidays & Events Schedule",
    href: "https://www.vssut.ac.in/academic-calendar.php",
    icon: CalendarDays,
    isExternal: true,
    color:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  },
];

export default function QuickAccess() {
  return (
    <section className="my-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Compass className="h-4 w-4" />
            Navigation Hub
          </div>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
            Quick Access
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
        {quickLinks.map((item, index) => {
          const Icon = item.icon;

          const CardContent = (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.04,
              }}
              whileHover={item.href ? { y: -4 } : {}}
              className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/60 ${
                item.href
                  ? "hover:border-cyan-500/40 hover:shadow-xl dark:hover:border-cyan-500/30 dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] active:scale-[0.98]"
                  : "cursor-not-allowed opacity-60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {item.isExternal && item.href && (
                    <ExternalLink className="h-4 w-4 text-slate-400" />
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          );

          // Disabled Card
          if (!item.href) {
            return (
              <div key={item.title} className="block h-full">
                {CardContent}
              </div>
            );
          }

          // External Link
          if (item.isExternal) {
            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                {CardContent}
              </a>
            );
          }

          // Internal Link
          return (
            <Link
              key={item.title}
              href={item.href}
              className="block h-full"
            >
              {CardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}