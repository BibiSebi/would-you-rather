import React from "react";

const Button = ({ handleClick, text, className }) => {
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
