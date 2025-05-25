import { useCallback } from "react";
import {
  createQuiz as createQuizApi,
  CreateQuizRequest,
} from "../../api";
import { Quiz } from "../../shared";

export const useCreateQuiz = () => {

  const createQuiz = useCallback(
    async (quizData: CreateQuizRequest): Promise<Quiz> => {
      return createQuizApi(quizData, fetch);
    },
    [fetch],
  );

  return { createQuiz };
};
