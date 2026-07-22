"use client";

import { useEffect, useState } from "react";
import { getAllNotes, deleteNote } from "@/services/adminResources";
import {
  Search,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export default function ResourcesPage() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  async function loadNotes() {
    try {
      const data = await getAllNotes();
      setNotes(data);
    } catch {
      toast.error("Failed to load resources");
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this resource?")) return;

    try {
      await deleteNote(id);

      toast.success("Deleted");

      loadNotes();
    } catch {
      toast.error("Delete Failed");
    }
  }

  const filtered = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="max-w-7xl mx-auto py-10 px-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Resources
        </h1>

      </div>

      <div className="relative mb-8">

        <Search
          className="absolute left-3 top-3.5"
          size={18}
        />

        <input
          placeholder="Search..."
          className="w-full border rounded-xl pl-10 pr-4 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="space-y-5">

        {filtered.map((note) => (

          <div
            key={note._id}
            className="border rounded-2xl p-6 flex justify-between items-center"
          >

            <div>

              <div className="flex gap-3 items-center">

                <FileText />

                <h2 className="text-xl font-semibold">
                  {note.title}
                </h2>

              </div>

              <p className="text-gray-500 mt-2">
                {note.subject?.code} • Semester {note.semester}
              </p>

            </div>

            <div className="flex gap-3">

              <a
                href={note.fileUrl}
                target="_blank"
                className="p-3 rounded-lg border hover:bg-gray-100"
              >
                <Eye size={20} />
              </a>

              <button
                onClick={() => handleDelete(note._id)}
                className="p-3 rounded-lg border text-red-600 hover:bg-red-50"
              >
                <Trash2 size={20} />
              </button>

            </div>

          </div>

        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No Resources Found
          </div>
        )}

      </div>

    </main>
  );
}