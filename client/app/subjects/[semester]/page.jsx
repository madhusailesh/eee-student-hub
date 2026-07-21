"use client";

import { useParams } from "next/navigation";

export default function SemesterPage() {
  const { semester } = useParams();

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold">
        Semester {semester}
      </h1>

      <p className="mt-4 text-gray-600">
        Subjects of Semester {semester} will appear here.
      </p>
    </main>
  );
}