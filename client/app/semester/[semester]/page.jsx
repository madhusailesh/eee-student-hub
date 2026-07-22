import Link from "next/link";
import { getSubjectsBySemester } from "@/services/subjects";

export default async function SemesterPage({ params }) {
  const { semester } = await params;

  const subjects = await getSubjectsBySemester(semester);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Semester {semester}
        </h1>

        <p className="text-gray-500 mt-2">
          Select a subject
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {subjects.map((subject) => (
          <Link
            key={subject._id}
            href={`/semester/${semester}/${subject.code}`}
            className="rounded-2xl border bg-white p-6 shadow hover:shadow-xl transition"
          >
            <h2 className="text-2xl font-semibold">
              {subject.name}
            </h2>

            <p className="mt-2 text-gray-500">
              {subject.code}
            </p>

            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>{subject.type}</span>

              <span>{subject.credits} Credits</span>
            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}