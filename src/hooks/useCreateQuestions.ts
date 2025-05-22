import { useCallback } from "react";
import { useApiClient } from "./useApiClient";
import {
  createQuestions as createQuestionsApi,
  CreateQuestionRequest,
  Question,
} from "../api";

export const useCreateQuestions = () => {
  const { fetch } = useApiClient();

  const createQuestions = useCallback(
    async (
      quizId: string,
      questionsData: CreateQuestionRequest[],
    ): Promise<Question[]> => {
      return createQuestionsApi(quizId, questionsData, fetch);
    },
    [fetch],
  );

  return { createQuestions };
};
