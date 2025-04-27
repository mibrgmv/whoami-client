import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../AuthContext";

export const PrivateRoute = () => {
    const {authTokens} = useAuth();

    if (!authTokens) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
};