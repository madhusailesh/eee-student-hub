"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const res = await login({
      email,
      password,
    });

    console.log(res);

    const user = res.data;

    // Save data
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect according to role
    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

  } catch (err) {
    console.log(err);
  console.log(err.response);
  console.log(err.response?.data);
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold text-center mb-6">
        CORE EEE Login
      </h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label>Email</label>

          <input
            type="email"
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            className="w-full border rounded-lg p-3 mt-1"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}