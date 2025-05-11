import { Endpoints } from "../endpoints";
import { api } from "../axios";
import { User } from "../../shared/types";

export interface RegisterRequest {
  username: string;
  password: string;
}

export const register = async ({
  username,
  password,
}: RegisterRequest): Promise<User> => {
  const response = await api.post<User>(Endpoints.users, {
    username,
    password,
  });

  return response.data;
};
