import { Endpoints } from "../endpoints";
import { Quiz } from "../../shared";
import { AxiosInstance } from "axios";

export interface GetQuizzesResponse {
  quizzes: Quiz[];
  nextPageToken: string;
}

export const getQuizzes = async (
  pageSize: number,
  pageToken: string,
  api: AxiosInstance,
): Promise<GetQuizzesResponse> => {
  let url = `${Endpoints.quizzes}?page_size=${pageSize}`;

  if (pageToken) {
    url += `&page_token=${pageToken}`;
  }

  return (await api.get<GetQuizzesResponse>(url)).data;
};
