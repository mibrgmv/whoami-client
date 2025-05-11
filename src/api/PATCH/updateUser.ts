import { User } from "../../shared/types";
import { Endpoints } from "../endpoints";

export interface UpdateUserRequest {
  username?: string;
  password?: string;
  currentPassword: string;
}

export const updateUser = async (
  fetch: (url: string, options: RequestInit) => Promise<Response>,
  userId: string,
  updateData: UpdateUserRequest,
): Promise<User> => {
  const user: Partial<User> = {};
  if (updateData.username) user.username = updateData.username;
  if (updateData.password) user.password = updateData.password;

  const paths = Object.keys(user)
    .map((key) => key)
    .join(",");

  const requestBody = {
    user_id: userId,
    user,
    update_mask: paths,
    current_password: updateData.currentPassword,
  };

  const response = await fetch(`${Endpoints.users}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage =
      data?.message || `Failed to update user with ID: ${userId}`;
    throw new Error(errorMessage);
  }

  return (await response.json()) as User;
};
