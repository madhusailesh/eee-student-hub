"use client";

import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-700 text-white shadow">
      <div className="max-w-7xl mx-auto px-5 h-16 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          EEE Student Hub
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/semester">Semester</Link>
 

          <Link href="/faculty">Faculty</Link>

          <Link href="/notices">Notices</Link>
 

          {user ? (
            <Link href="/profile">{user.fullName}</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
