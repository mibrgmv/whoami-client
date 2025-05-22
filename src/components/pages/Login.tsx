import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import {
  Button,
  CustomInput,
  FormContainer,
  GeneralError,
  InputWrapper,
  LoadingSpinner,
  PasswordInput,
} from "../ui";
import { LoginSchema } from "../../schemas";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useLogin();
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
      const validationResult = LoginSchema.safeParse({ username, password });

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
      await login(
        validationResult.data.username,
        validationResult.data.password,
      );
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setGeneralError(err.message);
      } else {
        setGeneralError("Failed to login. Please try again.");
      }
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
