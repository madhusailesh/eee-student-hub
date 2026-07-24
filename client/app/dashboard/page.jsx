"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

   
return (
  <div>
    <h1>CORE EEE Dashboard</h1>

    {user ? (
      <p>Welcome, {user.fullName}</p>
    ) : (
      <p>Welcome, Guest</p>
    )}
  </div>
);
}