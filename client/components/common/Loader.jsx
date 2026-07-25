import React from 'react';

export default function Loader({ text = "Loading Hub..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] w-full p-6">
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring (Huge Size) */}
        <div className="w-48 h-48 rounded-full border-[5px] border-transparent border-t-cyan-500 border-r-blue-600 animate-spin shadow-[0_0_25px_rgba(6,182,212,0.6)]"></div>
        
        {/* Inner Counter-Rotating Ring */}
        <div className="absolute w-36 h-36 rounded-full border-[5px] border-transparent border-b-purple-500 border-l-pink-500 animate-[spin_1.5s_linear_infinite_reverse] shadow-[0_0_20px_rgba(168,85,247,0.6)]"></div>
        
        {/* Center College Photo / Logo (Big & Extra Clear) */}
        <div className="absolute w-28 h-28 rounded-full overflow-hidden bg-slate-900 border-2 border-cyan-400 p-1 shadow-[0_0_15px_rgba(0,0,0,0.6)] flex items-center justify-center">
          <img 
            src="/logo.png" // <-- Apne image ka path check kar lena (client/public/ me)
            alt="College Logo" 
            className="w-full h-full object-contain rounded-full bg-white/5"
          />
        </div>
      </div>

      {/* Animated Loading Text */}
      {text && (
        <p className="mt-10 text-lg font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse uppercase">
          {text}
        </p>
      )}
    </div>
  );
}