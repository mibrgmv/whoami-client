import { AxiosInstance } from "axios";
import { User } from "../../shared";
import { Endpoints } from "../endpoints";

export const fetchCurrentUser = async (
  apiClient: AxiosInstance,
): Promise<User> =>
  (await apiClient.get<User>(Endpoints.currentUser)).data;
