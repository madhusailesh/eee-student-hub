"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { Sun, Moon, Globe, LogIn, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onSidebarToggle }) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-stone-100/90 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Left Section: Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-3">
          {onSidebarToggle && (
            <button
              onClick={onSidebarToggle}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white/80 text-slate-700 shadow-sm transition-transform active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:hidden"
              aria-label="Toggle Sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 font-black text-white shadow-md shadow-amber-500/20">
              E
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                EEE<span className="text-amber-500">Hub</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-300 md:flex">
          <Link
            href="/semester"
            className="transition-colors hover:text-amber-500 dark:hover:text-amber-400"
          >
            Semester
          </Link>
          <Link
            href="/faculty"
            className="transition-colors hover:text-amber-500 dark:hover:text-amber-400"
          >
            Faculty
          </Link>
          <Link
            href="/notices"
            className="transition-colors hover:text-amber-500 dark:hover:text-amber-400"
          >
            Notices
          </Link>
        </nav>

        {/* Right Section: EduSUT Style Tools & Working Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Working Dark / Light Switch */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white/80 text-amber-600 shadow-sm transition-all hover:bg-slate-100 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-amber-400 dark:hover:bg-slate-800"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Font Size Selector Pills (EduSUT Style) */}
          <div className="hidden items-center rounded-xl border border-slate-300 bg-white/80 p-1 text-xs font-bold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 sm:flex">
            <button className="px-2 py-0.5 transition-colors hover:text-amber-500">A-</button>
            <button className="rounded-md bg-amber-500 px-2 py-0.5 text-white">A</button>
            <button className="px-2 py-0.5 transition-colors hover:text-amber-500">A+</button>
          </div>

          {/* Language Indicator */}
          <div className="hidden items-center gap-1.5 rounded-xl border border-slate-300 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:flex">
            <Globe className="h-3.5 w-3.5 text-amber-500" />
            <span>English</span>
          </div>

          {/* User Auth CTA Button */}
          {user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-bold text-amber-600 transition-all hover:bg-amber-500/20 dark:text-amber-400 sm:text-sm"
            >
              <User className="h-4 w-4" />
              <span className="max-w-[100px] truncate">{user.fullName || user.name}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 transition-all hover:bg-amber-600 active:scale-95 sm:text-sm"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Dropdown Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white/80 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95 md:hidden">
          <div className="flex flex-col gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <Link
              href="/semester"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Semester
            </Link>
            <Link
              href="/faculty"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Faculty
            </Link>
            <Link
              href="/notices"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Notices
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}