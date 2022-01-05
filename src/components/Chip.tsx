import React from "react";
const Chip = ({ handleClick, option }: any) => {
  return (
    <div key={option.value} className="relative px-1 inline-flex">
      <label
        onClick={() => handleClick(option.value)}
        className={`${
          option.selected ? "text-white bg-gray-500" : " text-gray-500"
        } border border-gray-400 px-3 py-1 rounded-full cursor-pointer `}
        htmlFor={option.value}
        tabIndex={0}
      >
        {option.text}
      </label>
      <span
        role="checkbox"
        aria-label={option.value}
        key={option.value}
        id={option.value}
        aria-checked={option.selected}
      ></span>
    </div>
  );
};

export default Chip;
