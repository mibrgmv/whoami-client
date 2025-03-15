import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from "../components/ui/Button.tsx";
import styles from "./Login.module.css"
import {Container} from "../components/Container.tsx";
import {ErrorModal} from "../components/ui/ErrorModal.tsx";
import {PasswordField} from "../components/ui/inputs/PasswordField.tsx";

export const Register = () => {
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
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
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
        <Container>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="username">Username:</label>
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
                <label>Confirm Password:</label>
                <PasswordField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e)}
                />
                <div className="flex flex-col mt-8 gap-2">
                    <Button text="Register" type="submit"/>
                    <Link to="/login">
                        <Button text="Log in" type="button"/>
                    </Link>
                </div>
            </form>
            {error && (<ErrorModal message={error} onClose={() => setError('')}/>)}
        </Container>
    );
};