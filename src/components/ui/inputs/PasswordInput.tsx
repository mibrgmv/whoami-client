import {FaEye, FaEyeSlash} from 'react-icons/fa';
import React, {useState} from "react";
import {CustomInputProps} from "./CustomInput.tsx";

export const PasswordInput: React.FC<CustomInputProps & {}> = (props) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div className="relative">
            <input
                {...props}
                className="input"
                type={visible ? "text" : "password"}
            />

            <span
                className="absolute top-1/3 right-4 cursor-pointer"
                onClick={() => setVisible(!visible)}
            >
                {visible ? <FaEyeSlash/> : <FaEye/>}
            </span>
        </div>
    );
}