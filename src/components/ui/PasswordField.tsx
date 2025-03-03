import {FaEye, FaEyeSlash} from 'react-icons/fa';
import {FC, JSX, SetStateAction, useState} from "react";

interface Props {
    value: string;
    onChange: (value: SetStateAction<string>) => void;
}

export const PasswordField: FC<Props> = ({value, onChange}): JSX.Element => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div className="relative">
            <input
                className="10px"
                value={value}
                type={visible ? "text" : "password"}
                onChange={(e) => onChange(e.target.value)}
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