import React from "react";
import { QuestionTypeEnum } from "../pages/Home";

interface IChipComponent {
  handleClick: (value: string) => void;
  option: IChip;
}

export interface IChip {
  value: QuestionTypeEnum;
  text: string;
  selected: boolean;
}

const Chip = ({ handleClick, option }: IChipComponent) => {
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
