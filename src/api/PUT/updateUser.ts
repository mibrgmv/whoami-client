import { User } from "../../shared/types";
import { Endpoints } from "../endpoints";

export const updateUser = async (
  fetch: (url: string, options: RequestInit) => Promise<Response>,
  userId: string,
  updateData: {
    username?: string;
    currentPassword: string;
    newPassword?: string;
  },
): Promise<User> => {
  const response = await fetch(`${Endpoints.users}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage =
      data?.message || `Failed to update user with ID: ${userId}`;
    throw new Error(errorMessage);
  }

  return (await response.json()) as User;
};
