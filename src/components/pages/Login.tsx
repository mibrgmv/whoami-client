import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../hooks";
import {
  Button,
  CustomInput,
  FormContainer,
  GeneralError,
  InputWrapper,
  LoadingSpinner,
  PasswordInput,
} from "../ui";
import { LoginSchema } from "../../shared";
import type { z } from "zod";

type LoginFormData = z.infer<typeof LoginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const username = watch("username");
  const password = watch("password");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError("");

    try {
      setIsLoading(true);
      await login(data.username, data.password);
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputWrapper label="Username" error={errors.username?.message}>
                <CustomInput
                  {...register("username")}
                  value={username}
                  type="text"
                  placeholder="Enter your username"
                  onChange={(e) => setValue("username", e.target.value)}
                  disabled={isLoading}
                />
              </InputWrapper>

              <InputWrapper label="Password" error={errors.password?.message}>
                <PasswordInput
                  {...register("password")}
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setValue("password", e.target.value)}
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
