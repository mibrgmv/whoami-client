import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../shared";
import {
  Button,
  CustomInput,
  FormContainer,
  GeneralError,
  InputWrapper,
  LoadingSpinner,
  PasswordInput,
} from "../ui";
import { useCreateUser } from "../../hooks";
import type { z } from "zod";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { createUser } = useCreateUser();
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const username = watch("username");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data: RegisterFormData) => {
    setGeneralError("");

    try {
      setIsLoading(true);
      await createUser(data.username, data.password);
      setRegistrationSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setGeneralError(error.message);
      } else {
        setGeneralError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <FormContainer
        title="Registration Successful!"
        subtitle="Your account has been created"
      >
        <div className="py-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">
              Thank you for registering! You can now log in with your
              credentials.
            </p>
          </div>
          <div className="mt-6">
            <Button
              text="Go to Login"
              onClick={() => navigate("/login")}
              variant="primary"
              fullWidth
            />
          </div>
        </div>
      </FormContainer>
    );
  }

  return (
    <FormContainer title="Create an Account" subtitle="Sign up to get started">
      {isLoading ? (
        <div className="py-10">
          <LoadingSpinner size="large" />
          <p className="text-center mt-4 text-gray-600">
            Creating your account...
          </p>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <InputWrapper label="Username" error={errors.username?.message}>
              <CustomInput
                {...register("username")}
                value={username}
                type="text"
                placeholder="Choose a username"
                onChange={(e) => setValue("username", e.target.value)}
                disabled={isLoading}
              />
            </InputWrapper>

            <InputWrapper label="Password" error={errors.password?.message}>
              <PasswordInput
                {...register("password")}
                value={password}
                placeholder="Create a password"
                onChange={(e) => setValue("password", e.target.value)}
                disabled={isLoading}
              />
            </InputWrapper>

            <InputWrapper
              label="Confirm Password"
              error={errors.confirmPassword?.message}
            >
              <PasswordInput
                {...register("confirmPassword")}
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={(e) => setValue("confirmPassword", e.target.value)}
                disabled={isLoading}
              />
            </InputWrapper>

            {generalError && (
              <GeneralError message={generalError} className="mt-4" />
            )}

            <div className="pt-4">
              <Button
                text="Register"
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              />
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </>
      )}
    </FormContainer>
  );
};
