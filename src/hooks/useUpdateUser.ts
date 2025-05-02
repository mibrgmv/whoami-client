import { User } from "../shared/types";
import { updateUser } from "../api/PUT/updateUser.ts";
import { useApiClient } from "./useApiClient.ts";
import { useAuth } from "../AuthContext.tsx";

interface UpdateUserRequest {
  username?: string;
  currentPassword: string;
  newPassword?: string;
}

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
