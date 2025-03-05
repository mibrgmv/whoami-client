import React, {ButtonHTMLAttributes} from 'react';
import styles from "./Button.module.css"
import {useNavigate} from "react-router-dom";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    to?: string;
}

export const Button: React.FC<ButtonProps> = ({text, to, ...rest}) => {
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (to) {
            navigate(to);
        }
        if (rest.onClick) {
            rest.onClick(event);
        }
    };

    return (
        <button style={styles} onClick={handleClick} {...rest}>
            {text}
        </button>
    );
};