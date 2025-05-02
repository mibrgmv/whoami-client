import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import { CustomInputProps } from "./CustomInput.tsx";

export const PasswordInput: React.FC<CustomInputProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const className = `input w-full rounded-full border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none ${props.className || ""}`;

  return (
    <div className="relative">
      <input
        {...props}
        className={className}
        type={visible ? "text" : "password"}
      />

      <span
        className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};
