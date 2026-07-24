"use client";

import { useEffect, useState } from "react";
import { 
  Trash2, 
  Search, 
  FileText, 
  ExternalLink, 
  FolderOpen, 
  Layers, 
  ArrowLeft,
  Filter,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { getResources, deleteResource } from "@/services/resources";

const TYPES = ["all", "notes", "pyqs", "books", "videos", "assignments", "syllabus"];

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadResources = async () => {
    try {
      setLoading(true);
      const data = await getResources();
      setResources(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resources");
    } fontally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resource permanentely?")) return;

    try {
      setDeletingId(id);
      await deleteResource(id);
      toast.success("Resource deleted successfully");
      setResources((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete resource");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = resources.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.subject?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.subject?.code?.toLowerCase().includes(search.toLowerCase());

    const matchesType = selectedType === "all" || item.type?.toLowerCase() === selectedType;

    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type) => {
    switch (type?.toLowerCase()) {
      case "notes":
        return "bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 border-purple-500/20";
      case "pyqs":
        return "bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400 border-cyan-500/20";
      case "books":
        return "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400 border-slate-500/20";
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-slate-50/60 px-4 py-8 md:px-8 md:py-12 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-white">
      
      {/* Ambient Glows */}
      <div className="fixed -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">
        
        {/* Top Header Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-6 dark:border-slate-800">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 mb-2 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Admin Panel</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <FolderOpen className="h-7 w-7 text-cyan-500" />
              Manage Uploaded Resources
            </h1>
          </div>

          <Link
            href="/admin/upload"
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition-all hover:opacity-90 active:scale-95"
          >
            + Upload New Resource
          </Link>
        </div>

        {/* Filter Toolbar: Search Bar + Type Badges */}
        <div className="space-y-4">
          
          {/* Search Bar Input */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              className="w-full rounded-2xl border border-slate-200/80 bg-white/80 py-3 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500"
              placeholder="Search by title, subject code, or subject name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Type Filter Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 pr-2 border-r border-slate-200 dark:border-slate-800 shrink-0">
              <Filter className="h-3.5 w-3.5" /> Filter:
            </span>
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold capitalize transition-all shrink-0 ${
                  selectedType === t
                    ? "bg-cyan-500 text-white shadow-sm"
                    : "border border-slate-200/80 bg-white/60 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

        </div>

        {/* Content List Area */}
        {loading ? (
          <ResourcesSkeleton />
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-xl transition-all hover:border-cyan-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80 transform-gpu"
                >
                  {/* Resource Details */}
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {item.title}
                        </h2>
                        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${getTypeBadge(item.type)}`}>
                          {item.type}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                        {item.subject && (
                          <span className="flex items-center gap-1">
                            <strong className="text-slate-700 dark:text-slate-300">Subject:</strong>{" "}
                            {item.subject.code} - {item.subject.name}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Layers className="h-3 w-3 text-cyan-500" />
                          <strong className="text-slate-700 dark:text-slate-300">Semester:</strong> {item.semester}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-cyan-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400 transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>View PDF</span>
                    </a>

                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-500/20 dark:text-rose-400 transition-all disabled:opacity-50"
                    >
                      {deletingId === item._id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {!filtered.length && (
              <div className="rounded-3xl border border-slate-200/80 bg-white/50 p-12 text-center backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/40">
                <FolderOpen className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 mb-3" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No resources found</h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Try adjusting your search query or type filter criteria.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}

{/* Loading Skeleton Component */}
function ResourcesSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/50 p-5 shadow-sm backdrop-blur-md animate-pulse dark:border-slate-800 dark:bg-slate-900/40"
        >
          <div className="flex items-center gap-3.5 w-full sm:w-2/3">
            <div className="h-11 w-11 shrink-0 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2 w-full">
              <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="h-9 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-9 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}