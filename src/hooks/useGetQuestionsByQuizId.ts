import { useCallback } from "react";
import {
  getQuestionsByQuizId as getQuestionsByQuizIdApi,
  GetQuestionsByQuizIdResponse,
} from "../api";
import { useAuthenticatedApi } from "./";

export const useGetQuestionsByQuizId = () => {
  const { apiClient } = useAuthenticatedApi();

  const getQuestions = useCallback(
    async (quizId: string): Promise<GetQuestionsByQuizIdResponse> => {
      return getQuestionsByQuizIdApi(quizId, apiClient);
    },
    [apiClient],
  );

  return { getQuestions };
};
