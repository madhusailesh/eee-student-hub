import api from "@/lib/axios";

export const getDashboardData = async () => {
  const res = await api.get("/dashboard");
  return res.data.data;
};