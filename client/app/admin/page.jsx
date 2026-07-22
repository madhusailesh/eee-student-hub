import Link from "next/link";

export default function AdminDashboard() {
  const cards = [
    {
      title: "Upload Resource",
      href: "/admin/upload",
    },
    {
      title: "Manage Resources",
      href: "/admin/resources",
    },
    {
      title: "Manage Subjects",
      href: "/admin/subjects",
    },
    {
      title: "Manage Notices",
      href: "/admin/notices",
    },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-xl border p-8 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold">
              {card.title}
            </h2>
          </Link>
        ))}

      </div>
    </>
  );
}