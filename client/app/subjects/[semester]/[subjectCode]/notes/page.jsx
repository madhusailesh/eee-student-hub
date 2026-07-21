"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSubjectByCode } from "@/services/subjects";
import { getNotes } from "@/services/notes";

export default function NotesPage() {
  const { subjectCode } = useParams();

  const [subject, setSubject] = useState(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const subjectData = await getSubjectByCode(subjectCode);
        setSubject(subjectData);

        const noteData = await getNotes(subjectData._id);
        setNotes(noteData);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [subjectCode]);

  if (!subject) {
    return <p>Loading...</p>;
  }

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        {subject.name} Notes
      </h1>

      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="border rounded-xl p-5"
          >
            <h2 className="text-xl font-semibold">
              {note.title}
            </h2>

            <p className="text-gray-500 mt-2">
              {note.description}
            </p>

            <a
              href={note.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 mt-4 inline-block"
            >
              Download
            </a>
          </div>
        ))}

        {notes.length === 0 && (
          <p className="text-gray-500">
            No notes available for this subject.
          </p>
        )}
      </div>
    </main>
  );
}