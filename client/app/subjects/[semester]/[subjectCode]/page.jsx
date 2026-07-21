"use client";

import { useParams } from "next/navigation";

const resources = [
  {
    title: "Notes",
    icon: "📄",
    href: "notes",
  },
  {
    title: "PYQs",
    icon: "📝",
    href: "pyqs",
  },
  {
    title: "Books",
    icon: "📚",
    href: "books",
  },
  {
    title: "Videos",
    icon: "🎥",
    href: "videos",
  },
  {
    title: "Syllabus",
    icon: "📋",
    href: "syllabus",
  },
  {
    title: "Assignments",
    icon: "📂",
    href: "assignments",
  },
];

export default function SubjectPage() {
  const { semester, subjectCode } = useParams();

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold">
        {subjectCode}
      </h1>

      <p className="text-gray-600 mt-2">
        Semester {semester}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {resources.map((item) => (
          <div
            key={item.href}
            className="border rounded-xl p-6 shadow hover:shadow-lg cursor-pointer transition"
          >
            <div className="text-5xl">{item.icon}</div>

            <h2 className="text-2xl font-semibold mt-4">
              {item.title}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
}