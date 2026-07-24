"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import FacultyCard from "./FacultyCard";

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    loadFaculty();
  }, []);

  async function loadFaculty() {
    try {
      const res = await api.get("/faculty");
      setFaculty(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">
        Faculty Members
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faculty.map((teacher) => (
          <FacultyCard
            key={teacher._id}
            teacher={teacher}
          />
        ))}
      </div>
    </div>
  );
}