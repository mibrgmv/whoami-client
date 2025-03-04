import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../AuthContext.tsx';
import {Button} from "../components/ui/Button.tsx";
import styles from "./Login.module.css"
import {PasswordField} from "../components/ui/PasswordField.tsx";
import {ErrorModal} from "../components/ui/ErrorModal.tsx";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
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
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password:</label>
                <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e)}
                />
                <div className="flex flex-col mt-8 gap-2">
                    <Button text="Log in" type="submit"/>
                    <Link to="/register">
                        <Button text="Register" type="button"/>
                    </Link>
                </div>
            </form>
            {error && (<ErrorModal message={error} onClose={() => setError('')}/>)}
        </div>
    );
};
