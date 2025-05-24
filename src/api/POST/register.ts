import { Endpoints } from "../endpoints";
import { User } from "../../shared";
import { AxiosInstance } from "axios";

export interface RegisterRequest {
  username: string;
  password: string;
}

export const register = async (
  { username, password }: RegisterRequest,
  apiClient: AxiosInstance,
): Promise<User> => {
  const response = await apiClient.post<User>(Endpoints.users, {
    user: { username, password },
  });

  return response.data;
};
