import React, { useState } from "react";

interface IInputComponent {
  label: string;
  hasError?: boolean;
  errorMsg?: string;
}

const Input = React.forwardRef<HTMLInputElement, IInputComponent>(
  ({ label, hasError, errorMsg }, ref) => {
    const [value, setValue] = useState("");

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
    //todo aria connection
    return (
      <div className="flex flex-col w-full">
        <label className="text-gray-500 mb-1">{label}</label>
        <input
          ref={ref}
          className={` text-gray-500 border-gray-400 rounded-lg h-12 px-4 ${
            hasError ? "border-2 border-red-700" : "border border-gray-400"
          }`}
          type="text"
          value={value}
          onChange={onChange}
        />
        {hasError && (
          <span aria-live="polite" className="text-red-700 text-xs">
            {errorMsg}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
