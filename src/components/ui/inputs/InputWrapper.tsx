import React, {ReactNode} from 'react';
import {InputError} from "./InputError.tsx";

interface InputWrapperProps {
    label?: string;
    children: ReactNode;
    error?: string;
}

export const InputWrapper: React.FC<InputWrapperProps> = ({label, children, error}) => {
    return (
        <div className="mb-4">
            {label && (
                <label className="block text-gray-700 text-sm font-medium mb-2">
                    {label}
                </label>
            )}

            {children}

            <InputError error={error}/>
        </div>
    );
};