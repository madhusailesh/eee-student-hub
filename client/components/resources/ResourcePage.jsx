"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ResourceGrid from "./ResourceGrid";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import ResourceSkeleton from "./ResourceSkeleton";
import { FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ResourcePage({
  title = "Resources",
  type,
  semester,
  subject,
}) {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResources();
  }, [semester, subject, type]);

  useEffect(() => {
    const keyword = search.toLowerCase();

    const filtered = resources.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword)
    );

    setFilteredResources(filtered);
  }, [search, resources]);

  const fetchResources = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/resources", {
        params: {
          semester,
          subject,
          type,
        },
      });

      setResources(data.data || []);
      setFilteredResources(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-slate-200 pb-6 dark:border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-mono tracking-wider uppercase mb-1">
            <FolderGit2 className="h-4 w-4" /> Academic Vault
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:via-slate-200 dark:to-slate-400 capitalize">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse and download all verified {title.toLowerCase()} for this course.
          </p>
        </div>

        {/* Re-usable Search Bar Component */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Search ${title.toLowerCase()}...`}
        />
      </motion.div>

      {/* Main Content Area */}
      {loading ? (
        <ResourceSkeleton />
      ) : filteredResources.length === 0 ? (
        <EmptyState
          title={`No ${title}`}
          description={`No ${title.toLowerCase()} match your search query or have been uploaded yet.`}
        />
      ) : (
        <ResourceGrid resources={filteredResources} />
      )}
    </div>
  );
}