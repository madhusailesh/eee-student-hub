"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2, 
  ArrowLeft,
  BookOpen,
  Layers,
  Tag,
  AlignLeft,
  FileCheck
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { getSubjectsBySemester } from "@/services/subjects";
import { uploadResource } from "@/services/resources";

export default function UploadPage() {
  const fileRef = useRef(null);

  const [semester, setSemester] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("notes");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!semester) {
      setSubjects([]);
      setSubject("");
      return;
    }

    async function loadSubjects() {
      try {
        setLoadingSubjects(true);
        const data = await getSubjectsBySemester(semester);
        setSubjects(data);
      } catch {
        toast.error("Failed to load subjects for this semester");
      } finally {
        setLoadingSubjects(false);
      }
    }

    loadSubjects();
  }, [semester]);

  const resetForm = () => {
    setSemester("");
    setSubjects([]);
    setSubject("");
    setType("notes");
    setTitle("");
    setDescription("");
    setFile(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        toast.error("Only PDF files are allowed!");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!semester) return toast.error("Please select a semester.");
    if (!subject) return toast.error("Please select a subject.");
    if (!title.trim()) return toast.error("Please enter a title.");
    if (!file) return toast.error("Please upload a PDF file.");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("semester", semester);
    formData.append("subject", subject);
    formData.append("type", type);
    formData.append("file", file);

    try {
      setLoading(true);

      await uploadResource(formData);

      toast.success("Resource uploaded successfully! 🎉");
      resetForm();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Upload failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-4rem)] bg-slate-50/60 px-4 py-8 md:px-8 md:py-12 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100 selection:bg-cyan-500 selection:text-white">
      
      {/* GPU Accelerated Ambient Glows */}
      <div className="fixed -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />
      <div className="fixed -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-[90px] pointer-events-none transform-gpu will-change-transform" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:text-cyan-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Admin Dashboard</span>
          </Link>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Admin Management
          </span>
        </div>

        {/* Main Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 md:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-2xl dark:shadow-cyan-950/20 transform-gpu"
        >
          {/* Header Title */}
          <div className="mb-8 border-b border-slate-200/80 pb-6 dark:border-slate-800">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
              Upload Learning Resource
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Add new notes, PYQs, books, or lab sheets for EEE students
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Grid 1: Semester & Subject Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Semester Select */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  <Layers className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Semester</span>
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
                >
                  <option value="" className="dark:bg-slate-900">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem} className="dark:bg-slate-900">
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Select */}
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Subject</span>
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={!semester || loadingSubjects}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
                  >
                    <option value="" className="dark:bg-slate-900">
                      {loadingSubjects ? "Loading subjects..." : "Select Subject"}
                    </option>
                    {subjects.map((item) => (
                      <option key={item._id} value={item._id} className="dark:bg-slate-900">
                        {item.code} - {item.name}
                      </option>
                    ))}
                  </select>
                  {loadingSubjects && (
                    <Loader2 className="absolute right-3.5 top-3.5 h-4 w-4 animate-spin text-cyan-500" />
                  )}
                </div>
              </div>

            </div>

            {/* Grid 2: Resource Type & Title */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Type Select */}
              <div className="md:col-span-1">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  <Tag className="h-3.5 w-3.5 text-purple-500" />
                  <span>Resource Type</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
                >
                  <option value="notes" className="dark:bg-slate-900">Notes</option>
                  <option value="pyqs" className="dark:bg-slate-900">PYQs</option>
                  <option value="books" className="dark:bg-slate-900">Books</option>
                  <option value="videos" className="dark:bg-slate-900">Videos</option>
                  <option value="assignments" className="dark:bg-slate-900">Assignments</option>
                  <option value="syllabus" className="dark:bg-slate-900">Syllabus</option>
                </select>
              </div>

              {/* Title Input */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  <FileText className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Document Title</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Module 1 - Power Electronics Handwritten Notes"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
                />
              </div>

            </div>

            {/* Description Area */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                <AlignLeft className="h-3.5 w-3.5 text-amber-500" />
                <span>Description (Optional)</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add topics covered or key highlights..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-3 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur-md transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 resize-none dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-cyan-500 dark:focus:bg-slate-950"
              />
            </div>

            {/* Interactive File Dropzone */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                <FileCheck className="h-3.5 w-3.5 text-rose-500" />
                <span>Upload PDF Document</span>
              </label>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-cyan-500 bg-cyan-500/10"
                    : file
                    ? "border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-500/10"
                    : "border-slate-300/80 bg-slate-50/50 hover:border-cyan-500/50 hover:bg-cyan-500/5 dark:border-slate-800 dark:bg-slate-950/30 dark:hover:border-cyan-500/50"
                }`}
              >
                {file ? (
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100 max-w-[250px] sm:max-w-md truncate">
                        {file.name}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB PDF
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      className="ml-4 rounded-xl p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
                      title="Remove PDF"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600 shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-cyan-500/20 dark:text-cyan-400">
                      <UploadCloud className="h-7 w-7" />
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Click or drag & drop PDF here
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Maximum file size limit: 20 MB
                    </p>
                  </>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading Resource...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="h-4 w-4" />
                  <span>Publish Resource</span>
                </>
              )}
            </button>

          </form>
        </motion.div>

      </div>
    </main>
  );
}