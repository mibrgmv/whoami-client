import React from "react";
import {Link as RouterLink} from "react-router-dom";

interface LoginLogoutProps {
    token: string | null;
    handleClick: () => void;
    logout: () => void;
    className: string;
}

export const LoginLogout: React.FC<LoginLogoutProps> = ({token, handleClick, logout, className}) => (
    <li className={className}>
        {token ? (
            <button className="inline" onClick={logout}>
                Logout
            </button>
        ) : (
            <RouterLink to="/login" onClick={handleClick}>Login</RouterLink>
        )}
    </li>
);