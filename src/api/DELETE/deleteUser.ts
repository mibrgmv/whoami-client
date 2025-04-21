import {Endpoints} from "../endpoints.ts";
import {LoginData} from "../../AuthContext.tsx";

export const deleteUser = async ({token, userId}: LoginData): Promise<void> => {
    const response = await fetch(`${Endpoints.users}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to delete user');
    }
};