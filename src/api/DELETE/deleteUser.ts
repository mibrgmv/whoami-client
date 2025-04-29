import { Endpoints } from "../endpoints.ts";

export const deleteUser = async (
  fetch: (url: string, options: RequestInit) => Promise<Response>,
  userId: string,
): Promise<void> => {
  const response = await fetch(`${Endpoints.users}/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage =
      data?.message || `Failed to delete user with ID: ${userId}`;
    throw new Error(errorMessage);
  }
};
