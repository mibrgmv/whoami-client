import { Endpoints } from "../endpoints";

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenResponse {
  accessToken: string;
  userId: string;
}

export const refreshToken = async ({ refreshToken }: RefreshTokenRequest) => {
  const response = await fetch(Endpoints.refreshToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data: RefreshTokenResponse = await response.json();
  return {
    accessToken: data.accessToken,
    userId: data.userId,
  };
};
