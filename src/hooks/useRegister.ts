import { useCallback } from "react";
import { register as registerApi } from "../api";
import { User } from "../shared";
import { usePublicApi } from "./usePublicApi";

export const useRegister = () => {
  const { apiClient } = usePublicApi();

  const register = useCallback(
    async (username: string, password: string): Promise<User> => {
      return registerApi({ username, password }, apiClient);
    },
    [apiClient],
  );

  return { register };
};
