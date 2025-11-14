import React, { type JSX } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  textColor?: string;
  hoverBg?: string;
  hoverText?: string;
}

const Button = ({
  children,
  className = "",
  bgColor = "",
  textColor = "text-white",
  hoverBg = "",
  hoverText = "",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`px-6 md:px-5 lg:px-6 py-2 md:py-2.5 rounded-3xl font-semibold transition-colors duration-200 cursor-pointer ${bgColor} ${textColor} ${hoverBg} ${hoverText} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
