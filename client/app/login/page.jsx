import LoginForm from "@/components/forms/LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center bg-slate-50/60 px-4 py-12 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-white overflow-hidden">
      
      {/* Background Ambient Glows (GPU Accelerated for smooth performance) */}
      <div className="fixed -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />

      {/* Back to Home Navigation Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-cyan-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Modern Redesigned Login Form Component */}
      <div className="relative z-10 w-full max-w-md flex justify-center">
        <LoginForm />
      </div>

    </main>
  );
}