import { useCallback } from "react";
import { createUser as createUserApi } from "../../api";
import { User } from "../../shared";
import { usePublicApi } from "../";

export const useCreateUser = () => {
  const { apiClient } = usePublicApi();

  const createUser = useCallback(
    async (username: string, password: string): Promise<User> => {
      return createUserApi({ username, password }, apiClient);
    },
    [apiClient],
  );

  return { createUser };
};
