import { deleteUser } from "../api";
import { useApiClient } from "./useApiClient.ts";
import { useAuth } from "../AuthContext.tsx";

export const useDeleteUser = () => {
  const { authTokens } = useAuth();
  const { fetch } = useApiClient();

  const deleteCurrentUser = async (): Promise<void> => {
    if (!authTokens?.userId) {
      throw new Error("User ID not available");
    }
    return deleteUser(fetch, authTokens.userId);
  };

  return { deleteCurrentUser };
};
