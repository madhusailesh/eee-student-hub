"use client";

export default function StatsCards({ stats }) {
  const cards = [
    { title: "Notes", value: stats.notes },
    { title: "PYQs", value: stats.pyqs },
    { title: "Faculty", value: stats.faculty },
    { title: "Subjects", value: stats.subjects },
    { title: "Notices", value: stats.notices },
    { title: "Timetables", value: stats.timetables },
  ];

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <h3 className="text-gray-500">{card.title}</h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}