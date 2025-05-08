import { Endpoints } from "../endpoints";

interface RefreshRequest {
  refreshToken: string;
}

interface RefreshResponse {
  access_token: string;
  user_id: string;
}

export const refresh = async ({ refreshToken }: RefreshRequest) => {
  const response = await fetch(Endpoints.refresh, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const data: RefreshResponse = await response.json();

  return {
    accessToken: data.access_token,
    userId: data.user_id,
  };
};
