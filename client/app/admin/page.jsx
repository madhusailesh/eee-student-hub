"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Upload,
  FolderOpen,
  LayoutDashboard,
  BookOpen,
  Bell,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const cards = [
  {
    title: "Upload Resource",
    description:
      "Publish Notes, PYQs, Books, Lab Sheets, and Video Lectures for students.",
    href: "/admin/upload",
    icon: Upload,
    color:
      "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
    accent: "from-cyan-500 to-blue-500",
    badge: "Quick Upload",
  },
  {
    title: "Manage Resources",
    description:
      "View, search, edit metadata, or delete uploaded study materials.",
    href: "/admin/resources",
    icon: FolderOpen,
    color:
      "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
    accent: "from-purple-500 to-indigo-500",
    badge: "Resources Vault",
  },
  {
    title: "Manage Subjects",
    description:
      "Add, modify, or view curriculum subjects across all 8 semesters.",
    href: "/admin/subjects",
    icon: BookOpen,
    color:
      "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    accent: "from-emerald-500 to-teal-500",
    badge: "Curriculum",
  },
  {
    title: "Department Notices",
    description:
      "Post urgent alerts, exam schedules, and department announcements.",
    href: "/admin/notices",
    icon: Bell,
    color:
      "bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400",
    accent: "from-rose-500 to-pink-500",
    badge: "Broadcasting",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="relative z-10 space-y-8">
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            <Sparkles className="h-4 w-4" />
            Operations Control
          </div>

          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 md:text-4xl">
            <LayoutDashboard className="h-8 w-8 text-cyan-500" />
            Admin Dashboard
          </h1>

          <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 md:text-sm">
            Welcome to CORE EEE Admin Control Center.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
          </span>
          Admin Session Active
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Link key={card.href} href={card.href} className="group block">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-500/30 md:p-8"
              >
                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${card.accent} opacity-10 blur-2xl group-hover:opacity-25`}
                />

                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.color}`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <span className="rounded-full border border-slate-200/80 bg-slate-100/60 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider dark:border-slate-800 dark:bg-slate-950/40">
                      {card.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold">
                    {card.title}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-cyan-500">
                  <span>Open Section</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}