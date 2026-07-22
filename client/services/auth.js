import api from "@/lib/axios"; 
 
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const signup = async (data) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await api.post("/auth/verify-otp", data);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};