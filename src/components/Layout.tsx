import Navbar from "./ui/Navbar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;