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
  apiClient: AxiosInstance,
): Promise<LoginResponse> =>
  (await apiClient.post<LoginResponse>(Endpoints.login, request)).data;
