import { useCallback } from "react";
import { Quiz } from "../shared";
import { getQuizById as getQuizByIdApi } from "../api";
import { useAuthenticatedApi } from "./";

export const useGetQuizById = () => {
  const { apiClient } = useAuthenticatedApi();

  const getQuiz = useCallback(
    async (quizId: string): Promise<Quiz | null> => {
      return getQuizByIdApi(quizId, apiClient);
    },
    [apiClient],
  );

  return { getQuiz };
};
