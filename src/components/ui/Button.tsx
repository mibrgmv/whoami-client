import React, {ButtonHTMLAttributes, CSSProperties} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    style: CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({text, style, ...rest}) => {
    return (
        <button style={style} {...rest}>
            {text}
        </button>
    );
};
