import React, {createContext, useContext, useState, useEffect, useCallback} from 'react';
import {refreshToken} from "./api/POST/refreshToken.ts";

export interface AuthTokens {
    accessToken: string,
    refreshToken: string,
    userId: string
}

interface AuthContextType {
    authTokens: AuthTokens | null;
    setAuthTokens(tokens: AuthTokens): void;
    removeAuthTokens(): void;
    getAccessToken(): Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({
    authTokens: null,
    setAuthTokens: () => {},
    removeAuthTokens: () => {},
    getAccessToken: async () => null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const getRefreshToken = useCallback(() => {
        return localStorage.getItem("refreshToken");
    }, []);

    const setAuthTokens = ({accessToken, refreshToken, userId}: AuthTokens) => {
        setAccessToken(accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUserId(userId);
        localStorage.setItem("userId", userId);
    };

    const removeAuthTokens = () => {
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        setUserId(null);
    };

    const getAccessToken = useCallback(async (): Promise<string | null> => {
        if (accessToken) {
            return accessToken;
        }

        const refresh_token = getRefreshToken();
        if (refresh_token && userId) {
            try {
                const response = await refreshToken({refreshToken: refresh_token})
                setAccessToken(response.accessToken);
                setUserId(response.userId);
            } catch (error) {
                console.error('Error refreshing token:', error);
                removeAuthTokens();
                return null;
            }
        }

        return null;
    }, [accessToken, userId, getRefreshToken]);

    return (
        <AuthContext.Provider
            value={{
                authTokens: accessToken && userId ? {
                    accessToken,
                    refreshToken: getRefreshToken() || '',
                    userId
                } : null,
                setAuthTokens,
                removeAuthTokens,
                getAccessToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};