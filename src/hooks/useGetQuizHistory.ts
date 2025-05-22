import { useCallback } from "react";
import {
  fetchQuizHistory as fetchQuizHistoryApi,
  GetQuizHistoryResponse,
} from "../api";
import { useApiClient } from "./useApiClient";

export const useGetQuizHistory = () => {
  const { apiClient } = useApiClient();

  const getQuizHistory = useCallback(
    async (
      userIds: string[] | null,
      quizIds: string[] | null,
      pageSize: number,
      pageToken: string,
    ): Promise<GetQuizHistoryResponse> => {
      return fetchQuizHistoryApi(
        userIds,
        quizIds,
        pageSize,
        pageToken,
        apiClient,
      );
    },
    [apiClient],
  );

  return { getQuizHistory };
};
