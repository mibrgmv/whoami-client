import { QuizHistoryItem } from "../../shared/types";
import { Endpoints } from "../endpoints";

export interface GetQuizHistoryResponse {
  items: QuizHistoryItem[];
  nextPageToken: string;
}

export const fetchQuizHistory = async (
  userId: string | null,
  quizId: string | null,
  pageSize: number,
  pageToken: string,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<GetQuizHistoryResponse> => {
  let url = `${Endpoints.history}?page_size=${pageSize}`;

  if (userId) {
    url += `&user_id=${userId}`;
  }

  if (quizId) {
    url += `&quiz_id=${quizId}`;
  }

  if (pageToken) {
    url += `&page_token=${pageToken}`;
  }

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch quiz history: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as GetQuizHistoryResponse;
};
