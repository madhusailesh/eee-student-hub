import api from "@/lib/axios";

const endpointMap = {
  notes: "/notes",
  pyqs: "/pyqs",
  books: "/books",
  videos: "/videos",
  assignments: "/assignments",
  syllabus: "/syllabus",
};

export const uploadResource = async (type, formData) => {
  const { data } = await api.post(endpointMap[type], formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
};