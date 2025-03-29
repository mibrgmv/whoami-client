import React, {ReactNode} from 'react';
import {InputError} from "./InputError.tsx";

interface InputWrapperProps {
    label?: string;
    children: ReactNode;
    error?: string;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({label, children, error}) => {
    return (
        <div>
            <label className="block">
                {label}
            </label>

            {children}

            <InputError error={error}/>
        </div>
    );
};