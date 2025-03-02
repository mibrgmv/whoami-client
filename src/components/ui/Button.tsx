import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...rest }) => {
    return (
        <button className={styles.button} {...rest}>
            {text}
        </button>
    );
};

export default Button;