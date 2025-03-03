import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Button from "../ui/Button.tsx";
import styles from "./Login.module.css"

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed');
            }
        } catch (error) {
            setError('An error occurred');
            console.error(error);
        }
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button text="Register" type="submit"/>
                <div>
                    Already have an account? <Link to="/login">Log in here</Link>
                </div>
            </form>
            {error && <span style={{color: 'red'}}>{error}</span>}
        </div>
    );
};

export default Register;