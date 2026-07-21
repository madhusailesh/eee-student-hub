import { isLoggedIn } from "@/lib/auth";

export default function useAuth() {
  return {
    isAuthenticated: isLoggedIn(),
  };
}