import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Login / Me / Refresh requests ko retry mat karo
    if (
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/me") ||
      originalRequest?.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Backend refreshToken cookie read karega
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Naya accessToken cookie me aa chuka hoga
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;