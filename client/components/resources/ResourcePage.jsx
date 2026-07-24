"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import ResourceGrid from "./ResourceGrid";
import EmptyState from "./EmptyState";
import { Search } from "lucide-react";

export default function ResourcePage({
  title,
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

      setResources(data.data);
      setFilteredResources(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        Loading {title}...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <p className="text-gray-500">
            Browse all available {title.toLowerCase()}.
          </p>
        </div>

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder={`Search ${title}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {filteredResources.length === 0 ? (
        <EmptyState
          title={`No ${title}`}
          description={`No ${title.toLowerCase()} have been uploaded yet.`}
        />
      ) : (
        <ResourceGrid resources={filteredResources} />
      )}
    </div>
  );
}