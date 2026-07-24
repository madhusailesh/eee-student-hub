"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Layers, GraduationCap } from "lucide-react";

const semesters = [
  { id: 1, title: "Semester 1", year: "1st Year", status: "Basic Engineering" },
  { id: 2, title: "Semester 2", year: "1st Year", status: "Basic Engineering" },
  { id: 3, title: "Semester 3", year: "2nd Year", status: "Core Departmental" },
  { id: 4, title: "Semester 4", year: "2nd Year", status: "Core Departmental" },
  {
    id: 5,
    title: "Semester 5",
    year: "3rd Year",
    status: "Advanced Electives",
  },
  {
    id: 6,
    title: "Semester 6",
    year: "3rd Year",
    status: "Advanced Electives",
  },
  {
    id: 7,
    title: "Semester 7",
    year: "4th Year",
    status: "Specialization & Projects",
  },
  {
    id: 8,
    title: "Semester 8",
    year: "4th Year",
    status: "Specialization & Projects",
  },
];

export default function SemesterPage() {
  return (
    <div className="min-h-screen bg-stone-100/60 text-slate-900 px-4 py-8 md:px-8 md:py-12 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 dark:border-slate-800 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-wider uppercase mb-1">
              <GraduationCap className="h-4 w-4" /> Academic Curriculum
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-slate-400">
              Select Semester
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Access verified lecture notes, previous year question papers
              (PYQs), syllabus, and reference books tailored for EEE.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <Layers className="h-4 w-4 text-cyan-500" />
            <span>8 Semesters Available</span>
          </div>
        </motion.div>

        {/* Semesters Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {semesters.map((semester, index) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <Link
                href={`/semester/${semester.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-2xl dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] active:scale-[0.98]"
              >
                {/* Hover Ambient Light */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/20" />

                <div>
                  {/* Top Bar with Number Badge & Year */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-mono text-base font-extrabold text-slate-800 transition-colors group-hover:bg-cyan-500 group-hover:text-white dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-950 shadow-sm">
                      0{semester.id}
                    </span>

                    <span className="rounded-full border border-slate-200 bg-slate-100/80 px-2.5 py-0.5 text-[11px] font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                      {semester.year}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                      {semester.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {semester.status}
                    </p>
                  </div>
                </div>

                {/* Bottom Action Section */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>View Subjects</span>
                  </span>

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all group-hover:bg-cyan-500/10 group-hover:text-cyan-600 group-hover:translate-x-0.5 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-cyan-500/20 dark:group-hover:text-cyan-400">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
