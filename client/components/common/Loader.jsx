"use client";

import React, { useState, useEffect } from "react";

export default function Loader({ text = "Loading Hub..." }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // Ultra-smooth progression
      });
    }, 25); // Speed control

    return () => clearInterval(interval);
  }, []);

  const isCompleted = progress === 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[380px] w-full p-6">
      <div className="relative flex items-center justify-center">
        {/* Glowing Ambient Background Aura */}
        <div className="absolute w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl animate-pulse"></div>

        {/* Outer Pulsing & Spinning Neon Ring */}
        <div
          className={`w-48 h-48 rounded-full border-[4px] border-transparent border-t-cyan-400 border-r-indigo-500 shadow-[0_0_30px_rgba(6,182,212,0.5)] ${
            isCompleted
              ? "animate-none border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.8)]"
              : "animate-spin"
          }`}
        ></div>

        {/* Inner Counter-Rotating Pink/Purple Ring */}
        <div
          className={`absolute w-36 h-36 rounded-full border-[4px] border-transparent border-b-purple-500 border-l-pink-500 shadow-[0_0_25px_rgba(168,85,247,0.5)] ${
            isCompleted
              ? "animate-none border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.8)]"
              : "animate-[spin_1.2s_linear_infinite_reverse]"
          }`}
        ></div>

        {/* Center Dynamic EEE Display Box */}
        <div className="absolute w-28 h-28 rounded-full bg-slate-950/90 border-2 border-cyan-500/50 p-2 shadow-[0_0_25px_rgba(6,182,212,0.6)] backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300">
          
          {/* Progressive E-E-E Letter Emergence */}
          <div className="flex items-center justify-center gap-1">
            {/* First 'E' (Appears at >= 33%) */}
            <span
              className={`text-2xl font-black transition-all duration-500 ${
                progress >= 33
                  ? "opacity-100 scale-100 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]"
                  : "opacity-20 scale-75 text-slate-600"
              }`}
            >
              E
            </span>

            {/* Second 'E' (Appears at >= 66%) */}
            <span
              className={`text-2xl font-black transition-all duration-500 ${
                progress >= 66
                  ? "opacity-100 scale-100 text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.9)]"
                  : "opacity-20 scale-75 text-slate-600"
              }`}
            >
              E
            </span>

            {/* Third 'E' (Appears at 100%) */}
            <span
              className={`text-2xl font-black transition-all duration-500 ${
                progress >= 100
                  ? "opacity-100 scale-110 text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,1)] animate-bounce"
                  : "opacity-20 scale-75 text-slate-600"
              }`}
            >
              E
            </span>
          </div>

          {/* Dynamic Percentage Badge below EEE */}
          <span
            className={`mt-1 text-[11px] font-extrabold tracking-widest transition-colors ${
              isCompleted ? "text-emerald-400 animate-pulse" : "text-cyan-300"
            }`}
          >
            {progress}%
          </span>
        </div>
      </div>

      {/* Sleek Gradient Progress Bar */}
      <div className="w-52 bg-slate-900 rounded-full h-2 mt-8 overflow-hidden p-[1px] border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <div
          className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Futuristic Bottom Status Text */}
      <p className="mt-4 text-xs font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 uppercase animate-pulse">
        {isCompleted ? "⚡ Welcome To CORE EEE ⚡" : `${text}`}
      </p>
    </div>
  );
}