import { User } from "../shared/types";
import { updateUser, UpdateUserRequest } from "../api";
import { useApiClient } from "./useApiClient";
import { useAuth } from "./";

export const useUpdateUser = () => {
  const { authTokens } = useAuth();
  const { fetch } = useApiClient();

  const updateCurrentUser = async (
    updateData: UpdateUserRequest,
  ): Promise<User> => {
    if (!authTokens?.userId) {
      throw new Error("User ID not available");
    }
    return updateUser(fetch, authTokens.userId, updateData);
  };

  return { updateCurrentUser };
};
