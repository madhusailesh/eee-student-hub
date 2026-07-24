"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  FileQuestion, 
  Users, 
  BookOpen, 
  Bell, 
  Calendar 
} from "lucide-react";

export default function StatsCards({ stats = {} }) {
  const cards = [
    { 
      title: "Notes", 
      value: stats?.notes ?? 0, 
      icon: FileText, 
      color: "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
      accent: "from-purple-500 to-indigo-500"
    },
    { 
      title: "PYQs", 
      value: stats?.pyqs ?? 0, 
      icon: FileQuestion, 
      color: "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
      accent: "from-cyan-500 to-blue-500"
    },
    { 
      title: "Faculty", 
      value: stats?.faculty ?? 0, 
      icon: Users, 
      color: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
      accent: "from-indigo-500 to-violet-500"
    },
    { 
      title: "Subjects", 
      value: stats?.subjects ?? 0, 
      icon: BookOpen, 
      color: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      accent: "from-emerald-500 to-teal-500"
    },
    { 
      title: "Notices", 
      value: stats?.notices ?? 0, 
      icon: Bell, 
      color: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
      accent: "from-rose-500 to-pink-500"
    },
    { 
      title: "Timetables", 
      value: stats?.timetables ?? 0, 
      icon: Calendar, 
      color: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
      accent: "from-amber-500 to-orange-500"
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-cyan-500/30 transform-gpu"
          >
            {/* Ambient Corner Glow */}
            <div className={`absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${card.accent} opacity-10 blur-xl transition-opacity duration-300 group-hover:opacity-20`} />

            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold tracking-tight text-slate-500 dark:text-slate-400">
                {card.title}
              </h3>

              <div className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${card.color}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4">
              <p className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 font-mono">
                {card.value ?? 0}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}