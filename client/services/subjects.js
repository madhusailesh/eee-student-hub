import api from "@/lib/axios";

export const getSubjects = async () => {
  const { data } = await api.get("/subjects");
  return data.data;
};

export const getSubjectsBySemester = async (semester) => {
  const { data } = await api.get(`/subjects?semester=${semester}`);
  return data.data;
};