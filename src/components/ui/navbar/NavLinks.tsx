import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {LoginLogout} from "./LoginLogout";
import {FadeOverlay} from "./FadeOverlay.tsx";

interface RouteData {
    name: string;
    path: string;
}

interface NavLinksProps {
    nav: boolean;
    handleClick: () => void;
    token: string | null;
    logout: () => void;
    routes: RouteData[];
}

export const NavLinks: React.FC<NavLinksProps> = ({nav, handleClick, token, logout, routes}) => {
    const liStyle = "px-6 py-3 mx-3 rounded-lg text-2xl md:text-xl cursor-pointer bg-transparent hover:bg-black/10";
    return (
        <>
            <FadeOverlay isVisible={nav} onClick={handleClick}/>
            <div className={`${nav ? "z-1 flex flex-col justify-center fixed top-0 right-0 w-2/3 md:w-1/4 h-screen text-black bg-white" : "hidden"}`}>
                {routes.map((route) => (
                    <RouterLink className={liStyle} to={route.path} onClick={handleClick}>
                        {route.name}
                    </RouterLink>
                ))}
                <LoginLogout className={liStyle} token={token} handleClick={handleClick} logout={logout}/>
            </div>
        </>
    );
};