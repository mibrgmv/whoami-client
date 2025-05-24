import { Endpoints } from "../endpoints";
import { Quiz } from "../../shared";

export interface GetQuizzesResponse {
  quizzes: Quiz[];
  nextPageToken: string;
}

export const getQuizzes = async (
  pageSize: number,
  pageToken: string,
): Promise<GetQuizzesResponse> => {
  let url = `${Endpoints.quizzes}?page_size=${pageSize}`;
  if (pageToken) {
    url += `&page_token=${pageToken}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch quizzes");
  }
  return (await response.json()) as GetQuizzesResponse;
};
