import api from "@/lib/axios";

export const getNotes = async (subjectCode) => {
  const { data } = await api.get(
    `/notes?subjectCode=${subjectCode}`
  );

  return data.data;
};