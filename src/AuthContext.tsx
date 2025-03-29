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
    const [loginData, setLoginData] = useState<LoginResponse | null>(JSON.parse(localStorage.getItem("loginData") as string));

    const login = (loginData: LoginResponse) => {
        setLoginData(loginData);
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