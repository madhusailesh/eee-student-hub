import ResourcePage from "@/components/resources/ResourcePage";
import Link from "next/link";

export default async function SyllabusPage({ params }) {
  const { semester, subjectCode } = await params;

  return (
    <div className="min-h-screen bg-stone-100/60 text-slate-900 px-4 py-8 md:px-8 md:py-12 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-white">
      
      {/* Background Ambient Glows */}
      <div className="fixed -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Top Breadcrumb Header */}
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
          <Link 
            href={`/semester/${semester}/${subjectCode}`} 
            className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors uppercase"
          >
            {subjectCode}
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-slate-200 font-bold">Syllabus</span>
        </div>

        {/* Re-usable Resource Page Component */}
        <ResourcePage
          title="Course Syllabus"
          type="syllabus"
          semester={semester}
          subject={subjectCode}
        />
      </div>
    </div>
  );
}