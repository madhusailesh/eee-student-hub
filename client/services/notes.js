import api from "@/lib/axios";

export const getNotes = async (subjectId) => {
  const { data } = await api.get("/notes", {
    params: {
      subject: subjectId,
    },
  });

  return data.data;
};