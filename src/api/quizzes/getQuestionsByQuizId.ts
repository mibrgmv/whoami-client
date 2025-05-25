import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

interface QuestionResponse {
  id: string;
  quiz_id: string;
  body: string;
  options: string[];
}

export interface GetQuestionsByQuizIdResponse {
  questions: QuestionResponse[];
}

export const getQuestionsByQuizId = async (
  quizId: string,
  api: AxiosInstance,
): Promise<GetQuestionsByQuizIdResponse> =>
  (
    await api.get<GetQuestionsByQuizIdResponse>(
      `${Endpoints.quizzes}/${quizId}/questions`,
    )
  ).data;
