import React, {ButtonHTMLAttributes, CSSProperties} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    style: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ text, style, ...rest }) => {
    return (
        <button style={style} {...rest}>
            {text}
        </button>
    );
};

export default Button;