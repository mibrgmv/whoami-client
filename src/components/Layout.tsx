import Navbar from "./ui/Navbar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className="m-0 p-0">
            <Navbar />
            <div className="flex flex-col items-center justify-center w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;