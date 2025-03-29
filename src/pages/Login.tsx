import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext.tsx';
import {Button} from "../components/ui/Button.tsx";
import {Container} from "../components/Container.tsx";
import {InputWrapper} from "../components/ui/inputs/InputWrapper.tsx";
import {PasswordInput} from "../components/ui/inputs/PasswordInput.tsx";
import {CustomInput} from "../components/ui/inputs/CustomInput.tsx";
import {InputError} from "../components/ui/inputs/InputError.tsx";

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');
        setPasswordError('');
        setError('')
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            const data = await response.json();
            login(data.access_token);
            navigate('/profile');
        } catch (error) {
            setError('An error occurred');
            console.error(error);
        }

        if (!username) {
            setUsernameError("Username is required");
        }

        if (!password) {
            setPasswordError("Password is required");
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