import { Quiz } from "../../shared";
import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export const getQuizById = async (
  quizId: string,
  api: AxiosInstance,
): Promise<Quiz | null> =>
  (await api.get<Quiz>(`${Endpoints.quizzes}/${quizId}`)).data;
