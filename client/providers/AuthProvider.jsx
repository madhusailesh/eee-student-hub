"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Helper function: Client-side non-httpOnly cookies clear karne ke liye
  const clearClientCookies = () => {
    if (typeof document !== "undefined") {
      const cookies = ["accessToken", "refreshToken", "token"];
      cookies.forEach((cookieName) => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      });
    }
  };

  // 🔴 Fetch Current Authenticated User
  const fetchUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error("Fetch user error:", err);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔴 Instant & Complete Logout Handler
  const logout = async () => {
    // 1. Instantly set user state to null (Navbar instantly changes to 'Login')
    setUser(null);

    // 2. Clear LocalStorage and SessionStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
    }

    // 3. Clear document cookies (client side)
    clearClientCookies();

    // 4. Hit Backend API to clear HttpOnly server cookies & DB RefreshToken
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout API Error (Server side cleanup failed):", err);
    } finally {
      // 5. Navigate to login page
      router.push("/login");
      router.refresh();
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);