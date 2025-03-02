import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import Button from "../ui/Button.tsx";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
            const data = await response.json();
            login(data.access_token);
            navigate('/profile');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit} className="space-y-4">
                <label>Username</label>
                <input
                    className="mt-1 block rounded-md border-gray-300 shadow-sm"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    className="mt-1 block rounded-md border-gray-300 shadow-sm  "
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button text="Log in" type="submit"/>
                <div>
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default Login;
