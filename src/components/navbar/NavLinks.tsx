import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {LoginLogout} from "./LoginLogout";

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

export const NavLinks: React.FC<NavLinksProps> = ({nav, handleClick, token, logout, routes}) => (
    <ul className={`${nav ? 'flex flex-col justify-center items-center absolute top-0 right-0 w-2/3 md:w-1/4 h-screen text-black bh-white' : 'hidden'}`}>
        {routes.map((route, index) => (
            <li key={index} className="my-5 text-2xl md:text-xl cursor-pointer hover:underline">
                <RouterLink to={route.path} onClick={handleClick}>
                    {route.name}
                </RouterLink>
            </li>
        ))}
        <LoginLogout token={token} handleClick={handleClick} logout={logout}/>
    </ul>
);