import React from "react";
import Chip from "./Chip";

const Chips = ({ options, handleClick }) => {
  return (
    <div className="flex">
      {options.map((option) => (
        <Chip handleClick={handleClick} option={option} />
      ))}
    </div>
  );
};

export default Chips;
