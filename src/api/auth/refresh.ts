import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  accessToken: string;
  userId: string;
}

export const refresh = async (
  { refreshToken }: RefreshRequest,
  api: AxiosInstance,
) =>
  (
    await api.post<RefreshResponse>(Endpoints.refresh, {
      refresh_token: refreshToken,
    })
  ).data;
