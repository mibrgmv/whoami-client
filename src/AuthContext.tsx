import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react';
import {refreshToken} from './api/POST/refreshToken.ts';

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    userId: string | null;
    login: (accessToken: string, refreshToken: string, userId: string) => void;
    logout: () => void;
    getAccessToken: () => Promise<string | null>;
    refreshAccessToken: () => Promise<boolean>;
    setAuthInfo: Dispatch<SetStateAction<AuthInfo>>;
}

interface AuthInfo {
    accessToken: string | null;
    refreshToken: string | null;
    userId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [authInfo, setAuthInfo] = useState<AuthInfo>({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        userId: localStorage.getItem('userId'),
    });

    const isAuthenticated = !!authInfo.accessToken;

    const login = useCallback((accessToken: string, refreshToken: string, userId: string) => {
        setAuthInfo({accessToken, refreshToken, userId});
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId);
    }, []);

    const logout = useCallback(() => {
        setAuthInfo({accessToken: null, refreshToken: null, userId: null});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
    }, []);

    const refreshAccessToken = useCallback(async (): Promise<boolean> => {
        const localRefreshToken = localStorage.getItem('refreshToken');
        if (!localRefreshToken) {
            logout();
            return false;
        }

        try {
            const {accessToken: newAccessToken, userId: newUserId} = await refreshToken({refreshToken: localRefreshToken});
            setAuthInfo({accessToken: newAccessToken, refreshToken: localRefreshToken, userId: newUserId});
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem('userId', newUserId);
            return true;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            logout();
            return false;
        }
    }, [logout]);

    const getAccessToken = useCallback(async (): Promise<string | null> => {
        const localAccessToken = localStorage.getItem('accessToken');
        if (localAccessToken) {
            return localAccessToken;
        }

        const refreshed = await refreshAccessToken();
        return refreshed ? localStorage.getItem('accessToken') : null;
    }, [refreshAccessToken]);

    useEffect(() => {
    }, [refreshAccessToken]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            accessToken: authInfo.accessToken,
            refreshToken: authInfo.refreshToken,
            userId: authInfo.userId,
            login,
            logout,
            getAccessToken,
            refreshAccessToken,
            setAuthInfo,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};