import { useAuth } from "./useAuth";
import { useMemo } from "react";
import axios from "axios";

export const useAuthenticatedApi = () => {
  const { getAccessToken, refreshAccessToken } = useAuth();

  const apiClient = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    instance.interceptors.request.use(async (config) => {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    instance.interceptors.response.use(
      (response) => response,
        async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
              const newToken = await getAccessToken();
              if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
              }
            }
          } catch (error) {
            return Promise.reject(error);
          }
        }

        const errorMessage =
          error.response?.data?.message || "An error occurred";

        return Promise.reject(new Error(errorMessage));
      },
    );

    return instance;
  }, [getAccessToken, refreshAccessToken]);

  return { apiClient };
};
