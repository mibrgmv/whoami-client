import { User } from "../../shared/types";
import { Endpoints } from "../endpoints";

export const fetchCurrentUser = async (
  fetch: (url: string, options: RequestInit) => Promise<Response>,
): Promise<User> => {
  const response = await fetch(`${Endpoints.users}/current`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch current user: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as User;
};
