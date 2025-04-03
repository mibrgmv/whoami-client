import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../AuthContext";

export const PrivateRoute = () => {
    const authContext = useAuth();
    if (!authContext.loginData) {
        return <Navigate to="/login"/>;
    }
    return <Outlet/>;
};
