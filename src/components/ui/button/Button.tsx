import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  isLoading?: boolean;
  to?: string;
};

export const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  to,
}) => {
  const baseStyles =
    "px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const widthStyle = fullWidth ? "w-full" : "";
  const loadingStyle = isLoading ? "opacity-80 cursor-not-allowed" : "";
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${widthStyle} ${loadingStyle} ${className}`;

  const content = isLoading ? (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {text}
    </div>
  ) : (
    text
  );

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
    >
      {content}
    </button>
  );
};
