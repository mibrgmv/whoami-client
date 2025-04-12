import React, {createContext, useContext, useState} from 'react';
import {LoginResponse} from "./api/login.ts";

interface AuthContextType {
    loginData: LoginResponse | null;
    setLoginData(loginData: LoginResponse): void;
    removeLoginData(): void;
}

const AuthContext = createContext<AuthContextType>({
    loginData: null,
    setLoginData: () => {},
    removeLoginData: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [loginData, setLoginData] = useState<LoginResponse | null>(() => {
        const storedData = localStorage.getItem("loginData");
        return storedData ? JSON.parse(storedData) : null;
    });

    const login = (newLoginData: LoginResponse) => {
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