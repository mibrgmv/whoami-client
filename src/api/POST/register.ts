import { Endpoints } from "../endpoints";
import { User } from "../../shared/types";

interface CreateUserRequest {
  user: {
    username: string;
    password: string;
  };
}

export const register = async (
  username: string,
  password: string,
): Promise<User> => {
  const body: CreateUserRequest = {
    user: {
      username,
      password,
    },
  };

  const response = await fetch(Endpoints.users, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = data?.message || `failed to register`;
    throw new Error(errorMessage);
  }

  return (await response.json()) as User;
};
