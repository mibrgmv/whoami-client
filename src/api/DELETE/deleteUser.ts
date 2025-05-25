import { Endpoints } from "../endpoints";
import { AxiosInstance } from "axios";

export const deleteUser = async (
  userId: string,
  api: AxiosInstance,
): Promise<void> => {
  await api.delete<void>(`${Endpoints.users}/${userId}`);
};
