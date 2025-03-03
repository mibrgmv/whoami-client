import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext.tsx';
import Button from "../ui/Button.tsx";
import styles from "./Login.module.css"
import button from "./../ui/Button.module.css"
import {PasswordField} from "../ui/PasswordField.tsx";

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
                    <Button text="Log in" style={button} type="submit"/>
                    <Link to="/register">
                        <Button text="Register" style={button}/>
                    </Link>
                </div>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    );
};

export default Login;
