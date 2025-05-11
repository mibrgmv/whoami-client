import { Endpoints } from "../endpoints";
import { api } from "../axios";

interface RefreshRequest {
  refreshToken: string;
}

interface RefreshResponse {
  accessToken: string;
  userId: string;
}

export const refresh = async ({ refreshToken }: RefreshRequest) => {
  const response = await api.post<RefreshResponse>(Endpoints.refresh, {
    refresh_token: refreshToken,
  });

  return response.data;
};
