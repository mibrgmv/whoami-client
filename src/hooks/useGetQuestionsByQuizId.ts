import { useCallback } from "react";
import {
  getQuestionsByQuizId as getQuestionsByQuizIdApi,
  GetQuestionsByQuizIdResponse,
} from "../api";
import { useApiClient } from "./useApiClient";

export const useGetQuestionsByQuizId = () => {
  const { fetch } = useApiClient();

  const getQuestions = useCallback(
    async (quizId: string): Promise<GetQuestionsByQuizIdResponse> => {
      return getQuestionsByQuizIdApi(quizId, fetch);
    },
    [fetch],
  );

  return { getQuestions };
};
