import { useAuth } from "../AuthContext";
import { useCallback } from "react";
import { api } from "../api";
import { AxiosRequestConfig } from "axios";

export const useApiClient = () => {
  const { getAccessToken, refreshAccessToken } = useAuth();

  const fetchWithAuth = useCallback(
    async <T = any>(
      url: string,
      options: AxiosRequestConfig = {},
    ): Promise<T> => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("No access token available");
      }

      const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await api({
          ...options,
          url,
          headers,
        });
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            const newAccessToken = await getAccessToken();
            if (newAccessToken) {
              const response = await api({
                ...options,
                url,
                headers: {
                  ...options.headers,
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return response.data;
            } else {
              throw new Error("Failed to get new access token after refresh");
            }
          } else {
            throw new Error("Unauthorized and failed to refresh token");
          }
        }
        throw error;
      }
    },
    [getAccessToken, refreshAccessToken],
  );

  return { fetch: fetchWithAuth };
};
