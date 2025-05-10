import { useCallback } from "react";
import { register as registerApi } from "../api/POST/register";
import { User } from "../shared/types";
import { useApiClient } from "./useApiClient";

export const useRegister = () => {
  const { fetch } = useApiClient();

  const register = useCallback(
    async (username: string, password: string): Promise<User> => {
      return await registerApi({ username, password });
    },
    [fetch],
  );

  return { register };
};
