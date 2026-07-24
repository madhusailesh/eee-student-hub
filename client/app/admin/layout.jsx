"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-slate-50/60 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      
      {/* Background Ambient Glows (GPU Accelerated) */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />

      {/* Mobile Menu Top Toggle Bar */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-cyan-500" />
          <span className="font-extrabold text-sm tracking-tight">Admin Console</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="rounded-xl border border-slate-200 p-2 text-slate-700 dark:border-slate-800 dark:text-slate-300"
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop & Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 backdrop-blur-xl border-r border-slate-200/80 transition-transform duration-300 dark:bg-slate-900/80 dark:border-slate-800 lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          
          <div>
            {/* Header / Brand Badge */}
            <div className="flex items-center justify-between px-3 py-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-cyan-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-100">
                    Admin Panel
                  </h1>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                    Control Center
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1.5">
              {menus.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`relative flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "text-cyan-600 dark:text-cyan-400"
                        : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.title}</span>

                    {/* Animated Active Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeAdminTab"
                        className="absolute inset-0 -z-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 shadow-sm dark:bg-cyan-500/20"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Exit Button */}
          <div className="border-t border-slate-200/60 pt-4 dark:border-slate-800/60">
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-cyan-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-cyan-400 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portal</span>
            </Link>
          </div>

        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 min-w-0 p-4 pt-16 lg:pt-8 md:p-8 relative z-10">
        {children}
      </main>

    </div>
  );
}