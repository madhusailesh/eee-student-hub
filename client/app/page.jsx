"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/home/Hero";
import StatsCards from "@/components/home/StatsCards";
import { getDashboardData } from "@/services/dashboard";
import QuickAccess from "@/components/home/QuickAccess";
export default function HomePage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardData();
        setDashboard(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  if (!dashboard) {
    return (
      <div className="max-w-7xl mx-auto py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <Hero />

      <StatsCards stats={dashboard.statistics} />
      <QuickAccess />
    </div>
  );
}