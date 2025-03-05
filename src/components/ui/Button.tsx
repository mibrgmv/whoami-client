import React, {ButtonHTMLAttributes} from 'react';
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
        <button
            className="w-full py-3 px-6 rounded-full text-white bg-black border border-black hover:text-black hover:bg-transparent hover:cursor-pointer"
            onClick={handleClick}
            {...rest}
        >
            {text}
        </button>
    );
};