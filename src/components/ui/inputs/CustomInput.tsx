import React from "react";

export type CustomInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  const className = `input w-full rounded-full border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none ${props.className || ""}`;

  return <input {...props} className={className} />;
};
