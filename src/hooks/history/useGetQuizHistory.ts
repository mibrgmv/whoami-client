import { useCallback } from "react";
import {
  fetchQuizHistory as fetchQuizHistoryApi,
  GetQuizHistoryResponse,
} from "../../api";
import { useAuthenticatedApi } from "../";

export const useGetQuizHistory = () => {
  const { apiClient } = useAuthenticatedApi();

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
