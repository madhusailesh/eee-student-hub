import api from "@/lib/axios";

export const getDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};