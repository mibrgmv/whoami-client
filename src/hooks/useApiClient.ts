import { useAuth } from "../AuthContext";
import { useCallback } from "react";

export const useApiClient = () => {
  const { getAccessToken, refreshAccessToken } = useAuth();

  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit = {}): Promise<Response> => {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("No access token available");
      }

      const authorizedOptions: RequestInit = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, authorizedOptions);

      if (response.status === 401) {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          const newAccessToken = await getAccessToken();
          if (newAccessToken) {
            const retryOptions: RequestInit = {
              ...options,
              headers: {
                ...options.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            };
            return fetch(url, retryOptions);
          } else {
            throw new Error("Failed to get new access token after refresh");
          }
        } else {
          throw new Error("Unauthorized and failed to refresh token");
        }
      }

      return response;
    },
    [getAccessToken, refreshAccessToken],
  );

  return { fetch: fetchWithAuth };
};
