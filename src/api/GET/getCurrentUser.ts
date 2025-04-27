import {User} from "../../shared/types/User.tsx";
import {Endpoints} from "../endpoints.ts";

export const getCurrentUser = async (accessToken: string): Promise<User> => {
    const response = await fetch(Endpoints.getCurrentUser, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }

    return await response.json();
};