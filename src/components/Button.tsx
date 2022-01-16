import React from "react";

interface IButtonComponent {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  className?: string;
}

const Button = ({ handleClick, text, className }: IButtonComponent) => {
  return (
    <button
      onClick={handleClick}
      className={`px-8 py-1 rounded-xl text-white bg-gray-500 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
