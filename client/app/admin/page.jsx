import Link from "next/link";
import {
  Upload,
  FolderOpen,
  LayoutDashboard,
} from "lucide-react";

const cards = [
  {
    title: "Upload Resource",
    description: "Upload Notes, PYQs, Books, Videos and more.",
    href: "/admin/upload",
    icon: Upload,
  },
  {
    title: "Manage Resources",
    description: "View, edit and delete uploaded resources.",
    href: "/admin/resources",
    icon: FolderOpen,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <LayoutDashboard className="w-9 h-9 text-blue-600" />
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to EEE Student Hub Admin Panel.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="bg-white border rounded-2xl p-6 hover:shadow-xl transition"
            >
              <Icon className="w-10 h-10 text-blue-600 mb-4" />

              <h2 className="text-2xl font-semibold">
                {card.title}
              </h2>

              <p className="text-gray-500 mt-2">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}