import { useCallback } from "react";
import { register as registerApi } from "../api/POST/register";
import { User } from "../shared";
import { usePublicApi } from "./usePublicApi.ts";

export const useRegister = () => {
  const { apiClient } = usePublicApi();

  const register = useCallback(
    async (username: string, password: string): Promise<User> => {
      return await registerApi({ username, password }, apiClient);
    },
    [apiClient],
  );

  return { register };
};
