import React from "react";
import {Link as RouterLink} from "react-router-dom";

interface LoginLogoutProps {
    token: string | undefined;
    handleClick: () => void;
    logout: () => void;
    className: string;
}

export const LoginLogout: React.FC<LoginLogoutProps> = ({token, handleClick, logout, className}) => (
    <>
        {token ? (
            <div className={className} onClick={logout}>
                Logout
            </div>
        ) : (
            <RouterLink className={className} to="/login" onClick={handleClick}>
                Login
            </RouterLink>
        )}
    </>
);