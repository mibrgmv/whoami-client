import {Endpoints} from "../endpoints.ts";
import {AuthTokens} from "../../AuthContext.tsx";

export const deleteUser = async ({accessToken, userId}: AuthTokens) => {
    const response = await fetch(`${Endpoints.users}/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to delete user');
    }
};