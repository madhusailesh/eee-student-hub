import api from "@/lib/axios";

export const uploadNote = async (formData) => {
  const { data } = await api.post(
    "/notes",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data;
};