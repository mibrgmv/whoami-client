import { useCallback } from "react";
import { Result } from "../../shared";
import {
  evaluateAnswers as evaluateAnswersApi,
  EvaluateAnswersRequest,
} from "../../api";
import { useAuthenticatedApi } from "../";

export const useEvaluateAnswers = () => {
  const { apiClient } = useAuthenticatedApi();

  const evaluateAnswers = useCallback(
    async (request: EvaluateAnswersRequest): Promise<Result> => {
      return evaluateAnswersApi(request, apiClient);
    },
    [apiClient],
  );

  return { evaluateAnswers };
};
