import { useCallback } from "react";
import { getUsers as getUsersApi, GetUsersResponse } from "../api";
import { useAuthenticatedApi } from "./";

export const useGetUsers = () => {
  const { apiClient } = useAuthenticatedApi();

  const getUsers = useCallback(
    async (pageSize: number, pageToken: string): Promise<GetUsersResponse> => {
      return getUsersApi(pageSize, pageToken, apiClient);
    },
    [apiClient],
  );

  return { getUsers };
};
