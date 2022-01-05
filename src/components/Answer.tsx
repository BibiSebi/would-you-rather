import { FlagIcon } from "@heroicons/react/outline";
import React from "react";

const Answer = ({ answer, handleClick, result }: any) => {
  const getPeopleAnswered = (count: number) => {
    return `${count} ${count === 1 ? "person" : "people"} answered`;
  };

  return result === null ? (
    <button
      onClick={handleClick}
      className="border border-gray-200 w-full px-8 py-12 text-gray-500 text-xl rounded-xl my-4 relative hover:bg-red-100"
    >
      {answer.text}
    </button>
  ) : (
    <div className="border border-gray-200 w-full px-8 py-8 flex flex-col items-center text-gray-500 rounded-xl my-4 relative">
      {result.selected && (
        <span className="absolute top-2 right-2">
          <FlagIcon
            className="w-7 h-7 text-blue-700"
            aria-label="you selected this answer"
          />
        </span>
      )}
      <span className="text-3xl font-light">{result.percentage}%</span>
      <span className="my-1">{getPeopleAnswered(answer.votes.length)}</span>

      <span className="text-3xl font-light">{answer.text}</span>
    </div>
  );
};

export default Answer;
