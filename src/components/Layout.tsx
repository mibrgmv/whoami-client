import {Outlet} from "react-router-dom";
import {Navbar} from "./ui/Navbar.tsx";

export const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
};
