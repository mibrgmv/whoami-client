import { useCallback } from "react";
import { useApiClient } from "./useApiClient";
import {
  evaluateAnswers as evaluateAnswersApi,
  EvaluateAnswersRequest,
  EvaluateAnswersResponse,
} from "../api/POST/evaluate.ts";

export const useEvaluateAnswers = () => {
  const { fetch } = useApiClient();

  const evaluateAnswers = useCallback(
    async (
      request: EvaluateAnswersRequest,
    ): Promise<EvaluateAnswersResponse> => {
      return evaluateAnswersApi(request, fetch);
    },
    [fetch],
  );

  return { evaluateAnswers };
};
