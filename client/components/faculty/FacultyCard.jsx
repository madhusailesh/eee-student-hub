"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

export default function FacultyCard({ teacher, index }) {
  const imageUrl = teacher?.photoUrl?.startsWith("http")
    ? teacher.photoUrl
    : `http://localhost:5000${teacher?.photoUrl}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-5 md:p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-2xl dark:hover:border-amber-500/40 dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
    >
      {/* Background Glows */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl transition-all duration-500 group-hover:bg-amber-500/20" />

      <div>
        {/* Profile Image */}
        <div className="relative mx-auto h-28 w-28 md:h-32 md:w-32">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-80" />
          <img
            src={imageUrl}
            alt={teacher.name}
            className="relative h-full w-full rounded-full border-2 border-slate-200 object-cover shadow-md transition-transform duration-300 group-hover:scale-105 dark:border-slate-800"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150?text=Faculty";
            }}
          />
        </div>

        {/* Name & Post */}
        <div className="mt-4 text-center">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-amber-600 dark:text-slate-100 dark:group-hover:text-amber-400">
            {teacher.name}
          </h2>
          
          <span className="mt-2 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:border-amber-500/20 dark:text-amber-400">
            {teacher.designation || "Faculty Member"}
          </span>
        </div>

        {/* Info Container */}
        <div className="mt-5 space-y-2.5 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 text-xs md:text-sm text-slate-700 transition-colors dark:border-slate-800/80 dark:bg-slate-950/60 dark:text-slate-300">
          {teacher.branch && (
            <div className="flex items-center gap-2.5">
              <Building2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">{teacher.branch}</span>
            </div>
          )}

          {teacher.cabin && (
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-rose-500 dark:text-rose-400 shrink-0" />
              <span className="truncate">Cabin: {teacher.cabin}</span>
            </div>
          )}

          {teacher.email && (
            <a
              href={`mailto:${teacher.email}`}
              className="flex items-center gap-2.5 text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 transition-colors"
            >
              <Mail className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="truncate">{teacher.email}</span>
            </a>
          )}

          {teacher.phone && (
            <a
              href={`tel:${teacher.phone}`}
              className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
            >
              <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{teacher.phone}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}