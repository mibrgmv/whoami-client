import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.tsx";
import { LoadingSpinner } from "./ui/LoadingSpinner.tsx";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { isAuthenticated, getAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const token = await getAccessToken();
        setIsValid(!!token);
      } catch (error) {
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
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
