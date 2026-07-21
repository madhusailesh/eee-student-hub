"use client";

import { useEffect, useState } from "react";
import { getSubjects } from "@/services/subjects";
import Link from "next/link";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p className="p-8">Loading...</p>;

  const semesters = {};

  subjects.forEach((subject) => {
    if (!semesters[subject.semester]) {
      semesters[subject.semester] = [];
    }

    semesters[subject.semester].push(subject);
  });

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Subjects</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(semesters)
          .sort((a, b) => a - b)
          .map((semester) => (
            <Link
              key={semester}
              href={`/subjects/${semester}`}
              className="border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold">
                Semester {semester}
              </h2>

              <p className="mt-4 text-gray-600">
                {semesters[semester].length} Subjects
              </p>

              <p className="mt-6 text-blue-600 font-medium">
                View Subjects →
              </p>
            </Link>
          ))}
      </div>
    </main>
  );
}