"use client";

import { useEffect, useState } from "react";
import { Trash2, Search, FileText } from "lucide-react";
import { toast } from "sonner";

import { getResources, deleteResource } from "@/services/resources";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadResources = async () => {
    try {
      setLoading(true);

      const data = await getResources();

      setResources(data);
    } catch {
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this resource?")) return;

    try {
      await deleteResource(id);

      toast.success("Deleted");

      loadResources();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = resources.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Manage Resources</h1>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3.5 w-5 h-5" />

        <input
          className="w-full border rounded-lg py-3 pl-10"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-5 flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <FileText />

                  <h2 className="font-semibold">{item.title}</h2>
                </div>

                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Subject:</span>{" "}
                    {item.subject?.code} - {item.subject?.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Semester:</span>{" "}
                    {item.semester}
                  </p>

                  <p className="text-sm text-blue-600 capitalize">
                    <span className="font-semibold">Type:</span> {item.type}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={item.fileUrl}
                  target="_blank"
                  className="px-4 py-2 border rounded-lg"
                >
                  View
                </a>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white rounded-lg px-4 py-2 flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>
          ))}

          {!filtered.length && (
            <div className="text-center py-16 text-gray-500">
              No resources found.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
