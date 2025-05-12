import { User } from "../../shared/types";
import { Endpoints } from "../endpoints";

export interface GetUsersResponse {
  users: User[];
  nextPageToken: string;
}

export const getUsers = async (
  pageSize: number,
  pageToken: string,
  fetchFn: <T>(url: string, options?: any) => Promise<T>,
): Promise<GetUsersResponse> => {
  const params: Record<string, string | number> = {
    page_size: pageSize,
  };

  if (pageToken) {
    params.page_token = pageToken;
  }

  return fetchFn<GetUsersResponse>(Endpoints.users, {
    method: "GET",
    params,
  });
};
