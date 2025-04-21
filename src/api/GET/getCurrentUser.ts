import {User} from "../../shared/types/User.tsx";
import {Endpoints} from "../endpoints.ts";

export const getCurrentUser = async (token: string): Promise<User> => {
    const response = await fetch(Endpoints.getCurrentUser, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch current user');
    }
    const data: User = await response.json();
    return data;
};