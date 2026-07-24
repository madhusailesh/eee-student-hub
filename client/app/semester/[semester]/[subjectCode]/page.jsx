"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  FileQuestion,
  BookOpen,
  Video,
  ClipboardList,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  Cpu,
} from "lucide-react";

// Thoda descriptions add kar diya to make cards look fuller
const resources = [
  {
    title: "Notes",
    description: "Access unit-wise handwritten & typed lecture notes.",
    href: "notes",
    icon: FileText,
  },
  {
    title: "PYQs",
    description: "Previous Year Questions for exam preparation.",
    href: "pyqs",
    icon: FileQuestion,
  },
  {
    title: "Books",
    description: "Recommended reference books and textbooks.",
    href: "books",
    icon: BookOpen,
  },
  {
    title: "Videos",
    description: "Curated video lectures and tutorials.",
    href: "videos",
    icon: Video,
  },
  {
    title: "Syllabus",
    description: "Official university syllabus and curriculum.",
    href: "syllabus",
    icon: ClipboardList,
  },
  {
    title: "Assignments",
    description: "Lab records, sheets, and assignment questions.",
    href: "assignments",
    icon: FolderOpen,
  },
];

export default function SubjectDashboard() {
  const { semester, subjectCode } = useParams();

  console.log(subjectCode); // ✅ yahan rakho

  // Animation variants for smooth staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <main className="min-h-screen bg-stone-100/60 text-slate-900 px-4 py-8 md:px-8 md:py-12 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Navigation & Header */}
        <div className="space-y-5 border-b border-slate-200 pb-6 dark:border-slate-800">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              href="/semester"
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Semesters
            </Link>
            <span>/</span>
            <Link
              href={`/semester/${semester}`}
              className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              Semester {semester}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold uppercase">
              {subjectCode}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-wider uppercase mb-1">
                <Cpu className="h-4 w-4" /> Resource Dashboard
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-slate-400 uppercase">
                {subjectCode?.replace(/-/g, " ")}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                Explore all academic resources, past year questions, and study
                materials for this specific subject.
              </p>
            </div>
          </div>
        </div>

        {/* Resources Grid with Framer Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6"
        >
          {resources.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div key={item.href} variants={itemVariants}>
                <Link
                  href={`/semester/${semester}/${subjectCode}/${item.href}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-2xl dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] active:scale-[0.98] h-full"
                >
                  {/* Ambient Hover Glow inside card */}
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/20" />

                  <div>
                    {/* Icon Wrapper */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition-colors duration-300 group-hover:bg-cyan-500 group-hover:text-white dark:bg-slate-800/80 dark:text-slate-300 dark:group-hover:bg-cyan-500 dark:group-hover:text-slate-950 shadow-sm">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-slate-100 dark:group-hover:text-cyan-400">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
                    <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-600 dark:text-slate-400 dark:group-hover:text-cyan-400 transition-colors">
                      Open {item.title}
                    </span>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-all group-hover:bg-cyan-500/10 group-hover:text-cyan-600 group-hover:translate-x-1 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-cyan-500/20 dark:group-hover:text-cyan-400">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
