"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { 
  Sun, 
  Moon, 
  LogIn, 
  User, 
  Menu, 
  X, 
  Zap, 
  BookOpen, 
  Users, 
  BellRing 
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Semesters", href: "/semester", icon: BookOpen },
    { name: "Faculty", href: "/faculty", icon: Users },
    { name: "Notices", href: "/notices", icon: BellRing },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-3 py-3 md:px-6">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-slate-200/60 bg-white/70 px-4 backdrop-blur-xl shadow-lg shadow-slate-200/20 transition-all duration-300 dark:border-slate-800/80 dark:bg-slate-900/60 dark:shadow-cyan-950/20">
        
        {/* Brand Logo with Electric Vibe */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-cyan-500/20 transition-transform duration-300 group-hover:scale-105">
            <Zap className="h-5 w-5 fill-white transition-transform group-hover:rotate-12" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              CORE<span className="bg-gradient-to-r from-cyan-500 to-indigo-500 bg-clip-text text-transparent">EEE</span>
            </span>
          </div>
        </Link>

        {/* Center Floating Nav Pills (Desktop) */}
        <div className="hidden items-center gap-1 rounded-xl border border-slate-200/50 bg-slate-100/50 p-1 dark:border-slate-800/50 dark:bg-slate-950/40 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 -z-10 rounded-lg bg-white shadow-sm dark:bg-slate-800/80"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Section: Theme Slider + Auth CTA */}
        <div className="flex items-center gap-2.5">
          
          {/* Unique Sliding Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="relative flex h-8 w-14 items-center rounded-full border border-slate-300 bg-slate-200/80 p-1 transition-colors dark:border-slate-700 dark:bg-slate-950"
            title="Toggle Light/Dark Theme"
            aria-label="Toggle Theme"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md dark:bg-cyan-500 dark:text-slate-950 ${
                theme === "dark" ? "ml-auto" : "ml-0"
              }`}
            >
              {theme === "dark" ? (
                <Moon className="h-3.5 w-3.5 text-slate-950" />
              ) : (
                <Sun className="h-3.5 w-3.5 text-amber-500" />
              )}
            </motion.div>
          </button>

          {/* User Auth CTA Button */}
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-600 transition-all hover:bg-cyan-500/20 dark:text-cyan-400"
            >
              <User className="h-4 w-4" />
              <span className="max-w-[90px] truncate">{user.fullName || user.name}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition-all hover:opacity-90 active:scale-95"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 md:hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Glass Dropdown Popup */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/90 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-500"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}