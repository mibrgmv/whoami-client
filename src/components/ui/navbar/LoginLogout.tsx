import React from "react";
import { Link as RouterLink } from "react-router-dom";

interface Props {
    token: string | null;
    handleClick: () => void;
    logout: () => void;
    className: string;
}

export const LoginLogout: React.FC<Props> = ({ token, handleClick, logout, className }) => (
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