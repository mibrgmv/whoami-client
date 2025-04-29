import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { refreshToken } from "./api/POST/refreshToken";

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    userId: string;
}

interface AuthContextType {
    authTokens: AuthTokens | null;
    setAuthTokens(tokens: AuthTokens): void;
    removeAuthTokens(): void;
    getAccessToken(): Promise<string | null>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    authTokens: null,
    setAuthTokens: () => {},
    removeAuthTokens: () => {},
    getAccessToken: async () => null,
    isAuthenticated: false
});

function isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        if (!payload.exp) return false;

        const buffer = 10;
        return (payload.exp - buffer) < Math.floor(Date.now() / 1000);
    } catch (error) {
        console.error('Error checking token expiration:', error);
        return true;
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authTokens, setAuthTokensState] = useState<AuthTokens | null>(null);
    const [refreshInProgress, setRefreshInProgress] = useState(false);
    const [refreshPromise, setRefreshPromise] = useState<Promise<string | null> | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const loadSavedTokens = () => {
            const savedRefreshToken = localStorage.getItem("refreshToken");
            const savedUserId = localStorage.getItem("userId");
            const savedAccessToken = localStorage.getItem("accessToken");

            if (savedRefreshToken && savedUserId && savedAccessToken) {
                setAuthTokensState({
                    accessToken: savedAccessToken,
                    refreshToken: savedRefreshToken,
                    userId: savedUserId
                });
                setIsAuthenticated(true);
            }
        };

        loadSavedTokens();
    }, []);

    const setAuthTokens = useCallback((tokens: AuthTokens) => {
        setAuthTokensState(tokens);
        setIsAuthenticated(true);
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        localStorage.setItem("userId", tokens.userId);
    }, []);

    const removeAuthTokens = useCallback(() => {
        setAuthTokensState(null);
        setIsAuthenticated(false);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
    }, []);

    const refreshAuthToken = useCallback(async (): Promise<string | null> => {
        const savedRefreshToken = localStorage.getItem("refreshToken");

        if (!savedRefreshToken) {
            return null;
        }

        try {
            setRefreshInProgress(true);
            const response = await refreshToken({ refreshToken: savedRefreshToken });

            const updatedTokens = {
                accessToken: response.accessToken,
                refreshToken: savedRefreshToken,
                userId: response.userId
            };

            setAuthTokens(updatedTokens);
            return response.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            removeAuthTokens();
            return null;
        } finally {
            setRefreshInProgress(false);
            setRefreshPromise(null);
        }
    }, [setAuthTokens, removeAuthTokens]);

    const getAccessToken = useCallback(async (): Promise<string | null> => {
        if (authTokens?.accessToken && !isTokenExpired(authTokens.accessToken)) {
            return authTokens.accessToken;
        }

        if (refreshInProgress && refreshPromise) {
            return refreshPromise;
        }

        const promise = refreshAuthToken();
        setRefreshPromise(promise);
        return promise;
    }, [authTokens, refreshInProgress, refreshPromise, refreshAuthToken]);

    return (
        <AuthContext.Provider
            value={{
                authTokens,
                setAuthTokens,
                removeAuthTokens,
                getAccessToken,
                isAuthenticated
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};