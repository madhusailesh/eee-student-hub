"use client";

import { useParams } from "next/navigation";

export default function NotesPage() {
  const { subjectCode } = useParams();

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold">
        {subjectCode} Notes
      </h1>

      <p className="text-gray-500 mt-3">
        Notes will be loaded from MongoDB.
      </p>
    </main>
  );
}