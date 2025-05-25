import { User } from "../../shared";
import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export interface UpdateUserRequest {
  username?: string;
  password?: string;
  currentPassword: string;
}

export const updateUser = async (
  userId: string,
  updateData: UpdateUserRequest,
  api: AxiosInstance,
): Promise<User> => {
  const user: Partial<User> = {};
  if (updateData.username) user.username = updateData.username;
  if (updateData.password) user.password = updateData.password;

  const paths = Object.keys(user)
    .map((key) => key)
    .join(",");

  const requestBody = {
    user_id: userId,
    user,
    update_mask: paths,
    current_password: updateData.currentPassword,
  };

  return (await api.post<User>(`${Endpoints.users}/${userId}`, requestBody)).data;
};
