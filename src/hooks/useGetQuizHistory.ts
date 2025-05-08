import { useCallback } from "react";
import {
  fetchQuizHistory as fetchQuizHistoryApi,
  GetQuizHistoryResponse,
} from "../api/GET/getQuizHistory.ts";
import { useApiClient } from "./useApiClient";

export const useGetQuizHistory = () => {
  const { fetch } = useApiClient();

  const getQuizHistory = useCallback(
    async (
      userId: string | null,
      quizId: string | null,
      pageSize: number,
      pageToken: string,
    ): Promise<GetQuizHistoryResponse> => {
      return fetchQuizHistoryApi(userId, quizId, pageSize, pageToken, fetch);
    },
    [fetch],
  );

  return { getQuizHistory };
};
