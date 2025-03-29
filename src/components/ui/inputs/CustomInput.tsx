import React from "react";

export type CustomInputProps =  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const CustomInput: React.FC<CustomInputProps> = (props) => {
    return (
        <input
            {...props}
            className={`input ${props.className}`}
        />
    )
}