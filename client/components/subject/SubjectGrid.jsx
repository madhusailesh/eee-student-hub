import Link from "next/link";

export default function SubjectGrid({
  semester,
  subject,
}) {

  const cards = [
    {
      title: "Notes",
      icon: "📚",
      href: `/semester/${semester}/${subject.code}/notes`,
    },
    {
      title: "PYQs",
      icon: "📄",
      href: `/semester/${semester}/${subject.code}/pyqs`,
    },
    {
      title: "Books",
      icon: "📘",
      href: `/semester/${semester}/${subject.code}/books`,
    },
    {
      title: "Assignments",
      icon: "📝",
      href: `/semester/${semester}/${subject.code}/assignments`,
    },
    {
      title: "Faculty",
      icon: "👨‍🏫",
      href: `/semester/${semester}/${subject.code}/faculty`,
    },
    {
      title: "Syllabus",
      icon: "📑",
      href: `/semester/${semester}/${subject.code}/syllabus`,
    },
    {
      title: "Timetable",
      icon: "🗓",
      href: `/semester/${semester}/${subject.code}/timetable`,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {cards.map((card) => (
        <Link
          key={card.title}
          href={card.href}
          className="rounded-2xl border bg-white p-8 hover:shadow-xl transition"
        >
          <div className="text-5xl">
            {card.icon}
          </div>

          <h2 className="text-2xl font-bold mt-4">
            {card.title}
          </h2>

          <p className="text-gray-500 mt-2">
            Open {card.title}
          </p>

        </Link>
      ))}

    </div>
  );
}