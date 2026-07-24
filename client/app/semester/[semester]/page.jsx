import Link from "next/link";
import { getSubjectsBySemester } from "@/services/subjects";
import {
  ArrowLeft,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  FolderOpen,
} from "lucide-react";

export default async function SemesterSubjectsPage({ params }) {
  const { semester } = await params;
  const subjects = (await getSubjectsBySemester(semester)) || [];

  return (
    <div className="min-h-screen bg-stone-100/60 text-slate-900 px-4 py-8 md:px-8 md:py-12 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation & Header */}
        <div className="space-y-4 border-b border-slate-200 pb-6 dark:border-slate-800">
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link
              href="/semester"
              className="flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Semesters</span>
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">
              Semester {semester}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-wider uppercase mb-1">
                <Layers className="h-4 w-4" /> Curriculum Breakdown
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-slate-400">
                Semester {semester} Subjects
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">
                Select a subject to browse lecture notes, previous papers,
                syllabus, and video resources.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              <BookOpen className="h-4 w-4 text-cyan-500" />
              <span>{subjects.length} Subjects</span>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {subjects.map((subject) => (
              <Link
                key={subject._id}
                href={`/semester/${semester}/${subject.code}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-2xl dark:hover:border-cyan-500/40 dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] active:scale-[0.98]"
              >
                {/* Ambient Glow */}
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-500/10 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/20" />

                <div>
                  {/* Top Bar: Subject Code & Type */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
                      {subject.code}
                    </span>

                    {subject.type && (
                      <span className="rounded-full border border-slate-200 bg-slate-100/80 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                        {subject.type}
                      </span>
                    )}
                  </div>

                  {/* Subject Name */}
                  <div className="mt-4">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors dark:text-slate-100 dark:group-hover:text-cyan-400 line-clamp-2">
                      {subject.name}
                    </h2>
                  </div>
                </div>

                {/* Bottom Details Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800/80">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    <span>{subject.credits || 3} Credits</span>
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all group-hover:bg-cyan-500/10 group-hover:text-cyan-600 group-hover:translate-x-0.5 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-cyan-500/20 dark:group-hover:text-cyan-400">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-slate-300 bg-white/40 text-center dark:border-slate-800 dark:bg-slate-900/20">
            <FolderOpen className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              No Subjects Found
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              There are currently no subjects listed for Semester {semester}.
              Check back later or upload resources in Admin.
            </p>
            <Link
              href="/semester"
              className="mt-6 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md transition-transform active:scale-95 hover:bg-cyan-400"
            >
              Back to Semesters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
