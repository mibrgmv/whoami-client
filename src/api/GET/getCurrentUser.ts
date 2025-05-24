import { AxiosInstance } from "axios";
import { User } from "../../shared";
import { Endpoints } from "../endpoints";

export const fetchCurrentUser = async (
  apiClient: AxiosInstance,
): Promise<User> => {
  return await apiClient
    .get<User>(`${Endpoints.users}/current`)
    .then(({ data }) => data);
};
