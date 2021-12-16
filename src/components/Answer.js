import React from "react";

const Answer = ({ answer, handleClick, result }) => {
  return result === null ? (
    <button
      onClick={handleClick}
      className="border border-gray-200 w-full px-8 py-12 text-gray-500 text-xl rounded-xl my-4 relative hover:bg-red-100"
    >
      {answer.text}
    </button>
  ) : (
    <div className="border border-gray-200 w-full px-8 py-12 text-gray-500 text-xl rounded-xl my-4 relative">
      <span>{answer.text}</span>
      <span>{result.percentage}</span>
      <span>{!result.hasMoreVotes && "lalal"}</span>
    </div>
  );
};

export default Answer;
