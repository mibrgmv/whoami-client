import { useCallback } from "react";
import { User } from "../shared/types";
import { fetchCurrentUser } from "../api";
import { useApiClient } from "./useApiClient.ts";

export const useGetCurrentUser = () => {
  const { fetch } = useApiClient();

  const getCurrentUser = useCallback(async (): Promise<User> => {
    return fetchCurrentUser(fetch);
  }, [fetch]);

  return { getCurrentUser };
};
