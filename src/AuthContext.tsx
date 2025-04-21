import React, {createContext, useContext, useState} from 'react';

export interface LoginData {
    token: string,
    userId: string
}

interface AuthContextType {
    loginData: LoginData | null;
    setLoginData(loginData: LoginData): void;
    removeLoginData(): void;
}

const AuthContext = createContext<AuthContextType>({
    loginData: null,
    setLoginData: () => {},
    removeLoginData: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [loginData, setLoginData] = useState<LoginData | null>(() => {
        const storedData = localStorage.getItem("loginData");
        return storedData ? JSON.parse(storedData) : null;
    });

    const login = (newLoginData: LoginData) => {
        setLoginData(newLoginData);
        localStorage.setItem("loginData", JSON.stringify(newLoginData));
    };

    const logout = () => {
        setLoginData(null);
        localStorage.removeItem("loginData");
    };

    return (
        <AuthContext.Provider value={{loginData, setLoginData: login, removeLoginData: logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};