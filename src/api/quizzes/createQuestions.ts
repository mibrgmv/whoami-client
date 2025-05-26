import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export interface Question {
  id: string;
  quiz_id: string;
  body: string;
  options_weights: Record<string, { weights: number[] }>;
}

export interface CreateQuestionRequest {
  quiz_id: string;
  body: string;
  options_weights: Record<string, { weights: number[] }>;
}

export interface BatchCreateQuestionsRequest {
  quiz_id: string;
  requests: CreateQuestionRequest[];
}

export interface BatchCreateQuestionsResponse {
  questions: Question[];
}

export const createQuestions = async (
  request: BatchCreateQuestionsRequest,
  api: AxiosInstance,
): Promise<BatchCreateQuestionsResponse> =>
  (await api.post<BatchCreateQuestionsResponse>(`${Endpoints.quizzes}/${request.quiz_id}/questions`, request)).data;
