import { useMemo } from "react";
import axios from "axios";

export const usePublicApi = () => {
  const apiClient = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "json",
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        return Promise.reject(new Error(errorMessage));
      },
    );

    return instance;
  }, []);

  return { apiClient };
};
