"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSubjectsBySemester } from "@/services/subjects";
import Link from "next/link";

export default function SemesterPage() {
  const { semester } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSubjectsBySemester(semester);
        setSubjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (semester) {
      load();
    }
  }, [semester]);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Semester {semester}
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link
            key={subject._id}
            href={`/subjects/${semester}/${subject.code}`}
            className="border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{subject.name}</h2>

            <p className="text-gray-600 mt-2">
              {subject.code}
            </p>

            <p className="mt-2">
              Credits: {subject.credits}
            </p>

            <p className="mt-4 text-blue-600">
              View Resources →
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}