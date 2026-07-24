import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-blue-700 text-white rounded-2xl p-10">
      <h1 className="text-5xl font-bold">
        EEE Student Hub
      </h1>

      <p className="mt-4 text-lg text-blue-100">
        Access Notes, PYQs, Timetable, Faculty Details and Notices — all in one place.
      </p>

      <div className="flex gap-4 mt-8">
        <Link
          href="/semester"
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          Explore semesters
        </Link>

        
      </div>
    </section>
  );
}