import { useCallback } from "react";
import {
  getQuizzes as getQuizzesApi,
  GetQuizzesResponse,
} from "../../api";
import { usePublicApi } from "../";

export const useGetQuizzes = () => {
  const { apiClient } = usePublicApi();

  const getQuizzes = useCallback(
    async (pageSize: number, pageToken: string): Promise<GetQuizzesResponse> => {
      return getQuizzesApi(pageSize, pageToken, apiClient);
    },
    [apiClient],
  );

  return { getQuizzes };
};
