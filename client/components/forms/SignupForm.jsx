"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signup, verifyOtp } from "@/services/auth";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  KeyRound, 
  UserPlus, 
  AlertCircle, 
  CheckCircle2, 
  Zap, 
  Loader2 
} from "lucide-react";

export default function SignupForm() {
  const router = useRouter();

  // Step 1 = Signup Form, Step 2 = OTP Verification
  const [step, setStep] = useState(1);

  // Form State matching backend Joi Schema
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    semester: "1",
    rollNumber: "",
    phone: "",
  });

  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        semester: Number(formData.semester),
      };

      const res = await signup(payload);
      setSuccessMsg(res.message || "OTP sent successfully to your email!");
      setStep(2); // Move to OTP step
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await verifyOtp({ email: formData.email, otp });
      setSuccessMsg("Email verified successfully! Redirecting to login...");
      
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err) {
      console.error("OTP Error:", err);
      setError(err.response?.data?.message || "Invalid or expired OTP.");
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
      {/* Background Ambient Glow */}
      <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-indigo-500/15 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-violet-500 text-white shadow-md shadow-cyan-500/25">
          <Zap className="h-6 w-6 fill-white" />
        </div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          {step === 1 ? "Create Account" : "Verify Email"}
        </h1>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
          {step === 1 
            ? "Join EEE Student Hub to access study materials" 
            : `Enter 6-digit OTP sent to ${formData.email}`}
        </p>
      </div>

      {/* Alert Messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 flex items-center gap-2.5 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs font-bold text-rose-600 dark:text-rose-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {successMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 flex items-center gap-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-600 dark:text-emerald-400"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {/* STEP 1: SIGNUP FORM */}
      {step === 1 && (
        <form onSubmit={handleSignupSubmit} className="space-y-3.5 relative z-10">
          
          {/* Full Name */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                name="fullName"
                placeholder="Madhu Sailesh"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="email"
                name="email"
                placeholder="student@vssut.ac.in"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-10 text-xs font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Semester Selector */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
              Semester
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3.5 top-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-xs font-medium text-slate-900 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <option key={s} value={s} className="dark:bg-slate-900">
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Register & Get OTP</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* STEP 2: OTP VERIFICATION FORM */}
      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5 text-center">
              Enter 6-Digit OTP Code
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-center text-lg font-mono font-bold tracking-widest text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-600 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying OTP...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Verify & Activate Account</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full text-center text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ← Change details / Resend
          </button>
        </form>
      )}

      {/* Footer Link */}
      <div className="mt-6 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 relative z-10">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-cyan-600 hover:underline dark:text-cyan-400"
        >
          Sign In
        </Link>
      </div>
    </motion.div>
  );
}