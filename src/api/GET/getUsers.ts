import { User } from "../../shared";
import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export interface GetUsersResponse {
  users: User[];
  nextPageToken: string;
}

export const getUsers = async (
  pageSize: number,
  pageToken: string,
  api: AxiosInstance,
): Promise<GetUsersResponse> => {
  let url = `${Endpoints.users}?page_size=${pageSize}`;

  if (pageToken) {
    url += `&page_token=${pageToken}`;
  }
  // todo make a pagination helper to transform urls
  return (await api.get<GetUsersResponse>(url)).data;
};
