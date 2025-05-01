import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../AuthContext.tsx";
import { login as loginApi } from "../../api/POST/login";
import {
  Button,
  CustomInput,
  FormContainer,
  GeneralError,
  InputWrapper,
  LoadingSpinner,
  PasswordInput,
} from "../ui";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");
    setGeneralError("");

    try {
      const validationResult = loginSchema.safeParse({ username, password });

      if (!validationResult.success) {
        validationResult.error.issues.forEach((issue) => {
          if (issue.path[0] === "username") {
            setUsernameError(issue.message);
          } else if (issue.path[0] === "password") {
            setPasswordError(issue.message);
          }
        });
        return;
      }

      setIsLoading(true);
      const loginResponse = await loginApi(validationResult.data);

      login(
        loginResponse.accessToken,
        loginResponse.refreshToken,
        loginResponse.userId,
      );

      navigate("/");
    } catch (error: any) {
      setGeneralError(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      title="Welcome back!"
      subtitle="Please sign in to your account"
    >
      <div className="min-h-[400px] flex flex-col justify-center">
        {isLoading ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <LoadingSpinner size="large" />
            <p className="text-center mt-4 text-gray-600">Logging in...</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputWrapper label="Username" error={usernameError}>
                <CustomInput
                  value={username}
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </InputWrapper>

              <InputWrapper label="Password" error={passwordError}>
                <PasswordInput
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </InputWrapper>

              {generalError && (
                <GeneralError message={generalError} className="mt-4" />
              )}

              <div className="pt-4">
                <Button
                  text="Log In"
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                />
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Register here
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </FormContainer>
  );
};
