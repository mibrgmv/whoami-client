import React from "react";

interface InputErrorProps {
  error?: string;
}

export const InputError: React.FC<InputErrorProps> = ({ error }) => {
  return (
    <div className="h-6 text-sm text-red-500 mt-1">{error && <>{error}</>}</div>
  );
};
