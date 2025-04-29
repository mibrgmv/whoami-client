import {useApiClient} from "./useApiClient.ts";
import {fetchUsers, GetUsersResponse} from "../api/GET/getUsers.ts";

export const useGetUsers = () => {
    const {fetch} = useApiClient();

    const getUsers = async (pageSize: number, pageToken: string): Promise<GetUsersResponse> => {
        return fetchUsers(pageSize, pageToken, fetch);
    };

    return {getUsers};
};