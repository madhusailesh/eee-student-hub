"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!user) {
    return <h2>Unauthorized</h2>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Welcome {user.fullName}
      </h1>

      <p>{user.email}</p>

      <p>Role : {user.role}</p>
    </div>
  );
}