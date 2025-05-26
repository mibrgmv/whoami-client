import { useCallback } from "react";
import { createQuiz as createQuizApi } from "../../api";
import { Quiz } from "../../shared";
import { useAuthenticatedApi } from "../useAuthenticatedApi.ts";

export const useCreateQuiz = () => {
  const { apiClient } = useAuthenticatedApi();

  const createQuiz = useCallback(
    async (title: string, results: string[]): Promise<Quiz> => {
      return createQuizApi({ title, results }, apiClient);
    },
    [apiClient],
  );

  return { createQuiz };
};
