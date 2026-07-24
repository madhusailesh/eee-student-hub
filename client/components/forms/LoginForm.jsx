"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  Zap, 
  Loader2 
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await login({
        email,
        password,
      });

      console.log(res);

      const user = res.data;

      // Save data to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect according to role
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-2xl dark:shadow-cyan-950/20 transform-gpu"
    >
      {/* Background Ambient Glow inside card */}
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none" />

      {/* Header Logo & Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-cyan-500/25">
          <Zap className="h-6 w-6 fill-white" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Welcome Back
        </h1>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Login to access EEE Student Hub resources
        </p>
      </div>

      {/* Error Alert Box */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs font-bold text-rose-600 dark:text-rose-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        
        {/* Email Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="email"
              placeholder="student@vssut.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
            />
            
            {/* Password Show / Hide Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <LogIn className="h-4 w-4" />
              <span>Login to Dashboard</span>
            </>
          )}
        </button>

      </form>
    </motion.div>
  );
}