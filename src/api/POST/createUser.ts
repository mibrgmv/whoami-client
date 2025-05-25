import { Endpoints } from "../endpoints";
import { User } from "../../shared";
import { AxiosInstance } from "axios";

export interface CreateUserRequest {
  username: string;
  password: string;
}

export const createUser = async (
  request: CreateUserRequest,
  api: AxiosInstance,
): Promise<User> =>
  (await api.post<User>(Endpoints.users, { user: request })).data;
