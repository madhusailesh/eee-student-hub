import Link from "next/link";

const items = [
  {
    title: "Notes",
    desc: "Study notes for all subjects",
    href: "/notes",
  },
  {
    title: "PYQs",
    desc: "Previous year question papers",
    href: "/pyqs",
  },
  {
    title: "Faculty",
    desc: "Faculty directory",
    href: "/faculty",
  },
  {
    title: "Notices",
    desc: "Department notices",
    href: "/notices",
  },
  {
    title: "Timetable",
    desc: "Semester timetable",
    href: "/timetable",
  },
];

export default function QuickAccess() {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-6">
        Quick Access
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              {item.title}
            </h3>

            <p className="text-gray-500 mt-2">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}