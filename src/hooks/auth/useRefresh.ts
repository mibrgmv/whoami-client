import { useCallback } from "react";
import { refresh as refreshApi, RefreshResponse } from "../../api";
import { usePublicApi } from "../";

export const useRefresh = () => {
  const { apiClient } = usePublicApi();

  const refresh = useCallback(
    async (refreshToken: string): Promise<RefreshResponse> => {
      return refreshApi({ refreshToken }, apiClient);
    },
    [apiClient],
  );

  return { refresh };
};
