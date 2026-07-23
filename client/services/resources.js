import api from "@/lib/axios";

export const uploadResource = async (formData) => {
  const { data } = await api.post("/resources", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};

export const getResources = async (params = {}) => {
  const { data } = await api.get("/resources", { params });
  return data.data;
};

export const deleteResource = async (id) => {
  const { data } = await api.delete(`/resources/${id}`);
  return data;
};

export const updateResource = async (id, formData) => {
  const { data } = await api.put(`/resources/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};