import api from "@/lib/axios";

export const getAllNotes = async () => {
  const { data } = await api.get("/notes");
  return data.data;
};

export const deleteNote = async (id) => {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
};