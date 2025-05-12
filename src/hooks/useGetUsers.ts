import { useCallback } from "react";
import { getUsers as getUsersApi, GetUsersResponse } from "../api";
import { useApiClient } from "./useApiClient";

export const useGetUsers = () => {
  const { fetch } = useApiClient();

  const getUsers = useCallback(
    async (pageSize: number, pageToken: string): Promise<GetUsersResponse> => {
      return getUsersApi(pageSize, pageToken, fetch);
    },
    [fetch],
  );

  return { getUsers };
};
