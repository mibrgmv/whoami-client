import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export interface Quiz {
  id: string;
  title: string;
  results: string[];
}

export interface CreateQuizRequest {
  title: string;
  results: string[];
}

export const createQuiz = async (
  request: CreateQuizRequest,
  api: AxiosInstance,
): Promise<Quiz> => (await api.post<Quiz>(Endpoints.quizzes, request)).data;
