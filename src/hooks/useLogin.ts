import { useCallback } from "react";
import { login as loginApi, LoginResponse } from "../api/POST/login";
import { useAuth } from "../AuthContext";
import { useApiClient } from "./useApiClient";

export const useLogin = () => {
  const { fetch } = useApiClient();
  const { login: authLogin } = useAuth();

  const login = useCallback(
    async (username: string, password: string): Promise<LoginResponse> => {
      const response = await loginApi({ username, password });
      authLogin(response.accessToken, response.refreshToken, response.userId);
      return response;
    },
    [authLogin, fetch],
  );

  return { login };
};
