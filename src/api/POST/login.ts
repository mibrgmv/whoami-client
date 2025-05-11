import { Endpoints } from "../endpoints";
import { api } from "../axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export const login = async ({
  username,
  password,
}: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(Endpoints.login, {
    username,
    password,
  });

  return response.data;
};
