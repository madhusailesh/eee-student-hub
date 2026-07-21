"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "@/services/dashboard";

export default function StatsCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getDashboard();
        console.log("Dashboard Response:", data);
        setStats(data.data.statistics);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading)
    return <p className="text-center">Loading statistics...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      <Card title="Notes" value={stats.notes} />
      <Card title="PYQs" value={stats.pyqs} />
      <Card title="Subjects" value={stats.subjects} />
      <Card title="Faculty" value={stats.faculty} />
      <Card title="Notices" value={stats.notices} />
      <Card title="Timetables" value={stats.timetables} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-xl bg-white shadow p-6 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-4xl font-bold mt-3 text-blue-600">
        {value}
      </p>
    </div>
  );
}