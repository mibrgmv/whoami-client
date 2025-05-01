import { useCallback } from "react";
import {
  createQuiz as createQuizApi,
  CreateQuizRequest,
} from "../api/POST/createQuiz.ts";
import { Quiz } from "../shared/types/Quiz.tsx";
import { useApiClient } from "./useApiClient";

export const useCreateQuiz = () => {
  const { fetch } = useApiClient();

  const createQuiz = useCallback(
    async (quizData: CreateQuizRequest): Promise<Quiz> => {
      return createQuizApi(quizData, fetch);
    },
    [fetch],
  );

  return { createQuiz };
};
