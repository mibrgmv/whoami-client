import React, {ButtonHTMLAttributes} from 'react';
import styles from "./Button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

export const Button: React.FC<ButtonProps> = ({text, ...rest}) => {
    return (
        <button style={styles} {...rest}>
            {text}
        </button>
    );
};
