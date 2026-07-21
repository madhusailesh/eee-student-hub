"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  FileQuestion,
  BookOpen,
  Video,
  ClipboardList,
  FolderOpen,
} from "lucide-react";

const resources = [
  {
    title: "Notes",
    href: "notes",
    icon: FileText,
  },
  {
    title: "PYQs",
    href: "pyqs",
    icon: FileQuestion,
  },
  {
    title: "Books",
    href: "books",
    icon: BookOpen,
  },
  {
    title: "Videos",
    href: "videos",
    icon: Video,
  },
  {
    title: "Syllabus",
    href: "syllabus",
    icon: ClipboardList,
  },
  {
    title: "Assignments",
    href: "assignments",
    icon: FolderOpen,
  },
];

export default function SubjectDashboard() {
  const { semester, subjectCode } = useParams();

  console.log(subjectCode); // ✅ yahan rakho

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{subjectCode}</h1>

        <p className="text-gray-500 mt-2">
          Semester {semester}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={`/subjects/${semester}/${subjectCode}/${item.href}`}
              className="rounded-2xl border p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Icon size={42} />

              <h2 className="mt-5 text-2xl font-semibold">
                {item.title}
              </h2>

              <p className="mt-2 text-gray-500">
                Open {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}