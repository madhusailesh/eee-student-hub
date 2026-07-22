"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Upload,
  FolderOpen,
  BookOpen,
  Bell,
  LayoutDashboard,
} from "lucide-react";

const menus = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Upload",
    href: "/admin/upload",
    icon: Upload,
  },
  {
    title: "Resources",
    href: "/admin/resources",
    icon: FolderOpen,
  },
  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: BookOpen,
  },
  {
    title: "Notices",
    href: "/admin/notices",
    icon: Bell,
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">

      <aside className="w-64 border-r bg-white">

        <div className="p-6 border-b">

          <h1 className="text-2xl font-bold">
            Admin Panel
          </h1>

        </div>

        <nav className="p-4 space-y-2">

          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}

        </nav>

      </aside>

      <main className="flex-1 bg-gray-50 p-8">
        {children}
      </main>

    </div>
  );
}