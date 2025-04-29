import { useCallback } from "react";
import { User } from "../shared/types/User.tsx";
import { fetchCurrentUser } from "../api/GET/getCurrentUser.ts";
import { useApiClient } from "./useApiClient.ts";

export const useGetCurrentUser = () => {
  const { fetch } = useApiClient();

  const getCurrentUser = useCallback(async (): Promise<User> => {
    return fetchCurrentUser(fetch);
  }, [fetch]);

  return { getCurrentUser };
};
