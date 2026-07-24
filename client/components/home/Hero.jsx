"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

// Department Carousel Images
const slideImages = [
  {
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600",
    title: "Electrical & Electronics Department",
    subtitle: "Department of EEE — VSSUT Burla",
  },
  {
    url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=1600",
    title: "Advanced Power Labs & Innovation",
    subtitle: "Empowering Engineers with Practical Skills",
  },
  {
    url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1600",
    title: "Smart Learning & Academic Hub",
    subtitle: "Your Complete Academic Resource Center",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slider Effect (Changes every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slideImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slideImages.length);
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 shadow-2xl transition-all duration-300 dark:border-slate-800">
      {/* Background Image Carousel with Overlay */}
      <div className="relative h-[480px] w-full md:h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slideImages[currentIndex].url})` }}
          />
        </AnimatePresence>

        {/* Dynamic Dark Gradient Overlays for Sunlight/Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/30 dark:from-slate-950 dark:via-slate-950/80 dark:to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

        {/* Content Box Overlay */}
        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              VSSUT EEE Portal
            </span>
          </motion.div>

          {/* Main Titles & CTAs */}
          <div className="max-w-2xl space-y-4">
            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                CORE EEE!
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-slate-300 sm:text-lg md:text-xl font-medium"
            >
              Access Notes, PYQs, Timetables, Faculty Details and Notices — all in one unified digital space.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <Link
                href="/semester"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:opacity-95 hover:shadow-cyan-500/40 active:scale-95"
              >
                <BookOpen className="h-4 w-4" />
                <span>Explore Semesters</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/notices"
                className="rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800/80 hover:text-white active:scale-95"
              >
                Latest Notices
              </Link>
            </motion.div>
          </div>

          {/* Bottom Slider Controls & Indicator Indicators */}
          <div className="flex items-center justify-between pt-4">
            
            {/* Slide Indicators / Lines */}
            <div className="flex items-center gap-2">
              {slideImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-cyan-400"
                      : "w-2 bg-slate-600 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/60 text-slate-300 backdrop-blur-md transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/60 text-slate-300 backdrop-blur-md transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}