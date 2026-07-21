import api from "@/lib/axios";

export const getSubjects = async () => {
  const { data } = await api.get("/subjects");
  return data.data;
};