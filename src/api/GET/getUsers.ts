import { User } from "../../shared/types/User.tsx";
import { Endpoints } from "../endpoints";

export interface GetUsersResponse {
  users: User[];
  nextPageToken: string;
}

export const fetchUsers = async (
  pageSize: number,
  pageToken: string,
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<GetUsersResponse> => {
  let url = `${Endpoints.users}?page_size=${pageSize}`;
  if (pageToken) {
    url += `&page_token=${pageToken}`;
  }

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch users: ${response.status} ${response.statusText}`,
    );
  }

  return await response.json();
};
