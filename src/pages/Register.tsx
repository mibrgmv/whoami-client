import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button} from "../components/ui/Button.tsx";
import {Container} from "../components/Container.tsx";
import {PasswordInput} from "../components/ui/inputs/PasswordInput.tsx";
import {InputError} from "../components/ui/inputs/InputError.tsx";
import {CustomInput} from "../components/ui/inputs/CustomInput.tsx";
import {InputWrapper} from "../components/ui/inputs/InputWrapper.tsx";
import {register} from "../api/register.ts";
import z from "zod";

const registerSchema = z.object({
    username: z.string().min(1, {message: "Username is required"}),
    password: z.string().min(6, {message: "Password is required"}),
    confirmPassword: z.string().min(1, {message: "Confirm password is required"}),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setError('');

        const validationResult = registerSchema.safeParse({ username, password, confirmPassword });

        if (!validationResult.success) {
            validationResult.error.issues.forEach((issue) => {
                if (issue.path[0] === 'username') {
                    setUsernameError(issue.message);
                } else if (issue.path[0] === 'password') {
                    setPasswordError(issue.message);
                } else if (issue.path[0] === 'confirmPassword') {
                    setConfirmPasswordError(issue.message);
                } else {
                    setError(issue.message);
                }
            });
            return;
        }

        try {
            await register({username, password});
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} className="form">
                <InputWrapper label="Username" error={usernameError}>
                    <CustomInput
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputWrapper>

                <InputWrapper label="Password" error={passwordError}>
                    <PasswordInput
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputWrapper>

                <InputWrapper label="Confirm Password" error={confirmPasswordError}>
                    <PasswordInput
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </InputWrapper>

                <div className="flex flex-col mt-8 gap-2">
                    <Button text="Register" type="submit"/>
                    <Link to="/login">
                        <Button text="Log in" type="button"/>
                    </Link>
                </div>
            </form>
            <InputError error={error}/>
        </Container>
    );
};