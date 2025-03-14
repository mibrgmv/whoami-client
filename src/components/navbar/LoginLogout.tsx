import React from "react";
import {Link as RouterLink} from "react-router-dom";

interface LoginLogoutProps {
    token: string | null;
    handleClick: () => void;
    logout: () => void;
}

export const LoginLogout: React.FC<LoginLogoutProps> = ({token, handleClick, logout}) => (
    <li className="my-5 text-xl md:text-2xl cursor-pointer hover:underline">
        {token ? (
            <button className="inline" onClick={logout}>
                Logout
            </button>
        ) : (
            <RouterLink to="/login" onClick={handleClick}>Login</RouterLink>
        )}
    </li>
);