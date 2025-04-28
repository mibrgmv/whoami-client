import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from "../components/ui/FormContainer.tsx";
import { Button } from "../components/ui/Button.tsx";
import { InputWrapper } from "../components/ui/inputs/InputWrapper.tsx";
import { PasswordInput } from "../components/ui/inputs/PasswordInput.tsx";
import { CustomInput } from "../components/ui/inputs/CustomInput.tsx";
import { ErrorMessage } from "../components/ui/ErrorMessage.tsx";
import { LoadingSpinner } from "../components/ui/LoadingSpinner.tsx";
import { register } from "../api/POST/register.ts";
import { z } from "zod";

const registerSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setGeneralError('');

        try {
            const validationResult = registerSchema.safeParse({ username, password, confirmPassword });

            if (!validationResult.success) {
                validationResult.error.issues.forEach((issue) => {
                    if (issue.path[0] === 'username') {
                        setUsernameError(issue.message);
                    } else if (issue.path[0] === 'password') {
                        setPasswordError(issue.message);
                    } else if (issue.path[0] === 'confirmPassword') {
                        setConfirmPasswordError(issue.message);
                    }
                });
                return;
            }

            setIsLoading(true);
            await register({ username, password });
            setRegistrationSuccess(true);

        } catch (error: any) {
            setGeneralError(error.message || 'Registration failed. Please try again.');
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
                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center">
                        <p className="text-sm text-gray-600">
                            Thank you for registering! You can now log in with your credentials.
                        </p>
                    </div>
                    <div className="mt-6">
                        <Button
                            text="Go to Login"
                            onClick={() => navigate('/login')}
                            variant="primary"
                            fullWidth
                        />
                    </div>
                </div>
            </FormContainer>
        );
    }

    return (
        <FormContainer
            title="Create an Account"
            subtitle="Sign up to get started"
        >
            {isLoading ? (
                <div className="py-10">
                    <LoadingSpinner size="large" />
                    <p className="text-center mt-4 text-gray-600">Creating your account...</p>
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputWrapper label="Username" error={usernameError}>
                            <CustomInput
                                value={username}
                                type="text"
                                placeholder="Choose a username"
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                            />
                        </InputWrapper>

                        <InputWrapper label="Password" error={passwordError}>
                            <PasswordInput
                                value={password}
                                placeholder="Create a password"
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </InputWrapper>

                        <InputWrapper label="Confirm Password" error={confirmPasswordError}>
                            <PasswordInput
                                value={confirmPassword}
                                placeholder="Confirm your password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={isLoading}
                            />
                        </InputWrapper>

                        {generalError && (
                            <ErrorMessage message={generalError} className="mt-4" />
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
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Log in
                            </Link>
                        </p>
                    </div>
                </>
            )}
        </FormContainer>
    );
};