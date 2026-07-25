"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import {
  Upload,
  FolderOpen,
  BookOpen,
  Bell,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Resource",
    href: "/admin/upload",
    icon: Upload,
  },
  {
    title: "Resources Vault",
    href: "/admin/resources",
    icon: FolderOpen,
  },
  {
    title: "Manage Subjects",
    href: "/admin/subjects",
    icon: BookOpen,
  },
  {
    title: "Notices",
    href: "/admin/notices",
    icon: Bell,
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading } = useAuth();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="relative flex min-h-screen bg-slate-50/60 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* Background Ambient Glows */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none" />

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-500" />
          <span className="font-extrabold text-sm tracking-tight">
            Admin Console
          </span>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="rounded-xl border border-slate-200 p-2 dark:border-slate-800"
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200/80 bg-white/80 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900/80 lg:static lg:translate-x-0 ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div>
            <div className="mb-4 flex items-center justify-between border-b border-slate-200/60 px-3 py-4 dark:border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h1 className="text-base font-black">Admin Panel</h1>

                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Control Center
                  </p>
                </div>
              </div>
            </div>

            {/* Logged in user */}
            <div className="mb-4 rounded-xl bg-slate-100 p-3 dark:bg-slate-800">
              <p className="text-xs text-slate-500">Logged in as</p>

              <p className="font-bold">{user.fullName}</p>

              <p className="text-xs text-cyan-500 uppercase">
                {user.role}
              </p>
            </div>

            <nav className="space-y-1.5">
              {menus.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                      isActive
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="h-4 w-4" />

                    <span>{item.title}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activeAdminTab"
                        className="absolute inset-0 -z-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/10"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-slate-200/60 pt-4 dark:border-slate-800/60">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-xs font-bold transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />

              <span>Back to Portal</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="relative z-10 min-w-0 flex-1 p-4 pt-16 md:p-8 lg:pt-8">
        {children}
      </main>
    </div>
  );
}