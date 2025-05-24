import { Endpoints } from "../endpoints";
import { User } from "../../shared";
import { AxiosInstance } from "axios";

export interface RegisterRequest {
  username: string;
  password: string;
}

export const register = async (
  request: RegisterRequest,
  api: AxiosInstance,
): Promise<User> =>
  (await api.post<User>(Endpoints.users, { user: request })).data;
