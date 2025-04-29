import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../AuthContext";
import {useEffect, useState} from "react";
import {LoadingSpinner} from "./ui/LoadingSpinner";

export const PrivateRoute = () => {
    const {isAuthenticated, getAccessToken} = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const validateAuth = async () => {
            try {
                // Try to get a valid access token
                const token = await getAccessToken();

                // If we got a token, authentication is valid
                setIsValid(!!token);
            } catch (error) {
                console.error("Auth validation error:", error);
                setIsValid(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (isAuthenticated) {
            validateAuth();
        } else {
            setIsLoading(false);
            setIsValid(false);
        }
    }, [isAuthenticated, getAccessToken]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner size="large"/>
            </div>
        );
    }

    if (!isValid) {
        return <Navigate to="/login"/>;
    }

    return <Outlet/>;
};