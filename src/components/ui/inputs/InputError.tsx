import React from "react";

interface InputErrorProps {
    error?: string;
}

export const InputError: React.FC<InputErrorProps> = ({error}) => {
    return (
        <div className="h-4 text-sm text-red-500">
            {error && (
                <>{error}</>
            )}
        </div>
    )
}