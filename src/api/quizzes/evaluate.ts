import { Endpoints } from "../endpoints";
import { Answer, Result } from "../../shared";
import { AxiosInstance } from "axios";

export interface EvaluateAnswersRequest {
  answers: Answer[];
  quiz_id: string;
}

export const evaluateAnswers = async (
  request: EvaluateAnswersRequest,
  api: AxiosInstance,
): Promise<Result> =>
  (await api.post<Result>(`${Endpoints.quizzes}/${request.quiz_id}/evaluate`, request)).data;
