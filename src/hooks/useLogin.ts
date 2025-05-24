import { useCallback } from "react";
import { login as loginApi, LoginResponse } from "../api";
import { useAuth } from "./";
import { usePublicApi } from "./usePublicApi.ts";

export const useLogin = () => {
  const { apiClient } = usePublicApi();
  const { login: setAuthTokens } = useAuth();

  const login = useCallback(
    async (username: string, password: string): Promise<LoginResponse> => {
      const response = await loginApi({ username, password }, apiClient);
      setAuthTokens(
        response.accessToken,
        response.refreshToken,
        response.userId,
      );
      return response;
    },
    [apiClient, setAuthTokens],
  );

  return { login };
};
