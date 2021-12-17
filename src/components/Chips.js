import React from "react";

const Chips = ({ options, handleClick }) => {
  return (
    <div className="flex">
      {options.map((option) => (
        <div className="relative px-1 inline-flex">
          <label
            onClick={() => handleClick(option.value)}
            className={`${
              option.selected ? "text-white bg-gray-500" : " text-gray-500"
            } border border-gray-500 px-3 py-1 rounded-full cursor-pointer `}
            htmlFor={option.value}
            tabIndex={0}
          >
            {option.text}
          </label>
          <span
            role="checkbox"
            value={option.value}
            key={option.value}
            id={option.value}
            aria-checked={option.selected}
          ></span>
        </div>
      ))}
    </div>
  );
};

export default Chips;
