import { useCallback } from "react";
import { User } from "../../shared";
import { fetchCurrentUser } from "../../api";
import { useAuthenticatedApi } from "../";

export const useGetCurrentUser = () => {
  const { apiClient } = useAuthenticatedApi();

  const getCurrentUser = useCallback(async (): Promise<User> => {
    return fetchCurrentUser(apiClient);
  }, [apiClient]);

  return { getCurrentUser };
};
