import { User } from "../shared";
import { updateUser, UpdateUserRequest } from "../api";
import { useAuth, useAuthenticatedApi } from "./";

export const useUpdateUser = () => {
  const { authTokens } = useAuth();
  const { apiClient } = useAuthenticatedApi();

  const updateCurrentUser = async (
    updateData: UpdateUserRequest,
  ): Promise<User> => {
    if (!authTokens?.userId) {
      throw new Error("User ID not available");
    }
    return updateUser(authTokens.userId, updateData, apiClient);
  };

  return { updateCurrentUser };
};
