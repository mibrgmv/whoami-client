import { useCallback } from "react";
import { getQuizById as getQuizByIdApi } from "../api";
import { Quiz } from "../shared/types";
import { useApiClient } from "./useApiClient";

export const useGetQuizById = () => {
  const { fetch } = useApiClient();

  const getQuiz = useCallback(
    async (quizId: string): Promise<Quiz | null> => {
      return getQuizByIdApi(quizId, fetch);
    },
    [fetch],
  );

  return { getQuiz };
};
