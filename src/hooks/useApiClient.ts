import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuth } from "./useAuth";
import { useCallback, useRef } from "react";

export const useApiClient = () => {
  const { getAccessToken, refreshAccessToken } = useAuth();
  const axiosInstanceRef = useRef<AxiosInstance | null>(null);

  const createAxiosInstance = useCallback(() => {
    if (axiosInstanceRef.current) {
      return axiosInstanceRef.current;
    }

    const instance = axios.create({
      // Add your base URL here if needed
      // baseURL: 'https://your-api-base-url.com',
      timeout: 10000,
    });

    // Request interceptor to add auth token
    instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = await getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor to handle 401 and refresh token
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshed = await refreshAccessToken();
            if (refreshed) {
              const newAccessToken = await getAccessToken();
              if (newAccessToken) {
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return instance(originalRequest);
              } else {
                throw new Error("Failed to get new access token after refresh");
              }
            } else {
              throw new Error("Unauthorized and failed to refresh token");
            }
          } catch (refreshError) {
            // Handle refresh failure (e.g., redirect to login)
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );

    axiosInstanceRef.current = instance;
    return instance;
  }, [getAccessToken, refreshAccessToken]);

  const apiClient = createAxiosInstance();

  return { apiClient };
};
