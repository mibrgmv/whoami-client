import {Endpoints} from "../endpoints.ts";
import {AuthTokens} from "../../AuthContext.tsx";

interface UpdateUserRequest {
    username?: string;
    currentPassword: string;
    newPassword?: string;
}

export const updateUser = async ({accessToken, userId}: AuthTokens, updateData: UpdateUserRequest) => {
    const response = await fetch(`${Endpoints.users}/${userId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Failed to update user');
    }

    return response.json();
};