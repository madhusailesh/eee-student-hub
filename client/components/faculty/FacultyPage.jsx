"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import FacultyCard from "./FacultyCard";
import { Search, Users, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // Sync theme class with HTML body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    loadFaculty();
  }, []);

  async function loadFaculty() {
    try {
      setLoading(true);
      const res = await api.get("/faculty");
      setFaculty(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredFaculty = faculty.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.designation?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-6 md:px-8 md:py-10 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-amber-500 selection:text-white">
      
      {/* Background Lights */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800"
        >
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-mono tracking-wider uppercase mb-1">
              <Users className="h-4 w-4" /> EEE Department
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-slate-400">
              Faculty Directory
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Connect with professors, course coordinators, and faculty.
            </p>
          </div>

          {/* Controls: Search Bar + Theme Toggle Button */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:placeholder-slate-500"
              />
            </div>

            {/* Dark/Light Toggle Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-transform active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-amber-400"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>
          </div>
        </motion.div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-80 rounded-2xl border border-slate-200 bg-white/60 p-6 animate-pulse dark:border-slate-800/80 dark:bg-slate-900/40"
              >
                <div className="mx-auto h-28 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 mx-auto h-5 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 mx-auto h-4 w-1/2 rounded-lg bg-slate-200/60 dark:bg-slate-800/60" />
                <div className="mt-6 space-y-2.5 rounded-xl bg-slate-100 p-4 dark:bg-slate-800/30">
                  <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {filteredFaculty.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredFaculty.map((teacher, index) => (
                  <FacultyCard key={teacher._id} teacher={teacher} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-16 rounded-2xl border border-dashed border-slate-300 bg-white/40 text-center dark:border-slate-800 dark:bg-slate-900/20"
              >
                <Users className="h-10 w-10 text-slate-400 dark:text-slate-600 mb-2" />
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  No matching faculty members found.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}