import api from "@/lib/axios";

export const getNotesBySubject = async (subjectId) => {
  const { data } = await api.get(`/notes?subject=${subjectId}`);
  return data.data;
};