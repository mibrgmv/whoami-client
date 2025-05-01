import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface ToggleButtonProps {
  nav: boolean;
  handleClick: () => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  nav,
  handleClick,
}) => (
  <div
    onClick={handleClick}
    className="fixed top-5 right-5 p-3 z-10 cursor-pointer rounded-full text-black bg-transparent hover:bg-black/10"
  >
    {nav ? <FaTimes /> : <FaBars />}
  </div>
);
