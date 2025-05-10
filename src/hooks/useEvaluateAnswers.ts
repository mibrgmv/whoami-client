import { useCallback } from "react";
import { useApiClient } from "./useApiClient";
import {
  evaluateAnswers as evaluateAnswersApi,
  EvaluateAnswersRequest,
} from "../api/POST/evaluate.ts";
import { Result } from "../shared/types";

export const useEvaluateAnswers = () => {
  const { fetch } = useApiClient();

  const evaluateAnswers = useCallback(
    async (request: EvaluateAnswersRequest): Promise<Result> => {
      return evaluateAnswersApi(request, fetch);
    },
    [fetch],
  );

  return { evaluateAnswers };
};
