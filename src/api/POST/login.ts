import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export const login = async (
  request: LoginRequest,
  api: AxiosInstance,
): Promise<LoginResponse> =>
  (await api.post<LoginResponse>(Endpoints.login, request)).data;
