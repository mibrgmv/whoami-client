import { AxiosInstance } from "axios";
import { QuizHistoryItem } from "../../shared";
import { Endpoints } from "../endpoints";

export interface GetQuizHistoryResponse {
  items: QuizHistoryItem[];
  nextPageToken: string;
}

export const fetchQuizHistory = async (
  userIds: string[] | null,
  quizIds: string[] | null,
  pageSize: number,
  pageToken: string,
  api: AxiosInstance,
): Promise<GetQuizHistoryResponse> => {
  let url = `${Endpoints.history}?page_size=${pageSize}`;

  if (userIds && userIds.length > 0) {
    userIds.forEach((userId) => {
      url += `&user_ids=${encodeURIComponent(userId)}`;
    });
  }

  if (quizIds && quizIds.length > 0) {
    quizIds.forEach((quizId) => {
      url += `&quiz_ids=${encodeURIComponent(quizId)}`;
    });
  }

  if (pageToken) {
    url += `&page_token=${encodeURIComponent(pageToken)}`;
  }

  return (await api.get<GetQuizHistoryResponse>(url)).data;
};
