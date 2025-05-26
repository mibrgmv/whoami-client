import { useCallback } from "react";
import { createQuestions as createQuestionsApi } from "../../api";
import { useAuthenticatedApi } from "../";

export interface CreateQuestionRequest {
  quiz_id: string;
  body: string;
  options_weights: Record<string, { weights: number[] }>;
}

export const useCreateQuestions = () => {
  const { apiClient } = useAuthenticatedApi();

  const batchCreateQuestions = useCallback(
    async (quiz_id: string, requests: CreateQuestionRequest[]): Promise<any> => {
      return createQuestionsApi({ quiz_id, requests }, apiClient);
    },
    [apiClient],
  );

  return { batchCreateQuestions };
};
