import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../AuthContext.tsx';
import {Button} from "../components/ui/Button.tsx";
import {Container} from "../components/Container.tsx";
import {InputWrapper} from "../components/ui/inputs/InputWrapper.tsx";
import {PasswordInput} from "../components/ui/inputs/PasswordInput.tsx";
import {CustomInput} from "../components/ui/inputs/CustomInput.tsx";
import {InputError} from "../components/ui/inputs/InputError.tsx";
import z from "zod";
import {login} from "../api/POST/login.ts";

const loginSchema = z.object({
    username: z.string().min(1, {message: "Username is required"}),
    password: z.string().min(1, {message: "Password is required"}),
});

export const LoginPage = () => {
    const {setLoginData} = useAuth();
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');
        setError('')

        try {
            const validationResult = loginSchema.safeParse({username, password});

            if (!validationResult.success) {
                validationResult.error.issues.forEach((issue) => {
                    if (issue.path[0] === 'username') {
                        setUsernameError(issue.message);
                    } else if (issue.path[0] === 'password') {
                        setPasswordError(issue.message);
                    }
                });
                return;
            }

            const loginResponse = await login(validationResult.data);
            setLoginData({token: loginResponse.token, userId: loginResponse.userId});
            setIsLoginSuccessful(true);
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

                <div className="flex flex-col mt-8 gap-2">
                    <Button text="Log in" type="submit"/>
                    <Link to="/register">
                        <Button text="Register" type="button"/>
                    </Link>
                </div>
            </form>
            <InputError error={error}/>
        </Container>
    );
};