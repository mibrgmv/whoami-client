import { Endpoints } from "../endpoints";
import { User } from "../../shared";
import { AxiosInstance } from "axios";

export interface RegisterRequest {
  username: string;
  password: string;
}

export const register = async (
  request: RegisterRequest,
  apiClient: AxiosInstance,
): Promise<User> =>
  (await apiClient.post<User>(Endpoints.users, { user: request })).data;
