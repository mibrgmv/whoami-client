import { useCallback } from "react";
import { register as registerApi } from "../api/POST/register";
import { User } from "../shared/types";

export const useRegister = () => {
  const register = useCallback(
    async (username: string, password: string): Promise<User> => {
      return await registerApi({ username, password });
    },
    [],
  );

  return { register };
};
