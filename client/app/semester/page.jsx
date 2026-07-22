import Link from "next/link";

const semesters = [
  { id: 1, title: "Semester 1" },
  { id: 2, title: "Semester 2" },
  { id: 3, title: "Semester 3" },
  { id: 4, title: "Semester 4" },
  { id: 5, title: "Semester 5" },
  { id: 6, title: "Semester 6" },
  { id: 7, title: "Semester 7" },
  { id: 8, title: "Semester 8" },
];

export default function SemesterPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-5">
      <h1 className="text-4xl font-bold mb-3">
        Choose Your Semester
      </h1>

      <p className="text-gray-500 mb-10">
        Select your semester to view all subjects and study resources.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {semesters.map((semester) => (
          <Link
            key={semester.id}
            href={`/semester/${semester.id}`}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8 text-center border"
          >
            <h2 className="text-2xl font-bold">
              Semester {semester.id}
            </h2>

            <p className="text-gray-500 mt-2">
              View Subjects
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}