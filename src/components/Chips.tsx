import React from "react";
import Chip from "./Chip";

const Chips = ({ options, handleClick }: any) => {
  return (
    <div className="flex">
      {options.map((option: any) => (
        <Chip key={option.value} handleClick={handleClick} option={option} />
      ))}
    </div>
  );
};

export default Chips;
