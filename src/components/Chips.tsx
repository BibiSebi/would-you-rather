import React from "react";
import Chip, { IChip } from "./Chip";

interface IChipsComponent {
  options: IChip[];
  handleClick: (value: string) => void;
}

const Chips = ({ options, handleClick }: IChipsComponent) => {
  return (
    <div className="flex">
      {options.map((option: IChip) => (
        <Chip key={option.value} handleClick={handleClick} option={option} />
      ))}
    </div>
  );
};

export default Chips;
