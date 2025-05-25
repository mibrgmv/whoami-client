import { deleteUser } from "../api";
import { useAuth, useAuthenticatedApi } from "./";

export const useDeleteUser = () => {
  const { authTokens } = useAuth();
  const { apiClient } = useAuthenticatedApi();

  const deleteCurrentUser = async (): Promise<void> => {
    if (!authTokens?.userId) {
      throw new Error("User ID not available");
    }
    return deleteUser(authTokens.userId, apiClient);
  };

  return { deleteCurrentUser };
};
